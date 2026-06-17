import type { DefendedDissertationEntryEn, DissertationDegreeEn, DissertationSpecialtyEn } from './defendedDissertationsEn';

type EntryInput = Omit<DefendedDissertationEntryEn, 'sortLetter'>;

const candidateTechnical: DissertationDegreeEn = {
  level: 'candidate-of-sciences',
  en: 'Candidate of Technical Sciences',
  fieldEn: 'Technical Sciences'
};

const candidatePhysical: DissertationDegreeEn = {
  level: 'candidate-of-sciences',
  en: 'Candidate of Physical and Mathematical Sciences',
  fieldEn: 'Physical and Mathematical Sciences'
};

const doctorTechnical: DissertationDegreeEn = {
  level: 'doctor-of-sciences',
  en: 'Doctor of Technical Sciences',
  fieldEn: 'Technical Sciences'
};

const doctorPhysical: DissertationDegreeEn = {
  level: 'doctor-of-sciences',
  en: 'Doctor of Physical and Mathematical Sciences',
  fieldEn: 'Physical and Mathematical Sciences'
};

const specialtyMechanicsDeformableSolids: DissertationSpecialtyEn = {
  code: '01.02.04',
  en: 'Mechanics of Deformable Solids'
};

const specialtyTheoreticalMechanics: DissertationSpecialtyEn = {
  code: '01.02.01',
  en: 'Theoretical Mechanics'
};

const instituteMechanicsAsUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const instituteConstructionMechanicsAsUkrSsr = 'Institute of Structural Mechanics, Academy of Sciences of the Ukrainian SSR';
const patonInstituteElectricWeldingAsUkrSsr = 'Institute of Electric Welding, Academy of Sciences of the Ukrainian SSR';
const bakulInstituteSuperhardMaterialsNasUkraine = 'V.M. Bakul Institute for Superhard Materials, NAS of Ukraine';

const entry = (input: EntryInput): DefendedDissertationEntryEn => ({
  sortLetter: 'Ch',
  ...input
});

export const defendedDissertationsEnCh: DefendedDissertationEntryEn[] = [
  entry({
    id: 'chekin-o-n-1976',
    year: 1976,
    defenceDate: '1976-12-28',
    author: { en: 'O.N. Chekin', original: 'ЧЕКИН О.Н.', originalLanguage: 'ru' },
    title: {
      en: 'Investigation of the Deformed State of Full-Scale Structures by the Curvature Measurement Method',
      original: 'Исследование деформированного состояния натурных конструкций методом измерения кривизн',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidateTechnical,
    bibliography: {
      en: `Defended on 28 December 1976. Candidate dissertation in Technical Sciences. ${instituteMechanicsAsUkrSsr}. Kyiv, 1976. 188 pages.`,
      originalDetails: 'Защита 28.12.76. Дисс. к.т.н. / Ин-т механики АН УССР. – Киев, 1976. – 188 с.',
      originalLanguage: 'ru',
      pages: 188,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['deformed state', 'curvature measurement', 'full-scale structures']
  }),
  entry({
    id: 'chervinko-olga-p-1986',
    year: 1986,
    defenceDate: '1986-11-11',
    author: { en: 'Olga P. Chervinko', original: 'ЧЕРВИНКО Ольга Петровна', originalLanguage: 'ru' },
    title: {
      en: 'Steady-State Vibrations and Heating of a Rectangular Prism and a Short Cylinder Made of Viscoelastic Materials',
      original: 'Установившиеся колебания и разогрев прямоугольной призмы и короткого цилиндра из вязкоупругих материалов',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliography: {
      en: `Defended on 11 November 1986. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. ${instituteMechanicsAsUkrSsr}. Kyiv, 1986. 181 pages.`,
      originalDetails: 'Защита 11.11.86. Дисс. к.ф.-м.н. 01.02.04 / Ин-т механики АН УССР. – Киев, 1986. – 181 с.',
      originalLanguage: 'ru',
      pages: 181,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['viscoelastic materials', 'steady-state vibrations', 'heating']
  }),
  entry({
    id: 'cherevko-k-i-1974',
    year: 1974,
    defenceDate: '1974-11-05',
    author: { en: 'K.I. Cherevko', original: 'ЧЕРЕВКО К.И.', originalLanguage: 'ru' },
    title: {
      en: 'Diffraction of Antisymmetric Waves in Multiply Connected Plates',
      original: 'Дифракция антисимметричных волн в многосвязных пластинах',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidatePhysical,
    bibliography: {
      en: `Defended on 5 November 1974. Candidate dissertation in Physical and Mathematical Sciences. ${instituteMechanicsAsUkrSsr}. Kyiv, 1974. 171 pages.`,
      originalDetails: 'Защита 05.11.74. Дисс. к.ф.-м.н. / Ин-т механики АН УССР. – Киев, 1974. – 171 с.',
      originalLanguage: 'ru',
      pages: 171,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['wave diffraction', 'antisymmetric waves', 'multiply connected plates']
  }),
  entry({
    id: 'cherepina-marina-v-1992',
    year: 1992,
    author: { en: 'Marina V. Cherepina', original: 'ЧЕРЕПИНА Марина Валентиновна.', originalLanguage: 'ru' },
    title: {
      en: 'Nonlinear Deformation of Axisymmetric Cylindrical Structures under Nonstationary Loads',
      original: 'Нелинейное деформирование осесимметричных цилиндрических при нестационарных нагрузках',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidateTechnical,
    bibliography: {
      en: `Defended in 1992. Candidate dissertation in Technical Sciences. ${instituteMechanicsNasUkraine}. Kyiv, 1992. 180 pages.`,
      originalDetails: 'Защита 1992 г. Дисс. к.т.н. / Ин-т механики НАН Украины. – Киев, 1992. – 180 с.',
      originalLanguage: 'ru',
      pages: 180,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsNasUkraine
    },
    tags: ['nonlinear deformation', 'axisymmetric cylindrical structures', 'nonstationary loads']
  }),
  entry({
    id: 'cherinko-pavel-n-1985',
    year: 1984,
    defenceDate: '1985-03-19',
    author: { en: 'Pavel N. Cherinko', original: 'ЧЕРИНЬКО Павел Николаевич', originalLanguage: 'ru' },
    title: {
      en: 'Dynamic Stability of Orthotropic Rectangular Plates and Shells of Revolution with Variable Stiffness',
      original: 'Динамическая устойчивость ортотропных прямоугольных пластин и оболочек вращения переменной жесткости',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliography: {
      en: `Defended on 19 March 1985. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. ${instituteMechanicsAsUkrSsr}. Kyiv, 1984. 115 pages.`,
      originalDetails: 'Защита 19.03.85. Дисс. к.ф.-м.н. 01.02.04 / Ин-т механики АН УССР. – Киев, 1984. – 115 с.',
      originalLanguage: 'ru',
      pages: 115,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['dynamic stability', 'orthotropic plates', 'shells of revolution']
  }),
  entry({
    id: 'chernetskaya-larisa-n-1986',
    year: 1986,
    defenceDate: '1986-07-17',
    author: { en: 'Larisa N. Chernetskaya', original: 'ЧЕРНЕЦКАЯ Лариса Николаевна', originalLanguage: 'ru' },
    title: {
      en: 'Generalized Input and Stability Estimates for Motions of Nonautonomous Multimass Systems',
      original: 'Обобщенный вход и оценки устойчивости движений неавтономных многомассовых систем',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidatePhysical,
    specialty: specialtyTheoreticalMechanics,
    bibliography: {
      en: `Defended on 17 July 1986. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.01. ${instituteMechanicsAsUkrSsr}. Kyiv, 1986. 147 pages.`,
      originalDetails: 'Защита 17.07.86. Дисс. к.ф.-м.н. 01.02.01 / Ин-т механики АН УССР. – Киев, 1986. – 147 с.',
      originalLanguage: 'ru',
      pages: 147,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['nonautonomous systems', 'multimass systems', 'motion stability']
  }),
  entry({
    id: 'chernobai-volodymyr-s-2018',
    year: 2018,
    defenceDate: '2018-12-18',
    author: { en: 'Volodymyr S. Chernobai', original: 'Чернобай Володимир Сергійович.', originalLanguage: 'uk' },
    title: {
      en: 'Stress State and Effective Elastic Properties of Piecewise Homogeneous Bodies with Imperfect Elliptical Interfaces under Antiplane Shear',
      original: 'Напружений стан та ефективні пружні властивості кусково-однорідних тіл з неідеальними еліптичними границями розділу за антиплоского зсуву. : к.ф.-м.н. : спец.. 01.02.04 - Механіка деформівного твердого тіла : дата захисту 2018-12-18; . Інститут надтвердих матерiалiв iм. В.М. Бакуля НАН України. – , 0418U004314.',
      originalLanguage: 'uk',
      originalNoteEn: 'Original title [in Ukrainian]'
    },
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliography: {
      en: `Defended on 18 December 2018. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04 — Mechanics of Deformable Solids. ${bakulInstituteSuperhardMaterialsNasUkraine}. Registration no. 0418U004314.`,
      originalDetails: '',
      originalLanguage: 'uk',
      institutionEn: bakulInstituteSuperhardMaterialsNasUkraine
    },
    tags: ['antiplane shear', 'imperfect interfaces', 'effective elastic properties']
  }),
  entry({
    id: 'chernoochenko-andrei-a-1991',
    year: 1991,
    defenceDate: '1991-06-25',
    author: { en: 'Andrei A. Chernoochenko', original: 'ЧЕРНООЧЕНКО Андрей Анатольевич', originalLanguage: 'ru' },
    title: {
      en: 'Ultrasonic Nondestructive Method for Determining Elastic Properties and the Stress-Strain State of Surface Layers of Materials and Structural Elements',
      original: 'Ультразвуковой неразрушающий метод определения упругих свойств и напряженно-деформированного состояния поверхностных слоев материалов и элементов конструкций',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliography: {
      en: `Defended on 25 June 1991. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. ${patonInstituteElectricWeldingAsUkrSsr}. Kyiv, 1991. 150 pages.`,
      originalDetails: 'Защита 25.06.91. Дисс. к.ф.-м.н. 01.02.04 / Ин-т электросварки АН УССР. – Киев, 1991. – 150 с.',
      originalLanguage: 'ru',
      pages: 150,
      placeEn: 'Kyiv',
      institutionEn: patonInstituteElectricWeldingAsUkrSsr
    },
    tags: ['ultrasonic method', 'nondestructive testing', 'stress-strain state']
  }),
  entry({
    id: 'chernopisky-dmitry-i-1980',
    year: 1980,
    defenceDate: '1980-06-24',
    author: { en: 'Dmitry I. Chernopisky', original: 'ЧЕРНОПИСКИЙ Дмитрий Игнатьевич', originalLanguage: 'ru' },
    title: {
      en: 'Investigation of the Stress State of Elastic Thick-Walled Corrugated Shells',
      original: 'Исследование напряженного состояния упругихъ толстостенных гофрированных оболочек',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidatePhysical,
    bibliography: {
      en: `Defended on 24 June 1980. Candidate dissertation in Physical and Mathematical Sciences. ${instituteMechanicsAsUkrSsr}. Kyiv, 1980. 218 pages.`,
      originalDetails: 'Защита 24.06.80. Дисс. к.ф.-м.н. / Ин-т механики АН УССР. – Киев, 1980. – 218 с.',
      originalLanguage: 'ru',
      pages: 218,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['corrugated shells', 'thick-walled shells', 'stress state']
  }),
  entry({
    id: 'chernyshenko-ivan-s-1967',
    year: 1966,
    defenceDate: '1967-05-23',
    author: { en: 'Ivan S. Chernyshenko', original: 'ЧЕРНЫШЕНКО Иван Семенович', originalLanguage: 'ru' },
    title: {
      en: 'Axisymmetric Elastic-Plastic State of Shells of Revolution at Finite Deflections',
      original: 'Осесимметричное упруго-пластическое состояние оболочек вращения при конечных прогибах',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidateTechnical,
    bibliography: {
      en: `Defended on 23 May 1967. Candidate dissertation in Technical Sciences. ${instituteMechanicsAsUkrSsr}. Kyiv, 1966. 239 pages.`,
      originalDetails: 'Защита 23.05.67. Дисс. к.т.н. / Ин-т механики АН УССР. – Киев, 1966. – 239 с.',
      originalLanguage: 'ru',
      pages: 239,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['shells of revolution', 'elastic-plastic state', 'finite deflections']
  }),
  entry({
    id: 'chernyshenko-ivan-s-1981',
    year: 1980,
    defenceDate: '1981-02-10',
    author: { en: 'Ivan S. Chernyshenko', original: 'ЧЕРНЫШЕНКО Иван Семенович', originalLanguage: 'ru' },
    title: {
      en: 'Elastic-Plastic State of Thin Shells Weakened by Holes',
      original: 'Упруго-пластическое состояние тонких оболочек, ослабленных отверстиями',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: doctorTechnical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliography: {
      en: `Defended on 10 February 1981. Doctoral dissertation in Technical Sciences, specialty 01.02.04. ${instituteMechanicsAsUkrSsr}. Kyiv, 1980. 328 pages.`,
      originalDetails: 'Защита 10.02.81. Дисс. д.т.н. 01.02.04 / Ин-т механики АН УССР. – Киев, 1980. – 328 с.',
      originalLanguage: 'ru',
      pages: 328,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['thin shells', 'holes', 'elastic-plastic deformation']
  }),
  entry({
    id: 'chekhov-valery-n-1986',
    year: 1986,
    defenceDate: '1986-11-25',
    author: { en: 'Valery N. Chekhov', original: 'ЧЕХОВ Валерий Николаевич', originalLanguage: 'ru' },
    title: {
      en: 'Development of Analytical Studies of the Stress-Strain State of Shallow and Non-Shallow Shells Weakened by Holes',
      original: 'Развитие аналитических исследований напряженно-деформированного состояния пологих и непологих оболочек, ослабленных отверстиями',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: doctorPhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliography: {
      en: `Defended on 25 November 1986. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04. ${instituteMechanicsAsUkrSsr}. Kyiv, 1986. 300 pages.`,
      originalDetails: 'Защита 25.11.86. Дисс. д.ф.-м.н. 01.02.04 / Ин-т механики АН УССР. – Киев, 1986. – 300 с.',
      originalLanguage: 'ru',
      pages: 300,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['shells weakened by holes', 'stress-strain state', 'analytical methods']
  }),
  entry({
    id: 'chekhov-viktor-n-1970',
    year: 1970,
    defenceDate: '1970-10-20',
    author: { en: 'Viktor N. Chekhov', original: 'ЧЕХОВ Виктор Николаевич', originalLanguage: 'ru' },
    title: {
      en: 'Investigation of Stress Distribution in a Circular Cylindrical Shell with a Finite Number of Sizable Holes',
      original: 'Исследование распределения напряжений в круговой цилиндрической оболочке с конечным числом немалых отверстий',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidatePhysical,
    bibliography: {
      en: `Defended on 20 October 1970. Candidate dissertation in Physical and Mathematical Sciences. ${instituteMechanicsAsUkrSsr}. Kyiv, 1970. 167 pages.`,
      originalDetails: 'Защита 20.10.70. Дисс. к.ф.-м.н. / Ин-т механики АН УССР. – Киев, 1970. – 167 с.',
      originalLanguage: 'ru',
      pages: 167,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['cylindrical shells', 'holes', 'stress distribution']
  }),
  entry({
    id: 'chekhov-viktor-n-1986',
    year: 1985,
    defenceDate: '1986-06-17',
    author: { en: 'Viktor N. Chekhov', original: 'ЧЕХОВ Виктор Николаевич', originalLanguage: 'ru' },
    title: {
      en: 'Three-Dimensional Stability Problems for Layered Semi-Infinite Bodies',
      original: 'Трехмерные задачи устойчивости слоистых полуограниченных тел',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: doctorPhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliography: {
      en: `Defended on 17 June 1986. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04. ${instituteMechanicsAsUkrSsr}. Kyiv, 1985. 291 pages.`,
      originalDetails: 'Защита 17.06.86. Дисс. д.ф.-м.н. 01.02.04 / Ин-т механики АН УССР. – Киев, 1985. – 291 с.',
      originalLanguage: 'ru',
      pages: 291,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['layered bodies', 'semi-infinite bodies', 'stability']
  }),
  entry({
    id: 'chigirinsky-a-v-1968',
    year: 1967,
    defenceDate: '1968-04-16',
    author: { en: 'A.V. Chigirinsky', original: 'ЧИГИРИНСКИЙ А.В.', originalLanguage: 'ru' },
    title: {
      en: 'Selection of the Optimal Fiberglass Structure in Elastic Thin Shells of Revolution',
      original: 'Выбор оптимальной структуры стеклопластика в упругих тонких оболочках вращения',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidateTechnical,
    bibliography: {
      en: `Defended on 16 April 1968. Candidate dissertation in Technical Sciences. ${instituteMechanicsAsUkrSsr}. Kyiv, 1967. 112 pages.`,
      originalDetails: 'Защита 16.04.68. Дисс. к.т.н. / Ин-т механики АН УССР. – Киев, 1967. – 112 с.',
      originalLanguage: 'ru',
      pages: 112,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['fiberglass', 'thin shells', 'structural optimization']
  }),
  entry({
    id: 'chornoivan-yurii-o-2003',
    year: 2003,
    defenceDate: '2003-10-28',
    author: { en: 'Yurii O. Chornoivan', original: 'ЧОРНОІВАН Юрій Олексійович', originalLanguage: 'uk' },
    title: {
      en: 'Plane Mixed Problems in the Linear Theory of Viscoelasticity and Fracture Mechanics of Orthotropic Bodies',
      original: 'Плоскі змішані задачі лінійної теорії в’язкопружності та механіки руйнування ортотропних тіл',
      originalLanguage: 'uk',
      originalNoteEn: 'Original title [in Ukrainian]'
    },
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliography: {
      en: `Defended on 28 October 2003. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. ${instituteMechanicsTimoshenkoNasUkraine}. Kyiv, 2003. 126 pages.`,
      originalDetails: 'Захист 28.10.2003 р. Дис. к.ф.-м.н. 01.02.04 / Ін-т механіки ім. С.П.Тимошенка НАН України. – Київ, 2003. – 126 с.',
      originalLanguage: 'uk',
      pages: 126,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsTimoshenkoNasUkraine
    },
    tags: ['viscoelasticity', 'fracture mechanics', 'orthotropic bodies']
  }),
  entry({
    id: 'chudnovsky-v-g-1951',
    year: 1951,
    defenceDate: '1951-02-03',
    author: { en: 'V.G. Chudnovsky', original: 'ЧУДНОВСКИЙ В.Г.', originalLanguage: 'ru' },
    title: {
      en: 'Vibrations and Stability of Bar Systems',
      original: 'Колебания и устойчивость стержневых систем',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: doctorTechnical,
    bibliography: {
      en: `Defended on 3 February 1951. Doctoral dissertation in Technical Sciences. ${instituteConstructionMechanicsAsUkrSsr}. Kyiv, 1951. 612 pages plus 68 pages of drawings.`,
      originalDetails: 'Защита 03.02.51. Дисс. д.т.н. / Ин-т строительной механики АН УССР. – Киев, 1951. – 612 с.+ 68 с. чертежей.',
      originalLanguage: 'ru',
      pages: 612,
      placeEn: 'Kyiv',
      institutionEn: instituteConstructionMechanicsAsUkrSsr
    },
    tags: ['bar systems', 'vibrations', 'stability']
  }),
  entry({
    id: 'chupakha-lyudmila-d-1985',
    year: 1985,
    defenceDate: '1985-09-24',
    author: { en: 'Lyudmila D. Chupakha', original: 'ЧУПАХА Людмила Дмитриевна', originalLanguage: 'ru' },
    title: {
      en: 'Solution of Problems on the Stress State of Orthotropic Thick-Walled Cylindrical Shells under Inhomogeneous Boundary Conditions',
      original: 'Решение задач о напряженном состоянии ортотропных толстостенных цилиндрических оболочек при неоднородных граничных условиях',
      originalLanguage: 'ru',
      originalNoteEn: 'Original title [in Russian]'
    },
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliography: {
      en: `Defended on 24 September 1985. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. ${instituteMechanicsAsUkrSsr}. Kyiv, 1985. 139 pages.`,
      originalDetails: 'Защита 24.09.85. Дисс. к.ф.-м.н. 01.02.04 / Ин-т механики АН УССР. – Киев, 1985. – 139 с.',
      originalLanguage: 'ru',
      pages: 139,
      placeEn: 'Kyiv',
      institutionEn: instituteMechanicsAsUkrSsr
    },
    tags: ['orthotropic shells', 'thick-walled cylindrical shells', 'inhomogeneous boundary conditions']
  })
];
