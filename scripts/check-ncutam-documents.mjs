import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'src/data/ncutam/documents.yaml');
const manifest = fs.readFileSync(manifestPath, 'utf8');
const errors = [];

const expectedBlobs = new Map([
  ['/documents/ncutam/foundation/1992/ncutam-founding-resolution-1992.pdf', 'c6ef5b54fd05219f2983c4803b810cff8c4b25f5'],
  ['/documents/ncutam/foundation/1993/ncutam-statute-1993.pdf', 'dbac09390c4798158adb3c59210d0f8c2a6250a4'],
  ['/documents/ncutam/governance/1992/ncutam-regulation-1992.pdf', '804ebdf4cc65496ea92b48013b6496c4b689a8ec'],
  ['/documents/ncutam/governance/2024/nasu-resolution-26-2024-01-24.pdf', 'f1a654c405729eac9fc09e16095e89c7f8ac1e01'],
  ['/documents/ncutam/reports/2023/ncutam-report-2023.pdf', '3dc4784be34c19506a0181b438004897b7c6cc84'],
  ['/documents/ncutam/reports/2024/ncutam-report-2024.pdf', 'abfadd228fb3a4394d1c17b0ca263eb63a61a378'],
  ['/documents/ncutam/reports/2025/ncutam-report-2025.pdf', '41be7ec560e69b9dc74eabebaceac70dfffe13ca']
]);

const manifestPaths = [...manifest.matchAll(/^  path:\s*["']?([^"'\n]+)["']?\s*$/gm)].map((match) => match[1]);

if (manifestPaths.length !== expectedBlobs.size) {
  errors.push(`documents: expected ${expectedBlobs.size} published PDF paths, found ${manifestPaths.length}`);
}

for (const publicPath of manifestPaths) {
  const expected = expectedBlobs.get(publicPath);
  if (!expected) {
    errors.push(`documents: no pinned binary hash for ${publicPath}`);
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
