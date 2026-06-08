import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'src');
const base = '/inmech-site';
const args = new Set(process.argv.slice(2));
const writeMode = args.has('--write');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (!/\.(astro|ts|md|mdx)$/i.test(entry.name)) return [];
    return [full];
  });
}

const files = walk(srcDir);
let changedFiles = 0;
let replacements = 0;
const report = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  let updated = original;

  const before = updated;
  updated = updated
    .replace(/(["'`])\/documents\//g, `$1${base}/documents/`)
    .replace(new RegExp(`(["'\`])${base.replace('/', '\\/')}${base.replace('/', '\\/')}\/documents\/`, 'g'), `$1${base}/documents/`);

  const count = (before.match(/(["'`])\/documents\//g) ?? []).length;

  if (updated !== original) {
    changedFiles += 1;
    replacements += count;
    report.push({ file: path.relative(root, file), count });

    if (writeMode) {
      fs.writeFileSync(file, updated, 'utf8');
    }
  }
}

console.log(writeMode ? 'Mode: WRITE' : 'Mode: DRY RUN');
console.log(`Files to change: ${changedFiles}`);
console.log(`Document-link replacements: ${replacements}`);

if (report.length > 0) {
  console.log('\nFiles:');
  for (const item of report) {
    console.log(`- ${item.file}: ${item.count}`);
  }
}

if (!writeMode) {
  console.log('\nDry run only. To apply changes, run:');
  console.log('node ./scripts/prefix-document-links-for-base.mjs --write');
}
