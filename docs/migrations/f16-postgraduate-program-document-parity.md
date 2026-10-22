# Codex F16 — Ukrainian/English postgraduate programme document parity

**Date:** 22 October 2026  
**Scope:** `/postgraduate/program/` and `/en/postgraduate/program/` on the Institute of Mechanics site.  
**Source issue:** `docs/audits/2026-10-21/WEBSITE_AUDIT_2026.md`, F16 (P2).

## Original problem

The Ukrainian educational-and-scientific programme page exposed **61 unique official PDF paths** but the English page exposed only **14**. The English page listed 18 translated discipline names and stakeholder review counts but did not link the **33** original syllabi or **14** stakeholder review PDFs. Visitors selecting English could not retrieve those documents directly.

The documents themselves are official **Ukrainian originals**. F16 is a discoverability and bilingual linkage correction, **not** a document translation exercise.

## Implemented solution

1. Created `src/data/postgraduate/program-documents.json` as the one canonical source for all **61** original document paths and stable IDs, organized into the existing four categories.
2. Both page templates import and render links from this common document registry. Course titles, teacher names, programme labels, survey titles, navigation and explanatory prose remain localized, not centralized or translated mechanically.
3. The English discipline table now includes a **Syllabus (original in Ukrainian)** column, with link-year chips marked **UA PDF**. Each existing `OC1…OC8` or `EC1…EC10` display code deterministically maps to its original source document identifier `OK1…OK8` or `VK1…VK10`. The Ukrainian page preserves the original course names, instructor details, 2024/2025 syllabus versions and linked files.
4. The English quality-assurance cards now link each review PDF for 2022–2026 directly, with an original-language label. The existing programme/curriculum and survey links are kept intact.
5. The English discipline table retains horizontally scrollable layout on smaller viewports and all link collections wrap responsively. No additional source PDF files or automatic English copies are created.

| Document category | Shared original IDs/URLs | Ukrainian links | English links |
| --- | ---: | ---: | ---: |
| Educational programmes and curricula (2022–2025) | 8 | 8 | 8 |
| Syllabi (18 disciplines; 2024/2025 versions) | 33 | 33 | 33 |
| Stakeholder reviews (2022–2026) | 14 | 14 | 14 |
| Surveys (2025–2026) | 6 | 6 | 6 |
| **Total unique original PDF links** | **61** | **61** | **61** |

### Blocking regression tests

`npm run check:f16`, included within `npm run validate`, checks:

- Exact cardinalities and unique IDs for 8/33/14/6 linked originals.
- All 61 official PDF paths exist as original files under `public/` and in the generated `dist/` website, with the `%PDF-` signature.
- Exactly the same set of 61 PDF URLs is linked on each rendered UA and EN programme page, with no missing, invented, or duplicate links.
- Each of the 18 Ukrainian **and** English discipline table rows links exactly its own source syllabus PDFs, preventing subtle cross-course mapping errors that aggregate link counts would miss.
- The English per-link **UA PDF** notices are present on the 33 syllabi and 14 reviews, and both language pages import the shared registry rather than hardcode document URLs in the templates.
- Other existing full-site validation checks, including the completed F15 original archive integrity and bilingual dissertation catalogue, remain blocking and unchanged.

### Release boundaries and remaining checks

- All official PDF originals remain in place and were **not rewritten, OCRed, translated or given inferred English filenames**.
- F16 does **not** change programme accreditation facts, course teaching assignments, student admission dates, or the contents of institutional surveys and stakeholder reviews.
- After owner approval and normal merge/deployment, check UA/EN page readability on a narrow device, actual public HTTP/PDF responses for the restored links, and language notices. Build-time file and URL parity checks alone are not a live deployment check.
- The separate F17 finding about 2026 admission examination dates remains unresolved; do not guess which date is correct. F18–F20 also remain separate audit work.

**Disposition:** F16 can be closed after the PR passes CI, is reviewed/merged, and receives a short post-deploy UI/download smoke test.
