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
const lvivStateUniversity = 'Lviv State University';
const physicoMechanicalInstitute = 'Physico-Mechanical Institute';

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

export const defendedDissertationsEnL: DefendedDissertationEntryEn[] = [
  entry({
    id: 'lapusta-yuri-1993-three-dimensional-near-surface-instability-fibrous-composites-compression',
    year: 1993,
    defenceDate: '1993-12-28',
    authorEn: 'Yuri N. Lapusta',
    sourceLanguage: 'ru',
    titleEn: 'Three-Dimensional Theory of Near-Surface Instability of Fibrous Composites under Compression',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 December 1993. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1993.',
    pages: 307,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['fibrous composites', 'near-surface instability', 'compression']
  }),
  entry({
    id: 'latanska-liudmyla-2008-nonlinear-axisymmetric-dynamic-three-layer-shells-piecewise-homogeneous-core',
    year: 2008,
    defenceDate: '2008-10-28',
    authorEn: 'Liudmyla O. Latanska',
    sourceLanguage: 'uk',
    titleEn:
      'Nonlinear Axisymmetric Dynamic Problems for Three-Layer Shells of Revolution with a Piecewise-Homogeneous Core under Nonstationary Loads',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 28 October 2008. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 2008.',
    pages: 152,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['three-layer shells', 'axisymmetric dynamics', 'nonstationary loading']
  }),
  entry({
    id: 'levchenko-vladimir-1985-magnetoelastic-waves-regularly-layered-media',
    year: 1985,
    defenceDate: '1985-02-26',
    authorEn: 'Vladimir V. Levchenko',
    sourceLanguage: 'ru',
    titleEn: 'Propagation of Magnetoelastic Waves in Regularly Layered Media',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 February 1985. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1984.',
    pages: 160,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['magnetoelastic waves', 'layered media', 'wave propagation']
  }),
  entry({
    id: 'levchuk-olha-2000-spatial-axisymmetric-stress-state-nonlinear-elastic-piecewise-homogeneous-bodies',
    year: 2000,
    defenceDate: '2000-06-27',
    authorEn: 'Olha I. Levchuk',
    sourceLanguage: 'uk',
    titleEn:
      'Spatial Axisymmetric Stress State of Nonlinearly Elastic Cylindrical and Spherical Piecewise-Homogeneous Bodies',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 June 2000. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2000.',
    pages: 135,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['nonlinear elasticity', 'piecewise-homogeneous bodies', 'axisymmetric stress state']
  }),
  entry({
    id: 'leiko-andrei-1995-nonstationary-radiation-multimode-thin-walled-cylindrical-piezovibrators',
    year: 1995,
    authorEn: 'Andrei A. Leiko',
    sourceLanguage: 'ru',
    titleEn: 'Nonstationary Radiation Problems for Systems of Multimode Thin-Walled Cylindrical Piezovibrators',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1995. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1995.',
    pages: 173,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['piezovibrators', 'nonstationary radiation', 'thin-walled cylinders']
  }),
  entry({
    id: 'leliukh-yurii-2002-resonant-vibrations-dissipative-heating-inelastic-ferromagnetic-bodies',
    year: 2002,
    defenceDate: '2002-06-18',
    authorEn: 'Yurii I. Leliukh',
    sourceLanguage: 'uk',
    titleEn: 'Resonant Vibrations and Dissipative Heating of Inelastic Ferromagnetic Bodies of Canonical Shape',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 18 June 2002. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2002.',
    pages: 126,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['resonant vibrations', 'dissipative heating', 'ferromagnetic bodies']
  }),
  entry({
    id: 'leonov-sa-1963-elastoplastic-waves-strain-rate-rods-stress-strain-state',
    year: 1963,
    defenceDate: '1963-12-24',
    authorEn: 'S.A. Leonov',
    sourceLanguage: 'ru',
    titleEn:
      'Study of Elastoplastic Wave Propagation and the Influence of Strain Rate on the Stress-Strain State of Rods',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 24 December 1963. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1963.',
    pages: 119,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastoplastic waves', 'strain rate', 'rods']
  }),
  entry({
    id: 'leshchenko-petr-1984-prediction-macroscopic-properties-piezoactive-composites-stochastic-structure',
    year: 1984,
    defenceDate: '1984-06-26',
    authorEn: 'Petr V. Leshchenko',
    sourceLanguage: 'ru',
    titleEn: 'Prediction of Macroscopic Properties of Piezoactive Composites with Stochastic Structure',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 June 1984. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1984.',
    pages: 170,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['piezoactive composites', 'stochastic structure', 'macroscopic properties']
  }),
  entry({
    id: 'lila-dmitry-2009-stability-conditions-large-scale-nonstationary-mechanical-systems',
    year: 2009,
    defenceDate: '2009-12-22',
    authorEn: 'Dmitry M. Lila',
    sourceLanguage: 'ru',
    titleEn: 'Sufficient Stability Conditions for Large-Scale Nonstationary Mechanical Systems',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 22 December 2009. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2009.',
    pages: 150,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['stability', 'large-scale systems', 'nonstationary mechanical systems']
  }),
  entry({
    id: 'limarenko-os-1979-variational-methods-nonlinear-vibrations-shell-fluid-systems',
    year: 1979,
    defenceDate: '1979-05-08',
    authorEn: 'O.S. Limarenko',
    sourceLanguage: 'ru',
    titleEn: 'Variational Methods for Studying Nonlinear Vibrations of Shell-Fluid Systems',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 8 May 1979. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1979.',
    pages: 133,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['variational methods', 'nonlinear vibrations', 'shell-fluid systems']
  }),
  entry({
    id: 'litvinov-vg-1964-polymer-flow-round-annular-channels-heat-exchange',
    year: 1964,
    defenceDate: '1964-05-19',
    authorEn: 'V.G. Litvinov',
    sourceLanguage: 'ru',
    titleEn: 'Calculation of Polymer-Flow Parameters in Round and Annular Channels under Heat Exchange with the Environment',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 19 May 1964. Candidate dissertation in Technical Sciences. Kyiv, 1964.',
    pages: 217,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['polymer flow', 'annular channels', 'heat exchange']
  }),
  entry({
    id: 'likhachev-viktor-1990-geometrically-nonlinear-static-dynamic-rectangular-shallow-shells-ribs-grooves',
    year: 1990,
    authorEn: 'Viktor V. Likhachev',
    sourceLanguage: 'ru',
    titleEn:
      'Solution of Geometrically Nonlinear Static and Dynamic Problems for Rectangular Elastic Shallow Shells with Ribs and Grooves',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1990.',
    pages: 218,
    placeEn: 'Kyiv',
    institutionEn: lvivStateUniversity,
    tags: ['geometrically nonlinear problems', 'shallow shells', 'ribs', 'grooves']
  }),
  entry({
    id: 'likhovid-pi-1964-transient-processes-elastoplastic-systems',
    year: 1964,
    defenceDate: '1964-06-16',
    authorEn: 'P.I. Likhovid',
    sourceLanguage: 'ru',
    titleEn: 'Transient Processes in Elastoplastic Systems',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 16 June 1964. Candidate dissertation in Technical Sciences. Kyiv, 1964.',
    pages: 189,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['transient processes', 'elastoplastic systems']
  }),
  entry({
    id: 'lobas-vladyslav-2006-nonlinearity-dynamics-two-link-inverted-pendulum',
    year: 2006,
    defenceDate: '2006-09-26',
    authorEn: 'Vladyslav L. Lobas',
    sourceLanguage: 'uk',
    titleEn: 'Analysis of the Influence of Physical and Geometric Nonlinearities on the Dynamics of a Two-Link Inverted Pendulum',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 26 September 2006. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2006.',
    pages: 153,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['inverted pendulum', 'nonlinear dynamics', 'physical nonlinearity', 'geometric nonlinearity']
  }),
  entry({
    id: 'lobas-lg-1963-nonholonomic-systems-motion-theory-applications',
    year: 1963,
    defenceDate: '1963-12-24',
    authorEn: 'L.G. Lobas',
    sourceLanguage: 'ru',
    titleEn: 'Research on the Theory of Motion of Nonholonomic Systems and Its Applications',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 24 December 1963. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1963.',
    pages: 187,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['nonholonomic systems', 'motion theory', 'theoretical mechanics']
  }),
  entry({
    id: 'lobas-lada-2003-bifurcations-two-link-pendulum-asymmetric-following-force',
    year: 2003,
    defenceDate: '2003-03-25',
    authorEn: 'Lada L. Lobas',
    sourceLanguage: 'uk',
    titleEn: 'Bifurcations of Stationary States of a Two-Link Pendulum under an Asymmetric Follower Force',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 25 March 2003. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2003.',
    pages: 128,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['bifurcation', 'two-link pendulum', 'follower force']
  }),
  entry({
    id: 'loza-igor-1984-electroelastic-vibrations-waves-piezoceramic-hollow-cylinders-spheres',
    year: 1984,
    defenceDate: '1984-12-25',
    authorEn: 'Igor A. Loza',
    sourceLanguage: 'ru',
    titleEn: 'Electroelastic Vibrations and Waves in Piezoceramic Hollow Cylinders and Spheres',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 December 1984. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1984.',
    pages: 113,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['electroelasticity', 'piezoceramics', 'hollow cylinders', 'spheres']
  }),
  entry({
    id: 'lubkov-mikhail-1992-vibrations-dissipative-heating-multilayer-viscoelastic-shells-revolution',
    year: 1992,
    defenceDate: '1992-12-29',
    authorEn: 'Mikhail V. Lubkov',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations and Dissipative Heating of Multilayer Viscoelastic Shells of Revolution',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 December 1992. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1992.',
    pages: 125,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkraine,
    tags: ['multilayer shells', 'viscoelasticity', 'dissipative heating']
  }),
  entry({
    id: 'lugovoi-petr-1990-thin-walled-elastic-shells-edge-distributed-explosive-loads',
    year: 1990,
    defenceDate: '1990-12-18',
    authorEn: 'Petr Z. Lugovoi',
    sourceLanguage: 'ru',
    titleEn: 'Dynamics of Thin-Walled Elastic Shells under Edge and Distributed Explosive Loads',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 18 December 1990. Doctoral dissertation in Technical Sciences. Kyiv, 1990.',
    pages: 342,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thin-walled shells', 'explosive loads', 'dynamics']
  }),
  entry({
    id: 'lukianova-tetiana-2002-lyapunov-lagrange-stability-time-discrete-systems',
    year: 2002,
    authorEn: 'Tetiana O. Lukianova',
    sourceLanguage: 'uk',
    titleEn: 'Sufficient Lyapunov and Lagrange Stability Conditions for Time-Discrete Systems',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended in 2002. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2002.',
    pages: 127,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['Lyapunov stability', 'Lagrange stability', 'discrete-time systems']
  }),
  entry({
    id: 'lukin-alexander-1997-boundary-integral-equations-plates-static-dynamic-loads',
    year: 1997,
    defenceDate: '1997-06-24',
    authorEn: 'Alexander N. Lukin',
    sourceLanguage: 'ru',
    titleEn: 'Development of the Boundary Integral Equation Method for Calculating Plates under Static and Dynamic Loads',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 June 1997. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1997.',
    pages: 153,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['boundary integral equations', 'plates', 'static loading', 'dynamic loading']
  }),
  entry({
    id: 'lushchik-vv-1974-strength-creep-crosslinked-epoxy-polymers-working-media',
    year: 1974,
    defenceDate: '1974-09-10',
    authorEn: 'V.V. Lushchik',
    sourceLanguage: 'ru',
    titleEn: 'Strength and Creep of Spatially Crosslinked Epoxy Polymers in Working Media',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 10 September 1974. Candidate dissertation in Technical Sciences. Kyiv, 1974.',
    pages: 135,
    placeEn: 'Kyiv',
    institutionEn: `${physicoMechanicalInstitute}; ${instituteMechanicsAsUkrSsr}`,
    tags: ['strength', 'creep', 'epoxy polymers', 'working media']
  }),
  entry({
    id: 'liutyi-ai-1975-stability-gyroscopic-systems-resonances',
    year: 1975,
    defenceDate: '1975-05-27',
    authorEn: 'A.I. Liutyi',
    sourceLanguage: 'ru',
    titleEn: 'Stability of Gyroscopic Systems under Resonance Conditions',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 27 May 1975. Candidate dissertation in Technical Sciences. Kyiv, 1975.',
    pages: 162,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['gyroscopic systems', 'stability', 'resonance']
  }),
  entry({
    id: 'liakh-viktor-1986-stress-state-gas-saturated-fractured-porous-medium-near-mine-workings',
    year: 1986,
    defenceDate: '1986-05-27',
    authorEn: 'Viktor V. Liakh',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of a Gas-Saturated Fractured-Porous Medium near Mine Workings',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 May 1986. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1986.',
    pages: 138,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fractured-porous media', 'mine workings', 'gas saturation', 'stress state']
  }),
  entry({
    id: 'liashenko-yana-2004-stress-concentration-interphase-surfaces-viscoelastic-composites',
    year: 2004,
    defenceDate: '2004-02-24',
    authorEn: 'Yana H. Liashenko',
    sourceLanguage: 'uk',
    titleEn: 'Stress Concentration on Interphase Surfaces of Canonical Shape in Viscoelastic Composite Materials',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 February 2004. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2003.',
    pages: 168,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['stress concentration', 'interphase surfaces', 'viscoelastic composites']
  })
];
