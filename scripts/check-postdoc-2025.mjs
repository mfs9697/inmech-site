import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = (path) => fs.readFileSync(path, 'utf8');
const ua = read('src/pages/vacancies.astro');
const en = read('src/pages/en/vacancies.astro');
const dataUa = read('src/data/vacancies.ts');
const dataEn = read('src/data/vacanciesEn.ts');
const regulation = read('src/pages/documents/postdoc/regulations.astro');
const resolution = read('src/pages/documents/postdoc/resolution-164.astro');
const archive = read('src/pages/documents/postdoc/regulations-2022-2023.astro');
const old260 = read('src/pages/documents/postdoc/resolution-260.astro');
const regulationIndex = read('src/pages/license-and-regulations.astro');
const regulationIndexEn = read('src/pages/en/license-and-regulations.astro');

function extractBlocks(source, path) {
  const match = source.match(/const blocks = (\[[\s\S]*?\]);\n---/);
  assert.ok(match, path + ': blocks absent');
  return JSON.parse(match[1]);
}

function postdocList(source, language) {
  const start = source.indexOf('class="submission-panel postdoc-submission-panel"');
  assert.notEqual(start, -1, language + ': postdoc panel missing');
  const chunk = source.slice(start, source.indexOf('</div>', start));
  const list = chunk.match(/<ol>([\s\S]*?)<\/ol>/);
  assert.ok(list, language + ': ordered list missing');
  assert.equal((list[1].match(/<li>/g) ?? []).length, 11, language + ': expected 11 documents');
  assert.ok(!list[1].includes('500 слів') && !list[1].includes('500 words'), language + ': outdated motivation cap');
  return list[1];
}

const paragraphs = extractBlocks(regulation, 'regulations');
const p = paragraphs.map((x) => x.text);
const resolutionParagraphs = extractBlocks(resolution, 'resolution');
assert.equal(p.filter((x) => /^\d\.\d\./.test(x)).length, 28, 'numbered provisions 1.1–5.7');
assert.equal(p.filter((x) => /^\d+\)/.test(x)).length, 11, 'list items 1–11 in paragraph 3.3');
for (const term of ['до 40 років включно', 'не більше 10 років', 'досвід у проведенні наукових досліджень', 'від 07.05.2025 № 164']) {
  assert.ok(p.join(' ').includes(term), 'regulations missing ' + term);
}
assert.ok(resolutionParagraphs.some((x) => x.text.includes('втратила чинність') && x.text.includes('26.01.2022 № 38')));
assert.ok(archive.includes('Архівна редакція 2022–2023 років'));
assert.ok(archive.includes('до 35 років включно'), 'historical body must remain available');
assert.ok(old260.includes('Історичний документ'));
assert.ok(regulation.includes('overflow-wrap:anywhere'), 'legal text must wrap on narrow screens');
assert.ok(regulation.includes('padding:clamp('), 'mobile-aware padding');

for (const [source,lang] of [[ua,'UA'],[en,'EN']]) {
  postdocList(source, lang);
  assert.ok(source.includes("'/documents/postdoc/resolution-164/'"), lang + ': resolution 164 link');
}
for (const [source,label] of [[regulationIndex,'UA'],[regulationIndexEn,'EN']]) {
  for (const href of ['regulations/', 'resolution-164/', 'regulations-2022-2023/', 'resolution-260/']) {
    assert.ok(source.includes('/documents/postdoc/' + href), label + ': index missing ' + href);
  }
}
assert.ok(dataUa.includes('до 40 років включно') && dataUa.includes('не більше 10 років'));
assert.ok(dataUa.includes('досвід у проведенні наукових досліджень'));
assert.ok(dataEn.includes('aged 40 or younger') && dataEn.includes('no more than 10 years'));
for (const data of [dataUa,dataEn]) {
  assert.ok(data.includes("orderNumber: '118/к'"), 'original order number changed');
  assert.ok(data.includes("date: '2026-10-01'"), 'original order date changed');
  assert.ok(data.includes("publicationDate: '2026-10-21'"), 'original publication date changed');
  assert.ok(data.includes("deadlineDate: '2026-11-20'"), 'unrelated staff deadline changed');
  assert.ok(!data.includes("updatedDate: '2026-11-10'"), 'retroactive publication date');
}
console.log('Postdoctoral regulation 2025: 28 clauses, 11 submission items, bilingual links and historical invariants PASS.');
