# F15 — Historical dissertation originals preservation (pilot, 2021)

**Baseline:** Codex audit of 21 October 2026, F15. This pilot is limited to the **five 2021 defence-document targets** in `documents-migration.csv` and Appendix D of `WEBSITE_AUDIT_2026.md`. The full audit lists **50** missing binary targets across 2015–2021.

## Why this work is necessary

The **615 defended-dissertation catalogue records in each language are bibliographic**. Their presence does not prove that 2015–2021 defence documents survived migration. Codex confirmed all 50 original URLs returned HTTP 200 to HEAD on its audit date, but only performed a verified complete GET for **2021/26ref.pdf** (3,231,648 bytes, SHA-256 `c655306c6f3ef7332385db145e6ac9deab0cd800bbc51d52df8fb0896f38e49b`). The old host's successful HEAD responses are *not* verified archival copies.

Do not infer authors, dates, dissertation titles or relationships to 615 bibliographic catalogue entries from numeric file identifiers alone. Historical `src/data/defenseMaterialsArchive.ts` is referenced in the old migration worksheet but absent from the present source tree. Accurate person/defence associations require original indexed records or institutional review.

## Pilot source list

| Source old-host filename | Planned destination (under `public/documents/dissertations/archive/2021/`) | Format | Hash status |
| --- | --- | --- | --- |
| `26ref.pdf` | `26ref.pdf` | PDF | Codex audit and 22 October 2026 full GET match |
| `26dis.pdf` | `26dis.pdf` | PDF | Complete GET and SHA-256 pinned |
| `25ref.docx` | `25ref.docx` | DOCX | Complete GET and SHA-256 pinned |
| `25dis.docx` | `25dis.docx` | DOCX | Complete GET and SHA-256 pinned |
| `24dis.pdf` | `24dis.pdf` | PDF | Complete GET and SHA-256 pinned |

Each legacy source URL is `https://old.inmech.kyiv.ua/doc/postgraduate/dis/2021/<filename>`. The historical live URLs must remain available; **no redirects, deletions or edits to the old host** are authorized.

## Preservation contract

1. Download the full original bytes with GET from the explicit old-host allowlist. Refuse redirects to another origin, HTTP errors, HTML error pages, unexpected MIME-file signatures and oversized payloads.
2. Confirm each file's complete SHA-256, size, original URL and expected binary signature (PDF or DOCX). For `26ref.pdf`, compare against Codex's independent recorded hash and size.
3. Copy files to the corresponding `public/documents/dissertations/archive/2021/` paths **without conversion, resaving, OCR, metadata rewriting or flattening**. Record the verified hashes and bytes in a machine-readable immutable ledger; after publication CI must verify every preserved byte.
4. Link originals from stable archive document records only after retrieval, review and proper identification. If authorship/defence IDs are uncertain, keep them unresolved; do not map numeric filenames speculatively to unrelated bibliographic records.
5. Re-run `npm ci`, the full site `npm run validate`, binary hash checks, and public post-deploy HTTP/MIME/bytes checks. Use small reviewable PRs for remaining years and formats including DOC/RAR/ZIP.
6. Keep the old host and archival access operational throughout the migration.

## Status and next gates

- [x] Confirm PR #180 merged and the five pilot destination files are absent on current `main`.
- [x] Extract five exact old-source/destination pairs from original Codex source ledger.
- [x] Add `src/data/dissertations/archive-2021-pilot.json` and a bounded signature/hash-aware read-only probe.
- [x] Confirm independent complete GET and SHA-256 hashes for all five on 22 October 2026 — [read-only Actions probe #39763947430](https://github.com/mfs9697/inmech-site/actions/runs/39763947430).
- [x] Commit the **five exact original binaries** without conversion or modification, and pin source hashes/bytes in `src/data/dissertations/archive-2021-pilot.json` plus `docs/migrations/f15-2021-originals-verified.json` — import commit `9baf81120e254a74b22d17be86ae29163b12b54a`.
- [x] Preserve public links to each archival original on bilingual pages `/dissertations/archive/2021/` and `/en/dissertations/archive/2021/`, linked from the dissertation overview, with no speculative author attribution. The 615-record bibliography remains unchanged.
- [x] Restore the original GitHub deployment/validation workflow; temporary write permissions and import step have been removed.
- [x] Final clean `npm ci && npm run validate` on the committed binary sources and registered bilingual pages — [GitHub Actions #39764942589](https://github.com/mfs9697/inmech-site/actions/runs/39764942589): 436 generated pages, 19,570 checked internal links, five exact originals SHA-verified, 615 bibliographic records per language unchanged.
- [ ] Confirm that the published new download URLs return the right MIME and bytes after approved merge; keep all original old-host URLs intact.
- [ ] Review author/title/defence-to-file associations from official archived records, separately and without changing the binary copies.

A read-only GitHub Actions probe verified all five complete files; a restricted, temporary same-repository import then committed the original bytes. **Both temporary workflow changes and elevated write permissions have been removed** from this PR. The normal deployment workflow is identical to `main`. The five files are now verified locally by `npm run check:f15` during every `npm run validate`.

**Reference:** `docs/audits/2026-10-21/WEBSITE_AUDIT_2026.md` (F15, Appendix D) and `documents-migration.csv`.

## Verified byte inventory — 22 October 2026

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `26ref.pdf` | 3,231,648 | `c655306c6f3ef7332385db145e6ac9deab0cd800bbc51d52df8fb0896f38e49b` |
| `26dis.pdf` | 34,250,583 | `9c54551e207e090e2486618993c50a01707ed283f2b1887a7a6ddba41d57e6ba` |
| `25ref.docx` | 265,525 | `f92bd149b4f85baef3b45fe32f3a6778b7c3e27e2c64b7ee2acb68639fd29d28` |
| `25dis.docx` | 726,030 | `7fc994fb40ef16f45fc71e6a706f46d74d26318416046a8d0ccdea28371848b4` |
| `24dis.pdf` | 6,351,633 | `a15fc171ac5fb46798d74be0295b50d86c365ba7a839857e63c192808a2c12ce` |

**Total original bytes:** 44,825,419. All five were retrieved with complete GET responses from the old host, identified by PDF/DOCX magic bytes, hashed, committed and verified. The two DOCX files passed `unzip -t` inside GitHub Actions; the PDFs were not rewritten. Source folder year alone does **not** establish the calendar year of the associated defence.
