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

## Second preservation batch — 2020 source-folder PDFs (22 October 2026)

Two further originals in the audit's missing-file inventory were downloaded with **complete HTTPS GET** from their unchanged old-host URLs, checked for the PDF magic signature, byte size and SHA-256, and copied without any format conversion, PDF rewriting or metadata edit.

| Original source file | Bytes | SHA-256 |
| --- | ---: | --- |
| `2020/23ref.pdf` | 1,919,545 | `6e887f97a2b22e7ea76c4faa6e9308b8dccd0118a0497a021262deed08639db3` |
| `2020/23dis.pdf` | 9,843,897 | `4c1e9dd631047e6c833c2d9e11566eab7265a1693d29242b66dfb89883ee1790` |

**Total original bytes this batch:** 11,763,442. Full-download hashes were first recorded by [read-only GitHub Actions source probe #39766469558](https://github.com/mfs9697/inmech-site/actions/runs/39766469558), independently pinned in `src/data/dissertations/archive-2020-pilot.json`, then compared against committed copies using `node scripts/f15-2020-originals.mjs --verify`. Complete originals and source provenance are in `public/documents/dissertations/archive/2020/` and `docs/migrations/f15-2020-originals-verified.json`.

The public Ukrainian/English archive routes are `/dissertations/archive/2020/` and `/en/dissertations/archive/2020/`, linked from each dissertation-defence overview. Filenames such as `23ref.pdf` are archival identifiers, **not independently verified author/title or defence-date identifiers**. The 615-record bibliographic catalogue remains untouched.

- [x] Capture two complete old-host PDF downloads and SHA-256 checks without changing source host.
- [x] Preserve both unmodified PDFs and lock verification in `npm run check:f15` together with all five 2021 originals.
- [x] Add bilingual document-list pages with direct original downloads and old-source provenance.
- [x] Remove temporary GitHub Actions write permissions and import steps; restore baseline deployment workflow.
- [x] Final clean CI on committed bytes and bilingual archive pages: [GitHub Actions #39767024460](https://github.com/mfs9697/inmech-site/actions/runs/39767024460) passed, with **438 built pages**, **19,652 checked links** and exact SHA-256 verification of all **7** preserved originals (5 from 2021, 2 from 2020). After merge, HTTP 200, MIME and public byte sizes still require live confirmation.
- [ ] Identify original author/defence relationships from authoritative records before attaching these numeric files to bibliography entries.

**Running archive tally (after this branch is merged):** seven of the fifty F15 files preserved (five from source folder 2021, two from 2020), **43 remain**. Subsequent batches should retain full source formats and verified source ledgers. The source-folder year does not, by itself, prove the actual defence date.

## Third preservation batch — original files from 2019 source folder (22 October 2026)

The entire **15-file** source-folder 2019 inventory from the Codex F15 audit (Appendix D) has now been retrieved by complete GET from `old.inmech.kyiv.ua` and committed in Git, without changing any original bytes or extracting/repacking compressed archives.

- Formats: 12 original PDFs, two RAR v4 archives and one ZIP.
- Size: **71,137,292 bytes** (71.14 MB).
- Immutable ledger: `docs/migrations/f15-2019-originals-verified.json`; expected original source URLs, target paths and SHA-256 hashes: `src/data/dissertations/archive-2019-pilot.json`.
- Original 2019 source document `21dis_last.pdf` retains its exact source URL while the planned on-site repository filename is `21dis-last.pdf`; no modification of bytes.
- Full-download source proof: [GitHub Actions #39767873100](https://github.com/mfs9697/inmech-site/actions/runs/39767873100). Original binary import commit: `5e33f507c259377d34f6cd798067882b86229d60`.
- Normal validation must execute `node scripts/f15-2019-originals.mjs --verify` alongside 2020 and 2021 verified originals (all **22** files).

### Verified inventory

| Legacy filename | Repository filename | Format | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `22ref.pdf` | `22ref.pdf` | PDF | 1,433,520 | `5c07cc875514258d66a6bb8f250b494360e10b94cdf0dbf39a05b5a9f8b1412a` |
| `22dis.pdf` | `22dis.pdf` | PDF | 2,776,016 | `e3ff75683582ec21a3ef6ae4d275f1217d6c81cf3b0645da1edcbd037e0b2481` |
| `21ref.pdf` | `21ref.pdf` | PDF | 1,307,255 | `3296c79c905a9544416eafcf3850e1f61a47196c501b031d9e7f986779c73ce2` |
| `21dis_last.pdf` | `21dis-last.pdf` | PDF | 4,494,736 | `e0bb156c55ea69fbad94a3ec96ca1e8dc58e8f49614c7ce87bcdcde152dbe949` |
| `20ref.rar` | `20ref.rar` | RAR | 458,123 | `30965595efea67eb9a3e75635ec8abf8d145628b9a2e100b2241367b9ae73aa3` |
| `20dis.zip` | `20dis.zip` | ZIP | 2,211,076 | `ffa66f63435bcbca33bcaf089b318a0f87ee578b777e1efbd02e6cac772f6160` |
| `19dis.rar` | `19dis.rar` | RAR | 33,257,015 | `3de65b902331e7f5f3921f4667d0848e055021c162849f1d7abf757c0233dba0` |
| `18refer.pdf` | `18refer.pdf` | PDF | 911,638 | `92be722f9e4a67adafdd3927b6704149a03a3d47f8de89dc9425c33c9888f3e7` |
| `18dis.pdf` | `18dis.pdf` | PDF | 5,993,589 | `0beb06b002122eee1b701d5b507d5105c4d56de377d389e720debc6ee53f0fc3` |
| `17refer.pdf` | `17refer.pdf` | PDF | 2,451,995 | `e587ddd4c2408bcfa2801aa77acecd7e540fc9d66bcbc46ba3abeff9a1c4d3d3` |
| `17dis.pdf` | `17dis.pdf` | PDF | 6,768,522 | `122a816eff3ef3cd015ab975619c538e97aaa5924b90df6ce87fc45a5663505a` |
| `16refer.pdf` | `16refer.pdf` | PDF | 793,731 | `b51e9f7edaaa50a7e6508d451aa1fbe90fc63cfa71b6431c752dd48b73c650e2` |
| `16dis.pdf` | `16dis.pdf` | PDF | 5,740,480 | `45a8b98a15976b62809527b239b3de6c63c83479e852bfe12aa6de143bca81b6` |
| `15refer.pdf` | `15refer.pdf` | PDF | 638,574 | `7d0e66104df25610de16522aa1f31e0bb90e5fa6a4e119bcb406844b070898f0` |
| `15dis.pdf` | `15dis.pdf` | PDF | 1,901,022 | `8ae5d54252bf48ce62accc9db26a80aec613a3dcbddee07c6e2470d535388c9b` |

### Compressed-archive format compatibility and caution

**Complete-byte integrity is not the same as archive extraction safety.** The original files have verified source signatures and pinned byte-for-byte hashes. The archive readers disagreed on the ZIP and the RAR files, so full archive extraction safety remains distinct from verified original bytes:

- `20dis.zip`: 7-Zip 23.01 and Python's `zipfile.testzip()` validated its **ten PDF members**, but `unzip -t` reported an *overlapped components (possible zip bomb)* warning and returned status 12. This is an unresolved cross-reader compatibility/security warning, not proof of malicious intent.
- `20ref.rar` and `19dis.rar`: `file` identifies **RAR v4** originals; 7-Zip 23.01 exited with a segmentation fault (139) for each. **An independent libarchive/bsdtar reader successfully listed the contents of both archives** in [read-only CI #39769093394](https://github.com/mfs9697/inmech-site/actions/runs/39769093394), but full decompression/CRC testing was not performed. The 7-Zip crashes are a reader compatibility failure; they do not establish that the files are malicious, corrupt, or completely safe.
- The official source files must not be rewritten, "repaired", OCR'd or auto-extracted to make any tool pass. Any preview or extraction should be a separately verified derivative, never a replacement for the historical original.
- Visitors on the new UA/EN archive page receive a warning for original compressed files. **Publication of the 2019 archive should receive explicit review of these reader disagreements**, not only a green hash/build CI result.

### Bilingual publication plan

- Ukrainian: `/dissertations/archive/2019/`.
- English: `/en/dissertations/archive/2019/`.
- Link both from existing dissertation-defence overviews and register localized route pairs.
- List numeric filenames without guessing a defender, dissertation title or actual year of defence.
- Keep old-host URLs intact; no redirects, deletion or DNS changes.

After 2019 is merged, **22 of the 50** missing F15 originals will be preserved in the source repository, and **28 will remain**. The next smallest simple batches are 2017 (two PDFs) and 2015 (two PDFs); 2018 contains six PDFs; 2016 contains 18 files, including DOC and ZIP.

### Final repository validation (2019 PR)

[GitHub Actions #39769510661](https://github.com/mfs9697/inmech-site/actions/runs/39769510661) **passed** with the committed original files and standard read-only workflow: `npm ci`, `npm run validate`, **440** generated pages, **19,734** checked internal links and **22/22** exact-byte original files (2019: 15; 2020: 2; 2021: 5) verified against pinned SHA-256 and byte size. Ukrainian and English defended-dissertation catalogue counts remain **615/615** unchanged. The production deployment job was intentionally skipped for the draft PR. No production or old-host modifications were performed.

**Remaining release considerations:** manual archive-download/reader review (especially the ZIP `unzip` overlap warning and the RAR 7-Zip 23.01 segmentation faults), inspection of mobile UA/EN archive pages, and post-deploy HTTP/MIME/size checks after approved merge. The `7z` reader failures were independently cross-checked: `libarchive/bsdtar` successfully listed each RAR's members, but full decompression/CRC integrity is not claimed.

### Publication-safe handling of compressed originals

Because `unzip` and 7-Zip disagreed on historic archive handling, the **three native compressed archives have been retained in Git under `preserved/dissertations/2019/`**, *outside Astro's `public/` directory*. Their exact SHA-256 hashes, sizes and original source URLs remain pinned in `src/data/dissertations/archive-2019-pilot.json` and the corresponding immutable-content ledger. No source bytes were changed; Git tracked these three moves as relocations.

- **12 PDF files** remain published in `public/documents/dissertations/archive/2019/` for ordinary download after approved deployment.
- **2 RAR files + 1 ZIP file** are preserved but **not served by the new website**. Ukrainian and English archive pages list the entries and explain why downloads are withheld.
- The separate legacy website remains untouched and was not instructed to redirect or delete files.
- Further inspection of compressed payloads, archive readers, CRC verification and any malware scans must be recorded before a separate publication PR moves the exact originals into public paths. A future public copy must retain the identical SHA-256 digest.

The original full-byte preservation objective covers **all 15** files, but the public site will expose only the **12 PDFs** until the three compressed containers are approved for publication.

**Final public/private separation check:** [GitHub Actions #39770596925](https://github.com/mfs9697/inmech-site/actions/runs/39770596925) passed: 440 pages, 19,734 internal links, all 22 original source hashes, 12 public 2019 PDFs byte-identical in `dist/`, and three retained ZIP/RAR originals **absent** from both `dist/` and bilingual public download links. The 3 native archives are not deployed with the static website.

## Fourth preservation batch — original files from 2018 source folder (22 October 2026)

All six source-folder 2018 PDFs in Codex F15 Appendix D and `documents-migration.csv` were downloaded with full GET from the original `old.inmech.kyiv.ua` host, matched by PDF signature, source URL, complete SHA-256 digest and exact byte size, and committed unchanged to `public/documents/dissertations/archive/2018/`. **12,142,142 bytes** in this batch.

| Original PDF | Bytes | SHA-256 |
| --- | ---: | --- |
| `14refer.pdf` | 456,656 | `7ec78f899b8f3f1fe3ebdb371dfff836c5d06254d1ba9efda5e1881b8f50c865` |
| `14dis.pdf` | 1,522,839 | `f9555c22418a27ffffaa6742c880b0fb461372cbacfe676acdb3c0b24d824357` |
| `13refer.pdf` | 1,857,645 | `b9c92fcc6725d503ac8c96bec605b46fea4a64b8322a9db371c75a5381aab2bd` |
| `13dis.pdf` | 6,477,651 | `0c00f700045af67592d8e153d6914191c7b2cf80a74743581d9b115bce66b69a` |
| `12refer.pdf` | 449,777 | `d1f7fb1d40667d97fb6b20b7d6d6cbb266fcfd6c36daa146edab7551881fd2a4` |
| `12dis.pdf` | 1,377,574 | `ba2ff405ca12f23cacdc82b445989320b31f88020b32da40267c3c570b0d0498` |

- Source full-download proof: [GitHub Actions #39777521215](https://github.com/mfs9697/inmech-site/actions/runs/39777521215).
- Original bytes and immutable provenance ledger: `public/documents/dissertations/archive/2018/`, `src/data/dissertations/archive-2018-pilot.json`, `docs/migrations/f15-2018-originals-verified.json`.
- Repeatable release check `node scripts/f15-2018-originals.mjs --verify` compares all six Git-committed originals and the exact PDF bytes copied into Astro's `dist/` directory. It also checks all six download links exist in the Ukrainian and English generated archive pages.
- Reciprocal public pages: `/dissertations/archive/2018/` and `/en/dissertations/archive/2018/` (both linked from the respective dissertation-defence overview pages).
- The source filenames do not independently prove actual authors, titles or defence dates, so this batch adds no speculative attribution and changes none of the 615/615 bibliographic records.
- No conversion, PDF editing, metadata revision, OCR, hosting/DNS change or old-website redirect is included.
- The temporary CI downloader/write permissions were removed and the baseline deployment workflow restored before final review.

**Running archival total after an approved merge: 28 of the 50 missing originals preserved in Git (25 publishable PDF/DOCX originals, 3 nonpublic 2019 ZIP/RAR originals); 22 remain** (2017: 2, 2016: 18, 2015: 2). The 2019 compressed originals remain outside `public/` and their extraction-safety review is a separate task.

**Release gates:** full GitHub Actions `npm ci && npm run validate` including the F15 source+dist checks; independent public-server HTTP/MIME/size smoke checks after deployment. No source-year-to-defence-year inference.

## Fifth preservation batch — original files from 2017 source folder (22 October 2026)

The two identified 2017 original PDF files, `11refer.pdf` and `11dis.pdf`, were retrieved through complete HTTPS GET from the legacy site, binary-signature checked, SHA-256 verified, and committed unchanged. The original file size total is **5,198,389 bytes**.

| Original PDF | Bytes | SHA-256 |
| --- | ---: | --- |
| `11refer.pdf` | 1,462,130 | `6d40251c7d61bc65a9903744a26cd5c617ae7c374620cca5103feb3c2ded4d28` |
| `11dis.pdf` | 3,736,259 | `566d34043e4ac71ba2f87d8168fc0ccd768bb160e7db08390cec784ec75bbae0` |

- Source GET/size/hash evidence: [GitHub Actions #39780131290](https://github.com/mfs9697/inmech-site/actions/runs/39780131290).
- Verifiable local binaries: `public/documents/dissertations/archive/2017/`; pinned manifest: `src/data/dissertations/archive-2017-pilot.json`; independent commit ledger: `docs/migrations/f15-2017-originals-verified.json`.
- `npm run check:f15` executes `node scripts/f15-2017-originals.mjs --verify` after Astro build. It checks original bytes, SHA-256, generated copies under `dist/` and original PDF links in Ukrainian/English archive pages.
- The new reciprocal pages are `/dissertations/archive/2017/` and `/en/dissertations/archive/2017/`, both linked from the respective dissertation overview.
- No PDF editing/OCR, author or actual defence-year attribution, old-host redirects, DNS/hosting changes or bibliography edits.
- The temporary runner download/import settings were removed; the protected-branch workflow is unchanged.

**Running total after PR approval and merge: 30 of the original 50 missing F15 files preserved in Git; 20 remain (2015: 2 PDF, 2016: 18 PDF/DOC/ZIP)**. The three historical 2019 compressed files remain preserved outside the public site pending independent extraction-safety review. The dissertation catalogue stays **615 entries in each language**, unchanged.

Final gates: full CI, localized-page visual review, and deployment HTTP/MIME/byte count check after owner-approved merge.
