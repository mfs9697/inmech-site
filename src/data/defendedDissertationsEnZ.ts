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

const doctorTechnical: DissertationDegreeEn = {
  level: 'doctor-of-sciences',
  en: 'Doctor of Technical Sciences',
  fieldEn: 'Technical Sciences'
};

const specialties: Record<string, DissertationSpecialtyEn> = {
  '01.02.01': { code: '01.02.01', en: 'Theoretical Mechanics' },
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

const instituteConstructionMechanicsUkrSsr = 'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsAsUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const kyivStateUniversityConstructionArchitecture = 'Kyiv State University of Construction and Architecture';

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

export const defendedDissertationsEnZ: DefendedDissertationEntryEn[] = [
  entry({
    id: 'zavhorodnii-andrii-2013-thermomechanical-behaviour-three-dimensional-bodies-revolution-inelastic-materials',
    year: 2013,
    defenceDate: '2013-06-25',
    authorEn: 'Andrii V. Zavhorodnii',
    sourceLanguage: 'uk',
    titleEn:
      'Thermomechanical Behaviour of Three-Dimensional Bodies of Revolution Made of Inelastic Materials under Monoharmonic Loading',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 June 2013. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2013.',
    pages: 138,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['thermomechanics', 'bodies of revolution', 'inelastic materials', 'harmonic loading']
  }),
  entry({
    id: 'zavrazhina-tatiana-1995-oscillatory-systems-chaotic-motion-bifurcation-sequences',
    year: 1995,
    authorEn: 'Tatiana V. Zavrazhina',
    sourceLanguage: 'ru',
    titleEn: 'Transitions of Oscillatory Systems to Chaotic Motion through Sequences of Bifurcations',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended in 1995. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1995.',
    pages: 227,
    placeEn: 'Kyiv',
    institutionEn: kyivStateUniversityConstructionArchitecture,
    tags: ['oscillatory systems', 'chaotic motion', 'bifurcations', 'theoretical mechanics']
  }),
  entry({
    id: 'zagavura-fya-1960-thermal-regimes-turning-steel-wear',
    year: 1960,
    defenceDate: '1960-05-10',
    authorEn: 'F.Ya. Zagavura',
    sourceLanguage: 'ru',
    titleEn: 'Influence of Thermal Regimes during Turning on Steel Wear',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 10 May 1960. Candidate dissertation in Technical Sciences. Kyiv, 1959.',
    pages: 214,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['steel wear', 'thermal regimes', 'turning', 'machining']
  }),
  entry({
    id: 'zagorodniy-igor-1982-stability-motion-systems-bodies-potential-force-field',
    year: 1982,
    defenceDate: '1982-04-25',
    authorEn: 'Igor V. Zagorodniy',
    sourceLanguage: 'ru',
    titleEn: 'Stability of Motion of Systems of Bodies in a Potential Force Field',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 25 April 1982. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1981.',
    pages: 152,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['motion stability', 'systems of bodies', 'potential force field', 'theoretical mechanics']
  }),
  entry({
    id: 'zaitsev-gp-1947-ray-diagram-plasticity-metals',
    year: 1947,
    defenceDate: '1947-06-19',
    authorEn: 'G.P. Zaitsev',
    sourceLanguage: 'ru',
    titleEn: 'Ray Diagram of Metal Plasticity',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 19 June 1947. Candidate dissertation in Technical Sciences. Kyiv, 1946.',
    pages: 50,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['plasticity', 'metals', 'plasticity diagram']
  }),
  entry({
    id: 'zarutsky-va-1962-equilibrium-equations-ribbed-cylindrical-shells-solution',
    year: 1962,
    defenceDate: '1962-12-25',
    authorEn: 'V.A. Zarutsky',
    sourceLanguage: 'ru',
    titleEn: 'Equilibrium Equations of Ribbed Cylindrical Shells and Their Solution',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 25 December 1962. Candidate dissertation in Technical Sciences. Kyiv, 1962.',
    pages: 191,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['ribbed shells', 'cylindrical shells', 'equilibrium equations']
  }),
  entry({
    id: 'zarutsky-va-1971-calculation-methods-shells-discrete-rib-arrangement',
    year: 1971,
    defenceDate: '1971-11-23',
    authorEn: 'V.A. Zarutsky',
    sourceLanguage: 'ru',
    titleEn: 'Methods for Calculating Shells with Allowance for Discrete Rib Arrangement',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 23 November 1971. Doctoral dissertation in Technical Sciences. Kyiv, 1971.',
    pages: 423,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['shell calculation', 'ribbed shells', 'discrete ribs']
  }),
  entry({
    id: 'zakon-evgeny-1984-structural-model-medium-complex-nonisothermal-loading-processes',
    year: 1984,
    authorEn: 'Evgeny I. Zakon',
    sourceLanguage: 'ru',
    titleEn:
      'Development of a Structural Model of a Medium for Studying Complex Nonisothermal Loading Processes',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1984. Candidate dissertation in Technical Sciences. Kyiv, 1984.',
    pages: 128,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['structural model', 'nonisothermal loading', 'deformation processes']
  }),
  entry({
    id: 'zakhariychenko-liliana-2000-statics-noncircular-cylindrical-shells-variable-thickness-spline-approximation',
    year: 2000,
    defenceDate: '2000-11-28',
    authorEn: 'Liliana I. Zakhariychenko',
    sourceLanguage: 'ru',
    titleEn:
      'Solution of a Static Problem for Non-Circular Cylindrical Shells of Variable Thickness Based on Spline Approximation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 November 2000. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2000.',
    pages: 238,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['non-circular cylindrical shells', 'variable thickness', 'spline approximation']
  }),
  entry({
    id: 'zakharov-stanislav-1981-plasticity-structural-steels-nonisothermal-two-stage-loading-high-temperatures',
    year: 1981,
    defenceDate: '1981-06-23',
    authorEn: 'Stanislav M. Zakharov',
    sourceLanguage: 'ru',
    titleEn:
      'Study of the Plasticity of Structural Steels under Nonisothermal Two-Stage Loading Processes at Elevated Temperatures',
    degree: candidateTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended on 23 June 1981. Candidate dissertation in Technical Sciences. Kyiv, 1981.',
    pages: 137,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['plasticity', 'structural steels', 'nonisothermal loading', 'elevated temperatures']
  }),
  entry({
    id: 'zelensky-valery-1982-spatial-problems-three-dimensional-elastic-stability-rectangular-plates-nonhomogeneous-precritical-states',
    year: 1982,
    authorEn: 'Valery S. Zelensky',
    sourceLanguage: 'ru',
    titleEn:
      'Spatial Problems of the Three-Dimensional Theory of Elastic Stability of Rectangular Plates under Nonhomogeneous Precritical States',
    degree: candidatePhysical,
    bibliographyEn: 'Defended in 1982. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1982.',
    pages: 133,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastic stability', 'rectangular plates', 'precritical states', 'three-dimensional theory']
  }),
  entry({
    id: 'zinchuk-lyubov-1989-shear-acoustoelectric-waves-regularly-layered-media',
    year: 1989,
    defenceDate: '1989-04-25',
    authorEn: 'Lyubov P. Zinchuk',
    sourceLanguage: 'ru',
    titleEn: 'Propagation of Shear Acoustoelectric Waves in Regularly Layered Media',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 April 1989. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1989.',
    pages: 255,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['acoustoelectric waves', 'shear waves', 'regularly layered media']
  }),
  entry({
    id: 'zozulya-vladimir-1992-dynamic-contact-problems-unilateral-constraints-elastic-bodies-cracks',
    year: 1992,
    authorEn: 'Vladimir V. Zozulya',
    sourceLanguage: 'ru',
    titleEn: 'Dynamic Contact Problems with Unilateral Constraints for Elastic Bodies with Cracks',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1992. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1992.',
    pages: 235,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['dynamic contact problems', 'unilateral constraints', 'elastic bodies with cracks']
  }),
  entry({
    id: 'zolotarev-ruslan-1990-material-thermosensitivity-layered-orthotropic-shells-revolution-nonaxisymmetric-local-heating',
    year: 1990,
    defenceDate: '1990-06-12',
    authorEn: 'Ruslan A. Zolotarev',
    sourceLanguage: 'ru',
    titleEn:
      'Influence of Material Thermosensitivity on the Deformation of Layered Orthotropic Shells of Revolution under Nonaxisymmetric and Local Heating',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 12 June 1990. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1990.',
    pages: 127,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermosensitivity', 'layered orthotropic shells', 'shells of revolution', 'local heating']
  })
];
