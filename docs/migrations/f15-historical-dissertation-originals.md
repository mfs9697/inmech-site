# F15 — Historical dissertation originals preservation (pilot, 2021)

**Baseline:** Codex audit of 21 October 2026, F15. This pilot is limited to the **five 2021 defence-document targets** in `documents-migration.csv` and Appendix D of `WEBSITE_AUDIT_2026.md`. The full audit lists **50** missing binary targets across 2015–2021.

## Why this work is necessary

The **615 defended-dissertation catalogue records in each language are bibliographic**. Their presence does not prove that 2015–2021 defence documents survived migration. Codex confirmed all 50 original URLs returned HTTP 200 to HEAD on its audit date, but only performed a verified complete GET for **2021/26ref.pdf** (3,231,648 bytes, SHA-256 `c655306c6f3ef7332385db145e6ac9deab0cd800bbc51d52df8fb0896f38e49b`). The old host's successful HEAD responses are *not* verified archival copies.

Do not infer authors, dates, dissertation titles or relationships to 615 bibliographic catalogue entries from numeric file identifiers alone. Historical `src/data/defenseMaterialsArchive.ts` is referenced in the old migration worksheet but absent from the present source tree. Accurate person/defence associations require original indexed records or institutional review.

## Pilot source list

| Source old-host filename | Planned destination (under `public/documents/dissertations/archive/2021/`) | Format | Hash status |
| --- | --- | --- | --- |
| `26ref.pdf` | `26ref.pdf` | PDF | Audit GET SHA-256 recorded; requires recheck |
| `26dis.pdf` | `26dis.pdf` | PDF | Complete GET and hash required |
| `25ref.docx` | `25ref.docx` | DOCX | Complete GET and hash required |
| `25dis.docx` | `25dis.docx` | DOCX | Complete GET and hash required |
| `24dis.pdf` | `24dis.pdf` | PDF | Complete GET and hash required |

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
- [ ] Confirm independent complete GET and hashes for all five from the old host.
- [ ] Preserve exact binaries and pin all source hashes without overwriting an existing official file.
- [ ] Verify document identities, provide stable public links (UA/EN), preserve existing bibliography count and legacy URL availability.
- [ ] Pass full binary/HTML/release checks; merge only after owner review.

The initial temporary GitHub Actions read-only probe is solely for gathering download evidence because the assistant's local network cannot resolve the old host; its **workflow instrumentation must be removed** from the final PR. A failed probe is a blocker to actual binary preservation, not permission to fabricate source files.

**Reference:** `docs/audits/2026-10-21/WEBSITE_AUDIT_2026.md` (F15, Appendix D) and `documents-migration.csv`.
