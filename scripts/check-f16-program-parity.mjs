import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const docs = JSON.parse(read('src/data/postgraduate/program-documents.json'));

const programme = docs.programYears.flatMap(({ program, curriculum }) => [program, curriculum]);
const courseDocs = Object.values(docs.syllabi).flat();
const syllabi = courseDocs.map(({ href }) => href);
const stakeholder = docs.reviews.flatMap(({ documents }) => documents.map(({ href }) => href));
const surveys = Object.values(docs.surveys);
const all = [...programme, ...syllabi, ...stakeholder, ...surveys];

assert.equal(docs.schemaVersion, 1, 'Expected schema v1');
assert.equal(programme.length, 8, 'Four years of programmes and curricula required');
assert.equal(Object.keys(docs.syllabi).length, 18, 'Expected 18 programme disciplines');
assert.equal(syllabi.length, 33, '33 syllabus originals must remain available');
assert.equal(stakeholder.length, 14, '14 stakeholder reviews must remain available');
assert.equal(docs.reviews.length, 5, 'Historical stakeholder review years changed');
assert.equal(surveys.length, 6, 'Six surveys must remain available');
assert.equal(all.length, 61, 'Expected 61 programme document links');
assert.equal(new Set(all).size, all.length, 'Duplicate document URL in canonical registry');

const expectedCodes = [
  ...Array.from({ length: 8 }, (_, i) => 'OK' + (i + 1)),
  ...Array.from({ length: 10 }, (_, i) => 'VK' + (i + 1))
].sort();
assert.deepEqual(Object.keys(docs.syllabi).sort(), expectedCodes, 'Course IDs differ between languages');

for (const [code, versions] of Object.entries(docs.syllabi)) {
  assert(versions.length >= 1 && versions.length <= 2, code + ': unexpected syllabus versions');
  assert.equal(new Set(versions.map(({ year }) => year)).size, versions.length, code + ': duplicate syllabus year');
  for (const { year, href } of versions) {
    assert(['2024', '2025'].includes(year), code + ': unsupported syllabus year');
    assert(href.includes('/syllabi/' + year + '/'), code + ': mismatched PDF/year');
  }
}
for (const { year, documents } of docs.reviews) {
  documents.forEach(({ id, href }, index) => {
    assert.equal(id, 'review-' + (index + 1), year + ': review order changed');
    assert(href.includes('/reviews/' + year + '/'), year + ': wrong review folder');
  });
}

for (const uri of all) {
  assert(/^\/documents\/postgraduate\/program\/[a-z0-9/-]+\.pdf$/.test(uri),
    'Invalid or off-site document URL: ' + uri);
  const published = path.join(root, 'public', uri.slice(1));
  const generated = path.join(root, 'dist', uri.slice(1));
  for (const candidate of [published, generated]) {
    assert(fs.existsSync(candidate), 'Original PDF missing: ' + candidate);
    const fd = fs.openSync(candidate, 'r');
    try {
      const magic = Buffer.alloc(5);
      assert.equal(fs.readSync(fd, magic, 0, 5, 0), 5, 'Short PDF: ' + candidate);
      assert.equal(magic.toString('ascii'), '%PDF-', 'Not a PDF: ' + candidate);
    } finally {
      fs.closeSync(fd);
    }
  }
}

const htmlPaths = [
  'dist/postgraduate/program/index.html',
  'dist/en/postgraduate/program/index.html'
];
for (const page of htmlPaths) {
  const html = read(page);
  const paths = [...html.matchAll(/href="([^"]*\/documents\/postgraduate\/program\/[^"]+\.pdf)"/g)]
    .map((m) => new URL(m[1], 'https://inmech.kyiv.ua').pathname);
  assert.equal(paths.length, 61, page + ': expected 61 PDF links');
  assert.equal(new Set(paths).size, 61, page + ': duplicate or missing PDF links');
  assert.deepEqual([...paths].sort(), [...all].sort(), page + ': document parity with source registry failed');
  assert(html.includes('class="table-scroll"'), page + ': horizontally scrollable course table missing');
}
const english = read('dist/en/postgraduate/program/index.html');
assert(english.includes('Syllabus (original in Ukrainian)'), 'Explicit syllabus language cue missing');
assert(english.includes('Original documents in Ukrainian'), 'Stakeholder review language cue missing');
assert(english.includes('UA PDF'), 'Per-link syllabus/review original language cue missing');
const enLabels = english.match(/· UA PDF/g) ?? [];
assert.equal(enLabels.length, 47, '33 syllabi and 14 review links must carry UA PDF text');

const ukrainianSource = read('src/pages/postgraduate/program.astro');
const englishSource = read('src/pages/en/postgraduate/program.astro');
for (const source of [ukrainianSource, englishSource]) {
  assert(source.includes('program-documents.json'), 'One language does not import canonical registry');
  assert(!source.includes('/documents/postgraduate/program/'),
    'Hardcoded PDF URL remains outside canonical document registry');
}
console.log('F16 document parity passed: 61/61 unique original PDFs linked in both UA and EN, 18 disciplines, 33 syllabi, 14 reviews, 8 programme/plan documents and 6 surveys; original-language cues preserved.');
