# Repository Instructions

This repository contains the Astro site for the S.P. Timoshenko Institute of
Mechanics. GitHub is the source of truth for source code, review, CI, and
deployment state.

## Git And Deployment

- Never edit files directly on the production server; deployed files are
  generated from `dist/` by GitHub Actions.
- Never work directly on `main`. Use one branch per logical change and open one
  Pull Request per branch.
- Do not commit, push, merge, pull, or deploy unless the user explicitly asks.
- Keep changes scoped and review the final diff for unrelated edits before
  finishing.

## Site Conventions

- Preserve the existing Astro architecture: pages in `src/pages/`, shared
  layouts in `src/layouts/`, reusable components in `src/components/`, content
  collections in `src/content/`, site data in `src/data/`, and shared styles in
  `src/styles/`.
- Keep Ukrainian and English versions synchronized where bilingual fields or
  pages exist, including titles, descriptions, tags, image alt text, navigation,
  and visible content.
- Preserve accessibility, semantic landmarks, keyboard behavior, and responsive
  design. Generated pages must keep exactly one complete `<main>` landmark.
- Do not modify `package-lock.json` unless dependencies genuinely change.
- Do not run `npm audit fix --force`.

## Security

- Do not expose credentials, SSH keys, GitHub secrets, deployment secrets, server
  usernames, server paths, or other access details in code, docs, logs, or
  responses.
- Treat any production access information found locally as sensitive.

## Validation

- Before finishing, run the same validation used by
  `.github/workflows/deploy-to-inmech.yml`:
  `npm ci`, `npm run build`, verify `dist/sitemap-index.xml` and
  `dist/sitemap-0.xml` exist, and run
  `node scripts/check-main-landmarks.mjs`.
- Report changed files, validation results, and anything that still needs manual
  review.
