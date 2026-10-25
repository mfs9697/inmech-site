import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const directory = '/images/ncutam/meetings/2025-11-11/';
const gallery = JSON.parse(readFileSync('src/data/ncutam-gallery.generated.json', 'utf8'));
const originals = ['01', '02', '03', '04', '05'];
const pages = [
  'dist/ncutam/activity/meetings/2025-11-11/index.html',
  'dist/en/ncutam/activity/meetings/2025-11-11/index.html'
];
const pagesHtml = pages.map((filename) => {
  if (!existsSync(filename)) throw new Error('F10 gallery: missing localized page ' + filename);
  return readFileSync(filename, 'utf8');
});

function invariant(ok, message) {
  if (!ok) throw new Error('F10 gallery: ' + message);
}
invariant(Object.keys(gallery).length === 5, 'five original photographs expected');

let originalsTotal = 0;
let mobileTotal = 0;
let responsiveTotal = 0;

for (const id of originals) {
  const src = directory + id + '.jpg';
  const meta = gallery[src];
  invariant(meta && meta.width > 0 && meta.height > 0, 'dimensions missing for ' + src);
  const original = readFileSync('public' + src);
  const publishedOriginal = readFileSync('dist' + src);
  const hash = createHash('sha256').update(original).digest('hex');
  invariant(hash === meta.originalSha256, 'source was modified: ' + src);
  invariant(hash === createHash('sha256').update(publishedOriginal).digest('hex'),
    'published original does not match source: ' + src);
  invariant(original.length === meta.originalBytes, 'source size changed: ' + src);
  originalsTotal += original.length;

  for (const size of ['small', 'large']) {
    const item = meta[size];
    invariant(item && item.src.startsWith(directory + 'variants/') &&
      item.src.endsWith('.webp'), 'invalid derivative path for ' + id);
    const filepath = path.join('dist', item.src.slice(1));
    invariant(existsSync(filepath), 'missing generated WebP ' + filepath);
    const bytes = readFileSync(filepath);
    invariant(bytes.toString('ascii', 0, 4) === 'RIFF' &&
      bytes.toString('ascii', 8, 12) === 'WEBP', 'invalid WebP signature ' + filepath);
    invariant(bytes.length === item.bytes && item.width > 0 && item.height > 0,
      'invalid dimensions or bytes: ' + filepath);
    invariant(bytes.length < original.length, 'derivative larger than original: ' + filepath);
    responsiveTotal += bytes.length;
    if (size === 'small') mobileTotal += bytes.length;
    for (const [index, html] of pagesHtml.entries()) {
      invariant(html.includes(item.src), pages[index] + ' does not reference ' + item.src);
    }
  }
  for (const [index, html] of pagesHtml.entries()) {
    invariant(html.includes('href="' + src + '"'),
      pages[index] + ' lost the full-resolution source link: ' + src);
    invariant(!html.includes('src="' + src + '"'),
      pages[index] + ' still loads the large original as a thumbnail: ' + src);
  }
}

for (const [index, html] of pagesHtml.entries()) {
  const imageSrcsets = [...html.matchAll(/<img\b[^>]*>/g)].filter((match) =>
    match[0].includes('srcset=') && match[0].includes(directory + 'variants/'));
  invariant(imageSrcsets.length === 5,
    pages[index] + ' does not have all five responsive images: ' + imageSrcsets.length);
  for (const img of imageSrcsets) {
    invariant(/width="\d+"/.test(img[0]) && /height="\d+"/.test(img[0]),
      pages[index] + ' missing intrinsic dimensions on thumbnail');
    invariant(/loading="lazy"/.test(img[0]) && /decoding="async"/.test(img[0]),
      pages[index] + ' missing lazy loading attributes');
  }
}

invariant(mobileTotal < originalsTotal * 0.30,
  'mobile set exceeds 30% of original byte size');
invariant(responsiveTotal < originalsTotal * 0.65,
  'both image sets exceed 65% of original byte size');
console.log('F10 gallery PASS: five untouched originals, bilingual srcset/dimensions, ' +
  'originals=' + originalsTotal + ' bytes, mobile=' + mobileTotal +
  ' bytes, both WebP sets=' + responsiveTotal + ' bytes.');
