import type { CollectionEntry } from 'astro:content';

// A single news record may be visible in one or both editorial streams.
// The content schema defaults an omitted scopes field to ['institute'].
export type NewsScope = 'institute' | 'ncutam';

type ScopedNews = Pick<CollectionEntry<'news'>, 'data'>;

export function hasNewsScope(entry: ScopedNews, scope: NewsScope): boolean {
  return entry.data.scopes.includes(scope);
}

export function filterNewsByScope<T extends ScopedNews>(entries: T[], scope: NewsScope): T[] {
  return entries.filter((entry) => hasNewsScope(entry, scope));
}
