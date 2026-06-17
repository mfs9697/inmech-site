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
  '01.02.04': { code: '01.02.04', en: 'Mechanics of Deformable Solids' },
  '05.02.07': { code: '05.02.07', en: 'Specialty 05.02.07' },
  '05.23.17': { code: '05.23.17', en: 'Structural Mechanics' }
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
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const instituteConstructionMechanicsUkrSsr = 'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const ukrainianTransportUniversity = 'Ukrainian Transport University, Ministry of Education of Ukraine';
const kaliningradTechnicalInstitute = 'Kaliningrad Technical Institute of the Fishing Industry and Economy';
const kpiUkraine = 'National Technical University of Ukraine “Kyiv Polytechnic Institute”';
const samarkandStateUniversity = 'Samarkand State University';
const bakulInstituteSuperhardMaterials = 'V.M. Bakul Institute for Superhard Materials, NAS of Ukraine';
const qarshiBranchTashkentIrrigation =
  'Qarshi Branch of the Tashkent Institute of Irrigation and Agricultural Mechanization Engineers';

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

export const defendedDissertationsEnD2: DefendedDissertationEntryEn[] = [
  entry({
    id: 'donaev-burkhon-1990-plane-wave-obstacles-elastoplastic-medium',
    year: 1990,
    defenceDate: '1990-12-11',
    authorEn: 'Burkhon Donaev',
    sourceLanguage: 'ru',
    titleEn: 'Interaction of a Plane Wave with Various Obstacles in an Elastoplastic Medium',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 11 December 1990. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1990.',
    pages: 150,
    placeEn: 'Kyiv',
    institutionEn: qarshiBranchTashkentIrrigation,
    tags: ['plane waves', 'obstacle interaction', 'elastoplastic medium']
  }),
  entry({
    id: 'dorodnykh-tatiana-1995-effective-electrical-properties-textured-polycrystalline-materials',
    year: 1995,
    defenceDate: '1995-11-21',
    authorEn: 'Tatiana I. Dorodnykh',
    sourceLanguage: 'ru',
    titleEn: 'Effective Electrical Properties of Textured Materials with Polycrystalline Structure',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 21 November 1995. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1995.',
    pages: 117,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['effective properties', 'textured materials', 'polycrystalline structure', 'electromechanics']
  }),
  entry({
    id: 'dorofeev-vladislav-1991-vibrations-shallow-rectangular-shell-rib-stiffeners',
    year: 1991,
    defenceDate: '1991-06-26',
    authorEn: 'Vladislav Yu. Dorofeev',
    sourceLanguage: 'ru',
    titleEn:
      'Vibrations of a Shallow Rectangular Shell Reinforced by a Regular System of Stiffening Ribs',
    degree: candidateTechnical,
    specialtyCode: '05.23.17',
    bibliographyEn: 'Defended on 26 June 1991. Candidate dissertation in Technical Sciences. Kaliningrad, 1990.',
    pages: 111,
    placeEn: 'Kaliningrad',
    institutionEn: kaliningradTechnicalInstitute,
    tags: ['shallow shells', 'vibrations', 'stiffening ribs', 'structural mechanics']
  }),
  entry({
    id: 'draigor-da-1956-wear-resistance-fatigue-strength-steel-processing-friction',
    year: 1956,
    defenceDate: '1956-12-04',
    authorEn: 'D.A. Draigor',
    sourceLanguage: 'ru',
    titleEn:
      'Wear Resistance and Fatigue Strength of Steel Depending on Processing Conditions and the Friction Process',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 4 December 1956. Doctoral dissertation in Technical Sciences. Kyiv, 1956.',
    pages: 210,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['wear resistance', 'fatigue strength', 'steel', 'friction']
  }),
  entry({
    id: 'draigor-nd-1979-numerical-solution-noncircular-cylindrical-shells-variable-stiffness',
    year: 1979,
    defenceDate: '1979-11-13',
    authorEn: 'N.D. Draigor',
    sourceLanguage: 'ru',
    titleEn:
      'Numerical Solution of Problems on the Deformation of Non-Circular Cylindrical Shells of Revolution with Variable Stiffness in Two Directions',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 13 November 1979. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1979.',
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['non-circular shells', 'variable stiffness', 'numerical methods']
  }),
  entry({
    id: 'dubinin-ad-1949-metal-wear-gear-calculation',
    year: 1949,
    defenceDate: '1949-06-17',
    authorEn: 'A.D. Dubinin',
    sourceLanguage: 'ru',
    titleEn: 'Study of Metal Wear as Applied to Gear Calculation',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 17 June 1949. Candidate dissertation in Technical Sciences. Kyiv, 1948.',
    pages: 116,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['metal wear', 'gears', 'machine elements']
  }),
  entry({
    id: 'dudinsky-viktor-1986-contact-problems-elasticity-inhomogeneous-half-space',
    year: 1986,
    defenceDate: '1986-03-18',
    authorEn: 'Viktor I. Dudinsky',
    sourceLanguage: 'ru',
    titleEn: 'Contact Problems of Elasticity Theory for an Inhomogeneous Half-Space',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 18 March 1986. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1985.',
    pages: 130,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['contact problems', 'elasticity theory', 'inhomogeneous half-space']
  }),
  entry({
    id: 'dusmatov-olimzhon-1988-dynamic-vibration-damping-elastic-systems',
    year: 1988,
    defenceDate: '1988-10-11',
    authorEn: 'Olimzhon M. Dusmatov',
    sourceLanguage: 'ru',
    titleEn:
      'Dynamic Vibration Damping of Elastic Systems with Concentrated and Distributed Parameters',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 11 October 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1988.',
    pages: 176,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['vibration damping', 'elastic systems', 'distributed parameters', 'theoretical mechanics']
  }),
  entry({
    id: 'dusmatov-olimzhon-1998-vibration-protection-systems-bond-graph-methods',
    year: 1998,
    defenceDate: '1998-07-07',
    authorEn: 'Olimzhon M. Dusmatov',
    sourceLanguage: 'ru',
    titleEn:
      'Mathematical Modelling and Investigation of Vibration-Protection Systems by Bond-Graph Methods',
    degree: doctorPhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 7 July 1998. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1998.',
    pages: 301,
    placeEn: 'Kyiv',
    institutionEn: `${kpiUkraine}; ${samarkandStateUniversity}`,
    tags: ['vibration protection', 'mathematical modelling', 'bond graphs', 'theoretical mechanics']
  }),
  entry({
    id: 'dutka-vasyl-1996-thermal-stress-state-graphite-dies-induction-heating',
    year: 1996,
    authorEn: 'Vasyl A. Dutka',
    sourceLanguage: 'uk',
    titleEn: 'Thermally Stressed State of Graphite Dies under Induction Heating',
    degree: doctorPhysical,
    specialtyCode: '05.02.07',
    bibliographyEn: 'Defended in 1996. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1996.',
    pages: 168,
    placeEn: 'Kyiv',
    institutionEn: bakulInstituteSuperhardMaterials,
    tags: ['thermal stresses', 'graphite dies', 'induction heating']
  })
];
