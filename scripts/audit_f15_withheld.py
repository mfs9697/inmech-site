#!/usr/bin/env python3
"""Non-extracting metadata triage for six intentionally withheld originals.

This is NOT a malware scan, macro certification or a license to publish.
"""
import json
import os
from pathlib import Path
import subprocess
import zipfile

ROOT = Path(__file__).resolve().parents[1]
ITEMS = [
    ("2016", "03refer.doc"),
    ("2016", "03dis.doc"),
    ("2016", "08dis.zip"),
    ("2019", "20ref.rar"),
    ("2019", "20dis.zip"),
    ("2019", "19dis.rar"),
]
OLE = bytes.fromhex("D0CF11E0A1B11AE1")
RAR = bytes.fromhex("526172211A07")

def inspect(year, filename):
    file = ROOT / "preserved" / "dissertations" / year / filename
    size = file.stat().st_size
    kind = file.suffix.lower().lstrip(".")
    record = {
        "file": f"{year}/{filename}",
        "bytes": size,
        "format": kind,
        "release": "WITHHELD",
        "analysis": "signature/metadata only; not a malware safety certificate",
    }
    with file.open("rb") as handle:
        header = handle.read(8)
    if kind == "doc":
        assert header == OLE, f"{filename}: not an OLE compound Word document"
        record["oleMagic"] = True
        record["macros"] = "not assessed; independent VBA/macro inspection required"
        record["embeddedObjects"] = "not assessed"
    elif kind == "rar":
        assert header[:6] == RAR, f"{filename}: missing RAR signature"
        assert header[6] in (0, 1), f"{filename}: unknown RAR header"
        record["rarVersionMagic"] = "RAR4" if header[6] == 0 else "RAR5"
        record["containerIntegrity"] = "previous independent libarchive list passed; full payload test NOT performed"
    elif kind == "zip":
        with zipfile.ZipFile(file) as archive:
            members = archive.infolist()
            uncompressed = sum(e.file_size for e in members)
            compressed = sum(e.compress_size for e in members)
            unsafe = [e.filename for e in members if (
                e.filename.startswith(("/", "\\")) or
                ".." in e.filename.replace("\\", "/").split("/")
            )]
            encrypted = sum(bool(e.flag_bits & 1) for e in members)
            symlinks = sum(((e.external_attr >> 16) & 0o170000) == 0o120000 for e in members)
            record.update({
                "entries": len(members),
                "uncompressedBytesFromIndex": uncompressed,
                "compressedBytesFromIndex": compressed,
                "ratio": round(uncompressed / max(1, compressed), 2),
                "unsafePathCount": len(unsafe),
                "encryptedEntryCount": encrypted,
                "symlinkCount": symlinks,
            })
            if uncompressed <= 80_000_000 and not encrypted:
                try:
                    bad_member = archive.testzip()
                    record["pythonCrcTest"] = "pass" if bad_member is None else "failed_member"
                except Exception as exc:
                    record["pythonCrcTest"] = f"reader exception: {type(exc).__name__}"
            else:
                record["pythonCrcTest"] = "not run due to expanded-byte cap or encryption"
            record["compatibilityWarning"] = (
                "2019 ZIP triggered overlap warning under unzip despite other readers passing"
                if year == "2019" else "not independently tested with multiple ZIP readers"
            )
    return record

def main():
    records = [inspect(y, n) for y, n in ITEMS]
    for item in records:
        print("F15_WITHHELD_TRIAGE:" + json.dumps(item, ensure_ascii=False))
    print("F15_WITHHELD_SUMMARY:" + json.dumps({
        "count": len(records),
        "allWithheld": True,
        "macroSafetyCertified": False,
        "rarPayloadCertified": False,
        "purpose": "document reproducible metadata, not authorize publication"
    }))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
