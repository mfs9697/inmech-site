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
  '01.02.03': { code: '01.02.03', en: 'Structural Mechanics' },
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
const instituteConstructionMechanicsUkrSsr = 'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsAsUkraine = 'Institute of Mechanics, Academy of Sciences of Ukraine';
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';

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

export const defendedDissertationsEnG4: DefendedDissertationEntryEn[] = [
  entry({
    id: 'grigorenko-petr-1992-contact-interaction-prestressed-layer-coaxial-rigid-cylindrical-punches',
    year: 1992,
    defenceDate: '1992-01-28',
    authorEn: 'Petr P. Grigorenko',
    sourceLanguage: 'ru',
    titleEn:
      'Contact Interaction of a Pre-Stressed Layer and Coaxial Rigid Circular Cylindrical Punches',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 January 1992. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1993.',
    pages: 103,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkraine,
    tags: ['contact interaction', 'pre-stressed layer', 'rigid punches', 'elasticity']
  }),
  entry({
    id: 'grigorenko-yakov-1970-laminated-shells-revolution-variable-stiffness-nonsymmetric-loads',
    year: 1970,
    defenceDate: '1970-06-16',
    authorEn: 'Yakov M. Grigorenko',
    sourceLanguage: 'ru',
    titleEn:
      'Isotropic and Anisotropic Laminated Shells of Revolution of Variable Stiffness under Non-Symmetric Loads',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 16 June 1970. Doctoral dissertation in Technical Sciences. Kyiv, 1970.',
    pages: 462,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['laminated shells', 'shells of revolution', 'variable stiffness', 'non-symmetric loads']
  }),
  entry({
    id: 'grigorovich-vm-1974-contact-problems-statics-spherical-shells',
    year: 1974,
    defenceDate: '1974-01-29',
    authorEn: 'V.M. Grigorovich',
    sourceLanguage: 'ru',
    titleEn: 'Contact Problems in the Statics of Spherical Shells',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 29 January 1974. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1973.',
    pages: 130,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['contact problems', 'spherical shells', 'statics']
  }),
  entry({
    id: 'grinchenko-viktor-1963-thermoelasticity-multilayer-conical-shells',
    year: 1963,
    defenceDate: '1963-12-24',
    authorEn: 'Viktor T. Grinchenko',
    sourceLanguage: 'ru',
    titleEn: 'Thermoelasticity of Multilayer Conical Shells',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 24 December 1963. Candidate dissertation in Technical Sciences. Kyiv, 1963.',
    pages: 177,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermoelasticity', 'multilayer shells', 'conical shells']
  }),
  entry({
    id: 'grinchenko-viktor-1973-boundary-problems-statics-dynamics-elastic-bodies-finite-dimensions',
    year: 1973,
    defenceDate: '1973-05-29',
    authorEn: 'Viktor T. Grinchenko',
    sourceLanguage: 'ru',
    titleEn: 'Boundary Problems of Statics and Dynamics for Elastic Bodies of Finite Dimensions',
    degree: doctorPhysical,
    bibliographyEn: 'Defended on 29 May 1973. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1973.',
    pages: 355,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['boundary problems', 'statics', 'dynamics', 'elastic bodies']
  }),
  entry({
    id: 'grozin-bd-1949-plasticity-high-hardness-steels',
    year: 1949,
    defenceDate: '1949-06-21',
    authorEn: 'B.D. Grozin',
    sourceLanguage: 'ru',
    titleEn: 'Plasticity of High-Hardness Steels',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 21 June 1949. Doctoral dissertation in Technical Sciences. Kyiv, 1949.',
    pages: 264,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['plasticity', 'high-hardness steels', 'metal mechanics']
  }),
  entry({
    id: 'guz-alexander-1962-stress-concentration-holes-isotropic-orthotropic-shells',
    year: 1962,
    defenceDate: '1962-12-25',
    authorEn: 'Alexander N. Guz',
    sourceLanguage: 'ru',
    titleEn:
      'Approximate Solutions of Problems on Stress Concentration near Holes in Isotropic and Orthotropic Shells',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 25 December 1962. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1962.',
    pages: 138,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stress concentration', 'holes', 'isotropic shells', 'orthotropic shells']
  }),
  entry({
    id: 'guz-alexander-1965-thin-elastic-shells-weakened-by-holes',
    year: 1965,
    defenceDate: '1965-10-12',
    authorEn: 'Alexander N. Guz',
    sourceLanguage: 'ru',
    titleEn: 'Thin Elastic Shells Weakened by Holes',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 12 October 1965. Doctoral dissertation in Technical Sciences. Kyiv, 1965.',
    pages: 327,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thin shells', 'elastic shells', 'holes', 'shell weakening']
  }),
  entry({
    id: 'guz-igor-1991-spatial-nonaxisymmetric-stability-problems-layered-composites',
    year: 1991,
    defenceDate: '1991-12-10',
    authorEn: 'Igor A. Guz',
    sourceLanguage: 'ru',
    titleEn:
      'Spatial Non-Axisymmetric Problems in the Stability Theory of Layered Composite Materials',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 10 December 1991. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1991.',
    pages: 111,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkraine,
    tags: ['stability theory', 'layered composites', 'non-axisymmetric problems']
  }),
  entry({
    id: 'guz-igor-1994-three-dimensional-stability-theory-composites-layer-contact-conditions',
    year: 1994,
    defenceDate: '1994-06-28',
    authorEn: 'Igor A. Guz',
    sourceLanguage: 'ru',
    titleEn:
      'Three-Dimensional Stability Theory of Composites with Different Contact Conditions between Layers',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 June 1994. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1994.',
    pages: 271,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['three-dimensional stability', 'composites', 'layer contact conditions']
  }),
  entry({
    id: 'gulyaev-vi-1979-numerical-analysis-shell-deformation-classical-nonclassical-formulations',
    year: 1979,
    defenceDate: '1979-04-17',
    authorEn: 'V.I. Gulyaev',
    sourceLanguage: 'ru',
    titleEn: 'Numerical Analysis of Shell Deformation in Non-Classical and Classical Formulations',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 17 April 1979. Doctoral dissertation in Technical Sciences. Kyiv, 1978.',
    pages: 372,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['shell deformation', 'numerical analysis', 'classical formulation', 'non-classical formulation']
  }),
  entry({
    id: 'gumenyuk-bp-1975-dynamic-behavior-viscoelastic-bodies-cyclic-loading',
    year: 1975,
    defenceDate: '1975-10-28',
    authorEn: 'B.P. Gumenyuk',
    sourceLanguage: 'ru',
    titleEn: 'Dynamic Behavior of Viscoelastic Bodies under Cyclic Loading',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 28 October 1975. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1975.',
    pages: 172,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['viscoelastic bodies', 'cyclic loading', 'dynamic behavior']
  }),
  entry({
    id: 'gumenyuk-vs-1952-approximate-strength-stability-calculation-anisotropic-variable-thickness-plates',
    year: 1952,
    defenceDate: '1952-12-30',
    authorEn: 'V.S. Gumenyuk',
    sourceLanguage: 'ru',
    titleEn:
      'Approximate Calculation of Strength and Stability of Anisotropic Plates and Plates of Variable Thickness',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 30 December 1952. Candidate dissertation in Technical Sciences. Kyiv, 1952.',
    pages: 107,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['strength calculation', 'stability calculation', 'anisotropic plates', 'variable thickness plates']
  }),
  entry({
    id: 'gutsul-vasily-1990-subcritical-growth-two-cracks-elastoplastic-viscoelastic-deformation',
    year: 1990,
    defenceDate: '1990-09-25',
    authorEn: 'Vasily I. Gutsul',
    sourceLanguage: 'ru',
    titleEn: 'Subcritical Growth of Two Cracks under Elastoplastic and Viscoelastic Deformation',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 September 1990. Candidate dissertation in Technical Sciences. Kyiv, 1990.',
    pages: 131,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['subcritical crack growth', 'elastoplastic deformation', 'viscoelastic deformation']
  })
];
