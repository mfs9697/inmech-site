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

const candidateTechnical: DissertationDegreeEn = {
  level: 'candidate-of-sciences',
  en: 'Candidate of Technical Sciences',
  fieldEn: 'Technical Sciences'
};

const doctorTechnical: DissertationDegreeEn = {
  level: 'doctor-of-sciences',
  en: 'Doctor of Technical Sciences',
  fieldEn: 'Technical Sciences'
};

const specialties: Record<string, DissertationSpecialtyEn> = {
  '01.02.03': { code: '01.02.03', en: 'Specialty 01.02.03' },
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

export const defendedDissertationsEnD3: DefendedDissertationEntryEn[] = [
  entry({
    id: 'dushek-yuri-1986-elasticity-fibrous-composites-local-microcracks',
    year: 1986,
    authorEn: 'Yuri Ya. Dushek',
    sourceLanguage: 'ru',
    titleEn: 'Elasticity of Fibrous Composite Materials with Local Microcracks',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended in 1986. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1986.',
    pages: 156,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fibrous composites', 'local microcracks', 'elasticity', 'composite materials']
  }),
  entry({
    id: 'dyshel-marx-1979-stability-fracture-plates-cracks-tension',
    year: 1979,
    authorEn: 'Marx Sh. Dyshel',
    sourceLanguage: 'ru',
    titleEn: 'Stability and Fracture of Plates with Cracks under Tension',
    degree: candidateTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended in 1979. Candidate dissertation in Technical Sciences. Kyiv, 1979.',
    pages: 139,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['plates with cracks', 'stability', 'fracture', 'tension']
  }),
  entry({
    id: 'dyshel-marx-1990-fracture-stability-plates-shells-cracks-tension',
    year: 1990,
    authorEn: 'Marx Sh. Dyshel',
    sourceLanguage: 'ru',
    titleEn: 'Fracture and Stability of Plates and Shells with Cracks under Tension',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1990. Doctoral dissertation in Technical Sciences. Kyiv, 1990.',
    pages: 365,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['plates and shells', 'cracks', 'fracture', 'stability', 'tension']
  }),
  entry({
    id: 'dyachenko-mp-1972-vibrations-heavy-symmetric-top-cavity-fluid',
    year: 1972,
    defenceDate: '1972-11-21',
    authorEn: 'M.P. Dyachenko',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations of a Heavy Symmetric Top with a Cavity Partially Filled with Fluid',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 21 November 1972. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1972.',
    pages: 161,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['symmetric top', 'fluid-filled cavity', 'vibrations', 'rigid body dynamics']
  })
];
