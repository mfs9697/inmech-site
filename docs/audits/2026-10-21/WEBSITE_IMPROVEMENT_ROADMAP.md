# Website improvement roadmap — 2026

**Date:** 21 October 2026, Europe/Kyiv<br>
**Baseline:** `mfs9697/inmech-site`, `main` at `fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70`<br>
**Status:** proposed implementation plan only. No branch, source edit, commit, PR, merge or deployment was performed.<br>
**Companion reports:** [comprehensive audit](WEBSITE_AUDIT_2026.md), [director-election migration](DIRECTOR_ELECTIONS_MIGRATION.md).

## Priority and complexity definitions

| Level | Meaning in this roadmap |
| --- | --- |
| P0 | Preservation/cutover gate: do not retire legacy content until inventory, records decisions and rollback are accepted. No active incident or imminent deletion was demonstrated. |
| P1 | Prompt correction of confirmed user-facing, dependency or institutional-record risks; required before election cutover where relevant. |
| P2 | Material coverage, content, accessibility, discoverability and maintainability work after the first corrections. |
| P3 | Cleanup and optional refinements that must not distract from preserving official records. |

Complexity **S** means a focused change in one area; **M** spans shared data/components or needs substantial source review; **L** crosses hosting systems or requires staged migration. These indicate scope and verification burden, not guaranteed durations.

## P0 — Preservation and publishing gates

| Gate | Dependencies / responsible role | Complexity | Acceptance criteria |
| --- | --- | --- | --- |
| G1: Accept the source inventory | Institutional records owner; audit reports | M | The 25 election pages, seven election-host binaries, recovered strategy, protocol variants, old-main order alias, missing extract and further discovered sources have explicit dispositions. Unlinked-file/access-log exports are requested through the hosting owner where available. |
| G2: Keep legacy material recoverable | Hosting owner; G1 | M | Old/election hosts, DNS/TLS and recoverable static copies remain available until replacement URLs and rollback are verified. The 50 historical defence URLs are not discarded because their bibliography records exist. |
| G3: Resolve historical factual questions | Records owner; originals and amendments | M | Election venue/eligibility discrepancies, missing committee extract/minutes/delegate records, strategy status and later appointment documentation are either resolved from sources or openly recorded as gaps. Admissions timetable conflict has an owner. |
| G4: Establish the real cross-host cutover mechanism | Hosting owner and technical reviewer; G1–G3 | L | Actual server/CDN configuration and host ownership are established; exact redirect behavior, retained files and rollback procedure can be reviewed before publication. No blanket homepage redirect. |

These are future acceptance gates, not commands executed by the audit. Missing evidence must not be filled with invented content. Original Ukrainian documents can remain Ukrainian.

## P1 — Correct the most consequential problems

| Work item | Evidence | Dependencies | Complexity | Acceptance criteria |
| --- | --- | --- | --- | --- |
| Windows validation portability | F06: LF-specific NCUTAM regexes | None | S | Unmodified `npm ci` and `npm run validate` pass with LF and CRLF fixtures/checkouts; legitimate governance/gallery/documents are detected. Existing semantic constraints remain intact. |
| Reviewed dependency update | F02: 10 high / one critical package findings | Source baseline; portable checks for full Windows acceptance | M | Lockfile changes are justified; full build/content/render checks pass; current audit findings are resolved or explicitly assessed with scope and rationale. No forced audit fix or unsupported runtime migration. |
| Mobile navigation reachability | F03: expanded menu exceeds viewport | None | S | Every menu item is reachable by pointer/touch and keyboard at narrow and short viewports; bounded panel scroll, Escape, focus and desktop behavior work. |
| Trust-box native fallback | F14: default GET can put message in URL | None | S | With handler unavailable, message content cannot enter the page query string; direct email fallback remains clear in both languages. Verify with synthetic non-sensitive text. |
| Restore current strategy and its URL | F04; recovered signed 2026–2030 file | Records-owner status confirmation | S | Original SHA-256 preserved; 2026–2030 available alongside 2021–2025; correct dates/status; legacy `/doc/doc/strategy_2026-2030.pdf` has an explicit verified destination. |
| Election archive | F01 and dedicated migration report | G1–G4; document integrity checks | L, split below | 25 known page URLs mapped, all accepted binaries hash-verified, source gaps honest, bilingual routes/search/sitemap present, cross-host compatibility and rollback tested. |
| Historical defence originals | F15: 50 targets absent, old-host HEAD 200 | G2; source/file ledger | M per batch | Download originals, confirm format/full bytes, pin hashes, connect documents to stable defence records, preserve old URLs and archive formats. Bibliography counts remain unchanged unless source corrections justify changes. |

## P2 — Complete content and quality coverage

| Work item | Dependencies | Complexity | Acceptance criteria |
| --- | --- | --- | --- |
| Unified document contract and reusable archive UI | Election pilot; existing NCUTAM conventions | M | Stable IDs; separate issue/publication/effective dates; language/format/size; source/version/hash; missing-source states; shared localized cards; existing public paths remain valid. No duplicate editorial registry. |
| English programme links | Shared document IDs or focused page fix | S | All 33 existing syllabus and 14 review files are reachable from English context with English labels and Ukrainian-original indicators. No automatic file translation. |
| Admission date reconciliation | Signed rules/amendments and education owner | S | Specialty exam, recording, ranking and enrolment dates agree or have a sourced amendment explanation in both languages. Completed cycle is labeled historically. |
| Active vacancy coverage | Existing vacancy lifecycle | S | UK/EN active IDs, dates, track IDs/counts, departments and available files are checked. Raw official order number is distinct from localized display. Archival three-file rules still apply only to completed archives. |
| Search coverage | Route registry and source collections | M | Search finds vacancies, election archive, programme/documents and NCUTAM material. Localized titles/descriptions; no claim of PDF full-text search without extraction. Avoid embedding an increasingly large full index in each HTML response. |
| News scopes | Editorial decision on shared items | S | Institute-only and Committee-only listings respect `scopes`; genuinely shared records use both scopes; no duplicate detail pages. |
| Year archives / legacy news history | Source inventory by year | M | All years represented by records have crawlable year pages and navigation; future-year build does not orphan 2026 discovery; legacy `?year=` semantics have explicit mappings. |
| Conference attachments | Existing 2023 activity record | S/M | Seven legacy originals preserved with hashes and labels on the existing record; event text/gallery not duplicated; old download paths mapped. |
| Link/download/metadata validation | Portable checks; document ledger | M | Local files, fragments, duplicate IDs, canonical origin/path, reciprocal alternates and expected sitemap routes checked. External availability checks run separately from deterministic PR gates. |
| Catalogue/image performance | Baseline size measurements | M/L, split | Responsive photo derivatives with dimensions; no altered official PDFs. Catalogue partitioning retains all 615 records per language, stable anchors and crawlable links. Measure payload/render improvements; do not infer Core Web Vitals from byte counts. |
| Deployment hardening | Hosting-owner information | M/L, split | Verified pinned host identity, least-privilege workflow permissions, documented contributor guard semantics, compatible security headers and a tested rollback. Changes must not expose credentials or assume an unverified server product. |

## P3 — Cleanup and incremental simplification

- Reconcile README/default-domain/workflow references and obsolete migration worksheet statuses.
- Remove the empty generic English route and unused `YearArchive` component after reference checks. Establish provenance before removing Base64 transport fragments.
- Consolidate duplicated locale data and Header/Footer/navigation rules one component at a time. Do not replace the existing architecture in a single rewrite.
- Add native `#directors`, unique journal contact IDs, distinct biography titles and appropriate image dimensions.
- Consider explicit Astro type checking, social preview metadata and structured organization/article data after higher-priority defects are addressed.
- Localize third-party calendar/procurement controls where supported; preserve original-language event titles and documents. The seven calendar feeds already work publicly, so a native events API/ICS pipeline is optional future product work.

## Proposed sequence of small, independently verifiable PRs

Every row is a proposed future PR after implementation authorization. Source changes require the existing reviewed branch/PR process. Hosting activation and merges are separately controlled publishing steps; no PR listed here has been created.

| PR | Proposed scope | Priority / complexity | Depends on | Review and verification |
| --- | --- | --- | --- | --- |
| 01 | Make NCUTAM text parsing newline-independent | P1 / S | None | LF/CRLF regression fixtures; unchanged content passes full validation. |
| 02 | Update affected dependencies and lockfile | P1 / M | 01 for Windows acceptance | Audit graph, build and representative rendered output; no unrelated content edits. |
| 03 | Bound and scroll the mobile menu | P1 / S | None | Narrow/short viewport, every link, keyboard/Escape/focus and desktop check. |
| 04 | Prevent trust-box native GET submission | P1 / S | None | Synthetic no-JavaScript/handler-failure checks; both language interfaces and direct email link. |
| 05 | Restore 2026–2030 strategy original and page status | P1 / S | Records decision | Exact hash, historical 2021–2025 retained, approved dates, bilingual labels, redirect-ledger entry. |
| 06 | Add a minimal document schema/hash checker with election originals | P1 / M | G1–G3 | Nine inventoried unique source binaries/version dispositions, reusing the existing order; exact hashes, missing-extract state and old order alias. Keep existing URLs. |
| 07 | Add election year overview, document cards and normative/working-body pages | P1 / M | 06 | Source-by-source content review; dates/titles; layout/main/links; UK/EN routes. |
| 08 | Add election candidate, voting and result pages | P1 / M | 07 | 92-entry historic roll, distinct programme/strategy, protocol variants, honest source-gap pages and no-JavaScript reading. |
| 09 | Add election search/sitemap entries and language-route coverage | P1 / S | 07–08 | Every canonical year/detail page discoverable; reciprocal alternatives; no fallback-to-home language switch. |
| 10 | Add complete election compatibility ledger and HTTP test cases | P1 / M | 06–09, G4 | All 25 HTML sources, order/strategy/result aliases and encoded filenames; no loops or HTML disguised as PDFs. Actual host activation remains a separate approved step. |
| 11 | Switch bilingual homepage election links after destination acceptance | P1 / S | 09–10, owner approval | Both links land on verified canonical archive; legacy host stays available. This PR is the final main-site navigation step. |
| 12 | Preserve first batch of historical defence originals | P1 / M | File ledger, G2 | Small reviewable batch, e.g. one year or 5–10 documents; full hashes, defence links and aliases. Repeat batches without changing bibliography meaning. |
| 13 | Attach seven conference originals to the existing activity | P2 / S/M | File schema/ledger | Original formats and hashes, source labels, event not duplicated, URL compatibility. |
| 14 | Restore English programme document links | P2 / S | None, or shared metadata pilot | 47 shared originals reachable; translated labels only; no new binary copies. |
| 15 | Correct the admission chronology from approved evidence | P2 / S | Education owner | Signed rule/amendment reference, both locales agree, historical dates preserved. |
| 16 | Extend active vacancy invariants | P2 / S | Existing schemas/lifecycle | Active track/date/count/file agreement verified separately from complete-archive requirements. |
| 17 | Build a shared localized search index from routes/data | P2 / M | Election routes; document IDs | Meaningful search queries including `вакансії`; localized URLs and result links; cacheable index. |
| 18 | Respect Institute/Committee news scopes | P2 / S | Editorial scope decision | Exclusive/shared feed checks and unchanged canonical news URLs. |
| 19 | Add year archives, then migrate one legacy news year | P2 / M | Source-year reconciliation | Start with archive route generation; migrate each historical year in a separate subsequent PR with attachment/URL inventory. |
| 20 | Add local file/anchor/duplicate-ID and metadata checks | P2 / M | Portable validation | Include cases from the real defects; shared canonical configuration; deterministic local checks. |
| 21 | Add responsive gallery derivatives | P2 / S/M | Image provenance | Original photos retained where required; correct srcsets/dimensions; visual quality and payload compared. |
| 22 | Partition one large catalogue | P2 / M | Stable record IDs/anchors | Full record parity, crawlability and backward anchors; compare HTML size and usability. Do not combine both catalogue rewrites. |
| 23 | Harden one deployment concern at a time | P2 / M each | Hosting owner | Separate PRs for host-key pinning, workflow permissions and release/rollback mechanics. No secret values in code/logs. |
| 24 | Documentation/dead-code cleanup | P3 / S each | Migration decisions | Reference checks and clean scoped diff; protect archival/provenance material from accidental deletion. |

PRs 01–05 can be prepared independently. Election PRs 06–11 form the principal dependency chain. Historical-document batches and programme-link corrections can proceed independently once their sources are accepted. An atomic-release redesign and global style refactor should not become prerequisites for preserving readable election records.

## Release and acceptance discipline

For future source changes, use `npm ci`, full `npm run validate`, asset audit, dependency audit where required, `git diff --check`, and targeted manual checks relevant to the change. Add meaningful regression cases for fixed failure modes; do not treat a successful build as proof of factual accuracy or deployment correctness. Use the public deployment marker and actual final content/file hashes after approved publication.

Each preservation PR should identify the exact source URLs, byte hashes, original and publication dates, new public paths, old URL dispositions and records reviewer. Each UI PR should identify the affected language pages and manual keyboard/responsive checks. Each hosting change should specify a concrete rollback and independently verify HTTP status, Location, final MIME/content and retained DNS/TLS.

## Final recommendations

The website is a functional, substantially modernized static Astro site with useful bilingual structure and stronger-than-minimal content checks. It has not completed historical preservation. Five most important findings are the external/incomplete election archive, vulnerable locked dependencies, mobile menu reachability, missing historical defence binaries despite catalogue parity, and the trust-box native submission fallback. The missing current strategy is an additional urgent institutional-content correction.

«Вибори директора» currently remains on its legacy host, with 25 discovered page URLs, nine empty bodies, seven election-host downloads and only the order already preserved in Astro. Use a dated Astro archive, shared bilingual metadata, immutable original documents and exact cross-host mappings. Keep source conflicts and missing material explicit.

Unresolved questions concern unlinked legacy content, the missing committee extract/minutes/delegate documents, election venue/eligibility wording, later appointment records, applicability of recovered institutional documents, admission timetable amendments and actual host configuration. Resolve these through the responsible institution/hosting owners; do not invent answers or silently alter originals. Complete the small PR sequence above only after separate authorization.
