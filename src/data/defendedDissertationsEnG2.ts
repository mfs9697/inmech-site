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
const instituteMechanicsAssUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsAsUkraine = 'Institute of Mechanics, Academy of Sciences of Ukraine';
const instituteMechanicsNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';

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

export const defendedDissertationsEnG2: DefendedDissertationEntryEn[] = [
  entry({
    id: 'golovatyuk-konstantin-1993-elastic-cable-systems-central-force-field',
    year: 1993,
    defenceDate: '1993-05-25',
    authorEn: 'Konstantin Ya. Golovatyuk',
    sourceLanguage: 'ru',
    titleEn: 'Motion of Elastic Cable Systems in a Central Force Field',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 25 May 1993. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1993.',
    pages: 208,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkraine,
    tags: ['elastic cable systems', 'central force field', 'theoretical mechanics']
  }),
  entry({
    id: 'holovko-kostiantyn-2010-axisymmetric-vibrations-reinforced-shells-elastic-foundation',
    year: 2010,
    defenceDate: '2010-04-27',
    authorEn: 'Kostiantyn H. Holovko',
    sourceLanguage: 'uk',
    titleEn:
      'Problems of Axisymmetric Vibrations of Discretely Reinforced Shells of Revolution on an Elastic Foundation under Impulse Loading',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 April 2010. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2010.',
    pages: 172,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['axisymmetric vibrations', 'reinforced shells', 'elastic foundation', 'impulse loading']
  }),
  entry({
    id: 'holovko-kostiantyn-2008-axisymmetric-vibrations-shell-structural-elements-elastic-foundation',
    year: 2008,
    defenceDate: '2008-07-01',
    authorEn: 'Kostiantyn H. Holovko',
    sourceLanguage: 'uk',
    titleEn:
      'Axisymmetric Vibrations of Discretely Reinforced Shell Structural Elements on an Elastic Foundation under Impulse Loading',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 1 July 2008. Candidate dissertation in Technical Sciences. Kyiv, 2008.',
    pages: 173,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['axisymmetric vibrations', 'shell structures', 'elastic foundation', 'impulse loading']
  }),
  entry({
    id: 'golovchan-vt-1971-wave-diffraction-multiply-connected-deformable-bodies',
    year: 1971,
    defenceDate: '1971-04-27',
    authorEn: 'V.T. Golovchan',
    sourceLanguage: 'ru',
    titleEn: 'Wave Diffraction in Multiply Connected Deformable Bodies',
    degree: doctorPhysical,
    bibliographyEn: 'Defended on 27 April 1971. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1972.',
    pages: 391,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['wave diffraction', 'multiply connected bodies', 'deformable bodies']
  }),
  entry({
    id: 'gololobov-vi-1971-rational-design-shells-of-revolution',
    year: 1971,
    defenceDate: '1971-04-27',
    authorEn: 'V.I. Gololobov',
    sourceLanguage: 'ru',
    titleEn: 'Some Problems of Rational Design of Shells of Revolution',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 27 April 1971. Candidate dissertation in Technical Sciences. Kyiv, 1971.',
    pages: 155,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['shells of revolution', 'rational design', 'structural mechanics']
  }),
  entry({
    id: 'golub-vladislav-1977-fatigue-resistance-heat-resistant-alloys-variable-static-loads',
    year: 1977,
    defenceDate: '1977-03-29',
    authorEn: 'Vladislav P. Golub',
    sourceLanguage: 'ru',
    titleEn: 'Fatigue Resistance of Heat-Resistant Alloys under Combined Variable and Static Loads',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 29 March 1977. Candidate dissertation in Technical Sciences. Kyiv, 1977.',
    pages: 259,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['fatigue resistance', 'heat-resistant alloys', 'combined loading']
  }),
  entry({
    id: 'golub-vladislav-1984-creep-durability-heat-resistant-materials-high-cycle-loading',
    year: 1984,
    defenceDate: '1984-12-30',
    authorEn: 'Vladislav P. Golub',
    sourceLanguage: 'ru',
    titleEn: 'Creep and Durability of Heat-Resistant Materials under High-Cycle Loading',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 30 December 1984. Doctoral dissertation in Technical Sciences. Kyiv, 1984.',
    pages: 373,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['creep', 'durability', 'heat-resistant materials', 'high-cycle loading']
  }),
  entry({
    id: 'golub-gp-1977-layered-orthotropic-shells-revolution-variable-stiffness',
    year: 1977,
    defenceDate: '1977-10-04',
    authorEn: 'G.P. Golub',
    sourceLanguage: 'ru',
    titleEn:
      'Solution of Static Problems for Layered Orthotropic Shells of Revolution with Variable Stiffness in a Refined Formulation',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 4 October 1977. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1977.',
    pages: 171,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['layered shells', 'orthotropic shells', 'variable stiffness', 'statics']
  }),
  entry({
    id: 'goncharenko-vladimir-1986-stability-large-scale-mechanical-system-rolling-structural-changes',
    year: 1986,
    defenceDate: '1986-02-11',
    authorEn: 'Vladimir I. Goncharenko',
    sourceLanguage: 'ru',
    titleEn: 'Stability of a Large-Scale Mechanical System with Rolling under Structural Changes',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 11 February 1986. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1986.',
    pages: 142,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['stability', 'large-scale mechanical systems', 'rolling', 'structural changes']
  }),
  entry({
    id: 'gorb-ml-1957-plastic-deformation-high-strength-steels-nonuniform-compression-temperature',
    year: 1957,
    defenceDate: '1957-05-07',
    authorEn: 'M.L. Gorb',
    sourceLanguage: 'ru',
    titleEn:
      'Resistance to Plastic Deformation of High-Strength Steels under Volumetric Nonuniform Compression at Elevated Temperatures',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 7 May 1957. Candidate dissertation in Technical Sciences. Kyiv, 1957.',
    pages: 189,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['plastic deformation', 'high-strength steels', 'nonuniform compression', 'elevated temperatures']
  })
];
