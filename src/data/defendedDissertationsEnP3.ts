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
  '01.02.03': { code: '01.02.03', en: 'Specialty 01.02.03' },
  '01.02.04': { code: '01.02.04', en: 'Mechanics of Deformable Solids' },
  '05.23.17': { code: '05.23.17', en: 'Structural Mechanics' }
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

export const defendedDissertationsEnP3: DefendedDissertationEntryEn[] = [
  entry({
    id: 'podilchuk-viktor-1983-lyapunov-practical-stability-two-vector-measures',
    year: 1983,
    defenceDate: '1983-11-15',
    authorEn: 'Viktor D. Podilchuk',
    sourceLanguage: 'ru',
    titleEn: 'Lyapunov Stability and Practical Stability of Systems of Processes with Respect to Two Vector Measures',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 15 November 1983. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1984.',
    pages: 108,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['Lyapunov stability', 'practical stability', 'vector measures']
  }),
  entry({
    id: 'podylchuk-yun-1965-elasticity-problems-ellipsoidal-domains',
    year: 1965,
    defenceDate: '1965-04-13',
    authorEn: 'Yu.N. Podylchuk',
    sourceLanguage: 'ru',
    titleEn: 'Some Problems of Elasticity Theory for Ellipsoidal Domains',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 13 April 1965. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1964.',
    pages: 94,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elasticity theory', 'ellipsoidal domains']
  }),
  entry({
    id: 'podilchuk-inna-1998-stress-state-anisotropic-viscoelastic-bodies-canonical-stress-concentrators-uniform-tension',
    year: 1998,
    defenceDate: '1998-07-30',
    authorEn: 'Inna Yu. Podilchuk',
    sourceLanguage: 'uk',
    titleEn:
      'Stress State of Anisotropic Viscoelastic Bodies with Canonical Stress Concentrators under Uniform Tension',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 30 July 1998. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1998.',
    pages: 176,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['anisotropic viscoelastic bodies', 'stress concentrators', 'uniform tension']
  }),
  entry({
    id: 'podlipenets-alexander-1986-surface-bulk-waves-regularly-layered-composites',
    year: 1986,
    defenceDate: '1986-11-11',
    authorEn: 'Alexander N. Podlipenets',
    sourceLanguage: 'ru',
    titleEn: 'Propagation of Surface and Bulk Waves in Regularly Layered Composites',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 11 November 1986. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1986.',
    pages: 131,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['surface waves', 'bulk waves', 'regularly layered composites']
  }),
  entry({
    id: 'podolsky-ivan-1990-natural-vibrations-cylindrical-stiffened-shells-fluid',
    year: 1990,
    defenceDate: '1990-02-26',
    authorEn: 'Ivan V. Podolsky',
    sourceLanguage: 'ru',
    titleEn: 'Natural Vibrations of Cylindrical Stiffened Shells in Fluid',
    degree: candidateTechnical,
    specialtyCode: '05.23.17',
    bibliographyEn: 'Defended on 26 February 1990. Candidate dissertation in Technical Sciences. Kyiv, 1990.',
    pages: 141,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stiffened shells', 'natural vibrations', 'fluid-structure interaction']
  }),
  entry({
    id: 'podchasov-np-1976-optimal-active-vibration-damping-mechanical-systems',
    year: 1976,
    defenceDate: '1976-12-12',
    authorEn: 'N.P. Podchasov',
    sourceLanguage: 'ru',
    titleEn: 'Optimal Active Vibration Damping of Mechanical Systems',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 12 December 1976. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1976.',
    pages: 173,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['active vibration damping', 'mechanical systems', 'optimization']
  }),
  entry({
    id: 'polishchuk-ti-1974-stress-state-ogival-toroidal-shells',
    year: 1974,
    defenceDate: '1974-04-23',
    authorEn: 'T.I. Polishchuk',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Ogival and Toroidal Shells',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 23 April 1974. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1974.',
    pages: 175,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['ogival shells', 'toroidal shells', 'stress state']
  }),
  entry({
    id: 'polosukhin-na-1950-strength-gas-press-joints',
    year: 1950,
    defenceDate: '1950-04-18',
    authorEn: 'N.A. Polosukhin',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of the Strength of Gas-Press Joints',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 18 April 1950. Candidate dissertation in Technical Sciences. Kyiv, 1949.',
    pages: 138,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['gas-press joints', 'strength']
  }),
  entry({
    id: 'polyakov-ps-1948-stability-spatial-pin-jointed-bar-systems-circular-symmetry',
    year: 1948,
    defenceDate: '1948-06-30',
    authorEn: 'P.S. Polyakov',
    sourceLanguage: 'ru',
    titleEn: 'Stability of Spatial Pin-Jointed Bar Systems with Circular Symmetry',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 30 June 1948. Candidate dissertation in Technical Sciences. Kyiv, 1948.',
    pages: 145,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['pin-jointed bar systems', 'circular symmetry', 'stability']
  }),
  entry({
    id: 'popkov-vg-1947-bending-disks-transverse-radial-forces',
    year: 1947,
    defenceDate: '1947-01-18',
    authorEn: 'V.G. Popkov',
    sourceLanguage: 'ru',
    titleEn: 'Bending of Disks under Simultaneous Action of Transverse and Radial Forces',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 18 January 1947. Candidate dissertation in Technical Sciences. Kyiv, 1946.',
    pages: 138,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['disk bending', 'transverse forces', 'radial forces']
  }),
  entry({
    id: 'popov-sergey-1990-impact-blunted-rigid-body-elastic-half-space',
    year: 1990,
    defenceDate: '1990-06-26',
    authorEn: 'Sergey N. Popov',
    sourceLanguage: 'ru',
    titleEn: 'Impact Problem of a Blunted Rigid Body on the Surface of an Elastic Half-Space',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 June 1990. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1990.',
    pages: 157,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['impact problem', 'elastic half-space', 'rigid body']
  }),
  entry({
    id: 'primachenko-oksana-1993-axisymmetric-mode-i-crack-layer-initial-stresses',
    year: 1993,
    defenceDate: '1993-04-27',
    authorEn: 'Oksana V. Primachenko',
    sourceLanguage: 'ru',
    titleEn: 'Axisymmetric Problem of a Mode-I Crack in a Layer with Initial Stresses',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 April 1993. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1993.',
    pages: 108,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['mode-I crack', 'initial stresses', 'axisymmetric problem']
  }),
  entry({
    id: 'prokopenko-nina-1980-stability-stiffened-layered-cylindrical-shells',
    year: 1980,
    authorEn: 'Nina Ya. Prokopenko',
    sourceLanguage: 'ru',
    titleEn: 'Stability of Stiffened Layered Cylindrical Shells',
    degree: candidateTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended in 1980. Candidate dissertation in Technical Sciences. Kyiv, 1980.',
    pages: 134,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stiffened shells', 'layered cylindrical shells', 'stability']
  }),
  entry({
    id: 'prokhorenko-iv-1975-axisymmetric-elastoplastic-stress-state-shells-revolution-nonisothermal-loading',
    year: 1975,
    defenceDate: '1975-10-28',
    authorEn: 'I.V. Prokhorenko',
    sourceLanguage: 'ru',
    titleEn: 'Axisymmetric Elastoplastic Stress State of Shells of Revolution under Nonisothermal Loading Processes',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 28 October 1975. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1975.',
    pages: 115,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastoplasticity', 'shells of revolution', 'nonisothermal loading']
  }),
  entry({
    id: 'protsenko-op-1965-dynamic-stability-cylindrical-shell-initial-deflection-axial-compression-external-pressure',
    year: 1965,
    defenceDate: '1965-06-29',
    authorEn: 'O.P. Protsenko',
    sourceLanguage: 'ru',
    titleEn:
      'Dynamic Stability of a Closed Cylindrical Shell with Initial Deflection under Combined Axial Compression and Uniform External Transverse Pressure',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 29 June 1965. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1965.',
    pages: 137,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['dynamic stability', 'cylindrical shells', 'initial deflection', 'external pressure']
  }),
  entry({
    id: 'proshchenko-tetiana-2003-stress-concentration-piezoceramic-bodies-elliptical-inclusion-hyperboloidal-notch',
    year: 2003,
    defenceDate: '2003-10-28',
    authorEn: 'Tetiana M. Proshchenko',
    sourceLanguage: 'uk',
    titleEn: 'Stress Concentration in Piezoceramic Bodies near an Elliptical Inclusion and a Hyperboloidal Notch',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 October 2003. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2003.',
    pages: 134,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['stress concentration', 'piezoceramic bodies', 'elliptical inclusion', 'hyperboloidal notch']
  }),
  entry({
    id: 'puzanov-vg-1952-wear-cast-iron-steel-crane-wheels-friction-drive-disks',
    year: 1952,
    defenceDate: '1952-12-30',
    authorEn: 'V.G. Puzanov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Wear of Cast Iron and Steel Applied to Bridge-Crane Running Wheels and Friction-Drive Disks',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 30 December 1952. Candidate dissertation in Technical Sciences. Kyiv, 1952.',
    pages: 125,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['wear', 'cast iron', 'steel', 'crane wheels', 'friction drives']
  }),
  entry({
    id: 'puzyriov-serhii-2007-free-vibrations-rectangular-shallow-shells-variable-thickness-spline-approximation',
    year: 2007,
    defenceDate: '2007-06-12',
    authorEn: 'Serhii V. Puzyriov',
    sourceLanguage: 'uk',
    titleEn:
      'Solution of Free-Vibration Problems for Rectangular-in-Plan Shallow Shells of Variable Thickness Based on Spline Approximation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 12 June 2007. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2010.',
    pages: 158,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['free vibrations', 'shallow shells', 'variable thickness', 'spline approximation']
  }),
  entry({
    id: 'puchka-gn-1968-transient-wave-processes-shell-flowing-fluid-system',
    year: 1968,
    defenceDate: '1968-06-25',
    authorEn: 'G.N. Puchka',
    sourceLanguage: 'ru',
    titleEn: 'Transient Wave Processes in a System Consisting of a Shell and Fluid Flowing through It',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 25 June 1968. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1968.',
    pages: 126,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['transient wave processes', 'shell-fluid systems', 'flowing fluid']
  })
];
