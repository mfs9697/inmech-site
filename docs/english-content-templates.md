# English content templates for department pages

These templates are based on the completed English pages for Department 1 and Department 9. They are intended for gradually preparing the remaining English department pages in a consistent structure.

## Template 1: Department English content block

Use this structure inside the frontmatter of each file in `src/content/departments/`.

```yaml
titleEn: "Department of ..."
shortTitleEn: "..."
groupEn: "..."
headEn: "..."
summaryEn: "One concise sentence describing the department's main research profile."
sectionsEn:
  - title: "History and leadership"
    paragraphs:
      - "The department was established in ... . Its founder / first head was ... . Since ..., the department has been headed by ... ."
    items: []
  - title: "Main research areas"
    paragraphs: []
    items:
      - "Research area 1."
      - "Research area 2."
      - "Research area 3."
  - title: "Current research projects"
    paragraphs: []
    items:
      - "Research project No. ...: title and period."
staff:
  - name: "Українське ім’я"
    nameEn: "English name"
    positionEn: "English position"
    url: "/people/person-id/"
```

Recommended style:

- Keep `summaryEn` short enough for cards and metadata.
- Use `sectionsEn` for the long English department page.
- Keep section names consistent: `History and leadership`, `Main research areas`, `Current research projects`.
- Add English staff names and positions directly in the department record so the English department page is clean even before every profile is fully translated.
- Preserve the Ukrainian Markdown body after the frontmatter; it remains the source for the Ukrainian page.

## Template 2: Staff English profile fields

Use this structure inside each relevant file in `src/content/people/`.

```yaml
nameEn: "English name"
positionEn: "English position"
departmentEn: "Department of ..."
degreeEn: "Doctor / Candidate of ... Sciences"
academicTitleEn: "Professor / Senior Researcher / Corresponding Member of the NAS of Ukraine"
researchAreasEn:
  - "Research area 1."
  - "Research area 2."
  - "Research area 3."
professionalActivityEn: "One concise paragraph describing the person's research and professional activity."
publications:
  - title: "Основні публікації"
    titleEn: "Selected publications"
    type: "ordered"
    items:
      - >-
        Existing bibliographic record.
```

Recommended style:

- Translate profile metadata and research areas into English.
- Use `Selected publications` as the English publication-section heading unless a more specific heading is needed, for example `Selected scientific publications (monographs)`.
- Keep original bibliographic entries unchanged when the publication itself is in Ukrainian or Russian. Bibliographies often preserve the original language.
- Use consistent degree wording:
  - `Doctor of Physical and Mathematical Sciences`
  - `Doctor of Technical Sciences`
  - `Candidate of Physical and Mathematical Sciences`
  - `Candidate of Technical Sciences`
- Use consistent positions:
  - `Head of Department`
  - `Deputy Head of Department`
  - `Principal Researcher`
  - `Leading Researcher`
  - `Senior Researcher`
  - `Researcher`
  - `Junior Researcher`
  - `Chief Engineer`

## Workflow for each next department

1. Add `sectionsEn`, `headEn`, and English staff labels to the department file.
2. Add English profile fields to all linked staff records.
3. Keep publication lists intact unless an official English bibliographic form is already present.
4. Check the generated pages:
   - `/en/departments/<department-id>/`
   - `/en/people/<person-id>/`
5. Check the latest GitHub Actions run after pushing the changes.
