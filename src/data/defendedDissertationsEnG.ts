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

const instituteMechanicsAssUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
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

export const defendedDissertationsEnG: DefendedDissertationEntryEn[] = [
  entry({
    id: 'gavrilenko-valery-1986-axisymmetric-bodies-compressible-fluid',
    year: 1986,
    defenceDate: '1986-11-11',
    authorEn: 'Valery V. Gavrilenko',
    sourceLanguage: 'ru',
    titleEn:
      'Determination of Nonstationary Loads and Stress-Strain State during Penetration of Axisymmetric Bodies into a Compressible Fluid',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 11 November 1986. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1986.',
    pages: 181,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['nonstationary loads', 'stress-strain state', 'compressible fluid']
  }),
  entry({
    id: 'gavrilenko-gd-1972-critical-loads-cylindrical-shells',
    year: 1972,
    defenceDate: '1972-03-28',
    authorEn: 'G.D. Gavrilenko',
    sourceLanguage: 'ru',
    titleEn:
      'Determination of Upper Critical Loads for Cylindrical Shells with Account of the Moment Character of the Precritical State',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 28 March 1972. Candidate dissertation in Technical Sciences. Kyiv, 1971.',
    pages: 184,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['cylindrical shells', 'critical loads', 'precritical state']
  }),
  entry({
    id: 'gavrilenko-georgy-1985-stability-ribbed-cylindrical-conical-shells',
    year: 1985,
    defenceDate: '1985-05-21',
    authorEn: 'Georgy D. Gavrilenko',
    sourceLanguage: 'ru',
    titleEn:
      'Stability of Thin-Walled Ribbed Cylindrical and Conical Shells under a Nonuniform Stress-Strain State',
    degree: doctorTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended on 21 May 1985. Doctoral dissertation in Technical Sciences. Kyiv, 1984.',
    pages: 386,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['stability', 'ribbed shells', 'cylindrical shells', 'conical shells']
  }),
  entry({
    id: 'havrylov-hryhorii-2002-aging-viscoelastic-anisotropic-fracture',
    year: 2002,
    defenceDate: '2002-05-28',
    authorEn: 'Hryhorii V. Havrylov',
    sourceLanguage: 'uk',
    titleEn:
      'Linear Problems of Fracture Mechanics for Aging Viscoelastic Anisotropic Materials under Constant External Loading',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 May 2002. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2002.',
    pages: 109,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['fracture mechanics', 'viscoelasticity', 'anisotropic materials', 'aging materials']
  }),
  entry({
    id: 'gavrilov-da-1969-metal-deformation-repeat-static-loading',
    year: 1969,
    defenceDate: '1969-06-10',
    authorEn: 'D.A. Gavrilov',
    sourceLanguage: 'ru',
    titleEn:
      'Study of Regularities in the Variation of Metal Deformation Characteristics under Repeated Static Loading',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 10 June 1969. Candidate dissertation in Technical Sciences. Kyiv, 1969.',
    pages: 163,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['metal deformation', 'repeated loading', 'static loading']
  }),
  entry({
    id: 'gavrilova-tatiana-1983-long-term-plasticity-strength-metallic-materials',
    year: 1983,
    authorEn: 'Tatiana F. Gavrilova',
    sourceLanguage: 'ru',
    titleEn:
      'Development of a Model of Long-Term Plasticity and Strength of Metallic Materials and an Integrated Method for Determining Equation-of-State Parameters',
    degree: candidatePhysical,
    bibliographyEn: 'Defended in 1983. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1983.',
    pages: 168,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['long-term plasticity', 'strength', 'metallic materials', 'constitutive modelling']
  }),
  entry({
    id: 'havrysh-np-1970-stress-concentration-composite-plate-holes',
    year: 1970,
    defenceDate: '1970-01-06',
    authorEn: 'N.P. Havrysh',
    sourceLanguage: 'ru',
    titleEn:
      'Stress Concentration around Holes in a Plate Made of an Elastic-Hereditary Composite Material',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 6 January 1970. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1968.',
    pages: 140,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['stress concentration', 'plates', 'composite materials', 'hereditary elasticity']
  }),
  entry({
    id: 'galatenko-grigory-1984-precritical-crack-growth-nonuniform-stress',
    year: 1984,
    authorEn: 'Grigory V. Galatenko',
    sourceLanguage: 'ru',
    titleEn: 'Precritical Crack Growth under a Nonuniform Stress Distribution ahead of the Crack Tip',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1984. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1984.',
    pages: 121,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['crack growth', 'precritical growth', 'fracture mechanics']
  }),
  entry({
    id: 'halishyn-oleksandr-2006-geometrically-nonlinear-thermoviscoplastic-shells-damage',
    year: 2006,
    defenceDate: '2006-06-20',
    authorEn: 'Oleksandr Z. Halishyn',
    sourceLanguage: 'uk',
    titleEn:
      'Axisymmetric Geometrically Nonlinear Thermo-Viscoelastoplastic State of Compound Shells with Allowance for Material Damage',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 20 June 2006. Doctoral dissertation in Technical Sciences. Kyiv, 2006.',
    pages: 319,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['compound shells', 'geometric nonlinearity', 'thermoviscoelastoplasticity', 'damage']
  }),
  entry({
    id: 'galushchak-ov-1973-stress-state-fiberglass-pressure-vessels-variable-thickness',
    year: 1973,
    defenceDate: '1973-02-27',
    authorEn: 'O.V. Galushchak',
    sourceLanguage: 'ru',
    titleEn:
      'Stress-State Analysis of Variable-Thickness Fiberglass Cylinders Weakened by a Circular Hole',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 27 February 1973. Candidate dissertation in Technical Sciences. Kyiv, 1972.',
    pages: 128,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAssUkrSsr,
    tags: ['fiberglass', 'stress analysis', 'variable thickness', 'circular holes']
  })
];
