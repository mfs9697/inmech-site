# Director-election 2026: legacy URL compatibility handoff

**Status: planning-only. Do not apply HTTP redirects from this branch.**  
Baseline: the approved audit dated 21 October 2026 and Stage 1/2 election PRs #167/#169.

## Authoritative ledger

The machine-readable, source-host-specific register is
[\`src/data/elections/2026/legacy-routes.json\`](../../src/data/elections/2026/legacy-routes.json).

- **25** HTML paths on \`election.inmech.kyiv.ua\`, all observed HTTP 200 during the audit; **nine** lacked substantive page bodies.
- **22** distinct planned year-section destinations, because three empty short-name aliases lead to the same meaningful pages as their longer source equivalents.
- Only the election homepage maps to the **already built** \`/director-election/2026/\`. The 21 additional historical detail/category destinations are **not yet built**.
- **17** document source-URL observations: seven preserved election downloads, one unavailable extract, four broken main-host HTTPS aliases, their four still-working old-main counterparts, and an additional HTTP variant of the broken main-host meeting protocol path.
- The missing extract \`/media/files/vityag-protokol-5.pdf\` is recorded as \`retain-404\`, without a canonical binary. It is referenced on the Astro archive page as unavailable.
- Source statuses are observations, not guaranteed current HTTP responses. Recheck before any rollout.

Do not infer that archived content is legally current or that the outcome of an election confirms a later appointment. The original election page graph is described in
[\`DIRECTOR_ELECTIONS_MIGRATION.md\`](../audits/2026-10-21/DIRECTOR_ELECTIONS_MIGRATION.md).

## How the register works

Each HTML record contains: the exact legacy hostname/path, the observed source status and substantive/empty classification, the proposed canonical destination, its implementation state (\`built\` or \`planned-page\`), and the **future** desired HTTP behavior (\`planned-301\`). The existing 2026 overview is the sole \`built\` destination. Nothing in this branch implements a 301.

Each document record references an ID in the **existing, immutable**
\`src/data/elections/2026/documents.json\`; local target paths, accepted SHA-256 values and original source observations come from that manifest, not a second editable binary registry. \`retain-original\` means the verified \`old.inmech.kyiv.ua\` copy must remain recoverable. \`planned-301\` means a possible future alias to the approved byte-identical file. \`retain-404\` is reserved for the missing extract.

Run:

\`\`\`sh
npm ci
npm run validate
# Targeted check after a completed Astro build:
npm run check:election-legacy
\`\`\`

\`scripts/check-election-legacy-routes.mjs\` validates the full set's counts, hosts, exact paths, duplicate sources, permitted three shared destinations, absent pending pages, presence of built UA/EN pages, cross-references to document manifest source URLs, source-observation statuses, accepted local file existence, and preservation of the missing-extract status. Its 11 corruption tests are in-memory only. Checks perform no network access and cannot mutate server configuration.

## Next content PRs

Build and review the **21 planned destinations** progressively, organized by:

1. Normative sources (\`regulations/\`): link and describe the historical NAS competition notice and legislation as historical references. Never silently substitute a current-amended legal text for a historical source.
2. Institute working documents (\`documents/\`): reuse the verified original PDFs from Stage 1; distinguish the order issue date from its publication date. Committee minutes remain an explicit source gap.
3. Candidate material (\`candidates/\`): preserve the already published nomination content. The supplementary candidate-programme **PDF** and Council-presentation **text PDF** found in Drive are pending separate institutional decisions in [Issue #168](https://github.com/mfs9697/inmech-site/issues/168). Do not publish them as part of this ledger.
4. Voting (\`voting/\`): preserve the already published historical roll, including its ordering and as-of-date, only after the records owner confirms continued public availability. Do not expand it with internal contact/personnel data. Do not resolve conflicting venue/eligibility statements by guessing. The delegates page must not invent a missing procedure.
5. Results (\`results/\`): record the source-backed figures and protocol variants, the dated notice of forwarding documents, and the boundary between an observed vote and the separate appointment decision.

When a canonical Astro page is **actually built**, flip the matching ledger rows from \`planned-page\` to \`built\` in the same PR. Evolve the checker to recognize newly built target routes rather than loosening its guarantees. Introduce translated UI, reciprocal language alternatives, stable headings, and static navigation to each new page. Build verification should always catch broken document links and absent originals.

## Future host-level cutover (not in this PR)

1. Obtain the actual server/CDN configuration and responsible hosting operators for **all three hostnames**: \`inmech.kyiv.ua\`, \`old.inmech.kyiv.ua\`, and \`election.inmech.kyiv.ua\`. Static Astro route stubs do **not** install redirects on the other hosts.
2. Obtain institutional approval of historical descriptions, original publications and privacy review of voter roll. Resolve or transparently preserve venue/eligibility conflicts, unlinked pages and remaining record gaps.
3. Snapshot/backup the historical hosts and existing rules; establish a versioned rollback procedure, DNS/TLS continuity, and a separate safe staging environment.
4. Convert the ledger to exact **host-aware HTTP rules** supported by the confirmed server product. Do not choose a speculative Apache/nginx syntax. No catch-all homepage redirect; no document URL may return HTTP 200 with unrelated HTML.
5. Verify each new target in Ukrainian and English and every approved original file and SHA-256. Only then activate a small batch of mappings on the correct host.
6. Verify real HTTP status, \`Location\`, final content MIME, HTTP/HTTPS where applicable, Unicode filenames and percent-encoded variants, query strings, anchors (browser behavior), and redirect-loop absence. Broken extracts must not become false PDF downloads.
7. Keep the old hosts available through the rollout, record an emergency rollback, and separately approve the final bilingual homepage-link switch. Add monitoring for historical 404s and newly discovered unlinked paths.

The **current homepage links and server configuration remain unchanged** by this PR.
