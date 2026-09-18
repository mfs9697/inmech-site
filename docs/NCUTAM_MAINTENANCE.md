# NCUTAM maintenance workflow

This document is the operational handoff for maintaining the NCUTAM section after migration and cutover.

## Source of truth and repository roles

The authoritative public content now lives in `mfs9697/inmech-site`.

- Edit NCUTAM content only in `mfs9697/inmech-site`.
- Do not edit generated files on the public server.
- `mfs9697/ncutam` is the legacy compatibility/redirect repository. It is not a second content source.
- Update `mfs9697/ncutam/migration/legacy-routes.yaml` only when a legacy redirect target must change or a newly discovered legacy URL needs continuity handling.

Every logical content change should use a short-lived branch and Pull Request to `main`. `npm run validate` must be green before merge. Merging to `main` triggers the normal production deployment and post-deployment smoke checks.

## Ownership map

| Content | Authoritative files | Public route |
| --- | --- | --- |
| Committee news | `src/content/news/YYYY/*.md` | `/news/...` and filtered `/ncutam/news/` |
| Members | `src/data/ncutam/members/*.json` | `/ncutam/members/` |
| In memoriam | same member dataset, `status: in-memoriam` | `/ncutam/members/in-memoriam/` |
| Institutions | `src/data/ncutam/institutions.yaml` | rendered through member views |
| Governance | `src/data/ncutam/governance.yaml` | `/ncutam/governance/` |
| Activities | `src/content/ncutam-activity/**` | `/ncutam/activity/...` |
| Official documents | `src/data/ncutam/documents.yaml`, `public/documents/ncutam/**`, `src/data/ncutam/document-hashes.json` | `/ncutam/documents/` |
| Annual reports | same document system, `kind: annual-report` | `/ncutam/documents/reports/` |
| External media mentions | `src/data/ncutam/media.yaml` | `/ncutam/activity/media/` |
| Evergreen text | `src/content/ncutam-pages/*.md` | `/ncutam/`, `/ncutam/about/`, `/ncutam/iutam/` |
| Images/galleries | `public/images/ncutam/**` and activity frontmatter | activity detail pages |

The paired English routes are generated from the same records. Do not create separate English copies of the same NCUTAM data record.

## Standard change sequence

1. Start from current `main` and create one branch for one logical update.
2. Confirm the official source before changing institutional facts.
3. Update Ukrainian and English fields together.
4. Add documents/images to stable public paths before referencing them.
5. Run `npm run check:ncutam` for fast NCUTAM-specific validation.
6. Run the full `npm run validate` before opening or merging the PR.
7. Open a PR using the NCUTAM update checklist.
8. Merge only after validation is green and the site owner has reviewed the change.
9. Confirm the production workflow is green after merge.

For Windows PowerShell, `npm.cmd` may be used instead of `npm`.

## News

Create Committee news in:

```text
src/content/news/YYYY/yyyy-mm-dd-short-slug.md
```

A Committee-only item should include:

```yaml
scopes: ["ncutam"]
```

A genuinely shared Institute/Committee item should include:

```yaml
scopes: ["institute", "ncutam"]
```

Do not duplicate the item under `/ncutam/news/`. The canonical detail route remains `/news/YYYY/...`; `/ncutam/news/` is a filtered view of the shared news collection.

For bilingual full text, keep Ukrainian as the main body and place the English body between:

```html
<!-- en:start -->
...
<!-- en:end -->
```

Minimum frontmatter for normal bilingual NCUTAM news:

```yaml
---
title: "Український заголовок"
titleEn: "English title"
description: "Короткий опис українською."
descriptionEn: "Short English description."
date: 2026-09-13
category: "Діяльність Комітету"
categoryEn: "Committee activity"
tags: ["НКУТПМ"]
tagsEn: ["NCUTAM"]
scopes: ["ncutam"]
year: 2026
featured: false
---
```

Use `scopes: ["institute", "ncutam"]` only when the item belongs in both institutional news streams.

## Members and institutions

Members are stored as JSON arrays under:

```text
src/data/ncutam/members/
```

A member ID is a stable identifier. Do not create a second record when the person's status changes.

Typical active record:

```json
{
  "id": "surname-name",
  "name": "Прізвище Ім'я По батькові",
  "nameEn": "Name Surname",
  "status": "active",
  "joinedYear": 2026,
  "institution": "institution-id",
  "additionalInstitutions": [],
  "affiliationSources": [
    {
      "kind": "official",
      "label": "Current institutional profile",
      "url": "https://example.org/profile"
    }
  ],
  "city": "Київ",
  "cityEn": "Kyiv",
  "profiles": []
}
```

Rules:

- new active members should have `joinedYear` from the election/admission source;
- preserve `joinedYear` when a member later changes status;
- when a member dies, change the existing record to `status: "in-memoriam"`; do not delete the record;
- use `endedYear` when an official end year is known and relevant;
- do not invent missing biographical facts;
- preserve the stable ID across all status changes;
- if a person's institution is not yet present, add it to `src/data/ncutam/institutions.yaml` first;
- `institution` must reference the current primary institution ID, not free text;
- record the evidence for an affiliation update in `affiliationSources`; use `kind: "official"` for a current institutional source and `kind: "publication"` for a scientific publication;
- use `additionalInstitutions` only for a genuinely simultaneous current affiliation supported by a recent scientific publication that lists both affiliations; do not preserve a historical affiliation there merely because it appeared in an older Committee register;
- keep the primary and additional institution references distinct and source-backed;
- `inmechPersonId`, when used, must point to an existing `src/content/people/<id>.md` record.

The historical 2025 admission cohort is validated as 35 people across all statuses. A later status change does not alter that historical cohort.

Active members are expected to have a source-backed `joinedYear`; do not add exceptions without a source-based reason and an explicit validator change.

## Governance

Governance assignments live in:

```text
src/data/ncutam/governance.yaml
```

Do not overwrite old assignments when leadership changes. Close the old assignment with `effectiveTo`, then add a new assignment with a new stable ID and `effectiveFrom`.

Each current assignment must reference an active member. Responsibilities must be provided in both Ukrainian and English.

Example pattern:

```yaml
- id: surname-chair-2026
  member: surname-name
  role: chair
  order: 1
  responsibilities:
    - "Український опис повноважень."
  responsibilitiesEn:
    - "English description of responsibilities."
  effectiveFrom: 2026-12-01
  sourceDocument: document-id
```

When replacing an assignment, first close the previous record:

```yaml
  effectiveTo: 2026-11-30
```

The validator requires exactly one current chair and one current scientific secretary.

## Conferences, meetings, initiatives and international activities

Durable Committee activity belongs in:

```text
src/content/ncutam-activity/
  meetings/
  conferences/
  initiatives/
  international/
```

The directory determines the allowed `type`:

- `meetings/` → `meeting`
- `conferences/` → `conference`
- `initiatives/` → `initiative`
- `international/` → `international`

Meeting filenames must match the event date exactly, for example:

```text
src/content/ncutam-activity/meetings/2026-11-10.md
```

Activity frontmatter should include bilingual title/summary and a real date. Add location, Committee role, images, documents, related news, and external links only when supported by sources.

Skeleton:

```yaml
---
type: conference
title: "Українська назва"
titleEn: "English title"
summary: "Український короткий опис."
summaryEn: "English summary."
date: 2026-10-01
endDate: 2026-10-03
location: "Київ"
locationEn: "Kyiv"
featured: false
---

Український текст.

<!-- en:start -->

English text.

<!-- en:end -->
```

If an activity is also announced as news, create one canonical news record and reference it from `relatedNews` using the news collection ID, for example:

```yaml
relatedNews:
  - "2026/2026-05-27-apmme-section-2"
```

## Images and galleries

Store Committee images only under:

```text
public/images/ncutam/
```

Use stable event-oriented folders such as:

```text
public/images/ncutam/meetings/2026-11-10/
public/images/ncutam/conferences/example-2026/
```

Reference them without the `public` prefix:

```yaml
image: "/images/ncutam/meetings/2026-11-10/01.jpg"
imageAlt: "Український альтернативний текст"
imageAltEn: "English alternative text"
```

Every gallery item must have Ukrainian and English alt text. Add captions only when they convey useful factual context.

Prefer original published or officially supplied images. Do not add generated thumbnails, responsive derivatives, screenshots of documents, or duplicate copies of the same photograph.

## Official documents and reports

Official Committee PDFs are immutable archival objects. A normal document addition has three coordinated parts:

1. the binary under `public/documents/ncutam/**`;
2. the metadata record in `src/data/ncutam/documents.yaml`;
3. the exact Git blob SHA-1 in `src/data/ncutam/document-hashes.json`.

Use stable ASCII filenames and year/event-oriented folders.

Example manifest record:

```yaml
- id: report-2026
  title: "Звіт НКУТПМ за 2026 рік"
  titleEn: "NCUTAM Annual Report for 2026"
  kind: annual-report
  year: 2026
  language: uk
  path: "/documents/ncutam/reports/2026/ncutam-report-2026.pdf"
  issuedBy: "Національний комітет України з теоретичної і прикладної механіки"
  issuedByEn: "National Committee of Ukraine for Theoretical and Applied Mechanics"
  status: current
```

To obtain the value for `document-hashes.json` locally:

```powershell
git hash-object public/documents/ncutam/reports/2026/ncutam-report-2026.pdf
```

Then add the returned 40-character Git blob hash to the ledger:

```json
"/documents/ncutam/reports/2026/ncutam-report-2026.pdf": "<git-blob-sha>"
```

Do not replace an already published archival PDF in place merely because a newer version exists. If the official source issues a corrected/revised document, preserve provenance explicitly: either add a new dated/versioned file and update status/notes, or document why exact replacement is required.

`npm run check:ncutam` fails when a manifest path, physical PDF, or pinned byte hash disagrees.

## Media mentions

External press/media coverage belongs in:

```text
src/data/ncutam/media.yaml
```

Use this collection for an external source worth preserving as a Committee media reference. Do not copy the full external article into the site.

Each record requires bilingual title and description, source, publication date and a valid external URL. Use `relatedActivityId` when the item clearly belongs to a durable Committee activity or initiative.

## Evergreen pages

The stable narrative pages are:

```text
src/content/ncutam-pages/home.md
src/content/ncutam-pages/about.md
src/content/ncutam-pages/iutam.md
```

Update Ukrainian and English bodies together and update the `updated` field for substantive revisions. Source-document references should point to IDs from `documents.yaml`.

Avoid putting frequently changing lists into evergreen prose when the same facts already come from structured datasets.

## Validation and release

Fast NCUTAM check:

```powershell
npm.cmd run check:ncutam
```

Full pre-PR gate:

```powershell
npm.cmd run validate
```

`check:ncutam` verifies, among other things:

- unique member/institution/governance/document/media IDs;
- active-member and institution references;
- the historical 2025 admission cohort;
- current governance integrity;
- bilingual evergreen/activity content;
- gallery paths and alt text;
- activity-document references;
- document manifest/file/hash agreement.

The full `validate` command additionally builds the site and checks sitemap, landmarks, internal links and the other Institute-wide archives.

After merge, the production workflow repeats validation, deploys `dist/`, verifies the deployment marker and runs public smoke tests including the NCUTAM routes.

## Route changes and legacy continuity

Avoid changing an existing public NCUTAM route without a strong reason. Stable routes are part of the archive.

If a canonical target route must change:

1. make the target-site route change in `mfs9697/inmech-site`;
2. update affected internal links and validate the target site;
3. update `migration/legacy-routes.yaml` in `mfs9697/ncutam` if any legacy URL points to the moved route;
4. regenerate/validate the legacy redirect stubs;
5. deploy the target first and the legacy redirect change second;
6. run the WP7 live redirect verifier.

Do not restore independent content editing in the legacy repository.

## Recommended PR scope

Prefer one PR per logical event or institutional change. Good examples:

- one General Meeting plus its decisions, gallery and documents;
- one membership election batch plus any new institutions;
- one governance resolution and resulting assignments;
- one conference/activity plus related news;
- one annual report;
- one evergreen-page correction.

Avoid mixing unrelated Committee changes with general Institute-site maintenance unless they are technically inseparable.
