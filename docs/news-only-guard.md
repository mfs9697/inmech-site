# News-only contributor guard

This repository has a GitHub Actions guard for contributors who should edit only news materials.

The guard is used by both deployment workflows:

- `.github/workflows/astro.yml`
- `.github/workflows/deploy-to-inmech.yml`

The guard script is:

```text
.github/scripts/check-news-only-changes.mjs
```

## How to activate it

Create a GitHub Repository Variable:

```text
Settings → Secrets and variables → Actions → Variables → New repository variable
```

Use:

```text
Name: NEWS_ONLY_ACTORS
Value: github-username-of-secretary
```

For several users, separate usernames by commas or spaces:

```text
secretary-one, secretary-two
```

## Allowed paths

Users listed in `NEWS_ONLY_ACTORS` are allowed to change only:

```text
src/content/news/
public/images/news/
```

This allows them to add or edit Markdown news records and upload news images.

## What happens if another file is changed

If a listed news-only contributor changes any other path, GitHub Actions fails before building and deploying the site. The commit remains in `main`, but the site is not published from that run. An administrator should then fix or revert the commit, or move the changes to a reviewed pull request.

## Important limitation

This guard is a deployment safeguard, not a full GitHub permission model. A collaborator with Write access can still create a commit in `main`; the guard prevents accidental publication of disallowed changes by the automated workflows.
