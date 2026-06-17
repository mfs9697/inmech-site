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
  '01.02.03': { code: '01.02.03', en: 'Specialty 01.02.03' },
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
const instituteSuperhardMaterialsNasUkraine = 'Institute for Superhard Materials, NAS of Ukraine';
const instituteMechanicsUkrSsr = 'Institute of Mechanics of the Ukrainian SSR';
const stateUniversityUkrSsr = 'State University, Ministry of Higher and Secondary Special Education of the Ukrainian SSR';

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

export const defendedDissertationsEnK3: DefendedDissertationEntryEn[] = [
  entry({
    id: 'kolodnitsky-vasily-1996-thermostress-thermal-resistance-brittle-cylindrical-prismatic-specimens',
    year: 1996,
    defenceDate: '1996-03-26',
    authorEn: 'Vasily N. Kolodnitsky',
    sourceLanguage: 'ru',
    titleEn:
      'Thermally Stressed State and Thermal Resistance of Cylindrical and Prismatic Specimens of Brittle Materials under Sharp Thermal Changes',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 March 1996. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1996.',
    pages: 175,
    placeEn: 'Kyiv',
    institutionEn: instituteSuperhardMaterialsNasUkraine,
    tags: ['thermal stresses', 'thermal resistance', 'brittle materials', 'thermal shock']
  }),
  entry({
    id: 'komissarova-gl-1963-stability-longitudinally-corrugated-cylindrical-shells-frames',
    year: 1963,
    defenceDate: '1963-06-11',
    authorEn: 'G.L. Komissarova',
    sourceLanguage: 'ru',
    titleEn:
      'Stability of Longitudinally Corrugated Cylindrical Shells, Unreinforced and Reinforced by Frames',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 11 June 1963. Candidate dissertation in Technical Sciences. Kyiv, 1963.',
    pages: 165,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['corrugated cylindrical shells', 'stability', 'frames']
  }),
  entry({
    id: 'konovalenko-vladimir-1986-stress-strain-circular-cutouts-composite-cylindrical-shells',
    year: 1986,
    defenceDate: '1986-12-30',
    authorEn: 'Vladimir V. Konovalenko',
    sourceLanguage: 'ru',
    titleEn:
      'Investigation of the Stress-Strain State near Circular Cutouts in Cylindrical Shells Made of Composite Materials',
    degree: candidateTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended on 30 December 1986. Candidate dissertation in Technical Sciences. Kyiv, 1986.',
    pages: 142,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['cylindrical shells', 'composites', 'circular cutouts', 'stress-strain state']
  }),
  entry({
    id: 'kononenko-vo-1949-fatigue-testing-machines-rotating-magnetic-field',
    year: 1949,
    defenceDate: '1949-06-28',
    authorEn: 'V.O. Kononenko',
    sourceLanguage: 'ru',
    titleEn: 'Machines for Fatigue Testing of Metals Based on the Use of a Rotating Magnetic Field',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 28 June 1949. Candidate dissertation in Technical Sciences. Kyiv, 1949.',
    pages: 126,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['fatigue testing', 'testing machines', 'magnetic field']
  }),
  entry({
    id: 'kononenko-vo-1954-self-oscillations-mechanical-systems-friction',
    year: 1954,
    defenceDate: '1954-02-02',
    authorEn: 'V.O. Kononenko',
    sourceLanguage: 'ru',
    titleEn: 'Self-Oscillations in Mechanical Systems Caused by Friction',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 2 February 1954. Doctoral dissertation in Technical Sciences. Kyiv, 1953.',
    pages: 278,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['self-oscillations', 'mechanical systems', 'friction']
  }),
  entry({
    id: 'konstantinov-ah-1966-statics-dynamics-conical-shells-nonclassical-formulation',
    year: 1966,
    defenceDate: '1966-01-25',
    authorEn: 'A.H. Konstantinov',
    sourceLanguage: 'ru',
    titleEn: 'Statics and Dynamics of Conical Shells in a Nonclassical Formulation',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 25 January 1966. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1965.',
    pages: 134,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['conical shells', 'statics', 'dynamics', 'nonclassical theory']
  }),
  entry({
    id: 'kontun-svetlana-1986-local-dynamic-effects-contact-interaction-elastic-bodies',
    year: 1986,
    defenceDate: '1986-09-09',
    authorEn: 'Svetlana S. Kontun',
    sourceLanguage: 'ru',
    titleEn: 'Local Dynamic Effects in Contact Interaction of Elastic Bodies',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 9 September 1986. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1986.',
    pages: 173,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['contact interaction', 'elastic bodies', 'local dynamic effects']
  }),
  entry({
    id: 'korzh-vitaliy-1989-stability-layered-bodies-surface-distributed-loads',
    year: 1989,
    defenceDate: '1989-10-03',
    authorEn: 'Vitaliy P. Korzh',
    sourceLanguage: 'ru',
    titleEn: 'Stability of Layered Bodies under Surface Distributed Loads',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 3 October 1989. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1989.',
    pages: 153,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['layered bodies', 'stability', 'distributed loads']
  }),
  entry({
    id: 'kornukhov-nv-1948-stability-stable-strength-rod-systems',
    year: 1948,
    defenceDate: '1948-05-03',
    authorEn: 'N.V. Kornukhov',
    sourceLanguage: 'ru',
    titleEn: 'Stability and Stable Strength of Rod Systems',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 3 May 1948. Doctoral dissertation in Technical Sciences. Kyiv, 1947.',
    pages: 801,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['rod systems', 'stability', 'strength']
  }),
  entry({
    id: 'korolevich-yus-1959-asymptotic-solution-conical-shell-linearly-variable-thickness-machine-elements',
    year: 1959,
    defenceDate: '1959-10-20',
    authorEn: 'Yu.S. Korolevich',
    sourceLanguage: 'ru',
    titleEn:
      'Asymptotic Solution for a Conical Shell of Linearly Variable Thickness and Its Application to Machine-Element Calculation',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 20 October 1959. Candidate dissertation in Technical Sciences. Kyiv, 1959.',
    pages: 189,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['conical shells', 'asymptotic methods', 'machine elements']
  }),
  entry({
    id: 'kosolapov-vi-1979-lyapunov-second-method-nonlinear-systems-integrable-approximation',
    year: 1979,
    defenceDate: '1979-11-13',
    authorEn: 'V.I. Kosolapov',
    sourceLanguage: 'ru',
    titleEn:
      'The Second Lyapunov Method in the Stability Problem for Nonlinear Systems with an Integrable Approximation',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 13 November 1979. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1979.',
    pages: 104,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['Lyapunov method', 'nonlinear systems', 'stability']
  }),
  entry({
    id: 'kostyuk-zd-1953-stress-state-turboblower-blades-moment-shell-theory',
    year: 1953,
    defenceDate: '1953-11-19',
    authorEn: 'Z.D. Kostyuk',
    sourceLanguage: 'ru',
    titleEn: 'Study of the Stress State of Turboblower Blades by the Moment Theory of Shells',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 19 November 1953. Candidate dissertation in Technical Sciences. Kyiv, 1953.',
    pages: 128,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['turboblower blades', 'moment shell theory', 'stress state']
  }),
  entry({
    id: 'kokhanenko-nv-1979-stress-strain-state-mine-working-near-face-zone',
    year: 1979,
    defenceDate: '1979-03-20',
    authorEn: 'N.V. Kokhanenko',
    sourceLanguage: 'ru',
    titleEn: 'Determination of the Stress-Strain State of a Mine Working in the Near-Face Zone',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 20 March 1979. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1978.',
    pages: 122,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['mine workings', 'near-face zone', 'stress-strain state']
  }),
  entry({
    id: 'kochnev-gennady-1991-electroelastic-axisymmetric-vibrations-piezoceramic-transformers',
    year: 1991,
    defenceDate: '1991-02-26',
    authorEn: 'Gennady P. Kochnev',
    sourceLanguage: 'ru',
    titleEn: 'Electroelastic Axisymmetric Vibrations of Piezoceramic Transformers',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 February 1991. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1990.',
    pages: 125,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsUkrSsr,
    tags: ['electroelasticity', 'piezoceramic transformers', 'axisymmetric vibrations']
  }),
  entry({
    id: 'koshevoy-ivan-1985-stability-layered-materials-generalized-shear-model',
    year: 1985,
    defenceDate: '1985-02-26',
    authorEn: 'Ivan K. Koshevoy',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Stability of Layered Materials Based on a Generalized Shear Model',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 February 1985. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1984.',
    pages: 148,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['layered materials', 'stability', 'generalized shear model']
  }),
  entry({
    id: 'koshman-vladimir-1983-dynamic-processes-elastic-half-space-initial-deformations-nonstationary-loading',
    year: 1983,
    defenceDate: '1983-09-06',
    authorEn: 'Vladimir P. Koshman',
    sourceLanguage: 'ru',
    titleEn:
      'Investigation of Dynamic Processes in an Elastic Half-Space with Initial Deformations under Nonstationary Loading',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 6 September 1983. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1983.',
    pages: 147,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastic half-space', 'initial deformations', 'nonstationary loading']
  }),
  entry({
    id: 'krapivnyi-yuri-1988-lyapunov-matrix-functions-asymptotic-stability-large-scale-systems',
    year: 1988,
    defenceDate: '1988-11-14',
    authorEn: 'Yuri N. Krapivnyi',
    sourceLanguage: 'ru',
    titleEn:
      'Methods for Constructing Lyapunov Matrix Functions and Estimating the Domain of Asymptotic Stability of Large-Scale Systems',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 14 November 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1988.',
    pages: 177,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['Lyapunov matrix functions', 'asymptotic stability', 'large-scale systems']
  }),
  entry({
    id: 'krasnopolskaya-ts-1977-resonance-elastic-systems-limited-excitation',
    year: 1977,
    defenceDate: '1977-06-28',
    authorEn: 'T.S. Krasnopolskaya',
    sourceLanguage: 'ru',
    titleEn: 'Resonance Phenomena in Elastic Systems with Limited Excitation',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 28 June 1977. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1977.',
    pages: 181,
    placeEn: 'Kyiv',
    institutionEn: stateUniversityUkrSsr,
    tags: ['resonance phenomena', 'elastic systems', 'limited excitation']
  }),
  entry({
    id: 'kryvoblotska-larysa-2006-nonlinear-bending-plate-with-hole',
    year: 2006,
    defenceDate: '2006-01-31',
    authorEn: 'Larysa M. Kryvoblotska',
    sourceLanguage: 'uk',
    titleEn: 'Nonlinear Bending of a Plate with a Hole',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 31 January 2006. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2005.',
    pages: 154,
    placeEn: 'Kyiv',
    institutionEn: 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine',
    tags: ['nonlinear bending', 'plates with holes', 'plate theory']
  }),
  entry({
    id: 'kryvoruchko-leonard-1980-shells-of-revolution-random-thermoelastic-characteristics',
    year: 1980,
    defenceDate: '1980-04-29',
    authorEn: 'Leonard D. Kryvoruchko',
    sourceLanguage: 'ru',
    titleEn:
      'Investigation of the Stress-Strain State of Shells of Revolution with Random Thermoelastic Characteristics',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 April 1980. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1980.',
    pages: 107,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['shells of revolution', 'random thermoelastic characteristics', 'stress-strain state']
  })
];
