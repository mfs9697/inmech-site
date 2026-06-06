import { bibliography } from './bibliography';
import { bibliographyModernAdditions } from './bibliographyModernAdditions';
import { bibliographyTextbookAdditions } from './bibliographyTextbookAdditions';
import { bibliographyLegacyCollections } from './bibliographyLegacyCollections';
import { bibliographyLibraryAtoB } from './bibliographyLibraryAtoB';
import { bibliographyLibraryV } from './bibliographyLibraryV';
import { bibliographyLibraryG1 } from './bibliographyLibraryG1';
import { bibliographyLibraryG2 } from './bibliographyLibraryG2';
import { bibliographyLibraryD } from './bibliographyLibraryD';
import { bibliographyLibraryEYeZhZ } from './bibliographyLibraryEYeZhZ';
import { bibliographyLibraryII } from './bibliographyLibraryII';
import { bibliographyLibraryK1 } from './bibliographyLibraryK1';
import { bibliographyLibraryK2 } from './bibliographyLibraryK2';
import { bibliographyLibraryK3 } from './bibliographyLibraryK3';

export const bibliographyAll = [
  ...bibliography,
  ...bibliographyModernAdditions,
  ...bibliographyTextbookAdditions,
  ...bibliographyLegacyCollections,
  ...bibliographyLibraryAtoB,
  ...bibliographyLibraryV,
  ...bibliographyLibraryG1,
  ...bibliographyLibraryG2,
  ...bibliographyLibraryD,
  ...bibliographyLibraryEYeZhZ,
  ...bibliographyLibraryII,
  ...bibliographyLibraryK1,
  ...bibliographyLibraryK2,
  ...bibliographyLibraryK3
] as const;

export const bibliographyYears = [...new Set(bibliographyAll.map((item) => item.year).filter((year): year is number => typeof year === 'number'))].sort((a, b) => b - a);
export const bibliographyUsedTags = [...new Set(bibliographyAll.flatMap((item) => item.tags))].sort();
export const bibliographyLibraryOfCongressCount = bibliographyAll.filter((item) => item.inLibraryOfCongress).length;
