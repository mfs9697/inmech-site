# InMech Astro Prototype

This is the first Astro version of the Institute site prototype. It keeps the visible prototype simple — three main routes — while moving content into structured collections.

## Pages

- `/` — Головна
- `/news/` — Новини
- `/departments/` — Наукові відділи

## Structure

```text
inmech-astro-prototype/
  astro.config.mjs
  package.json
  public/
    assets/img/inmech-mark.svg
  src/
    components/
      Header.astro
      Footer.astro
      NewsCard.astro
      DepartmentCard.astro
      YearArchive.astro
    content/
      news/*.md
      departments/*.md
    data/
      site.ts
    layouts/
      BaseLayout.astro
    pages/
      index.astro
      news/index.astro
      departments/index.astro
    styles/global.css
```

## How to run locally

```bash
npm install
npm run dev
```

Then open the local address shown by Astro, usually `http://localhost:4321/`.

## How to build static files

```bash
npm run build
```

The static output will be created in `dist/`.

## Deployment

GitHub Actions deploys the static Astro site to GitHub Pages with `.github/workflows/deploy.yml`.
The workflow runs on pushes to `main` and can also be started manually with `workflow_dispatch` from the Actions tab.
It uses `withastro/action` to install dependencies and build the site, then publishes the generated artifact with `actions/deploy-pages`.

The site is configured for `https://mfs9697.github.io/inmech-site/` in `astro.config.mjs` with `site: 'https://mfs9697.github.io'` and `base: '/inmech-site'`.
After a successful deployment, hard-refresh the browser or open the page in a private window if old content is still cached.

## How to add a news item

Create a new file in `src/content/news/`, for example:

```text
src/content/news/2026-06-01-example.md
```

Use this frontmatter pattern:

```yaml
---
title: "Назва новини"
description: "Короткий опис новини."
date: 2026-06-01
category: "Оголошення"
tags: ["Інститут"]
year: 2026
featured: false
---
```

## How to add or reorder a department

Create or edit a file in `src/content/departments/`. The display order is controlled by `order`, not by the file creation date.

```yaml
---
number: 9
title: "Відділ механіки руйнування матеріалів"
shortTitle: "Механіка руйнування матеріалів"
group: "Механіка руйнування та втома"
head: "чл.-кор. НАН України М.Ф. Селіванов"
summary: "Короткий опис наукових напрямів відділу."
order: 9
---
```

## Notes

- English pages are represented only as disabled language-switch links in this prototype.
- Individual news and department detail pages can be added later as dynamic Astro routes.
- If deploying under a subdirectory, update `astro.config.mjs` with the appropriate `base` option and adjust absolute links if needed.
