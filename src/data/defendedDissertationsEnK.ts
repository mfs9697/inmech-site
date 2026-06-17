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

const instituteMechanicsAsUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsAsUkraine = 'Institute of Mechanics, Academy of Sciences of Ukraine';
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const instituteConstructionMechanicsUkrSsr = 'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const kuibyshevAviationInstitute = 'S.P. Korolev Kuibyshev Aviation Institute';

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

export const defendedDissertationsEnK: DefendedDissertationEntryEn[] = [
  entry({
    id: 'kabysh-yurii-2004-elasticity-two-component-stochastic-composites-inhomogeneous-deformation',
    year: 2004,
    defenceDate: '2004-09-28',
    authorEn: 'Yurii M. Kabysh',
    sourceLanguage: 'uk',
    titleEn:
      'Study of Elasticity Problems for Two-Component Stochastic Composites Based on a Static Model of Inhomogeneous Deformation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 September 2004. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2004.',
    pages: 133,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['elasticity', 'stochastic composites', 'inhomogeneous deformation']
  }),
  entry({
    id: 'kaminsky-aa-1964-critical-loads-curvilinear-holes-cracks',
    year: 1964,
    defenceDate: '1964-12-15',
    authorEn: 'A.A. Kaminsky',
    sourceLanguage: 'ru',
    titleEn: 'Determination of Critical Loads for Domains Weakened by Curvilinear Holes with Cracks',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 15 December 1964. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1964.',
    pages: 102,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['critical loads', 'curvilinear holes', 'cracks', 'fracture mechanics']
  }),
  entry({
    id: 'kaminsky-aa-1978-fracture-durability-elastic-viscoelastic-bodies-cracks',
    year: 1978,
    defenceDate: '1978-04-25',
    authorEn: 'A.A. Kaminsky',
    sourceLanguage: 'ru',
    titleEn: 'Fracture and Durability of Elastic and Viscoelastic Bodies with Cracks',
    degree: doctorPhysical,
    bibliographyEn: 'Defended on 25 April 1978. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1977.',
    pages: 217,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fracture mechanics', 'durability', 'elastic bodies', 'viscoelastic bodies', 'cracks']
  }),
  entry({
    id: 'karimzhanov-abdulaziz-1985-lyapunov-second-method-unsteady-motion-stability-auxiliary-systems',
    year: 1985,
    defenceDate: '1985-10-29',
    authorEn: 'Abdulaziz Karimzhanov',
    sourceLanguage: 'ru',
    titleEn:
      'Development of Lyapunov’s Second Method for Studying Stability of Unsteady Motions Based on Auxiliary Systems',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 29 October 1985. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1985.',
    pages: 130,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['Lyapunov method', 'stability', 'unsteady motion', 'auxiliary systems']
  }),
  entry({
    id: 'karlash-valery-1976-steady-vibrations-thin-piezoceramic-plates-shells',
    year: 1976,
    defenceDate: '1976-10-19',
    authorEn: 'Valery L. Karlash',
    sourceLanguage: 'ru',
    titleEn: 'Study of Steady-State Vibrations of Thin Plates and Shells Made of Piezoceramics',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 19 October 1976. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1976.',
    pages: 199,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['steady-state vibrations', 'thin plates', 'shells', 'piezoceramics']
  }),
  entry({
    id: 'karlash-valerii-2004-electromechanical-resonant-vibrations-energy-conversion-piezoceramic-elements',
    year: 2004,
    defenceDate: '2004-09-28',
    authorEn: 'Valerii L. Karlash',
    sourceLanguage: 'uk',
    titleEn:
      'Experimental-Theoretical Analysis of Electromechanical Resonant Vibrations and Energy-Conversion Efficiency in Piezoceramic Thin-Walled Structural Elements',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 September 2004. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 2004.',
    pages: 354,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['electromechanical vibrations', 'resonance', 'energy conversion', 'piezoceramic elements']
  }),
  entry({
    id: 'karnaukhov-vasily-1964-vibrations-stability-conical-shells',
    year: 1964,
    defenceDate: '1964-06-16',
    authorEn: 'Vasily G. Karnaukhov',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations and Stability of Conical Shells',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 16 June 1964. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1964.',
    pages: 181,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['conical shells', 'vibrations', 'stability']
  }),
  entry({
    id: 'karnaukhov-vasily-1980-coupled-quasistatic-dynamic-thermoviscoelasticity',
    year: 1980,
    authorEn: 'Vasily G. Karnaukhov',
    sourceLanguage: 'ru',
    titleEn: 'Coupled Quasistatic and Dynamic Problems of Thermoviscoelasticity',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1980. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1980.',
    pages: 466,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermoviscoelasticity', 'coupled problems', 'quasistatics', 'dynamics']
  }),
  entry({
    id: 'karpova-oa-1970-anisotropic-two-layer-cylindrical-shells',
    year: 1970,
    defenceDate: '1970-01-06',
    authorEn: 'O.A. Karpova',
    sourceLanguage: 'ru',
    titleEn: 'On the Theory of Anisotropic Two-Layer Cylindrical Shells',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 6 January 1970. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1968.',
    pages: 184,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['anisotropic shells', 'two-layer shells', 'cylindrical shells']
  }),
  entry({
    id: 'kartashov-gennady-1985-free-vibrations-layered-anisotropic-plates-open-shells-composites',
    year: 1985,
    defenceDate: '1985-09-07',
    authorEn: 'Gennady G. Kartashov',
    sourceLanguage: 'ru',
    titleEn:
      'Free Vibrations of Layered Anisotropic Plates and Open Shells Made of Composite Materials',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 7 September 1985. Candidate dissertation in Technical Sciences. Kuibyshev, 1985.',
    pages: 209,
    placeEn: 'Kuibyshev',
    institutionEn: kuibyshevAviationInstitute,
    tags: ['free vibrations', 'layered plates', 'anisotropic shells', 'composite materials']
  }),
  entry({
    id: 'karshiev-abduvali-1990-nonstationary-interaction-shallow-ribbed-spherical-shells-fluid',
    year: 1990,
    authorEn: 'Abduvali B. Karshiev',
    sourceLanguage: 'ru',
    titleEn: 'Nonstationary Interaction of Shallow Ribbed Spherical Shells with a Fluid',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1990. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1990.',
    pages: 117,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkraine,
    tags: ['nonstationary interaction', 'ribbed spherical shells', 'fluid-structure interaction']
  }),
  entry({
    id: 'kachaenko-olga-1991-vibrations-electroacoustic-sensitivity-piezoceramic-cylindrical-shells-fluid',
    year: 1991,
    defenceDate: '1991-12-10',
    authorEn: 'Olga B. Kachaenko',
    sourceLanguage: 'ru',
    titleEn:
      'Vibrations and Electroacoustic Sensitivity of Piezoceramic Cylindrical Shells in a Fluid',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 10 December 1991. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1991.',
    pages: 112,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkraine,
    tags: ['piezoceramic shells', 'electroacoustic sensitivity', 'vibrations', 'fluid']
  }),
  entry({
    id: 'kashtalyan-maria-1992-three-dimensional-stress-strain-state-inhomogeneous-anisotropic-variable-thickness-plates',
    year: 1992,
    defenceDate: '1992-10-27',
    authorEn: 'Maria Yu. Kashtalyan',
    sourceLanguage: 'ru',
    titleEn:
      'Three-Dimensional Stress-Strain State of Inhomogeneous and Anisotropic Plates of Variable Thickness',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 October 1992. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1992.',
    pages: 147,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['three-dimensional stress-strain state', 'anisotropic plates', 'variable thickness']
  }),
  entry({
    id: 'kayuk-yf-1963-stress-concentration-flexible-doubly-connected-plates-postcritical-stage',
    year: 1963,
    defenceDate: '1963-04-23',
    authorEn: 'Ya.F. Kayuk',
    sourceLanguage: 'ru',
    titleEn:
      'Stress Concentration near Flexible Doubly Connected Plates in the Postcritical Stage',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 23 April 1963. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1962.',
    pages: 127,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stress concentration', 'flexible plates', 'postcritical stage']
  }),
  entry({
    id: 'kayuk-yf-1975-geometrically-nonlinear-problems-plates-shells-methods',
    year: 1975,
    defenceDate: '1975-05-27',
    authorEn: 'Ya.F. Kayuk',
    sourceLanguage: 'ru',
    titleEn: 'Some Geometrically Nonlinear Problems of Plate and Shell Theory and Methods for Their Solution',
    degree: doctorPhysical,
    bibliographyEn: 'Defended on 27 May 1975. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1975.',
    pages: 270,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['geometrically nonlinear problems', 'plate theory', 'shell theory']
  }),
  entry({
    id: 'kedik-taras-1991-comparison-method-stability-hybrid-systems',
    year: 1991,
    defenceDate: '1991-12-17',
    authorEn: 'Taras V. Kedik',
    sourceLanguage: 'ru',
    titleEn: 'Application of the Comparison Method to the Stability Analysis of Hybrid Systems',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 17 December 1991. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1991.',
    pages: 159,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkraine,
    tags: ['comparison method', 'stability analysis', 'hybrid systems']
  }),
  entry({
    id: 'kekukh-sergey-1989-subcritical-crack-growth-linear-viscoelastic-composites-anisotropy-long-term-loading',
    year: 1989,
    defenceDate: '1989-12-26',
    authorEn: 'Sergey A. Kekukh',
    sourceLanguage: 'ru',
    titleEn:
      'Subcritical Crack Growth in Linear Viscoelastic Composite Materials with Different Anisotropy under Long-Term Constant Loading',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 December 1989. Candidate dissertation in Technical Sciences. Kyiv, 1989.',
    pages: 205,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['subcritical crack growth', 'viscoelastic composites', 'anisotropy', 'long-term loading']
  }),
  entry({
    id: 'kepenach-nataliia-2015-dynamics-reinforced-cylindrical-shells-elliptical-cross-section-nonstationary-loads',
    year: 2015,
    defenceDate: '2015-10-27',
    authorEn: 'Nataliia P. Kepenach',
    sourceLanguage: 'uk',
    titleEn: 'Dynamics of Reinforced Cylindrical Shells of Elliptical Cross-Section under Nonstationary Loads',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 October 2015. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 2015.',
    pages: 133,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['reinforced cylindrical shells', 'elliptical cross-section', 'nonstationary loads', 'dynamics']
  }),
  entry({
    id: 'kilchinskaya-ga-1963-dynamic-processes-cylindrical-shells-nonstationary-temperature-field',
    year: 1963,
    defenceDate: '1963-05-07',
    authorEn: 'G.A. Kilchinskaya',
    sourceLanguage: 'ru',
    titleEn: 'Study of Dynamic Processes in Cylindrical Shells in a Nonstationary Temperature Field',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 7 May 1963. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1962.',
    pages: 97,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['dynamic processes', 'cylindrical shells', 'nonstationary temperature field']
  }),
  entry({
    id: 'kilchinsky-aa-1969-stress-strain-state-fiberglass-shells-rheonomic-properties',
    year: 1969,
    defenceDate: '1969-01-14',
    authorEn: 'A.A. Kilchinsky',
    sourceLanguage: 'ru',
    titleEn: 'Study of the Stress and Strain State of Fiberglass Shells Accounting for Rheonomic Properties',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 14 January 1969. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1968.',
    pages: 211,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fiberglass shells', 'stress-strain state', 'rheonomic properties']
  })
];
