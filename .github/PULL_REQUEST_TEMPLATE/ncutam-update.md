## NCUTAM update

### Change type

- [ ] News
- [ ] Membership / institution
- [ ] Governance
- [ ] Meeting / conference / initiative / international activity
- [ ] Official document / annual report
- [ ] Media mention
- [ ] Evergreen text
- [ ] Route / continuity change

### Source and content checks

- [ ] The factual change is supported by an official or otherwise appropriate source.
- [ ] Ukrainian and English fields/body text were updated together where applicable.
- [ ] Stable IDs and existing public routes were preserved unless the change explicitly requires otherwise.
- [ ] New images/documents use stable NCUTAM paths and no `/public/` prefix in content references.
- [ ] New gallery images have Ukrainian and English alt text.

### Membership/governance checks, if applicable

- [ ] Existing member IDs were preserved across status changes.
- [ ] New active members have a sourced `joinedYear` and a valid institution reference.
- [ ] Historical admission years were preserved when changing member status.
- [ ] Superseded governance assignments were closed with `effectiveTo` rather than overwritten.
- [ ] Current governance assignments reference active members and contain bilingual responsibilities.

### Document checks, if applicable

- [ ] The PDF exists under `public/documents/ncutam/**`.
- [ ] `src/data/ncutam/documents.yaml` contains the corresponding metadata record.
- [ ] `src/data/ncutam/document-hashes.json` contains the exact `git hash-object` value for the PDF.
- [ ] An existing archival PDF was not silently replaced in place.

### Validation

- [ ] `npm run check:ncutam` passes.
- [ ] `npm run validate` passes.
- [ ] Relevant Ukrainian and English pages were reviewed locally or in the generated output.

### Deployment / continuity

- [ ] No legacy redirect change is needed.
- [ ] If a canonical route changed, the corresponding `mfs9697/ncutam` migration-map/redirect update is prepared and will be deployed only after the target-site change.

Reference: `docs/NCUTAM_MAINTENANCE.md`
