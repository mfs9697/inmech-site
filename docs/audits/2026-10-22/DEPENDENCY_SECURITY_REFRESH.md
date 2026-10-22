# Dependency security refresh — Codex audit F02

**Date:** 22 October 2026  
**Repository:** `mfs9697/inmech-site`  
**Scope:** source dependency metadata and the npm-generated lockfile only; no institutional content, documents, routes, DNS or hosting changes.

## Baseline and security rationale

The Codex audit of 21 October 2026 (F02) recorded **11 package-level findings: one critical and ten high** with locked Astro 7.0.6, Sharp 0.34.5, Vite 8.1.3 and devalue 5.8.1.

The Astro security advisory [GHSA-26w7-cxv4-gfx2](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2) describes malicious AVIF processing and was patched in Astro 7.2.8 with Sharp 0.35.4. No attacker-controlled AVIF processing path or current exploitation was demonstrated on this **static** Astro website in the source audit. The update is nevertheless important for build/development security and future changes.

## Reviewed dependency changes

| Package | Previous locked version | New locked version | Notes |
| --- | --- | --- | --- |
| `astro` | 7.0.6 | **7.4.2** | Within major 7; above the patched minimum |
| `@astrojs/sitemap` | 3.7.3 | **3.7.4** | Compatible patch update |
| `sharp` | 0.34.5 | **0.35.5** | Transitive; above the patched minimum |
| `vite` | 8.1.3 | **8.3.5** | Transitive |
| `devalue` | 5.8.1 | **6.0.3** | Transitive |
| `esbuild` | implicitly present in older tree | **0.28.2** | Explicit development dependency; required directly by `scripts/check-defended-catalogs.mjs` |

Astro 7.4.2's own installed manifest requires Node.js **>=22.23.4**. `package.json` now matches this minimum; the existing deployment workflow uses Node 24. Developers using older local Node versions, including older Node 22 installations, must update Node before running `npm ci`.

This is **not** `npm audit fix --force`: the lockfile was regenerated through `npm install --package-lock-only --ignore-scripts --no-fund --no-audit` on the existing GitHub Actions Node 24 runner, then committed as a normal reviewed file. `npm ci` rebuilt the resulting tree.

## Test evidence

- [GitHub Actions lockfile-generation and validation run #39758904651](https://github.com/mfs9697/inmech-site/actions/runs/39758904651): **success** after explicitly declaring `esbuild`. It ran `npm ci` and the entire existing `npm run validate` pipeline.
- `npm audit --json` on that regenerated dependency tree reported **zero** critical, high, moderate, low or informational vulnerabilities (`metadata.vulnerabilities.total = 0` on 22 October 2026). Audit counts are a time-bound snapshot, not a guarantee against future advisories.
- A first test run, [#39758735620](https://github.com/mfs9697/inmech-site/actions/runs/39758735620), revealed that `check-defended-catalogs.mjs` imported `esbuild` through an undeclared transitive dependency. The explicit devDependency corrects this hidden coupling.
- The temporary workflow instrumentation used only to regenerate/report the lockfile was removed before final review. The production deployment workflow remains unchanged.
- **Final PR validation:** consult the latest GitHub Actions `validate` job on PR #178. The final PR must pass clean `npm ci` and the full content, internal links, NCUTAM, election and dissertation checks with the committed lockfile and declared Node minimum.

## Release boundary

Do not merge before final CI passes. Deployment follows the existing protected `main` branch workflow only after review. No forced fix, document transformation, public server configuration edit or legacy-host change is included.
