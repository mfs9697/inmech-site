import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {
  normalizeNewlines, readNormalizedText,
  topLevelYamlRecords, yamlField, hasResponsibilityList,
  activityFrontmatter, activityGalleryItems, activityDocumentIds,
  documentManifestPaths
} from './lib/ncutam-text.mjs';

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const variants = (raw) => {
  const lf = normalizeNewlines(raw);
  return [
    ['LF', lf],
    ['CRLF', lf.replace(/\n/g, '\r\n')],
    ['CR', lf.replace(/\n/g, '\r')]
  ];
};

function testSourceReading() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ncutam-newlines-'));
  try {
    for (const [kind, text] of variants('title: "Тест"\nbody:\n  - English\n')) {
      const file = path.join(dir, kind + '.yaml');
      fs.writeFileSync(file, text, 'utf8');
      assert.equal(readNormalizedText(file), 'title: "Тест"\nbody:\n  - English\n');
    }
    assert.equal(normalizeNewlines('a\r\nb\rc\nd'), 'a\nb\nc\nd', 'Mixed line endings');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function testGovernance() {
  const source = read('src/data/ncutam/governance.yaml');
  const expected = topLevelYamlRecords(source);
  assert(expected.length > 0, 'Expected existing governance assignments');
  for (const record of expected) {
    assert(yamlField(record, 'member'), 'Missing baseline member: ' + record.id);
    assert(hasResponsibilityList(record, 'uk'), 'Missing baseline Ukrainian responsibilities: ' + record.id);
    assert(hasResponsibilityList(record, 'en'), 'Missing baseline English responsibilities: ' + record.id);
  }
  for (const [kind, sourceVariant] of variants(source)) {
    const actual = topLevelYamlRecords(sourceVariant);
    assert.deepEqual(actual, expected, 'Governance records diverged under ' + kind);
    for (const record of actual) {
      assert(yamlField(record, 'role'), 'Role not parsed under ' + kind + ': ' + record.id);
      assert(hasResponsibilityList(record, 'uk') && hasResponsibilityList(record, 'en'),
        'Responsibilities not parsed under ' + kind + ': ' + record.id);
    }
  }
  const invalid = '- id: fixture\n  role: chair\n  responsibilities:\n    - Duties\n';
  for (const [kind, content] of variants(invalid)) {
    const record = topLevelYamlRecords(content)[0];
    assert(hasResponsibilityList(record, 'uk'), 'Valid Ukrainian fixture failed in ' + kind);
    assert.equal(hasResponsibilityList(record, 'en'), false, 'Absent English responsibilities silently accepted in ' + kind);
  }
}

function testDocuments() {
  const source = read('src/data/ncutam/documents.yaml');
  const expected = documentManifestPaths(source);
  assert(expected.length > 0, 'Expected NCUTAM document manifest entries');
  assert.equal(new Set(expected).size, expected.length, 'Duplicate document path in baseline');
  for (const [kind, text] of variants(source)) {
    assert.deepEqual(documentManifestPaths(text), expected, 'Document paths diverged under ' + kind);
  }
  for (const [kind, text] of variants('- id: fixture\n  title: "Test"\n')) {
    assert.deepEqual(documentManifestPaths(text), [], 'Missing path was invented under ' + kind);
  }
}

function testActivity(relative, galleryCount, documentCount) {
  const source = read(relative);
  const expectedFrontmatter = activityFrontmatter(source);
  assert(expectedFrontmatter, 'Missing original frontmatter: ' + relative);
  const expectedGallery = activityGalleryItems(expectedFrontmatter);
  const expectedDocuments = activityDocumentIds(expectedFrontmatter);
  assert.equal(expectedGallery.length, galleryCount, 'Unexpected source gallery count: ' + relative);
  assert.equal(expectedDocuments.length, documentCount, 'Unexpected source document count: ' + relative);
  for (const [kind, text] of variants(source)) {
    const frontmatter = activityFrontmatter(text);
    assert.equal(frontmatter, expectedFrontmatter, 'Frontmatter differs under ' + kind + ': ' + relative);
    const gallery = activityGalleryItems(frontmatter);
    const documents = activityDocumentIds(frontmatter);
    assert.deepEqual(gallery, expectedGallery, 'Gallery diverged under ' + kind + ': ' + relative);
    assert.deepEqual(documents, expectedDocuments, 'Meeting documents diverged under ' + kind + ': ' + relative);
    for (const item of gallery) {
      assert(/^    alt:\s*.+$/m.test(item.fields), 'Missing Ukrainian alt in ' + relative);
      assert(/^    altEn:\s*.+$/m.test(item.fields), 'Missing English alt in ' + relative);
    }
  }
}

function testNegativeActivityFields() {
  const fixture = [
    '---',
    'title: "Title"',
    'gallery:',
    '  - src: "/images/ncutam/example.jpg"',
    '    alt: "Зображення"',
    '    altEn: "Image"',
    'documents:',
    '  - "report-2025"',
    '---',
    '<!-- en:start -->English body<!-- en:end -->'
  ].join('\n') + '\n';
  for (const [kind, text] of variants(fixture)) {
    const fm = activityFrontmatter(text);
    assert.equal(activityGalleryItems(fm).length, 1, 'Fixture gallery lost under ' + kind);
    assert.deepEqual(activityDocumentIds(fm), ['report-2025'], 'Fixture documents lost under ' + kind);
    const invalid = fm.replace('    altEn: "Image"\n', '');
    const fields = activityGalleryItems(invalid)[0]?.fields;
    assert(fields, 'Invalid fixture source unexpectedly lost under ' + kind);
    assert(!/^    altEn:\s*.+$/m.test(fields), 'Missing altEn field was silently accepted');
    assert.deepEqual(activityDocumentIds(fm.replace('documents:', 'otherField:')), [],
      'Missing document field was silently accepted under ' + kind);
  }
}

try {
  testSourceReading();
  testGovernance();
  testDocuments();
  testActivity('src/content/ncutam-activity/conferences/current-problems-mechanics-2023.md', 10, 0);
  testActivity('src/content/ncutam-activity/conferences/mechanics-present-and-prospects-2024.md', 4, 0);
  testActivity('src/content/ncutam-activity/meetings/2025-11-11.md', 5, 2);
  testActivity('src/content/ncutam-activity/meetings/2023-09-12.md', 0, 10);
  testNegativeActivityFields();
  console.log('NCUTAM LF/CRLF/CR regression passed: actual governance, document manifest, activity galleries and meeting references; absent-field negative fixtures.');
} catch (error) {
  console.error('NCUTAM newline regression failed: ' + error.message);
  process.exitCode = 1;
}
