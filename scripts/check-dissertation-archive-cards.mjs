import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(cwd, 'src/data/dissertations/archive-research-cards.json'), 'utf8'));
const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021];
const originals = new Map();
for (const year of years) {
  const manifest = JSON.parse(fs.readFileSync(path.join(cwd, 'src/data/dissertations/archive-' + year + '-pilot.json'), 'utf8'));
  for (const file of manifest.pilot) {
    assert(!originals.has(file.id), 'Duplicate original identifier');
    originals.set(file.id, file);
  }
}
const cards = registry.cards;
const ids = cards.flatMap(card => card.documentIds);
assert.equal(cards.length, 26, 'Expected 26 research cards');
assert.equal(new Set(cards.map(x => x.id)).size, 26, 'Duplicate research card');
assert.equal(originals.size, 50, 'Expected all 50 F15 originals');
assert.equal(ids.length, 50, 'Every original must appear exactly once');
assert.deepEqual([...ids].sort(), [...originals.keys()].sort(), 'Incomplete card/source coverage');
assert.equal(cards.filter(c=>c.author && c.title).length, 23, 'Source-identified work count changed');
assert.equal(cards.filter(c=>!c.author && !c.title).length, 3, 'Unreviewed format count changed');
for (const card of cards) {
  assert(card.id.startsWith(card.archiveYear + '-'), 'Card folder-year mismatch ' + card.id);
  assert(card.notes.length === card.notesEn.length, 'Bilingual editorial note mismatch ' + card.id);
  assert(card.documentIds.every(id => id.startsWith(card.archiveYear + '-')), 'Unreviewed cross-year pairing ' + card.id);
  if (card.title) {
    assert(card.author && card.degree && card.specialty && card.printedYear, 'Partial title-page attribution ' + card.id);
    assert(card.documentIds.some(id => !['rar','zip','doc'].includes(originals.get(id).format)),
      'No accessible PDF/DOCX title page supporting ' + card.id);
  } else {
    assert(!card.author && !card.degree && !card.specialty, 'Unsupported attribution ' + card.id);
  }
}
for (const id of ['2016-03', '2019-20', '2019-19']) {
  assert(!cards.find(c=>c.id===id)?.title, 'Premature attribution of restricted archive ' + id);
}
const findIds = (html, key) => [...html.matchAll(new RegExp('data-' + key + '="([^"]+)"', 'g'))].map(x => x[1]);
const yearCounts = {};
const readPage = (lang, year) => fs.readFileSync(path.join(cwd, 'dist',
  ...(lang === 'en' ? ['en'] : []), 'dissertations', 'archive',
  ...(year ? [String(year)] : []), 'index.html'), 'utf8');
for (const lang of ['uk', 'en']) {
  const allPage = readPage(lang);
  assert(allPage.includes('data-dissertation-cards'), lang + ': no card gallery');
  assert.deepEqual(findIds(allPage, 'card-id').sort(), cards.map(x=>x.id).sort(),
    lang + ': missing research records on unified archive');
  assert.deepEqual(findIds(allPage, 'source-id').sort(), [...originals.keys()].sort(),
    lang + ': incomplete preserved originals on unified archive');
  for (const year of years) {
    const html = readPage(lang, year);
    const localCards = cards.filter(x => x.archiveYear === year);
    yearCounts[year] = localCards.length;
    assert.deepEqual(findIds(html, 'card-id').sort(), localCards.map(x=>x.id).sort(),
      lang + ': missing research card in source folder ' + year);
    assert.deepEqual(findIds(html, 'source-id').sort(), localCards.flatMap(x=>x.documentIds).sort(),
      lang + ': missing original file in year ' + year);
  }
  for (const [id, file] of originals) {
    const i = allPage.indexOf('data-source-id="' + id + '"');
    assert(i >= 0, lang + ': absent document ' + id);
    const row = allPage.slice(i, allPage.indexOf('</div>', i));
    if (file.publicationStatus === 'withheld-security-review') {
      assert(!row.includes('href='), lang + ': restricted download exposed ' + id);
      assert(!allPage.includes('/documents/dissertations/archive/' + id.slice(0,4) + '/' + path.basename(file.target)),
        lang + ': restricted URL leaked ' + id);
    } else {
      assert(row.includes('href="' + file.target.replace(/^public/, '') + '"'),
        lang + ': wrong source document URL ' + id);
    }
  }
  const overview = fs.readFileSync(path.join(cwd, 'dist', ...(lang==='en'?['en']:[]), 'dissertations', 'index.html'), 'utf8');
  assert(overview.includes('href="' + (lang==='en'?'/en':'') + '/dissertations/archive/"'),
    lang + ': main dissertation page needs direct card archive link');
}
console.log('Dissertation source cards passed: 26/26 records, 50/50 preserved originals, 16 bilingual archive pages; 23 research titles from source documents; 3 unreviewed records and six safely withheld binaries. Year counts: ' + JSON.stringify(yearCounts));
