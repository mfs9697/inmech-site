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

export const defendedDissertationsEnN: DefendedDissertationEntryEn[] = [
  entry({
    id: 'nazarenko-volodymyr-1988-fracture-mechanics-compression-interacting-cracks',
    year: 1988,
    defenceDate: '1988-10-25',
    authorEn: 'Volodymyr M. Nazarenko',
    sourceLanguage: 'ru',
    titleEn: 'Problems of Fracture Mechanics of Materials under Compression along Interacting Cracks',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 October 1988. Doctoral dissertation in Technical Sciences. Kyiv, 1988.',
    pages: 338,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fracture mechanics', 'compression', 'interacting cracks']
  }),
  entry({
    id: 'nazarenko-lidia-1990-thermoelasticity-stochastic-composites-anisotropic-components',
    year: 1990,
    authorEn: 'Lidia V. Nazarenko',
    sourceLanguage: 'ru',
    titleEn: 'Thermoelasticity of Stochastic Composites with Anisotropic Components',
    degree: candidatePhysical,
    bibliographyEn: 'Defended in 1990. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1990.',
    pages: 175,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermoelasticity', 'stochastic composites', 'anisotropic components']
  }),
  entry({
    id: 'nazarenko-lidia-2009-coupled-deformation-damage-models-anisotropic-composite-materials-stochastic-structure',
    year: 2009,
    defenceDate: '2009-09-29',
    authorEn: 'Lidia V. Nazarenko',
    sourceLanguage: 'ru',
    titleEn:
      'Models of Coupled Deformation and Damage of Anisotropic Composite Materials with Stochastic Structure',
    degree: doctorPhysical,
    bibliographyEn: 'Defended on 29 September 2009. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 2009.',
    pages: 318,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['composite materials', 'damage modelling', 'anisotropy', 'stochastic structure']
  }),
  entry({
    id: 'nemish-yun-1967-plane-problem-couple-stress-elasticity-regions-with-hole',
    year: 1967,
    defenceDate: '1967-03-21',
    authorEn: 'Yu.N. Nemish',
    sourceLanguage: 'ru',
    titleEn: 'Plane Problem of the Moment Theory of Elasticity for Domains with a Hole',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 21 March 1967. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1966.',
    pages: 159,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['moment theory of elasticity', 'plane problems', 'domains with holes']
  }),
  entry({
    id: 'nemish-yun-1979-spatial-elasticity-problems-noncanonical-domains',
    year: 1979,
    defenceDate: '1979-06-10',
    authorEn: 'Yu.N. Nemish',
    sourceLanguage: 'ru',
    titleEn: 'Spatial Problems of Elasticity Theory for Noncanonical Domains',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 10 June 1979. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1978.',
    pages: 389,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elasticity theory', 'noncanonical domains', 'spatial problems']
  }),
  entry({
    id: 'nikitina-nelly-1977-chaplygin-nonholonomic-systems-release-constraints-motion',
    year: 1977,
    defenceDate: '1977-02-22',
    authorEn: 'Nelly V. Nikitina',
    sourceLanguage: 'ru',
    titleEn: 'Dynamics of Chaplygin Nonholonomic Systems when Released from Some Constraints during Motion',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 22 February 1977. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1976.',
    pages: 117,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['nonholonomic systems', 'Chaplygin systems', 'dynamics']
  }),
  entry({
    id: 'nikitina-nelly-2000-regularity-quasi-chaos-nonlinear-mechanical-systems-oscillations',
    year: 2000,
    defenceDate: '2000-05-30',
    authorEn: 'Nelly V. Nikitina',
    sourceLanguage: 'ru',
    titleEn: 'Analysis of Regularity and Quasi-Chaoticity of Oscillations of Nonlinear Mechanical Systems',
    degree: doctorPhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 30 May 2000. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 2000.',
    pages: 318,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['nonlinear mechanical systems', 'oscillations', 'quasi-chaos', 'regularity']
  }),
  entry({
    id: 'nikitin-sergey-1988-nonstationary-interaction-elastic-bodies-revolution-partially-filled-fluid',
    year: 1988,
    defenceDate: '1988-06-07',
    authorEn: 'Sergey K. Nikitin',
    sourceLanguage: 'ru',
    titleEn: 'Nonstationary Interaction of Elastic Bodies of Revolution Partially Filled with Fluid',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 7 June 1988. Doctoral dissertation in Technical Sciences. Kyiv, 1988.',
    pages: 439,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fluid-structure interaction', 'elastic bodies of revolution', 'nonstationary interaction']
  }),
  entry({
    id: 'nikolaev-boris-1988-nonaxisymmetric-deformation-flexible-spherical-shells-variable-stiffness',
    year: 1988,
    defenceDate: '1988-06-28',
    authorEn: 'Boris K. Nikolaev',
    sourceLanguage: 'ru',
    titleEn:
      'Nonaxisymmetric Deformation of Flexible Spherical Shells of Variable Stiffness in Classical and Refined Formulations',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 June 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1988.',
    pages: 154,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['spherical shells', 'variable stiffness', 'nonaxisymmetric deformation']
  }),
  entry({
    id: 'nikulinskaya-sn-1969-qualitative-analysis-loss-stability-cylindrical-shells',
    year: 1969,
    defenceDate: '1969-11-05',
    authorEn: 'S.N. Nikulinskaya',
    sourceLanguage: 'ru',
    titleEn: 'Problems of Qualitative Analysis of Loss of Stability in Cylindrical Shells',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 5 November 1969. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1969.',
    pages: 143,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['cylindrical shells', 'loss of stability', 'qualitative analysis']
  }),
  entry({
    id: 'novikov-vd-1970-longitudinal-vibrations-elastic-thread-carried-by-thrown-body',
    year: 1970,
    defenceDate: '1970-06-30',
    authorEn: 'V.D. Novikov',
    sourceLanguage: 'ru',
    titleEn: 'Longitudinal Vibrations of an Elastic Thread Carried by a Thrown Body',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 30 June 1970. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1970.',
    pages: 132,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastic thread', 'longitudinal vibrations', 'dynamics']
  }),
  entry({
    id: 'noraliev-nurilla-1991-stress-distribution-two-equal-unequal-holes-anisotropic-shells',
    year: 1991,
    defenceDate: '1991-06-25',
    authorEn: 'Nurilla Kh. Noraliev',
    sourceLanguage: 'ru',
    titleEn: 'Stress Distribution around Two Equal and Unequal Holes in Anisotropic Shells',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 June 1991. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1979.',
    pages: 132,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['anisotropic shells', 'holes', 'stress distribution']
  }),
  entry({
    id: 'nosachenko-am-1979-influence-ribs-attached-masses-cutouts-vibrations-cylindrical-weakly-conical-shells',
    year: 1979,
    defenceDate: '1979-10-16',
    authorEn: 'A.M. Nosachenko',
    sourceLanguage: 'ru',
    titleEn:
      'Influence of Ribs, Attached Masses and Cutouts on Vibrations of Cylindrical and Weakly Conical Shells',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 16 October 1979. Candidate dissertation in Technical Sciences. Kyiv, 1979.',
    pages: 132,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['shell vibrations', 'ribs', 'attached masses', 'cutouts']
  }),
  entry({
    id: 'nudny-ip-1970-stress-state-compliant-supports-mine-workings-rheological-massif',
    year: 1970,
    defenceDate: '1970-03-31',
    authorEn: 'I.P. Nudny',
    sourceLanguage: 'ru',
    titleEn: 'Stress State in Compliant Supports of Mine Workings Considering Rheological Properties of the Rock Mass',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 31 March 1970. Candidate dissertation in Technical Sciences. Kyiv, 1969.',
    pages: 89,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['mine workings', 'compliant supports', 'rheological properties', 'stress state']
  })
];
