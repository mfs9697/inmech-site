#!/usr/bin/env python3
"""End-to-end F15 audit: original file integrity, static build, and live deployment.

Modes: --local validates local source repository and dist; --live also checks the
production site against all 44 source SHA-256s. Does not modify any originals.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import csv
import hashlib
import json
from pathlib import Path
import re
import sys
from urllib import error, request, parse

ROOT = Path(__file__).resolve().parents[1]
YEARS = (2015, 2016, 2017, 2018, 2019, 2020, 2021)
PROD = "https://inmech.kyiv.ua"
OLD = "https://old.inmech.kyiv.ua"
USER_AGENT = "Institute-Mechanics-F15-archive-audit/2026-10-22"


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def loaded(relative):
    return json.loads((ROOT / relative).read_text("utf-8"))


def audit_local():
    all_entries = []
    breakdown = []
    for year in YEARS:
        manifest = loaded(f"src/data/dissertations/archive-{year}-pilot.json")["pilot"]
        ledger = loaded(f"docs/migrations/f15-{year}-originals-verified.json")["entries"]
        assert len(manifest) == len(ledger), f"{year}: ledger length mismatch"
        ledgers = {entry["id"]: entry for entry in ledger}
        assert len(ledgers) == len(ledger), f"{year}: duplicate ledger id"
        for entry in manifest:
            identifier = entry["id"]
            saved = ledgers[identifier]
            for field, saved_field in (("sourceUrl", "sourceUrl"),
                                       ("target", "target"),
                                       ("format", "format"),
                                       ("expectedBytes", "bytes"),
                                       ("expectedSha256", "sha256")):
                assert entry[field] == saved[saved_field], f"{identifier}: ledger {field}"
            parsed = parse.urlsplit(entry["sourceUrl"])
            assert parsed.scheme == "https" and parsed.netloc == "old.inmech.kyiv.ua"
            assert parsed.path.startswith(f"/doc/postgraduate/dis/{year}/")
            original = ROOT / entry["target"]
            assert original.is_file(), f"{identifier}: original absent"
            content = original.read_bytes()
            assert len(content) == entry["expectedBytes"], f"{identifier}: original byte count"
            assert sha256(content) == entry["expectedSha256"], f"{identifier}: original SHA256"
            entry["year"] = year
            entry.setdefault("publicationStatus", "public")
            all_entries.append(entry)
        breakdown.append({
            "year": year,
            "originals": len(manifest),
            "public": sum(e.get("publicationStatus", "public") == "public" for e in manifest),
            "withheld": sum(e.get("publicationStatus") == "withheld-security-review" for e in manifest),
            "bytes": sum(e["expectedBytes"] for e in manifest)
        })

    assert len(all_entries) == 50, "Expected 50 original files"
    assert len({e["sourceUrl"] for e in all_entries}) == 50, "Duplicate original source"
    assert len({e["target"] for e in all_entries}) == 50, "Duplicate preservation target"
    public_entries = [e for e in all_entries if e["publicationStatus"] == "public"]
    withheld_entries = [e for e in all_entries if e["publicationStatus"] == "withheld-security-review"]
    assert len(public_entries) == 44 and len(withheld_entries) == 6
    assert sorted(e["format"] for e in withheld_entries) == ["doc", "doc", "rar", "rar", "zip", "zip"]
    assert sum(e["format"] == "docx" for e in public_entries) == 2

    with (ROOT / "documents-migration.csv").open(encoding="utf-8-sig", newline="") as csvfile:
        worksheets = [
            row for row in csv.reader(csvfile)
            if len(row) >= 3 and "/dissertations/archive/" in row[2]
        ]
    assert len(worksheets) == 50, "Original migration worksheet contains different source count"
    sheet_paths = {parse.urlsplit(row[1]).path for row in worksheets}
    assert len(sheet_paths) == 50, "Duplicate historical worksheet source"
    for entry in all_entries:
        assert parse.urlsplit(entry["sourceUrl"]).path in sheet_paths, (
            f"{entry['id']}: source not in original migration worksheet"
        )

    for entry in public_entries:
        assert entry["target"].startswith("public/documents/dissertations/archive/")
        copied = ROOT / entry["target"].replace("public/", "dist/", 1)
        assert copied.is_file(), f"{entry['id']}: original not included in dist"
        output = copied.read_bytes()
        assert len(output) == entry["expectedBytes"], f"{entry['id']}: dist length"
        assert sha256(output) == entry["expectedSha256"], f"{entry['id']}: dist SHA"
        for lang in ("", "/en"):
            html = (ROOT / f"dist{lang}/dissertations/archive/{entry['year']}/index.html").read_text("utf-8")
            expected = entry["target"].replace("public", "", 1)
            assert expected in html, f"{entry['id']}: missing {lang or 'UA'} link"
    for entry in withheld_entries:
        assert entry["target"].startswith("preserved/dissertations/")
        name = Path(entry["target"]).name
        assert not (ROOT / f"dist/documents/dissertations/archive/{entry['year']}/{name}").exists(), (
            f"{entry['id']}: withheld original leaked to public dist"
        )
        for lang in ("", "/en"):
            html = (ROOT / f"dist{lang}/dissertations/archive/{entry['year']}/index.html").read_text("utf-8")
            assert name in html, f"{entry['id']}: missing withheld listing"
            forbidden = f"/documents/dissertations/archive/{entry['year']}/{name}"
            assert forbidden not in html, f"{entry['id']}: exposed public link"

    report = {
        "originals": len(all_entries),
        "public": len(public_entries),
        "withheld": len(withheld_entries),
        "bytes": sum(e["expectedBytes"] for e in all_entries),
        "publicBytes": sum(e["expectedBytes"] for e in public_entries),
        "worksheetRows": len(worksheets),
        "years": breakdown,
        "bilingualPages": 14,
    }
    print("F15_FINAL_LOCAL:" + json.dumps(report, ensure_ascii=False))
    return all_entries, public_entries, withheld_entries


def response(url, method="GET", timeout=90):
    req = request.Request(url, method=method, headers={
        "User-Agent": USER_AGENT,
        "Cache-Control": "no-cache",
    })
    try:
        res = request.urlopen(req, timeout=timeout)
    except error.HTTPError as exc:
        # 403/404/410 are valid HTTP results when verifying withheld originals.
        return exc
    requested = parse.urlsplit(url)
    observed = parse.urlsplit(res.geturl())
    assert (observed.scheme, observed.netloc) == (requested.scheme, requested.netloc), (
        f"Unexpected redirect from {url} to {res.geturl()}"
    )
    return res


def remote_pdf_or_docx(entry):
    url = PROD + entry["target"].replace("public", "", 1)
    with response(url, timeout=120) as res:
        assert res.status == 200, f"HTTP {res.status}"
        mime = res.headers.get("Content-Type", "").lower()
        assert "text/html" not in mime, f"HTML error in place of document ({mime})"
        h = hashlib.sha256()
        count = 0
        while True:
            block = res.read(256 * 1024)
            if not block:
                break
            count += len(block)
            assert count <= entry["expectedBytes"], "Downloaded more bytes than the original"
            h.update(block)
        assert count == entry["expectedBytes"], f"Size mismatch {count} vs {entry['expectedBytes']}"
        assert h.hexdigest() == entry["expectedSha256"], "SHA256 mismatch"
        mime_expected = "application/pdf" if entry["format"] == "pdf" else "application/vnd.openxmlformats"
        mime_warning = None if mime_expected in mime or (
            entry["format"] == "docx" and "application/octet-stream" in mime
        ) else mime
        return {"bytes": count, "mimeWarning": mime_warning}


def check_live_page(task):
    year, language = task
    path = f"{language}/dissertations/archive/{year}/"
    with response(PROD + path, timeout=30) as res:
        assert res.status == 200, f"HTTP {res.status}"
        html = res.read(2_000_000).decode("utf-8")
    for entry in check_live_page.all_entries:
        if entry["year"] != year:
            continue
        filename = Path(entry["target"]).name
        assert filename in html, f"Unlisted archive entry {entry['id']}"
        uri = f"/documents/dissertations/archive/{year}/{filename}"
        if entry["publicationStatus"] == "public":
            assert uri in html, f"Missing link {entry['id']}"
        else:
            assert uri not in html, f"Withheld link exposed {entry['id']}"
    return path


def check_withheld(entry):
    filename = Path(entry["target"]).name
    url = f"{PROD}/documents/dissertations/archive/{entry['year']}/{filename}"
    with response(url, method="HEAD", timeout=25) as res:
        assert res.status in (403, 404, 410), f"Unexpected HTTP {res.status} for withheld file"
        return res.status


def check_old_source(entry):
    with response(entry["sourceUrl"], method="HEAD", timeout=30) as res:
        assert res.status == 200, f"Old host responded HTTP {res.status}"
        return res.status


def in_parallel(tasks, fn, workers=5):
    successes = []
    failures = []
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {executor.submit(fn, item): item for item in tasks}
        for future in as_completed(futures):
            item = futures[future]
            try:
                successes.append((item, future.result()))
            except Exception as exc:
                name = item["id"] if isinstance(item, dict) else str(item)
                failures.append({"item": name, "error": str(exc)})
    return successes, failures


def audit_live(all_entries, public_entries, withheld_entries, expected_main):
    report = {
        "expectedMain": expected_main,
        "liveVersion": None,
        "markerMatches": False,
        "pages": {"ok": 0, "fail": []},
        "downloads": {"ok": 0, "fail": [], "mimeWarnings": []},
        "withheld": {"ok": 0, "fail": []},
        "oldHead": {"ok": 0, "fail": []},
    }
    try:
        with response(f"{PROD}/deploy-version.txt", timeout=25) as res:
            assert res.status == 200, f"HTTP {res.status}"
            report["liveVersion"] = res.read(256).decode("utf-8").strip()
        report["markerMatches"] = bool(expected_main) and expected_main == report["liveVersion"]
    except Exception as exc:
        report["markerError"] = str(exc)
        print("F15_LIVE_BLOCKED:" + json.dumps(report, ensure_ascii=False))
        return 2
    print("F15_DEPLOY_MARKER:" + json.dumps({
        "expected": expected_main,
        "observed": report["liveVersion"],
        "matched": report["markerMatches"]
    }))
    check_live_page.all_entries = all_entries
    pages = [(year, language) for year in YEARS for language in ("", "/en")]
    for key, items, fn, threads in [
        ("pages", pages, check_live_page, 4),
        ("downloads", public_entries, remote_pdf_or_docx, 4),
        ("withheld", withheld_entries, check_withheld, 4),
        ("oldHead", all_entries, check_old_source, 6),
    ]:
        ok, fail = in_parallel(items, fn, threads)
        report[key]["ok"] = len(ok)
        report[key]["fail"] = fail
        if key == "downloads":
            report[key]["mimeWarnings"] = [
                {"id": item["id"], "mime": result["mimeWarning"]}
                for item, result in ok if result["mimeWarning"]
            ]
        print("F15_LIVE_PROGRESS:" + json.dumps({
            "stage": key, "passed": len(ok), "failed": len(fail)
        }))
    print("F15_FINAL_LIVE:" + json.dumps(report, ensure_ascii=False))
    complete = (report["markerMatches"] and report["pages"]["ok"] == 14 and
                report["downloads"]["ok"] == 44 and report["withheld"]["ok"] == 6 and
                report["oldHead"]["ok"] == 50 and not report["downloads"]["mimeWarnings"])
    print("F15_LIVE_CONCLUSION:" + ("PASS" if complete else "INCOMPLETE / REVIEW FAILURES"))
    return 0 if complete else 2


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--live", action="store_true", help="Also check current server via HTTPS")
    parser.add_argument("--expected-main", default="", help="Merged Git commit expected at deploy-version.txt")
    args = parser.parse_args()
    all_entries, public_entries, withheld_entries = audit_local()
    if args.live:
        return audit_live(all_entries, public_entries, withheld_entries, args.expected_main)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:
        print("F15_FINAL_AUDIT_ERROR:" + repr(exc), file=sys.stderr)
        sys.exit(1)
