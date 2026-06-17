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
  '01.02.01': { code: '01.02.01', en: 'Theoretical Mechanics' },
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
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';

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

export const defendedDissertationsEnO: DefendedDissertationEntryEn[] = [
  entry({
    id: 'obolensky-anatoly-1981-stability-criteria-solutions-nonlinear-systems',
    year: 1981,
    defenceDate: '1981-01-13',
    authorEn: 'Anatoly Yu. Obolensky',
    sourceLanguage: 'ru',
    titleEn: 'Stability Criteria for Solutions of Some Nonlinear Systems',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 13 January 1981. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1980.',
    pages: 115,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['nonlinear systems', 'stability criteria', 'theoretical mechanics']
  }),
  entry({
    id: 'obukhov-vladimir-1982-deformation-reinforced-plastics-high-temperatures',
    year: 1982,
    authorEn: 'Vladimir V. Obukhov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Deformation Patterns of Reinforced Plastics at High Temperatures',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1982. Candidate dissertation in Technical Sciences. Kyiv, 1982.',
    pages: 173,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['reinforced plastics', 'high temperatures', 'deformation']
  }),
  entry({
    id: 'ovsyannikov-as-1973-plane-elasticity-problem-semi-linear-material',
    year: 1973,
    defenceDate: '1973-04-24',
    authorEn: 'A.S. Ovsyannikov',
    sourceLanguage: 'ru',
    titleEn: 'Solution of the Plane Problem of Elasticity Theory for a Semilinear Material',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 24 April 1973. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1972.',
    pages: 137,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elasticity theory', 'plane problems', 'semilinear material']
  }),
  entry({
    id: 'obiziuk-nataliia-1994-axisymmetric-vibrations-dissipative-heating-layered-electroviscoelastic-bodies-revolution',
    year: 1994,
    defenceDate: '1994-01-25',
    authorEn: 'Nataliia I. Obiziuk',
    sourceLanguage: 'uk',
    titleEn:
      'Axisymmetric Vibrations and Dissipative Heating of Layered Electroviscoelastic Bodies of Revolution',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 January 1994. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1993.',
    pages: 151,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['electroviscoelasticity', 'layered bodies', 'axisymmetric vibrations', 'dissipative heating']
  }),
  entry({
    id: 'ozerov-vi-1967-anisotropic-viscoelasticity-oriented-fiberglass-cylindrical-shells',
    year: 1967,
    defenceDate: '1967-03-21',
    authorEn: 'V.I. Ozerov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Anisotropic Viscoelasticity of Oriented Fiberglass and Cylindrical Shells Made of It',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 21 March 1967. Candidate dissertation in Technical Sciences. Kyiv, 1966.',
    pages: 156,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['anisotropic viscoelasticity', 'oriented fiberglass', 'cylindrical shells']
  }),
  entry({
    id: 'oleynik-alexander-1988-creep-static-cyclic-loading-isochron-method',
    year: 1988,
    defenceDate: '1988-01-26',
    authorEn: 'Alexander S. Oleynik',
    sourceLanguage: 'ru',
    titleEn: 'Development of a Model and Evaluation of Creep under Static and Cyclic Loading by the Isochrone Method',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 January 1988. Candidate dissertation in Technical Sciences. Kyiv, 1987.',
    pages: 144,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['creep', 'cyclic loading', 'isochrone method']
  }),
  entry({
    id: 'ometsinskaya-eb-1970-short-wave-dynamic-processes-cylindrical-shell-carrying-fluid',
    year: 1970,
    defenceDate: '1970-09-22',
    authorEn: 'E.B. Ometsinskaya',
    sourceLanguage: 'ru',
    titleEn: 'Short-Wave Dynamic Processes in a Cylindrical Shell Carrying Fluid',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 22 September 1970. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1970.',
    pages: 144,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['short-wave dynamics', 'cylindrical shells', 'fluid-structure interaction']
  }),
  entry({
    id: 'ocheretniuk-evgeny-2014-rigid-body-string-suspension-variable-parameters-dynamics',
    year: 2014,
    defenceDate: '2014-06-03',
    authorEn: 'Evgeny V. Ocheretniuk',
    sourceLanguage: 'ru',
    titleEn: 'Dynamic Problems of an Absolutely Rigid Body on a String Suspension with Variable Parameters',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 3 June 2014. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2014.',
    pages: 133,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['rigid body dynamics', 'string suspension', 'variable parameters']
  })
];
