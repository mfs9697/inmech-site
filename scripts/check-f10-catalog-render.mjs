import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const catalogs = [
  ['src/components/DefendedDissertationCatalog.astro', 'dist/defended-dissertations/index.html', '.diss-letter-group', 'uk dissertations'],
  ['src/pages/en/defended-dissertations.astro', 'dist/en/defended-dissertations/index.html', '.catalog-letter-group', 'en dissertations'],
  ['src/pages/library/scientific-books.astro', 'dist/library/scientific-books/index.html', '.alphabet-group', 'uk books'],
  ['src/pages/en/library/scientific-books.astro', 'dist/en/library/scientific-books/index.html', '.alphabet-group', 'en books']
];

for (const [source, output, selector, label] of catalogs) {
  const css = readFileSync(source, 'utf8');
  const rule = new RegExp(selector.replaceAll('.', '\\.') + '\\s*\\{[^}]*content-visibility:\\s*auto;[^}]*contain-intrinsic-size:\\s*auto\\s+\\d+px;', 'm');
  if (!rule.test(css)) throw new Error('F10: missing offscreen rendering containment in ' + source);
  if (!existsSync(output)) throw new Error('F10: missing generated catalogue ' + output);
  const html = readFileSync(output, 'utf8');
  if (!html.includes('content-visibility:auto') && !html.includes('content-visibility: auto')) {
    // Astro may extract scoped CSS to an emitted stylesheet.
    if (!html.includes('stylesheet')) throw new Error('F10: generated catalogue missing stylesheet ' + output);
  }
  if (!html.includes('catalog-') && !html.includes('alphabet-group')) {
    throw new Error('F10: catalogue records/group markup missing in ' + output);
  }
  console.log('F10 ' + label + ': ' + statSync(output).size + ' HTML bytes; offscreen paint containment configured.');
}
console.log('F10 note: HTML payloads are still unpartitioned; archive anchor and filter preservation take priority.');
