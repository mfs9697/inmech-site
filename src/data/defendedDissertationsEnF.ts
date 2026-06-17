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
const instituteConstructionMechanicsAsUkrSsr =
  'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const kirovohradNationalTechnicalUniversity =
  'Kirovohrad National Technical University, Ministry of Education and Science of Ukraine';
const tarasShevchenkoKyivStateUniversity = 'T.G. Shevchenko Kyiv State University';

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

export const defendedDissertationsEnF: DefendedDissertationEntryEn[] = [
  entry({
    id: 'feldman-aa-1948-stability-annular-plate-free-inner-edge-external-pressure',
    year: 1948,
    defenceDate: '1948-12-07',
    authorEn: 'A.A. Feldman',
    sourceLanguage: 'ru',
    titleEn: 'Stability of an Annular Plate with a Free Inner Edge under Uniform External Pressure',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 7 December 1948. Candidate dissertation in Technical Sciences. Kyiv, 1948.',
    pages: 165,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['annular plates', 'stability', 'external pressure']
  }),
  entry({
    id: 'fernati-pavlo-2006-nonlinear-creep-viscoelastic-unidirectional-fibrous-composites-tension',
    year: 2006,
    defenceDate: '2006-02-28',
    authorEn: 'Pavlo V. Fernati',
    sourceLanguage: 'uk',
    titleEn:
      'Nonlinear Creep of Viscoelastic Unidirectional Fibrous Composites and Their Components under Tension',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 February 2006. Candidate dissertation in Technical Sciences. Kyiv, 2005.',
    pages: 163,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['nonlinear creep', 'viscoelastic composites', 'fibrous composites', 'tension']
  }),
  entry({
    id: 'fialko-sergey-1982-initial-imperfections-natural-frequencies-ribbed-conical-shells',
    year: 1982,
    authorEn: 'Sergey Yu. Fialko',
    sourceLanguage: 'ru',
    titleEn:
      'Investigation of the Influence of Initial Imperfections on Natural Vibration Frequencies of Ribbed Conical Shells',
    degree: doctorTechnical,
    bibliographyEn: 'Defended in 1982. Doctoral dissertation in Technical Sciences. Kyiv, 1982.',
    pages: 157,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['initial imperfections', 'natural frequencies', 'ribbed conical shells']
  }),
  entry({
    id: 'filatov-mya-1969-fatigue-resistance-metals-loading-cycle-shape',
    year: 1969,
    defenceDate: '1969-03-04',
    authorEn: 'M.Ya. Filatov',
    sourceLanguage: 'ru',
    titleEn: 'Fatigue Resistance of Metals in Relation to the Shape of the Loading Cycle',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 4 March 1969. Candidate dissertation in Technical Sciences. Kyiv, 1968.',
    pages: 210,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fatigue resistance', 'metals', 'loading cycle']
  }),
  entry({
    id: 'filatov-eya-1963-operational-loading-durability-tractor-frames',
    year: 1963,
    defenceDate: '1963-02-05',
    authorEn: 'E.Ya. Filatov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Operational Loading and Assessment of Durability of Tractor Frames',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 5 February 1963. Candidate dissertation in Technical Sciences. Kyiv, 1962.',
    pages: 168,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['operational loading', 'durability assessment', 'tractor frames']
  }),
  entry({
    id: 'filippov-mya-1968-volterra-hadamard-methods-nonstationary-wave-dynamics',
    year: 1968,
    defenceDate: '1968-03-05',
    authorEn: 'M.Ya. Filippov',
    sourceLanguage: 'ru',
    titleEn: 'Application of Generalized Volterra and Hadamard Methods to Nonstationary Problems of Wave Dynamics',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 5 March 1968. Doctoral dissertation in Technical Sciences. Kyiv, 1966.',
    pages: 349,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['Volterra methods', 'Hadamard methods', 'wave dynamics', 'nonstationary problems']
  }),
  entry({
    id: 'filimonikhina-iryna-2010-nutation-angle-reduction-rotating-carrier-body-isolated-system',
    year: 2010,
    defenceDate: '2010-03-30',
    authorEn: 'Iryna I. Filimonikhina',
    sourceLanguage: 'uk',
    titleEn: 'Conditions for Reducing the Nutation Angle of a Rotating Carrier Body in an Isolated System',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 30 March 2010. Candidate dissertation in Physical and Mathematical Sciences. Kirovohrad, 2009.',
    pages: 127,
    placeEn: 'Kirovohrad',
    institutionEn: kirovohradNationalTechnicalUniversity,
    tags: ['rotating body', 'nutation angle', 'isolated system', 'theoretical mechanics']
  }),
  entry({
    id: 'filimonikhin-gennady-1991-dynamics-stability-pendulum-autobalancers-with-constraints',
    year: 1991,
    defenceDate: '1991-11-26',
    authorEn: 'Gennady B. Filimonikhin',
    sourceLanguage: 'ru',
    titleEn: 'Dynamics and Stability of Pendulum Autobalancers with Constraints Imposed on Pendulum Motions',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 26 November 1991. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1991.',
    pages: 142,
    placeEn: 'Kyiv',
    institutionEn: tarasShevchenkoKyivStateUniversity,
    tags: ['pendulum autobalancers', 'dynamics', 'stability', 'constraints']
  })
];
