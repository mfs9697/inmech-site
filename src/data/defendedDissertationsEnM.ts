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
const instituteMechanicsAsUkraine = 'Institute of Mechanics, Academy of Sciences of Ukraine';
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const instituteConstructionMechanicsUkrSsr = 'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const dniproCivilEngineeringInstitute = 'Dnipropetrovsk Civil Engineering Institute';
const khmelnytskyiStateUniversity =
  'Khmelnytskyi State University, Ministry of Education and Science of Ukraine';

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

export const defendedDissertationsEnM: DefendedDissertationEntryEn[] = [
  entry({
    id: 'mazur-vladimir-1987-axisymmetric-thermoviscoplastic-stress-strain-bodies-revolution-creep-damage',
    year: 1987,
    defenceDate: '1987-05-26',
    authorEn: 'Vladimir I. Mazur',
    sourceLanguage: 'ru',
    titleEn:
      'Axisymmetric Thermoviscoplastic Stress-Strain State of Bodies of Revolution Considering Material Damage under Creep',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 May 1987. Candidate dissertation in Technical Sciences. Kyiv, 1987.',
    pages: 157,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermoviscoplasticity', 'creep damage', 'bodies of revolution']
  }),
  entry({
    id: 'mazurmovich-zn-1953-spatial-stability-thin-walled-curvilinear-bars',
    year: 1953,
    defenceDate: '1953-09-19',
    authorEn: 'Z.N. Mazurmovich',
    sourceLanguage: 'ru',
    titleEn: 'Spatial Stability of Thin-Walled Curvilinear Bars',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 19 September 1953. Candidate dissertation in Technical Sciences. Kyiv, 1953.',
    pages: 133,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['thin-walled bars', 'curvilinear bars', 'spatial stability']
  }),
  entry({
    id: 'makarenko-ai-1977-resonant-oscillations-controlled-rigid-bodies',
    year: 1977,
    defenceDate: '1977-05-24',
    authorEn: 'A.I. Makarenko',
    sourceLanguage: 'ru',
    titleEn: 'Resonant Oscillations of Controlled Rigid Bodies',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 24 May 1977. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1977.',
    pages: 194,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['resonance', 'rigid bodies', 'controlled motion']
  }),
  entry({
    id: 'makarenkov-evgeny-1992-thermostress-spatial-structures-turbine-foundations',
    year: 1992,
    authorEn: 'Evgeny A. Makarenkov',
    sourceLanguage: 'ru',
    titleEn: 'Thermally Stressed State of Spatial Structures Applied to the Calculation of Turbine-Unit Foundations',
    degree: doctorTechnical,
    specialtyCode: '05.23.17',
    bibliographyEn: 'Defended in 1992. Doctoral dissertation in Technical Sciences. Dnipropetrovsk, 1992.',
    pages: 147,
    placeEn: 'Dnipropetrovsk',
    institutionEn: dniproCivilEngineeringInstitute,
    tags: ['thermal stresses', 'spatial structures', 'turbine foundations', 'structural mechanics']
  }),
  entry({
    id: 'maksimenko-vitaly-1986-statics-smooth-ribbed-cylindrical-shells-local-loads',
    year: 1986,
    defenceDate: '1986-06-17',
    authorEn: 'Vitaly P. Maksimenko',
    sourceLanguage: 'ru',
    titleEn: 'Static Problems for Smooth and Ribbed Cylindrical Shells under Local Loads',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 17 June 1986. Candidate dissertation in Technical Sciences. Kyiv, 1986.',
    pages: 210,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['cylindrical shells', 'ribbed shells', 'local loads']
  }),
  entry({
    id: 'maksimyuk-vladimir-1988-physically-nonlinear-axisymmetric-orthotropic-shells-revolution',
    year: 1988,
    defenceDate: '1988-03-29',
    authorEn: 'Vladimir A. Maksimyuk',
    sourceLanguage: 'ru',
    titleEn: 'Physically Nonlinear Axisymmetric Problems of the Theory of Orthotropic Shells of Revolution',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 March 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1987.',
    pages: 127,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['orthotropic shells', 'physical nonlinearity', 'axisymmetric problems']
  }),
  entry({
    id: 'maksymiuk-volodymyr-2000-physically-nonlinear-orthotropic-composite-shells-curvilinear-opening',
    year: 2000,
    defenceDate: '2000-09-26',
    authorEn: 'Volodymyr A. Maksymiuk',
    sourceLanguage: 'uk',
    titleEn: 'Physically Nonlinear Problems in the Theory of Orthotropic Composite Shells with a Curvilinear Opening',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 September 2000. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 2000.',
    pages: 305,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['composite shells', 'orthotropic shells', 'curvilinear openings', 'physical nonlinearity']
  }),
  entry({
    id: 'malashenko-sv-1953-stability-rotating-bodies-cavities-containing-fluid',
    year: 1953,
    authorEn: 'S.V. Malashenko',
    sourceLanguage: 'ru',
    titleEn: 'Experimental Study of Stability of Rotating Bodies with Cavities Containing Fluid',
    degree: doctorTechnical,
    bibliographyEn: 'Defended in 1953. Doctoral dissertation in Technical Sciences. Moscow–Kyiv, 1953.',
    pages: 351,
    placeEn: 'Moscow–Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['rotating bodies', 'fluid-filled cavities', 'stability']
  }),
  entry({
    id: 'margolin-gg-1974-strength-deformability-structural-fiberglass-biaxial-compression',
    year: 1974,
    defenceDate: '1974-06-18',
    authorEn: 'G.G. Margolin',
    sourceLanguage: 'ru',
    titleEn: 'Strength and Deformability of Structural Fiberglass under Biaxial Compression',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 18 June 1974. Candidate dissertation in Technical Sciences. Kyiv, 1974.',
    pages: 133,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fiberglass', 'biaxial compression', 'strength', 'deformability']
  }),
  entry({
    id: 'marina-vasily-1977-structural-medium-model-nonisothermal-loading-cyclically-unstable-materials',
    year: 1977,
    defenceDate: '1977-11-14',
    authorEn: 'Vasily Yu. Marina',
    sourceLanguage: 'ru',
    titleEn: 'Structural Model of a Medium under Nonisothermal Loading Processes for Cyclically Unstable Materials',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 14 November 1977. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1977.',
    pages: 150,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['nonisothermal loading', 'cyclically unstable materials', 'material modelling']
  }),
  entry({
    id: 'marina-vasily-1991-multielement-medium-model-complex-nonisothermal-loading-processes',
    year: 1991,
    defenceDate: '1991-12-24',
    authorEn: 'Vasily Yu. Marina',
    sourceLanguage: 'ru',
    titleEn: 'A Multi-Element Medium Model Describing Variable Complex Nonisothermal Loading Processes',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 December 1991. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1991.',
    pages: 361,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkraine,
    tags: ['multi-element models', 'nonisothermal loading', 'material modelling']
  }),
  entry({
    id: 'martyniuk-cherniienko-yulia-2001-stability-motion-nonlinear-systems-imprecise-parameters',
    year: 2001,
    defenceDate: '2001-09-11',
    authorEn: 'Yulia A. Martyniuk-Cherniienko',
    sourceLanguage: 'uk',
    titleEn: 'Stability Conditions for the Motion of Nonlinear Systems with Inaccurate Parameter Values',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 11 September 2001. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2001.',
    pages: 122,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['nonlinear systems', 'stability of motion', 'parameter uncertainty']
  }),
  entry({
    id: 'martynenko-vs-1971-free-vibrations-ellipsoidal-shells-revolution',
    year: 1971,
    defenceDate: '1971-11-23',
    authorEn: 'V.S. Martynenko',
    sourceLanguage: 'ru',
    titleEn: 'Free Vibrations of Ellipsoidal Shells of Revolution',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 23 November 1971. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1971.',
    pages: 153,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['ellipsoidal shells', 'free vibrations', 'shells of revolution']
  }),
  entry({
    id: 'marchenko-tetiana-2004-central-impact-two-identical-blunted-elastic-bodies',
    year: 2004,
    defenceDate: '2004-02-24',
    authorEn: 'Tetiana A. Marchenko',
    sourceLanguage: 'uk',
    titleEn: 'Central Impact of Two Identical Blunted Elastic Bodies',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 February 2004. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2003.',
    pages: 123,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['impact mechanics', 'elastic bodies', 'contact interaction']
  }),
  entry({
    id: 'maslov-bp-1975-nonlinear-elastic-viscoelastic-properties-stochastically-inhomogeneous-media',
    year: 1975,
    defenceDate: '1975-04-29',
    authorEn: 'B.P. Maslov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Nonlinear Elastic and Viscoelastic Properties of Stochastically Inhomogeneous Media',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 29 April 1975. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1975.',
    pages: 130,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stochastic media', 'viscoelasticity', 'nonlinear elasticity']
  }),
  entry({
    id: 'maslov-boris-1983-stochastic-composites-nonlinear-anisotropic-component-properties',
    year: 1983,
    defenceDate: '1983-12-27',
    authorEn: 'Boris P. Maslov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Stochastic Composites with Nonlinear and Anisotropic Component Properties',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 December 1983. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1983.',
    pages: 423,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stochastic composites', 'anisotropy', 'nonlinear materials']
  }),
  entry({
    id: 'maslova-anna-2011-aerodynamic-moment-variability-gravity-stabilized-spacecraft-motion',
    year: 2011,
    defenceDate: '2011-04-26',
    authorEn: 'Anna I. Maslova',
    sourceLanguage: 'ru',
    titleEn:
      'Influence of Aerodynamic Moment Variability on the Motion of Gravity-Stabilized Spacecraft Relative to the Centre of Mass',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 April 2011. Candidate dissertation in Physical and Mathematical Sciences. Dnipropetrovsk, 2010.',
    pages: 190,
    placeEn: 'Dnipropetrovsk',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['spacecraft dynamics', 'aerodynamic moment', 'gravity stabilization']
  }),
  entry({
    id: 'matniak-serhii-2004-plane-contact-rolling-rigid-cylinder-half-plane-strip-initial-stresses',
    year: 2004,
    defenceDate: '2004-10-26',
    authorEn: 'Serhii V. Matniak',
    sourceLanguage: 'uk',
    titleEn:
      'Plane Contact Problems of Rolling of a Rigid Cylinder over a Half-Plane and a Strip with Initial Stresses',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 October 2004. Candidate dissertation in Physical and Mathematical Sciences. Khmelnytskyi, 2004.',
    pages: 168,
    placeEn: 'Khmelnytskyi',
    institutionEn: khmelnytskyiStateUniversity,
    tags: ['contact mechanics', 'rolling contact', 'initial stresses']
  }),
  entry({
    id: 'matoshko-si-1966-elastoplastic-bending-bearing-capacity-rigid-plates-transverse-load',
    year: 1966,
    defenceDate: '1966-05-10',
    authorEn: 'S.I. Matoshko',
    sourceLanguage: 'ru',
    titleEn: 'Elastic-Plastic Bending and Load-Bearing Capacity of Rigid Plates under Transverse Load',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 10 May 1966. Candidate dissertation in Technical Sciences. Kyiv, 1965.',
    pages: 117,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastic-plastic bending', 'plates', 'load-bearing capacity']
  }),
  entry({
    id: 'matyash-yuri-1984-elastic-equilibrium-multilayer-corrugated-thick-walled-cylinders',
    year: 1984,
    defenceDate: '1984-04-24',
    authorEn: 'Yuri I. Matyash',
    sourceLanguage: 'ru',
    titleEn: 'Elastic Equilibrium of Multilayer Corrugated Thick-Walled Cylinders',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 April 1984. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1984.',
    pages: 181,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['multilayer cylinders', 'corrugated structures', 'elastic equilibrium']
  })
];
