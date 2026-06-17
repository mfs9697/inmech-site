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
const instituteMechanicsAsUkraine = 'Institute of Mechanics, Academy of Sciences of Ukraine';
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';

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

export const defendedDissertationsEnM2: DefendedDissertationEntryEn[] = [
  entry({
    id: 'makhort-filipp-1971-elastic-waves-bodies-initial-deformations',
    year: 1971,
    defenceDate: '1971-06-22',
    authorEn: 'Filipp G. Makhort',
    sourceLanguage: 'ru',
    titleEn: 'Propagation of Elastic Waves in Bodies with Initial Deformations',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 22 June 1971. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1971.',
    pages: 132,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastic waves', 'initial deformations', 'wave propagation']
  }),
  entry({
    id: 'makhort-filipp-1982-linearized-elastic-electromagnetoelastic-waves-predeformed-bodies',
    year: 1982,
    defenceDate: '1982-04-20',
    authorEn: 'Filipp G. Makhort',
    sourceLanguage: 'ru',
    titleEn:
      'Linearized Problems in the Theory of Propagation of Elastic and Electromagnetoelastic Waves in Predeformed Bodies',
    degree: doctorPhysical,
    bibliographyEn: 'Defended on 20 April 1982. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1981.',
    pages: 390,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['linearized wave theory', 'electromagnetoelastic waves', 'predeformed bodies']
  }),
  entry({
    id: 'matsner-vi-1979-vibrations-stability-cylindrical-shells-eccentric-ribs',
    year: 1979,
    defenceDate: '1979-05-29',
    authorEn: 'V.I. Matsner',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations and Stability of Cylindrical Shells with Eccentric Ribs',
    degree: candidateTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended on 29 May 1979. Candidate dissertation in Technical Sciences. Kyiv, 1978.',
    pages: 137,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['cylindrical shells', 'eccentric ribs', 'vibrations', 'stability']
  }),
  entry({
    id: 'medvedeva-zoya-1988-stress-state-inhomogeneous-transversely-isotropic-plates-holes',
    year: 1988,
    defenceDate: '1988-11-29',
    authorEn: 'Zoya A. Medvedeva',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Inhomogeneous Transversely Isotropic Plates with Holes',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 November 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1988.',
    pages: 144,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['transversely isotropic plates', 'inhomogeneous materials', 'holes', 'stress state']
  }),
  entry({
    id: 'medvedev-konstantin-1990-axisymmetric-electroelastic-waves-layered-cylinders',
    year: 1990,
    authorEn: 'Konstantin V. Medvedev',
    sourceLanguage: 'ru',
    titleEn: 'Propagation of Axisymmetric Electroelastic Waves in Layered Cylinders',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1990. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1990.',
    pages: 95,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['electroelastic waves', 'layered cylinders', 'axisymmetric waves']
  }),
  entry({
    id: 'medvedev-nikolai-1980-stability-optimization-orthotropic-shells-variable-thickness',
    year: 1980,
    defenceDate: '1980-01-29',
    authorEn: 'Nikolai G. Medvedev',
    sourceLanguage: 'ru',
    titleEn: 'Problems of Stability and Optimization of Orthotropic Shells of Variable Thickness',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 January 1980. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1979.',
    pages: 101,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['orthotropic shells', 'variable thickness', 'stability', 'optimization']
  }),
  entry({
    id: 'meish-volodymyr-1996-numerical-analysis-nonstationary-vibrations-shells-local-inhomogeneities',
    year: 1996,
    authorEn: 'Volodymyr F. Meish',
    sourceLanguage: 'uk',
    titleEn:
      'Numerical Analysis of Nonstationary Vibrations of Shells with Local Inhomogeneities: Classical and Nonclassical Theories',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1996. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1996.',
    pages: 349,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['nonstationary vibrations', 'shells', 'local inhomogeneities', 'numerical analysis']
  }),
  entry({
    id: 'meleshko-vv-1976-steady-vibrations-finite-piezoceramic-bodies',
    year: 1976,
    defenceDate: '1976-11-30',
    authorEn: 'V.V. Meleshko',
    sourceLanguage: 'ru',
    titleEn: 'Steady-State Vibrations of Piezoceramic Bodies of Finite Dimensions',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 30 November 1976. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1976.',
    pages: 170,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['piezoceramics', 'steady-state vibrations', 'finite bodies']
  }),
  entry({
    id: 'melikbekyan-armenak-1991-thermoelasticity-stochastic-composites-multidirectional-reinforcement',
    year: 1991,
    defenceDate: '1991-12-24',
    authorEn: 'Armenak Kh. Melikbekyan',
    sourceLanguage: 'ru',
    titleEn: 'Thermoelasticity of Stochastic Composites with Multidirectional Reinforcement',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 December 1991. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1991.',
    pages: 115,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkraine,
    tags: ['thermoelasticity', 'stochastic composites', 'multidirectional reinforcement']
  }),
  entry({
    id: 'melnyk-vsevolod-2021-forced-vibrations-conical-shells-variable-stiffness',
    year: 2021,
    defenceDate: '2021-06-08',
    authorEn: 'Vsevolod M. Melnyk',
    sourceLanguage: 'uk',
    titleEn: 'Forced Vibrations of Conical Shells of Variable Stiffness',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 8 June 2021. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04 — Mechanics of Deformable Solids. Registration no. 0421U000091.',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['conical shells', 'variable stiffness', 'forced vibrations']
  })
];
