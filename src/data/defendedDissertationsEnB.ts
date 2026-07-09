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
const instituteConstructionMechanicsUkrSsr = 'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const nationalTransportUniversity = 'National Transport University';

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
  }),
  entry({
    id: 'bastun-vladimir-1966-elastoplastic-properties-anisotropic-steel-plane-stress',
    year: 1966,
    defenceDate: '1967-07-04',
    authorEn: 'Vladimir N. Bastun',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Elastoplastic Properties of Anisotropic Steel under Plane Stress',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 4 July 1967. Candidate dissertation in Technical Sciences. Kyiv, 1966.',
    pages: 190,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'bastun-vladimir-1989-stress-strain-assessment-structural-elements-deformation-analysis',
    year: 1989,
    defenceDate: '1990-06-26',
    authorEn: 'Vladimir N. Bastun',
    sourceLanguage: 'ru',
    titleEn: 'Assessment of the Stress-Strain State of Structural Elements Based on Material Deformation Analysis',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 June 1990. Doctoral dissertation in Technical Sciences, specialty 01.02.04. Kyiv, 1989.',
    pages: 339,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'bash-vya-1973-deformations-stresses-thermoelectric-method',
    year: 1973,
    defenceDate: '1974-02-26',
    authorEn: 'V.Ya. Bash',
    sourceLanguage: 'ru',
    titleEn: 'Study of Deformations and Stresses by the Thermoelectric Method',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 26 February 1974. Candidate dissertation in Technical Sciences. Kyiv, 1973.',
    pages: 158,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'begmuratov-kudratilla-1993-hierarchical-lyapunov-matrix-functions-stability',
    year: 1993,
    defenceDate: '1993-11-30',
    authorEn: 'Kudratilla A. Begmuratov',
    sourceLanguage: 'ru',
    titleEn: 'Hierarchical Lyapunov Matrix Functions and Their Application in Stability Problems of Dynamical Systems',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 30 November 1993. Candidate dissertation, specialty 01.02.01. Kyiv, 1993.',
    pages: 106,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'bezverkhyi-oleksandr-1992-extended-hydrophysical-systems-elastic-connections',
    year: 1992,
    defenceDate: '1992-04-28',
    authorEn: 'Oleksandr I. Bezverkhyi',
    sourceLanguage: 'ru',
    titleEn: 'Dynamics of Extended Hydrophysical Systems with Elastic Connections',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 April 1992. Candidate dissertation, specialties 01.02.04 and 01.02.05. Kyiv, 1992.',
    pages: 140,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'bezverkhyi-oleksandr-2005-flexible-continuous-discrete-branched-structures',
    year: 2005,
    defenceDate: '2005-11-29',
    authorEn: 'Oleksandr I. Bezverkhyi',
    sourceLanguage: 'uk',
    titleEn: 'Dynamics of Flexible Continuum-Discrete Branched Structures Interacting with the External Environment',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 November 2005. Doctoral dissertation, specialty 01.02.04. Kyiv, 2005.',
    pages: 275,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'belevtsova-natalia-1982-nonaxisymmetric-elastoplastic-shells-loading-history',
    year: 1982,
    authorEn: 'Natalia L. Belevtsova',
    sourceLanguage: 'ru',
    titleEn: 'Nonaxisymmetric Elastoplastic Stress State of Shells of Revolution under Simple Nonisothermal Loading Processes Accounting for Their History',
    degree: candidateTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended in 1982. Candidate dissertation in Technical Sciences, specialty 01.02.03. Kyiv, 1982.',
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'belova-marina-2004-critical-states-thin-elastic-shells-rotation',
    year: 2004,
    defenceDate: '2004-12-21',
    authorEn: 'Marina A. Belova',
    sourceLanguage: 'ru',
    titleEn: 'Critical States of Thin Elastic Shells under Simple and Complex Rotations',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 21 December 2004. Candidate dissertation, specialty 01.02.04. Kyiv, 2004.',
    pages: 182,
    placeEn: 'Kyiv',
    institutionEn: nationalTransportUniversity
  }),
  entry({
    id: 'bergulev-anton-2012-stress-state-rectangular-anisotropic-plates-spatial-formulation',
    year: 2012,
    defenceDate: '2012-09-25',
    authorEn: 'Anton S. Bergulev',
    sourceLanguage: 'ru',
    titleEn: 'Determination of the Stress State of Rectangular Anisotropic Plates in a Spatial Formulation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 September 2012. Candidate dissertation, specialty 01.02.04. Kyiv, 2012.',
    pages: 147,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'bespalova-elena-1969-stress-state-thin-shells-plates-coordinate-line-arcs',
    year: 1969,
    defenceDate: '1969-11-05',
    authorEn: 'Elena I. Bespalova',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Thin Shells and Plates Bounded by Arcs of Coordinate Lines',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 5 November 1969. Candidate dissertation. Kyiv, 1969.',
    pages: 165,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'bespalova-elena-1995-stationary-elasticity-shell-problems-complete-systems',
    year: 1995,
    authorEn: 'Elena I. Bespalova',
    sourceLanguage: 'ru',
    titleEn: 'Solution of Stationary Problems of Elasticity Theory and Shell Theory by the Method of Complete Systems',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1995. Doctoral dissertation, specialty 01.02.04. Kyiv, 1995.',
    pages: 311,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'biryukovich-yul-1962-strength-deformability-glass-cement',
    year: 1962,
    defenceDate: '1963-05-07',
    authorEn: 'Yu.L. Biryukovich',
    sourceLanguage: 'ru',
    titleEn: 'Strength and Deformability of Glass Cement',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 7 May 1963. Candidate dissertation in Technical Sciences. Kyiv, 1962.',
    pages: 183,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'blagoveshchensky-yuv-1996-variable-section-rods-plates-bending-stability-vibrations',
    year: 1996,
    defenceDate: '1996-12-30',
    authorEn: 'Yu.V. Blagoveshchensky',
    sourceLanguage: 'ru',
    titleEn: 'Calculation of Variable-Section Rods and Plates for Bending, Stability and Vibrations',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 30 December 1996. Candidate dissertation in Technical Sciences. Kyiv, 1996.',
    pages: 102,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr
  }),
  entry({
    id: 'bloshko-nikolai-1984-axisymmetric-stress-state-elastic-cylinders-circumferential-grooves',
    year: 1984,
    defenceDate: '1984-05-29',
    authorEn: 'Nikolai M. Bloshko',
    sourceLanguage: 'ru',
    titleEn: 'Axisymmetric Stress State of Finite Elastic Cylinders with Circumferential Grooves',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 May 1984. Candidate dissertation in Technical Sciences, specialty 01.02.04. Kyiv, 1984.',
    pages: 163,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'bobyr-valentin-1988-thermoelastoplastic-bodies-of-revolution-nonaxisymmetric-loading',
    year: 1988,
    defenceDate: '1988-03-29',
    authorEn: 'Valentin I. Bobyr',
    sourceLanguage: 'ru',
    titleEn: 'Thermoelastoplastic State of Bodies of Revolution under Nonaxisymmetric Loading Processes along Low-Curvature Paths',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 March 1988. Candidate dissertation, specialty 01.02.04. Kyiv, 1988.',
    pages: 99,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'bohatyrchuk-anatolii-1990-composite-shells-two-circular-openings',
    year: 1990,
    defenceDate: '1990-12-25',
    authorEn: 'Anatolii S. Bohatyrchuk',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Composite Shells with Two Circular Openings',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 December 1990. Candidate dissertation, specialty 01.02.04. Kyiv, 1990.',
    pages: 100,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'bogdanov-viacheslav-1992-spatial-nonaxisymmetric-fracture-compression-surface-crack',
    year: 1992,
    defenceDate: '1992-09-29',
    authorEn: 'Viacheslav L. Bogdanov',
    sourceLanguage: 'ru',
    titleEn: 'Spatial Nonaxisymmetric Problem of Material Fracture Mechanics under Compression along a Near-Surface Disk-Shaped Crack',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 September 1992. Candidate dissertation, specialty 01.02.04. Kyiv, 1992.',
    pages: 112,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'bogdanov-viacheslav-2008-unified-fracture-problems-initial-stresses-compression-cracks',
    year: 2008,
    defenceDate: '2009-03-17',
    authorEn: 'Viacheslav L. Bogdanov',
    sourceLanguage: 'uk',
    titleEn: 'Unified Analysis of Fracture Mechanics Problems for Materials with Initial Stresses and Fracture of Bodies under Compression along Cracks',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 17 March 2009. Doctoral dissertation, specialty 01.02.04. Kyiv, 2008.',
    pages: 324,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'boichuk-olena-2010-coupled-dynamic-thermomechanics-nonlinear-cylinder',
    year: 2010,
    defenceDate: '2010-04-27',
    authorEn: 'Olena V. Boichuk',
    sourceLanguage: 'uk',
    titleEn: 'Coupled Dynamic Problems of Thermomechanics for a Physically Nonlinear Cylinder under Nonstationary Thermal Loading',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 April 2010. Candidate dissertation, specialty 01.02.04. Kyiv, 2010.',
    pages: 144,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'bolkisev-alexander-1986-forced-vibrations-viscoelastic-piezoceramic-hollow-cylinder',
    year: 1986,
    defenceDate: '1986-06-10',
    authorEn: 'Alexander M. Bolkisev',
    sourceLanguage: 'ru',
    titleEn: 'Forced Vibrations of a Viscoelastic Piezoceramic Hollow Cylinder',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 10 June 1986. Candidate dissertation, specialty 01.02.04. Kyiv, 1986.',
    pages: 138,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'bondarenko-aa-1962-energy-dissipation-mechanical-systems-plastic-elastic-connections',
    year: 1962,
    defenceDate: '1962-11-13',
    authorEn: 'A.A. Bondarenko',
    sourceLanguage: 'ru',
    titleEn: 'Energy Dissipation during Vibrations of Mechanical Systems Containing Plastic Elastic Connections',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 13 November 1962. Candidate dissertation in Technical Sciences. Kyiv, 1962.',
    pages: 154,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'bondarenko-aa-1970-vibration-damping-machine-parts-plastics',
    year: 1970,
    defenceDate: '1970-04-07',
    authorEn: 'A.A. Bondarenko',
    sourceLanguage: 'ru',
    titleEn: 'Damping of Vibrations in Machine Parts Made of Plastics',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 7 April 1970. Candidate dissertation in Technical Sciences. Kyiv, 1970.',
    pages: 176,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'boryseiko-oleksandr-1996-stability-composite-cylindrical-conical-shells-inelastic-components',
    year: 1996,
    defenceDate: '1996-06-11',
    authorEn: 'Oleksandr V. Boryseiko',
    sourceLanguage: 'uk',
    titleEn: 'Stability of Cylindrical and Conical Composite Shells with Inelastic Components',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 11 June 1996. Candidate dissertation, specialty 01.02.04. Kyiv, 1996.',
    pages: 130,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'borysenko-va-1976-coupled-electroelastic-vibrations-piezoceramic-spherical-shells',
    year: 1976,
    defenceDate: '1976-10-19',
    authorEn: 'V.A. Borysenko',
    sourceLanguage: 'ru',
    titleEn: 'Coupled Electroelastic Vibrations of Piezoceramic Spherical Shells',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 19 October 1976. Candidate dissertation. Kyiv, 1976.',
    pages: 166,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'borysenko-vi-1965-dynamic-stability-circular-cylindrical-shell-longitudinal-impact',
    year: 1965,
    defenceDate: '1966-01-25',
    authorEn: 'V.I. Borysenko',
    sourceLanguage: 'ru',
    titleEn: 'Dynamic Stability of a Circular Cylindrical Shell under Longitudinal Impact',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 25 January 1966. Candidate dissertation. Kyiv, 1965.',
    pages: 178,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'borysov-yevhen-2002-three-dimensional-physically-nonlinear-bending-rectangular-plates',
    year: 2002,
    defenceDate: '2003-01-28',
    authorEn: 'Yevhen M. Borysov',
    sourceLanguage: 'uk',
    titleEn: 'Three-Dimensional Physically Nonlinear Problems on Bending of Elastic Rectangular Plates',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 January 2003. Candidate dissertation, specialty 01.02.04. Kyiv, 2002.',
    pages: 136,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'borysiuk-ai-1968-elastoplastic-shells-of-revolution-nonuniform-heating',
    year: 1968,
    defenceDate: '1968-11-19',
    authorEn: 'A.I. Borysiuk',
    sourceLanguage: 'ru',
    titleEn: 'Elastoplastic Stress State of Shells of Revolution under Axisymmetric Nonuniform Heating',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 19 November 1968. Candidate dissertation in Technical Sciences. Kyiv, 1968.',
    pages: 131,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'borodachev-alexander-1981-fracture-problems-body-elliptical-crack',
    year: 1981,
    defenceDate: '1981-12-22',
    authorEn: 'Alexander N. Borodachev',
    sourceLanguage: 'ru',
    titleEn: 'Fracture Mechanics Problems for a Body with a Plane Elliptical Crack under Arbitrary Loading Conditions',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 22 December 1981. Candidate dissertation, specialty 01.02.04. Kyiv, 1981.',
    pages: 133,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'borodenko-yuri-1992-reinforced-elastic-cylinder-shell-rigid-body-imperfect-contact',
    year: 1992,
    authorEn: 'Yuri N. Borodenko',
    sourceLanguage: 'ru',
    titleEn: 'Reinforced-Elastic State of a Cylindrical Shell Interacting with a Rigid Body under Imperfect Contact',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1992. Candidate dissertation, specialty 01.02.04. Kyiv, 1992.',
    pages: 139,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'boruk-ihor-2000-follower-dissipative-elastic-forces-multilink-pendulum',
    year: 2000,
    defenceDate: '2000-05-30',
    authorEn: 'Ihor H. Boruk',
    sourceLanguage: 'uk',
    titleEn: 'Influence of Follower, Dissipative and Elastic Forces on the Dynamic Behaviour of a Multilink Pendulum',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 30 May 2000. Candidate dissertation, specialty 01.02.01. Kyiv, 2000.',
    pages: 182,
    placeEn: 'Kyiv',
    institutionEn: instituteNasUkraine
  }),
  entry({
    id: 'borshch-yuri-1981-boundary-value-problems-plane-elasticity-sectorial-bodies',
    year: 1981,
    authorEn: 'Yuri A. Borshch',
    sourceLanguage: 'ru',
    titleEn: 'Boundary-Value Problems of Plane Elasticity Theory for Sectorial Bodies',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1981. Candidate dissertation, specialty 01.02.04. Kyiv, 1981.',
    pages: 261,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'boyarshina-liubov-1982-nonlinear-spatial-vibrations-controlled-bodies-fluid-resonances',
    year: 1982,
    authorEn: 'Liubov G. Boyarshina',
    sourceLanguage: 'ru',
    titleEn: 'Nonlinear Spatial Vibrations of Controlled Bodies with Fluid under Resonance Conditions',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended in 1982. Candidate dissertation, specialty 01.02.01. Kyiv, 1982.',
    pages: 140,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'braikovskaya-nadezhda-1986-inelastic-deformation-metals-nonisothermal-loading-paths',
    year: 1986,
    defenceDate: '1986-12-30',
    authorEn: 'Nadezhda S. Braikovskaya',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Inelastic Deformation Patterns of Metals under Nonisothermal Active Loading Processes along Arbitrary Plane Paths',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 30 December 1986. Candidate dissertation in Technical Sciences, specialty 01.02.04. Kyiv, 1986.',
    pages: 153,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  }),
  entry({
    id: 'bykhovets-olga-1983-stress-state-noncircular-cylindrical-shells-refined-formulation',
    year: 1983,
    defenceDate: '1983-11-15',
    authorEn: 'Olga N. Bykhovets',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Noncircular Cylindrical Shells in a Refined Formulation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 15 November 1983. Candidate dissertation, specialty 01.02.04. Kyiv, 1983.',
    pages: 142,
    placeEn: 'Kyiv',
    institutionEn: instituteAssUkrSsr
  })
];
