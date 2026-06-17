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

const instituteMechanicsAsUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const instituteConstructionMechanicsAsUkrSsr =
  'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const kirovohradNationalTechnicalUniversity =
  'Kirovohrad National Technical University, Ministry of Education and Science of Ukraine';
const instituteMechanicsAndTechnicalMechanicsAsUkrSsr =
  'Institute of Mechanics and Technical Mechanics, Academy of Sciences of the Ukrainian SSR';

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

export const defendedDissertationsEnP2: DefendedDissertationEntryEn[] = [
  entry({
    id: 'pestrikov-viktor-1983-precritical-crack-growth-aging-viscoelastic-materials',
    year: 1983,
    defenceDate: '1983-11-15',
    authorEn: 'Viktor M. Pestrikov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Precritical Crack Growth in Aging Viscoelastic Materials',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 15 November 1983. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1983.',
    pages: 180,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['crack growth', 'aging viscoelastic materials', 'fracture mechanics']
  }),
  entry({
    id: 'petrenko-ip-1957-annealing-endurance-limit-plastically-deformed-steel',
    year: 1957,
    defenceDate: '1957-06-25',
    authorEn: 'I.P. Petrenko',
    sourceLanguage: 'ru',
    titleEn: 'Influence of Annealing on the Endurance Limit of Plastically Deformed Steel',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 25 June 1957. Candidate dissertation in Technical Sciences. Kyiv, 1957.',
    pages: 170,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['annealing', 'endurance limit', 'plastically deformed steel']
  }),
  entry({
    id: 'petrushenko-irina-1988-stress-state-orthotropic-cylindrical-shell-circular-hole-physical-nonlinearity',
    year: 1988,
    defenceDate: '1988-11-14',
    authorEn: 'Irina E. Petrushenko',
    sourceLanguage: 'ru',
    titleEn:
      'Stress State of an Orthotropic Cylindrical Shell with a Circular Hole Considering Physically Nonlinear Material Properties',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 14 November 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1988.',
    pages: 119,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['orthotropic cylindrical shells', 'circular holes', 'physical nonlinearity']
  }),
  entry({
    id: 'pinsker-gm-1965-ultimate-state-steel-frames-bending-torsion',
    year: 1965,
    defenceDate: '1965-03-16',
    authorEn: 'G.M. Pinsker',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of the Ultimate State of Steel Frames under Bending with Torsion',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 16 March 1965. Candidate dissertation in Technical Sciences. Kyiv, 1964.',
    pages: 168,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['steel frames', 'bending with torsion', 'ultimate state']
  }),
  entry({
    id: 'pyrohov-volodymyr-2014-balancing-rotating-carrier-body-pendulums-isolated-system',
    year: 2014,
    defenceDate: '2014-04-15',
    authorEn: 'Volodymyr V. Pyrohov',
    sourceLanguage: 'uk',
    titleEn: 'Features of Balancing a Rotating Carrier Body by Pendulums in an Isolated System',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 15 April 2014. Candidate dissertation in Physical and Mathematical Sciences. Kirovohrad, 2014.',
    pages: 180,
    placeEn: 'Kirovohrad',
    institutionEn: kirovohradNationalTechnicalUniversity,
    tags: ['rotating body', 'pendulum balancing', 'isolated system']
  }),
  entry({
    id: 'pirozhenko-alexander-1990-two-connected-bodies-elastic-unilateral-constraint-newtonian-field',
    year: 1990,
    defenceDate: '1990-12-25',
    authorEn: 'Alexander V. Pirozhenko',
    sourceLanguage: 'ru',
    titleEn: 'Motion of a System of Two Connected Bodies with an Elastic Unilateral Constraint in a Newtonian Force Field',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 25 December 1990. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1990.',
    pages: 147,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAndTechnicalMechanicsAsUkrSsr,
    tags: ['two-body systems', 'elastic unilateral constraint', 'Newtonian force field']
  }),
  entry({
    id: 'pisarenko-gs-1948-forced-vibrations-elastic-systems-energy-dissipation-material',
    year: 1948,
    defenceDate: '1948-06-29',
    authorEn: 'G.S. Pisarenko',
    sourceLanguage: 'ru',
    titleEn: 'Forced Vibrations of Elastic Systems Considering Energy Dissipation in the Material',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 29 June 1948. Doctoral dissertation in Technical Sciences. Kyiv, 1948.',
    pages: 284,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['forced vibrations', 'elastic systems', 'energy dissipation']
  }),
  entry({
    id: 'piskun-vv-1970-elastoplastic-stress-strain-cylindrical-shell-nonisothermal-loading',
    year: 1970,
    defenceDate: '1970-10-20',
    authorEn: 'V.V. Piskun',
    sourceLanguage: 'ru',
    titleEn: 'Elastic-Plastic Stress-Strain State of a Cylindrical Shell under Nonisothermal Loading',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 20 October 1970. Candidate dissertation in Technical Sciences. Kyiv, 1970.',
    pages: 135,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['cylindrical shells', 'elastic-plastic deformation', 'nonisothermal loading']
  }),
  entry({
    id: 'pohrebniak-anatolii-2019-fatigue-durability-structural-materials-combined-static-cyclic-loading',
    year: 2019,
    defenceDate: '2019-10-22',
    authorEn: 'Anatolii D. Pohrebniak',
    sourceLanguage: 'uk',
    titleEn:
      'Experimental Study and Development of Methods for Predicting Durability of Structural Materials Due to Fatigue under Combined Static and Cyclic Loading',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 22 October 2019. Doctoral dissertation in Technical Sciences, specialty 01.02.04 — Mechanics of Deformable Solids. Registration no. 0519U001189.',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['fatigue durability', 'structural materials', 'combined loading', 'cyclic loading']
  })
];
