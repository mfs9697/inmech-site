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
  ['/documents/ncutam/reports/2025/ncutam-report-2025.pdf', '41be7ec560e69b9dc74eabebaceac70dfffe13ca'],
  ['/documents/ncutam/meetings/2023-09-12/01-minutes.pdf', 'c2981adf88e506556498dbbab6dabf227d29245e'],
  ['/documents/ncutam/meetings/2023-09-12/02-appendix-to-minutes.pdf', '613a61074ac6b0b3d66ec41b502c444fbc01f6d2'],
  ['/documents/ncutam/meetings/2023-09-12/03-resolution-1.pdf', '4a75992675fafbab95a8ef758403e448e4b99949'],
  ['/documents/ncutam/meetings/2023-09-12/04-resolution-2.pdf', '196ddf75d6aed30d3eb7f134ee7c7b9c68c0b234'],
  ['/documents/ncutam/meetings/2023-09-12/05-resolution-3.pdf', '90ae15aa0d64104218c81a6dcf6da0ffaa29c8c9'],
  ['/documents/ncutam/meetings/2023-09-12/06-appendix-to-resolution-3.pdf', '18b4ea003220ed7d61531fb0cc4508dc84de994a'],
  ['/documents/ncutam/meetings/2023-09-12/07-resolution-4.pdf', '6a72003510d33f6438d8d6311bc6c914dac2438c'],
  ['/documents/ncutam/meetings/2023-09-12/08-resolution-5.pdf', 'c5db532948d4cb174c064a305a4992c91f739173'],
  ['/documents/ncutam/meetings/2023-09-12/09-resolution-6.pdf', '23ea6e9324e5a8137e745cbfd736b3e5061a60c2'],
  ['/documents/ncutam/meetings/2023-09-12/10-resolution-7.pdf', '47eabbf537c2d538bf386cee6b7eda958b0ca90a'],
  ['/documents/ncutam/meetings/2025-11-11/general-meeting-resolutions-2025.pdf', 'a81aa637d7302c6bf30ca97f059271c482f642e9'],
  ['/documents/ncutam/meetings/2025-11-11/activity-booklet-2023-2025.pdf', 'dffe949fc31e8696349bc14c38ac21fade11cc06']
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
