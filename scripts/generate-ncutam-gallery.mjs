import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';

// Reproducible, build-time derivatives. Official JPEG originals are never modified.
// The output folder is gitignored and copied into dist/ by Astro's public/ pipeline.
const directory = 'images/ncutam/meetings/2025-11-11';
const sources = ['01', '02', '03', '04', '05'];
const variants = [{ suffix: '480', width: 480 }, { suffix: '960', width: 960 }];
const publicDirectory = path.resolve('public', directory);
const outputDirectory = path.join(publicDirectory, 'variants');
const manifestFile = path.resolve('src/data/ncutam-gallery.generated.json');

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const manifest = {};
let totalOriginal = 0;
let mobileTotal = 0;
let responsiveTotal = 0;

for (const id of sources) {
  const original = path.join(publicDirectory, id + '.jpg');
  const source = await readFile(original);
  const originalBytes = source.length;
  const metadata = await sharp(source).metadata();
  if (metadata.format !== 'jpeg' || !metadata.width || !metadata.height) {
    throw new Error('F10: missing or invalid JPEG original: ' + original);
  }
  const rotated = [5, 6, 7, 8].includes(metadata.orientation ?? 1);
  const width = rotated ? metadata.height : metadata.width;
  const height = rotated ? metadata.width : metadata.height;
  const derivatives = {};

  for (const { suffix, width: targetWidth } of variants) {
    const name = id + '-' + suffix + '.webp';
    const destination = path.join(outputDirectory, name);
    const result = await sharp(source)
      .rotate()
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: 76, effort: 5 })
      .toFile(destination);
    if (result.size >= originalBytes || result.width > targetWidth) {
      throw new Error('F10: non-optimized derivative: ' + destination);
    }
    const variant = {
      src: '/' + directory + '/variants/' + name,
      width: result.width,
      height: result.height,
      bytes: result.size
    };
    derivatives[suffix] = variant;
    responsiveTotal += result.size;
    if (suffix === '480') mobileTotal += result.size;
  }

  manifest['/' + directory + '/' + id + '.jpg'] = {
    width,
    height,
    originalBytes,
    originalSha256: createHash('sha256').update(source).digest('hex'),
    small: derivatives['480'],
    large: derivatives['960']
  };
  totalOriginal += originalBytes;
}
await writeFile(manifestFile, JSON.stringify(manifest, null, 2) + '\n');

if (mobileTotal >= totalOriginal * 0.3 || responsiveTotal >= totalOriginal * 0.65) {
  throw new Error('F10: responsive variants did not save enough bytes');
}
console.log('F10 NCUTAM gallery: 5 originals ' + totalOriginal +
  ' bytes preserved; 480px ' + mobileTotal + ' bytes; all variants ' +
  responsiveTotal + ' bytes.');