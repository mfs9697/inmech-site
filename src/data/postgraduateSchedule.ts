/**
 * Postgraduate class schedule for 2026–2027.
 * Transcribed from the three director-approved course schedules (October 2026).
 * Keep this structured data separate from the public Astro presentation.
 * Do not add source scans/PDFs to the public site.
 *
 * Source discrepancy: year 2, B. P. Maslov's June 2027 dates are labelled
 * "Thursday 6, 12, 19, 26; Friday 7" but do not match the 2027 calendar.
 * The conflicting June dates are deliberately NOT added to timed sessions.
 */
export type TeacherId =
  | 'zhuk' | 'vasylieva' | 'ivanov' | 'yanchevskyi' | 'kipnis'
  | 'dekret' | 'yurchuk' | 'chornoivan' | 'borysenko' | 'maslov';

export const teachers: Record<TeacherId, { uk: string; en: string; profile: string }> = {
  zhuk: { uk: 'Жук Ярослав Олександрович', en: 'Yaroslav Oleksandrovych Zhuk', profile: 'zhuk-yaroslav' },
  vasylieva: { uk: 'Васильєва Наталія Володимирівна', en: 'Nataliia Volodymyrivna Vasylieva', profile: 'vasylyeva' },
  ivanov: { uk: 'Іванов Ігор Львович', en: 'Ihor Lvovych Ivanov', profile: 'ivanov-ihor' },
  yanchevskyi: { uk: 'Янчевський Ігор Владиславович', en: 'Ihor Vladyslavovych Yanchevskyi', profile: 'yanchevskyi' },
  kipnis: { uk: 'Кіпніс Олександр Леонідович', en: 'Oleksandr Leonidovych Kipnis', profile: 'kipnis' },
  dekret: { uk: 'Декрет Володимир Анатолійович', en: 'Volodymyr Anatoliiovych Dekret', profile: 'dekret' },
  yurchuk: { uk: 'Юрчук Василь Миколайович', en: 'Vasyl Mykolaiovych Yurchuk', profile: 'yurchuk' },
  chornoivan: { uk: 'Чорноіван Юрій Олексійович', en: 'Yurii Oleksiiovych Chornoivan', profile: 'chornoivan' },
  borysenko: { uk: 'Борисенко Максим Юрійович', en: 'Maksym Yuriiovych Borysenko', profile: 'borysenko' },
  maslov: { uk: 'Маслов Борис Петрович', en: 'Borys Petrovych Maslov', profile: 'maslov' }
};

export type ScheduleSlot = { month: string; days: number[]; time: string };
export type ScheduleSubject = {
  id: string;
  course: 1 | 2 | 3;
  uk: string;
  en: string;
  teachers: TeacherId[];
  slots: ScheduleSlot[];
  audience?: string[];
};
const slot = (month: string, days: number[], time: string): ScheduleSlot => ({ month, days, time });

const year1Audience = ['Максименко Д. Д.', 'Коршневий В. М.', 'Данилюк В. В.', 'Ткаченко І. С.', 'Цема І. О.'];
const year2General = ['Прощенко О. А.', 'Синявський О.'];
const year2Advanced = [...year2General, 'Грисевич Р.', 'Назарчук Ю.'];
const year3Audience = ['Серафимович Р.', 'Філь Є.', 'Усов В.'];

export const scheduleSubjects: ScheduleSubject[] = [
  {
    id: 'methodology-zhuk', course: 1,
    uk: 'Методологія, організація та технологія наукових досліджень',
    en: 'Methodology, Organisation and Technology of Scientific Research',
    teachers: ['zhuk'], audience: year1Audience,
    slots: [slot('2026-10', [27], '10:30–12:30'), slot('2026-11', [3, 10, 17, 24], '10:30–12:30'), slot('2026-12', [1, 8], '10:30–12:30')]
  },
  {
    id: 'methodology-vasylieva', course: 1,
    uk: 'Методологія, організація та технологія наукових досліджень',
    en: 'Methodology, Organisation and Technology of Scientific Research',
    teachers: ['vasylieva'], audience: year1Audience,
    slots: [slot('2027-04', [15, 22, 29], '10:30–12:30'), slot('2027-05', [6, 13, 20, 27], '10:30–13:30')]
  },
  {
    id: 'solid-mechanics', course: 1,
    uk: 'Механіка деформівного твердого тіла',
    en: 'Mechanics of Deformable Solids',
    teachers: ['vasylieva'], audience: year1Audience,
    slots: [
      slot('2027-04', [13, 20, 27, 9, 16, 23, 30], '12:30–14:30'),
      slot('2027-05', [4, 11, 18, 25, 7, 14, 21], '12:30–14:30')
    ]
  },
  {
    id: 'theoretical-mechanics', course: 1,
    uk: 'Поглиблений курс теоретичної механіки',
    en: 'Advanced Theoretical Mechanics',
    teachers: ['ivanov'], audience: year1Audience,
    slots: [
      slot('2026-10', [12, 19, 26], '10:30–11:50'),
      slot('2026-10', [15, 22, 29], '10:30–13:30'),
      slot('2026-11', [2, 9, 16, 23], '10:30–11:50'),
      slot('2026-11', [5, 12, 19, 26], '10:30–13:30')
    ]
  },
  {
    id: 'numerical-first', course: 1,
    uk: 'Чисельні методи розв’язання прикладних задач механіки деформівного тіла',
    en: 'Numerical Methods for Applied Problems of Deformable Solid Mechanics',
    teachers: ['yanchevskyi'], audience: year1Audience,
    slots: [
      slot('2026-11', [4, 11, 18, 25], '11:00–13:00'),
      slot('2026-12', [2, 9, 16, 23, 30], '11:00–13:00'),
      slot('2027-01', [6, 13, 20, 27], '11:00–13:00'),
      slot('2027-02', [3, 10], '11:00–13:00')
    ]
  },
  {
    id: 'composites', course: 2,
    uk: 'Аналітично-чисельне дослідження стійкості та руйнування матеріалів з тонким покриттям та армованих композитних матеріалів із застосуванням високопродуктивних обчислень',
    en: 'Analytical and Numerical Study of Stability and Fracture of Coated and Reinforced Composite Materials Using High-Performance Computing',
    teachers: ['kipnis', 'dekret'], audience: year2General,
    slots: [
      slot('2027-04', [1, 8, 15, 22, 29], '10:30–12:30'),
      slot('2027-05', [6, 13, 20, 27], '10:30–12:30'),
      slot('2027-06', [3], '10:30–12:30')
    ]
  },
  {
    id: 'numerical-second', course: 2,
    uk: 'Сучасні чисельні методи розв’язання прикладних задач механіки деформівного тіла',
    en: 'Modern Numerical Methods for Applied Problems of Deformable Solid Mechanics',
    teachers: ['yanchevskyi'], audience: [...year2General, 'Грисевич Р.'],
    slots: [
      slot('2027-03', [3, 10, 24, 31], '10:30–12:30'),
      slot('2027-04', [7, 14], '10:30–12:30'),
      slot('2027-05', [5, 12], '10:30–12:30'),
      slot('2027-06', [2, 9], '10:30–12:30')
    ]
  },
  {
    id: 'waves', course: 2,
    uk: 'Поширення хвиль з врахуванням структурних рівнів матеріалів та базових властивостей деформування матеріалів',
    en: 'Wave Propagation with Account of Structural Levels and Basic Deformation Properties of Materials',
    teachers: ['yurchuk'], audience: year2General,
    slots: [
      slot('2027-04', [5, 12, 19, 26], '10:30–12:30'),
      slot('2027-05', [3, 10, 17, 24, 31], '10:30–12:30'),
      slot('2027-06', [7], '10:30–12:30')
    ]
  },
  {
    id: 'control', course: 2,
    uk: 'Стійкість і керування рухом складних систем',
    en: 'Stability and Motion Control of Complex Systems',
    teachers: ['ivanov'], audience: ['Грисевич Р.'],
    slots: [
      slot('2027-04', [6, 13, 20, 27], '10:30–12:30'),
      slot('2027-05', [4, 11, 18, 25], '10:30–12:30'),
      slot('2027-06', [8, 15], '10:30–12:30')
    ]
  },
  {
    id: 'fracture', course: 2,
    uk: 'Механіка руйнування в’язкопружних матеріалів',
    en: 'Fracture Mechanics of Viscoelastic Materials',
    teachers: ['chornoivan'], audience: ['Грисевич Р.', 'Назарчук Ю.'],
    slots: [
      slot('2026-10', [22, 29], '09:30–11:30'),
      slot('2026-11', [5, 12, 19, 26], '09:30–11:30'),
      slot('2026-12', [3, 10, 17, 24], '09:30–11:30')
    ]
  },
  {
    id: 'pedagogy-second', course: 2,
    uk: 'Педагогіка і методика викладання прикладної математики',
    en: 'Pedagogy and Methods of Teaching Applied Mathematics',
    teachers: ['borysenko'], audience: year2Advanced,
    slots: [
      slot('2027-02', [4, 11, 18, 25, 5, 12], '09:30–11:30'),
      slot('2027-03', [4, 11, 18, 25], '09:30–11:30')
    ]
  },
  {
    id: 'rheology', course: 2,
    uk: 'Методи визначення функцій та реологічних параметрів у нелінійній теорії в’язкопружності',
    en: 'Methods for Determining Functions and Rheological Parameters in Nonlinear Viscoelasticity',
    teachers: ['maslov'], audience: ['Назарчук Ю.'],
    // July dates agree with the 2027 calendar; June dates in the PDF do not.
    slots: [slot('2027-07', [2, 9, 16, 23, 30], '12:00–14:00')]
  },
  {
    id: 'pedagogy-third', course: 3,
    uk: 'Педагогіка і методика викладання прикладної математики',
    en: 'Pedagogy and Methods of Teaching Applied Mathematics',
    teachers: ['borysenko'], audience: year3Audience,
    slots: [
      slot('2026-10', [13, 20, 27, 15, 22, 29], '09:30–12:30'),
      slot('2026-11', [3, 10, 17, 24], '09:30–12:30')
    ]
  }
];

export type ClassSession = {
  id: string; course: 1 | 2 | 3; date: string; time: string;
  uk: string; en: string; teachers: TeacherId[]; audience?: string[];
};

export const classSessions: ClassSession[] = scheduleSubjects.flatMap(subject =>
  subject.slots.flatMap(group => group.days.map(day => {
    const [year, month] = group.month.split('-').map(Number);
    const valid = day > 0 && day <= new Date(Date.UTC(year, month, 0)).getUTCDate();
    if (!valid) throw new Error('Invalid postgraduate schedule date: ' + group.month + '-' + day);
    const date = group.month + '-' + String(day).padStart(2, '0');
    return { id: subject.id + '-' + date, course: subject.course, date, time: group.time,
      uk: subject.uk, en: subject.en, teachers: subject.teachers, audience: subject.audience };
  }))
).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time) || a.uk.localeCompare(b.uk));

export const scheduleNotes = [
  { course: 1, uk: 'Іноземна мова професійного спрямування (рівень C1) — за розкладом Центру наукових досліджень та викладання іноземних мов НАН України.',
    en: 'Foreign Language for Professional Purposes (C1) — according to the schedule of the NAS of Ukraine language teaching centre.' },
  { course: 1, uk: 'Філософія — за розкладом Центру гуманітарної освіти НАН України.',
    en: 'Philosophy — according to the schedule of the NAS of Ukraine Centre for Humanities Education.' },
  { course: 2, uk: 'Педагогічна практика (викладач Борисенко Максим Юрійович) — дати узгоджуються.',
    en: 'Teaching practice (instructor Maksym Yuriiovych Borysenko) — dates to be agreed.' },
  { course: 2, uk: 'Заняття з методів визначення реологічних параметрів у червні: дати уточнюються (у затвердженій таблиці дати не відповідають дням тижня).',
    en: 'June sessions for methods of determining rheological parameters: dates require confirmation (the provided dates do not match weekdays).' },
  { course: 3, uk: 'Педагогічна практика (викладач Борисенко Максим Юрійович) — дати у грудні та січні узгоджуються.',
    en: 'Teaching practice (instructor Maksym Yuriiovych Borysenko) — December and January dates to be agreed.' }
] as const;

export const availableMonths = [
  '2026-10', '2026-11', '2026-12', '2027-01', '2027-02',
  '2027-03', '2027-04', '2027-05', '2027-06', '2027-07'
] as const;
