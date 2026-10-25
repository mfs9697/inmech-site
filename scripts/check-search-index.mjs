import { readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const checks = [
  { language: 'uk', file: 'search-index.json', html: 'search/index.html',
    probes: [
      ['Вакансії', (item) => item.url === '/vacancies/'],
      ['Конкурс', (item) => item.type === 'Конкурси'],
      ['Вибори директора', (item) => item.url.includes('/director-election/2026/')],
      ['Силабус OK3', (item) => item.url.includes('/postgraduate/program/syllabi/') && item.title.includes('OK3')],
      ['Документи НКУТПМ', (item) => item.url.includes('/documents/ncutam/')]
    ] },
  { language: 'en', file: 'en/search-index.json', html: 'en/search/index.html',
    probes: [
      ['Vacancies', (item) => item.url === '/en/vacancies/'],
      ['Competition', (item) => item.type === 'Vacancies'],
      ['Director election', (item) => item.url.includes('/en/director-election/2026/')],
      ['Syllabus OK3', (item) => item.url.includes('/postgraduate/program/syllabi/') && item.title.includes('OK3')],
      ['NCUTAM documents', (item) => item.url.includes('/documents/ncutam/')]
    ] }
];

function fail(message) {
  throw new Error('F05: ' + message);
}

function localDestination(url) {
  if (/\.(pdf|docx)$/.test(url)) return path.join(root, url.slice(1));
  return path.join(root, url.slice(1), 'index.html');
}

for (const { language, file, html, probes } of checks) {
  const jsonPath = path.join(root, file);
  if (!existsSync(jsonPath)) fail(file + ' missing');
  const index = JSON.parse(readFileSync(jsonPath, 'utf8'));
  if (!Array.isArray(index) || index.length < 100) fail(file + ' unexpectedly small');
  const keys = new Set();
  let documentCount = 0;
  for (const item of index) {
    if (!item || !['title', 'url', 'type', 'description', 'keywords'].every(
      (key) => typeof item[key] === 'string')) fail(file + ' invalid item');
    if (!/^\/(?!\/)/.test(item.url) || !(item.url.endsWith('/') || /\.(pdf|docx)$/.test(item.url))) {
      fail(file + ': invalid href ' + item.url);
    }
    const key = item.url + '\0' + item.title;
    if (keys.has(key)) fail(file + ' duplicate result ' + key);
    keys.add(key);
    if (!existsSync(localDestination(item.url))) {
      fail(file + ' target missing: ' + item.url);
    }
    if (/\.(pdf|docx)$/.test(item.url)) documentCount += 1;
    if (item.url.includes('committee-protocol-5-extract.pdf')) {
      fail(file + ' indexed missing election original');
    }
  }
  for (const [name, predicate] of probes) {
    if (!index.some(predicate)) fail(language + ' missing target: ' + name);
  }
  const page = readFileSync(path.join(root, html), 'utf8');
  if (!page.includes('data-search-index=') || !page.includes(file)) {
    fail(language + ' page does not point to the separate JSON index');
  }
  if (page.includes('haystack') || page.includes('define:vars') || page.includes('searchItems')) {
    fail(language + ' page still embeds the bulk index');
  }
  if (statSync(path.join(root, html)).size > 25000) {
    fail(language + ' search HTML unexpectedly large');
  }
  console.log('F05 ' + language + ': ' + index.length + ' entries, ' +
    documentCount + ' document metadata entries, JSON ' + statSync(jsonPath).size +
    ' bytes, HTML ' + statSync(path.join(root, html)).size + ' bytes.');
}
