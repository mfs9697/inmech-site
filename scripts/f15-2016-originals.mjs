import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const file = path.join(root, 'src/data/dissertations/archive-2016-pilot.json');
const pilot = JSON.parse(fs.readFileSync(file, 'utf8')).pilot;
const MAX_BYTES = 90 * 1024 * 1024; // Refuse unexpectedly oversized or incorrect responses.
const LEGACY_ORIGIN = 'https://old.inmech.kyiv.ua';

function validateEntry(entry) {
  assert(/^2016-\d+(?:refer1|refer|dis)$/.test(entry.id), 'Unexpected pilot id: ' + entry.id);
  const publicPdf = entry.format === 'pdf' && entry.publicationStatus === 'public' &&
    /^public\/documents\/dissertations\/archive\/2016\/[a-z0-9-]+\.pdf$/.test(entry.target);
  const preservedArchive = ['doc', 'zip'].includes(entry.format) &&
    entry.publicationStatus === 'withheld-security-review' &&
    /^preserved\/dissertations\/2016\/[a-z0-9-]+\.(?:doc|zip)$/.test(entry.target);
  assert(publicPdf || preservedArchive, 'Unsafe or unexpected target/publication status: ' + entry.target);
  const source = new URL(entry.sourceUrl);
  assert.equal(source.origin, LEGACY_ORIGIN, 'Unexpected source host');
  assert.equal(source.pathname, '/doc/postgraduate/dis/2016/' + path.posix.basename(entry.target).replace('dis-last', 'dis_last'));
  assert(['pdf', 'doc', 'zip'].includes(entry.format) && entry.target.endsWith('.' + entry.format), 'Format/extension mismatch');
  if (entry.expectedSha256 !== null) assert(/^[0-9a-f]{64}$/.test(entry.expectedSha256));
  if (entry.expectedBytes !== null) assert(Number.isSafeInteger(entry.expectedBytes) && entry.expectedBytes > 100);
}

function validMagic(format, head) {
  if (format === 'pdf') return head.subarray(0, 5).equals(Buffer.from('%PDF-'));
  if (format === 'zip') return head.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
  // Historical Word 97–2003/OLE compound-document signature (not a safety scan).
  if (format === 'doc') {
    return head.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
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
      headers: { 'Accept': 'application/pdf,application/zip,application/msword,application/octet-stream;q=0.9' }
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
  assert.equal(pilot.length, 18, 'Pilot must contain exactly 18 source paths');
  assert.equal(new Set(pilot.map((x) => x.target)).size, pilot.length, 'Duplicate target');
  assert.equal(new Set(pilot.map((x) => x.sourceUrl)).size, pilot.length, 'Duplicate source');
  for (const entry of pilot) validateEntry(entry);
  assert(validMagic('pdf', Buffer.from('%PDF-1.7\n...')));
  assert(validMagic('zip', Buffer.from([0x50, 0x4b, 0x03, 0x04, 1, 2])));
  assert(validMagic('doc', Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])));
  assert(!validMagic('pdf', Buffer.from('<html>Not Found</html>')));
  assert(!validMagic('zip', Buffer.from('<html>Not Found</html>')));
  assert(!validMagic('doc', Buffer.from('<html>Not Found</html>')));
  assert.throws(() => checkBytes({ id: 'test', format: 'pdf', expectedBytes: null, expectedSha256: null },
    Buffer.from('<html>' + 'x'.repeat(150))), /Incorrect binary signature/);
  assert.throws(() => validateEntry({ ...pilot[0], sourceUrl: 'https://other.example/test' }), /Unexpected source host/);
  console.log('F15 2016 source/target manifest and binary checks passed (18 audited PDF/DOC/ZIP records).');
}

async function main() {
  selfTest();
  const mode = process.argv[2] || '--self-test';
  if (mode === '--self-test') return;
  if (mode !== '--probe' && mode !== '--import' && mode !== '--verify') {
    throw new Error('Usage: node scripts/f15-2016-originals.mjs [--self-test|--probe|--import|--verify]');
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
    const ledger = path.join(root, 'docs/migrations/f15-2016-originals-verified.json');
    fs.mkdirSync(path.dirname(ledger), { recursive: true });
    fs.writeFileSync(ledger, JSON.stringify({
      date: new Date().toISOString(),
      source: 'old.inmech.kyiv.ua (complete binary GET)',
      entries: observed
    }, null, 2) + '\n', { flag: 'wx' });
  }
  if (mode === '--verify') {
    const ledger = path.join(root, 'docs/migrations/f15-2016-originals-verified.json');
    const saved = JSON.parse(fs.readFileSync(ledger, 'utf8'));
    assert.deepEqual(saved.entries, observed, 'Committed originals differ from SHA-256 ledger');

    // Release boundary: PDF originals are shipped, but questionable compressed
    // archives are preserved in Git only, never copied into the static site.
    const publicEntries = pilot.filter((entry) => entry.publicationStatus === 'public');
    const withheldEntries = pilot.filter((entry) => entry.publicationStatus === 'withheld-security-review');
    assert.equal(publicEntries.length, 15, 'Expected exactly 15 released PDF originals');
    assert.equal(withheldEntries.length, 3, 'Expected exactly three withheld DOC/ZIP originals');
    const buildDir = path.join(root, 'dist/documents/dissertations/archive/2016');
    for (const entry of publicEntries) {
      const shipped = path.join(buildDir, path.basename(entry.target));
      assert(fs.existsSync(shipped), entry.id + ': public original missing from Astro dist');
      checkBytes(entry, fs.readFileSync(shipped));
    }
    for (const entry of withheldEntries) {
      const forbidden = path.join(buildDir, path.basename(entry.target));
      assert(!fs.existsSync(forbidden), entry.id + ': withheld archive leaked into Astro dist');
    }
    const archiveHtml = [
      'dist/dissertations/archive/2016/index.html',
      'dist/en/dissertations/archive/2016/index.html'
    ];
    for (const page of archiveHtml) {
      const html = fs.readFileSync(path.join(root, page), 'utf8');
      for (const entry of withheldEntries) {
        const filename = path.basename(entry.target);
        assert(html.includes(filename), page + ': withheld entry is not transparently listed: ' + filename);
        assert(!html.includes('/documents/dissertations/archive/2016/' + filename),
          page + ': public link to withheld compressed archive was generated: ' + filename);
      }
    }
    console.log('F15 archive verification passed: ' + observed.length + ' 2016 original files match immutable hashes; 15 PDF originals match published dist bytes and 3 historical DOC/ZIP files are withheld from dist and both localized download lists.');
  } else console.log('F15_' + (mode === '--import' ? 'IMPORTED' : 'PROBED') + ':' + JSON.stringify(observed));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error('F15 preservation failed:', error.message); process.exitCode = 1; });
}
