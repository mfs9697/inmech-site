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
const instituteConstructionMechanicsAsUkrSsr =
  'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';

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

export const defendedDissertationsEnKh: DefendedDissertationEntryEn[] = [
  entry({
    id: 'khazin-hennadii-2004-mechanical-models-pre-fracture-plane-strain',
    year: 2004,
    defenceDate: '2004-04-27',
    authorEn: 'Hennadii A. Khazin',
    sourceLanguage: 'uk',
    titleEn: 'Investigation of Mechanical Models of the Pre-Fracture Process under Plane-Strain Conditions',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 April 2004. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2003.',
    pages: 147,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['pre-fracture process', 'plane strain', 'mechanical models']
  }),
  entry({
    id: 'khamrenko-yuliia-2001-nonstationary-vibrations-three-layer-shells-revolution-axisymmetric-loads',
    year: 2001,
    defenceDate: '2001-02-27',
    authorEn: 'Yuliia A. Khamrenko',
    sourceLanguage: 'uk',
    titleEn: 'Nonstationary Vibrations of Three-Layer Shells of Revolution under Axisymmetric Loads',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 February 2001. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2001.',
    pages: 216,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['three-layer shells', 'shells of revolution', 'nonstationary vibrations', 'axisymmetric loads']
  }),
  entry({
    id: 'kharytonova-lesia-2010-critical-load-values-flexible-long-shallow-noncircular-cylindrical-shells',
    year: 2010,
    defenceDate: '2010-01-26',
    authorEn: 'Lesia V. Kharytonova',
    sourceLanguage: 'uk',
    titleEn:
      'Determination of Critical Load Values during Deformation of Flexible Long Shallow Noncircular Cylindrical Shells for Different Edge-Fixing Conditions',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 January 2010. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2009.',
    pages: 189,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['critical loads', 'cylindrical shells', 'edge fixing', 'shell deformation']
  }),
  entry({
    id: 'khizhnyak-vladimir-1987-nonlinear-bending-vibrations-flexible-plates-variable-thickness',
    year: 1987,
    defenceDate: '1987-02-17',
    authorEn: 'Vladimir K. Khizhnyak',
    sourceLanguage: 'ru',
    titleEn: 'Nonlinear Problems of Bending and Vibrations of Flexible Plates of Constant and Variable Thickness',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 17 February 1987. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1986.',
    pages: 121,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['flexible plates', 'nonlinear bending', 'vibrations', 'variable thickness']
  }),
  entry({
    id: 'khitrov-vn-1971-stress-strain-shells-ribbed-two-directions',
    year: 1971,
    defenceDate: '1971-12-21',
    authorEn: 'V.N. Khitrov',
    sourceLanguage: 'ru',
    titleEn: 'Stress-Strain State of Shells Reinforced by Ribs in Two Directions',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 21 December 1971. Candidate dissertation in Technical Sciences. Kyiv, 1971.',
    pages: 203,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['ribbed shells', 'stress-strain state', 'two-direction reinforcement']
  }),
  entry({
    id: 'kholopova-vv-1978-nonlinear-vibrations-rigid-bodies-fluid-gravitational-fields',
    year: 1978,
    defenceDate: '1978-01-31',
    authorEn: 'V.V. Kholopova',
    sourceLanguage: 'ru',
    titleEn: 'Nonlinear Vibrations of Rigid Bodies with Fluid in Weak and Strong Gravitational Fields',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 31 January 1978. Candidate dissertation in Technical Sciences. Kyiv, 1977.',
    pages: 156,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['rigid bodies with fluid', 'nonlinear vibrations', 'gravitational fields']
  }),
  entry({
    id: 'khoma-iyu-1964-stress-concentration-holes-shallow-shells-elastoplastic-stage',
    year: 1964,
    defenceDate: '1964-07-07',
    authorEn: 'I.Yu. Khoma',
    sourceLanguage: 'ru',
    titleEn: 'Stress Concentration around Holes in Shallow Shells at the Elastoplastic Stage of Deformation',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 7 July 1964. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1964.',
    pages: 132,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stress concentration', 'holes', 'shallow shells', 'elastoplastic deformation']
  }),
  entry({
    id: 'khoma-yurii-1995-axisymmetric-brittle-fracture-cylindrical-crack-axial-compression',
    year: 1995,
    defenceDate: '1995-12-26',
    authorEn: 'Yurii I. Khoma',
    sourceLanguage: 'uk',
    titleEn:
      'Axisymmetric Problem of Brittle Fracture Mechanics for Materials with a Cylindrical Crack under Axial Compression',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 December 1995. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1995.',
    pages: 138,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['brittle fracture', 'cylindrical crack', 'axial compression', 'axisymmetric problems']
  }),
  entry({
    id: 'khoroshun-anatoly-2008-parametric-stability-quasilinear-mechanical-systems',
    year: 2008,
    defenceDate: '2008-12-09',
    authorEn: 'Anatoly S. Khoroshun',
    sourceLanguage: 'ru',
    titleEn: 'Sufficient Conditions for Parametric Stability of Quasilinear Mechanical Systems',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 9 December 2008. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2008.',
    pages: 130,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['parametric stability', 'quasilinear systems', 'mechanical systems']
  }),
  entry({
    id: 'khoroshun-lp-1963-thermodynamics-mechanics-continuous-media',
    year: 1963,
    authorEn: 'L.P. Khoroshun',
    sourceLanguage: 'ru',
    titleEn: 'Thermodynamics and Some Problems of Continuum Mechanics',
    degree: candidatePhysical,
    bibliographyEn:
      'Defended in 1963; the source defence date is malformed as 23.04.634. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1962.',
    pages: 118,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermodynamics', 'continuum mechanics']
  }),
  entry({
    id: 'khotenko-olena-2014-quadratically-nonlinear-rayleigh-waves',
    year: 2014,
    defenceDate: '2014-03-25',
    authorEn: 'Olena O. Khotenko',
    sourceLanguage: 'uk',
    titleEn: 'On the Theory of Quadratically Nonlinear Rayleigh Waves',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 March 2014. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2014.',
    pages: 191,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['Rayleigh waves', 'nonlinear waves', 'quadratic nonlinearity']
  }),
  entry({
    id: 'khotyaintsev-np-1951-impulse-method-dynamic-processes-mechanical-systems',
    year: 1951,
    defenceDate: '1951-12-25',
    authorEn: 'N.P. Khotyaintsev',
    sourceLanguage: 'ru',
    titleEn: 'Impulse Method for Investigating Dynamic Processes in Mechanical Systems',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 25 December 1951. Candidate dissertation in Technical Sciences. Kyiv, 1951.',
    pages: 191,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['impulse method', 'dynamic processes', 'mechanical systems']
  }),
  entry({
    id: 'khrebet-valery-1993-dynamics-pendulum-multilink-systems-rolling',
    year: 1993,
    authorEn: 'Valery G. Khrebet',
    sourceLanguage: 'ru',
    titleEn: 'Dynamics of Multilink Pendulum Systems with Rolling',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended in 1993. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1993.',
    pages: 130,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['pendulum systems', 'multilink systems', 'rolling dynamics']
  })
];
