import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const ledgerPath = path.join(root, 'src/data/elections/2026/legacy-routes.json');
const documentPath = path.join(root, 'src/data/elections/2026/documents.json');
const siteRoot = '/director-election/2026/';
const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8'));
const documents = JSON.parse(readFileSync(documentPath, 'utf8'));
const byId = new Map(documents.map((d) => [d.id, d]));

function validate(data, options = {}) {
  const { checkGenerated = true } = options;
  assert.equal(data.schemaVersion, 1);
  assert.equal(data.evidenceDate, '2026-10-21');
  assert.equal(data.status, 'planning-only', 'This repository PR must not activate server redirects');
  assert.equal(data.htmlRoutes.length, 25, 'Expected exactly 25 historical HTML URLs');
  assert.equal(data.documentRoutes.length, 17, 'Expected 17 document URL observations');
  const keys = new Set();
  const record = (row) => {
    assert(['election.inmech.kyiv.ua', 'inmech.kyiv.ua', 'old.inmech.kyiv.ua'].includes(row.host), 'Unexpected legacy hostname');
    const scheme = row.scheme ?? 'https';
    assert(['http', 'https'].includes(scheme));
    assert(row.sourcePath.startsWith('/') && !row.sourcePath.includes('?') && !row.sourcePath.includes('#'), 'Invalid source pathname');
    assert(!row.sourcePath.includes('..') && !row.sourcePath.includes('\\'), 'Unsafe legacy pathname');
    const key = scheme + '://' + row.host + row.sourcePath;
    assert(!keys.has(key), 'Duplicate legacy URL: ' + key);
    keys.add(key);
    return key;
  };
  const targets = new Map();
  let empty = 0;
  for (const row of data.htmlRoutes) {
    record(row);
    assert.equal(row.host, 'election.inmech.kyiv.ua');
    assert.equal(row.sourceHttpStatus, 200);
    assert.equal(row.handling, 'planned-301');
    assert(row.sourcePath === '/' || /^\/[a-z0-9-]+\.html$/.test(row.sourcePath), 'Unexpected HTML path');
    assert(['empty-body', 'substantive'].includes(row.sourceContent));
    if (row.sourceContent === 'empty-body') empty++;
    assert(/^\/director-election\/2026\/(?:[a-z0-9-]+\/)*$/.test(row.targetPath), 'Unexpected destination');
    assert(['built', 'planned-page'].includes(row.targetState));
    if (row.sourcePath === '/') assert.equal(row.targetState, 'built', 'Election root must remain published');
    else assert.notEqual(row.targetPath, siteRoot, 'Historical detail page must not be redirected to the year homepage');
    targets.set(row.targetPath, (targets.get(row.targetPath) ?? 0) + 1);
    const html = path.join(root, 'dist', row.targetPath.slice(1), 'index.html');
    if (checkGenerated) {
      assert.equal(existsSync(html), row.targetState === 'built',
        'Destination state does not match generated Astro route: ' + row.targetPath);
      if (row.targetState === 'built') {
        const alt = path.join(root, 'dist/en', row.targetPath.slice(1), 'index.html');
        assert(existsSync(alt), 'Published destination lacks English counterpart: ' + row.targetPath);
      }
    }
  }
  assert.equal(data.htmlRoutes[0].sourcePath, '/');
  assert.equal(data.htmlRoutes[0].targetPath, siteRoot);
  assert.equal(targets.size, 22, 'Three aliases should share canonical targets');
  assert.equal(empty, 9, 'Nine legacy HTML bodies are empty');
  const aliases = new Map([...targets].filter(([,n]) => n !== 1));
  assert.deepEqual([...aliases].sort(), [
    [siteRoot + 'documents/order-124/', 2],
    [siteRoot + 'documents/organizing-committee/', 2],
    [siteRoot + 'documents/election-commission/', 2]
  ].sort(), 'Only the three documented short-page aliases can share a target');

  let missing = 0;
  let planned = 0;
  let retained = 0;
  for (const row of data.documentRoutes) {
    const key = record(row);
    assert(['planned-301', 'retain-original', 'retain-404'].includes(row.handling));
    assert([200,404].includes(row.httpStatus));
    const doc = byId.get(row.documentId);
    assert(doc, 'Unregistered election document ID: ' + row.documentId);
    const observed = doc.sources.find((s) => {
      const url = new URL(s.url);
      return url.protocol.slice(0,-1) === (row.scheme ?? 'https')
        && url.hostname === row.host
        && decodeURIComponent(url.pathname) === row.sourcePath;
    });
    assert(observed, 'Historical URL is absent from pinned source manifest: ' + key);
    assert.equal(observed.httpStatus, row.httpStatus, 'Observation status changed without review: ' + key);
    if (row.handling === 'retain-404') {
      assert.equal(doc.id, 'committee-protocol-5-extract');
      assert.equal(doc.sourceStatus, 'missing');
      assert.equal(row.httpStatus, 404);
      assert(!('targetPath' in row), 'Missing original must not acquire a fabricated target');
      missing++;
    } else {
      assert.equal(doc.sourceStatus, 'preserved', 'A verified document is required for a document redirect');
      assert(doc.path.startsWith('/documents/'), 'Unexpected document path');
      assert(existsSync(path.join(root, 'public', doc.path.slice(1))), 'Missing approved binary ' + doc.id);
      if (row.handling === 'retain-original') {
        assert.equal(row.host, 'old.inmech.kyiv.ua');
        assert.equal(row.httpStatus, 200);
        retained++;
      } else {
        assert.notEqual(row.host, 'old.inmech.kyiv.ua');
        planned++;
      }
    }
  }
  assert.equal(missing, 1, 'Keep one unrecovered committee extract');
  assert.equal(retained, 4, 'Four verified old-main originals stay available');
  assert.equal(planned, 12, 'Seven election downloads and five main-host aliases are pending');
  assert.equal(keys.size, 42, 'Preserve all 25 HTML + 17 download/alias observations');
  const pending = new Set(data.htmlRoutes.filter(r => r.targetState === 'planned-page').map(r => r.targetPath));
  return { html: data.htmlRoutes.length, htmlTargets: targets.size, plannedPages: pending.size, documentAliases: data.documentRoutes.length };
}

function selfTest() {
  let count = 0;
  const reject = (label, mutate) => {
    const fixture = structuredClone(ledger);
    mutate(fixture);
    assert.throws(() => validate(fixture, { checkGenerated: false }), undefined, label);
    count++;
  };
  reject('missing election page', d => { d.htmlRoutes.pop(); });
  reject('duplicate old URL', d => { d.htmlRoutes[1].sourcePath = d.htmlRoutes[0].sourcePath; });
  reject('blanket homepage redirect', d => { d.htmlRoutes[1].targetPath = siteRoot; });
  reject('fabricated missing extract URL', d => { d.documentRoutes[7].targetPath = '/documents/elections/2026/missing.pdf'; });
  reject('wrong missing extract handling', d => { d.documentRoutes[7].handling = 'planned-301'; });
  reject('wrong source host', d => { d.documentRoutes[0].host = 'bad.example'; });
  reject('wrong source status', d => { d.documentRoutes[0].httpStatus = 404; });
  reject('unknown binary', d => { d.documentRoutes[0].documentId = 'nonexistent'; });
  reject('misidentified protocol version', d => { d.documentRoutes[9].documentId = 'staff-meeting-protocol'; });
  reject('unapproved HTTP cutover state', d => { d.status = 'live'; });
  reject('unlisted election alias', d => { d.htmlRoutes[8].targetPath = siteRoot + 'results/'; });
  console.log('Election compatibility ledger self-test passed (' + count + ' corruptions rejected).');
}

try {
  assert(process.argv.slice(2).every(x => x === '--self-test'));
  if (process.argv.includes('--self-test')) selfTest();
  else {
    const result = validate(ledger);
    console.log(
      'Election compatibility ledger passed: ' +
      result.html + ' old HTML URLs -> ' + result.htmlTargets + ' unique destinations (' +
      result.plannedPages + ' pending), ' + result.documentAliases +
      ' document observations; no redirect deployment.'
    );
  }
} catch (error) {
  console.error('Election compatibility ledger failed: ' + error.message);
  process.exitCode = 1;
}
