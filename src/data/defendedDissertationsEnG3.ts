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

const instituteMechanicsAssUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const donetskStateUniversity = 'Donetsk State University';

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

export const defendedDissertationsEnG3: DefendedDissertationEntryEn[] = [
  entry({
    id: 'gordienko-viktor-petrovich-1987-diffraction-nonstationary-acoustic-waves-spherical-obstacles',
    year: 1987,
    defenceDate: '1987-02-24',
    authorEn: 'Viktor P. Gordienko',
    sourceLanguage: 'ru',
    titleEn:
      'Diffraction of Nonstationary Acoustic Pressure Waves by Spherical Obstacles near a Plane Boundary',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 February 1987. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1987.',
    pages: 98,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['acoustic waves', 'diffraction', 'spherical obstacles', 'plane boundary']
  }),
  entry({
    id: 'gordienko-viktor-ivanovich-1987-cylindrical-shells-internal-nonstationary-wave-sources',
    year: 1987,
    defenceDate: '1987-02-24',
    authorEn: 'Viktor I. Gordienko',
    sourceLanguage: 'ru',
    titleEn: 'Deformation of Cylindrical Shells under the Action of Internal Sources of Nonstationary Waves',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 February 1987. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1987.',
    pages: 190,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['cylindrical shells', 'nonstationary waves', 'internal sources']
  }),
  entry({
    id: 'gorelik-alla-1980-fracture-mechanics-viscoelastic-composite-materials',
    year: 1980,
    defenceDate: '1980-10-28',
    authorEn: 'Alla V. Gorelik',
    sourceLanguage: 'ru',
    titleEn: 'Linear Problems of Fracture Mechanics for Viscoelastic Composite Materials',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 October 1980. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1980.',
    pages: 112,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['fracture mechanics', 'viscoelastic composites', 'linear problems']
  }),
  entry({
    id: 'goroshko-ivan-1987-surface-magnetoelastic-waves-predeformed-bodies-curvilinear-boundary',
    year: 1987,
    defenceDate: '1987-05-26',
    authorEn: 'Ivan O. Goroshko',
    sourceLanguage: 'ru',
    titleEn:
      'Propagation of Surface Magnetoelastic Waves in Pre-Deformed Bodies with a Curvilinear Boundary',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 May 1987. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1986.',
    pages: 142,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['magnetoelastic waves', 'surface waves', 'pre-deformed bodies', 'curvilinear boundary']
  }),
  entry({
    id: 'goryanskaya-elena-1997-crack-theory-multiply-connected-anisotropic-bodies',
    year: 1997,
    authorEn: 'Elena S. Goryanskaya',
    sourceLanguage: 'ru',
    titleEn: 'Two-Dimensional Crack-Theory Problems for Multiply Connected Anisotropic Bodies',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1997. Candidate dissertation in Physical and Mathematical Sciences. Donetsk, 1997.',
    pages: 256,
    placeEn: 'Donetsk',
    institutionEn: donetskStateUniversity,
    tags: ['crack theory', 'multiply connected bodies', 'anisotropic bodies']
  }),
  entry({
    id: 'grachev-oleg-1984-stability-spherical-stiffened-shells-external-pressure',
    year: 1984,
    defenceDate: '1984-05-08',
    authorEn: 'Oleg A. Grachev',
    sourceLanguage: 'ru',
    titleEn: 'Stability of Spherically Stiffened Shells under External Pressure',
    degree: candidateTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended on 8 May 1984. Candidate dissertation in Technical Sciences. Kyiv, 1984.',
    pages: 172,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['stiffened shells', 'spherical shells', 'external pressure', 'stability']
  }),
  entry({
    id: 'hryhorieva-liudmyla-2007-axisymmetric-electroelastic-deformation-piezoceramic-cylinders',
    year: 2007,
    defenceDate: '2007-12-18',
    authorEn: 'Liudmyla O. Hryhorieva',
    sourceLanguage: 'uk',
    titleEn:
      'Numerical Analysis of Axisymmetric Electroelastic Deformation of Piezoceramic Cylinders under Dynamic Disturbances',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 18 December 2007. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2007.',
    pages: 216,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['electroelasticity', 'piezoceramic cylinders', 'axisymmetric deformation', 'dynamic disturbances']
  }),
  entry({
    id: 'grigorenko-alexander-1994-harmonic-oscillatory-wave-processes-anisotropic-inhomogeneous-bodies',
    year: 1994,
    defenceDate: '1994-11-30',
    authorEn: 'Alexander Ya. Grigorenko',
    sourceLanguage: 'ru',
    titleEn:
      'Harmonic Oscillatory and Wave Processes in Anisotropic Inhomogeneous Bodies with Cylindrical and Spherical Boundaries',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 30 November 1994. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1993.',
    pages: 243,
    placeEn: 'Kyiv',
    institutionEn: 'Institute of Mechanics, Academy of Sciences of Ukraine',
    tags: ['wave processes', 'anisotropic bodies', 'inhomogeneous bodies', 'cylindrical boundaries', 'spherical boundaries']
  })
];
