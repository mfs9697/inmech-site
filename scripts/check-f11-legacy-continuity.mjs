import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = path.join(root, 'dist');
const ledger = JSON.parse(readFileSync('src/data/legacy/f11-primary-main-routes.json', 'utf8'));
const elections = JSON.parse(readFileSync('src/data/elections/2026/legacy-routes.json', 'utf8'));

function csvRows(source) {
  const rows = [];
  let row = [], value = '', quoted = false;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (quoted) {
      if (ch === '"' && source[i + 1] === '"') { value += '"'; i++; }
      else if (ch === '"') quoted = false;
      else value += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(value); value = ''; }
    else if (ch === '\n') { row.push(value.replace(/\r$/, '')); rows.push(row); row = []; value = ''; }
    else value += ch;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  return rows;
}

function localOutput(urlPath) {
  return path.join(site, urlPath.slice(1), 'index.html');
}

function validateRoutes(routes) {
  assert.equal(routes.schemaVersion, 1);
  assert.equal(routes.sourceHost, 'inmech.kyiv.ua');
  assert.equal(routes.status, 'static-compatibility-only');
  assert.equal(routes.hostLevelRedirects, 'not-activated');
  assert.equal(routes.entries.length, 3, 'F11 stage 1 has exactly three HTML gateways');
  const expected = [
    ['/l/ua/news/', '/news/'],
    ['/l/en/news/', '/en/news/'],
    ['/l/ua/calendar_g/', '/events/']
  ];
  const seen = new Set();
  for (const [i, entry] of routes.entries.entries()) {
    assert.deepEqual([entry.oldPath, entry.destination], expected[i], 'Unexpected mapping/ordering');
    assert(!seen.has(entry.oldPath), 'Duplicate legacy source URL');
    seen.add(entry.oldPath);
    assert.equal(entry.compatibilityPage, entry.oldPath);
    assert.equal(entry.handling, 'static-contextual-gateway');
    assert(entry.destination.startsWith('/') && entry.destination.endsWith('/'));
    assert(existsSync(localOutput(entry.oldPath)), 'Missing fallback page ' + entry.oldPath);
    assert(existsSync(localOutput(entry.destination)), 'Missing canonical destination ' + entry.destination);
    const html = readFileSync(localOutput(entry.oldPath), 'utf8');
    assert(html.includes('href="' + entry.destination + '"'),
      'Fallback omits exact canonical destination ' + entry.destination);
    assert(!html.includes('http-equiv="refresh"'),
      'A static gateway must never impersonate a verified HTTP 301');
    if (entry.queryPolicy === 'year-on-original-host') {
      assert(html.includes('data-legacy-news-gateway'));
      assert(html.includes('old.inmech.kyiv.ua/l/' + entry.language.replace('uk','ua') + '/news/'),
        'No original archive fallback for ' + entry.oldPath);
      assert.equal(entry.equivalence, 'partial', 'Old year coverage is NOT equivalent');
    }
  }
}

const missingAllowed = new Set([
  'public/documents/dissertations/archive/2019/20ref.rar',
  'public/documents/dissertations/archive/2019/20dis.zip',
  'public/documents/dissertations/archive/2019/19dis.rar',
  'public/documents/dissertations/archive/2016/08dis.zip',
  'public/documents/dissertations/archive/2016/03refer.doc',
  'public/documents/dissertations/archive/2016/03dis.doc',
  'public/documents/postgraduate/nmr/nmr-members.docx',
  'public/documents/postgraduate/schedule/2025-2026/year-1.pdf',
  'public/documents/postgraduate/schedule/2025-2026/year-2.pdf',
  'public/documents/postgraduate/schedule/2025-2026/year-3.pdf'
]);

function validateDocuments() {
  const table = csvRows(readFileSync('documents-migration.csv', 'utf8'));
  assert.deepEqual(table.shift(), ['source_file', 'old_url', 'suggested_new_path', 'status']);
  assert.equal(table.length, 184, 'Unexpected document migration ledger count');
  const seen = new Set();
  const missing = new Set();
  let existing = 0;
  let htmlReplacement = 0;
  let canonicalVacancy = 0;
  for (const row of table) {
    assert.equal(row.length, 4, 'Invalid CSV row');
    const [, url, dest, status] = row;
    const old = new URL(url);
    assert.equal(old.hostname, 'inmech.kyiv.ua');
    assert.equal(old.protocol, 'https:');
    assert(old.pathname.startsWith('/doc/'));
    assert(!old.search && !old.hash, 'Unexpected query in exact document URL');
    assert(!seen.has(url), 'Duplicate legacy document URL ' + url);
    seen.add(url);
    assert(['to-download', 'replaced-by-page', 'canonical-vacancy-archive'].includes(status));
    if (status === 'replaced-by-page') {
      assert.equal(dest, 'src/pages/doctoral.astro');
      assert(existsSync(localOutput('/doctoral/')));
      htmlReplacement++;
      continue;
    }
    assert(dest.startsWith('public/') && !dest.includes('..'), 'Unsafe/misleading destination ' + dest);
    const onDisk = existsSync(dest);
    if (!onDisk) {
      missing.add(dest);
      assert(missingAllowed.has(dest), 'Unexpected absent original ' + dest);
      continue;
    }
    const generated = path.join(site, dest.slice('public/'.length));
    assert(existsSync(generated), 'An existing public document was not published ' + dest);
    existing++;
    if (status === 'canonical-vacancy-archive') canonicalVacancy++;
  }
  assert.deepEqual([...missing].sort(), [...missingAllowed].sort(),
    'Withheld/missing sources must remain explicitly recorded; no fabricated downloads');
  assert.equal(existing, 173, 'Existing file destinations have changed');
  assert.equal(canonicalVacancy, 3);
  assert.equal(htmlReplacement, 1);
  assert.equal(elections.htmlRoutes.length, 25);
  assert.equal(elections.documentRoutes.length, 17);
  assert.equal(elections.status, 'planning-only',
    'Election host redirects cannot be activated from this static site');
  console.log('F11 documents: ' + table.length + ' exact legacy source URLs, ' +
    existing + ' existing public targets, ' + missing.size + ' absent/withheld files, ' +
    htmlReplacement + ' replacement page; election-host 25 HTML + 17 document URLs remain a separate ledger.');
}

const clone = (value) => structuredClone(value);
function selfTest() {
  for (const mutation of [
    (copy) => { copy.entries[0].destination = '/'; },
    (copy) => { copy.entries[1].oldPath = copy.entries[0].oldPath; },
    (copy) => { copy.status = 'server-301-active'; },
    (copy) => { copy.entries[0].queryPolicy = 'ignore-year'; }
  ]) {
    const copy = clone(ledger);
    mutation(copy);
    assert.throws(() => validateRoutes(copy));
  }
  console.log('F11 self-test: four invalid mapping/activation changes rejected.');
}

if (process.argv.includes('--self-test')) selfTest();
validateRoutes(ledger);
validateDocuments();
console.log('F11 static gateway and source-ledger checks PASS (no host-level redirects claimed).');
