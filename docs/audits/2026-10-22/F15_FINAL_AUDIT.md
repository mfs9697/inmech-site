# Codex F15 — final historical dissertation-originals audit

**Audit date:** 22 October 2026 (Kyiv). **Scope:** the 50 original binary targets in Appendix D of `docs/audits/2026-10-21/WEBSITE_AUDIT_2026.md`. **Audited production revision:** `71919aba0d69308615f69ac877dfe90ff2135a9a`, merge of [PR #187](https://github.com/mfs9697/inmech-site/pull/187), merged at 2026-10-22 17:08:49 UTC.

## Executive conclusion

**PASS — all 50/50 historical originals are accounted for and SHA-256 verified in the Git repository. All 44 intended public originals were independently downloaded from the deployed Institute website and matched the archived SHA-256 digest and exact byte count.** The remaining six originals are preserved intact **outside** Astro `public/` and were confirmed inaccessible at the corresponding new-site paths. Both language versions of all seven archive folders passed online page checks. The old host remained available for HEAD requests to all 50 original URLs.

**Important distinction:** Source-byte preservation is complete; publication of the six intentionally withheld DOC/ZIP/RAR originals, institutional review of exact author/document attribution and any retirement of the old server are **not** completed or authorized by this audit.

## Evidence and verification method

1. **Git merge and exact deployment version:** merge `71919aba0d69308615f69ac877dfe90ff2135a9a`; the production `/deploy-version.txt` returned precisely that SHA in [independent live audit run #39821609181](https://github.com/mfs9697/inmech-site/actions/runs/39821609181).
2. **Original-source parity:** `scripts/audit_f15_final.py` cross-checked 50 entries from the original `documents-migration.csv` against the seven `src/data/dissertations/archive-YYYY-pilot.json` inventories and seven separately recorded `docs/migrations/f15-YYYY-originals-verified.json` ledgers. All 50 source files' current repository bytes matched their recorded SHA-256 and sizes; all intended public originals also matched the corresponding built `dist/` files.
3. **Live server independent of repository:** GitHub Actions executed full GET on **all 44 public downloads**, streaming complete bytes and recomputing SHA-256. It separately checked **14/14** archive pages (UA+EN, seven source-folder years), listing and links, **6/6** withheld new-site paths returning a non-public HTTP status (403, 404 or 410), and **50/50** old-host source HEAD requests returning HTTP 200. No download integrity failures or document MIME warnings. Evidence in [run #39821609181](https://github.com/mfs9697/inmech-site/actions/runs/39821609181); independently repeated with identical PASS in [run #39822247268](https://github.com/mfs9697/inmech-site/actions/runs/39822247268).
4. **Bilingual and regression validation:** existing CI on merged F15 sources confirmed 615 Ukrainian and 615 English bibliographic catalogue entries unchanged, as well as safe omission of withheld archives from `dist/` and localized download links. Production HTML independently checked that each year folder lists its historical original entries and links only publicly approved files.
5. **Environmental limitation handled:** web browsing and local container DNS could not reach the Institute hosts directly, so no production-success claim was made from those failed attempts. Independent GitHub-hosted runner GET/HEAD tests produced the affirmative evidence above.

### Inventory totals

| Source folder | Originals in Git | Public originals | Withheld originals | Source bytes |
| --- | ---: | ---: | ---: | ---: |
| 2015 | 2 | 2 | 0 | 2,851,697 |
| 2016 | 18 | 15 | 3 | 85,393,655 |
| 2017 | 2 | 2 | 0 | 5,198,389 |
| 2018 | 6 | 6 | 0 | 12,142,142 |
| 2019 | 15 | 12 | 3 | 71,137,292 |
| 2020 | 2 | 2 | 0 | 11,763,442 |
| 2021 | 5 | 5 | 0 | 44,825,419 |
| **Total** | **50** | **44** | **6** | **233,312,036** |

The 44 public originals represent **179,092,202 bytes**, and the six non-public originals account for **54,219,834 bytes**. The public set consists of 42 PDFs and two original DOCX files. This is preservation inventory by **source-folder year**, not independently established calendar year of each dissertation defence.

## Separate six-file format review — none released

The following originals remain in `preserved/dissertations/`, are listed without new-site download URLs and have been reverified against the source SHA-256 digests. The limited, read-only metadata examination below is documented by `scripts/audit_f15_withheld.py` and [Actions #39822247268](https://github.com/mfs9697/inmech-site/actions/runs/39822247268). **A valid file signature and ZIP CRC do not establish that a file is free of malicious content.**

| File | Findings from non-extracting review | Release decision |
| --- | --- | --- |
| `2016/03refer.doc` | Valid legacy OLE/Word compound-file signature; VBA/macro and embedded-object safety **not assessed** | **Withhold** |
| `2016/03dis.doc` | Valid legacy OLE/Word compound-file signature; VBA/macro and embedded-object safety **not assessed** | **Withhold** |
| `2016/08dis.zip` | 13 entries; 9,135,870 indexed uncompressed bytes; ratio 1.00; zero unsafe paths, encrypted entries or symlinks; Python CRC test passed. Another independent archive reader not yet tested | **Withhold** pending independent scan |
| `2019/20ref.rar` | RAR4 signature; an earlier independent libarchive directory listing passed, but 7-Zip 23.01 crashed and full decompression/CRC was **not** certified | **Withhold** |
| `2019/20dis.zip` | 10 entries; 2,330,896 uncompressed indexed bytes; ratio 1.06; zero unsafe paths, encrypted entries or symlinks; Python CRC test passed. Earlier `unzip` reported overlapping components, despite Python and 7-Zip accepting the archive | **Withhold** |
| `2019/19dis.rar` | RAR4 signature; libarchive directory listing passed, but 7-Zip 23.01 crashed and full decompression/CRC was **not** certified | **Withhold** |

Recommended separate handling: isolated/macro-aware inspection for DOC, independent ZIP compatibility and security checks, RAR payload validation by a supported independent reader, then an **explicitly reviewed** publication decision. Never alter original archive bytes: derivatives, if any, must be clearly labeled and separately hashed. Existing old-host public URLs have not been changed or restricted by the new-site policy; the six-file withholding applies to the **new** static website only.

## Remaining work outside the completed binary-preservation scope

- **Document attribution:** Do not map the numeric source filenames to named people, dissertation titles or exact defence dates from filename conventions alone. Match official contemporary source records before attaching individual files to the 615-entry catalogue.
- **Six potentially risky originals:** Finish the independent DOC/ZIP/RAR safety review in a separate, focused PR; release no files automatically.
- **Other audit findings:** F15 only concerned the 50 original dissertation targets. The original October 2026 website audit also identified **four non-dissertation migration targets**, and separate F16/F17 website issues. They are not covered or deemed resolved by this report.
- **Ongoing integrity:** The seven existing `npm run check:f15` year verifiers remain part of `npm run validate`. The standalone `python3 scripts/audit_f15_final.py` verifies the complete worksheet/repository/build release boundary; `python3 scripts/audit_f15_final.py --live --expected-main <merge-sha>` repeats live download checks from a network with Institute-site DNS access.
- **Source host continuity:** The legacy host responded to 50/50 HEAD requests. This proves availability at audit time, not long-term retention, independently safe content or equality of newly fetched bytes from legacy server. Do not retire it solely because F15 is complete.

**Disposition:** Close **Codex F15 historical dissertation original-byte preservation** after audit PR review. Track withheld-format publication, document attribution, the remaining non-dissertation source inventory and F16/F17 as separate work items.
