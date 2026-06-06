import { bibliography } from './bibliography';
import { bibliographyModernAdditions } from './bibliographyModernAdditions';
import { bibliographyTextbookAdditions } from './bibliographyTextbookAdditions';
import { bibliographyLegacyCollections } from './bibliographyLegacyCollections';
import { bibliographyLibraryAtoB } from './bibliographyLibraryAtoB';
import { bibliographyLibraryV } from './bibliographyLibraryV';
import { bibliographyLibraryG1 } from './bibliographyLibraryG1';
import { bibliographyLibraryG2 } from './bibliographyLibraryG2';
import { bibliographyLibraryD } from './bibliographyLibraryD';

export const bibliographyAll = [
  ...bibliography,
  ...bibliographyModernAdditions,
  ...bibliographyTextbookAdditions,
  ...bibliographyLegacyCollections,
  ...bibliographyLibraryAtoB,
  ...bibliographyLibraryV,
  ...bibliographyLibraryG1,
  ...bibliographyLibraryG2,
  ...bibliographyLibraryD
] as const;

export const bibliographyYears = [...new Set(bibliographyAll.map((item) => item.year).filter((year): year is number => typeof year === 'number'))].sort((a, b) => b - a);
export const bibliographyUsedTags = [...new Set(bibliographyAll.flatMap((item) => item.tags))].sort();
export const bibliographyLibraryOfCongressCount = bibliographyAll.filter((item) => item.inLibraryOfCongress).length;
