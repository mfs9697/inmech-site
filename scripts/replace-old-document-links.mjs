import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'src');
const defaultCsv = path.join(root, 'documents-migration.csv');

const args = new Set(process.argv.slice(2));
const writeMode = args.has('--write');
const allowIncoming = args.has('--allow-incoming');
const verifyFiles = args.has('--verify-files');
const csvArg = process.argv.find((arg) => arg.startsWith('--csv='));
const csvPath = csvArg ? path.resolve(root, csvArg.slice('--csv='.length)) : defaultCsv;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (!/\.(astro|ts|md|mdx)$/i.test(entry.name)) return [];
    return [full];
  });
}

function parseCsvLine(line) {
  const cells = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells;
}

function readCsv(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }

  const lines = fs.readFileSync(filePath, 'utf8')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  if (lines.length < 2) return [];

  const header = parseCsvLine(lines[0]);
  const index = Object.fromEntries(header.map((name, i) => [name, i]));

  for (const required of ['old_url', 'suggested_new_path']) {
    if (!(required in index)) {
      throw new Error(`CSV must contain column: ${required}`);
    }
  }

  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    return Object.fromEntries(header.map((name, i) => [name, cells[i] ?? '']));
  });
}

function normalizePublicPath(value) {
  return value.trim().replaceAll('\\', '/').replace(/^\.\//, '');
}

function toWebPath(publicPath) {
  const normalized = normalizePublicPath(publicPath);

  if (!normalized.startsWith('public/')) {
    throw new Error(`suggested_new_path must start with public/: ${publicPath}`);
  }

  return `/${normalized.slice('public/'.length)}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const rows = readCsv(csvPath);
const replacements = [];
const skipped = [];

for (const row of rows) {
  const oldUrl = (row.old_url ?? '').trim();
  const suggestedPath = normalizePublicPath(row.suggested_new_path ?? '');
  const status = (row.status ?? '').trim().toLowerCase();

  if (!oldUrl || !suggestedPath) {
    skipped.push({ oldUrl, reason: 'empty old_url or suggested_new_path' });
    continue;
  }

  if (status === 'skip' || status === 'do-not-migrate') {
    skipped.push({ oldUrl, reason: `status=${status}` });
    continue;
  }

  if (!allowIncoming && suggestedPath.includes('/_incoming/')) {
    skipped.push({ oldUrl, reason: 'suggested_new_path still points to _incoming; edit CSV or use --allow-incoming' });
    continue;
  }

  if (verifyFiles) {
    const absoluteTarget = path.join(root, suggestedPath);
    if (!fs.existsSync(absoluteTarget)) {
      skipped.push({ oldUrl, reason: `target file not found: ${suggestedPath}` });
      continue;
    }
  }

  replacements.push({
    oldUrl,
    newUrl: toWebPath(suggestedPath),
    suggestedPath
  });
}

const files = walk(srcDir);
let changedFiles = 0;
let totalReplacements = 0;
const perFileReport = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  let updated = original;
  let fileCount = 0;

  for (const replacement of replacements) {
    const pattern = new RegExp(escapeRegExp(replacement.oldUrl), 'g');
    const matches = updated.match(pattern);

    if (matches?.length) {
      updated = updated.replace(pattern, replacement.newUrl);
      fileCount += matches.length;
    }
  }

  if (fileCount > 0) {
    changedFiles += 1;
    totalReplacements += fileCount;
    perFileReport.push({ file: path.relative(root, file), count: fileCount });

    if (writeMode) {
      fs.writeFileSync(file, updated, 'utf8');
    }
  }
}

console.log(writeMode ? 'Replacement mode: WRITE' : 'Replacement mode: DRY RUN');
console.log(`CSV: ${path.relative(root, csvPath)}`);
console.log(`Eligible replacements: ${replacements.length}`);
console.log(`Skipped rows: ${skipped.length}`);
console.log(`Files to change: ${changedFiles}`);
console.log(`Total URL replacements: ${totalReplacements}`);

if (perFileReport.length > 0) {
  console.log('\nFiles:');
  for (const item of perFileReport) {
    console.log(`- ${item.file}: ${item.count}`);
  }
}

if (skipped.length > 0) {
  console.log('\nSkipped rows:');
  for (const item of skipped.slice(0, 30)) {
    console.log(`- ${item.oldUrl || '(empty URL)'} — ${item.reason}`);
  }
  if (skipped.length > 30) {
    console.log(`...and ${skipped.length - 30} more skipped rows`);
  }
}

if (!writeMode) {
  console.log('\nDry run only. To actually replace links, run:');
  console.log('node ./scripts/replace-old-document-links.mjs --write');
}
