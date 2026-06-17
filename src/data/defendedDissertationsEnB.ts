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

const doctorTechnical: DissertationDegreeEn = {
  level: 'doctor-of-sciences',
  en: 'Doctor of Technical Sciences',
  fieldEn: 'Technical Sciences'
};

const specialties: Record<string, DissertationSpecialtyEn> = {
  '01.02.01': { code: '01.02.01', en: 'Theoretical Mechanics' },
  '01.02.04': { code: '01.02.04', en: 'Mechanics of Deformable Solids' },
  '05.02.07': { code: '05.02.07', en: 'Dynamics and Strength of Machines' }
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
  pageUnit?: 'p' | 'leaves';
  placeEn?: string;
  institutionEn?: string;
  tags?: string[];
};

const instituteAssUkrSsr = 'S.P. Timoshenko Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const lowTemperatureInstitute = 'Institute for Low Temperature Physics and Engineering, Academy of Sciences of Ukraine';

function entry(input: EntryInput): DefendedDissertationEntryEn {
  return {
    id: input.id,
    sortLetter: 'B',
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

export const defendedDissertationsEnB: DefendedDissertationEntryEn[] = [
  entry({
    id: 'babaev-artashes-1974-nonstationary-loads-wave-sources',
    year: 1974,
    defenceDate: '1974-10-22',
    authorEn: 'Artashes E. Babaev',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Nonstationary Loads under the Action of Internal Wave Sources',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 22 October 1974. Candidate dissertation. Kyiv, 1974.',
    pages: 124,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['wave mechanics', 'nonstationary loading', 'internal sources']
  }),
  entry({
    id: 'babaev-artashes-1987-nonstationary-waves-reflecting-surfaces',
    year: 1987,
    defenceDate: '1987-12-22',
    authorEn: 'Artashes E. Babaev',
    sourceLanguage: 'ru',
    titleEn: 'Nonstationary Waves in Continuous Media with a System of Reflecting Surfaces',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 22 December 1987. Doctoral dissertation in Technical Sciences, specialty 01.02.04. Kyiv, 1987.',
    pages: 352,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['wave mechanics', 'continuous media', 'reflecting surfaces']
  }),
  entry({
    id: 'babaev-ma-1966-physical-nonlinearity-stress-concentration-openings',
    year: 1966,
    defenceDate: '1966-11-15',
    authorEn: 'M.A. Babaev',
    sourceLanguage: 'ru',
    titleEn: 'Influence of Physical Nonlinearity on Stress Concentration near Free and Reinforced Openings',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 15 November 1966. Candidate dissertation. Kyiv, 1966.',
    pages: 119,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['physical nonlinearity', 'stress concentration', 'openings']
  }),
  entry({
    id: 'babaev-mirbaba-1986-fiber-row-elastic-matrix-stability',
    year: 1986,
    defenceDate: '1986-03-18',
    authorEn: 'Mirbaba Sultan oglu Babaev',
    sourceLanguage: 'ru',
    titleEn: 'Stability of a Row of Fibres in an Elastic Matrix',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 18 March 1986. Candidate dissertation, specialty 01.02.04. Kyiv, 1986.',
    pages: 139,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['stability', 'fibres', 'elastic matrix']
  }),
  entry({
    id: 'babaev-oleksandr-2000-piezoelectric-emitters-cable-path',
    year: 2000,
    defenceDate: '2000-10-31',
    authorEn: 'Oleksandr A. Babaev',
    sourceLanguage: 'uk',
    titleEn: 'Nonstationary Operating Modes of Piezoelectric Emitters Accounting for Processes in the Cable Path',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 31 October 2000. Candidate dissertation, specialty 01.02.04. Kyiv, 2000.',
    pages: 140,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine,
    tags: ['piezoelectric emitters', 'nonstationary processes', 'cable path']
  }),
  entry({
    id: 'babenko-vladimir-1991-local-stability-convex-elastic-shells',
    year: 1991,
    defenceDate: '1991-05-28',
    authorEn: 'Vladimir I. Babenko',
    sourceLanguage: 'ru',
    titleEn: 'Local Stability of Convex Elastic Shells',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 May 1991. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kharkiv, 1991.',
    pages: 407,
    placeEn: 'Kharkiv',
    institutionEn: lowTemperatureInstitute,
    tags: ['local stability', 'elastic shells', 'convex shells']
  }),
  entry({
    id: 'babenko-serhii-2011-continuous-discrete-systems-structural-perturbations',
    year: 2011,
    defenceDate: '2011-12-27',
    authorEn: 'Serhii V. Babenko',
    sourceLanguage: 'ru',
    titleEn: 'Stability of Motion of Continuous-Discrete Large-Scale Mechanical Systems under Structural Perturbations',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 27 December 2011. Candidate dissertation, specialty 01.02.01. Kyiv, 2011.',
    pages: 160,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine,
    tags: ['stability of motion', 'continuous-discrete systems', 'structural perturbations']
  }),
  entry({
    id: 'babeshko-me-1975-thermoplastic-stress-state-short-cylinders',
    year: 1975,
    defenceDate: '1975-09-16',
    authorEn: 'M.E. Babeshko',
    sourceLanguage: 'ru',
    titleEn: 'Thermoplastic Stress State of Short Cylinders Accounting for Loading History',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 16 September 1975. Candidate dissertation. Kyiv, 1975.',
    pages: 170,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['thermoplasticity', 'stress state', 'cylinders']
  }),
  entry({
    id: 'babych-dmytro-1968-dynamic-problems-plates-shells-nonsymmetric-stress',
    year: 1968,
    defenceDate: '1968-04-16',
    authorEn: 'Dmytro V. Babych',
    sourceLanguage: 'ru',
    titleEn: 'Some Dynamic Problems in the Theory of Plates and Shells with a Nonsymmetric Stress Tensor',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 16 April 1968. Candidate dissertation. Kyiv, 1967.',
    pages: 161,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['plates and shells', 'dynamics', 'nonsymmetric stress tensor']
  }),
  entry({
    id: 'babych-dmytro-1996-stability-natural-vibrations-shells-of-revolution',
    year: 1996,
    authorEn: 'Dmytro V. Babych',
    sourceLanguage: 'ru',
    titleEn: 'Stability and Natural Vibrations of Shells of Revolution with Nonhomogeneous Geometric and Mechanical Parameters',
    degree: doctorTechnical,
    specialtyCode: '05.02.07',
    bibliographyEn: 'Defended in 1996. Doctoral dissertation in Technical Sciences, specialty 05.02.07. Kyiv, 1996.',
    pages: 289,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine,
    tags: ['shells of revolution', 'stability', 'natural vibrations']
  }),
  entry({
    id: 'babych-iy-1969-cylindrical-shell-stability-linearized-equations',
    year: 1969,
    defenceDate: '1969-05-06',
    authorEn: 'I.Ya. Babych',
    sourceLanguage: 'ru',
    titleEn: 'Stability Analysis of Cylindrical Shells Using Three-Dimensional Linearized Equations for Small Precritical Deformations',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 6 May 1969. Candidate dissertation. Kyiv, 1969.',
    pages: 150,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['cylindrical shells', 'stability', 'linearized equations']
  }),
  entry({
    id: 'babych-iy-1974-three-dimensional-stability-composites',
    year: 1974,
    defenceDate: '1974-10-08',
    authorEn: 'I.Ya. Babych',
    sourceLanguage: 'ru',
    titleEn: 'Three-Dimensional Stability Problems for Composite Materials and Structural Elements Made of Them',
    degree: doctorPhysical,
    bibliographyEn: 'Defended on 8 October 1974. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1974.',
    pages: 278,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['composites', 'three-dimensional stability', 'structural elements']
  }),
  entry({
    id: 'babych-stepan-1976-surface-waves-prestressed-bodies-curvilinear-boundaries',
    year: 1976,
    defenceDate: '1976-11-30',
    authorEn: 'Stepan Yu. Babych',
    sourceLanguage: 'ru',
    titleEn: 'Propagation of Surface Waves in Prestressed Bodies with Curvilinear Boundaries',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 30 November 1976. Candidate dissertation. Kyiv, 1976.',
    pages: 124,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['surface waves', 'prestressed bodies', 'curvilinear boundaries']
  }),
  entry({
    id: 'babych-stepan-1987-contact-problems-elastic-bodies-initial-stresses',
    year: 1987,
    defenceDate: '1987-10-27',
    authorEn: 'Stepan Yu. Babych',
    sourceLanguage: 'ru',
    titleEn: 'Contact Problems for Elastic Bodies with Initial Stresses',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 October 1987. Doctoral dissertation in Technical Sciences, specialty 01.02.04. Kyiv, 1987.',
    pages: 285,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['contact problems', 'elastic bodies', 'initial stresses']
  }),
  entry({
    id: 'bahno-oleksandr-1980-waves-prestressed-cylinder-fluid',
    year: 1980,
    defenceDate: '1980-12-23',
    authorEn: 'Oleksandr M. Bahno',
    sourceLanguage: 'ru',
    titleEn: 'Propagation Patterns of Waves in a Prestressed Cylinder with Fluid',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 23 December 1980. Candidate dissertation, specialty 01.02.01. Kyiv, 1980.',
    pages: 141,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['wave propagation', 'prestressed cylinder', 'fluid']
  }),
  entry({
    id: 'bahno-oleksandr-1995-elastic-waves-prestressed-bodies-viscous-compressible-fluid',
    year: 1995,
    authorEn: 'Oleksandr M. Bahno',
    sourceLanguage: 'ru',
    titleEn: 'Propagation of Elastic Waves in Prestressed Bodies Interacting with a Viscous Compressible Fluid',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1995. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1995.',
    pages: 438,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine,
    tags: ['elastic waves', 'prestressed bodies', 'viscous compressible fluid']
  }),
  entry({
    id: 'baklanova-halyna-1980-elastoplastic-stability-mine-workings',
    year: 1980,
    defenceDate: '1980-12-23',
    authorEn: 'Halyna M. Baklanova',
    sourceLanguage: 'ru',
    titleEn: 'Elastoplastic Linearized Stability Problems of Mine Workings',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 23 December 1980. Candidate dissertation, specialty 01.02.04. Kyiv, 1980.',
    pages: 105,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['elastoplasticity', 'linearized stability', 'mine workings']
  }),
  entry({
    id: 'bambura-olha-2008-bifurcations-stability-connected-pendulums-follower-force',
    year: 2008,
    defenceDate: '2008-02-26',
    authorEn: 'Olha V. Bambura',
    sourceLanguage: 'uk',
    titleEn: 'Bifurcations and Stability of Equilibrium States of Systems of Serially Connected Pendulums under a Follower Force',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 26 February 2008. Candidate dissertation, specialty 01.02.01. Kyiv, 2007.',
    pages: 138,
    placeEn: 'Kyiv',
    tags: ['bifurcations', 'stability', 'follower force']
  }),
  entry({
    id: 'banyas-myron-2012-nonisothermal-deformation-growing-cylindrical-bodies',
    year: 2012,
    defenceDate: '2012-02-28',
    authorEn: 'Myron V. Banyas',
    sourceLanguage: 'uk',
    titleEn: 'Nonisothermal Deformation of Physically Nonlinear Growing Cylindrical Bodies Accounting for Microstructural Transformations',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 February 2012. Candidate dissertation, specialty 01.02.04. Kyiv, 2011.',
    pages: 120,
    placeEn: 'Kyiv',
    tags: ['nonisothermal deformation', 'growing bodies', 'microstructural transformations']
  }),
  entry({
    id: 'barsuk-rp-1972-longitudinal-vibrations-cylindrical-shells-unilateral-constraints',
    year: 1972,
    defenceDate: '1972-10-31',
    authorEn: 'R.P. Barsuk',
    sourceLanguage: 'ru',
    titleEn: 'Longitudinal Vibrations of a System of Cylindrical Shells Connected by Internal Unilateral Constraints',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 31 October 1972. Candidate dissertation. Kyiv, 1971.',
    pages: 135,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr,
    tags: ['longitudinal vibrations', 'cylindrical shells', 'unilateral constraints']
  })
];
