import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const ledger = JSON.parse(readFileSync(path.join(root,'src/data/elections/2026/legacy-routes.json'), 'utf8'));
const documents = JSON.parse(readFileSync(path.join(root,'src/data/elections/2026/documents.json'), 'utf8'));
const byId = new Map(documents.map(d => [d.id, d]));
const expected = [
  'regulations','regulations/announcement','regulations/nas-statute',
  'regulations/resolution-998','regulations/language-requirements',
  'documents','documents/order-124','documents/organizing-committee',
  'documents/election-commission','documents/committee-minutes'
];
const base = '/director-election/2026/';

function check() {
  const routes = ledger.htmlRoutes.filter(row =>
    row.targetPath.startsWith(base + 'regulations/') ||
    row.targetPath.startsWith(base + 'documents/')
  );
  assert.equal(routes.length, 13, 'Historical short aliases must still be included');
  const observed = [...new Set(routes.map(row => row.targetPath.slice(base.length).replace(/\/$/,'')))].sort();
  assert.deepEqual(observed, [...expected].sort(), 'Expected ten reviewed canonical destinations');
  assert(routes.every(row => row.targetState === 'built'), 'An implemented canonical page is still marked as pending');
  for (const slug of expected) {
    const canonical = base + slug + '/';
    const old = routes.filter(row => row.targetPath === canonical);
    assert(old.length >= 1, 'No historical provenance URL for ' + slug);
    for (const lang of ['uk', 'en']) {
      const langPrefix = lang === 'en' ? '/en' : '';
      const relative = langPrefix.slice(1) + canonical + 'index.html';
      const full = path.join(root, 'dist', relative);
      assert(existsSync(full), 'No rendered historic page: ' + relative);
      const html = readFileSync(full, 'utf8');
      assert(html.includes('<html lang="' + lang + '"'), 'Wrong language for ' + relative);
      assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, 'Expected one H1 in ' + relative);
      assert(html.includes('rel="canonical" href="https://inmech.kyiv.ua' + langPrefix + canonical + '"'), 'Wrong canonical in ' + relative);
      assert(html.includes('hreflang="uk"') && html.includes('hreflang="en"'), 'Missing reciprocal hreflang in ' + relative);
      const counterpart = (lang === 'en' ? '' : '/en') + canonical;
      assert(html.includes('href="https://inmech.kyiv.ua' + counterpart + '"'), 'No counterpart URL in ' + relative);
      const substantive = old.find(row => row.sourceContent === 'substantive') ?? old[0];
      const legacyHref = 'https://election.inmech.kyiv.ua' + substantive.sourcePath;
      assert(html.includes('href="' + legacyHref + '"'), 'Missing original source link in ' + relative);
      assert(!html.includes('vityag-protokol-5.pdf'), 'Broken original extract linked in ' + relative);
      assert(!html.includes('drive.google.com/'), 'Private Google Drive source leaked to ' + relative);
      if (slug === 'documents' || slug === 'documents/order-124') {
        assert(html.includes('href="' + byId.get('order-124').path + '"'), 'Original order missing from '+relative);
      }
      if (slug === 'documents/organizing-committee') {
        assert(html.includes('href="' + byId.get('organizing-committee-regulations').path + '"'), 'Original committee regulations missing: ' + relative);
        assert(html.includes(lang === 'en' ? 'Original unavailable' : 'Оригінал недоступний'), 'Missing extract warning absent: '+relative);
      }
      if (slug === 'documents/election-commission') {
        assert(html.includes('href="' + byId.get('election-commission-regulations').path + '"'), 'Original commission regulations missing: ' + relative);
      }
      if (slug === 'documents/committee-minutes') {
        assert(html.includes(lang === 'en' ? 'Unverified source' : 'Непідтверджене джерело'), 'Unverified source not disclosed: ' + relative);
        assert(!html.includes('election-document-action'), 'Fabricated minutes download in ' + relative);
      }
      if (slug === 'regulations' || slug === 'documents') {
        const children = expected.filter(x => x.startsWith(slug+'/'));
        for (const child of children) {
          assert(html.includes('href="' + langPrefix + base + child + '/"'), 'Child index navigation missing '+child+' in '+relative);
        }
      }
    }
  }
  console.log('Historical election pages passed: ten bilingual UA/EN pairs, source provenance, document availability, canonical URLs and section navigation.');
}

try { check(); }
catch (error) { console.error('Historical election page check failed: ' + error.message); process.exitCode = 1; }
