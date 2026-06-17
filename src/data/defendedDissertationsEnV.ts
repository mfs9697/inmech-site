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
  '01.02.04': { code: '01.02.04', en: 'Mechanics of Deformable Solids' }
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

const instituteBuildingMechanicsAssUkrSsr = 'Institute of Structural Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsAssUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const kyivPolytechnic = 'Kyiv Polytechnic Institute';
const kgtuConstructionArchitecture = 'Kyiv State Technical University of Construction and Architecture';
const kyivEngineeringConstructionInstitute = 'Kyiv Engineering and Construction Institute';
const tarasShevchenkoUniversity = 'Taras Shevchenko Kyiv State University';

function entry(input: EntryInput): DefendedDissertationEntryEn {
  return {
    id: input.id,
    sortLetter: 'V',
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

export const defendedDissertationsEnV: DefendedDissertationEntryEn[] = [
  entry({
    id: 'vainbert-dv-1990-elasticity-methods-machine-structures-composite-bodies',
    year: 1990,
    defenceDate: '1990-02-02',
    authorEn: 'D.V. Vainbert',
    sourceLanguage: 'ru',
    titleEn:
      'Development of Elasticity-Theory Methods for Calculating Machine and Structural Components: The Generalized Biharmonic Problem for Composite Bodies',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 2 February 1990. Doctoral dissertation in Technical Sciences. Kyiv, 1990.',
    pages: 505,
    placeEn: 'Kyiv',
    institutionEn: instituteBuildingMechanicsAssUkrSsr,
    tags: ['elasticity theory', 'machine components', 'composite bodies']
  }),
  entry({
    id: 'valeeva-irina-1993-optimal-control-orientation-rigid-bodies-central-field',
    year: 1993,
    authorEn: 'Irina K. Valeeva',
    sourceLanguage: 'ru',
    titleEn: 'Optimal Control of the Orientation of a System of Rigid Bodies in a Central Field',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn:
      'Defended in 1993. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.01. Kyiv, 1993.',
    pages: 166,
    placeEn: 'Kyiv',
    institutionEn: kgtuConstructionArchitecture,
    tags: ['theoretical mechanics', 'optimal control', 'rigid bodies']
  }),
  entry({
    id: 'van-fo-fy-ga-1959-mathieu-functions-delta-function-plates-shells',
    year: 1959,
    defenceDate: '1959-12-22',
    authorEn: 'G.A. Van Fo Fy',
    sourceLanguage: 'ru',
    titleEn: 'Application of Mathieu Functions and the Delta Function to the Study of Plates and Shells',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 22 December 1959. Candidate dissertation in Technical Sciences. Kyiv, 1959.',
    pages: 157,
    placeEn: 'Kyiv',
    institutionEn: instituteBuildingMechanicsAssUkrSsr,
    tags: ['plates', 'shells', 'Mathieu functions']
  }),
  entry({
    id: 'van-fo-fy-ga-1966-polymer-bodies-oriented-structure',
    year: 1966,
    defenceDate: '1966-01-04',
    authorEn: 'G.A. Van Fo Fy',
    sourceLanguage: 'ru',
    titleEn: 'Foundations of the Theory of Polymer Bodies with an Oriented Structure',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 4 January 1966. Doctoral dissertation in Technical Sciences. Kyiv, 1965.',
    pages: 235,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['polymer mechanics', 'oriented structure', 'material models']
  }),
  entry({
    id: 'varvak-ap-1968-stability-cylindrical-shells-filler',
    year: 1968,
    defenceDate: '1968-09-24',
    authorEn: 'A.P. Varvak',
    sourceLanguage: 'ru',
    titleEn: 'Stability of Cylindrical Shells with Filler',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 24 September 1968. Candidate dissertation in Technical Sciences. Kyiv, 1968.',
    pages: 140,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['shell stability', 'cylindrical shells', 'filler']
  }),
  entry({
    id: 'varvak-pm-1948-plates-grid-method',
    year: 1948,
    defenceDate: '1948-06-30',
    authorEn: 'P.M. Varvak',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Plates by the Grid Method',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 30 June 1948. Doctoral dissertation in Technical Sciences. Kyiv, 1948.',
    pages: 397,
    placeEn: 'Kyiv',
    institutionEn: instituteBuildingMechanicsAssUkrSsr,
    tags: ['plates', 'grid method', 'structural mechanics']
  }),
  entry({
    id: 'vasylenko-at-1967-shells-revolution-antisymmetric-loading',
    year: 1967,
    authorEn: 'A.T. Vasylenko',
    sourceLanguage: 'ru',
    titleEn:
      'Stress State of Isotropic and Anisotropic Shells of Revolution under Antisymmetric Loading',
    degree: candidatePhysical,
    bibliographyEn:
      'Candidate dissertation in Physical and Mathematical Sciences. The source states the defence date as 07.05.48; Kyiv, 1967.',
    pages: 180,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['shells of revolution', 'anisotropic shells', 'antisymmetric loading']
  }),
  entry({
    id: 'vasylenko-at-1978-anisotropic-multilayer-shells-variable-parameters',
    year: 1978,
    defenceDate: '1978-12-05',
    authorEn: 'A.T. Vasylenko',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Anisotropic Multilayer Shells with Variable Structural Parameters',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 5 December 1978. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1978.',
    pages: 446,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['anisotropic shells', 'multilayer structures', 'variable parameters']
  }),
  entry({
    id: 'vasylenko-nv-1973-nonlinear-hysteresis-deformable-body-mechanics',
    year: 1973,
    defenceDate: '1973-10-02',
    authorEn: 'N.V. Vasylenko',
    sourceLanguage: 'ru',
    titleEn: 'A Nonlinear-Hysteresis Problem in the Mechanics of Deformable Bodies',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 2 October 1973. Doctoral dissertation in Technical Sciences. Kyiv, 1973.',
    pages: 327,
    placeEn: 'Kyiv',
    institutionEn: kyivPolytechnic,
    tags: ['deformable bodies', 'hysteresis', 'nonlinear mechanics']
  }),
  entry({
    id: 'vasilyev-alexander-1989-optimal-rendezvous-material-points-force-field',
    year: 1989,
    defenceDate: '1989-10-31',
    authorEn: 'Alexander B. Vasilyev',
    sourceLanguage: 'ru',
    titleEn:
      'Optimal Rendezvous of Material Points in a Force Field for Trajectories Passing Near an Attracting Centre',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn:
      'Defended on 31 October 1989. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.01. Kyiv, 1988.',
    pages: 185,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['theoretical mechanics', 'optimal trajectories', 'force fields']
  }),
  entry({
    id: 'vasyliev-ihor-1998-optimization-long-duration-manned-spaceflights',
    year: 1998,
    defenceDate: '1998-12-30',
    authorEn: 'Ihor Yu. Vasyliev',
    sourceLanguage: 'uk',
    titleEn: 'Optimization Problems of Long-Duration Manned Spaceflights',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn:
      'Defended on 30 December 1998. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.01. Kyiv, 1998.',
    pages: 157,
    placeEn: 'Kyiv',
    institutionEn: `${instituteMechanicsNasUkraine}; ${tarasShevchenkoUniversity}`,
    tags: ['spaceflight optimization', 'theoretical mechanics', 'long-duration missions']
  }),
  entry({
    id: 'vasylieva-larysa-2012-coupled-thermomechanical-processes-cylindrical-bodies',
    year: 2012,
    defenceDate: '2012-09-25',
    authorEn: 'Larysa Ya. Vasylieva',
    sourceLanguage: 'uk',
    titleEn:
      'Coupled Thermomechanical Processes and Structural Transformations in Physically Nonlinear Cylindrical Bodies under Axisymmetric Pulsed Thermal Loading',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 25 September 2012. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2012.',
    pages: 146,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['thermomechanics', 'structural transformations', 'nonlinear cylindrical bodies']
  }),
  entry({
    id: 'vasilyeva-anna-1990-chaotization-oscillations-nonlinear-mechanical-systems',
    year: 1990,
    defenceDate: '1990-12-18',
    authorEn: 'Anna L. Vasilyeva',
    sourceLanguage: 'ru',
    titleEn:
      'Chaotization of Oscillations in Nonlinear Mechanical Systems through a Sequence of Bifurcations',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn:
      'Defended on 18 December 1990. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.01. Kyiv, 1990.',
    pages: 210,
    placeEn: 'Kyiv',
    institutionEn: kyivEngineeringConstructionInstitute,
    tags: ['nonlinear oscillations', 'chaos', 'bifurcations']
  }),
  entry({
    id: 'verbitsky-volodymyr-1984-attraction-domains-wheeled-vehicles',
    year: 1984,
    defenceDate: '1984-05-22',
    authorEn: 'Volodymyr G. Verbitsky',
    sourceLanguage: 'ru',
    titleEn:
      'Structure and Estimates of Attraction Domains for Dynamic Systems Modelling Wheeled Vehicles',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn:
      'Defended on 22 May 1984. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.01. Kyiv, 1984.',
    pages: 150,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['vehicle dynamics', 'attraction domains', 'dynamic systems']
  }),
  entry({
    id: 'verbitsky-volodymyr-1998-nonlinear-stability-multilink-rolling-systems',
    year: 1998,
    defenceDate: '1998-12-29',
    authorEn: 'Volodymyr G. Verbitsky',
    sourceLanguage: 'ru',
    titleEn:
      'Nonlinear Stability of Multilink Systems with Rolling, Divergent Bifurcations, and Catastrophes of Stationary States',
    degree: doctorPhysical,
    specialtyCode: '01.02.01',
    bibliographyEn:
      'Defended on 29 December 1998. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.01. Kyiv, 1998.',
    pages: 252,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['nonlinear stability', 'rolling systems', 'bifurcations']
  }),
  entry({
    id: 'vlaikov-gg-1977-thick-walled-orthotropic-shells-revolution',
    year: 1977,
    defenceDate: '1977-01-25',
    authorEn: 'G.G. Vlaikov',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Thick-Walled Orthotropic Shells of Revolution',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 25 January 1977. Candidate dissertation in Technical Sciences. Kyiv, 1976.',
    pages: 172,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['orthotropic shells', 'thick-walled shells', 'shells of revolution']
  }),
  entry({
    id: 'vovkodav-oksana-2014-spherical-shells-variable-stiffness-spline-approximation',
    year: 2014,
    defenceDate: '2014-05-27',
    authorEn: 'Oksana V. Vovkodav',
    sourceLanguage: 'uk',
    titleEn:
      'Solution of Problems on the Stress-Strain State of Spherical Shells of Variable Stiffness in a Refined Formulation Based on Spline Approximation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 27 May 2014. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 2014.',
    pages: 127,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['spherical shells', 'variable stiffness', 'spline approximation']
  }),
  entry({
    id: 'volk-si-1968-shells-revolution-meridional-ribs-cyclic-symmetry',
    year: 1968,
    defenceDate: '1968-09-24',
    authorEn: 'S.I. Volk',
    sourceLanguage: 'ru',
    titleEn:
      'A Method for Calculating Shells of Revolution with Meridional Ribs Taking into Account Cyclically Symmetric Deformation',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 24 September 1968. Candidate dissertation in Technical Sciences. Kyiv, 1968.',
    pages: 158,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['shells of revolution', 'meridional ribs', 'cyclic symmetry']
  }),
  entry({
    id: 'vologzhaninov-yurii-1984-approximate-methods-separation-stresses-experimental-mechanics',
    year: 1984,
    defenceDate: '1984-11-11',
    authorEn: 'Yurii N. Vologzhaninov',
    sourceLanguage: 'ru',
    titleEn: 'Approximate Methods for Stress Separation in Experimental Mechanics',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 11 November 1984. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1984.',
    pages: 301,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['experimental mechanics', 'stress separation', 'approximate methods']
  }),
  entry({
    id: 'vorobiev-vm-1978-nonlinear-dynamics-gyroscopic-systems',
    year: 1978,
    defenceDate: '1978-01-31',
    authorEn: 'V.M. Vorobiev',
    sourceLanguage: 'ru',
    titleEn: 'Some Nonlinear Problems in the Dynamics of Gyroscopic Systems',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 31 January 1978. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1977.',
    pages: 204,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['gyroscopic systems', 'nonlinear dynamics', 'theoretical mechanics']
  }),
  entry({
    id: 'vorobiev-serhii-1983-dynamics-noncircular-cylindrical-shells-fluid',
    year: 1983,
    defenceDate: '1983-12-27',
    authorEn: 'Serhii A. Vorobiev',
    sourceLanguage: 'ru',
    titleEn: 'Dynamics of Noncircular Cylindrical Shells in Fluid',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 27 December 1983. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1983.',
    pages: 119,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['shell dynamics', 'cylindrical shells', 'fluid-structure interaction']
  }),
  entry({
    id: 'vostrov-yevhen-1983-nonisothermal-cyclic-deformation-high-temperatures',
    year: 1983,
    defenceDate: '1983-09-27',
    authorEn: 'Yevhen N. Vostrov',
    sourceLanguage: 'ru',
    titleEn:
      'Investigation of Regularities of Nonisothermal Cyclic Deformation of Materials at High Temperatures',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 27 September 1983. Candidate dissertation in Technical Sciences, specialty 01.02.04. Kyiv, 1983.',
    pages: 205,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['cyclic deformation', 'high temperature materials', 'thermomechanics']
  })
];
