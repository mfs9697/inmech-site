import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve(process.argv[2] || 'dist');
const publicDirectory = path.resolve('public');
const assetExtensions = new Set([
  '.avif',
  '.doc',
  '.docx',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.pdf',
  '.png',
  '.rar',
  '.rtf',
  '.svg',
  '.txt',
  '.webp',
  '.zip'
]);
const oversizedThresholds = {
  image: 1_000_000,
  document: 10_000_000
};

async function collectFiles(directory, predicate = () => true) {
  if (!existsSync(directory)) return [];

  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(entryPath, predicate));
    if (entry.isFile() && predicate(entryPath)) files.push(entryPath);
  }

  return files;
}

function extractReferences(html) {
  const references = [];
  const attributePattern = /\b(?:href|src)=["']([^"']+)["']/gi;
  const sourceSetPattern = /\bsrcset=["']([^"']+)["']/gi;

  for (const match of html.matchAll(attributePattern)) {
    references.push(match[1]);
  }

  for (const match of html.matchAll(sourceSetPattern)) {
    for (const candidate of match[1].split(',')) {
      const [reference] = candidate.trim().split(/\s+/);
      if (reference) references.push(reference);
    }
  }

  return references;
}

function isLocalAsset(reference) {
  if (
    reference === '' ||
    reference.startsWith('#') ||
    /^[a-z][a-z0-9+.-]*:/i.test(reference) ||
    reference.startsWith('//')
  ) {
    return false;
  }

  const pathname = reference.split(/[?#]/)[0];
  return assetExtensions.has(path.extname(pathname).toLowerCase());
}

function resolveReference(reference, htmlFile) {
  const pathname = decodeURIComponent(reference.split(/[?#]/)[0]);
  if (pathname.startsWith('/')) return path.join(outputDirectory, pathname);
  return path.resolve(path.dirname(htmlFile), pathname);
}

function formatBytes(bytes) {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(1)} KB`;
  return `${bytes} B`;
}

async function hashFile(filePath) {
  const data = await readFile(filePath);
  return createHash('sha256').update(data).digest('hex');
}

async function auditMissingReferences() {
  const htmlFiles = await collectFiles(outputDirectory, (filePath) => filePath.endsWith('.html'));
  const missing = [];
  const publicPrefix = [];

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, 'utf8');
    const page = `/${path.relative(outputDirectory, htmlFile).split(path.sep).join('/')}`;

    for (const reference of extractReferences(html)) {
      if (reference.startsWith('/public/')) {
        publicPrefix.push(`${page}: ${reference}`);
      }
      if (!isLocalAsset(reference)) continue;

      const candidate = resolveReference(reference, htmlFile);
      if (!existsSync(candidate)) {
        missing.push(`${page}: ${reference}`);
      }
    }
  }

  return { missing, publicPrefix };
}

async function auditSizesAndDuplicates() {
  const files = await collectFiles(publicDirectory, (filePath) => assetExtensions.has(path.extname(filePath).toLowerCase()));
  const oversized = [];
  const hashes = new Map();

  for (const filePath of files) {
    const fileStat = await stat(filePath);
    const extension = path.extname(filePath).toLowerCase();
    const threshold = ['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp'].includes(extension)
      ? oversizedThresholds.image
      : oversizedThresholds.document;

    if (fileStat.size > threshold) {
      oversized.push(`${path.relative(publicDirectory, filePath).split(path.sep).join('/')} (${formatBytes(fileStat.size)})`);
    }

    const hash = await hashFile(filePath);
    const duplicateSet = hashes.get(hash) ?? [];
    duplicateSet.push(path.relative(publicDirectory, filePath).split(path.sep).join('/'));
    hashes.set(hash, duplicateSet);
  }

  const duplicates = [...hashes.values()].filter((group) => group.length > 1);
  return { oversized, duplicates };
}

function printGroup(title, items, formatter = (item) => `  - ${item}`) {
  console.log(title);
  if (items.length === 0) {
    console.log('  none');
    return;
  }
  items.forEach((item) => console.log(formatter(item)));
}

async function main() {
  if (!existsSync(outputDirectory)) {
    console.log(`Generated output directory not found: ${outputDirectory}`);
    console.log('Run npm.cmd run build before auditing generated asset references.');
    return;
  }

  const { missing, publicPrefix } = await auditMissingReferences();
  const { oversized, duplicates } = await auditSizesAndDuplicates();

  printGroup('Missing generated asset/download references:', missing);
  printGroup('References that include a public/ prefix:', publicPrefix);
  printGroup('Oversized public assets:', oversized);
  printGroup('Duplicate public assets:', duplicates, (group) => `  - ${group.join(' == ')}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
