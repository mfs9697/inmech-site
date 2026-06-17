import type {
  DefendedDissertationEntryEn,
  DissertationDegreeEn,
  OriginalLanguage
} from './defendedDissertationsEn';

const candidatePhysical: DissertationDegreeEn = {
  level: 'candidate-of-sciences',
  en: 'Candidate of Physical and Mathematical Sciences',
  fieldEn: 'Physical and Mathematical Sciences'
};

type EntryInput = {
  id: string;
  sortLetter?: string;
  year: number;
  defenceDate?: string;
  authorEn: string;
  sourceLanguage: OriginalLanguage;
  titleEn: string;
  degree: DissertationDegreeEn;
  bibliographyEn: string;
  pages?: number;
  placeEn?: string;
  institutionEn?: string;
  tags?: string[];
};

const instituteMechanicsAsUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';

function entry(input: EntryInput): DefendedDissertationEntryEn {
  return {
    id: input.id,
    sortLetter: input.sortLetter ?? input.authorEn.charAt(0).toUpperCase(),
    year: input.year,
    defenceDate: input.defenceDate,
    author: { en: input.authorEn },
    title: {
      en: input.titleEn,
      originalLanguage: input.sourceLanguage,
      originalNoteEn: `Original catalogue entry [${input.sourceLanguage === 'uk' ? 'in Ukrainian' : 'in Russian'}]`
    },
    degree: input.degree,
    bibliography: {
      en: input.bibliographyEn,
      originalLanguage: input.sourceLanguage,
      pages: input.pages,
      placeEn: input.placeEn,
      institutionEn: input.institutionEn
    },
    tags: input.tags
  };
}

export const defendedDissertationsEnEe: DefendedDissertationEntryEn[] = [
  entry({
    id: 'etokov-vi-1977-stability-imperfect-cylindrical-shells-geometrical-approach',
    sortLetter: 'E',
    year: 1977,
    defenceDate: '1977-10-04',
    authorEn: 'V.I. Etokov',
    sourceLanguage: 'ru',
    titleEn: 'Stability of Imperfect Cylindrical Shells Based on a Geometrical Approach',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 4 October 1977. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1977.',
    pages: 188,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['cylindrical shells', 'stability', 'imperfections', 'geometrical approach']
  })
];
