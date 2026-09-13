# WP9 implementation note

WP9 establishes the post-cutover maintenance workflow for NCUTAM content. The normative procedure is `docs/NCUTAM_MAINTENANCE.md`; `docs/ncutam-update-examples.md` provides compact copyable patterns, and `.github/PULL_REQUEST_TEMPLATE/ncutam-update.md` provides the review checklist.

The validator changes in this branch deliberately remove migration-only assumptions that would block legitimate future updates while preserving historical invariants and exact document-byte integrity.
