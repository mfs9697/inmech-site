import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'src');
const output = path.join(root, 'documents-migration.csv');

const urlRegex = /https:\/\/inmech\.kyiv\.ua\/[^'"`\s)\]}]+/g;
const allowedExtensions = /\.(pdf|doc|docx|zip|rar)$/i;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (!/\.(astro|ts|md|mdx)$/i.test(entry.name)) return [];
    return [full];
  });
}

const rows = [['source_file', 'old_url', 'suggested_new_path', 'status']];

for (const file of walk(srcDir)) {
  const text = fs.readFileSync(file, 'utf8');
  const urls = [...text.matchAll(urlRegex)].map((m) => m[0]);

  for (const oldUrl of [...new Set(urls)]) {
    const url = new URL(oldUrl);
    const filename = path.basename(url.pathname);

    if (!allowedExtensions.test(filename)) continue;

    rows.push([
      path.relative(root, file),
      oldUrl,
      `public/documents/_incoming/${filename}`,
      'to-download'
    ]);
  }
}

fs.writeFileSync(
  output,
  rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\n'),
  'utf8'
);

console.log(`Created ${output}`);
