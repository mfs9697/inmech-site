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

const doctorPhysical: DissertationDegreeEn = {
  level: 'doctor-of-sciences',
  en: 'Doctor of Physical and Mathematical Sciences',
  fieldEn: 'Physical and Mathematical Sciences'
};

const candidateTechnical: DissertationDegreeEn = {
  level: 'candidate-of-sciences',
  en: 'Candidate of Technical Sciences',
  fieldEn: 'Technical Sciences'
};

const specialties: Record<string, DissertationSpecialtyEn> = {
  '01.02.04': { code: '01.02.04', en: 'Mechanics of Deformable Solids' },
  '01.02.05': { code: '01.02.05', en: 'Mechanics of Fluids, Gases and Plasma' },
  '05.23.17': { code: '05.23.17', en: 'Structural Mechanics' }
};

type EntryInput = {
  id: string;
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
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsNasUkraineShort = 'Institute of Mechanics, NAS of Ukraine';

function entry(input: EntryInput): DefendedDissertationEntryEn {
  return {
    id: input.id,
    sortLetter: 'Z',
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

export const defendedDissertationsEnZh: DefendedDissertationEntryEn[] = [
  entry({
    id: 'zhemchuzhnikova-irina-1993-stability-multilayer-ribbed-orthotropic-shells-revolution',
    year: 1993,
    defenceDate: '1993-01-26',
    authorEn: 'Irina V. Zhemchuzhnikova',
    sourceLanguage: 'ru',
    titleEn: 'Stability of Multilayer Ribbed Orthotropic Shells of Revolution',
    degree: candidateTechnical,
    specialtyCode: '05.23.17',
    bibliographyEn: 'Defended on 26 January 1993. Candidate dissertation in Technical Sciences. Kyiv, 1992.',
    pages: 98,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['shell stability', 'orthotropic shells', 'ribbed shells', 'structural mechanics']
  }),
  entry({
    id: 'zhirnov-mikhail-1987-nonstationary-interaction-elastic-waves-fluid-filled-shells',
    year: 1987,
    authorEn: 'Mikhail V. Zhirnov',
    sourceLanguage: 'ru',
    titleEn: 'Non-Stationary Interaction of Elastic Waves with Fluid-Filled Shells',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1987. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1987.',
    pages: 159,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['elastic waves', 'fluid-filled shells', 'non-stationary interaction']
  }),
  entry({
    id: 'zhuk-alexander-1974-elastic-waves-layer-initial-stresses',
    year: 1974,
    defenceDate: '1974-09-10',
    authorEn: 'Alexander P. Zhuk',
    sourceLanguage: 'ru',
    titleEn: 'Propagation of Elastic Waves in a Layer with Initial Stresses',
    degree: doctorPhysical,
    bibliographyEn: 'Defended on 10 September 1974. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1974.',
    pages: 154,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastic waves', 'initial stresses', 'wave propagation']
  }),
  entry({
    id: 'zhuk-alexander-1991-solid-particles-compressible-viscous-fluid-sound-field',
    year: 1991,
    defenceDate: '1991-06-20',
    authorEn: 'Alexander P. Zhuk',
    sourceLanguage: 'ru',
    titleEn:
      'Dynamics of Solid Particles in a Compressible Viscous Fluid under the Action of a Sound Field',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 20 June 1991. Doctoral dissertation in Physical and Mathematical Sciences, specialties 01.02.04 and 01.02.05. Kyiv, 1991.',
    pages: 292,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['particle dynamics', 'compressible viscous fluid', 'sound field']
  }),
  entry({
    id: 'zhuk-yaroslav-1994-planetary-vibrations-dissipative-heating-variable-thickness-plates',
    year: 1994,
    authorEn: 'Yaroslav O. Zhuk',
    sourceLanguage: 'ru',
    titleEn:
      'Planetary Vibrations and Dissipative Heating of Variable-Thickness Plates Made of Physically Nonlinear Materials',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1994. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1994.',
    pages: 129,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraineShort,
    tags: ['plate vibrations', 'dissipative heating', 'physically nonlinear materials']
  }),
  entry({
    id: 'zhuk-yaroslav-2002-coupled-thermomechanics-physically-nonlinear-bodies-harmonic-loading',
    year: 2002,
    defenceDate: '2002-10-08',
    authorEn: 'Yaroslav O. Zhuk',
    sourceLanguage: 'uk',
    titleEn:
      'Coupled Problems of Thermomechanics of Physically Nonlinear Bodies under Harmonic Loading in a Single-Frequency Approximation',
    degree: doctorPhysical,
    bibliographyEn: 'Defended on 8 October 2002. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 2002.',
    pages: 370,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraineShort,
    tags: ['coupled thermomechanics', 'physically nonlinear bodies', 'harmonic loading']
  }),
  entry({
    id: 'zhukova-natalia-1989-cubic-nonlinear-theory-initial-postcritical-behavior-composite-shells',
    year: 1989,
    defenceDate: '1989-12-26',
    authorEn: 'Natalia B. Zhukova',
    sourceLanguage: 'ru',
    titleEn:
      'Cubic Version of Nonlinear Theory in Problems of the Initial Postcritical Behaviour of Composite Shells',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 December 1989. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1989.',
    pages: 180,
    placeEn: 'Kyiv',
    institutionEn: 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR',
    tags: ['nonlinear theory', 'postcritical behaviour', 'composite shells']
  }),
  entry({
    id: 'zhuravel-ae-1966-axisymmetric-deformation-conical-structurally-orthotropic-shells',
    year: 1966,
    defenceDate: '1966-05-10',
    authorEn: 'A.E. Zhuravel',
    sourceLanguage: 'ru',
    titleEn: 'Axisymmetric Deformation of Conical Structurally Orthotropic Shells of Revolution',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 10 May 1966. Candidate dissertation in Technical Sciences. Kyiv, 1966.',
    pages: 188,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['axisymmetric deformation', 'conical shells', 'structurally orthotropic shells']
  })
];
