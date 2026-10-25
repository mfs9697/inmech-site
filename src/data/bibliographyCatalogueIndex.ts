import { bibliographyAll, bibliographyUsedTags } from './bibliographyAll';
import { catalogueLetterSlug } from './defendedCatalogueLetters';

export function bibliographyInitial(authors: string): string {
  const normalized = authors
    .replace(/^За заг\. ред\.\s*/i, '')
    .replace(/^За ред\.\s*/i, '')
    .replace(/^Под общ\. ред\.\s*/i, '')
    .trim();
  return normalized.charAt(0).toUpperCase() || '#';
}

export const bibliographyLetters = [...new Set(bibliographyAll.map((entry) => bibliographyInitial(entry.authors)))]
  .sort((a, b) => a.localeCompare(b, 'uk'));

export const bibliographyTopicTags = bibliographyUsedTags;
export { catalogueLetterSlug };
