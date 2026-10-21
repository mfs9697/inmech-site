import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { lstatSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { electionDocumentSchema } from '../src/data/elections/documents-schema.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifestPath = 'src/data/elections/2026/documents.json';
const archivePath = 'public/documents/elections/2026';
const orderPath = '/documents/institute/orders/director-election-order-2026-04-16.pdf';
const strategyPath = '/documents/institute/strategy/development-strategy-2026-2030.pdf';
const requiredIds = [
  'candidate-nomination-slides', 'order-124', 'organizing-committee-regulations',
  'election-commission-regulations', 'staff-meeting-protocol',
  'election-commission-protocol', 'observer-application',
  'development-strategy-2026-2030', 'staff-meeting-protocol-legacy-main',
  'committee-protocol-5-extract'
];
const hash = (data) => createHash('sha256').update(data).digest('hex');
const readManifest = () => JSON.parse(readFileSync(path.join(root, manifestPath), 'utf8'));

function archiveFiles(directory, prefix = archivePath) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    assert(!entry.isSymbolicLink(), `Symlink in archive: ${entry.name}`);
    const relative = `${prefix}/${entry.name}`;
    return entry.isDirectory()
      ? archiveFiles(path.join(directory, entry.name), relative)
      : [relative];
  }).sort();
}

// Injectable reads let regression tests corrupt a virtual copy, never originals.
function validate(raw, read = (relative) => {
  const absolute = path.join(root, relative);
  // Reject symlinked files AND parent directories inside the public tree.
  let current = root;
  for (const part of relative.split('/')) {
    current = path.join(current, part);
    assert(!lstatSync(current).isSymbolicLink(), `Symlink: ${relative}`);
  }
  assert(lstatSync(absolute).isFile(), `Not a regular file: ${relative}`);
  return readFileSync(absolute);
}, files = archiveFiles(path.join(root, archivePath))) {
  assert(Array.isArray(raw), 'Manifest must be an array');
  const records = raw.map((record) => electionDocumentSchema.parse(record));
  const ids = records.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate record ID');
  assert.deepEqual([...ids].sort(), [...requiredIds].sort(), 'Stage 1 inventory must retain all ten records');
  const preserved = records.filter(({ sourceStatus }) => sourceStatus === 'preserved');
  assert.equal(preserved.length, 9, 'Expected nine distinct originals');
  assert.equal(new Set(preserved.map(({ path: p }) => p)).size, 9, 'Duplicate local path');
  assert.equal(new Set(preserved.map(({ sha256 }) => sha256)).size, 9, 'Identical bytes must share one record');
  const sourceUrls = new Set();
  for (const record of records) {
    const { id } = record;
    const mime = record.format === 'pdf' ? 'application/pdf'
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    assert.equal(record.mimeType, mime, `${id}: format/MIME mismatch`);
    assert(record.originalFilename.endsWith(`.${record.format}`), `${id}: filename/format mismatch`);
    assert.equal(new Set(record.dates.map(({ type }) => type)).size, record.dates.length, `${id}: duplicate date type`);
    assert.equal(record.originalFilename, record.sources[0].originalFilename, `${id}: primary filename mismatch`);
    for (const source of record.sources) {
      assert(!sourceUrls.has(source.url), `${id}: duplicate source URL`);
      sourceUrls.add(source.url);
      assert.equal(decodeURIComponent(new URL(source.url).pathname.split('/').at(-1)), source.originalFilename, `${id}: source URL/filename mismatch`);
      if (source.sourceStatus === 'available') {
        assert.equal(record.sourceStatus, 'preserved', `${id}: available source recorded as missing`);
        assert.equal(source.bytes, record.bytes, `${id}: source size mismatch`);
        assert.equal(source.sha256, record.sha256, `${id}: source hash mismatch`);
      }
    }
    if (record.sourceStatus === 'missing') {
      assert.equal(id, 'committee-protocol-5-extract', 'Unexpected missing source');
      assert.equal(record.language, 'und', 'Uninspected extract language must remain unknown');
      assert(record.sources.every(({ sourceStatus }) => sourceStatus === 'missing'), `${id}: inconsistent missing status`);
      continue;
    }
    assert.equal(record.language, 'uk', `${id}: original document language changed`);
    assert.equal(record.sources[0].sourceStatus, 'available', `${id}: primary source must be preserved`);
    assert(record.path.startsWith('/documents/elections/2026/') || [orderPath, strategyPath].includes(record.path), `${id}: path outside archive`);
    assert(record.path.endsWith(`.${record.format}`), `${id}: path/format mismatch`);
    assert.equal(record.storage, id === 'order-124' ? 'existing' : 'added', `${id}: storage status mismatch`);
    const data = read(`public${record.path}`);
    assert.equal(data.length, record.bytes, `${id}: file size mismatch`);
    assert.equal(hash(data), record.sha256, `${id}: file SHA-256 mismatch`);
    assert(record.format === 'pdf' ? data.subarray(0, 5).toString() === '%PDF-'
      : data.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 3, 4])) && data.includes(Buffer.from('word/document.xml')),
    `${id}: file signature mismatch`);
    if (record.variantOf) {
      const original = preserved.find(({ id: other }) => other === record.variantOf);
      assert(original && original.id !== id, `${id}: invalid variant reference`);
      assert.equal(original.kind, record.kind, `${id}: variant kind differs`);
      assert.deepEqual(original.dates, record.dates, `${id}: variant dates differ`);
      assert.notEqual(original.sha256, record.sha256, `${id}: variant must retain distinct bytes`);
    }
  }
  const byId = Object.fromEntries(records.map((record) => [record.id, record]));
  assert.equal(byId['order-124'].path, orderPath, 'Reuse the existing order URL');
  assert.equal(byId['development-strategy-2026-2030'].path, strategyPath, 'Keep the separate strategy archive path');
  assert.equal(byId['staff-meeting-protocol-legacy-main'].variantOf, 'staff-meeting-protocol', 'Retain the meeting variant relationship');
  assert.deepEqual(files, preserved.filter(({ path: p }) => p.startsWith('/documents/elections/2026/'))
    .map(({ path: p }) => `public${p}`).sort(), 'Unregistered or absent archive file');
  return records;
}

function selfTest() {
  const records = readManifest();
  const files = archiveFiles(path.join(root, archivePath));
  const originals = new Map(records.filter(({ sourceStatus }) => sourceStatus === 'preserved')
    .map((record) => [`public${record.path}`, readFileSync(path.join(root, `public${record.path}`))]));
  const read = (relative) => {
    assert(originals.has(relative), `Missing file: ${relative}`);
    return originals.get(relative);
  };
  validate(records, read, files);
  validate(JSON.parse(JSON.stringify(records, null, 2).replace(/\n/g, '\r\n')), read, files);
  let checks = 0;
  const reject = (label, edit, reader = read, inventory = files) => {
    const fixture = structuredClone(records);
    edit(fixture);
    assert.throws(() => validate(fixture, reader, inventory), undefined, label);
    checks++;
  };
  reject('duplicate ID', (r) => { r[1].id = r[0].id; });
  reject('missing record', (r) => { r.pop(); });
  reject('duplicate local path', (r) => { r[1].path = r[0].path; });
  reject('bad calendar date', (r) => { r[0].dates[0].date = '2026-02-30'; });
  reject('fabricated missing download', (r) => { r.at(-1).path = '/documents/elections/2026/fake.pdf'; });
  reject('fabricated missing checksum', (r) => { r.at(-1).sha256 = '0'.repeat(64); });
  reject('path traversal', (r) => { r[0].path = '/documents/elections/2026/../fake.pdf'; });
  reject('source metadata drift', (r) => { r[0].sources[0].bytes++; });
  reject('source filename drift', (r) => { r[0].sources[0].originalFilename = 'wrong.pdf'; });
  reject('missing original', () => {}, () => { throw new Error('Missing file'); });
  reject('altered original bytes', () => {}, (relative) => {
    const data = Buffer.from(read(relative));
    data[data.length - 1] ^= 1;
    return data;
  });
  reject('truncated original', () => {}, (relative) => read(relative).subarray(1));
  reject('orphan file', () => {}, read, [...files, `${archivePath}/extra.pdf`].sort());
  reject('duplicated meeting bytes', (r) => { r[8].sha256 = r[4].sha256; });
  reject('lost variant relationship', (r) => { delete r[8].variantOf; });
  reject('order copied to election folder', (r) => { r[1].path = '/documents/elections/2026/copied-order.pdf'; });
  const firstPath = `public${records[0].path}`;
  const badSignature = Buffer.from(read(firstPath));
  badSignature[0] = 0;
  reject('invalid original signature despite matching metadata', (r) => {
    r[0].sha256 = hash(badSignature);
    for (const source of r[0].sources) source.sha256 = r[0].sha256;
  }, (relative) => relative === firstPath ? badSignature : read(relative));
  console.log(`Election checker self-test passed (${checks} rejected corruptions; originals untouched).`);
}

try {
  assert(process.argv.slice(2).every((arg) => arg === '--self-test'), 'Unknown argument');
  if (process.argv.includes('--self-test')) selfTest();
  else {
    validate(readManifest());
    console.log('Election archive passed: 9 unchanged originals (1 existing order), 1 missing extract, source metadata and SHA-256 verified offline.');
  }
} catch (error) {
  console.error(`Election archive validation failed: ${error.message}`);
  process.exitCode = 1;
}
