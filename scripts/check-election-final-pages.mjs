import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = '/director-election/2026/';
const ledger = JSON.parse(readFileSync(path.join(root, 'src/data/elections/2026/legacy-routes.json'), 'utf8'));
const manifest = JSON.parse(readFileSync(path.join(root, 'src/data/elections/2026/documents.json'), 'utf8'));
const docs = new Map(manifest.map(d => [d.id, d]));
const finalRoutes = [
  'candidates', 'candidates/programme',
  'voting', 'voting/notice', 'voting/delegates', 'voting/voters', 'voting/observers',
  'results', 'results/commission-protocol', 'results/staff-meeting', 'results/document-submission'
];

function check() {
  const legacy = ledger.htmlRoutes.filter(r => r.targetPath.startsWith(base) && /\/(candidates|voting|results)\//.test(r.targetPath));
  assert.equal(legacy.length, 11, 'The eleven source-specific legacy pages must remain');
  assert.equal(new Set(legacy.map(r => r.targetPath)).size, 11);
  assert(ledger.htmlRoutes.every(r => r.targetState === 'built'), 'All 25 historic source HTML URLs must have built destinations');
  const unique = new Set(ledger.htmlRoutes.map(r => r.targetPath));
  assert.equal(unique.size, 22, 'Three reviewed short aliases should retain canonical destinations');

  const originalDocs = (html, ids, route) => {
    for (const id of ids) {
      const doc = docs.get(id);
      assert(doc && doc.sourceStatus === 'preserved' && doc.path, 'Missing verified document record: ' + id);
      assert(html.includes('href="' + doc.path + '"'), 'Missing original ' + id + ' in ' + route);
    }
  };

  for (const slug of finalRoutes) {
    const canonical = base + slug + '/';
    const source = legacy.find(r => r.targetPath === canonical);
    assert(source, 'Missing source ledger entry for ' + slug);
    assert.equal(source.targetState, 'built');
    for (const lang of ['uk', 'en']) {
      const prefix = lang === 'en' ? '/en' : '';
      const name = prefix + canonical + 'index.html';
      const file = path.join(root, 'dist', name.slice(1));
      assert(existsSync(file), 'Astro page not built: ' + name);
      const html = readFileSync(file, 'utf8');
      assert(html.includes('<html lang="' + lang + '"'), 'Incorrect lang: ' + name);
      assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, 'Expected one h1: ' + name);
      assert(html.includes('rel="canonical" href="https://inmech.kyiv.ua' + prefix + canonical + '"'), 'Wrong canonical: ' + name);
      assert(html.includes('hreflang="uk"') && html.includes('hreflang="en"'), 'Missing locale alternates: ' + name);
      const counterpart = lang === 'en' ? canonical : '/en' + canonical;
      assert(html.includes('href="https://inmech.kyiv.ua' + counterpart + '"'), 'Wrong language counterpart: ' + name);
      assert(html.includes('href="https://election.inmech.kyiv.ua' + source.sourcePath + '"'), 'Missing original legacy citation: ' + name);
      assert(!html.includes('drive.google.com'), 'Private Drive link leaked: ' + name);
      assert(!html.includes('href="/documents/elections/2026/vityag-protokol-5.pdf"'), 'Invented extract download: ' + name);

      if (slug === 'candidates') originalDocs(html, ['candidate-nomination-slides'], name);
      if (slug === 'candidates/programme') {
        originalDocs(html, ['development-strategy-2026-2030'], name);
        assert(html.includes('href="https://election.inmech.kyiv.ua/peredviborchi-programi-kandidativ.html"'), 'Historical programme source link missing: ' + name);
        assert(!html.includes('Передвиборча програма Назаренка В М.pdf'), 'Unapproved programme PDF introduced: ' + name);
      }
      if (slug === 'voting/voters') {
        assert(html.includes(lang === 'en' ? 'Voter-roll publication review' : 'Перевірка оприлюднення списку'), 'Missing explicit voter-roll review status: ' + name);
        assert(html.includes('92'), 'Historical total missing: ' + name);
        assert(!html.includes('<ol class="voter') && !html.includes('id="voter-list"'), 'Unreviewed names copied into voter roll: ' + name);
      }
      if (slug === 'voting/delegates') {
        assert(html.includes(lang === 'en' ? 'Unverified source' : 'Непідтверджене джерело'), 'Missing source-gap notice: ' + name);
        assert(!html.includes('election-document-action'), 'Fabricated delegate download: ' + name);
      }
      if (slug === 'voting/observers') originalDocs(html, ['observer-application'], name);
      if (slug === 'results' || slug === 'results/staff-meeting') originalDocs(html, ['staff-meeting-protocol', 'staff-meeting-protocol-legacy-main'], name);
      if (slug === 'results' || slug === 'results/commission-protocol') originalDocs(html, ['election-commission-protocol'], name);
      if (slug === 'results' || slug === 'results/commission-protocol') {
        assert(html.includes('79') && html.includes('92'), 'Historical recorded results absent: ' + name);
      }
      if (slug === 'results/document-submission') assert(html.includes('50-02-07-173'), 'Document submission letter reference missing: ' + name);
      if (['candidates', 'voting', 'results'].includes(slug)) {
        for (const child of finalRoutes.filter(x => x.startsWith(slug + '/'))) {
          assert(html.includes('href="' + prefix + base + child + '/"'), 'Category index missing ' + child + ': ' + name);
        }
      }
    }
  }

  for (const lang of ['uk','en']) {
    const prefix = lang === 'en' ? '/en' : '';
    const html = readFileSync(path.join(root,'dist',prefix.slice(1) + base + 'index.html'), 'utf8');
    for (const section of ['candidates/','voting/','results/']) {
      assert(html.includes('href="' + prefix + base + section + '"'), 'Year root omits new section ' + section);
    }
  }
  console.log('Final election history checks passed: 11 bilingual pairs, 25 legacy HTML sources mapped to 22 built destinations, original documents, voter-roll review and source gaps.');
}

try { check(); }
catch (error) { console.error('Final election history check failed: ' + error.message); process.exitCode = 1; }
