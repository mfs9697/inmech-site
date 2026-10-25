import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const source = path.resolve('public/images/ncutam/meetings/2025-11-11');
const photoRoot = path.join(dist, 'images/ncutam/meetings/2025-11-11');
const thumbs = path.join(photoRoot, 'thumbs');
const errors = [];
function check(condition, message) { if (!condition) errors.push(message); }
function page(rel) {
  const full = path.join(dist, rel);
  check(existsSync(full), 'missing page: ' + rel);
  return existsSync(full) ? readFileSync(full, 'utf8') : '';
}

for (const { lang, prefix } of [{ lang: 'uk', prefix: '' }, { lang: 'en', prefix: 'en/' }]) {
  const base = prefix + 'defended-dissertations/';
  const index = page(base + 'index.html');
  check(index.includes('letter/'), lang + ' index lacks crawlable alphabet links');
  check((index.match(/data-entry-card/g) ?? []).length === 0,
    lang + ' index still renders all dissertation cards');
  const letterDir = path.join(dist, base, 'letter');
  const slugs = existsSync(letterDir)
    ? readdirSync(letterDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
    : [];
  check(slugs.length >= 22, lang + ' has too few alphabet pages: ' + slugs.length);
  let cardCount = 0;
  let largest = 0;
  for (const slug of slugs) {
    const route = base + 'letter/' + slug + '/';
    const html = page(route + 'index.html');
    const cards = (html.match(/data-entry-card data-entry-topics=/g) ?? []).length;
    // The retained surname/year grouping renders each record once per view.
    check(cards % 2 === 0, lang + ' mismatched two grouping views: ' + route);
    cardCount += cards / 2;
    largest = Math.max(largest, Buffer.byteLength(html));
    check(index.includes('letter/' + slug + '/'), lang + ' missing alphabet navigation link ' + slug);
    check(html.includes('data-catalog-view="year"'), lang + ' year grouping missing on ' + route);
    check(Buffer.byteLength(html) < 650000, lang + ' alphabet page is too large: ' + route);
  }
  check(cardCount === 615, lang + ' wrong dissertation total: ' + cardCount + ' vs 615');
  const indexSize = Buffer.byteLength(index);
  check(indexSize < 130000, lang + ' alphabet landing page too large: ' + indexSize);
  console.log('F10 ' + lang + ': ' + cardCount + ' records in ' + slugs.length +
    ' alphabet pages; index ' + indexSize + ' B; largest group ' + largest + ' B.');
}

const metadataPath = path.join(thumbs, 'metadata.json');
check(existsSync(metadataPath), 'photo dimensions manifest missing');
const metadata = existsSync(metadataPath) ? JSON.parse(readFileSync(metadataPath, 'utf8')) : {};
let originalTotal = 0;
let derivedTotal = 0;
for (let i = 1; i <= 5; i++) {
  const id = String(i).padStart(2, '0');
  const original = path.join(source, id + '.jpg');
  check(existsSync(original), 'original photograph missing: ' + id);
  if (existsSync(original)) originalTotal += statSync(original).size;
  check(metadata[id]?.width > 0 && metadata[id]?.height > 0, 'dimensions missing: ' + id);
  for (const width of [480, 960]) {
    const file = path.join(thumbs, id + '-' + width + '.webp');
    check(existsSync(file), 'missing WebP derivative: ' + file);
    if (existsSync(file)) {
      derivedTotal += statSync(file).size;
      const header = readFileSync(file).subarray(0, 12);
      check(header.subarray(0, 4).toString('ascii') === 'RIFF' &&
            header.subarray(8, 12).toString('ascii') === 'WEBP',
            'invalid WebP signature: ' + file);
    }
  }
}
check(derivedTotal < originalTotal / 2, 'photo previews have not reduced image payload by half');
for (const prefix of ['', 'en/']) {
  const activity = page(prefix + 'ncutam/activity/meetings/2025-11-11/index.html');
  check(activity.includes('thumbs/01-480.webp'), 'WebP <picture> not used on ' + prefix + ' meeting page');
  check(activity.includes('thumbs/05-960.webp'), 'fifth responsive photo not referenced on ' + prefix + ' meeting page');
  check(activity.includes('/images/ncutam/meetings/2025-11-11/01.jpg'),
    'original JPEG link removed from ' + prefix + ' meeting page');
}
if (errors.length) {
  console.error('F10 failed:\n' + errors.map((s) => ' - ' + s).join('\n'));
  process.exitCode = 1;
} else {
  console.log('F10 photos: ' + originalTotal + ' B original; ' + derivedTotal +
    ' B for all ten WebP previews (' + Math.round(100 * (1 - derivedTotal / originalTotal)) +
    '% total reduction). Original JPEGs remain unchanged.');
}
