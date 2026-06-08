import fs from 'node:fs';
import path from 'node:path';

const registryPath = path.join(process.cwd(), 'documents-migration.csv');

const rows = fs.readFileSync(registryPath, 'utf8')
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean)
  .map((line) => line.match(/("([^"]|"")*"|[^,]+)/g).map((cell) =>
    cell.replace(/^"|"$/g, '').replaceAll('""', '"')
  ));

for (const [, oldUrl, newPath] of rows) {
  const target = path.join(process.cwd(), newPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });

  if (fs.existsSync(target)) {
    console.log(`Skip existing: ${newPath}`);
    continue;
  }

  console.log(`Downloading: ${oldUrl}`);
  const response = await fetch(oldUrl);

  if (!response.ok) {
    console.warn(`Failed ${response.status}: ${oldUrl}`);
    continue;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(target, buffer);
}
