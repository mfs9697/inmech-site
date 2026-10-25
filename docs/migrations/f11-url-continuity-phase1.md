# F11 — compatibility ledger for historical Institute URLs

**Status:** Phase 1, static compatibility only. **No HTTP 301/302 rule has been installed.**

**Baseline:** Codex audit 21 October 2026; primary-domain source URLs and the GitHub repository inspected 25 October 2026. This document records intended equivalences, not proof of host-level cutover.

## 1. What this PR restores on the primary domain

| Historical URL | Static compatibility route created | Current canonical destination | Treatment |
| --- | --- | --- | --- |
| `https://inmech.kyiv.ua/l/ua/news/` | `/l/ua/news/` | `/news/` | Contextual UA gateway. Old `?year=YYYY` is explained and linked back to the **original host** with that year. |
| `https://inmech.kyiv.ua/l/en/news/` | `/l/en/news/` | `/en/news/` | Same in English. This particular path was reported as 404 in the F11 audit. |
| `https://inmech.kyiv.ua/l/ua/calendar_g/` | `/l/ua/calendar_g/` | `/events/` | Calendar move notice with an exact link to the embedded calendar on the new site. |

These three new static routes return *ordinary HTML pages*, not an HTTP redirect. They intentionally do not pretend to implement `301 Moved Permanently`. A proper 301 can replace the calendar gateway once server rules have been inspected and approved.

**Year-sensitive news:** The older news archive has not been fully migrated. An incoming `/l/ua/news/?year=2018` must **not** be sent to the 2026 new-site archive. The gateway shows the requested year and offers an old-host link preserving `?year=2018`. The legacy original is outside the present GitHub deployment and its continued availability must be checked separately. Pages with JavaScript disabled retain an unconditional link to the original historical news archive. **PR #201**, covering annual news routes derived from *currently migrated* records, was still **open** when this phase was planned; it does not itself import earlier years.

## 2. Main-domain document URL inventory (184 rows, 183 distinct URLs)

The existing `documents-migration.csv` is the authoritative **main-host document correspondence ledger**, with original URL, suggested replacement and status. It is not an HTTP rewrite config.

On this baseline it includes **184 CSV rows describing 183 distinct** primary-host `/doc/` URLs. One URL (`/doc/postgraduate/rating_2024_2025.pdf`) is referenced from two original pages, both pointing to the same preserved target; this duplication is source provenance rather than a conflicting mapping:
- **173 mapping rows (172 distinct source URLs)** point to physically preserved public files (including 3 URLs explicitly marked as canonical vacancy-archive entries).
- **1** retired DOCX is expressly replaced by the canonical `/doctoral/` page rather than another downloadable file.
- **10** proposed files are *not present*, and must not receive speculative downloadable aliases.

The ten gaps are:

| Exact planned target | Situation |
| --- | --- |
| `public/documents/dissertations/archive/2019/20ref.rar` | Historical restricted/unavailable archive |
| `public/documents/dissertations/archive/2019/20dis.zip` | Historical restricted/unavailable archive |
| `public/documents/dissertations/archive/2019/19dis.rar` | Historical restricted/unavailable archive |
| `public/documents/dissertations/archive/2016/08dis.zip` | Historical restricted/unavailable archive |
| `public/documents/dissertations/archive/2016/03refer.doc` | Historical restricted/unavailable DOC |
| `public/documents/dissertations/archive/2016/03dis.doc` | Historical restricted/unavailable DOC |
| `public/documents/postgraduate/nmr/nmr-members.docx` | Missing at proposed target; confirm replacement before any alias |
| `public/documents/postgraduate/schedule/2025-2026/year-1.pdf` | Retired historical schedule PDF; website now shows native timetable cards |
| `public/documents/postgraduate/schedule/2025-2026/year-2.pdf` | Retired historical schedule PDF; website now shows native timetable cards |
| `public/documents/postgraduate/schedule/2025-2026/year-3.pdf` | Retired historical schedule PDF; website now shows native timetable cards |

Preserved binaries are never rewritten or disguised as HTML. Where the old `/doc/` PDF had a known content-identical new `/documents/` PDF, a **future** exact HTTP rewrite could be appropriate. Activation depends on real host configuration and source provenance verification. The migration CSV includes candidate **paths**, not a verified redirect action, signed approval, or validated MIME/Location responses.

The strategy document `/doc/doc/strategy_2026-2030.pdf` and other historical election aliases are managed as part of the dedicated election ledger, not silently assumed to be covered by this main-host inventory.

## 3. Election-host URLs remain a separate migration system

The existing `src/data/elections/2026/legacy-routes.json` inventories **25 historical HTML pages and 17 document URL observations** across election, primary and old-main hosts. Its server cutover is still `planning-only`, even where all canonical destination pages have been built. Consult `docs/migrations/director-election-2026-legacy-urls.md` before activating any host-aware redirects.

## 4. Not yet inventoried / unresolved F11 tasks

- Extract and review a full old-site navigation map (including historical employee/staff URLs, per-person addresses, and any date/query variations). **Do not** infer a person's identity from a matching transliteration or route slug.
- Obtain server access logs/404 logs for the primary, old and election hosts, including percent-encoded paths and queries. Browser search cannot establish an exhaustive source inventory.
- For legacy `?year=` archives before 2026, inventory articles, original attachments, provenance and original publication dates **before** redirecting to a new annual archive.
- Resolve or explicitly retain the ten absent/withheld document outcomes and verify historically published titles before treating old document paths as canonical.
- Confirm server product, document root, rewrite precedence, and access to host-specific configuration with the hosting administrator. **Do not** guess Apache or nginx syntax from a static Astro repository.

## 5. Controlled host-level cutover checklist — NOT EXECUTED

1. Back up original virtual-host configuration and preserve all three historical hostnames; approve rollback.
2. Enumerate each exact hostname, pathname, query and approved target. No wildcard `/doc/*` -> homepage and no catch-all homepage redirect.
3. Verify target file integrity, `Content-Type` (PDF/DOCX), absence of restricted documents and intended case/Unicode/percent-encoding.
4. Apply the *smallest approved batch* of genuine 301/308 server/CDN rules to a staging host, distinguishing path-only from query-sensitive mappings.
5. Test actual HTTP statuses, `Location`, query handling, no redirect loops, stable canonical content, and old-host availability.
6. Deploy only after the institutional records owner and server administrator review the mapping and rollback plan; monitor legacy 404 logs.

**Automated PR checks:** `npm run check:f11` builds/verifies the three gateway pages, exact canonical targets, and every row of the 184-row CSV, including the one consistent repeated URL and the ten explicitly missing paths. It also confirms the election ledger is still planning-only. Checks do not touch DNS, web-server config, or original bytes.
