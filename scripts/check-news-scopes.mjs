import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { filterNewsByScope, hasNewsScope } from '../src/utils/newsScopes.ts';

// Regression fixtures: default Institute, Committee-only, and shared publication.
const fixtures = [
  { id: 'institute', data: { scopes: ['institute'] } },
  { id: 'committee', data: { scopes: ['ncutam'] } },
  { id: 'shared', data: { scopes: ['institute', 'ncutam'] } }
];
function assert(condition, message) {
  if (!condition) throw new Error('F08: ' + message);
}
function ids(items) { return items.map((entry) => entry.id).join(','); }
assert(ids(filterNewsByScope(fixtures, 'institute')) === 'institute,shared',
  'Institute scope fixture must exclude Committee-only items but retain shared items');
assert(ids(filterNewsByScope(fixtures, 'ncutam')) === 'committee,shared',
  'NCUTAM scope fixture must include Committee-only and shared items');
assert(!hasNewsScope(fixtures[0], 'ncutam'), 'Institute-only fixture leaked into NCUTAM');
assert(hasNewsScope(fixtures[2], 'ncutam') && hasNewsScope(fixtures[2], 'institute'),
  'Shared fixture must be present in both editorial feeds');

const srcRoot = path.resolve('src/content/news/2026');
const ncutamOnly = readFileSync(path.join(srcRoot, '2026-10-19-ncutam-mechanics-analytical-note.md'), 'utf8');
const shared = readFileSync(path.join(srcRoot, '2026-03-19-iutam-committee.md'), 'utf8');
assert(/scopes:\s*\["ncutam"\]/.test(ncutamOnly), 'NCUTAM-only source scope changed; review editorial policy');
assert(/scopes:\s*\["institute",\s*"ncutam"\]/.test(shared), 'Shared IUTAM scope changed; review editorial policy');
const caseTitles = [
  {
    name: 'uk',
    note: 'НКУТПМ підготував аналітичну записку про стан і перспективи досліджень у галузі механіки',
    shared: 'Представника України обрано до комітету IUTAM',
    prefix: ''
  },
  {
    name: 'en',
    note: 'NCUTAM analytical note on the current state and future of mechanics research',
    shared: 'Representative of Ukraine elected to an IUTAM committee',
    prefix: 'en/'
  }
];

function getPage(file) {
  const name = path.join('dist', file);
  assert(existsSync(name), 'generated page missing: ' + file);
  return readFileSync(name, 'utf8');
}
function htmlFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(full) : entry.isFile() && entry.name.endsWith('.html') ? [full] : [];
  });
}

for (const { name, note, shared: sharedTitle, prefix } of caseTitles) {
  const homepage = getPage(prefix + 'index.html');
  const instituteNews = getPage(prefix + 'news/index.html');
  const committeeNews = getPage(prefix + 'ncutam/news/index.html');
  const detail = getPage(prefix + 'news/2026/2026-10-19-ncutam-mechanics-analytical-note/index.html');

  assert(!homepage.includes(note), name + ': NCUTAM-only note leaked into Institute homepage');
  assert(!instituteNews.includes(note), name + ': NCUTAM-only note leaked into Institute news index');
  assert(committeeNews.includes(note), name + ': NCUTAM-only note absent from Committee feed');
  assert(committeeNews.includes(sharedTitle), name + ': shared IUTAM item absent from Committee feed');
  assert(detail.includes(note), name + ': canonical detail page is not accessible');
  // News-index year gating belongs to F09; only test the 2026 news index while it is current.
  if (new Date().getFullYear() === 2026) {
    assert(instituteNews.includes(sharedTitle), name + ': shared IUTAM item absent from Institute news index');
  }
  const tagPages = htmlFiles(path.join('dist', prefix, 'news', 'tags'));
  for (const file of tagPages) {
    assert(!readFileSync(file, 'utf8').includes(note),
      name + ': NCUTAM-only note leaked into Institute tag page ' + file);
  }
  console.log('F08 ' + name + ': homepage, Institute news, ' + tagPages.length +
    ' tag page(s), NCUTAM feed and canonical detail verified.');
}
