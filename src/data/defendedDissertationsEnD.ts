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
  '05.02.09': { code: '05.02.09', en: 'Dynamics and Strength of Machines' }
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

const instituteConstructionMechanicsUkrSsr = 'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsAsUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsNasUkraineShort = 'Institute of Mechanics, NAS of Ukraine';
const ukrainianTransportUniversity = 'Ukrainian Transport University, Ministry of Education of Ukraine';

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

export const defendedDissertationsEnD: DefendedDissertationEntryEn[] = [
  entry({
    id: 'danilov-vn-1949-hardness-metals-alloys-dynamic-loads',
    year: 1949,
    defenceDate: '1949-03-07',
    authorEn: 'V.N. Danilov',
    sourceLanguage: 'ru',
    titleEn: 'Hardness of Metals and Alloys under Dynamic Loads',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 7 March 1949. Candidate dissertation in Technical Sciences. Kyiv, 1948.',
    pages: 93,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['hardness', 'metals and alloys', 'dynamic loading']
  }),
  entry({
    id: 'dashko-olha-2004-stress-concentration-soft-ferromagnets-inclusions-magnetic-field',
    year: 2004,
    defenceDate: '2004-12-12',
    authorEn: 'Olha H. Dashko',
    sourceLanguage: 'uk',
    titleEn:
      'Stress Concentration in Soft Ferromagnets with Ellipsoidal and Paraboloidal Inclusions under a Magnetic Field',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 12 December 2004. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2004.',
    pages: 120,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['stress concentration', 'soft ferromagnets', 'magnetomechanics', 'inclusions']
  }),
  entry({
    id: 'dvirnyi-oleksandr-2005-stability-criteria-impulsive-systems-lyapunov-functions',
    year: 2005,
    defenceDate: '2005-10-25',
    authorEn: 'Oleksandr I. Dvirnyi',
    sourceLanguage: 'uk',
    titleEn: 'Stability Criteria for Impulsive Systems Based on Multicomponent Lyapunov Functions',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 October 2005. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2005.',
    pages: 165,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['stability criteria', 'impulsive systems', 'Lyapunov functions']
  }),
  entry({
    id: 'dekret-volodymyr-2001-three-dimensional-stability-weakly-reinforced-ribbon-composite',
    year: 2001,
    defenceDate: '2001-12-11',
    authorEn: 'Volodymyr A. Dekret',
    sourceLanguage: 'uk',
    titleEn: 'Plane Problem of Three-Dimensional Stability of a Weakly Reinforced Ribbon Composite Material',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 11 December 2001. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2001.',
    pages: 110,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraineShort,
    tags: ['three-dimensional stability', 'composite materials', 'weak reinforcement']
  }),
  entry({
    id: 'dekret-volodymyr-2012-stability-composites-short-fibers-plane-strain-model',
    year: 2012,
    defenceDate: '2012-11-27',
    authorEn: 'Volodymyr A. Dekret',
    sourceLanguage: 'uk',
    titleEn:
      'Three-Dimensional Theory of Stability of Composite Materials Reinforced with Short Fibres: Plane-Strain Model',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 November 2012. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 2012.',
    pages: 230,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraineShort,
    tags: ['three-dimensional stability', 'short-fibre composites', 'plane strain']
  }),
  entry({
    id: 'demyanchuk-viktor-1985-flexible-layered-shells-variable-stiffness',
    year: 1985,
    defenceDate: '1985-11-26',
    authorEn: 'Viktor S. Demyanchuk',
    sourceLanguage: 'ru',
    titleEn:
      'Numerical Solution of Boundary-Value Problems on the Deformation of Flexible Layered Shells of Revolution with Variable Stiffness',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 November 1985. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1985.',
    pages: 208,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['layered shells', 'variable stiffness', 'numerical methods']
  }),
  entry({
    id: 'denisenko-viktor-2010-stability-motion-nonlinear-mechanical-systems-local-linear-approximations',
    year: 2010,
    defenceDate: '2010-01-26',
    authorEn: 'Viktor S. Denisenko',
    sourceLanguage: 'ru',
    titleEn:
      'Conditions for Stability of Motion of Nonlinear Mechanical Systems Based on Locally Linear Approximations',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 26 January 2010. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2009.',
    pages: 151,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['motion stability', 'nonlinear systems', 'local linear approximations']
  }),
  entry({
    id: 'denisenko-vladimir-1989-rigid-body-elastic-thread-moving-object',
    year: 1989,
    defenceDate: '1989-03-28',
    authorEn: 'Vladimir I. Denisenko',
    sourceLanguage: 'ru',
    titleEn: 'Spatial Motion of a Rigid Body Attached by an Elastic Thread to a Moving Object',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 28 March 1989. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1989.',
    pages: 141,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['rigid-body motion', 'elastic thread', 'moving object', 'theoretical mechanics']
  }),
  entry({
    id: 'derdiev-mazakhir-1990-layered-composites-curvatures-two-directions',
    year: 1990,
    defenceDate: '1990-12-11',
    authorEn: 'Mazakhir Davud ogly Derdiev',
    sourceLanguage: 'ru',
    titleEn: 'Stress-Strain State of Layered Composites with Curvatures in Two Directions',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 11 December 1990. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1990.',
    pages: 201,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['layered composites', 'curvature', 'stress-strain state']
  }),
  entry({
    id: 'derbentsev-da-1967-vibrations-stability-shells-supersonic-gas-flow',
    year: 1967,
    defenceDate: '1967-04-18',
    authorEn: 'D.A. Derbentsev',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations and Stability of Cylindrical and Conical Shells under Supersonic Gas Flow through Them',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 18 April 1967. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1966.',
    pages: 130,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['shell vibrations', 'shell stability', 'supersonic gas flow']
  }),
  entry({
    id: 'deriglazov-lv-1977-stability-mine-workings-anisotropic-media',
    year: 1977,
    defenceDate: '1977-11-14',
    authorEn: 'L.V. Deriglazov',
    sourceLanguage: 'ru',
    titleEn: 'Three-Dimensional Stability Problems of Mine Workings for Anisotropic Media',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 14 November 1977. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1977.',
    pages: 138,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stability', 'mine workings', 'anisotropic media']
  }),
  entry({
    id: 'dziuba-viktoriia-2001-cylindrical-shell-spherical-body-compressible-fluid',
    year: 2001,
    defenceDate: '2001-09-11',
    authorEn: 'Viktoriia V. Dziuba',
    sourceLanguage: 'uk',
    titleEn: 'Interaction of a Cylindrical Shell and a Spherical Body in a Compressible Fluid',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 11 September 2001. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2001.',
    pages: 124,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraineShort,
    tags: ['cylindrical shell', 'spherical body', 'compressible fluid', 'fluid-structure interaction']
  }),
  entry({
    id: 'dikhtiaryuk-mykola-2005-contact-problems-elastic-strip-initial-residual-stresses-elastic-overlays',
    year: 2005,
    defenceDate: '2005-01-25',
    authorEn: 'Mykola M. Dikhtiaryuk',
    sourceLanguage: 'uk',
    titleEn:
      'Contact Problems for an Elastic Strip with Initial (Residual) Stresses Reinforced by Elastic Overlays',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 January 2005. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2004.',
    pages: 171,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraineShort,
    tags: ['contact problems', 'elastic strip', 'initial stresses', 'elastic overlays']
  }),
  entry({
    id: 'dlugach-mi-1965-generalization-grid-method-plates-shells',
    year: 1965,
    defenceDate: '1965-03-30',
    authorEn: 'M.I. Dlugach',
    sourceLanguage: 'ru',
    titleEn: 'Generalization of the Grid Method in the Mixed Plane Problem and in Plate and Shell Theory',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 30 March 1965. Doctoral dissertation in Technical Sciences. Kyiv, 1964.',
    pages: 452,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['grid method', 'mixed plane problem', 'plate theory', 'shell theory']
  }),
  entry({
    id: 'dlugach-mi-1948-thin-walled-rods-lattices-battens',
    year: 1948,
    defenceDate: '1948-03-25',
    authorEn: 'M.I. Dlugach',
    sourceLanguage: 'ru',
    titleEn: 'Analysis of Thin-Walled Rods Reinforced by Lattices or Battens',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 25 March 1948. Candidate dissertation in Technical Sciences. Kyiv, 1947.',
    pages: 167,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['thin-walled rods', 'lattices', 'battens', 'structural mechanics']
  }),
  entry({
    id: 'dmitrieva-na-1948-stress-distribution-plane-wood-shear',
    year: 1948,
    defenceDate: '1948-03-31',
    authorEn: 'N.A. Dmitrieva',
    sourceLanguage: 'ru',
    titleEn: 'Distribution of Stresses in the Plane of Wood Shear',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 31 March 1948. Candidate dissertation in Technical Sciences. Kyiv, 1948.',
    pages: 111,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['stress distribution', 'wood shear', 'structural mechanics']
  }),
  entry({
    id: 'dovhanych-mykhailo-1988-vibrations-nonhomogeneous-rectangular-plates',
    year: 1988,
    defenceDate: '1988-10-04',
    authorEn: 'Mykhailo I. Dovhanych',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations of Nonhomogeneous Rectangular Plates',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 4 October 1988. Candidate dissertation in Physical and Mathematical Sciences. Uzhhorod–Kyiv, 1988.',
    pages: 154,
    placeEn: 'Uzhhorod–Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['plate vibrations', 'nonhomogeneous plates', 'rectangular plates']
  }),
  entry({
    id: 'dovzhyk-mykhailo-2012-fracture-parallel-cracks-compression-along-cracks',
    year: 2012,
    defenceDate: '2012-12-25',
    authorEn: 'Mykhailo V. Dovzhyk',
    sourceLanguage: 'uk',
    titleEn: 'Fracture of Materials with Closely Spaced Interacting Parallel Cracks under Compression along the Cracks',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 December 2012. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2012.',
    pages: 148,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['fracture mechanics', 'parallel cracks', 'compression', 'crack interaction']
  }),
  entry({
    id: 'dolya-elena-2008-vibrations-dissipative-heating-viscoelastic-layered-prism-punch',
    year: 2008,
    defenceDate: '2008-04-28',
    authorEn: 'Elena V. Dolya',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations and Dissipative Heating of a Viscoelastic Layered Prism Excited by a Rectangular Punch',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 April 2008. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2008.',
    pages: 142,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['viscoelasticity', 'layered prism', 'dissipative heating', 'vibrations']
  }),
  entry({
    id: 'domaretsky-roman-1996-elastic-bladed-rotor-complex-rotation',
    year: 1996,
    authorEn: 'Roman V. Domaretsky',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations of an Elastic Bladed Rotor under Complex Rotation',
    degree: candidateTechnical,
    specialtyCode: '05.02.09',
    bibliographyEn: 'Defended in 1996. Candidate dissertation in Technical Sciences. Kyiv, 1996.',
    pages: 190,
    placeEn: 'Kyiv',
    institutionEn: ukrainianTransportUniversity,
    tags: ['rotor dynamics', 'bladed rotor', 'complex rotation', 'machine dynamics']
  })
];
