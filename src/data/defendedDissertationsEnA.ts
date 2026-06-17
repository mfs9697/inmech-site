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

function entry(input: EntryInput): DefendedDissertationEntryEn {
  return {
    id: input.id,
    sortLetter: 'A',
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

export const defendedDissertationsEnA: DefendedDissertationEntryEn[] = [
  entry({
    id: 'abduganiev-1990-fluid-saturated-porous-media',
    year: 1990,
    defenceDate: '1990-02-27',
    authorEn: 'Abduvakil A. Abduganiev',
    sourceLanguage: 'ru',
    titleEn: 'Development of a Microstructural Theory of Fluid-Saturated Porous Media and Analysis of Wave Propagation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 February 1990. Candidate dissertation, specialty 01.02.04. Institute of Mechanics of the Academy of Sciences of the Ukrainian SSR. Tashkent, 1990. 149 pages.',
    pages: 149,
    placeEn: 'Tashkent',
    institutionEn: 'Institute of Mechanics of the Academy of Sciences of the Ukrainian SSR',
    tags: ['porous media', 'fluid-saturated media', 'wave propagation']
  }),
  entry({
    id: 'avramenko-liudmila-1989-rigid-body-orientation',
    year: 1989,
    defenceDate: '1989-05-30',
    authorEn: 'Liudmila G. Avramenko',
    sourceLanguage: 'ru',
    titleEn: 'Determination of the Orientation of a Rigid Body',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 30 May 1989. Candidate dissertation, specialty 01.02.01. Institute of Mechanics of the Academy of Sciences of the Ukrainian SSR. Kyiv, 1988. 106 pages.',
    pages: 106,
    placeEn: 'Kyiv',
    institutionEn: 'Institute of Mechanics of the Academy of Sciences of the Ukrainian SSR',
    tags: ['rigid body dynamics', 'orientation determination', 'theoretical mechanics']
  }),
  entry({
    id: 'avramenko-olga-2009-conical-shells-spline-approximation',
    year: 2009,
    authorEn: 'Olga A. Avramenko',
    sourceLanguage: 'ru',
    titleEn: 'Solution of Two-Dimensional Static Problems for Conical Shells in a Refined Formulation Based on Spline Approximations',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 2009. Candidate dissertation, specialty 01.02.04. S.P. Timoshenko Institute of Mechanics of the NAS of Ukraine. Kyiv, 2009. 181 pages.',
    pages: 181,
    placeEn: 'Kyiv',
    institutionEn: 'S.P. Timoshenko Institute of Mechanics of the NAS of Ukraine',
    tags: ['conical shells', 'spline approximation', 'shell statics']
  }),
  entry({
    id: 'avramenko-yulia-2014-orthotropic-toroidal-shells',
    year: 2014,
    defenceDate: '2014-05-27',
    authorEn: 'Yulia A. Avramenko',
    sourceLanguage: 'ru',
    titleEn: 'Determination of the Stress-Strain State of Orthotropic Toroidal Shells of Variable Thickness in a Refined Formulation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 May 2014. Candidate dissertation, specialty 01.02.04. Kyiv, 2014. 149 pages.',
    pages: 149,
    placeEn: 'Kyiv',
    tags: ['toroidal shells', 'orthotropic materials', 'stress-strain state']
  }),
  entry({
    id: 'azimov-1993-stochastic-systems-lyapunov-matrix-functions',
    year: 1993,
    authorEn: 'Rakhimzhan K. Azimov',
    sourceLanguage: 'ru',
    titleEn: 'Stability Analysis of Stochastic Systems Based on Lyapunov Matrix Functions',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended in 1993. Candidate dissertation, specialty 01.02.01. Institute of Mechanics of the Academy of Sciences of Ukraine. Kyiv, 1993. 149 pages.',
    pages: 149,
    placeEn: 'Kyiv',
    institutionEn: 'Institute of Mechanics of the Academy of Sciences of Ukraine',
    tags: ['stochastic systems', 'stability', 'Lyapunov functions']
  }),
  entry({
    id: 'akbarov-1981-two-fibres-elastic-matrix-stability',
    year: 1981,
    authorEn: 'Surkhay Jabbar oglu Akbarov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of the Stability of Two Fibres in an Elastic Matrix',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1981. Candidate dissertation, specialty 01.02.04. Institute of Mathematics and Mechanics of the Academy of Sciences of the Azerbaijan SSR. Baku, 1981. 179 pages.',
    pages: 179,
    placeEn: 'Baku',
    institutionEn: 'Institute of Mathematics and Mechanics of the Academy of Sciences of the Azerbaijan SSR',
    tags: ['fibres', 'elastic matrix', 'stability']
  }),
  entry({
    id: 'akbarov-1988-composites-curved-structures',
    year: 1988,
    defenceDate: '1988-11-29',
    authorEn: 'Surkhay Jabbar oglu Akbarov',
    sourceLanguage: 'ru',
    titleEn: 'Stress-Strain State in Composite Materials with Curved Structures: A Piecewise-Homogeneous Material Model',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 November 1988. Doctoral dissertation, specialty 01.02.04. Institute of Mechanics of the Academy of Sciences of the Ukrainian SSR. Kyiv, 1988. 473 pages.',
    pages: 473,
    placeEn: 'Kyiv',
    institutionEn: 'Institute of Mechanics of the Academy of Sciences of the Ukrainian SSR',
    tags: ['composite materials', 'curved structures', 'stress-strain state']
  }),
  entry({
    id: 'alekseeva-1977-flexible-plates-shells-rheology',
    year: 1977,
    defenceDate: '1977-06-28',
    authorEn: 'M.K. Alekseeva',
    sourceLanguage: 'ru',
    titleEn: 'Stress-Strain State of Flexible Plates and Shells under Different Rheological Relations and Loading Types',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 28 June 1977. Candidate dissertation. Institute of Mechanics of the Academy of Sciences of the Ukrainian SSR. Kyiv, 1977. 174 pages.',
    pages: 174,
    placeEn: 'Kyiv',
    institutionEn: 'Institute of Mechanics of the Academy of Sciences of the Ukrainian SSR',
    tags: ['plates', 'shells', 'rheology']
  }),
  entry({
    id: 'altukhov-2006-thick-multiply-connected-plates',
    year: 2006,
    defenceDate: '2006-06-20',
    authorEn: 'Evgeny V. Altukhov',
    sourceLanguage: 'ru',
    titleEn: 'Thermoelastic Problems for Thick Multiply Connected Plates',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 20 June 2006. Candidate dissertation, specialty 01.02.04. Institute of Applied Mathematics and Mechanics of the Academy of Sciences of the Ukrainian SSR. Donetsk, 1981. 114 pages. Source chronology requires verification.',
    pages: 114,
    placeEn: 'Donetsk',
    institutionEn: 'Institute of Applied Mathematics and Mechanics of the Academy of Sciences of the Ukrainian SSR',
    tags: ['thermoelasticity', 'multiply connected plates', 'source data check']
  }),
  entry({
    id: 'amiro-1951-spatial-frame-structures-floor-slabs',
    year: 1951,
    defenceDate: '1951-02-03',
    authorEn: 'I.Ya. Amiro',
    sourceLanguage: 'ru',
    titleEn: 'Calculation of Spatial Frame Structures Taking into Account the Action of Floor Slabs',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 3 February 1951. Candidate dissertation in Technical Sciences. Institute of Structural Mechanics of the Academy of Sciences of the Ukrainian SSR. Kyiv, 1950. 142 pages.',
    pages: 142,
    placeEn: 'Kyiv',
    institutionEn: 'Institute of Structural Mechanics of the Academy of Sciences of the Ukrainian SSR',
    tags: ['frame structures', 'floor slabs', 'structural mechanics']
  })
];
