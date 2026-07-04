import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve(process.argv[2] || 'dist');

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtmlFiles(entryPath));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(entryPath);
  }

  return files;
}

const htmlFiles = await collectHtmlFiles(outputDirectory);
if (htmlFiles.length === 0) throw new Error(`No HTML files found in ${outputDirectory}`);

const failures = [];
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const openings = (html.match(/<main(?:\s|>)/gi) || []).length;
  const closings = (html.match(/<\/main\s*>/gi) || []).length;
  if (openings !== 1 || closings !== 1) {
    failures.push(`${path.relative(outputDirectory, file)}: ${openings} opening, ${closings} closing`);
  }
}

if (failures.length) {
  console.error('Every generated page must contain exactly one complete main landmark.');
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} generated pages: one main landmark per page.`);
