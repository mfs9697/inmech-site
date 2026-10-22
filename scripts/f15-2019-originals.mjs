import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const file = path.join(root, 'src/data/dissertations/archive-2019-pilot.json');
const pilot = JSON.parse(fs.readFileSync(file, 'utf8')).pilot;
const MAX_BYTES = 90 * 1024 * 1024; // Refuse unexpectedly oversized or incorrect responses.
const LEGACY_ORIGIN = 'https://old.inmech.kyiv.ua';

function validateEntry(entry) {
  assert(/^2019-\d+(?:ref|refer|dis|dis-last)$/.test(entry.id), 'Unexpected pilot id: ' + entry.id);
  assert(/^public\/documents\/dissertations\/archive\/2019\/[a-z0-9-]+\.(pdf|rar|zip)$/.test(entry.target),
    'Unsafe or unexpected target path: ' + entry.target);
  const source = new URL(entry.sourceUrl);
  assert.equal(source.origin, LEGACY_ORIGIN, 'Unexpected source host');
  assert.equal(source.pathname, '/doc/postgraduate/dis/2019/' + path.posix.basename(entry.target).replace('dis-last', 'dis_last'));
  assert(['pdf', 'rar', 'zip'].includes(entry.format) && entry.target.endsWith('.' + entry.format), 'Format/extension mismatch');
  if (entry.expectedSha256 !== null) assert(/^[0-9a-f]{64}$/.test(entry.expectedSha256));
  if (entry.expectedBytes !== null) assert(Number.isSafeInteger(entry.expectedBytes) && entry.expectedBytes > 100);
}

function validMagic(format, head) {
  if (format === 'pdf') return head.subarray(0, 5).equals(Buffer.from('%PDF-'));
  if (format === 'zip') return head.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
  // RAR 4.x and RAR 5.x magic signatures; do not extract or repackage originals.
  if (format === 'rar') {
    const prefix = Buffer.from([0x52, 0x61, 0x72, 0x21, 0x1a, 0x07]);
    return head.subarray(0, 6).equals(prefix) && [0x00, 0x01].includes(head[6]);
  }
  return false;
}

function checkBytes(entry, bytes) {
  assert(bytes.length > 100 && bytes.length <= MAX_BYTES, 'Unexpected payload size');
  assert(validMagic(entry.format, bytes), 'Incorrect binary signature or HTML error response');
  const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
  if (entry.expectedSha256 !== null) {
    assert.equal(sha256, entry.expectedSha256, entry.id + ': source bytes changed from audit');
  }
  if (entry.expectedBytes !== null) {
    assert.equal(bytes.length, entry.expectedBytes, entry.id + ': source byte size changed');
  }
  return { id: entry.id, sourceUrl: entry.sourceUrl, target: entry.target,
    format: entry.format, bytes: bytes.length, sha256 };
}

async function download(entry) {
  let url = entry.sourceUrl;
  for (let redirects = 0; redirects < 4; redirects += 1) {
    const response = await fetch(url, {
      redirect: 'manual',
      signal: AbortSignal.timeout(120000),
      headers: { 'Accept': 'application/pdf,application/zip,application/vnd.rar,application/octet-stream;q=0.9' }
    });
    if (response.status >= 300 && response.status < 400) {
      const next = new URL(response.headers.get('location') ?? '', url);
      assert.equal(next.origin, LEGACY_ORIGIN, 'Redirect unexpectedly leaves trusted old host');
      url = next.href;
      continue;
    }
    assert(response.ok, entry.id + ': old server returned HTTP ' + response.status);
    assert(response.body, 'Empty response body');
    const chunks = [];
    let size = 0;
    for await (const part of response.body) {
      size += part.byteLength;
      assert(size <= MAX_BYTES, entry.id + ': exceeds safety byte cap');
      chunks.push(Buffer.from(part));
    }
    return Buffer.concat(chunks, size);
  }
  throw new Error(entry.id + ': too many redirects');
}

function selfTest() {
  assert.equal(pilot.length, 15, 'Pilot must contain exactly 15 source paths');
  assert.equal(new Set(pilot.map((x) => x.target)).size, pilot.length, 'Duplicate target');
  assert.equal(new Set(pilot.map((x) => x.sourceUrl)).size, pilot.length, 'Duplicate source');
  for (const entry of pilot) validateEntry(entry);
  assert(validMagic('pdf', Buffer.from('%PDF-1.7\n...')));
  assert(validMagic('zip', Buffer.from([0x50, 0x4b, 0x03, 0x04, 1, 2])));
  assert(validMagic('rar', Buffer.from([0x52, 0x61, 0x72, 0x21, 0x1a, 0x07, 0x00])));
  assert(validMagic('rar', Buffer.from([0x52, 0x61, 0x72, 0x21, 0x1a, 0x07, 0x01, 0x00])));
  assert(!validMagic('pdf', Buffer.from('<html>Not Found</html>')));
  assert(!validMagic('zip', Buffer.from('<html>Not Found</html>')));
  assert(!validMagic('rar', Buffer.from('<html>Not Found</html>')));
  assert.throws(() => checkBytes({ id: 'test', format: 'pdf', expectedBytes: null, expectedSha256: null },
    Buffer.from('<html>' + 'x'.repeat(150))), /Incorrect binary signature/);
  assert.throws(() => validateEntry({ ...pilot[0], sourceUrl: 'https://other.example/test' }), /Unexpected source host/);
  console.log('F15 2019 source/target manifest and binary checks passed (15 audited PDF/RAR/ZIP records).');
}

async function main() {
  selfTest();
  const mode = process.argv[2] || '--self-test';
  if (mode === '--self-test') return;
  if (mode !== '--probe' && mode !== '--import' && mode !== '--verify') {
    throw new Error('Usage: node scripts/f15-2019-originals.mjs [--self-test|--probe|--import|--verify]');
  }
  const observed = [];
  for (const entry of pilot) {
    const local = path.join(root, entry.target);
    if (mode === '--verify') {
      assert(fs.existsSync(local), entry.id + ': source original is not in repository');
      const bytes = fs.readFileSync(local);
      observed.push(checkBytes(entry, bytes));
      continue;
    }
    const bytes = await download(entry);
    const result = checkBytes(entry, bytes);
    observed.push(result);
    console.log('F15_SOURCE_PROBE:' + JSON.stringify(result));
    if (mode === '--import') {
      assert(!fs.existsSync(local), entry.id + ': refusing to overwrite original');
      fs.mkdirSync(path.dirname(local), { recursive: true });
      fs.writeFileSync(local, bytes, { flag: 'wx' });
    }
  }
  if (mode === '--import') {
    const ledger = path.join(root, 'docs/migrations/f15-2019-originals-verified.json');
    fs.mkdirSync(path.dirname(ledger), { recursive: true });
    fs.writeFileSync(ledger, JSON.stringify({
      date: new Date().toISOString(),
      source: 'old.inmech.kyiv.ua (complete binary GET)',
      entries: observed
    }, null, 2) + '\n', { flag: 'wx' });
  }
  if (mode === '--verify') {
    const ledger = path.join(root, 'docs/migrations/f15-2019-originals-verified.json');
    const saved = JSON.parse(fs.readFileSync(ledger, 'utf8'));
    assert.deepEqual(saved.entries, observed, 'Committed originals differ from SHA-256 ledger');
    console.log('F15 archive verification passed: ' + observed.length + ' 2019 original files match immutable hashes.');
  } else console.log('F15_' + (mode === '--import' ? 'IMPORTED' : 'PROBED') + ':' + JSON.stringify(observed));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error('F15 preservation failed:', error.message); process.exitCode = 1; });
}
