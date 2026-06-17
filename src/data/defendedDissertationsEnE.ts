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

const specialties: Record<string, DissertationSpecialtyEn> = {
  '01.02.03': { code: '01.02.03', en: 'Structural Mechanics' },
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

export const defendedDissertationsEnE: DefendedDissertationEntryEn[] = [
  entry({
    id: 'evseychik-yurii-1988-vibrations-layered-piezoceramic-shells-thickness-polarization',
    year: 1988,
    defenceDate: '1988-01-26',
    authorEn: 'Yurii B. Evseychik',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations of Layered Piezoceramic Shells with Thickness Polarization',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 January 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1988.',
    pages: 114,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['piezoceramic shells', 'layered shells', 'vibrations', 'thickness polarization']
  }),
  entry({
    id: 'emelyanenko-viktor-1983-deformation-truncated-spherical-conjugated-shells',
    year: 1983,
    defenceDate: '1983-09-06',
    authorEn: 'Viktor V. Emelyanenko',
    sourceLanguage: 'ru',
    titleEn: 'Deformation of Truncated Spherical and Conjugated Shells',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 6 September 1983. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1983.',
    pages: 110,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['spherical shells', 'conjugated shells', 'deformation']
  }),
  entry({
    id: 'emelyanov-igor-1988-contact-interaction-stress-state-two-cylindrical-shells',
    year: 1988,
    defenceDate: '1988-01-26',
    authorEn: 'Igor G. Emelyanov',
    sourceLanguage: 'ru',
    titleEn: 'Solution of the Problem of Contact Interaction and Stress State of Two Cylindrical Shells',
    degree: candidateTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended on 26 January 1988. Candidate dissertation in Technical Sciences. Kyiv, 1987.',
    pages: 139,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['contact interaction', 'stress state', 'cylindrical shells']
  }),
  entry({
    id: 'emelyanov-rf-1973-stability-cylindrical-shells-oriented-fiberglass-axial-compression',
    year: 1973,
    defenceDate: '1973-06-26',
    authorEn: 'R.F. Emelyanov',
    sourceLanguage: 'ru',
    titleEn:
      'Stability of Cylindrical Shells Made of Oriented Fiberglass under Short-Term and Long-Term Axial Compression',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 26 June 1973. Candidate dissertation in Technical Sciences. Kyiv, 1973.',
    pages: 161,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['cylindrical shells', 'oriented fiberglass', 'stability', 'axial compression']
  }),
  entry({
    id: 'efimova-tatiana-1987-vibrations-waves-anisotropic-thickness-inhomogeneous-cylinders-spheres',
    year: 1987,
    defenceDate: '1987-01-27',
    authorEn: 'Tatiana L. Efimova',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations and Waves in Anisotropic Cylinders and Spheres Inhomogeneous through the Thickness',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 January 1987. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1986.',
    pages: 112,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['vibrations', 'waves', 'anisotropy', 'inhomogeneous cylinders', 'spheres']
  })
];
