import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const registryPath = path.join(root, 'documents-migration.csv');
const failuresPath = path.join(root, 'documents-download-failures.csv');

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

function csvEscape(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function readCsv(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }

  const lines = fs.readFileSync(filePath, 'utf8')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

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

function urlVariants(oldUrl) {
  const variants = [oldUrl];

  if (oldUrl.includes('%20')) {
    variants.push(oldUrl.replaceAll('%20-', '-'));
    variants.push(oldUrl.replaceAll('%20', '-'));
    variants.push(oldUrl.replaceAll('%20', ''));
  }

  if (oldUrl.includes(' ')) {
    variants.push(oldUrl.replaceAll(' ', '%20'));
    variants.push(oldUrl.replaceAll(' -', '-'));
    variants.push(oldUrl.replaceAll(' ', '-'));
  }

  return [...new Set(variants)];
}

async function fetchWithFallbacks(oldUrl) {
  const errors = [];

  for (const url of urlVariants(oldUrl)) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        errors.push(`${url} -> HTTP ${response.status}`);
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      return { buffer, finalUrl: url };
    } catch (error) {
      errors.push(`${url} -> ${error?.message ?? String(error)}`);
    }
  }

  return { error: errors.join(' | ') };
}

const rows = readCsv(registryPath);
const failures = [];
let downloaded = 0;
let skipped = 0;

for (const row of rows) {
  const oldUrl = row.old_url?.trim();
  const newPath = row.suggested_new_path?.trim();

  if (!oldUrl || !newPath) {
    failures.push({ oldUrl, newPath, reason: 'empty old_url or suggested_new_path' });
    continue;
  }

  const target = path.join(root, newPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });

  if (fs.existsSync(target)) {
    console.log(`Skip existing: ${newPath}`);
    skipped += 1;
    continue;
  }

  console.log(`Downloading: ${oldUrl}`);
  const result = await fetchWithFallbacks(oldUrl);

  if (result.error) {
    console.warn(`Failed: ${oldUrl}`);
    console.warn(`  ${result.error}`);
    failures.push({ oldUrl, newPath, reason: result.error });
    continue;
  }

  fs.writeFileSync(target, result.buffer);
  downloaded += 1;

  if (result.finalUrl !== oldUrl) {
    console.log(`  downloaded via fallback: ${result.finalUrl}`);
  }
}

if (failures.length > 0) {
  const header = ['old_url', 'suggested_new_path', 'reason'];
  const text = [
    header.map(csvEscape).join(','),
    ...failures.map((failure) => header.map((name) => csvEscape(failure[name])).join(','))
  ].join('\n');

  fs.writeFileSync(failuresPath, `${text}\n`, 'utf8');
}

console.log('\nDownload summary');
console.log(`Downloaded: ${downloaded}`);
console.log(`Skipped existing: ${skipped}`);
console.log(`Failed: ${failures.length}`);

if (failures.length > 0) {
  console.log(`Failure list: ${path.relative(root, failuresPath)}`);
}
