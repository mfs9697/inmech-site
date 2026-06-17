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
  '01.02.04': { code: '01.02.04', en: 'Mechanics of Deformable Solids' },
  '01.02.05': { code: '01.02.05', en: 'Mechanics of Fluid, Gas and Plasma' }
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
const dniproRailwayTransportInstitute =
  'Dnipropetrovsk Institute of Railway Transport Engineers, Ministry of Transport of Ukraine';

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

export const defendedDissertationsEnK4: DefendedDissertationEntryEn[] = [
  entry({
    id: 'kryzhanovskaya-tatiana-1988-stress-state-flexible-anisotropic-shells-axisymmetric-deformation',
    year: 1988,
    defenceDate: '1988-09-27',
    authorEn: 'Tatiana V. Kryzhanovskaya',
    sourceLanguage: 'ru',
    titleEn:
      'Stress State of Flexible Anisotropic Shells of Revolution under Axisymmetric Deformation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 September 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1988.',
    pages: 177,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['anisotropic shells', 'axisymmetric deformation', 'stress state']
  }),
  entry({
    id: 'kritsuk-aa-1957-fiber-inclination-long-term-resistance-pine-wood-compression',
    year: 1957,
    defenceDate: '1957-05-28',
    authorEn: 'A.A. Kritsuk',
    sourceLanguage: 'ru',
    titleEn: 'Influence of Fibre Inclination on the Long-Term Resistance of Pine Wood under Compression',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 28 May 1957. Candidate dissertation in Technical Sciences. Kyiv, 1956.',
    pages: 188,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['wood mechanics', 'compression', 'long-term resistance']
  }),
  entry({
    id: 'kryshko-evgeny-1994-dynamics-coupled-asymmetric-bodies-constant-variable-mass',
    year: 1994,
    defenceDate: '1994-05-31',
    authorEn: 'Evgeny P. Kryshko',
    sourceLanguage: 'ru',
    titleEn: 'Dynamics of a System of Coupled Asymmetric Bodies of Constant and Variable Mass',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 31 May 1994. Candidate dissertation in Physical and Mathematical Sciences. Dnipropetrovsk, 1993.',
    pages: 153,
    placeEn: 'Dnipropetrovsk',
    institutionEn: dniproRailwayTransportInstitute,
    tags: ['dynamics', 'asymmetric bodies', 'variable mass systems']
  }),
  entry({
    id: 'kryukov-nikolai-1970-stress-state-medium-thickness-shells-revolution',
    year: 1970,
    defenceDate: '1970-05-19',
    authorEn: 'Nikolai N. Kryukov',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Medium-Thickness Shells of Revolution',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 19 May 1970. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1970.',
    pages: 151,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['shells of revolution', 'medium-thickness shells', 'stress state']
  }),
  entry({
    id: 'kryukov-nikolai-1986-numerical-solution-stress-strain-flexible-thin-walled-elements',
    year: 1986,
    authorEn: 'Nikolai N. Kryukov',
    sourceLanguage: 'ru',
    titleEn:
      'Numerical Solution of Problems on the Stress-Strain State of Flexible Thin-Walled Structural Elements',
    degree: doctorTechnical,
    bibliographyEn: 'Defended in 1986. Doctoral dissertation in Technical Sciences. Kyiv, 1986.',
    pages: 466,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thin-walled structures', 'stress-strain state', 'numerical methods']
  }),
  entry({
    id: 'kubenko-vd-1966-dynamic-stress-concentration-near-holes',
    year: 1966,
    defenceDate: '1966-01-04',
    authorEn: 'V.D. Kubenko',
    sourceLanguage: 'ru',
    titleEn: 'Some Dynamic Problems of Stress Concentration near Holes',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 4 January 1966. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1965.',
    pages: 167,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stress concentration', 'holes', 'dynamic problems']
  }),
  entry({
    id: 'kuznetsov-yun-1957-bar-equal-resistance-longitudinal-transverse-bending',
    year: 1957,
    defenceDate: '1957-05-28',
    authorEn: 'Yu.N. Kuznetsov',
    sourceLanguage: 'ru',
    titleEn: 'A Bar of Equal Resistance to Longitudinal-Transverse Bending',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 28 May 1957. Candidate dissertation in Technical Sciences. Kyiv, 1956.',
    pages: 148,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['bars', 'bending', 'equal resistance']
  }),
  entry({
    id: 'kuzma-alexander-1990-interaction-spherical-bodies-cylindrical-cavity-incompressible-fluid-vibration',
    year: 1990,
    authorEn: 'Alexander V. Kuzma',
    sourceLanguage: 'ru',
    titleEn:
      'Interaction of Spherical Bodies in a Cylindrical Cavity with an Incompressible Fluid under Vibration',
    degree: candidatePhysical,
    specialtyCode: '01.02.05',
    bibliographyEn: 'Defended in 1990. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1990.',
    pages: 128,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fluid-structure interaction', 'spherical bodies', 'vibration', 'incompressible fluid']
  }),
  entry({
    id: 'kuzma-vm-1965-dynamic-instability-elastic-systems-randomly-varying-parameters',
    year: 1965,
    defenceDate: '1965-06-29',
    authorEn: 'V.M. Kuzma',
    sourceLanguage: 'ru',
    titleEn: 'On Dynamic Instability of Elastic Systems with Randomly Varying Parameters',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 29 June 1965. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1965.',
    pages: 152,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['dynamic instability', 'elastic systems', 'random parameters']
  }),
  entry({
    id: 'kurchakov-evgeny-1982-deformation-stress-relation-nonlinear-anisotropic-body',
    year: 1982,
    authorEn: 'Evgeny E. Kurchakov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of the Deformation-Stress Relation for a Nonlinear Anisotropic Body',
    degree: candidateTechnical,
    bibliographyEn: 'Defended in 1982. Candidate dissertation in Technical Sciences. Kyiv, 1982.',
    pages: 134,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['nonlinear anisotropic body', 'deformation-stress relation', 'constitutive modelling']
  }),
  entry({
    id: 'kurchakov-evgeny-1987-equations-state-nonlinear-anisotropic-body',
    year: 1987,
    defenceDate: '1987-05-26',
    authorEn: 'Evgeny E. Kurchakov',
    sourceLanguage: 'ru',
    titleEn:
      'Construction and Experimental Substantiation of Equations of State for a Nonlinear Anisotropic Body',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 May 1987. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1987.',
    pages: 130,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['equations of state', 'nonlinear anisotropic body', 'experimental substantiation']
  }),
  entry({
    id: 'kuyun-ai-1954-thermal-phenomena-metal-surface-layers-friction-wear-cutting-grinding',
    year: 1954,
    defenceDate: '1954-10-19',
    authorEn: 'A.I. Kuyun',
    sourceLanguage: 'ru',
    titleEn:
      'A Comprehensive Method for Studying Thermal Phenomena in Surface Metal Layers during Friction, Wear, Cutting and Grinding',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 19 October 1954. Candidate dissertation in Technical Sciences. Kyiv, 1954.',
    pages: 132,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['thermal phenomena', 'surface metal layers', 'friction', 'wear', 'grinding']
  }),
  entry({
    id: 'kuyun-ai-1960-thermal-phenomena-metal-surface-layers-friction-wear-grinding',
    year: 1960,
    defenceDate: '1960-12-19',
    authorEn: 'A.I. Kuyun',
    sourceLanguage: 'ru',
    titleEn: 'Thermal Phenomena in Surface Metal Layers during Friction, Wear and Grinding',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 19 December 1960. Candidate dissertation in Technical Sciences. Kyiv, 1960.',
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermal phenomena', 'friction', 'wear', 'grinding']
  })
];
