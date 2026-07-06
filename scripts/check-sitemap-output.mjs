import { stat } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve(process.argv[2] || 'dist');
const requiredSitemaps = ['sitemap-index.xml', 'sitemap-0.xml'];
const failures = [];

for (const fileName of requiredSitemaps) {
  const filePath = path.join(outputDirectory, fileName);

  try {
    const file = await stat(filePath);
    if (!file.isFile() || file.size === 0) failures.push(`${fileName}: missing or empty`);
  } catch {
    failures.push(`${fileName}: missing`);
  }
}

if (failures.length) {
  console.error(`Sitemap output is incomplete in ${outputDirectory}.`);
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}

console.log(`Verified sitemap output in ${outputDirectory}.`);
