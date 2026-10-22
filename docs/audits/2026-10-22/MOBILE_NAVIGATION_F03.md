# Mobile navigation reachability — Codex F03

**Date:** 22 October 2026  
**Scope:** Institute website Ukrainian/English navigation, responsive/mobile behavior only.  
**Source:** `docs/audits/2026-10-21/WEBSITE_AUDIT_2026.md` finding F03 and the companion improvement roadmap.

## Root cause

At viewport widths up to 1120 px, `.primary-nav` became an absolutely positioned menu inside the sticky `.nav-shell`, without bounded height or its own vertical scroll area. The previous `setMenuState(true)` also expanded every submenu automatically. On short screens, the lower links—including **Search / Пошук**—could sit outside the visible viewport while page scrolling moved the content underneath instead of the menu.

## Corrections

- Use `overflow-y: auto`, `overscroll-behavior-y: contain`, and a `max-height` tied to the actual visible viewport space under the sticky navigation row; `100dvh` is a CSS fallback during initialization. The menu scrolls internally; its lower links remain reachable even when all categories cannot fit simultaneously.
- On mobile, keep submenu headings **collapsed when the menu opens**. Expand only the selected section and collapse the previous section.
- Recalculate available panel height upon opening, window resizing and `visualViewport` resize/scroll. This handles mobile browser chrome, shorter viewports and zoom-related changes better than a hard-coded header height.
- Keep menu/submenu `aria-expanded` synchronized with visible state. ArrowDown focuses the first link in a chosen submenu.
- Escape inside a submenu collapses only that section and returns focus to its heading; Escape elsewhere in the open mobile menu closes it and returns focus to the Menu toggle.
- Clicking outside or following a menu link (including an in-page anchor) closes the mobile panel.
- Desktop breakpoint and dropdown layout remain unchanged.

No routes, content records, official document files, language alternatives or institutional data are modified.

## Automated verification

`npm run check:mobile-navigation`, included in `npm run validate`, compiles and executes the **actual** `src/scripts/navigation.ts` in a lightweight DOM event simulator using the already declared `esbuild` dev dependency. It verifies the mobile open/close state, collapsed/single active submenu behavior, calculated scroll height, resize updates, keyboard ArrowDown, nested Escape handling and focus, outside click, menu-link close, and desktop behavior. It checks that the responsive CSS includes scroll confinement and that both built Ukrainian/English homepages expose the accessible menu controls and Search link.

This is a deterministic regression suite, **not a substitute for browser-level layout and assistive technology validation**.

## Manual acceptance checklist before merge

Test both `/` and `/en/` (one representative longer-content page as well) on actual browsers:

| Viewport or input | Expected behavior |
| --- | --- |
| 320 × 480 and 375 × 667 | Tap Menu; all category headings initially collapsed. Scroll *inside the panel* to the final Search/Пошук item; underlying page should not be required to scroll. |
| 390 × 320 (landscape/short screen) | Bottom links remain reachable within the scrolling panel; no overlay extends beyond viewport bottom. |
| 768 × 600 and 1120 × 600 | Tablet width uses scrollable mobile menu with accessible submenus. |
| 1121 × 768 and 1440 × 900 | Desktop menu remains horizontal; dropdowns open and close without a mobile scroll panel. |
| 200% browser zoom and mobile address-bar resize | Menu height tracks available viewport space; all links remain reachable. |
| Keyboard only | Tab to Menu, Enter/Space to open, Tab among headings, ArrowDown to first submenu link, Escape to close submenu (focus heading), Escape again to close panel (focus Menu); outside focus does not become trapped. |
| Pointer/touch | Selecting another category closes the previous one; tapping outside or following a link closes the overlay. |
| JavaScript-enhanced bilingual parity | Ukrainian and English labels differ, but identical behaviors and current-page routes remain unchanged. |

**Release:** a normal protected-branch PR and deployment workflow; verify the visible mobile menu on the deployed version after merge. Do not declare accessibility certification from static tests alone.
