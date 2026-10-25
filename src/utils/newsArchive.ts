import type { CollectionEntry } from 'astro:content';
import { hasNewsScope } from './newsScopes.ts';

type NewsEntry = CollectionEntry<'news'>;

/** Only Institute-visible entries belong in the Institute news archive. */
export function getInstituteNews<T extends NewsEntry>(entries: T[]): T[] {
  return entries
    .filter((entry) => hasNewsScope(entry, 'institute'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Years come from real Institute news records, never from the build clock. */
export function getInstituteNewsYears(entries: NewsEntry[]): number[] {
  return [...new Set(getInstituteNews(entries).map((entry) => entry.data.year))]
    .sort((a, b) => b - a);
}

export function getInstituteNewsByYear<T extends NewsEntry>(entries: T[], year: number): T[] {
  return getInstituteNews(entries).filter((entry) => entry.data.year === year);
}
