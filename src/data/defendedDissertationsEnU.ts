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

const doctorPhysical: DissertationDegreeEn = {
  level: 'doctor-of-sciences',
  en: 'Doctor of Physical and Mathematical Sciences',
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

export const defendedDissertationsEnU: DefendedDissertationEntryEn[] = [
  entry({
    id: 'ukrainsky-le-1975-vibrational-stability-solid-particles-suspended-liquids-gases',
    year: 1975,
    defenceDate: '1975-06-24',
    authorEn: 'L.E. Ukrainsky',
    sourceLanguage: 'ru',
    titleEn: 'Vibrational Stability of Solid Particles Suspended in Liquids and Gases',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 24 June 1975. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1975.',
    pages: 141,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['vibrational stability', 'solid particles', 'liquids', 'gases']
  }),
  entry({
    id: 'ulitko-af-1971-eigenvector-functions-spatial-problems-elasticity-theory',
    year: 1971,
    defenceDate: '1971-06-01',
    authorEn: 'A.F. Ulitko',
    sourceLanguage: 'ru',
    titleEn: 'Method of Eigenvector Functions in Spatial Problems of Elasticity Theory',
    degree: doctorPhysical,
    bibliographyEn: 'Defended on 1 June 1971. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1971.',
    pages: 493,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['eigenvector functions', 'spatial problems', 'elasticity theory']
  })
];
