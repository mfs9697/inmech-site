import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'src/data/ncutam/documents.yaml');
const ledgerPath = path.join(root, 'src/data/ncutam/document-hashes.json');
const manifest = fs.readFileSync(manifestPath, 'utf8');
const errors = [];

let expectedBlobs = new Map();
try {
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
  expectedBlobs = new Map(Object.entries(ledger));
} catch (error) {
  errors.push(`documents: invalid hash ledger ${path.relative(root, ledgerPath)} (${error.message})`);
}

const manifestPaths = [...manifest.matchAll(/^  path:\s*["']?([^"'\n]+)["']?\s*$/gm)].map((match) => match[1]);

if (new Set(manifestPaths).size !== manifestPaths.length) {
  errors.push('documents: duplicate public path in manifest');
}

for (const publicPath of manifestPaths) {
  const expected = expectedBlobs.get(publicPath);
  if (!expected) {
    errors.push(`documents: no pinned binary hash for ${publicPath}; add it to src/data/ncutam/document-hashes.json`);
    continue;
  }
  if (!/^[0-9a-f]{40}$/.test(expected)) {
    errors.push(`documents: invalid Git blob hash for ${publicPath}: ${expected}`);
    continue;
  }

  const relative = path.posix.join('public', publicPath.replace(/^\//, ''));
  const filePath = path.join(root, relative);
  if (!fs.existsSync(filePath)) {
    errors.push(`documents: manifest target is missing: ${relative}`);
    continue;
  }

  const bytes = fs.readFileSync(filePath);
  const header = Buffer.from(`blob ${bytes.length}\0`);
  const actual = crypto.createHash('sha1').update(header).update(bytes).digest('hex');
  if (actual !== expected) {
    errors.push(`documents: binary hash mismatch for ${publicPath}: expected ${expected}, got ${actual}`);
  }
}

for (const publicPath of expectedBlobs.keys()) {
  if (!manifestPaths.includes(publicPath)) {
    errors.push(`documents: pinned PDF is absent from manifest: ${publicPath}`);
  }
}

if (errors.length > 0) {
  console.error('NCUTAM document validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`NCUTAM document validation passed (${manifestPaths.length} manifest PDFs present with exact pinned byte hashes).`);
