# DIRECTOR_ELECTIONS_MIGRATION — «Вибори директора»

**Proposed contents for:** `docs/audits/2026-10-21/DIRECTOR_ELECTIONS_MIGRATION.md`<br>
**Evidence date:** 21 October 2026, Europe/Kyiv<br>
**Source revision:** [`fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70`](https://github.com/mfs9697/inmech-site/commit/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70)<br>
**Status:** plan only; no migration, redirect, repository or hosting changes performed.

## Objective and recommendation

Create an enduring bilingual election archive inside the Institute's existing Astro architecture. Preserve official files byte-for-byte, retain all discovered historical page and download URLs through explicit compatibility rules, and distinguish historical website text from reviewed factual summaries and official originals.

Use `/director-election/2026/` for the 2026 record and `/director-election/` for an archive overview that can accommodate future elections. Mirror the UI at `/en/director-election/2026/` with the same record IDs. Preserve Ukrainian source documents in their original language; translated interface labels or summaries must not imply an officially translated legal document.

Keep `election.inmech.kyiv.ua` available, including DNS and HTTPS, after cutover. Its eventual role should be an exact URL compatibility host. Do not delete the host, point every path to one overview, or rely on JavaScript navigation rewrites to preserve official links.

## What was established

- The [election homepage](https://election.inmech.kyiv.ua/) is linked from both Astro homepages.
- Menu plus [sitemap](https://election.inmech.kyiv.ua/sitemap.xml) yielded **25 HTML URLs**. All returned 200; **nine had only a title and empty substantive body**. Five were sitemap-only discoveries, including three shorter duplicate/placeholder URLs.
- Seven election-host downloads returned 200: six PDFs and one DOCX. One is already present in Astro with exactly matching bytes: Order №124.
- The election voter page contains **92 list entries**. Keep this as a dated election roll, not a dynamically regenerated list of current staff.
- Inspected meeting and commission protocols substantiate a 16 June 2026 election, 92 staff in the recorded electorate, 79 registered participants, and 79 votes for V. M. Nazarenko. The commission web summary records zero against and invalid ballots; the scanned result table uses dashes. Transcription must preserve source notation or clearly identify a normalized summary.
- The submission notice records a letter dated 18 June 2026, №50-02-07-173. No later appointment resolution or contract was located in the inspected election pages. Do not infer the completion of that separate administrative step.
- An election programme strategy link and two historical primary-domain result PDF URLs return 404. Corresponding files remain on the old main host. The strategy cover shows approval in December 2025.
- A linked committee extract returns 404 and was not recovered. Its existence or contents must not be fabricated.

The source set is complete for the discovered menu/sitemap/download graph. It cannot prove absence of unlinked files, older election cycles, unpublished committee records, or historical URLs present only in access logs/backups. Records-owner and hosting inventories are required before claiming complete institutional archival coverage.

The proposed retrospective timeline should distinguish issue dates from publication dates:

| Date | Source-backed milestone |
| --- | --- |
| 9 April 2026 | NAS competition announcement referenced by the election pages and nomination slides. |
| 15 April 2026 | Order №124 issued; existing Astro news publication/filename uses 16 April. |
| 28 April 2026 | Scientific Council nomination meeting; regulations also cite Council protocol №5. |
| 26 May 2026 | Trade-union agreement date shown on both regulations PDFs. |
| 9 June 2026, 18:00 | Application deadline stated by the historical competition announcement. |
| 16 June 2026 | Election and signed result protocols. |
| 18 June 2026 | Document-submission letter dated №50-02-07-173. |

These milestones describe the inspected records; they do not establish the date of any later appointment or contract.

## Source reconciliation before publication

| Issue | Evidence | Required treatment |
| --- | --- | --- |
| Stale homepage status | Homepage still advertises applications until 9 June; results pages describe the June election. | New overview must identify a historical 2026 election. Preserve the original notice as dated history. |
| Order date versus filename | Order scan reads **15 April 2026, №124**. Existing Astro filename/news publication date uses 16 April. | Store issue date and publication date separately. Keep the existing document URL; do not rename it merely to make the filename match the issue date. |
| Voting location differs | Election notice says large conference hall, third floor; old main-site announcement says room 211. | Preserve both notices with provenance. Ask the responsible institutional editor to determine the accurate historical venue; record any correction transparently. |
| Electorate description differs | Committee summary includes external part-time staff; voting notice says staff at their main place of work. | Obtain records/legal-owner clarification. Do not resolve eligibility by inference from current law or staff profiles. |
| Empty pages | Delegates and committee-minutes pages have no body; category pages and duplicate short slugs are also empty. | Build useful indexes for genuine categories. For missing records use an explicit source-gap notice; do not invent minutes or delegate procedures. |
| Missing extract | Committee page links `/media/files/vityag-protokol-5.pdf`, currently 404. | Obtain the original from the records owner or authenticated archive. Candidate-nomination slides are a separate document and are not a substitute. |
| Result protocol variants | Election-host meeting PDF and old-main meeting PDF have different sizes/hashes; both visibly show the signed meeting protocol. Old-main commission PDF is byte-identical to the election copy. | Preserve both meeting binaries as source variants pending institutional review; deduplicate only the identical commission bytes. Do not re-save either PDF. |
| Strategy status | Astro presents 2021–2025; the recovered 2026–2030 file has signed/stamped approval and Council details. | Confirm applicability with the institution, publish the recovered original alongside the earlier strategy, and restore its legacy URL. |
| Further appointment step | Submission notice says further NAS consideration will follow. | Add later appointment material only when a source is supplied. Describe the observed election result without inventing appointment dates. |

No legal interpretation or statutory compliance certification is offered by this technical migration plan. Preserve the legislation references as historical sources with their observed URLs/version context; any claim about current legal requirements needs separate authoritative verification.

## Proposed integration in the existing repository

Use the existing layouts, card/colour styles, content collections, route registry, and document-validation patterns. The NCUTAM migration demonstrates manifest-based documents, bilingual fields, stable records, rendered-output checks, and exact-byte verification; adapt those patterns rather than embedding an independent legacy theme.

| Proposed path | Purpose |
| --- | --- |
| `src/content/elections/2026/*.md` | Reviewed historical pages, original-language content, English summaries or reviewed translations. |
| `src/data/elections/2026/documents.yaml` | One document registry with stable IDs, localized titles, issue/publication dates, format/language, source URLs, target path and source status. |
| `src/data/elections/2026/document-hashes.json` | SHA-256 ledger for official binaries; optionally include Git blob hashes to match existing NCUTAM tooling. |
| `src/data/elections/legacy-routes.yaml` | Explicit host/path/action/target ledger for every discovered page and download URL, with status evidence and exceptions. |
| `public/documents/elections/2026/` | Recovered election PDFs/DOCX, using short Latin canonical filenames. |
| Existing order path | Reuse `/documents/institute/orders/director-election-order-2026-04-16.pdf`; no duplicate binary required. |
| `public/documents/institute/strategy/development-strategy-2026-2030.pdf` | Recovered strategy, after institutional verification. |
| `src/pages/director-election/index.astro` | Election archive overview. |
| `src/pages/director-election/[year]/index.astro` | Year overview, timeline, result summary and source status. |
| `src/pages/director-election/[year]/[...slug].astro` | Historical detail/category pages from validated records. |
| Matching `src/pages/en/director-election/…` | English UI using the same data IDs and document files. |
| `src/components/elections/` | Shared navigation, document list, timeline and source-note components where needed. |
| `scripts/check-elections.mjs` | Manifest, references, dates, expected sources, hashes, generated content and route-map consistency. |
| `docs/migrations/director-election-2026.md` | Approved preservation decisions, exceptions, maintenance and cutover record. |

Extend `src/content.config.ts` with election page/document collections using existing `glob`/`file` loaders and reference validation. Suggested page fields: stable ID, year, section, title/titleEn, description/descriptionEn, source URLs, original publication date if verified, event/issue dates, document references, review date, and `sourceStatus` such as `verified`, `historical-web-text`, or `missing-source`.

Suggested document fields: stable ID; localized titles; document kind; original filename; original source URLs; canonical public path; MIME type; byte count; SHA-256; language; issue date and number where verified; source-version note; verification status; reviewed transcription reference. Missing documents must have no invented path/hash or active download button.

Add matching entries/helpers in `src/data/routes.ts` so language switching and alternate metadata do not fall back to the homepage. Add the archive to the HTML/XML sitemaps, Institute navigation/footer as appropriate, and the search index. Update both homepage election links only after the new destinations pass validation. Link relevant management and strategy pages to the historical election archive. Existing news can point to the archive, but must remain distinct from the permanent archival record.

The public year overview should include a concise status, dated timeline, official-source links, document categories, candidate programme, historical voter roll, observed results and outstanding-source notes. Do not present old application deadlines as active calls. Do not regenerate historical affiliations from current staff data.

## Complete discovered election-page map

All source paths below are on `https://election.inmech.kyiv.ua`. Proposed targets are on `https://inmech.kyiv.ua/director-election/2026/`. The table gives target suffixes relative to that base. Every old URL must have its own tested compatibility entry. “Empty” means no substantive body in the inspected source, not that the associated institutional procedure never existed.

| Source path | Observed content | Proposed target suffix and treatment |
| --- | --- | --- |
| `/` | Historical introduction with stale application wording | `(year root)` — historical overview/timeline |
| `/normativna-baza-ta-oficiyni-ogoloshennya.html` | Empty; sitemap-only | `regulations/` — useful normative-document index |
| `/ogoloshennya-prezidiyi-nan-ukrayini.html` | NAS competition announcement | `regulations/announcement/` |
| `/normativna-baza-vibori-kerivnika-ustanovi-u-statuti-nan-ukrayini.html` | NAS Statute summary and references | `regulations/nas-statute/` |
| `/normativna-baza-osoblivosti-obrannya-kerivnika-naukovoyi-ustanovi.html` | Resolution №998 summary/reference | `regulations/resolution-998/` |
| `/rozyasnennya-shchodo-pidtverdzhennya-rivnya-volodinnya-derzhavnoyu-movoyu-dlya-pretendentiv.html` | Language-requirement explanation | `regulations/language-requirements/` |
| `/dokumenti-institutu-robochi-organi.html` | Empty; sitemap-only | `documents/` — institute election-document index |
| `/nakaz-no-124-vid-15042026-r-pro-zabezpechennya-provedennya-viboriv-direktora-institutu.html` | Order №124 and scan link | `documents/order-124/` |
| `/nakaz-no-124-vid-15042026-r.html` | Empty shorter alias; sitemap-only | `documents/order-124/` — same meaningful destination |
| `/polozhennya-pro-organizaciyniy-komitet-z-provedennya-viboriv-direktora.html` | Committee regulations and PDF/extract links | `documents/organizing-committee/` |
| `/polozhennya-pro-organizaciyniy-komitet.html` | Empty shorter alias; sitemap-only | `documents/organizing-committee/` |
| `/polozhennya-pro-viborchu-lichilnu-komisiyu-2.html` | Commission regulations and PDF | `documents/election-commission/` |
| `/polozhennya-pro-viborchu-lichilnu-komisiyu.html` | Empty shorter alias; sitemap-only | `documents/election-commission/` |
| `/protokoli-zasidan-organizaciynogo-komitetu.html` | Empty | `documents/committee-minutes/` — explicit source-gap notice until originals obtained |
| `/kandidati-na-posadu-direktora.html` | Nomination record and Council slides | `candidates/` |
| `/peredviborchi-programi-kandidativ.html` | Full candidate programme; strategy link | `candidates/programme/` — preserve candidate voice, date and attribution |
| `/organizaciya-golosuvannya-ta-viborci.html` | Empty category | `voting/` — index existing notice, roll and observer material |
| `/oficiyne-ogoloshennya-pro-datu-chas-ta-misce.html` | Voting notice | `voting/notice/` — source discrepancy noted |
| `/poryadok-obrannya-delegativ.html` | Empty | `voting/delegates/` — source-gap notice; no invented procedure |
| `/zagalniy-spisok-viborciv.html` | Historical 92-person roll | `voting/voters/` — preserve sequence and as-of context |
| `/pravila-akreditaciyi-sposterigachiv.html` | Observer accreditation and DOCX form | `voting/observers/` |
| `/rezultati-viboriv.html` | Empty category | `results/` — source-backed result index and summary |
| `/protokol-lichilnoyi-komisiyi.html` | Commission protocol summary and PDF | `results/commission-protocol/` |
| `/oficiyne-rishennya-organizaciynogo-komitetu.html` | Staff meeting decision, two protocol links | `results/staff-meeting/` — preserve title/content distinction |
| `/povidomlennya-pro-napravlennya-dokumentiv.html` | 18 June submission notice | `results/document-submission/` |

These 25 sources map to 22 proposed year-section destinations after consolidating the three empty shorter aliases. Existing index placeholders become useful navigation or explicit source-gap pages, not fabricated historical records.

## Document preservation and compatibility map

Canonical election-document paths below are relative to `/documents/elections/2026/`, except the existing order and separate strategy paths. Full hashes and byte sizes are in the [audit evidence appendix](WEBSITE_AUDIT_2026.md#evidence-register).

| Source URL/path | Proposed canonical target | Preservation decision |
| --- | --- | --- |
| Election `/DirectorElection2.pdf` | `candidate-nomination-slides.pdf` | Preserve all six PDF pages; do not confuse with the candidate programme or missing Council extract. |
| Election `/Document_2026-04-16_114124.pdf` | `/documents/institute/orders/director-election-order-2026-04-16.pdf` | Reuse existing exact-byte file; issue date 15 April. |
| Election `/ПОЛОЖЕННЯ про організаційний комітет.pdf` | `organizing-committee-regulations.pdf` | Preserve original bytes and title/approval details. |
| Election `/ПОЛОЖЕННЯ про лічильну комісію.pdf` | `election-commission-regulations.pdf` | Preserve original bytes. |
| Election `/ПРОТОКОЛ зборі.pdf` | `staff-meeting-protocol.pdf` | Preserve this source variant. |
| Election `/Протокол засідання виборчої комісії 16.06.2026.pdf` | `election-commission-protocol.pdf` | Canonical binary also matches the old main-host commission copy. |
| Election `/Заява спостерігача.docx` | `observer-application.docx` | Preserve editable original; a future PDF preview would be additional, not a replacement. |
| Election `/media/files/vityag-protokol-5.pdf` | Not assigned until recovered | Currently 404. Track as an unresolved source, disable the dead download on the new page, link an explanatory source note. |
| Main `/doc/doc/strategy_2026-2030.pdf` | `/documents/institute/strategy/development-strategy-2026-2030.pdf` | Restore this broken legacy path through an explicit HTTP mapping; preserve recovered old-host bytes. |
| Old main `/doc/doc/strategy_2026-2030.pdf` | Same strategy target | Keep old-host path working; redirect only when target is live and verified. |
| Main `/doc/news/2026/2026_protokol_zboriv.pdf` | `staff-meeting-protocol-legacy-main.pdf` | Restore original old-main version, which differs from the election-host version. Include the historical HTTP URL as well as HTTPS. |
| Old main `/doc/news/2026/2026_protokol_zboriv.pdf` | Same legacy-main variant target | Preserve observed old-host version and its provenance. |
| Main `/doc/news/2026/2026_protokol_zasidanya.pdf` | `election-commission-protocol.pdf` | Restore broken main URL; same bytes as election source. |
| Old main `/doc/news/2026/2026_protokol_zasidanya.pdf` | Same commission target | Deduplicate binary bytes while preserving both URL aliases. |
| Main `/doc/Document_2026-04-16_114124.pdf` | Existing canonical order target above | Additional historical alias recorded in `documents-migration.csv`; primary URL is 404, old-host counterpart returns the same exact order bytes. Preserve both host aliases. |
| Existing Astro order URL | Unchanged | Preserve as a stable public download and existing news destination. |

“Election”, “Main” and “Old main” mean `election.inmech.kyiv.ua`, `inmech.kyiv.ua` and `old.inmech.kyiv.ua`, respectively. Preserve literal Unicode filenames and their percent-encoded forms, spaces, case, and the apparent typo in `ПРОТОКОЛ зборі.pdf` as compatibility inputs. New canonical filenames can be short Latin names; old public links must still resolve.

Prefer an explicit 301 from each old download path to its verified canonical file, or exact-byte serving at the old URL where operationally required. A PDF URL must never return a 200 HTML page masquerading as a document. For the unrecovered extract, retain honest missing-resource behavior and a separate explanatory HTML record until the original is recovered or a records-owner disposition is documented. Do not create an empty PDF or redirect it to unrelated material.

External normative links observed in the source include the NAS competition announcement, NAS Statute PDF, the Rada Statute page, Resolution №998, Law №848-VIII and the State Language Commission site. Preserve those references with retrieval dates. A live external URL may later show amended law or another version; retain a reviewed historical reference/copy only where provenance and publication rights permit.

## Preservation rules

1. Preserve signed/stamped originals exactly. Do not optimize, OCR in place, re-save, rasterize, edit metadata, flatten, add watermarks, or merge them as part of migration.
2. Capture source URL, retrieval time, original filename, MIME type, byte size, SHA-256, page count, source version and target URL for each binary. Compute hashes from the bytes, not rendered pages.
3. Store accessible HTML transcriptions or search text separately. The order and protocols have little/no extractable text; OCR alone is insufficient. Have an editor verify names, dates, numbers, totals and signatures' roles against the rendered originals.
4. Keep historical names, positions, election roll ordering, numerical result and programme statements as of their source date. Do not overwrite them from present-day staff collections.
5. Preserve original HTML/sitemap snapshots and a file inventory in a controlled archival location. Public source provenance can be recorded in Git; raw duplicate site captures need not inflate the production repository.
6. Keep both meeting-protocol binary variants until the institution decides their relationship. Distinct hashes must not be collapsed merely because document titles and visible wording match.
7. Preserve the previously published voter roll at its existing level of detail. Obtain the institution's publication/retention decision before changing public availability or adding any information beyond the already published record. Do not enrich the roll with private personnel data.
8. Never use sitemap `lastmod`, upload filenames, or crawler timestamps as substitutes for official issue/publication dates.

## Delivery stages after authorization

### Stage 1 — Evidence freeze and records decisions

Re-crawl the 25 known pages, all document links and old-main references; timestamp and hash the evidence; compare against this baseline. Request a read-only export of unlinked legacy files and relevant URL/access-log inventory through the hosting owner. Identify any previous election years rather than assuming 2026 is the only cycle.

Obtain the missing extract and any actual committee minutes/delegate documents, or record an explicit unresolved-source disposition. Resolve venue/eligibility wording, strategy applicability and later appointment-document status. Secure an archival copy independent of the website deployment directory.

**Gate:** every discovered source has an owner and a destination/disposition. Missing evidence remains visibly unresolved; it is not filled by generated prose.

### Stage 2 — Document registry and year content

Add immutable binaries and verified metadata first. Reuse the existing order. Build page records, dated notices, result summary, candidate programme and source-gap notices. Create reviewed English UI/summaries and separate transcriptions. Retain the original two result-protocol variants.

**Gate:** hashes match the inventory; references resolve; every material factual statement points to an identified source. No source URL is silently dropped.

### Stage 3 — Astro integration and test coverage

Add routes/components, language alternatives, archive navigation, search and sitemaps. Add an election-specific checker to the existing `validate` pipeline. Use the site's semantic card tones and exactly one main landmark per page. Keep the election archive usable with JavaScript disabled for reading and downloading.

**Gate:** source, document and rendered-output checks pass on LF and CRLF checkouts. Site-wide validation/dependency issues identified in the audit must be explicitly addressed or recorded; do not call the native Windows suite green until it passes unchanged.

### Stage 4 — Prepare and review compatibility rules

Determine the actual web-server/CDN configuration and which system owns the election and old-main virtual hosts. Convert the declarative ledger into that system's HTTP rules; no server product was established in this audit. Keep host-specific source matching to prevent same-path collisions.

Astro's present static redirects do not configure another host or demonstrate true HTTP 301 responses. Prefer real server/CDN redirects. An HTML fallback with canonical and ordinary link is a contingency where hosting cannot provide HTTP redirects, and must be documented as a continuity limitation.

Test HTTP and HTTPS inputs, encoded Cyrillic filenames, spaces, slash variants, genuine historical query parameters and anchors. Preserve meaningful query parameters; inventory query-based legacy news archives separately. Do not generate blanket catch-all redirects.

**Gate:** each known source returns the intended HTTP behavior and final content; no loops, unrelated targets, false 200 PDFs or unnecessary redirect chains. A target error must not be concealed by a generic 200 page.

### Stage 5 — Separately approved cutover

Publish and verify the new pages/documents first using the normal repository workflow after review. Change the bilingual homepage links only when destinations are ready. Activate compatibility-host redirects as a separate controlled step. Keep a recoverable copy of the old static site, server rules and last known good Astro artifact.

The election legacy host is not deployed by the examined main-site workflow. Its operator/configuration and rollout must be established explicitly. Main-site deployment uses deletion-capable rsync and excludes `/media/`; neither behavior should be assumed to protect election-host files. New archive assets should live in the normal versioned document paths.

**Gate:** a records reviewer signs off the historical material and a technical reviewer verifies URL/document integrity; the owner approves publishing. No such approval or cutover was performed during this audit.

### Stage 6 — Verification, monitoring and rollback

Immediately after publication, verify the production SHA and content, all mapped URLs, final file hashes and HTTP content types. Check both languages, search, sitemap discovery, keyboard operation, narrow-screen navigation and downloads. After cutover, inspect 404 reports, old-host requests and search indexing when access is available; add newly discovered historical URLs to the ledger.

Keep compatibility URLs for the long term because official documents may cite them permanently. A proposed post-cutover review cadence is immediate, next day, one week and one month; these are plan steps, not scheduled automations.

If an incorrect destination, missing official file, altered document hash or material historical error is found, disable/revert the relevant compatibility rules and restore the previous verified static artifact/rules. Keep old-host DNS/TLS working so rollback is possible. Correct source data through a reviewed change; do not patch generated production HTML.

## Acceptance checklist

- [ ] Every one of the 25 discovered election HTML URLs has a documented tested destination; all five sitemap-only sources are included.
- [ ] All seven election-host binary sources, recovered strategy and old-main protocol variant are preserved with verified hashes; matching commission aliases resolve to the same exact bytes.
- [ ] Existing Astro order URL remains valid; its issue date is 15 April and its publication/filename date is not misrepresented as the issue date.
- [ ] All listed primary-domain `/doc/` URLs resolve again; HTTP/HTTPS and Unicode/encoded variants behave correctly.
- [ ] Missing extract/minutes/delegate records are recovered or explicitly documented as source gaps with records-owner disposition; no fabricated documents or transcripts are published.
- [ ] Historical 92-person roll and result figures are reviewed against originals; venue/eligibility conflicts have transparent treatment.
- [ ] Candidate programme, strategy, nomination slides, meeting decision, commission protocol and submission notice remain distinct source records.
- [ ] English summaries accurately describe original-language documents; language alternatives are reciprocal and never jump unexpectedly to the homepage.
- [ ] Search can find the election archive, its principal documents and relevant vacancy/Institute sections; sitemaps contain canonical targets.
- [ ] Build, local page/download links, anchors, unique IDs, main landmarks, hashes and election invariants pass. Dependency audit findings receive a documented remediation decision.
- [ ] PDF URLs return PDFs with correct MIME types, DOCX remains a valid editable file, and every migrated binary matches its accepted source hash.
- [ ] Touch/pointer users can reach every navigation item; keyboard focus/Escape, no-JavaScript reading, zoom and contrast are manually checked.
- [ ] All cross-host redirects are verified over the real public HTTP path; DNS/TLS remain active; rollback artifact and rules have been tested.
- [ ] Repository owner and institutional records reviewer approve publication through the normal process.

## Maintenance handoff

Keep one authoritative content source in `mfs9697/inmech-site`. Future corrections update reviewed records and provenance; they never silently alter original signed binaries. Future election years receive separate records and directories. The 2026 URLs and records remain stable even when a new election becomes current. Every new or changed document must have a verified source, hash, localized description and a compatibility decision for any previously published URL.


## Responsive presentation consistent with the current design

Reuse `src/styles/cards.css`, `src/styles/block-colors.css`, `src/layouts/BaseLayout*.astro`, and the typography/container conventions documented in `docs/card-system.md`. The proposal is a presentation specification, not an implemented page.

| Area | Desktop | Narrow screens / accessibility |
| --- | --- | --- |
| Year overview | Compact historical-status banner, result summary and dated timeline above category cards | Single column, concise status first; do not force a wide horizontal timeline |
| Category navigation | Existing site-card grid: three/two columns when space permits | One column with wrapping labels; every category reachable without a long unscrollable overlay |
| Document cards | Original title, issue date/number, format/language/size, original-file action and optional transcription | Full-width cards, readable filenames/titles, separate labeled actions; no hover-only metadata |
| Long result/programme text | Readable prose column and anchor-linked contents | Native headings/anchors, no mandatory JavaScript or complex tabs |
| Voter roll | Historical as-of label, department headings and preserved numbered sequence | Reflowing list rather than a wide fixed table; optional enhancement must preserve source order and no-JavaScript access |
| Source gaps | Explicit missing-source notice next to the affected record | Plain text and readable icon/label; no misleading active PDF button |

Use `neutral` for ordinary cards, `heritage` for historical context and `information` for timeline/document collections. Reserve `emphasis` for one principal status/action area; do not alternate card colours by position or rely on colour alone to express status. Keep permanent canonical pages and real links even when adding optional filters/disclosures. Test keyboard focus, Escape where applicable, 200% zoom, short/narrow viewports, print output and downloads in both languages.

## Complete original-file ledger

The following nine unique binaries were inventoried; the existing order is included in that total and should be reused. The old-main commission copy is another URL for identical bytes, not a tenth binary. Distinct meeting-protocol variants remain separate. No signed document was modified during the audit.

| Original filename / source variant | Bytes | SHA-256 |
| --- | ---: | --- |
| `DirectorElection2.pdf` | 104772 | `1a43151da72fd0b519def5a8beaa915f10f276eec6a1df43fce040a4f1aadec7` |
| `Document_2026-04-16_114124.pdf` | 1449561 | `609d59084ef66e38ed1cd499b00bf47340258961461c10ce222ed1103a1fa95d` |
| `ПОЛОЖЕННЯ про організаційний комітет.pdf` | 315611 | `227a8ee1d4e0af62f752d1fd32f6d0643a6ba07633e2a0adf1359b64edba6a18` |
| `ПОЛОЖЕННЯ про лічильну комісію.pdf` | 313626 | `2c4eab9eef3bcdd1ed91aa45adc58125cbc5e4f399352053b2f615315e6a1f35` |
| `ПРОТОКОЛ зборі.pdf` | 498398 | `fc6e72d0674cdffffb632d262b821f519631688c8c2ddcceb8bac3b7ca854f92` |
| `Протокол засідання виборчої комісії 16.06.2026.pdf` | 1074267 | `7425affe75f9a97f81b207466ce9e0ce497759f402ca3135529e2be138a8ca85` |
| `Заява спостерігача.docx` | 17968 | `2c6b9a9b7c6aec2c7c14f608583bb479d9569ef01808024c7464f7a44f065ac0` |
| `strategy_2026-2030.pdf` | 553774 | `9e67b4cb640dec1f8717a6f057f7b8382c1d10f3f1a3884b058b0596d3dc8cb9` |
| `2026_protokol_zboriv-old.pdf` | 494372 | `3de81e422343d2463884752d7bf489897621edbb265a1c0279de91cb689ba341` |

The legacy repository worksheet `documents-migration.csv` also records the main-host order URL `/doc/Document_2026-04-16_114124.pdf`, which returned 404. Its old-host counterpart returned 200 with exactly the existing order hash. This is an additional compatibility input beyond the election sitemap/menu. The original order news record remains at `src/content/news/2026/2026-04-16-director-election-order.md`, with `externalUrl` pointing directly to the canonical PDF; it does not generate a separate news-detail HTML page. Preserve that behavior/URL unless a separately reviewed replacement supplies continuity.

Cross-check every mapping against the current source graph before implementation; unlinked content and other election cycles still require the institution’s archive/export inventory. The plan is complete for the discovered sources, not a claim of complete access to the institution’s records. See [WEBSITE_IMPROVEMENT_ROADMAP.md](WEBSITE_IMPROVEMENT_ROADMAP.md) for the small PR sequence and dependencies.
