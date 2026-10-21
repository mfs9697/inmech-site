# WEBSITE_AUDIT_2026 — comprehensive findings

**Date:** 21 October 2026, Europe/Kyiv<br>
**Mode:** read-only audit; proposed contents for `docs/audits/2026-10-21/WEBSITE_AUDIT_2026.md`<br>
**Repository:** [mfs9697/inmech-site](https://github.com/mfs9697/inmech-site)<br>
**Examined revision:** [`fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70`](https://github.com/mfs9697/inmech-site/commit/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70)

## Assessment

The repository provides a sound static Astro foundation, bilingual layouts, structured content, meaningful archive checks, and deployment verification. Production's public deployment marker returned the examined SHA, and the corresponding [Actions run](https://github.com/mfs9697/inmech-site/actions/runs/39620183704) succeeded. The principal migration risk is historical information and URL continuity: the election archive remains outside Astro, some public document URLs already fail, and the current strategy is available on the old host while the new strategy page still presents 2021–2025.

Prioritize election preservation and URL recovery alongside dependency maintenance and mobile navigation. A visual redesign alone would leave the most consequential defects unresolved.

No source files were changed. No commits, pushes, pull requests, merges, server changes, or deployments were made. A local audit checkout, generated build output, evidence downloads, and report files were created in the audit workspace only. Final Git status and diff were clean.

## Scope and evidence

Reviewed the root `AGENTS.md`, README, all ten existing documents under `docs/`, package and lock files, Astro configuration, shared layouts, navigation, content schemas, representative pages and content records, maintenance/validation scripts, CODEOWNERS, deployment workflow, active branch ruleset, and recent history. No nested `AGENTS.md` was present in the tracked tree.

The latest 30 commits were available in the audit checkout. Recent relevant changes include:

| Commit | Change | Audit implication |
| --- | --- | --- |
| `fbcb2f7` | Bilingual homepage vacancy buttons | Present in the live browser; cached web extraction initially omitted the new button. |
| `736ba3a`, `ea4161d`, `e92e1c1` | Postdoctoral regulation index, local documents, corrected basis | These changes are in the examined revision. Earlier broken-link commits are not evidence of a remaining postdoc defect. |
| `4a96b95`, `b1982ff` | Numbered-list rendering and regression check | Reuse existing regression checks when adding election content. |
| `f95b9c9` | Seven-source Google Calendar integration | Calendar is an external embed, with publication checks documented separately. |

Examined all **388 generated HTML documents** structurally, plus selected production pages and headers. Crawled every URL in the election sitemap, its menu, and its linked documents. Cross-checked the older main website and recovered historical documents. Live browser checks covered narrow-screen homepage/navigation and search. This is not a WCAG certification, penetration test, exhaustive external-link crawl, server configuration inspection, or Core Web Vitals measurement. No private analytics, Search Console data, SSH configuration, backups, or server credentials were accessed.

## Actual implementation

| Area | Repository implementation |
| --- | --- |
| Framework | Locked Astro **7.0.6**, `@astrojs/sitemap`; Node requirement `>=22.12.0`, CI Node 24. |
| Output | `output: 'static'`, root base `/`, default canonical site `https://inmech.kyiv.ua`; environment override supported. No SSR adapter configured. |
| Content | 17 news records, 89 person records, 12 department/centre records; schemas in `src/content.config.ts`. Twelve collection records do not imply twelve independent research departments. |
| Shared UI | `BaseLayout*.astro`, `Header*.astro`, `Footer*.astro`, shared CSS; paired Ukrainian/English pages. |
| Routing | Astro filesystem routes, plus `src/data/routes.ts` for language alternatives and HTML sitemap. Configuration has two NCUTAM redirects; no election migration routes. |
| Official documents | Static `public/` files; NCUTAM has a document manifest and pinned Git blob hashes. Election has only an existing order PDF/news link in Astro. |
| Public assets | 374 files, approximately 354 MB uncompressed in `public/`; repository has 869 tracked files. |
| Interactive features | Browser-side search; navigation scripts; external Google Calendar iframe; trust-box form prepares a `mailto:` message. |
| Publishing | PR `validate`; main/manual build, validation, SSH/rsync upload, deployment SHA verification and HTTP smoke checks. |

Architecture evidence: [configuration](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/astro.config.mjs), [schemas](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/content.config.ts), [package scripts](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/package.json), [workflow](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/.github/workflows/deploy-to-inmech.yml).

## Prioritized findings

P1 means address promptly or before election cutover; P2 means a material next maintenance task; P3 means lower-impact cleanup. None of these findings establishes a current compromise.

### F01 — P1: Election preservation and URL continuity are incomplete

Both homepages send visitors to the separate [election site](https://election.inmech.kyiv.ua/). Its menu and sitemap expose **25 HTML URLs**, all returning 200; **nine contain no substantive body beyond their title**. Five sitemap URLs are absent from the main menu. Seven linked election-host binary files remain downloadable. Only the order PDF has an exact-byte match in the Astro public assets.

Confirmed failures include the committee extract `/media/files/vityag-protokol-5.pdf`, the programme's main-domain strategy URL, and two historical main-domain result PDFs. The separate [migration plan](DIRECTOR_ELECTIONS_MIGRATION.md) provides the complete discovered route map, document dispositions, source reconciliation, validation, cutover, and rollback requirements. See the [evidence register](#evidence-register) for status and hash evidence.

Source integration points: [Ukrainian homepage, line 67](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/index.astro#L67), [English homepage, line 67](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/en/index.astro#L67).

### F02 — P1: Dependency audit reports 11 vulnerable packages

`npm ci` succeeded, but `npm audit --json` exited 1 and reported **one critical and ten high package-level findings**. The direct dependency is Astro 7.0.6; affected transitive packages include Sharp 0.34.5, Vite 8.1.3, devalue 5.8.1, and others listed in the evidence register.

The [Astro maintainer advisory](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2) identifies malicious AVIF processing as the critical vulnerability's prerequisite and names Astro 7.2.8 as its fix. That is not a recommendation to stop at 7.2.8: the complete current dependency graph must be audited after updating. Static production does not run an Astro image endpoint, and the source scan found no `astro:assets`, `getImage`, View Transitions imports, or AVIF usage. A remotely exploitable production path was not demonstrated. Build/development exposure and future image-processing changes still warrant prompt remediation.

Proposed action: review a targeted dependency/lockfile update in its own future PR; run the complete suite, rendered-page checks, and audit again. Do not use a forced audit fix.

### F03 — P1: Mobile menu extends below the viewport without internal scrolling

In the live narrow-screen browser, opening the menu expands every submenu. The absolute menu sits inside the sticky navigation shell and extends well beyond the viewport. Scrolling moves the underlying document while the lower menu remains below the screen; later sections and search are difficult to reach by touch/pointer.

Evidence: [mobile CSS](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/styles/global.css#L434), [navigation script](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/scripts/navigation.ts). There is no menu `max-height`/vertical overflow handling in the reviewed styles.

Proposed action: constrain the panel to available viewport height with its own scroll area, open only the necessary subsections, retain Escape/focus behavior, and verify every link at narrow and short viewport sizes. Keyboard and screen-reader checks must accompany the visual fix.

### F04 — P1: Current strategy is missing from Astro

The [production strategy page](https://inmech.kyiv.ua/strategy/) presents 2021–2025 and says a new strategy will be added after approval. The election programme links a 2026–2030 PDF at a now-broken main-domain path. The [same path on the old host](https://old.inmech.kyiv.ua/doc/doc/strategy_2026-2030.pdf) returns a seven-page document. Visual inspection of its cover shows a signed/stamped approval dated 26 December 2025 and Scientific Council consideration dated 25 December 2025, protocol №17.

Proposed action: confirm the recovered document's institutional status, preserve its original bytes, publish it alongside the 2021–2025 historical version, and restore the old URL. Do not silently replace historical content or conflate the strategy with the candidate's election programme. Source: [strategy page implementation](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/strategy.astro#L7).

### F05 — P2: Site search omits important sections

The live query **“вакансії” returns zero results**, although `/vacancies/` exists. Both search implementations maintain a small handwritten static-page list and index news, departments, and people. They do not ingest vacancy records, NCUTAM records, most static routes, election records, or document contents.

Proposed action: build one search index from the route registry and supported content/data collections, with localized fields and document titles. Add election material as part of migration. Avoid claiming full-text PDF search unless text extraction is actually implemented. Keep the index separately cacheable as it grows. Evidence: [Ukrainian search](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/search.astro#L14), [English search](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/en/search.astro#L18).

### F06 — P2: Windows CRLF checkout breaks NCUTAM validation

Unmodified `npm run validate` built successfully and passed sitemap, landmarks, links, vacancies, and dissertation checks, then failed NCUTAM semantics. The audit machine's Git setting checks out text as CRLF. Regexes for responsibilities, galleries, and document lists assume LF. A diagnostic wrapper normalized filesystem text reads in memory without editing files; the original semantic checker then passed. Remaining NCUTAM checks also passed independently.

Proposed action: normalize line endings in the parsers, preferably use a real YAML/frontmatter parser where practical, add CRLF/LF fixtures, and document repository line-ending policy. Do not “repair” valid governance content to satisfy this false failure. Evidence: [responsibility checks](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/scripts/check-ncutam.mjs#L194), [gallery/document checks](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/scripts/check-ncutam.mjs#L278).

### F07 — P2: Validation has important coverage gaps

The internal-link checker explicitly skips assets/downloads, external URLs, and fragment-only links. Its default host is still `new.inmech.kyiv.ua`, although Astro defaults to the primary domain. The asset audit is separate and non-blocking, and ignores absolute HTTP asset references. Current generated pages had no absolute primary-host navigation links, so the host mismatch is a latent gap, not an observed broken link.

Proposed action: share one canonical-site setting; add blocking local download existence and fragment/duplicate-ID checks; validate sitemap contents as well as file presence; add the election document/hash/route manifest to CI. Keep external HTTP checks separate to avoid flaky PR builds. Evidence: [link checker](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/scripts/check-internal-links.mjs#L6), [asset audit](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/scripts/audit-generated-assets.mjs), [sitemap check](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/scripts/check-sitemap-output.mjs).

### F08 — P2: News scopes are not respected in Institute listings

The analytical-note record explicitly has `scopes: ["ncutam"]`, but appears in the Institute homepage news block. The Institute homepage and news-index queries do not filter by scope; maintenance documentation distinguishes Committee-only and shared items.

Proposed action: filter Institute feeds by `institute`, and NCUTAM feeds by `ncutam`. If the analytical note should appear in both, change its scope only after an editorial decision. Evidence: [homepage query](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/index.astro#L19), [record](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/content/news/2026/2026-10-19-ncutam-mechanics-analytical-note.md#L11), [maintenance rule](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/docs/NCUTAM_MAINTENANCE.md#L53).

### F09 — P2: News archive discoverability will deteriorate on a future-year build

Both news indexes filter to the build machine's current year. There is no generated year-index route; `YearArchive.astro` links only the current year. On a 2027 build, 2026 records remain generated/searchable but disappear from the main index, without an equivalent year archive.

Proposed action: generate year archives from actual records, provide an all-years/year selector, and avoid making historical election material depend on current-year news. Evidence: [news filtering](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/news/index.astro#L10), [year navigation](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/components/YearArchive.astro).

### F10 — P2: Large catalogue HTML and image payloads need attention

Generated dissertation catalogue HTML is approximately **1.72 MB Ukrainian / 1.65 MB English**, before compression, for 615 records per language. Scientific-book pages are approximately 620/566 KB; search pages approximately 404/335 KB. Five 2025 NCUTAM meeting photographs total about 13.3 MB. These are file sizes, not measured network transfer or performance scores.

Proposed action: paginate or partition catalogues with stable entry anchors and crawlable links; load/cache search data separately; create responsive image derivatives with dimensions and suitable lazy loading. Keep original official PDFs unchanged. Five dissertation PDFs exceed 10 MB; offer file sizes and accessible summaries before considering any equivalent-rendering derivative.

### F11 — P2: Historical URL continuity needs a site-wide ledger

The formerly indexed primary-domain `/l/en/news/` currently returns 404. Legacy pages remain available on `old.inmech.kyiv.ua`, but links inside them can still point to the primary domain's removed `/doc/` paths. The configuration's two NCUTAM redirects are not a general legacy migration map.

Proposed action: inventory legacy main-site routes, query-based news archives, historical staff URLs and document URLs; specify exact replacements rather than redirecting everything to the homepage. Start with the election URLs in this audit. Server-side handling is necessary for host and query-based continuity; existing static Astro redirect output alone does not demonstrate real HTTP redirects.

### F12 — P3: Duplicate contact IDs and a JavaScript-dependent history anchor

Both journal pages have a local `id="contacts"`, also present on the shared footer. Rename the journal-specific anchor and its referring links. The English history page's `#directors` ID is added by JavaScript; emit it in the source for native fragment behavior. One English Guz page title is also shared between a staff profile and director biography; distinguish the titles if both remain canonical.

Evidence: [Ukrainian journal](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/journal/index.astro#L411), [English journal](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/en/journal/index.astro#L404), [footer](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/components/Footer.astro#L15), [history section](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/en/history.astro#L515).

### F13 — P3: Documentation and asset cleanup

README still names `new.inmech.kyiv.ua` as the working site/default config, despite current primary-domain configuration and a live redirect from the new host. `docs/news-only-guard.md` refers to the absent `.github/workflows/astro.yml`. `docs/content-maintenance.md` names the absent `src/data/defenseMaterialsArchive.ts`. README's validation overview omits newer dissertation/NCUTAM checks.

One exact duplicate PDF remains between the July active-vacancy folder and completed archive. Check inbound links and preserve their URLs before removing either copy. No missing local generated asset references or `/public/` prefixes were found.

### F14 — P2: Trust-box form has an unsafe no-JavaScript fallback

Both trust-box forms omit `action` and `method`, contain a textarea named `message`, and use a submit button. JavaScript normally intercepts submission and opens an email. If that handler is unavailable, native form behavior submits a GET to the current page with the message in the URL, potentially recording appeal content in browser history and server logs. This is a source-based finding; no appeal was submitted during the audit.

Proposed action: prevent native GET submission of the message and provide an explicit no-JavaScript email fallback. Verify both language versions with JavaScript unavailable using synthetic, non-sensitive text. Evidence: [form markup](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/trust-box.astro#L103), [intercepting handler](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/trust-box.astro#L174), [English form](https://github.com/mfs9697/inmech-site/blob/fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70/src/pages/en/trust-box.astro#L103).

## Security and deployment observations

The active [Protect main ruleset](https://github.com/mfs9697/inmech-site/rules/18507791) requires the `validate` check and code-owner review, and blocks deletion/non-fast-forward updates. It has no bypass actors in the returned configuration. Classic branch protection reports disabled, but the active ruleset supplies protection; reporting “main is unprotected” would be incorrect.

The workflow validates before upload, uses a public SHA marker, and performs smoke checks. Improve the following in future reviewed work:

- Pin the SSH server's expected host key rather than learning it with `ssh-keyscan` during every deployment. No server/key values were inspected.
- Consider immutable release directories and an atomic switch with a tested rollback. Rsync delayed updates reduce disruption but do not make the entire multi-file release atomic.
- Explicitly set least-privilege workflow permissions and consider immutable action revisions, subject to normal maintenance policy.
- Test whether the news-only deployment guard meets the desired contributor policy: it runs after merge, evaluates the triggering actor, and skips when a previous SHA is unavailable. It is not a substitute for PR checks or repository permissions; do not assume it restricts every secretary-authored change merged by someone else.
- Primary-homepage response samples lacked HSTS, CSP, `X-Content-Type-Options`, Referrer-Policy, Permissions-Policy and X-Frame-Options headers. Confirm server ownership/configuration, then introduce compatible headers, beginning CSP in report-only mode because the site uses inline scripts and external embeds. This absence alone does not establish an exploit.

Google Analytics is conditional on a public build variable; Google tag-manager/gtag references were present in both sampled production homepages. No private analytics settings, retention configuration or consent requirements were assessed. The trust-box implementation clearly says it prepares an email; it does not provide a backend inbox, guaranteed delivery, or anonymity. Maintain that distinction in public wording and correct the native form fallback described in F14.

## Accessibility, localization, and information design

All generated documents had one H1 and one complete main landmark; no image lacked an `alt` attribute. This checks presence, not descriptive quality. Paired layouts emit localized language, canonical and alternate links. All 17 news records had English title/description/category fields; all people had English names; all department records had basic English title/summary/section fields. Translation accuracy was not independently certified.

Keep the existing semantic colour/card system and keyboard navigation. Address the mobile panel and duplicate IDs before extending navigation. The election section should have a visible historical status, a compact timeline, clear source/document relationships, localized download labels, document language/size information, and reviewed HTML transcriptions alongside scanned originals.

The external calendar is not a native event data API. The extended scope verified all seven anonymous public feeds and observed events in the combined agenda. This verifies source availability at the audit date, not complete cross-origin iframe accessibility or future calendar settings.

## Verification results

| Check | Result |
| --- | --- |
| `npm ci` | Passed; no lockfile/source changes. |
| Astro build inside `npm run validate` | Passed; 388 pages. |
| Sitemap output | Passed; index and sitemap present. |
| Main landmarks | Passed, 388 documents. |
| Internal links/self-test | Passed; 17,414 internal page links; 2,649 external and 451 asset/download references excluded. |
| Vacancy archive | Passed; 15 bilingual archived competitions, three PDFs each. |
| Dissertation catalogues | Passed; 615 records per language. |
| Native Windows full `validate` | **Failed** at NCUTAM semantics due to CRLF assumptions. |
| NCUTAM semantic diagnostic with in-memory LF normalization | Passed: 429 members, 17 governance assignments, 20 documents, six media records. |
| Remaining NCUTAM checks run separately | Passed: 213/213 active affiliations, 20 pinned document hashes, 50 rendered HTML files. |
| `audit:assets` | No missing local references/prefix errors; ten oversized assets and one duplicate group. |
| `npm audit --json` | Failed; 11 vulnerable packages, 10 high and one critical. |
| Additional generated-page inspection | Two duplicate-ID pages; one source fragment depends on JavaScript; one duplicate English title pair. |
| Production identity | SHA marker equals examined revision; primary and English home/vacancy pages, robots and sitemaps returned 200. |
| Repository integrity | Final status clean; `git diff --check` clean. |

## Proposed work sequence

1. Preserve election evidence and recover document continuity using the companion migration plan. Resolve the missing committee extract and conflicting historical statements with the responsible records owner before cutover.
2. Prepare separate dependency, mobile-navigation and trust-box fallback fixes, then make validation work consistently on Windows and CI.
3. Implement election pages, immutable document manifests, language routes, search/sitemap entries, and compatibility mappings in reviewable stages.
4. After content and technical acceptance, schedule a separately approved host cutover with rollback and post-deployment checks.
5. Follow with search coverage, news scope/year archives, catalogue/image performance, remaining legacy URL continuity, and documentation cleanup.

Implementation and publication remain proposed work requiring subsequent authorization. The detailed P0–P3 plan and small PR sequence are in [WEBSITE_IMPROVEMENT_ROADMAP.md](WEBSITE_IMPROVEMENT_ROADMAP.md). This report does not authorize any source or production change.


## Extended scope: section-by-section review

This continuation covers the detailed scope supplied after the initial audit. The remote `main` SHA remained `fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70`. No pull or source update was performed. The additional HTTP survey reached **158 URLs: 122 registered production URLs and 36 legacy URLs**. A further **36 department URLs** comprised 12 legacy pages and both language versions of 12 Astro department/centre records. All 194 of these requested URLs returned 200. These are bounded route surveys, not an assertion that every historical URL or attachment on the server has been discovered.

### Major-section coverage and remaining migration work

| Section | Implementation and live evidence | Assessment / next action |
| --- | --- | --- |
| Organization, history, founder and identity | `src/pages/history.astro`, `src/pages/founder.astro`, `src/components/history/`, `src/components/founder/`, `src/pages/identity.astro`; `/history/`, `/founder/`, `/identity/`; legacy `/l/ua/main/` | Substantial Astro content exists. Preserve history/current-role distinctions and cited sources. The English director anchor and duplicate biography title need the small fixes identified earlier. |
| Management, councils and services | `src/pages/management.astro`, `scientific-council.astro`, `specialized-councils.astro`, `services.astro`, `young-scientists.astro` and English counterparts; corresponding production routes all 200 | Staff/service arrays are repeated in language pages instead of one bilingual record. No authoritative current personnel roster was supplied to certify every role. Three sampled legacy young-scientist PDFs match current public assets byte-for-byte. |
| Statutes and strategy | `src/pages/regulations.astro`, `strategy.astro`; `/regulations/`, `/strategy/`; legacy `/l/ua/regulations/`, `/l/ua/development_strategy/` | All three legacy statute binaries match the 2003/2016/2023 Astro files. Strategy 2026–2030 remains missing from Astro. Preserve older versions and old URLs rather than replacing them. |
| Research departments and people | `src/content/departments/*.md`, `src/content/people/*.md`, `src/pages/{en/,}departments/[id].astro`, `people/[id].astro` | Twelve department/centre records and 89 profiles are already structured. All 36 tested old/new department routes returned 200. Avoid importing legacy current-staff descriptions over newer records; migrate genuinely missing historical/project material only after source comparison and owner review. |
| Library and publications | `src/data/bibliographyAll.ts`, bibliography shards, `monographs.ts`, `textbooks.ts`, `multivolumeEditions.ts`, `src/pages/library/` | A substantial catalogue is implemented, with large generated pages. Legacy `/l/ua/library/` includes historic links and two `pm_*.rar` resources; rights, purpose and existing publication coverage need review before copying. Existing bibliographic descriptions do not establish preservation of every publication binary. |
| Journal and author instructions | `src/data/journal.ts`, `src/pages/journal/index.astro`, `for-authors.astro`, English equivalents; `/journal/`, `/journal/for-authors/` | Dedicated bilingual pages and author guidance exist. Duplicate `contacts` IDs are confirmed. Check publisher/archive links separately over time; externally hosted journal issues are not necessarily migration candidates. |
| Postgraduate programme and accreditation | `src/pages/postgraduate/`, `src/pages/license-and-regulations.astro`, `nmr.astro`, `src/data/postgraduateSchedule.ts`; corresponding bilingual routes all 200 | Programme years, accreditation, surveys, students and schedules are present. Four sampled 2026 admission PDFs match old-host originals. English programme links omit 33 syllabi and 14 reviews already available on the Ukrainian page. Admissions dates conflict within both languages. |
| Doctoral studies | `src/pages/doctoral.astro`, `src/pages/en/doctoral.astro`, `/documents/doctoral/admission/doctoral-admission-rules.docx` | The rules file matches legacy `2023_doct.docx` exactly. The old doctoral-page teacher-rating PDF also matches the migrated NMR file. Filename year is provenance, not proof the rules remain applicable; obtain an institutional applicability review. |
| Dissertation materials and bibliography | `src/pages/dissertations.astro`, `src/components/DefendedDissertationCatalog.astro`, `src/data/defendedDissertations*.ts`, `defendedDissertationArchiveAdditions.ts` | 615 citations per language pass consistency checks; current/recent defence pages expose 41 unique PDF/DOC(X) paths per language. Fifty historical dissertation-download targets in the migration CSV are absent. All 50 counterpart old-host URLs returned 200 to HEAD; one abstract was downloaded and had no exact public-asset match. |
| Vacancies and official announcements | `src/data/vacancies.ts`, `vacanciesEn.ts`, `src/pages/{en/,}vacancies.astro`; 15 archived competitions and one active announcement | Archive consistency and 45 required archival PDFs pass checks. Active announcement has two tracks and three positions/programme places; dates, track IDs, counts and download targets agree across languages. The order identifier is displayed as `118/к` versus `118/k`; retain the official raw identifier separately from transliterated labels. Active records are outside the archive checker's coverage. |
| News and historical announcements | `src/content/news/2026/`, `src/pages/{en/,}news/`; old `/l/ua/news/?year=2018` through `2026` | All 17 Astro news files are under 2026. Older years remain on the legacy site. Reconcile by date/source identity, preserve attachments and query-based URLs, and add permanent year archives. Do not infer that every legacy item should become an undated current announcement. |
| Director elections | Homepages, existing order record, separate election site, legacy CSV/order aliases | Highest-priority dedicated plan. Twenty-five election HTML sources, seven election downloads, strategy and distinct result-protocol variants are inventoried. An additional old main-domain order alias in `documents-migration.csv` returns 404 and needs continuity handling. |
| Conferences | `src/content/ncutam-activity/conferences/current-problems-mechanics-2023.md`; legacy `/l/ua/conferences/` | The 2023 conference narrative/gallery exists in Astro, but seven legacy conference attachments returned 200 and none matched any current public file by SHA-256. Migrate the archive attachments, not a duplicate event narrative. |
| Cooperation and partnerships | `src/pages/{en/,}scientific-cooperation.astro`; legacy `/l/ua/ns/` | Public summaries distinguish some expired agreements. `.gitignore` deliberately excludes signed cooperation PDFs from the public repository. Do not automatically copy 14 legacy contract/resource links into Git. Confirm publication decisions and source dates; CICY's 2025 summary versus a 2022 legacy filename is a question, not a proven wrong date. |
| Events calendar | `src/components/InstituteEventCalendar.astro`, `src/data/instituteGoogleCalendars.ts`; `/events/`, `/en/events/` | All seven public ICS feeds returned 200 without cookies/authentication: VEVENT counts 0, 28, 24, 14, 7, 7, 7. The embedded agenda loaded eight upcoming events in the browser. No replacement event-storage system is needed for parity. Preserve source ownership and distinguish source events from translated UI. |
| Procurement and trust box | `src/pages/{en/,}tender.astro`, `trust-box.astro` | Procurement remains a third-party widget with an external fallback. Its English page requests Ukrainian widget locale, which should be disclosed or localized if supported. Trust box is an email-preparation interface, with the native GET fallback defect described in F14. |

Legacy URLs in the table use `https://old.inmech.kyiv.ua`; production routes use `https://inmech.kyiv.ua`. All exact source paths and additional attachment evidence appear in the appendices below.

## Additional confirmed findings and source questions

### F15 — P1, confirmed: Historical dissertation binaries are not preserved by catalogue parity

`documents-migration.csv` contains 184 rows: three `canonical-vacancy-archive` and 181 `to-download`. Fifty-four proposed targets do not exist; **50 are under `public/documents/dissertations/archive/2015/` through `2021/`**. The remaining four are an NMR membership DOCX and three legacy schedule PDFs. The CSV also names five source paths that no longer exist. It is a historical migration worksheet, not a current completion ledger.

All 50 dissertation counterpart URLs on the old host returned 200 to HEAD. This confirms availability responses, not hash-preserved ingestion. A GET of `https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/26ref.pdf` returned a 3,231,648-byte PDF, SHA-256 `c655306c6f3ef7332385db145e6ac9deab0cd800bbc51d52df8fb0896f38e49b`; no current public file matched it. The catalogue component is bibliographic, and does not restore those downloads.

Recommendation: preserve and link historical defence source files in verified batches using stable defence/document IDs; preserve original archive formats and add safe previews only as separate derivatives. Do not delete the old host on the strength of the 615-record catalogue check. Exact CSV targets and old-host availability are listed in Appendix D.

### F16 — P2, confirmed: English programme document discoverability is incomplete

`src/pages/postgraduate/program.astro` exposes 61 unique PDF paths. `src/pages/en/postgraduate/program.astro` exposes 14: programmes/curricula and surveys. **33 syllabi and 14 stakeholder reviews are omitted**. The English lead says it provides syllabi links, while review cards show counts and say the materials are Ukrainian without linking to them. The global Ukrainian language switch exists, but there is no direct link from each affected English card to its shared document.

Recommendation: share the same document IDs/URLs between locales, translate only labels/descriptions, and retain a clear “original Ukrainian document” indicator. This requires no automatic translation of official files. Evidence: [English programme](https://inmech.kyiv.ua/en/postgraduate/program/), [Ukrainian programme](https://inmech.kyiv.ua/postgraduate/program/), source paths above.

### F17 — P2, confirmed contradiction; correct date unresolved: Admission timeline

Both `src/pages/postgraduate/admission.astro` and `src/pages/en/postgraduate/admission.astro` describe specialty examinations ending 7 September, ranking by 12 September and enrolment by 14 September, then advertise recordings of an entrance examination dated **15 September 2026**. The conflict is visible at [the admission page](https://inmech.kyiv.ua/postgraduate/admission/); it is not a Ukrainian/English mismatch.

Recommendation: obtain the signed rules/amendment and identify whether the recording date, timetable or event description needs correction. Preserve amendment history. Mark completed admission cycles as historical, and do not automatically reuse their dates for the next intake. No date has been corrected during this audit.

### F18 — P2, confirmed: Conference attachments remain outside Astro

Seven distinct files linked by `https://old.inmech.kyiv.ua/l/ua/conferences/` were downloaded for hashing. All returned 200, with no exact-byte match under `public/`: abstracts, programme, report-topic DOC, two information-letter PDFs and two abstract-template DOCX files. An Astro activity record already covers the conference and gallery. Add the originals as documents on that record, with provenance and compatibility mappings; do not create a competing event page. Full URLs and target-match results are in Appendix C.

### F19 — P2, confirmed validation gap: Active competition facts are unchecked

`scripts/check-vacancy-archive.mjs` checks archived competitions, position counts, dates, order and required files. It does not read `activeVacancyAnnouncements` or their tracks/publication dates. A separate read-only comparison found the active UK/EN IDs, dates, track IDs, position counts and document paths aligned. This is a coverage gap, not a demonstrated incorrect active announcement.

Recommendation: validate active records and tracks, distinguish order date from publication/deadline dates, and keep an immutable source identifier for each official order. A later refactor can consolidate duplicated locale data, preserving all published URLs and the special active-versus-complete-archive lifecycle.

### F20 — P3, confirmed dead paths and review candidates: Reduce complexity selectively

| Evidence | Classification | Recommendation |
| --- | --- | --- |
| `src/pages/en/[slug].astro` returns paths from an empty `genericPages` object | Confirmed zero generated routes | Remove after checking for undocumented tooling use; no routing behavior should change. |
| `src/components/YearArchive.astro` has no import/reference in current source/scripts and only links the current year | Confirmed unreferenced component in the static reference scan | Replace its role with real year archives, then remove the unused component in a small cleanup. |
| `src/data/director-images/*.b64`, `scripts/ncutam-pdf-parts/*.b64` have no static references in tracked source/scripts | Possible migration/transport remnants | Establish provenance before removal. They were not demonstrated to be byte-identical duplicates of public assets. |
| `documents-migration.csv` has obsolete source paths/statuses; migration scripts mutate files and try filename variants | Confirmed stale worksheet; scripts may remain useful tools | Label it historical or reconcile it into the new ledger. Never run old download/replace scripts blindly; require exact-source and hash verification. They were not executed in this audit. |
| Separate Header/Footer/layout implementations; page-local UK/EN arrays; handwritten search list and route registry | Confirmed duplicated maintenance surfaces | Extract shared data/labels incrementally, preserving markup and URL behavior; avoid a whole-site rewrite. |
| Base layout imports `global.css`, `overrides.css` and multiple navigation styles; Header adds scoped rules for the same areas | Confirmed layered ownership | Consolidate a single component at a time with desktop/mobile visual checks. Layering alone is not a rendering defect. |
| `src/utils/bilingualBody.ts` is a custom limited Markdown renderer used for news and NCUTAM | Confirmed restricted syntax; prior list regression exists | Document supported syntax and add fixtures for required constructs. Adopt an established rendering pipeline only with output-equivalence checks and dependency review. |
| Strict TypeScript config exists, but no `astro check` script/checker is in `package.json` | Confirmed static-analysis gap | Evaluate an explicit type-check job; build success alone does not establish all TypeScript contracts. |

### Items requiring verification rather than correction by assumption

- CICY agreement year: `src/pages/scientific-cooperation.astro:87` and English counterpart say 2025; a legacy link filename contains `2022.03.28_CICY.pdf`. A filename is not sufficient to establish the true signing/renewal date. Obtain the source record without publishing restricted agreements.
- Doctoral rules: the current DOCX exactly matches an old file named `2023_doct.docx`. This establishes preservation, not current legal applicability.
- Personnel qualifications, department leadership, memberships and contacts: translations/basic structure were inspected, but the institution must verify the authoritative present-day roster and official English names.
- External publications, certificates, video availability and publisher archives: HTTP/page presence and local file checks are not exhaustive external-resource validation.
- Accessibility and performance: no WCAG conformance certificate, assistive-technology audit or field Core Web Vitals dataset was obtained. Lack of image width/height attributes is an optimization candidate, not proof of layout shift where CSS reserves space.

## Ukrainian/English, SEO and technical consistency

Across the 388 generated documents, **386 have reciprocal UK/EN alternate URLs that resolve within the build**. The two unpaired pages are `/documents/postdoc/regulations/` and `/documents/postdoc/resolution-260/`: Ukrainian original-document transcriptions, not untranslated English interface pages. They need clear original-language labeling rather than automatic legal translation.

Canonical URLs match the built paths after normalizing percent encoding. Encoded Cyrillic/space-containing tag URLs are valid equivalents, not canonical defects. The registered language routes include postgraduate subpages, dynamic department/person/news paths and NCUTAM activity routes. The election paths must extend that system explicitly. Basic translated metadata is present in all 17 news, 89 people and 12 department records; translation accuracy and all free-text factual nuances require editorial review.

UK/EN download target sets agree for sampled statutes, doctoral rules, young-scientist documents and current/recent defences. The programme gap in F16 is an actual discoverability mismatch. The one Ukrainian-only student certificate link is an external professional-development certificate, not a missing local file; do not report its external `/downloads/` pathname as a missing Astro asset.

The English procurement page hardcodes widget locale `uk`. The calendar embed does not set `hl`, and the Ukrainian page's Google controls rendered in English in the audit browser. Localize the third-party interface when supported, or clearly disclose its language; original Ukrainian event titles/documents can remain Ukrainian. No API-based replacement is required for basic bilingual navigation.

Build/asset checks found no missing local image/download reference. All generated pages retain one H1/main, and every image has an `alt` attribute. Duplicate IDs and the JavaScript-created history anchor remain confirmed small defects. There were 708 image references, representing 124 unique sources, without intrinsic width/height attributes; prioritize large above-the-fold or gallery images where CSS does not already reserve dimensions. System fonts avoid external webfont downloads. No Open Graph/Twitter/JSON-LD metadata was found in the source scan; this is optional discoverability/share-preview improvement, not a broken canonical or indexing defect.

The root robots and XML/HTML sitemaps are present and primary-domain canonical links are correct. Current sitemap validation only tests nonempty files; future checks should validate expected canonical routes, reciprocal alternates and alias exclusion. Existing static redirect stubs do not establish HTTP redirect behavior on another host. Preserve query-based legacy news routes with explicit server/CDN logic.

Calendar verification improved on the initial audit: seven anonymous public feeds are now confirmed readable, and the combined agenda visibly loaded events. One empty feed is not proof of failure. Browser/source times use the legacy `Europe/Kiev` timezone identifier intentionally. Publication of future changes, event confidentiality and calendar-owner access remain institutional responsibilities; this audit did not edit events or sharing settings.

## Unified institutional-document and archive mechanism

Recommend one shared document contract using existing `astro:content`, `file()`/`glob()` loaders, Zod schemas and NCUTAM manifest/hash conventions. Begin with election material, then adopt it incrementally elsewhere. Do not relocate every existing file or replace specialized vacancy/defence data in one change.

| Proposed field | Purpose / constraint |
| --- | --- |
| `id` | Stable source-independent identifier; shared by both locales. |
| `title`, `titleEn` | Localized presentation titles; preserve exact original official title separately when needed. |
| `originalTitle`, `originalFilename` | Documentary provenance, including original spelling. |
| `section`, `kind`, `year` | Chronological/category grouping without duplicating binaries. |
| `number`, `issuer`, `approvedBy` | Exact official identifiers and issuing/approving bodies; localized display must not change the raw identifier. |
| `issuedDate`, `publishedDate`, `effectiveFrom`, `effectiveTo` | Separate legal/document issue, web publication and applicability dates; unknown dates remain unknown. |
| `status` | `current`, `historical`, `superseded`, `unknown`; never infer current status only from a filename/year. |
| `language`, `format`, `mimeType`, `bytes`, `pageCount` | Clear download language, format and size labels. |
| `path` or external `sourceUrl` | Valid file target, with explicit handling of externally hosted originals. |
| `sourceUrls`, `retrievedAt`, `verifiedAt` | Evidence and verification history. |
| `sha256`, optional `gitBlobSha1` | Byte integrity and compatibility with existing NCUTAM checks. |
| `supersedes`, `relatedRecordIds` | Relationships between versions, proceedings, orders, decisions and events. |
| `transcriptionId` | Separate reviewed accessible HTML/text; never overwrite signed original bytes. |
| `availability` / `missingReason` | Explicit missing-source records with no invented file/hash or misleading active download. |
| `publicationDecision` | Records-owner disposition for material whose public availability requires review. |

Proposed implementation surfaces: a shared contract in `src/schemas/institutionalDocument.ts`, section-owned manifests such as `src/data/elections/2026/documents.yaml`, `src/components/documents/DocumentCard.astro`, `DocumentArchive.astro`, and reusable year/category navigation. An aggregated index can read the validated section collections through `src/utils/institutionalDocuments.ts`; it must not copy records into a second editable registry. Reuse the current site-card structure and semantic tone styles. Keep `src/data/ncutam/documents.yaml` and existing public paths stable during initial adoption. Adapt existing collections incrementally to the shared contract; the election manifest in the dedicated plan remains the sole editorial source for election documents.

Document cards should show exact title, issue date/number, source language, file type and size, and a clear “View original” action; accessible transcription and source notes are secondary actions. Archive pages should default to chronological grouping with simple year/kind filters, stable anchors, crawlable year pages and keyboard-accessible disclosure for long lists. Support full reading/download without JavaScript. On small screens, use one column, wrapping titles and no hover-only controls. Preserve current and historical sections distinctly, with status expressed in text as well as colour.

Validation should enforce stable/unique IDs, existing local targets, valid formats, required provenance, expected date relationships, bilingual labels, reference integrity, pinned binary hashes and deliberate duplicate/version handling. Missing records are valid only with an explicit unresolved status; they must not generate false successful download links. The redirect ledger remains host/path based and separate from the document catalogue. Add new fields/components in a small PR with one pilot section before broad adoption.

## Ranked legacy migration candidates

“Completeness” below describes observed Astro coverage, not certified institutional archival completeness.

| Rank | Candidate | Institutional importance | Observed Astro completeness | Loss risk / recommendation |
| --- | --- | --- | --- | --- |
| 1 | Director election 2026 | Very high: governance and official records | Existing order only; principal section external | High. Preserve files, reconcile sources, implement exact URL map first. |
| 2 | Historical defence originals | Very high: academic evidence | Bibliography extensive; 50 worksheet download targets absent | High. All 50 old-host HEAD checks succeeded. Ingest/hash in small verified batches and attach to stable defence records. |
| 3 | Strategy 2026–2030 | Very high: current institutional direction | Not present; 2021–2025 page remains | High. Recover original, confirm status and publish alongside history. |
| 4 | News/announcements 2018–2025 | High: institutional chronology | Current news collection contains 2026 files only | High. Inventory old year pages/attachments and preserve query URLs; merge only genuine duplicates. |
| 5 | Conference 2023 attachments | Medium/high: scholarly record | Event/gallery present; seven binaries lack exact public matches | Medium/high. Extend existing activity record with originals and aliases. |
| 6 | Postgraduate educational documents | High: applicant/student access | Substantial; sampled admission files preserved | Medium. Restore English access to shared files, reconcile dates, audit remaining older programme versions. |
| 7 | Department history/project material | High: research continuity | Twelve department/centre records and 89 profiles present | Medium. Compare each legacy detail page; preserve historic material without overwriting current facts. |
| 8 | Vacancy announcements/history | High: official competition record | 15 complete archive records plus one active card | Medium. Reconcile old announcement-only materials with existing archives and preserve dates/URLs; extend active-data validation. |
| 9 | Statutes, councils and doctoral documents | High | Sampled statutes, doctoral and youth PDFs already byte-identical | Lower immediate loss risk. Restore aliases and verify applicability; avoid duplicate ingestion. |
| 10 | Library/publisher archives | High scholarly value | Large structured bibliographies exist | Medium. Preserve metadata and archive references; review rights/external ownership before copying books/archives. |
| 11 | Cooperation agreements/resources | High, with publication constraints | Public summaries exist; signed PDFs intentionally excluded from Git | Case-by-case. Preserve controlled originals outside public Git and publish only approved metadata/files. |
| 12 | Calendar | High operational value | Seven live sources embedded and public feeds readable | No migration blocker found. Retain source links and ownership; native ICS/API agenda is an optional future feature, not parity work. |

## Confidence and remaining boundaries

Confirmed defects are grounded in source code, generated output or observed browser/HTTP behavior. Library vulnerabilities are confirmed audit findings, not demonstrated compromises. Dead-code candidates and institutional factual questions are explicitly marked. Successful HEAD responses do not verify full bytes or safe archive extraction; only downloaded/hashed samples have byte-level conclusions. Original public PDFs do not need automatic translation.

No P0 active incident or imminent deletion was demonstrated. The roadmap uses P0 as a preservation/cutover gate: keep legacy sources recoverable until inventories, URL dispositions and rollback are accepted. Recommended source/hosting changes remain unauthorized and unimplemented.


<a id="evidence-register"></a>

## Appendix A — Initial source evidence register


**Observation date:** 21 October 2026, Europe/Kyiv<br>
**Repository revision:** `fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70`

This register records direct HTTP responses, repository/build observations and downloaded-file hashes. It is a dated observation, not a claim that remote content will never change. Requests followed redirects. HTTP 200 does not by itself prove the correctness of content. Failed requests were checked against the linked legacy sources; Unicode document URLs were percent-encoded before requesting them.

### Production identity and sampled HTTP responses

| Requested URL | Final HTTP status | Final URL / note |
| --- | --- | --- |
| [https://inmech.kyiv.ua/](https://inmech.kyiv.ua/) | 200 | text/html; charset=utf-8 |
| [https://inmech.kyiv.ua/en/](https://inmech.kyiv.ua/en/) | 200 | text/html; charset=utf-8 |
| [https://inmech.kyiv.ua/deploy-version.txt](https://inmech.kyiv.ua/deploy-version.txt) | 200 | `fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70`; https://inmech.kyiv.ua/deploy-version.txt |
| [https://inmech.kyiv.ua/robots.txt](https://inmech.kyiv.ua/robots.txt) | 200 | text/plain; charset=utf-8 |
| [https://inmech.kyiv.ua/sitemap-index.xml](https://inmech.kyiv.ua/sitemap-index.xml) | 200 | text/xml; charset=utf-8 |
| [https://inmech.kyiv.ua/sitemap-0.xml](https://inmech.kyiv.ua/sitemap-0.xml) | 200 | XML sitemap retrieved |
| [https://inmech.kyiv.ua/vacancies/](https://inmech.kyiv.ua/vacancies/) | 200 | text/html; charset=utf-8 |
| [https://inmech.kyiv.ua/en/vacancies/](https://inmech.kyiv.ua/en/vacancies/) | 200 | text/html; charset=utf-8 |
| [https://inmech.kyiv.ua/search/](https://inmech.kyiv.ua/search/) | 200 | text/html; charset=utf-8 |
| [https://inmech.kyiv.ua/en/search/](https://inmech.kyiv.ua/en/search/) | 200 | text/html; charset=utf-8 |
| [https://inmech.kyiv.ua/accessibility/](https://inmech.kyiv.ua/accessibility/) | 200 | text/html; charset=utf-8 |
| [https://inmech.kyiv.ua/l/en/news/](https://inmech.kyiv.ua/l/en/news/) | 404 | No successful final response |
| [https://new.inmech.kyiv.ua/deploy-version.txt](https://new.inmech.kyiv.ua/deploy-version.txt) | 200 | `fbcb2f7cfaa2b8697ad7d690ddf097b2f29dac70`; https://inmech.kyiv.ua/deploy-version.txt |
| [http://election.inmech.kyiv.ua/](http://election.inmech.kyiv.ua/) | 200 | https://election.inmech.kyiv.ua/ |
| [https://election.inmech.kyiv.ua/sitemap.xml](https://election.inmech.kyiv.ua/sitemap.xml) | 200 | XML sitemap retrieved |
| [https://election.inmech.kyiv.ua/robots.txt](https://election.inmech.kyiv.ua/robots.txt) | 200 | text/plain; charset=utf-8 |

The deliberately nonexistent production URL returned HTTP 404, so sampled missing legacy URLs were not being concealed by a generic success-page fallback. The `new` deployment marker redirected to the primary domain. The four most recent examined main-branch Actions runs succeeded; the latest run was [39620183704](https://github.com/mfs9697/inmech-site/actions/runs/39620183704).

### Election HTML inventory

Every source below returned HTTP 200. “Empty” means the main element had no substantive text after removing its H1. Five entries were discovered in the sitemap rather than the homepage menu. All 25 unique source paths are included in the migration plan.

| Source URL | Main body beyond title |
| --- | --- |
| [/](https://election.inmech.kyiv.ua/) | Present |
| [/dokumenti-institutu-robochi-organi.html](https://election.inmech.kyiv.ua/dokumenti-institutu-robochi-organi.html) | **Empty** |
| [/kandidati-na-posadu-direktora.html](https://election.inmech.kyiv.ua/kandidati-na-posadu-direktora.html) | Present |
| [/nakaz-no-124-vid-15042026-r-pro-zabezpechennya-provedennya-viboriv-direktora-institutu.html](https://election.inmech.kyiv.ua/nakaz-no-124-vid-15042026-r-pro-zabezpechennya-provedennya-viboriv-direktora-institutu.html) | Present |
| [/nakaz-no-124-vid-15042026-r.html](https://election.inmech.kyiv.ua/nakaz-no-124-vid-15042026-r.html) | **Empty** |
| [/normativna-baza-osoblivosti-obrannya-kerivnika-naukovoyi-ustanovi.html](https://election.inmech.kyiv.ua/normativna-baza-osoblivosti-obrannya-kerivnika-naukovoyi-ustanovi.html) | Present |
| [/normativna-baza-ta-oficiyni-ogoloshennya.html](https://election.inmech.kyiv.ua/normativna-baza-ta-oficiyni-ogoloshennya.html) | **Empty** |
| [/normativna-baza-vibori-kerivnika-ustanovi-u-statuti-nan-ukrayini.html](https://election.inmech.kyiv.ua/normativna-baza-vibori-kerivnika-ustanovi-u-statuti-nan-ukrayini.html) | Present |
| [/oficiyne-ogoloshennya-pro-datu-chas-ta-misce.html](https://election.inmech.kyiv.ua/oficiyne-ogoloshennya-pro-datu-chas-ta-misce.html) | Present |
| [/oficiyne-rishennya-organizaciynogo-komitetu.html](https://election.inmech.kyiv.ua/oficiyne-rishennya-organizaciynogo-komitetu.html) | Present |
| [/ogoloshennya-prezidiyi-nan-ukrayini.html](https://election.inmech.kyiv.ua/ogoloshennya-prezidiyi-nan-ukrayini.html) | Present |
| [/organizaciya-golosuvannya-ta-viborci.html](https://election.inmech.kyiv.ua/organizaciya-golosuvannya-ta-viborci.html) | **Empty** |
| [/peredviborchi-programi-kandidativ.html](https://election.inmech.kyiv.ua/peredviborchi-programi-kandidativ.html) | Present |
| [/polozhennya-pro-organizaciyniy-komitet-z-provedennya-viboriv-direktora.html](https://election.inmech.kyiv.ua/polozhennya-pro-organizaciyniy-komitet-z-provedennya-viboriv-direktora.html) | Present |
| [/polozhennya-pro-organizaciyniy-komitet.html](https://election.inmech.kyiv.ua/polozhennya-pro-organizaciyniy-komitet.html) | **Empty** |
| [/polozhennya-pro-viborchu-lichilnu-komisiyu-2.html](https://election.inmech.kyiv.ua/polozhennya-pro-viborchu-lichilnu-komisiyu-2.html) | Present |
| [/polozhennya-pro-viborchu-lichilnu-komisiyu.html](https://election.inmech.kyiv.ua/polozhennya-pro-viborchu-lichilnu-komisiyu.html) | **Empty** |
| [/poryadok-obrannya-delegativ.html](https://election.inmech.kyiv.ua/poryadok-obrannya-delegativ.html) | **Empty** |
| [/povidomlennya-pro-napravlennya-dokumentiv.html](https://election.inmech.kyiv.ua/povidomlennya-pro-napravlennya-dokumentiv.html) | Present |
| [/pravila-akreditaciyi-sposterigachiv.html](https://election.inmech.kyiv.ua/pravila-akreditaciyi-sposterigachiv.html) | Present |
| [/protokol-lichilnoyi-komisiyi.html](https://election.inmech.kyiv.ua/protokol-lichilnoyi-komisiyi.html) | Present |
| [/protokoli-zasidan-organizaciynogo-komitetu.html](https://election.inmech.kyiv.ua/protokoli-zasidan-organizaciynogo-komitetu.html) | **Empty** |
| [/rezultati-viboriv.html](https://election.inmech.kyiv.ua/rezultati-viboriv.html) | **Empty** |
| [/rozyasnennya-shchodo-pidtverdzhennya-rivnya-volodinnya-derzhavnoyu-movoyu-dlya-pretendentiv.html](https://election.inmech.kyiv.ua/rozyasnennya-shchodo-pidtverdzhennya-rivnya-volodinnya-derzhavnoyu-movoyu-dlya-pretendentiv.html) | Present |
| [/zagalniy-spisok-viborciv.html](https://election.inmech.kyiv.ua/zagalniy-spisok-viborciv.html) | Present |

Count: **25 pages; 9 empty bodies**. The historical voter roll has 92 list entries. These are source inventory facts, not a determination of voter eligibility.

### Binary preservation ledger

Hashes below are ordinary SHA-256 over the entire downloaded file. They are not the Git blob SHA-1 used by the existing NCUTAM checker. The first seven rows are the election-host linked originals; the last two are recovered old-main files. Page counts were read from the PDFs. No document was modified.

| Original filename / variant | Bytes | PDF pages | SHA-256 |
| --- | ---: | ---: | --- |
| `DirectorElection2.pdf` | 104,772 | 6 | `1a43151da72fd0b519def5a8beaa915f10f276eec6a1df43fce040a4f1aadec7` |
| `Document_2026-04-16_114124.pdf` | 1,449,561 | 2 | `609d59084ef66e38ed1cd499b00bf47340258961461c10ce222ed1103a1fa95d` |
| `ПОЛОЖЕННЯ про організаційний комітет.pdf` | 315,611 | 2 | `227a8ee1d4e0af62f752d1fd32f6d0643a6ba07633e2a0adf1359b64edba6a18` |
| `ПОЛОЖЕННЯ про лічильну комісію.pdf` | 313,626 | 3 | `2c4eab9eef3bcdd1ed91aa45adc58125cbc5e4f399352053b2f615315e6a1f35` |
| `ПРОТОКОЛ зборі.pdf` | 498,398 | 1 | `fc6e72d0674cdffffb632d262b821f519631688c8c2ddcceb8bac3b7ca854f92` |
| `Протокол засідання виборчої комісії 16.06.2026.pdf` | 1,074,267 | 2 | `7425affe75f9a97f81b207466ce9e0ce497759f402ca3135529e2be138a8ca85` |
| `Заява спостерігача.docx` | 17,968 | — | `2c6b9a9b7c6aec2c7c14f608583bb479d9569ef01808024c7464f7a44f065ac0` |
| `strategy_2026-2030.pdf` | 553,774 | 7 | `9e67b4cb640dec1f8717a6f057f7b8382c1d10f3f1a3884b058b0596d3dc8cb9` |
| `2026_protokol_zboriv-old.pdf` | 494,372 | 1 | `3de81e422343d2463884752d7bf489897621edbb265a1c0279de91cb689ba341` |

The order hash equals the repository file at `public/documents/institute/orders/director-election-order-2026-04-16.pdf`. No other one of the seven election-host binaries matched a public asset byte-for-byte. The old-main commission protocol has the same hash as the election copy. The old-main meeting protocol has a different hash from `ПРОТОКОЛ зборі.pdf`; both originals must be retained until their relationship is reviewed. The old-main meeting PDF parser reported duplicate `/Info` dictionary entries; the file remained readable and was not repaired or re-saved.

### Document URL responses

| Source URL | HTTP status | Bytes / disposition |
| --- | --- | --- |
| [https://election.inmech.kyiv.ua/DirectorElection2.pdf](https://election.inmech.kyiv.ua/DirectorElection2.pdf) | 200 | 104,772 bytes |
| [https://election.inmech.kyiv.ua/Document_2026-04-16_114124.pdf](https://election.inmech.kyiv.ua/Document_2026-04-16_114124.pdf) | 200 | 1,449,561 bytes |
| [https://election.inmech.kyiv.ua/media/files/vityag-protokol-5.pdf](https://election.inmech.kyiv.ua/media/files/vityag-protokol-5.pdf) | 404 | Missing resource; no replacement bytes obtained at this URL |
| [https://election.inmech.kyiv.ua/Заява спостерігача.docx](https://election.inmech.kyiv.ua/%D0%97%D0%B0%D1%8F%D0%B2%D0%B0%20%D1%81%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80%D1%96%D0%B3%D0%B0%D1%87%D0%B0.docx) | 200 | 17,968 bytes |
| [https://election.inmech.kyiv.ua/ПОЛОЖЕННЯ про лічильну комісію.pdf](https://election.inmech.kyiv.ua/%D0%9F%D0%9E%D0%9B%D0%9E%D0%96%D0%95%D0%9D%D0%9D%D0%AF%20%D0%BF%D1%80%D0%BE%20%D0%BB%D1%96%D1%87%D0%B8%D0%BB%D1%8C%D0%BD%D1%83%20%D0%BA%D0%BE%D0%BC%D1%96%D1%81%D1%96%D1%8E.pdf) | 200 | 313,626 bytes |
| [https://election.inmech.kyiv.ua/ПОЛОЖЕННЯ про організаційний комітет.pdf](https://election.inmech.kyiv.ua/%D0%9F%D0%9E%D0%9B%D0%9E%D0%96%D0%95%D0%9D%D0%9D%D0%AF%20%D0%BF%D1%80%D0%BE%20%D0%BE%D1%80%D0%B3%D0%B0%D0%BD%D1%96%D0%B7%D0%B0%D1%86%D1%96%D0%B9%D0%BD%D0%B8%D0%B9%20%D0%BA%D0%BE%D0%BC%D1%96%D1%82%D0%B5%D1%82.pdf) | 200 | 315,611 bytes |
| [https://election.inmech.kyiv.ua/ПРОТОКОЛ зборі.pdf](https://election.inmech.kyiv.ua/%D0%9F%D0%A0%D0%9E%D0%A2%D0%9E%D0%9A%D0%9E%D0%9B%20%D0%B7%D0%B1%D0%BE%D1%80%D1%96.pdf) | 200 | 498,398 bytes |
| [https://election.inmech.kyiv.ua/Протокол засідання виборчої комісії 16.06.2026.pdf](https://election.inmech.kyiv.ua/%D0%9F%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB%20%D0%B7%D0%B0%D1%81%D1%96%D0%B4%D0%B0%D0%BD%D0%BD%D1%8F%20%D0%B2%D0%B8%D0%B1%D0%BE%D1%80%D1%87%D0%BE%D1%97%20%D0%BA%D0%BE%D0%BC%D1%96%D1%81%D1%96%D1%97%2016.06.2026.pdf) | 200 | 1,074,267 bytes |
| [https://inmech.kyiv.ua/doc/doc/strategy_2026-2030.pdf](https://inmech.kyiv.ua/doc/doc/strategy_2026-2030.pdf) | 404 | Missing resource; no replacement bytes obtained at this URL |
| [https://old.inmech.kyiv.ua/doc/doc/strategy_2026-2030.pdf](https://old.inmech.kyiv.ua/doc/doc/strategy_2026-2030.pdf) | 200 | 553,774 bytes |
| [http://inmech.kyiv.ua/doc/news/2026/2026_protokol_zboriv.pdf](http://inmech.kyiv.ua/doc/news/2026/2026_protokol_zboriv.pdf) | 404 | Missing resource; no replacement bytes obtained at this URL |
| [https://inmech.kyiv.ua/doc/news/2026/2026_protokol_zasidanya.pdf](https://inmech.kyiv.ua/doc/news/2026/2026_protokol_zasidanya.pdf) | 404 | Missing resource; no replacement bytes obtained at this URL |
| [https://old.inmech.kyiv.ua/doc/news/2026/2026_protokol_zboriv.pdf](https://old.inmech.kyiv.ua/doc/news/2026/2026_protokol_zboriv.pdf) | 200 | 494,372 bytes |
| [https://old.inmech.kyiv.ua/doc/news/2026/2026_protokol_zasidanya.pdf](https://old.inmech.kyiv.ua/doc/news/2026/2026_protokol_zasidanya.pdf) | 200 | 1,074,267 bytes |

The strategy recovered from [https://old.inmech.kyiv.ua/doc/doc/strategy_2026-2030.pdf](https://old.inmech.kyiv.ua/doc/doc/strategy_2026-2030.pdf) has 553,774 bytes and the SHA-256 in the ledger. Its primary-domain counterpart returned 404. The missing committee extract was not recovered; candidate slides are not a substitute.

### Visual document observations

- Order №124, page 1: issue date 15 April 2026. The filename embeds 16 April; it must not determine the issue date.
- Staff meeting protocol, page 1: meeting date 16 June 2026; 79 registered participants; 92 ballots produced, 79 distributed and found; 79 votes for the named candidate. Both downloaded source variants were visually inspected.
- Commission protocol, pages 1–2: 92 staff; quorum reference of 62; 79 registered and 79 votes for the candidate; signed commission record. Preserve the original markings and wording instead of silently changing them.
- Strategy cover: 2026–2030 title; signed/stamped approval dated 26 December 2025; Council consideration dated 25 December 2025, protocol №17.
- The order and commission-protocol text extractions each yielded effectively no text; the meeting scans yielded none. Accessible transcriptions require visual verification. The regulations and nomination slides had extractable text, but that alone does not certify accessibility.

### Build and structural checks

Node 24.16.0 was used with the existing lockfile. `npm ci` succeeded. `npm run validate` built 388 pages and passed sitemap, main landmarks, internal links, vacancies and dissertation catalogues, then failed at NCUTAM semantics on the native Windows CRLF checkout. The affected regexes assume LF. Normalizing only text reads in memory made the unchanged semantic checker pass. Other NCUTAM checks passed when invoked separately. This diagnostic is not represented as a successful unchanged full Windows validation run.

| Observation | Result |
| --- | --- |
| Generated H1 and main landmarks | One of each in all 388 documents |
| Missing image alt attributes | Zero; descriptive quality not certified |
| Duplicate IDs | `contacts` on `/journal/` and `/en/journal/` |
| Fragment not in source HTML | `/en/history/#directors`, added by navigation JavaScript |
| Duplicate title pair | `/en/people/guz/` and `/en/history/directors/guz/` |
| Internal link checks | 17,414 checked; 2,649 external, 451 assets/downloads and 1,720 ignored references excluded |
| Vacancy archive | 15 bilingual records, three PDFs each |
| Dissertation catalogues | 615 records in each language |
| NCUTAM diagnostic | 429 members: 213 active, 216 former; 17 governance assignments, 20 documents, six media records |
| NCUTAM affiliation/document/render checks | 213/213 active affiliations; 20 pinned files; 50 HTML pages |
| Asset audit | No missing local generated downloads/assets or public-prefix errors; ten oversized files; one duplicate group |
| Repository diff/status | Clean after validation |

The duplicated vacancy PDF is `public/documents/vacancies/active/2026-07-20-competition/order-competition.pdf` and `public/vacancies/2026-07-20-competition-18/order-competition.pdf`. Preserve existing URLs before deduplication.

### Dependency audit

`npm audit --json` returned exit code 1. Counts are package-level findings, not eleven demonstrated application exploits. The audit reported fixes available for all listed packages. Availability of a fix does not prove an unreviewed automatic update is safe.

| Package | npm reported severity | Direct dependency? |
| --- | --- | --- |
| `astro` | critical | Yes |
| `devalue` | high | No |
| `http-cache-semantics` | high | No |
| `js-yaml` | high | No |
| `nanoid` | high | No |
| `postcss` | high | No |
| `sharp` | high | No |
| `smol-toml` | high | No |
| `source-map-js` | high | No |
| `svgo` | high | No |
| `vite` | high | No |

Critical primary source: [Astro AVIF image-processing advisory](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2). It affects Astro before 7.2.8 when an attacker can cause processing of an untrusted AVIF. Current static-site production exploitability was not established. Further Sharp/dependency findings mean the eventual reviewed update must be assessed against the full audit result, not just this single minimum version.

### Browser and HTTP behavior checks

- Narrow-screen homepage reflowed to one column and exposed the new vacancy button. Opening the menu expanded all sections; the panel extended beyond the viewport. Scrolling moved the document underneath without revealing the complete lower menu in a bounded panel.
- On the public Ukrainian search page, entering `вакансії` returned zero results. The search implementation omits vacancy data and the vacancy static route.
- Primary/English homepage response samples did not include the security headers listed in the audit. This is a header observation; private hosting configuration was not inspected.
- The extended scope subsequently verified all seven anonymous calendar feeds and a loaded combined agenda. Screen-reader behavior, full contrast/zoom coverage and all desktop/mobile viewport combinations remain manual follow-up checks.

Google tag-manager/gtag references were present in both sampled production homepages. The conditional analytics configuration is therefore active in those samples; private analytics settings and consent requirements were not assessed. The trust-box native GET fallback described in F14 was identified from form markup and handler code; no message was submitted.

### Source integrity and limitations

The root `AGENTS.md` was followed. A local audit clone was used without edits to tracked files. Build/install output was ignored by the repository. No source changes or remote mutations occurred. Supporting raw HTML/JSON, audit logs and downloaded originals remain in audit scratch storage; the three required uppercase-named Markdown reports are the user-facing deliverables.

The repository tree, source code and actual HTTP responses take precedence over README drift, cached search excerpts and generic Astro expectations. The production marker confirms the observed deployment revision, not byte equality of every deployed asset. External references may change; missing unlinked content and historic URL usage require the institution’s records and hosting inventories.


## Appendix B — Additional document parity checks

These are actual downloaded-byte SHA-256 comparisons against every file under `public/`. A missing match does not prove an equivalent re-encoded version is absent; it does mean exact original-byte preservation was not found. One primary-domain alias returned 404.

| Exact source URL | HTTP | Bytes | Exact matching repository path |
| --- | ---: | ---: | --- |
| [https://old.inmech.kyiv.ua/doc/doc/stat_2003.pdf](https://old.inmech.kyiv.ua/doc/doc/stat_2003.pdf) | 200 | 3392419 | `public/documents/institute/statute/statute-2003.pdf` |
| [https://old.inmech.kyiv.ua/doc/doc/stat_2016.pdf](https://old.inmech.kyiv.ua/doc/doc/stat_2016.pdf) | 200 | 7350636 | `public/documents/institute/statute/statute-2016.pdf` |
| [https://old.inmech.kyiv.ua/doc/doc/stat_2023_1.pdf](https://old.inmech.kyiv.ua/doc/doc/stat_2023_1.pdf) | 200 | 835391 | `public/documents/institute/statute/statute-2023.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/2023_doct.docx](https://old.inmech.kyiv.ua/doc/postgraduate/2023_doct.docx) | 200 | 22920 | `public/documents/doctoral/admission/doctoral-admission-rules.docx` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/rating_2024_2025.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/rating_2024_2025.pdf) | 200 | 35450 | `public/documents/postgraduate/nmr/teacher-rating-2024-2025.pdf` |
| [https://old.inmech.kyiv.ua/doc/young_scientists/doc1.pdf](https://old.inmech.kyiv.ua/doc/young_scientists/doc1.pdf) | 200 | 130830 | `public/documents/young-scientists/regulations/nasu-young-scientists-council-regulation.pdf` |
| [https://old.inmech.kyiv.ua/doc/young_scientists/doc2.pdf](https://old.inmech.kyiv.ua/doc/young_scientists/doc2.pdf) | 200 | 2489572 | `public/documents/young-scientists/regulations/institute-young-scientists-council-regulation.pdf` |
| [https://old.inmech.kyiv.ua/doc/young_scientists/doc3.pdf](https://old.inmech.kyiv.ua/doc/young_scientists/doc3.pdf) | 200 | 815213 | `public/documents/young-scientists/regulations/scientific-and-technical-activity-law.pdf` |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/abstracts.pdf](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/abstracts.pdf) | 200 | 13713696 | No matching public asset |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/program_2023_11_09_1.pdf](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/program_2023_11_09_1.pdf) | 200 | 479391 | No matching public asset |
| [https://old.inmech.kyiv.ua/doc/news/2023/tem_apm_145_1.doc](https://old.inmech.kyiv.ua/doc/news/2023/tem_apm_145_1.doc) | 200 | 512017 | No matching public asset |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/first_information_letter_ua.pdf](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/first_information_letter_ua.pdf) | 200 | 699781 | No matching public asset |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/sample_ua.docx](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/sample_ua.docx) | 200 | 117704 | No matching public asset |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/first_information_letter.pdf](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/first_information_letter.pdf) | 200 | 751102 | No matching public asset |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/sample_en.docx](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/sample_en.docx) | 200 | 119854 | No matching public asset |
| [https://old.inmech.kyiv.ua/doc/postgraduate/2026/pravyla_pryjomu_2026.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/2026/pravyla_pryjomu_2026.pdf) | 200 | 510644 | `public/documents/postgraduate/admission/2026/admission-rules-2026.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/2026/vymogy_do_dd_2026.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/2026/vymogy_do_dd_2026.pdf) | 200 | 116397 | `public/documents/postgraduate/admission/2026/research-proposal-requirements-2026.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/2026/exame_program.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/2026/exame_program.pdf) | 200 | 248021 | `public/documents/postgraduate/admission/2026/entrance-exam-program-2026.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/2026/poryadok_ocinyuvannya_2026.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/2026/poryadok_ocinyuvannya_2026.pdf) | 200 | 227641 | `public/documents/postgraduate/admission/2026/assessment-procedure-2026.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/26ref.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/26ref.pdf) | 200 | 3231648 | No matching public asset |
| [https://inmech.kyiv.ua/doc/Document_2026-04-16_114124.pdf](https://inmech.kyiv.ua/doc/Document_2026-04-16_114124.pdf) | 404 | — | No matching public asset |
| [https://old.inmech.kyiv.ua/doc/Document_2026-04-16_114124.pdf](https://old.inmech.kyiv.ua/doc/Document_2026-04-16_114124.pdf) | 200 | 1449561 | `public/documents/institute/orders/director-election-order-2026-04-16.pdf` |

## Appendix C — Conference originals requiring preservation

These all belong to the already represented 2023 conference. No identical public binary was found. New targets should use stable Latin filenames and retain compatibility for each original URL.

| Source URL | Format | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/abstracts.pdf](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/abstracts.pdf) | .pdf | 13713696 | `2f6919f4e055acdfd670a016b2a89fb678a48c0a7751515678e296b335cc8e29` |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/program_2023_11_09_1.pdf](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/program_2023_11_09_1.pdf) | .pdf | 479391 | `983c85f89c68cdac59ca4dd728bdebc5654bda8ce58881a0caed3c7d67aeadc5` |
| [https://old.inmech.kyiv.ua/doc/news/2023/tem_apm_145_1.doc](https://old.inmech.kyiv.ua/doc/news/2023/tem_apm_145_1.doc) | .doc | 512017 | `137f8fa0a317483d305cb70dc85746832b809fcf79aa74de8757d1d5a09f086f` |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/first_information_letter_ua.pdf](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/first_information_letter_ua.pdf) | .pdf | 699781 | `4c70043d722df51432cb241db93f8217b7e9ec3d2cc91c3a2f2a7ed18dc8ba99` |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/sample_ua.docx](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/sample_ua.docx) | .docx | 117704 | `f6b5b8e9efc98d71d9bdfd8a8bafc88ba342a586f47168602a2c89a7416e7bc7` |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/first_information_letter.pdf](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/first_information_letter.pdf) | .pdf | 751102 | `c2b70c04cc21c7c3fb357047801e6034554a5cdd7300970ec9d97bcd87afa278` |
| [https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/sample_en.docx](https://old.inmech.kyiv.ua/doc/news/2023/actual_problems_of_mechanics/sample_en.docx) | .docx | 119854 | `976fa8b30d2c86ca0c33b379531d6e0a063af7c72339c7d55c57d422aaf3a8e7` |

## Appendix D — Fifty absent dissertation targets with available legacy sources

Every old-host URL below returned HTTP 200 to HEAD on the audit date. The listed target comes from `documents-migration.csv` and does not exist in the examined repository. HEAD success is not a full content/hash verification; migration must download and verify each original. Only the separately documented sample has a downloaded-byte/hash conclusion.

| Old-host source URL | Missing proposed repository path |
| --- | --- |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/26ref.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/26ref.pdf) | `public/documents/dissertations/archive/2021/26ref.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/26dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/26dis.pdf) | `public/documents/dissertations/archive/2021/26dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/25ref.docx](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/25ref.docx) | `public/documents/dissertations/archive/2021/25ref.docx` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/25dis.docx](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/25dis.docx) | `public/documents/dissertations/archive/2021/25dis.docx` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/24dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/24dis.pdf) | `public/documents/dissertations/archive/2021/24dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2020/23ref.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2020/23ref.pdf) | `public/documents/dissertations/archive/2020/23ref.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2020/23dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2020/23dis.pdf) | `public/documents/dissertations/archive/2020/23dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/22ref.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/22ref.pdf) | `public/documents/dissertations/archive/2019/22ref.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/22dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/22dis.pdf) | `public/documents/dissertations/archive/2019/22dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/21ref.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/21ref.pdf) | `public/documents/dissertations/archive/2019/21ref.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/21dis_last.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/21dis_last.pdf) | `public/documents/dissertations/archive/2019/21dis-last.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/20ref.rar](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/20ref.rar) | `public/documents/dissertations/archive/2019/20ref.rar` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/20dis.zip](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/20dis.zip) | `public/documents/dissertations/archive/2019/20dis.zip` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/19dis.rar](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/19dis.rar) | `public/documents/dissertations/archive/2019/19dis.rar` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/18refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/18refer.pdf) | `public/documents/dissertations/archive/2019/18refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/18dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/18dis.pdf) | `public/documents/dissertations/archive/2019/18dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/17refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/17refer.pdf) | `public/documents/dissertations/archive/2019/17refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/17dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/17dis.pdf) | `public/documents/dissertations/archive/2019/17dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/16refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/16refer.pdf) | `public/documents/dissertations/archive/2019/16refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/16dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/16dis.pdf) | `public/documents/dissertations/archive/2019/16dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/15refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/15refer.pdf) | `public/documents/dissertations/archive/2019/15refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/15dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2019/15dis.pdf) | `public/documents/dissertations/archive/2019/15dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/14refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/14refer.pdf) | `public/documents/dissertations/archive/2018/14refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/14dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/14dis.pdf) | `public/documents/dissertations/archive/2018/14dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/13refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/13refer.pdf) | `public/documents/dissertations/archive/2018/13refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/13dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/13dis.pdf) | `public/documents/dissertations/archive/2018/13dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/12refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/12refer.pdf) | `public/documents/dissertations/archive/2018/12refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/12dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2018/12dis.pdf) | `public/documents/dissertations/archive/2018/12dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2017/11refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2017/11refer.pdf) | `public/documents/dissertations/archive/2017/11refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2017/11dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2017/11dis.pdf) | `public/documents/dissertations/archive/2017/11dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/10refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/10refer.pdf) | `public/documents/dissertations/archive/2016/10refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/10dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/10dis.pdf) | `public/documents/dissertations/archive/2016/10dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/09refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/09refer.pdf) | `public/documents/dissertations/archive/2016/09refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/09dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/09dis.pdf) | `public/documents/dissertations/archive/2016/09dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/08refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/08refer.pdf) | `public/documents/dissertations/archive/2016/08refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/08dis.zip](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/08dis.zip) | `public/documents/dissertations/archive/2016/08dis.zip` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/07refer1.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/07refer1.pdf) | `public/documents/dissertations/archive/2016/07refer1.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/07dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/07dis.pdf) | `public/documents/dissertations/archive/2016/07dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/06refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/06refer.pdf) | `public/documents/dissertations/archive/2016/06refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/06dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/06dis.pdf) | `public/documents/dissertations/archive/2016/06dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/05refer1.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/05refer1.pdf) | `public/documents/dissertations/archive/2016/05refer1.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/05dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/05dis.pdf) | `public/documents/dissertations/archive/2016/05dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/04refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/04refer.pdf) | `public/documents/dissertations/archive/2016/04refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/04dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/04dis.pdf) | `public/documents/dissertations/archive/2016/04dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/03refer.doc](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/03refer.doc) | `public/documents/dissertations/archive/2016/03refer.doc` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/03dis.doc](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/03dis.doc) | `public/documents/dissertations/archive/2016/03dis.doc` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/02refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/02refer.pdf) | `public/documents/dissertations/archive/2016/02refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/02dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2016/02dis.pdf) | `public/documents/dissertations/archive/2016/02dis.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2015/01refer.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2015/01refer.pdf) | `public/documents/dissertations/archive/2015/01refer.pdf` |
| [https://old.inmech.kyiv.ua/doc/postgraduate/dis/2015/01dis.pdf](https://old.inmech.kyiv.ua/doc/postgraduate/dis/2015/01dis.pdf) | `public/documents/dissertations/archive/2015/01dis.pdf` |

## Appendix E — Public calendar feed verification

Requests used public ICS URLs without cookies, account tokens or authentication. Counts are VEVENT components, not expanded recurrence occurrences. Source identifiers/order/colors are recorded in `src/data/instituteGoogleCalendars.ts`. The combined browser agenda separately displayed eight upcoming entries.

| Source name | Public feed | HTTP | VEVENT components |
| --- | --- | ---: | ---: |
| Інститут Механіки | [Public ICS](https://calendar.google.com/calendar/ical/909ec38e5e8b3ef8c9575a78f7a553ba86d188f43167d47ebd3d1e5f1533bae8%40group.calendar.google.com/public/basic.ics) | 200 | 0 |
| Інші події ІнМех | [Public ICS](https://calendar.google.com/calendar/ical/b08841947770dbb93afc6d8117a255babda7ed53db9f820ad5b7745214a9a67e%40group.calendar.google.com/public/basic.ics) | 200 | 28 |
| Вчена рада ІнМех | [Public ICS](https://calendar.google.com/calendar/ical/a1223ab7a5f1f33a6e84af04b1534e99f3de550996dae639332d76f4fa8a839d%40group.calendar.google.com/public/basic.ics) | 200 | 24 |
| Загальноінститутський семінар ІнМех | [Public ICS](https://calendar.google.com/calendar/ical/b9926a1980736fe12bd15420e9e59d14b10144cf04b28efe965833714b2251ec%40group.calendar.google.com/public/basic.ics) | 200 | 14 |
| Захист дисертації Інмех | [Public ICS](https://calendar.google.com/calendar/ical/025f9198a102fe014576e0b71e7b054e024d8ac7c42697a0dfe95ebc5d7bb654%40group.calendar.google.com/public/basic.ics) | 200 | 7 |
| Семінар Аспірантів ІнМех | [Public ICS](https://calendar.google.com/calendar/ical/0dc3320a2c1cd70893231c06faf192757f64300e08f4f015a6a087380842d66c%40group.calendar.google.com/public/basic.ics) | 200 | 7 |
| Семінар секцій ІнМех | [Public ICS](https://calendar.google.com/calendar/ical/a6bebe0ddc72f1c4b8c11e59a9921b8da77b54e1eed0d3650c557faa47d06956%40group.calendar.google.com/public/basic.ics) | 200 | 7 |

## Final assessment and next decisions

The site is operational and substantially modernized, with a usable static architecture, bilingual routing and meaningful content checks. Historical file preservation and URL continuity remain incomplete. The five highest-impact findings are: (1) the external/incomplete election archive and broken official links; (2) the vulnerable locked dependency graph; (3) mobile menu reachability; (4) missing historical defence binaries despite 615-record catalogue parity; and (5) the trust-box default GET fallback. The recovered 2026–2030 strategy also needs prompt institutional publication review.

Use the dedicated election report for the exact inventory, responsive presentation, source chronology, URL map and cutover criteria. Resolve missing records and disputed facts through the institution; verify actual hosting ownership/configuration before redirect activation. Use the roadmap’s small PR sequence after implementation is authorized. No source, branch, remote, merge or hosting changes have been made.
