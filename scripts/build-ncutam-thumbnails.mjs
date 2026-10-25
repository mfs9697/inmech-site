import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// These are display-only derivatives. The five original Institute JPEGs stay byte-identical.
const directory = path.resolve('public/images/ncutam/meetings/2025-11-11');
const output = path.join(directory, 'thumbs');
await fs.mkdir(output, { recursive: true });

for (let number = 1; number <= 5; number++) {
  const name = String(number).padStart(2, '0');
  const source = path.join(directory, name + '.jpg');
  const original = sharp(source);
  const metadata = await original.metadata();
  if (!metadata.width || !metadata.height || metadata.format !== 'jpeg') {
    throw new Error('Unrecognized NCUTAM original: ' + source);
  }
  for (const size of [480, 960]) {
    await sharp(source)
      .rotate()
      .resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 76, effort: 5 })
      .toFile(path.join(output, name + '-' + size + '.webp'));
  }
}
console.log('F10: generated ten responsive WebP derivatives from five preserved NCUTAM originals.');
