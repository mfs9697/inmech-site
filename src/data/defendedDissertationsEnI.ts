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
  '01.02.03': { code: '01.02.03', en: 'Specialty 01.02.03' },
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

const instituteConstructionMechanicsUkrSsr = 'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsAsUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsNasUkraineShort = 'Institute of Mechanics, NAS of Ukraine';
const instituteConstructionMechanicsNasUkraine = 'Institute of Construction Mechanics, NAS of Ukraine';

function entry(input: EntryInput): DefendedDissertationEntryEn {
  return {
    id: input.id,
    sortLetter: 'I',
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

export const defendedDissertationsEnI: DefendedDissertationEntryEn[] = [
  entry({
    id: 'ivanova-yulia-1993-deformation-flexible-shallow-rectangular-shells-spline-approximation',
    year: 1993,
    defenceDate: '1993-04-27',
    authorEn: 'Yulia I. Ivanova',
    sourceLanguage: 'ru',
    titleEn:
      'Numerical Solution of Problems on the Deformation of Flexible Shallow Rectangular Shells Based on Spline Approximation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 April 1993. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1993.',
    pages: 182,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraineShort,
    tags: ['shallow shells', 'rectangular shells', 'spline approximation', 'numerical methods']
  }),
  entry({
    id: 'ivanov-igor-2014-connected-stability-large-scale-systems-delay-impulsive-action',
    year: 2014,
    defenceDate: '2014-04-15',
    authorEn: 'Igor L. Ivanov',
    sourceLanguage: 'ru',
    titleEn: 'Connected Stability of Large-Scale Systems with Delay and Impulsive Action',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 15 April 2014. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2012.',
    pages: 160,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['connected stability', 'large-scale systems', 'delay systems', 'impulsive action']
  }),
  entry({
    id: 'ivanov-yurii-1982-vibrations-wave-propagation-two-layer-plates-cylindrical-shells-refined-shear-model',
    year: 1982,
    authorEn: 'Yurii A. Ivanov',
    sourceLanguage: 'ru',
    titleEn:
      'Study of Vibrations and Wave Propagation in Two-Layer Plates and Cylindrical Shells Based on a Refined Shear Model',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1982. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1982.',
    pages: 140,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['vibrations', 'wave propagation', 'two-layer plates', 'cylindrical shells', 'shear model']
  }),
  entry({
    id: 'ivashchenko-boris-1984-motion-gyroscope-cavity-high-viscosity-fluid',
    year: 1984,
    defenceDate: '1984-05-29',
    authorEn: 'Boris P. Ivashchenko',
    sourceLanguage: 'ru',
    titleEn: 'Motion of a Gyroscope with a Cavity Filled with a High-Viscosity Fluid',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 29 May 1984. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1984.',
    pages: 116,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['gyroscope motion', 'viscous fluid', 'cavity', 'theoretical mechanics']
  }),
  entry({
    id: 'ignatyuk-valery-1984-stability-reinforced-cylindrical-shells-dynamic-loading',
    year: 1984,
    defenceDate: '1984-12-04',
    authorEn: 'Valery I. Ignatyuk',
    sourceLanguage: 'ru',
    titleEn: 'Stability of Reinforced Cylindrical Shells under Dynamic Loading',
    degree: candidateTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended on 4 December 1984. Candidate dissertation in Technical Sciences. Kyiv, 1984.',
    pages: 204,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['reinforced shells', 'cylindrical shells', 'stability', 'dynamic loading']
  }),
  entry({
    id: 'ilyin-la-1955-antisymmetric-deformation-thin-conical-shell',
    year: 1955,
    defenceDate: '1955-12-27',
    authorEn: 'L.A. Ilyin',
    sourceLanguage: 'ru',
    titleEn: 'Antisymmetric Deformation of a Thin Conical Shell',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 27 December 1955. Candidate dissertation in Technical Sciences. Kyiv, 1955.',
    pages: 162,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['conical shells', 'antisymmetric deformation', 'thin shells']
  }),
  entry({
    id: 'indiaminov-nuriddin-1988-stress-state-conical-shells-composite-materials',
    year: 1988,
    defenceDate: '1988-09-27',
    authorEn: 'Nuriddin N. Indiaminov',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Conical Shells Made of Composite Materials',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 27 September 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1988.',
    pages: 137,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['conical shells', 'composite materials', 'stress state']
  }),
  entry({
    id: 'israfilov-rauf-1988-plane-strain-filtration-saturated-porous-media-cylindrical-cavities',
    year: 1988,
    defenceDate: '1988-05-31',
    authorEn: 'Rauf Mahmud ogly Israfilov',
    sourceLanguage: 'ru',
    titleEn:
      'Coupled Processes of Plane Strain and Filtration in Saturated Porous Media with Cylindrical Cavities',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 31 May 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1987.',
    pages: 161,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['plane strain', 'filtration', 'porous media', 'cylindrical cavities']
  }),
  entry({
    id: 'istomina-an-1958-steel-shkh15-low-temperatures-heat-treatment-regimes',
    year: 1958,
    defenceDate: '1958-02-25',
    authorEn: 'A.N. Istomina',
    sourceLanguage: 'ru',
    titleEn: 'Properties of ShKh-15 Steel at Low Temperatures Depending on Heat-Treatment Regimes',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 25 February 1958. Candidate dissertation in Technical Sciences. Kyiv, 1954–1957.',
    pages: 106,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['steel properties', 'low temperatures', 'heat treatment']
  }),
  entry({
    id: 'itenberg-bz-1953-stress-state-disks-circular-holes',
    year: 1953,
    defenceDate: '1953-09-15',
    authorEn: 'B.Z. Itenberg',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Disks Weakened by Circular Holes',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 15 September 1953. Candidate dissertation in Technical Sciences. Kyiv, 1952.',
    pages: 194,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsNasUkraine,
    tags: ['stress state', 'disks', 'circular holes']
  }),
  entry({
    id: 'ishchenko-dmitry-1984-elastoplastic-state-bodies-revolution-cyclic-axisymmetric-thermal-force-loading',
    year: 1984,
    defenceDate: '1984-12-04',
    authorEn: 'Dmitry A. Ishchenko',
    sourceLanguage: 'ru',
    titleEn:
      'Elastoplastic State of Bodies of Revolution under Cyclic Axisymmetric Thermal and Force Loading',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 4 December 1984. Candidate dissertation in Technical Sciences. Kyiv, 1984.',
    pages: 139,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastoplastic state', 'bodies of revolution', 'cyclic loading', 'thermal loading']
  }),
  entry({
    id: 'ishchenko-igor-1949-underwater-noncontact-explosion-membrane-crushers',
    year: 1949,
    authorEn: 'Igor I. Ishchenko',
    sourceLanguage: 'ru',
    titleEn: 'Action of an Underwater Non-Contact Explosion on Membrane Crushers',
    degree: candidateTechnical,
    bibliographyEn: 'Defended in 1949. Candidate dissertation in Technical Sciences. Kyiv, 1949.',
    pages: 107,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['underwater explosion', 'membrane crushers', 'dynamic loading']
  })
];
