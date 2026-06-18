import type {
  DefendedDissertationEntryEn,
  DissertationDegreeEn,
  DissertationSpecialtyEn,
  OriginalLanguage
} from './defendedDissertationsEn';

const candidatePhysical: DissertationDegreeEn = {
  level: 'candidate-of-sciences',
  en: 'Candidate of Physical and Mathematical Sciences',
  fieldEn: 'Physical and Mathematical Sciences'
};

const specialties: Record<string, DissertationSpecialtyEn> = {
  '01.02.04': { code: '01.02.04', en: 'Mechanics of Deformable Solids' }
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
  specialtyCode?: string;
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
    specialty: input.specialtyCode ? specialties[input.specialtyCode] : undefined,
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

export const defendedDissertationsEnShch: DefendedDissertationEntryEn[] = [
  entry({
    id: 'shchuruk-halyna-1986-wave-propagation-cylindrical-orthotropic-shell-viscous-compressible-fluid',
    year: 1986,
    defenceDate: '1986-06-17',
    authorEn: 'Halyna I. Shchuruk',
    sourceLanguage: 'ru',
    titleEn: 'Wave Propagation in a Cylindrical Orthotropic Shell with a Viscous Compressible Fluid',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 17 June 1986. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1986.',
    pages: 126,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['wave propagation', 'cylindrical shells', 'orthotropic shells', 'viscous fluid', 'compressible fluid']
  })
];
