# Director election 2026 — Stage 1 document preservation

Status: preservation and metadata only; no election pages, navigation changes,
redirect activation, factual result edits, legacy-site edits or deployment.
Prepared from `main` at `9a373b2c89c5a1f2b8545af1d44f7cdc62467be7` on
21 October 2026. Source retrieval observations are timestamped in UTC in the manifest.

This implements the first document-preservation slice of the approved
[migration plan](../audits/2026-10-21/DIRECTOR_ELECTIONS_MIGRATION.md).
The broader archive, compatibility and institutional review gates remain open.

## Files and conventions

- `src/data/elections/2026/documents.json`: ten stable records: nine preserved
  originals, including one existing order, and one unavailable extract.
- `src/data/elections/documents-schema.mjs`: strict shared Astro/Zod schema;
  preserved and missing records have different permitted fields.
- `src/content.config.ts`: `electionDocuments` uses the existing Astro `file`
  loader convention. No route consumes this collection yet.
- `public/documents/elections/2026/`: seven added election-specific originals.
- `public/documents/institute/strategy/development-strategy-2026-2030.pdf`:
  one recovered historical strategy original, without editing the strategy page.
- Existing `public/documents/institute/orders/director-election-order-2026-04-16.pdf`
  is referenced in place; it is neither modified nor copied.
- `.gitattributes`: targeted `-text` rules protect these originals from newline conversion.
- `scripts/check-elections.mjs`: deterministic offline validation and corruption tests.
- `package.json`: `check:elections` is part of `validate`; the existing
  `.github/workflows/deploy-to-inmech.yml` PR validation already calls that command.
  No workflow changes or manual deployment are needed for validation.

The NCUTAM approach supplies stable IDs, bilingual labels, an Astro file loader
and pinned original bytes. JSON is used instead of the plan's suggested YAML:
Astro already supports it, existing NCUTAM member data uses JSON, and native
`JSON.parse` lets the offline checker share the exact schema without adding
dependencies or fragile YAML regular expressions. SHA-256 is stored with each
preserved record instead of duplicated in a second ledger.

Titles in the manifest are descriptive Ukrainian/English archive labels; the
binaries remain Ukrainian originals. English labels are not official translations.
`und` means the missing extract's language has not been inspected.

## Original inventory and provenance

Fresh full HTTP GETs returned the exact byte sizes and SHA-256 values recorded in
the approved audit. There are **9 unique originals, 4,822,349 bytes total**:
**8 added files (3,372,788 bytes)** and **1 reused file (1,449,561 bytes)**.
The old-main commission and order copies were separately downloaded and hash-matched;
they are aliases, not additional stored files. No PDF was optimized, repaired,
re-saved, OCRed or otherwise transformed; the DOCX is also unchanged.

The following is a readable snapshot of the machine-readable manifest. Public
paths below describe proposed archive assets in this branch, not newly deployed URLs.


### `candidate-nomination-slides`

Матеріали висунення кандидата на посаду директора / Candidate nomination meeting slides

- Original filename: `DirectorElection2.pdf`.
- Language: `uk`; format: `pdf`; source status: `preserved`.
- Repository asset: `public/documents/elections/2026/candidate-nomination-slides.pdf` (added).
- Bytes: **104772**; SHA-256: `1a43151da72fd0b519def5a8beaa915f10f276eec6a1df43fce040a4f1aadec7`.
- Date `event`: **2026-04-28** — Scientific Council meeting identified in the original slides.
- Source [DirectorElection2.pdf](https://election.inmech.kyiv.ua/DirectorElection2.pdf): HTTP **200**, `available`, observed `2026-10-21T19:54:38Z`.
- Source note: Meeting slides; neither the candidate programme nor the missing protocol extract.

### `order-124`

Наказ №124 від 15.04.2026 про забезпечення проведення виборів директора Інституту / Order No. 124 of 15 April 2026 on arrangements for the director election

- Original filename: `Document_2026-04-16_114124.pdf`.
- Language: `uk`; format: `pdf`; source status: `preserved`.
- Repository asset: `public/documents/institute/orders/director-election-order-2026-04-16.pdf` (existing).
- Bytes: **1449561**; SHA-256: `609d59084ef66e38ed1cd499b00bf47340258961461c10ce222ed1103a1fa95d`.
- Date `issued`: **2026-04-15** — Date on the signed order.
- Date `published`: **2026-04-16** — Existing Astro news: src/content/news/2026/2026-04-16-director-election-order.md; not the order issue date.
- Source [Document_2026-04-16_114124.pdf](https://election.inmech.kyiv.ua/Document_2026-04-16_114124.pdf): HTTP **200**, `available`, observed `2026-10-21T19:54:38Z`.
- Source [Document_2026-04-16_114124.pdf](https://old.inmech.kyiv.ua/doc/Document_2026-04-16_114124.pdf): HTTP **200**, `available`, observed `2026-10-21T19:54:38Z`.
- Source [Document_2026-04-16_114124.pdf](https://inmech.kyiv.ua/doc/Document_2026-04-16_114124.pdf): HTTP **404**, `missing`, observed `2026-10-21T19:54:38Z`.
- Source note: Existing binary reused; the filename date is not the issue date.

### `organizing-committee-regulations`

Положення про організаційний комітет з проведення виборів директора / Regulations for the organizing committee for the director election

- Original filename: `ПОЛОЖЕННЯ про організаційний комітет.pdf`.
- Language: `uk`; format: `pdf`; source status: `preserved`.
- Repository asset: `public/documents/elections/2026/organizing-committee-regulations.pdf` (added).
- Bytes: **315611**; SHA-256: `227a8ee1d4e0af62f752d1fd32f6d0643a6ba07633e2a0adf1359b64edba6a18`.
- Date `approved`: **2026-04-28** — Scientific Council, protocol No. 5, shown in PDF.
- Date `agreed`: **2026-05-26** — Trade union, protocol No. 5, shown in PDF.
- Source [ПОЛОЖЕННЯ про організаційний комітет.pdf](https://election.inmech.kyiv.ua/%D0%9F%D0%9E%D0%9B%D0%9E%D0%96%D0%95%D0%9D%D0%9D%D0%AF%20%D0%BF%D1%80%D0%BE%20%D0%BE%D1%80%D0%B3%D0%B0%D0%BD%D1%96%D0%B7%D0%B0%D1%86%D1%96%D0%B9%D0%BD%D0%B8%D0%B9%20%D0%BA%D0%BE%D0%BC%D1%96%D1%82%D0%B5%D1%82.pdf): HTTP **200**, `available`, observed `2026-10-21T19:54:39Z`.
- Source note: Original regulations; the unavailable protocol extract is a separate record.

### `election-commission-regulations`

Положення про виборчу (лічильну) комісію / Regulations for the election (counting) commission

- Original filename: `ПОЛОЖЕННЯ про лічильну комісію.pdf`.
- Language: `uk`; format: `pdf`; source status: `preserved`.
- Repository asset: `public/documents/elections/2026/election-commission-regulations.pdf` (added).
- Bytes: **313626**; SHA-256: `2c4eab9eef3bcdd1ed91aa45adc58125cbc5e4f399352053b2f615315e6a1f35`.
- Date `approved`: **2026-04-28** — Scientific Council, protocol No. 5, shown in PDF.
- Date `agreed`: **2026-05-26** — Trade union, protocol No. 5, shown in PDF.
- Source [ПОЛОЖЕННЯ про лічильну комісію.pdf](https://election.inmech.kyiv.ua/%D0%9F%D0%9E%D0%9B%D0%9E%D0%96%D0%95%D0%9D%D0%9D%D0%AF%20%D0%BF%D1%80%D0%BE%20%D0%BB%D1%96%D1%87%D0%B8%D0%BB%D1%8C%D0%BD%D1%83%20%D0%BA%D0%BE%D0%BC%D1%96%D1%81%D1%96%D1%8E.pdf): HTTP **200**, `available`, observed `2026-10-21T19:54:40Z`.
- Source note: Original bytes preserved.

### `staff-meeting-protocol`

Протокол зборів наукових працівників від 16.06.2026 — копія з виборчого сайту / Staff meeting protocol of 16 June 2026 — election-site copy

- Original filename: `ПРОТОКОЛ зборі.pdf`.
- Language: `uk`; format: `pdf`; source status: `preserved`.
- Repository asset: `public/documents/elections/2026/staff-meeting-protocol.pdf` (added).
- Bytes: **498398**; SHA-256: `fc6e72d0674cdffffb632d262b821f519631688c8c2ddcceb8bac3b7ca854f92`.
- Date `document`: **2026-06-16** — Dated meeting protocol in the original PDF.
- Source [ПРОТОКОЛ зборі.pdf](https://election.inmech.kyiv.ua/%D0%9F%D0%A0%D0%9E%D0%A2%D0%9E%D0%9A%D0%9E%D0%9B%20%D0%B7%D0%B1%D0%BE%D1%80%D1%96.pdf): HTTP **200**, `available`, observed `2026-10-21T19:54:40Z`.
- Source note: Original filename retains the source spelling «зборі». The distinct legacy-main copy is retained separately.

### `election-commission-protocol`

Протокол засідання виборчої комісії від 16.06.2026 / Election commission meeting protocol of 16 June 2026

- Original filename: `Протокол засідання виборчої комісії 16.06.2026.pdf`.
- Language: `uk`; format: `pdf`; source status: `preserved`.
- Repository asset: `public/documents/elections/2026/election-commission-protocol.pdf` (added).
- Bytes: **1074267**; SHA-256: `7425affe75f9a97f81b207466ce9e0ce497759f402ca3135529e2be138a8ca85`.
- Date `document`: **2026-06-16** — Dated commission protocol in the original PDF.
- Source [Протокол засідання виборчої комісії 16.06.2026.pdf](https://election.inmech.kyiv.ua/%D0%9F%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB%20%D0%B7%D0%B0%D1%81%D1%96%D0%B4%D0%B0%D0%BD%D0%BD%D1%8F%20%D0%B2%D0%B8%D0%B1%D0%BE%D1%80%D1%87%D0%BE%D1%97%20%D0%BA%D0%BE%D0%BC%D1%96%D1%81%D1%96%D1%97%2016.06.2026.pdf): HTTP **200**, `available`, observed `2026-10-21T19:54:41Z`.
- Source [2026_protokol_zasidanya.pdf](https://old.inmech.kyiv.ua/doc/news/2026/2026_protokol_zasidanya.pdf): HTTP **200**, `available`, observed `2026-10-21T19:54:41Z`.
- Source [2026_protokol_zasidanya.pdf](https://inmech.kyiv.ua/doc/news/2026/2026_protokol_zasidanya.pdf): HTTP **404**, `missing`, observed `2026-10-21T19:54:41Z`.
- Source note: The old-main copy is byte-identical and recorded as another source URL.

### `observer-application`

Заява спостерігача / Observer application form

- Original filename: `Заява спостерігача.docx`.
- Language: `uk`; format: `docx`; source status: `preserved`.
- Repository asset: `public/documents/elections/2026/observer-application.docx` (added).
- Bytes: **17968**; SHA-256: `2c6b9a9b7c6aec2c7c14f608583bb479d9569ef01808024c7464f7a44f065ac0`.
- Document date: unknown/undated; none inferred from download time or filename.
- Source [Заява спостерігача.docx](https://election.inmech.kyiv.ua/%D0%97%D0%B0%D1%8F%D0%B2%D0%B0%20%D1%81%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80%D1%96%D0%B3%D0%B0%D1%87%D0%B0.docx): HTTP **200**, `available`, observed `2026-10-21T19:54:42Z`.
- Source note: Undated original DOCX form; no date has been inferred.

### `development-strategy-2026-2030`

Стратегія розвитку Інституту на 2026–2030 роки / Institute development strategy for 2026–2030

- Original filename: `strategy_2026-2030.pdf`.
- Language: `uk`; format: `pdf`; source status: `preserved`.
- Repository asset: `public/documents/institute/strategy/development-strategy-2026-2030.pdf` (added).
- Bytes: **553774**; SHA-256: `9e67b4cb640dec1f8717a6f057f7b8382c1d10f3f1a3884b058b0596d3dc8cb9`.
- Date `considered`: **2025-12-25** — Scientific Council protocol No. 17 on the original cover.
- Date `approved`: **2025-12-26** — Signed/stamped approval on the original cover.
- Source [strategy_2026-2030.pdf](https://old.inmech.kyiv.ua/doc/doc/strategy_2026-2030.pdf): HTTP **200**, `available`, observed `2026-10-21T19:54:42Z`.
- Source [strategy_2026-2030.pdf](https://inmech.kyiv.ua/doc/doc/strategy_2026-2030.pdf): HTTP **404**, `missing`, observed `2026-10-21T19:54:42Z`.
- Source note: Election-related historical source; applicability requires institutional confirmation. The current strategy page is unchanged.

### `staff-meeting-protocol-legacy-main`

Протокол зборів наукових працівників від 16.06.2026 — копія зі старого основного сайту / Staff meeting protocol of 16 June 2026 — legacy-main copy

- Original filename: `2026_protokol_zboriv.pdf`.
- Language: `uk`; format: `pdf`; source status: `preserved`.
- Repository asset: `public/documents/elections/2026/staff-meeting-protocol-legacy-main.pdf` (added).
- Bytes: **494372**; SHA-256: `3de81e422343d2463884752d7bf489897621edbb265a1c0279de91cb689ba341`.
- Date `document`: **2026-06-16** — Dated meeting protocol in the original PDF.
- Source [2026_protokol_zboriv.pdf](https://old.inmech.kyiv.ua/doc/news/2026/2026_protokol_zboriv.pdf): HTTP **200**, `available`, observed `2026-10-21T19:54:43Z`.
- Source [2026_protokol_zboriv.pdf](https://inmech.kyiv.ua/doc/news/2026/2026_protokol_zboriv.pdf): HTTP **404**, `missing`, observed `2026-10-21T19:54:43Z`.
- Source [2026_protokol_zboriv.pdf](http://inmech.kyiv.ua/doc/news/2026/2026_protokol_zboriv.pdf): HTTP **404**, `missing`, observed `2026-10-21T19:54:43Z`.
- Distinct source variant of `staff-meeting-protocol`; retain both binaries pending owner review.
- Source note: Distinct bytes retained pending institutional review. The PDF has not been repaired or re-saved.

### `committee-protocol-5-extract`

Витяг з Протоколу №5 засідання Вченої ради від 28.04.2026 / Extract from Scientific Council protocol No. 5 of 28 April 2026

- Original filename: `vityag-protokol-5.pdf`.
- Language: `und`; format: `pdf`; source status: `missing`.
- No local file, public download path, size or hash assigned.
- Date `referenced-meeting`: **2026-04-28** — Reference on the committee page; the missing original was not inspected.
- Source [vityag-protokol-5.pdf](https://election.inmech.kyiv.ua/media/files/vityag-protokol-5.pdf): HTTP **404**, `missing`, observed `2026-10-21T19:54:43Z`.
- Referencing page: [committee regulations](https://election.inmech.kyiv.ua/polozhennya-pro-organizaciyniy-komitet-z-provedennya-viboriv-direktora.html).
- Source note: Linked original returns 404. Contents and original language are unverified; no replacement has been created.

## Unresolved source issues

1. The committee extract `vityag-protokol-5.pdf` still returns 404. Its title and
   28 April meeting date come from the referencing page, not an inspected original.
   The manifest intentionally has no path, bytes, hash or verified language.
   Obtain the original from the institutional records owner or an authenticated
   archive; review it and its provenance in a separate PR. Nomination slides are
   a different document and cannot replace it.
2. Committee minutes, delegate procedure and later appointment/contract originals
   were not identified in the approved source graph. No filenames, binaries or
   document entries have been fabricated for these unknown materials.
3. The election-site meeting PDF is 498,398 bytes; the old-main variant is
   494,372 bytes with a different SHA-256. Both are retained. The old-main PDF's
   parser warning about duplicate `/Info` keys is not a reason to repair its bytes.
   The audit scratch filename `2026_protokol_zboriv-old.pdf` was a local evidence
   name; the actual source filename is `2026_protokol_zboriv.pdf` in the manifest.
4. Strategy applicability needs institutional confirmation. Its cover dates are
   December 2025 even though its planning period is 2026–2030. Preservation here
   does not label it as the currently applicable strategy or edit the public page.
5. Historical venue/eligibility wording conflicts and subsequent appointment
   evidence remain for records review. No result figures or historical statements
   on existing pages are edited by this PR.
6. Source statuses are point-in-time observations. The main-host legacy `/doc/`
   aliases still return 404. Recording them is provenance, not a redirect or a
   claim that those URLs have been restored. Unknown unlinked files and older
   election cycles require an institutional/hosting inventory.

## Reproduce and maintain the archive

After checking out this branch with Node 24 and the locked dependencies:

```sh
npm ci
npm run check:elections
npm run validate
npm audit --audit-level=low
git diff --check
```

`check:elections` never accesses the network or updates the manifest. It checks
the shared strict schema, all ten required IDs, nine unique original hashes and
paths, actual file presence/size/SHA-256, PDF/DOCX signatures, source URL filenames,
source observation sizes/hashes/statuses, real calendar dates, reused order path,
distinct meeting variant relationship, and absence of unregistered election files.
Missing records cannot acquire invented download metadata. LF and CRLF JSON are
accepted. Its 17 negative fixtures operate on virtual copies; they never write
to an original file. This validates integrity and inventory, not legal validity
or a full PDF/DOCX semantic conformance certification.

To independently repeat retrieval or restore a lost original:

1. Read that record's first `sources` entry with `available` status. Percent-encode
   spaces and Unicode path segments when using a client that needs encoded URLs;
   the manifest retains the readable original URL and original filename.
2. Download with an ordinary full GET into a fresh temporary file outside
   `public/`. Require HTTP 200; reject HTML/error bodies and unexpected formats.
3. Compare the raw length and SHA-256 with the manifest and approved audit ledger.
   Compare successful alias downloads with the same values. Do not convert or
   re-save originals. A hash mismatch is a new source version to investigate;
   never silently replace the accepted hash or binary.
4. Restore only a missing local file after the hash matches; reuse the order's
   existing path. Run the offline checker. Record any new retrieval observation
   and any consciously accepted new version in a separately reviewed PR.

For example, using a fresh temporary output path in a POSIX shell:

```sh
curl --fail --location --output /tmp/DirectorElection2-preservation-check.pdf \
  'https://election.inmech.kyiv.ua/DirectorElection2.pdf'
wc -c < /tmp/DirectorElection2-preservation-check.pdf
sha256sum /tmp/DirectorElection2-preservation-check.pdf
```

Expected: `104772` bytes and
`1a43151da72fd0b519def5a8beaa915f10f276eec6a1df43fce040a4f1aadec7`.
For other records use their exact source URL, size and hash above. A 404 extract
has no accepted binary; this procedure must not manufacture one.

## Verification results

- `npm ci`: passed with the unchanged lockfile.
- Fresh source retrieval: all nine accepted original hashes matched the approved
  audit. Successful order/commission aliases also matched; missing sources were
  recorded with their observed HTTP 404 responses.
- `npm run check:elections`: passed, including 17 negative cases and LF/CRLF JSON.
- Windows `npm run validate`: build, sitemap, landmarks, internal links, vacancy
  archive, dissertation catalogs and election checks passed. The existing
  `scripts/check-ncutam.mjs` fails on CRLF YAML/Markdown responsibility/gallery/
  document blocks, as already documented by the approved audit. This scoped PR
  does not repair that parser or call the native full suite green.
- Clean LF export of the staged tree: full `npm run validate` passed, including
  all existing NCUTAM checks. The export used `git -c core.autocrlf=false archive`
  and the same locked dependencies installed above; no validation code was
  bypassed or modified. This is a local LF-source run on Windows, not a claim
  about a GitHub Actions result. CI will run after the draft PR is opened.
- Generated-output comparison with `main`: all 394 HTML/XML/robots files had
  identical SHA-256 values before and after this implementation in both the
  native CRLF checkout and a separate LF-to-LF comparison. No route,
  navigation, sitemap or page content changed. New originals are additional
  static assets, ready for later Astro page integration.
- `npm audit --audit-level=low`: nonzero, **11 existing findings (10 high,
  1 critical)**. No dependency/lockfile changes or audit fixes in this scope.
- Staged Git blobs: all nine original byte counts and SHA-256 values verified,
  including the reused order. `git diff --check` and the staged equivalent passed.
- No deployment or changes to legacy hosts performed. PR validation is separate
  from the main-branch deployment job; this branch must not be merged as part of
  this task.

## Acceptance checklist

- [x] Branch starts from the current `main` revision recorded above.
- [x] Nine originals match the approved audit bytes and SHA-256 values.
- [x] Order №124 is referenced at its existing path with unchanged bytes.
- [x] Both distinct staff-meeting protocol variants remain separate.
- [x] Original URLs/filenames, UTC observations, dates, languages and statuses recorded.
- [x] Order issue date (15 April) and news publication date (16 April) kept separate.
- [x] Missing committee extract is explicit; no substitute file or invented checksum.
- [x] Offline integrity checks and regression fixtures join existing PR validation.
- [x] Current generated HTML/SEO output is unchanged.
- [ ] Institutional review of missing sources, strategy applicability and variants.
- [ ] Later Astro UI/route/redirect integration and separately authorized publication.
