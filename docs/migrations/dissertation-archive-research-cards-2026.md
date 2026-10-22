# Historical dissertation archive — source-based research cards

**22 October 2026** · Draft PR #191

## Scope and editorial principles

The old static pages for 2015–2021 showed fifty numbered original-file entries, not actual dissertation records. This update presents **26 dissertation-level cards** on seven year-specific pages in **both languages**, plus a unified card archive in Ukrainian and English.

**Basis for metadata:** textual examination of the title pages / author abstracts of the actual preserved PDF or DOCX documents in `public/documents/dissertations/archive/`, via the read-only command `python3 scripts/audit-dissertation-card-source.py`. Initial title-page evidence: [GitHub Actions run #39832957218](https://github.com/mfs9697/inmech-site/actions/runs/39832957218). Card records and source document IDs are maintained in `src/data/dissertations/archive-research-cards.json`, with each original document ID resolved through the immutable F15 manifests.

The card gives the author's name, original Ukrainian title, **degree sought**, subject specialty, document-title-page year and original file links **where actually available**. The year heading denotes the legacy folder, **not a verified date of successful defence**. An English page retains the original Ukrainian document title; it does not invent an officially approved translated title or document.

### Archive coverage

| Source-folder year | Research cards | Original files |
| --- | ---: | ---: |
| 2015 | 1 | 2 |
| 2016 | 9 | 18 |
| 2017 | 1 | 2 |
| 2018 | 3 | 6 |
| 2019 | 8 | 15 |
| 2020 | 1 | 2 |
| 2021 | 3 | 5 |
| **Total** | **26** | **50** |

Of the **26 cards**, **23** have identifiable author/title information supported by at least one readable original PDF/DOCX title page. The following **three cards deliberately have no author or title** because their only documents are non-public, unreviewed legacy archives: `2016-03` (two DOC files), `2019-20` (one RAR and one ZIP), and `2019-19` (one RAR). They are preserved and accounted for but receive **no public download links**.

### Special source discrepancies, explicitly flagged

- `2016-10`: the preserved original author abstract PDF lacks extractable text in the title-page probe. The author, topic and degree are supported by `10dis.pdf`; visual verification of the corresponding `10refer.pdf` title page remains outstanding.
- `2019-17`: the preserved text extraction of `17refer.pdf` begins on a following page, so author/title are taken from `17dis.pdf`. The abstract's title page requires visual verification.
- `2016-02`: the title page of the abstract says **2015**, whereas the dissertation title page says **2016**. The card does not equate either with an independently verified defence date.
- `2018-12`: both original PDFs show **2017**, although stored under legacy source folder **2018**.
- `2019-15`: both original PDFs show **2018**, although stored under legacy source folder **2019**.
- `2019-16`: `16dis.pdf` is labelled **ДОДАТКИ** (appendices). Its public link is explicitly captioned *Додатки до дисертації*, not the full dissertation.
- `2021-25`: the source DOCX title page differs textually from its own abstract and author-abstract title. The visible card title follows the author abstract and dissertation summary and notes the discrepancy; no original is edited.
- `2020-23` and `2021-24`: both originals bear the **same author and work title** (Сергій Петрович Орленко, dynamics of three-layer shells), but indicate **different degrees** (candidate of technical sciences versus PhD). They are not automatically merged into one event or assigned an inferred defence date.
- `2016-09` and `2016-07`: the complete dissertation PDFs are in Russian, while the Ukrainian card titles follow the corresponding Ukrainian author abstracts.

### Website changes

- One reusable `src/components/DissertationArchiveGallery.astro` renders the scientifically verified metadata and preserved source links without copying data into fourteen pages.
- Year pages at `/dissertations/archive/YYYY/` and `/en/dissertations/archive/YYYY/` now contain research cards rather than filename lists.
- Two unified pages at `/dissertations/archive/` and `/en/dissertations/archive/` display all 26 cards with year-jump navigation, two-column desktop layout and one-column narrow-screen layout.
- The main `/dissertations/` and `/en/dissertations/` archive callouts now offer just two clear options: the full bibliographic catalogue (615 records per language) or the source-based historical dissertation cards, instead of eight cramped navigation pills.
- The URL of **each individual original** is unchanged; historical year-page paths are preserved.

### Validation and publication boundary

`scripts/check-dissertation-archive-cards.mjs`, part of full `npm run validate`, checks each of the 26 card IDs, all 50 original document IDs **exactly once**, all 16 bilingual archive pages (two unified plus fourteen year-specific pages), title-page metadata only when original PDF/DOCX evidence exists, and public/restricted document links. The existing F15 SHA-256 verifiers remain authoritative over the original binary bytes.

**44 originals remain publicly downloadable. Six DOC/ZIP/RAR originals are kept under `preserved/`, with no new-site download URLs.** This PR changes only presentation metadata and card layout, never archive source binaries, security policy, historical host URLs or deployment credentials. The original PDF/DOCX content was never rewritten.

**Next review:** verify printed title/name transcription against the original rendered title pages for the two highlighted PDF cases, review scientific names and uncertainty notices as an Institute editor, inspect desktop and phone layout after merge, and only then treat the card attribution set as fully curated. Defence dates and full text-to-bibliographic catalogue linking require a separate source review rather than relying on numeric filenames.
