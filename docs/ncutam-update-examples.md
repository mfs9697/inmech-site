# NCUTAM update examples

These compact examples complement `docs/NCUTAM_MAINTENANCE.md`. They are intentionally minimal: copy the pattern, then verify fields against `src/content.config.ts` and an existing record of the same type.

## Add Committee-only news

Create `src/content/news/2026/2026-10-15-example.md`:

```markdown
---
title: "Новина Комітету"
titleEn: "Committee news"
description: "Короткий опис."
descriptionEn: "Short description."
date: 2026-10-15
category: "Діяльність Комітету"
categoryEn: "Committee activity"
tags: ["НКУТПМ"]
tagsEn: ["NCUTAM"]
scopes: ["ncutam"]
year: 2026
featured: false
---
Український текст.

<!-- en:start -->
English text.
<!-- en:end -->
```

Use `scopes: ["institute", "ncutam"]` only for genuinely shared Institute/Committee news.

## Add a new active member

Add one record to an appropriate `src/data/ncutam/members/members-*.json` array:

```json
{
  "id": "surname-name",
  "name": "Прізвище Ім'я По батькові",
  "nameEn": "Name Surname",
  "status": "active",
  "joinedYear": 2026,
  "institution": "institution-id",
  "city": "Київ",
  "cityEn": "Kyiv",
  "profiles": []
}
```

If the institution ID does not exist, add it first to `src/data/ncutam/institutions.yaml`.

## Change a member to former

Edit the existing record; keep its ID and historical admission data:

```json
{
  "id": "existing-stable-id",
  "name": "...",
  "nameEn": "...",
  "status": "former",
  "joinedYear": 2025,
  "endedYear": 2026
}
```

Do not create a duplicate record. The public status records only that the person is no longer a current Committee member; it does not state why.

## Replace a governance assignment

Close the previous assignment:

```yaml
  effectiveTo: 2026-11-30
```

Then add a new record:

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

## Add an annual report

1. Add `public/documents/ncutam/reports/2026/ncutam-report-2026.pdf`.
2. Append to `src/data/ncutam/documents.yaml`:

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

3. Run:

```powershell
git hash-object public/documents/ncutam/reports/2026/ncutam-report-2026.pdf
```

4. Add the returned hash to `src/data/ncutam/document-hashes.json`.

## Add a meeting

Create `src/content/ncutam-activity/meetings/2026-11-10.md`:

```markdown
---
type: meeting
title: "Назва зборів"
titleEn: "Meeting title"
summary: "Короткий опис українською."
summaryEn: "Short English summary."
date: 2026-11-10
location: "Київ"
locationEn: "Kyiv"
featured: false
---
Український текст.

<!-- en:start -->
English text.
<!-- en:end -->
```

For a meeting, the filename date must equal the frontmatter date.

## Add a media mention

Append to `src/data/ncutam/media.yaml`:

```yaml
- id: source-short-topic-2026-10-15
  title: "Український заголовок"
  titleEn: "English title"
  source: "Назва медіа"
  sourceEn: "Media name"
  date: 2026-10-15
  url: "https://example.org/article"
  description: "Короткий український опис."
  descriptionEn: "Short English description."
  relatedActivityId: "initiatives/example"
```

Omit `relatedActivityId` when there is no genuine durable activity to link.

## Finish every update

```powershell
npm.cmd run check:ncutam
npm.cmd run validate
```

Then open a Pull Request and use `.github/PULL_REQUEST_TEMPLATE/ncutam-update.md` as the checklist.
