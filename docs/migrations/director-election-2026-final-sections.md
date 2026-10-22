# Director election 2026 — final historical sections

**Status:** staged for editorial review; no cutover, no redirects, no homepage-link change.

This PR completes the remaining eleven historical page destinations described by
[the approved migration plan](../audits/2026-10-21/DIRECTOR_ELECTIONS_MIGRATION.md).

## Covered sections

- **Candidates:** nomination and originally published candidate election programme.
- **Voting:** section overview, historic voting notice, empty delegate-procedure source, historic voter-roll description, observer form.
- **Results:** overview, signed commission protocol, two signed staff-meeting protocol variants, notice of submitting material to the Academy.

These are 11 paired Ukrainian and English summaries, not replacements for original signed documents or verbatim translations. All preserved binaries come through the existing manifest and its SHA-256 checks.

## Provenance and limits

- **Programme:** historical source text remains at the archived election site. A separate candidate-programme PDF and a Scientific Council presentation-text PDF were discovered in a working Google Drive folder but have **not** been approved for republication (Issue #168). Neither private PDF is added to the repository. Candidate proposals are not described as adopted Institute policy.
- **Voter roll:** the historical source page had 92 entries, corroborated as a total by the signed protocol. Do **not** rebuild or enhance the personal-name list from current staff data; the new page links to the original source and shows its *historical* total only. Records-owner approval is required before republishing names or sequence.
- **Venue:** the election notice and the old Institute host differ (large conference hall, third floor, versus room 211). Both are reported as source-specific historical descriptions. No correction has been assumed.
- **Eligibility:** source documents disagree about certain forms of staff participation. No retroactive legal conclusion is made.
- **Delegates:** original page has an empty substantive body; no delegate procedure or record is invented.
- **Outcomes:** the signed commission and meeting protocols report a 16 June 2026 election, a 92-person roll, 79 registered participants and 79 votes for the nominated candidate. The website summarizes zero against and invalid ballots while some signed scan fields use dashes. Original notation is not altered.
- **Appointment:** a historical notice records forwarding documentation to the NAS of Ukraine under letter No. 50-02-07-173 dated 18 June 2026. The letter itself and later appointment act have not been verified in the inspected originals; no appointment event has been fabricated.
- **Protocol variants:** both distinct staff-meeting PDFs are preserved and linked. The commission PDF is reused byte-for-byte.
- **Other source gaps:** missing Scientific Council protocol No. 5 extract and organizing committee minutes remain flagged on related pages.

## Testing and handoff

- The machine-readable legacy ledger still has 25 exact page observations, now mapped to **22 existing** canonical paths (three aliases share destinations). This is a **content-readiness state**, not evidence of live legacy HTTP redirects.
- \`scripts/check-election-final-pages.mjs\` asserts built UA/EN routes, canonical and hreflang metadata, original-source references, preserved documents, voter-roll review label, absent delegate downloads, and results/protocol links. It is part of \`npm run validate\`.
- Both languages use the same content data IDs and responsive Astro components. Original files have not been changed.
- The linked old election host and old-main host still require host-specific HTTP compatibility rules, real URL-status verification and a separately approved cutover. No changes to production infrastructure or homepage election links are part of this PR.
- Complete visual checks on desktop/mobile and institutionally review the summaries before merging. Keep Issue #168 open until supplementary original PDFs are individually approved.
