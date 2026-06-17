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
  '01.02.03': { code: '01.02.03', en: 'Specialty 01.02.03' },
  '01.02.04': { code: '01.02.04', en: 'Mechanics of Deformable Solids' },
  '05.05.07': { code: '05.05.07', en: 'Specialty 05.05.07' }
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
const khmelnytskyiStateUniversity =
  'Khmelnytskyi State University, Ministry of Education and Science of Ukraine';
const vinnytsiaPolytechnicInstitute = 'Vinnytsia Polytechnic Institute';

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

export const defendedDissertationsEnR: DefendedDissertationEntryEn[] = [
  entry({
    id: 'radzievsky-va-1957-electrodynamic-vibrometer-research-vibrations',
    year: 1957,
    defenceDate: '1957-03-12',
    authorEn: 'V.A. Radzievsky',
    sourceLanguage: 'ru',
    titleEn: 'Electrodynamic Vibrometer and Its Application to the Study of Vibrations',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 12 March 1957. Candidate dissertation in Technical Sciences. Kyiv, 1956.',
    pages: 186,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['vibrometer', 'vibrations', 'experimental mechanics']
  }),
  entry({
    id: 'ramskaya-ekaterina-1986-harmonic-vibrations-waves-anisotropic-hollow-cylinder-sphere',
    year: 1986,
    defenceDate: '1986-01-28',
    authorEn: 'Ekaterina I. Ramskaya',
    sourceLanguage: 'ru',
    titleEn: 'Harmonic Vibrations and Waves in Anisotropic Hollow Cylinders and Spheres',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 January 1986. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1985.',
    pages: 112,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['anisotropic bodies', 'hollow cylinders', 'hollow spheres', 'waves']
  }),
  entry({
    id: 'ramskyi-andrii-1996-axisymmetric-elasticity-multilayer-plates-initial-stresses',
    year: 1996,
    authorEn: 'Andrii O. Ramskyi',
    sourceLanguage: 'uk',
    titleEn: 'Axisymmetric Problems of Elasticity Theory for Multilayer Plates with Initial Stresses',
    degree: candidatePhysical,
    specialtyCode: '05.05.07',
    bibliographyEn: 'Defended in 1996. Candidate dissertation in Physical and Mathematical Sciences. Khmelnytskyi, 1996.',
    pages: 135,
    placeEn: 'Khmelnytskyi',
    institutionEn: khmelnytskyiStateUniversity,
    tags: ['elasticity theory', 'multilayer plates', 'initial stresses', 'axisymmetric problems']
  }),
  entry({
    id: 'ratushniak-tetiana-2006-magnetoelastic-shear-waves-layered-magnetostrictive-media',
    year: 2006,
    defenceDate: '2006-07-04',
    authorEn: 'Tetiana V. Ratushniak',
    sourceLanguage: 'uk',
    titleEn: 'Propagation of Magnetoelastic Shear Waves in Regularly Layered Magnetostrictive Media',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 4 July 2006. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2006.',
    pages: 135,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['magnetoelastic waves', 'shear waves', 'layered media', 'magnetostriction']
  }),
  entry({
    id: 'rvachev-mikhail-1991-statically-admissible-stress-fields-elastoviscoplastic-deformation',
    year: 1991,
    defenceDate: '1991-09-24',
    authorEn: 'Mikhail A. Rvachev',
    sourceLanguage: 'ru',
    titleEn:
      'Construction of Statically Admissible Stress Fields for Numerical Solution of Elastoviscoplastic Deformation Problems of Solids',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 September 1991. Doctoral dissertation in Physical and Mathematical Sciences. Vinnytsia, 1991.',
    pages: 406,
    placeEn: 'Vinnytsia',
    institutionEn: vinnytsiaPolytechnicInstitute,
    tags: ['elastoviscoplasticity', 'stress fields', 'numerical methods', 'solids']
  }),
  entry({
    id: 'revutsky-vladimir-1985-free-vibrations-ribbed-spherical-shells-attached-masses',
    year: 1985,
    defenceDate: '1985-04-02',
    authorEn: 'Vladimir N. Revutsky',
    sourceLanguage: 'ru',
    titleEn: 'Free Vibrations of Ribbed Spherical Shells with Attached Masses',
    degree: candidateTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended on 2 April 1985. Candidate dissertation in Technical Sciences. Kyiv, 1984.',
    pages: 152,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['spherical shells', 'ribbed shells', 'attached masses', 'free vibrations']
  }),
  entry({
    id: 'reshetar-anatoly-1988-vibrations-shallow-spherical-shells-imperfections-geometric-nonlinearity',
    year: 1988,
    defenceDate: '1988-11-29',
    authorEn: 'Anatoly D. Reshetar',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations of Shallow Spherical Shells Considering Initial Imperfections and Geometric Nonlinearity',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 November 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1988.',
    pages: 165,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['shallow spherical shells', 'initial imperfections', 'geometric nonlinearity', 'vibrations']
  }),
  entry({
    id: 'rovenko-yurii-2003-vibrations-dissipative-heating-viscoelastic-bodies-polyharmonic-deformation-moving-surface-loads',
    year: 2003,
    defenceDate: '2003-02-04',
    authorEn: 'Yurii V. Rovenko',
    sourceLanguage: 'uk',
    titleEn:
      'Vibrations and Dissipative Heating in Viscoelastic Bodies under Polyharmonic Deformation Caused by Moving Surface Loads',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 4 February 2003. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2002.',
    pages: 151,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['viscoelastic bodies', 'dissipative heating', 'polyharmonic deformation', 'moving loads']
  }),
  entry({
    id: 'rozhok-lilia-2003-stress-state-noncircular-hollow-inhomogeneous-cylinders-discrete-fourier-series',
    year: 2003,
    defenceDate: '2003-06-10',
    authorEn: 'Lilia S. Rozhok',
    sourceLanguage: 'ru',
    titleEn:
      'Determination of the Stress State of Noncircular Hollow Inhomogeneous Cylinders Based on Approximation of Functions by Discrete Fourier Series',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 10 June 2003. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2003.',
    pages: 168,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['inhomogeneous cylinders', 'noncircular cylinders', 'Fourier series', 'stress state']
  }),
  entry({
    id: 'rozhok-lilia-2019-spatial-elasticity-cylindrical-shells-complex-geometry-structure',
    year: 2019,
    defenceDate: '2019-09-24',
    authorEn: 'Lilia S. Rozhok',
    sourceLanguage: 'uk',
    titleEn:
      'Spatial Problems of Elasticity Theory for Cylindrical Shells of Complex Geometry and Structure',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 24 September 2019. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04 — Mechanics of Deformable Solids. Registration no. 0519U001169.',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['elasticity theory', 'cylindrical shells', 'complex geometry', 'complex structure']
  }),
  entry({
    id: 'romanov-alexander-1989-nonlinear-damage-accumulation-model-life-calculation-creep-nonstationary-loading',
    year: 1989,
    defenceDate: '1989-09-26',
    authorEn: 'Alexander V. Romanov',
    sourceLanguage: 'ru',
    titleEn:
      'Nonlinear Model of Damage Accumulation and Life Calculation under Creep with Nonstationary Loading',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 September 1989. Candidate dissertation in Technical Sciences. Kyiv, 1989.',
    pages: 169,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['damage accumulation', 'life calculation', 'creep', 'nonstationary loading']
  }),
  entry({
    id: 'romantsov-konstantin-1992-stress-state-orthotropic-plates-panels-hole-two-radial-cracks',
    year: 1992,
    defenceDate: '1992-09-29',
    authorEn: 'Konstantin V. Romantsov',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Orthotropic Plates and Panels Weakened by a Hole with Two Radial Cracks',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 September 1992. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1992.',
    pages: 81,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['orthotropic plates', 'orthotropic panels', 'radial cracks', 'stress state']
  }),
  entry({
    id: 'rubach-om-1953-extension-bending-circular-plates-radial-ribs',
    year: 1953,
    defenceDate: '1953-12-29',
    authorEn: 'O.M. Rubach',
    sourceLanguage: 'ru',
    titleEn: 'Extension and Bending of Circular Plates Reinforced with Radial Ribs',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 29 December 1953. Candidate dissertation in Technical Sciences. Kyiv, 1953.',
    pages: 129,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['circular plates', 'radial ribs', 'bending', 'extension']
  }),
  entry({
    id: 'rubezhansky-yurii-1982-optimal-control-stress-strain-shells-localized-loads',
    year: 1982,
    defenceDate: '1982-11-30',
    authorEn: 'Yurii I. Rubezhansky',
    sourceLanguage: 'ru',
    titleEn:
      'Optimal Control of the Stress-Strain State of Cylindrical and Shallow Shells by Means of Localized Loads',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 30 November 1982. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1982.',
    pages: 117,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['optimal control', 'stress-strain state', 'cylindrical shells', 'shallow shells']
  }),
  entry({
    id: 'rubtsova-irina-1985-high-frequency-bending-vibrations-elastic-prismatic-bodies',
    year: 1985,
    defenceDate: '1985-05-21',
    authorEn: 'Irina G. Rubtsova',
    sourceLanguage: 'ru',
    titleEn: 'High-Frequency Bending Vibrations of Elastic Prismatic Bodies',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 21 May 1985. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1985.',
    pages: 125,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['prismatic bodies', 'bending vibrations', 'high-frequency vibrations']
  }),
  entry({
    id: 'rubtsov-yurii-1982-nonstationary-elastic-waves-cavities-geometrical-optics-method',
    year: 1982,
    defenceDate: '1982-11-09',
    authorEn: 'Yurii K. Rubtsov',
    sourceLanguage: 'ru',
    titleEn:
      'Investigation of Propagation of Nonstationary Elastic Waves from Cavities Based on the Method of Geometrical Optics',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 9 November 1982. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1982.',
    pages: 159,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastic waves', 'cavities', 'geometrical optics', 'nonstationary waves']
  }),
  entry({
    id: 'rudnitsky-vyacheslav-1988-contact-interaction-elastic-punches-prestressed-bodies',
    year: 1988,
    defenceDate: '1988-06-14',
    authorEn: 'Vyacheslav B. Rudnitsky',
    sourceLanguage: 'ru',
    titleEn: 'Contact Interaction of Elastic Punches with Prestressed Bodies',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 14 June 1988. Doctoral dissertation in Technical Sciences. Kyiv, 1988.',
    pages: 361,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['contact interaction', 'elastic punches', 'prestressed bodies']
  }),
  entry({
    id: 'rudnitsky-sergey-1987-refined-vibration-theory-piezoceramic-shells',
    year: 1987,
    defenceDate: '1987-02-24',
    authorEn: 'Sergey I. Rudnitsky',
    sourceLanguage: 'ru',
    titleEn: 'Development and Analysis of a Refined Theory of Vibrations of Piezoceramic Shells',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 February 1987. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1986.',
    pages: 102,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['piezoceramic shells', 'vibration theory', 'refined theory']
  }),
  entry({
    id: 'rusinov-oleksandr-2004-long-term-fracture-thin-walled-cylindrical-tubes-creep-biaxial-static-loading',
    year: 2004,
    authorEn: 'Oleksandr O. Rusinov',
    sourceLanguage: 'uk',
    titleEn:
      'Long-Term Fracture of Thin-Walled Cylindrical Tubes under Creep Conditions with Biaxial Static Loading',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 2004. Candidate dissertation in Technical Sciences. Kyiv, 2004.',
    pages: 152,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['long-term fracture', 'thin-walled tubes', 'creep', 'biaxial loading']
  }),
  entry({
    id: 'rushchitsky-yarema-1982-basic-problems-mechanics-mixtures-elastic-media',
    year: 1982,
    defenceDate: '1982-06-08',
    authorEn: 'Yarema Ya. Rushchitsky',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Basic Problems in Mechanics of Mixtures of Elastic Media',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 8 June 1982. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1982.',
    pages: 342,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['mixture mechanics', 'elastic media', 'continuum mechanics']
  })
];
