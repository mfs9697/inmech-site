import { bibliographyAll } from './bibliographyAll';
import type { BibliographyEntry } from './bibliography';

export function normalizeBookAuthor(authors: string) {
  return authors
    .replace(/^За заг\. ред\.\s*/i, '')
    .replace(/^За ред\.\s*/i, '')
    .replace(/^Под общ\. ред\.\s*/i, '')
    .trim();
}

export function bookAuthorInitial(authors: string) {
  return normalizeBookAuthor(authors).charAt(0).toUpperCase() || '#';
}

export function bookLetterCode(letter: string) {
  // ASCII-only paths avoid Unicode routing inconsistencies across servers.
  return 'u' + letter.codePointAt(0)!.toString(16).padStart(4, '0');
}

const sorted = [...bibliographyAll].sort((a, b) =>
  normalizeBookAuthor(a.authors).localeCompare(normalizeBookAuthor(b.authors), 'uk') ||
  a.title.localeCompare(b.title, 'uk')
);

export const scientificBookGroups = [...sorted.reduce((map, entry) => {
  const letter = bookAuthorInitial(entry.authors);
  if (!map.has(letter)) map.set(letter, []);
  map.get(letter)!.push(entry);
  return map;
}, new Map<string, BibliographyEntry[]>())]
  .map(([letter, items]) => ({ letter, code: bookLetterCode(letter), items }));

export const scientificBookTagCounts = scientificBookGroups.map(({ code, letter, items }) => {
  const tags: Record<string, number> = {};
  for (const item of items) {
    for (const tag of item.tags) tags[tag] = (tags[tag] ?? 0) + 1;
  }
  return { code, letter, count: items.length, tags };
});
