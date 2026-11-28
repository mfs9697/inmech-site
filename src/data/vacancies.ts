export type VacancyDocumentType = 'competition-order' | 'participant-order' | 'result-order';

export interface VacancyDocument {
  title: string;
  href: string;
  type: VacancyDocumentType;
}

export interface VacancyDepartment {
  title: string;
  href: string;
}

export interface VacancyPosition {
  title: string;
  departments?: VacancyDepartment[];
  count?: number;
}

export interface VacancyCompetition {
  id: string;
  date: string;
  year: number;
  title: string;
  summary: string;
  archiveNote?: string;
  orderNumber?: string;
  publicationDate?: string;
  deadlineDate?: string;
  supervisor?: { name: string; degree: string; href: string };
  positions: VacancyPosition[];
  departments: VacancyDepartment[];
  deadline: string;
  requirements: string[];
  documents: VacancyDocument[];
}

export interface ActiveVacancyTrack {
  id: string;
  label: string;
  title: string;
  positions: VacancyPosition[];
  deadline: string;
  deadlineDate?: string;
  requirements: string[];
  researchTopicLabel?: string;
  researchTopic?: string;
  supervisor?: { name: string; position: string; degree: string; href: string };
  note?: string;
}

export interface ActiveVacancyAnnouncement {
  id: string;
  date: string;
  year: number;
  title: string;
  summary: string;
  positions: VacancyPosition[];
  deadline: string;
  requirements: string[];
  note: string;
  orderNumber?: string;
  publicationDate?: string;
  updatedDate?: string;
  tracks?: ActiveVacancyTrack[];
  documents?: {
    title: string;
    href: string;
  }[];
}

function documentsFor(id: string): VacancyDocument[] {
  if (id === '2026-10-01-competition-19') {
    return [
      { title: 'Наказ про проведення конкурсів від 01.10.2026 № 118/к', href: `/vacancies/${id}/order-competition.pdf`, type: 'competition-order' },
      { title: 'Наказ про затвердження учасників від 10.11.2026 № 153/к', href: `/vacancies/${id}/order-participants.pdf`, type: 'participant-order' },
      { title: 'Наказ про затвердження результатів від 12.11.2026 № 184/к', href: `/vacancies/${id}/order-results.pdf`, type: 'result-order' }
    ];
  }
  return [
    {
      title: 'Наказ про конкурс',
      href: `/vacancies/${id}/order-competition.pdf`,
      type: 'competition-order'
    },
    {
      title: 'Наказ про затвердження учасників',
      href: `/vacancies/${id}/order-participants.pdf`,
      type: 'participant-order'
    },
    {
      title: 'Наказ про затвердження результатів',
      href: `/vacancies/${id}/order-results.pdf`,
      type: 'result-order'
    }
  ];
}

const generalResearchRequirements = [
  'вища освіта з напряму «механіка» («механіка деформівного твердого тіла» або «теоретична механіка») та науковий ступінь доктора філософії або кандидата наук;',
  'результати наукової діяльності, кількість і якість яких відповідають рівню зазначених наукових ступенів.'
];

const doctorResearchRequirements = [
  'вища освіта з напряму «механіка» («механіка деформівного твердого тіла» або «теоретична механіка») та науковий ступінь доктора наук;',
  'результати наукової діяльності, кількість і якість яких відповідають рівню зазначеного наукового ступеня.'
];

const postdocRequirements = [
  'громадянство України;',
  'науковий ступінь кандидата наук або доктора філософії;',
  'на момент завершення конкурсного відбору — вік до 40 років включно;',
  'на момент завершення конкурсного відбору від дати захисту дисертації минуло не більше 10 років;',
  'досвід у проведенні наукових досліджень та/або науково-технічних (експериментальних) розробок за напрямом наукової роботи, до виконання якої планується залучити претендента;',
  'кандидат не працює за основним місцем роботи в Інституті механіки ім. С. П. Тимошенка НАН України.'
];

export const activeVacancyAnnouncements: ActiveVacancyAnnouncement[] = [
  {
    "id": "2026-11-26-competition-20",
    "date": "2026-11-26",
    "year": 2026,
    "orderNumber": "141/к",
    "publicationDate": "2026-11-28",
    "title": "Конкурс № 141/к на заміщення вакантних посад наукових працівників",
    "summary": "Конкурс на чотири наукові посади у відділах Інституту (3,5 штатної одиниці).",
    "positions": [
      {
        "title": "завідувач відділу — 1,0 штатної одиниці",
        "departments": [
          {
            "title": "Відділ теорії коливань",
            "href": "/departments/11-vibrations/"
          }
        ]
      },
      {
        "title": "завідувач відділу — 1,0 штатної одиниці",
        "departments": [
          {
            "title": "Відділ механіки повзучості",
            "href": "/departments/08-creep/"
          }
        ]
      },
      {
        "title": "провідний науковий співробітник — 1,0 штатної одиниці",
        "departments": [
          {
            "title": "Відділ будівельної механіки тонкостінних конструкцій",
            "href": "/departments/05-thin-walled-structures/"
          }
        ]
      },
      {
        "title": "молодший науковий співробітник — 0,5 штатної одиниці",
        "departments": [
          {
            "title": "Відділ обчислювальної механіки та техніки",
            "href": "/departments/03-computational-mechanics-engineering/"
          }
        ]
      }
    ],
    "deadline": "30 календарних днів від дня оприлюднення оголошення — до 28.12.2026 включно.",
    "requirements": [
      "вища освіта відповідного наукового напряму не нижче магістерського рівня;",
      "результати наукової діяльності, що відповідають рівню посади;",
      "для посад завідувача відділу та провідного наукового співробітника — науковий ступінь доктора наук або доктора філософії (кандидата наук)."
    ],
    "note": "Документи подаються відповідно до пункту 11 Положення Інституту за адресою: вул. П. Нестерова, 3, м. Київ, 03057, або електронною поштою inst_mech@inmech.kyiv.ua. Приймання документів та роз’яснення щодо конкурсу — Михайло Федорович Селіванов, заступник директора з наукової роботи.",
    "tracks": [
      {
        "id": "research-positions",
        "label": "Наукові посади",
        "title": "Конкурс на заміщення вакантних посад",
        "positions": [
          {
            "title": "завідувач відділу — 1,0 штатної одиниці",
            "departments": [
              {
                "title": "Відділ теорії коливань",
                "href": "/departments/11-vibrations/"
              }
            ]
          },
          {
            "title": "завідувач відділу — 1,0 штатної одиниці",
            "departments": [
              {
                "title": "Відділ механіки повзучості",
                "href": "/departments/08-creep/"
              }
            ]
          },
          {
            "title": "провідний науковий співробітник — 1,0 штатної одиниці",
            "departments": [
              {
                "title": "Відділ будівельної механіки тонкостінних конструкцій",
                "href": "/departments/05-thin-walled-structures/"
              }
            ]
          },
          {
            "title": "молодший науковий співробітник — 0,5 штатної одиниці",
            "departments": [
              {
                "title": "Відділ обчислювальної механіки та техніки",
                "href": "/departments/03-computational-mechanics-engineering/"
              }
            ]
          }
        ],
        "deadline": "30 календарних днів від дня оприлюднення оголошення — до 28.12.2026 включно.",
        "deadlineDate": "2026-12-28",
        "requirements": [
          "вища освіта відповідного наукового напряму не нижче магістерського рівня;",
          "результати наукової діяльності, що відповідають рівню посади;",
          "для посад завідувача відділу та провідного наукового співробітника — науковий ступінь доктора наук або доктора філософії (кандидата наук)."
        ]
      }
    ],
    "documents": [
      {
        "title": "Наказ від 26.11.2026 № 141/к про проведення конкурсу (зі складом конкурсної комісії)",
        "href": "/documents/vacancies/active/2026-11-26-competition-141k/order-competition.pdf"
      }
    ]
  }
];

const competitions = [
  {
    id: '2026-10-01-competition-19',
    date: '2026-10-01',
    year: 2026,
    orderNumber: '118/к',
    publicationDate: '2026-10-21',
    // The 20 November date applied to the head-of-department track, not the postdoctoral track.
    deadlineDate: '2026-11-20',
    supervisor: {
      name: 'Мартиняк Ростислав Михайлович',
      degree: 'доктор фізико-математичних наук',
      href: '/people/martynyak/'
    },
    title: 'Конкурс № 118/к: завідувачі відділів і постдокторальний відбір',
    summary: 'Конкурс на дві посади завідувачів відділів та участь у програмі постдокторальних досліджень НАН України.',
    archiveNote: 'Наказ про затвердження учасників № 153/к від 10.11.2026; наказ про результати № 184/к від 12.11.2026. Результати постдокторального відбору набувають чинності лише після затвердження Президією НАН України (п. 3.8 Положення).',
    positions: [
      {
        title: 'завідувач відділу — 1,0 штатної одиниці',
        departments: [{ title: 'Відділ реології', href: '/departments/02-rheology/' }]
      },
      {
        title: 'завідувач відділу — 1,0 штатної одиниці',
        departments: [{ title: 'Відділ термопластичності', href: '/departments/06-thermoplasticity/' }]
      },
      { title: 'участь у програмі постдокторальних досліджень НАН України — 1 місце' }
    ],
    deadline: 'Для посад завідувачів відділів — до 20.11.2026 включно. Для постдокторального відбору — згідно з умовами програми НАН України.',
    requirements: [
      'Для посад завідувачів — науковий ступінь та результати наукової діяльності відповідно до чинного порядку конкурсу на наукові посади.',
      'Для постдока — спеціальні вимоги Положення про програму постдокторальних досліджень НАН України в редакції постанови Президії від 07.05.2025 № 164.'
    ]
  },
  {
    id: '2026-07-20-competition-18',
    date: '2026-07-20',
    year: 2026,
    title: 'Оголошення про конкурс на заміщення вакантних посад наукових працівників',
    summary: 'Активне оголошення про конкурс на наукові посади у відділах Інституту.',
    positions: [
      {
        title: 'старший науковий співробітник',
        departments: [{ title: 'Відділ будівельної механіки тонкостінних конструкцій', href: '/departments/05-thin-walled-structures/' }]
      },
      {
        title: 'старший науковий співробітник',
        departments: [{ title: 'Відділ механіки руйнування матеріалів', href: '/departments/09-fracture-mechanics/' }]
      },
      {
        title: 'провідний науковий співробітник',
        departments: [{ title: 'Відділ термопружності', href: '/departments/07-thermoelasticity/' }]
      },
      {
        title: 'провідний науковий співробітник',
        departments: [{ title: 'Відділ обчислювальної механіки та техніки', href: '/departments/03-computational-mechanics-engineering/' }]
      },
      {
        title: 'провідний науковий співробітник',
        departments: [{ title: 'Відділ реології', href: '/departments/02-rheology/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення.',
    requirements: [
      'для посад старшого наукового співробітника - вища освіта з напряму «механіка» («механіка деформівного твердого тіла» або «теоретична механіка») та науковий ступінь доктора філософії або кандидата наук;',
      'для посад провідного наукового співробітника - вища освіта з напряму «механіка» («механіка деформівного твердого тіла» або «теоретична механіка») та науковий ступінь доктора наук;',
      'результати наукової діяльності, кількість і якість яких відповідають рівню зазначених наукових ступенів.'
    ],
    note: 'Наказ від 20 липня 2026 року № 84/к додано до картки конкурсу.',
    documents: [
      {
        title: 'Наказ про проведення конкурсу на заміщення вакантних посад від 20.07.2026 № 84/к',
        href: '/documents/vacancies/active/2026-07-20-competition/order-competition.pdf'
      }
    ]
  },
  {
    id: '2026-03-17-competition-17',
    date: '2026-03-17',
    year: 2026,
    title: 'Заміщення вакантної посади наукового працівника',
    summary: 'Конкурс на посаду молодшого наукового співробітника.',
    positions: [
      {
        title: 'молодший науковий співробітник',
        departments: [{ title: 'Відділ будівельної механіки тонкостінних конструкцій', href: '/departments/05-thin-walled-structures/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (17.03.2026).',
    requirements: [
      'вища освіта за спеціальністю «механіка» (зокрема «механіка деформівного твердого тіла» або «теоретична механіка»);',
      'підготовка в аспірантурі або інша еквівалентна наукова підготовка; наявність наукового ступеня не є обов’язковою;',
      'наукові результати та публікації у фахових наукових виданнях, рівень, кількість і якість яких відповідають вимогам до відповідної посади.'
    ]
  },
  {
    id: '2026-02-05-competition-16',
    date: '2026-02-05',
    year: 2026,
    title: 'Заміщення вакантних посад наукових працівників',
    summary: 'Конкурс на керівну та наукові посади у відділах Інституту.',
    positions: [
      {
        title: 'завідувач відділу',
        departments: [{ title: 'Відділ будівельної механіки тонкостінних конструкцій', href: '/departments/05-thin-walled-structures/' }]
      },
      {
        title: 'дві посади старшого наукового співробітника (0,5 ставки)',
        count: 2,
        departments: [{ title: 'Відділ будівельної механіки тонкостінних конструкцій', href: '/departments/05-thin-walled-structures/' }]
      },
      {
        title: 'молодший науковий співробітник',
        departments: [{ title: 'Відділ механіки повзучості', href: '/departments/08-creep/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (05.02.2026).',
    requirements: doctorResearchRequirements
  },
  {
    id: '2025-12-30-competition-15',
    date: '2025-12-30',
    year: 2025,
    title: 'Заміщення вакантної посади наукового працівника',
    summary: 'Конкурс на посаду провідного наукового співробітника.',
    positions: [
      {
        title: 'провідний науковий співробітник',
        departments: [{ title: 'Відділ обчислювальних методів', href: '/departments/04-computational-methods/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (30.12.2025).',
    requirements: doctorResearchRequirements
  },
  {
    id: '2025-09-02-competition-14',
    date: '2025-09-02',
    year: 2025,
    title: 'Заміщення вакантної посади',
    summary: 'Конкурс на інженерну посаду у відділі механіки руйнування матеріалів.',
    positions: [
      {
        title: 'провідний інженер',
        departments: [{ title: 'Відділ механіки руйнування матеріалів', href: '/departments/09-fracture-mechanics/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (02.09.2025).',
    requirements: [
      'вища освіта з напряму «механіка» («механіка деформівного твердого тіла» або «теоретична механіка»).'
    ]
  },
  {
    id: '2025-08-07-competition-13',
    date: '2025-08-07',
    year: 2025,
    title: 'Заміщення вакантної посади наукового працівника',
    summary: 'Конкурс на посаду старшого наукового співробітника.',
    positions: [
      {
        title: 'старший науковий співробітник',
        departments: [{ title: 'Відділ стійкості процесів', href: '/departments/10-stability-processes/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (07.08.2025).',
    requirements: [
      'вища освіта з напряму «механіка» («механіка деформівного твердого тіла» або «теоретична механіка») та науковий ступінь кандидата фізико-математичних наук або доктора філософії;',
      'результати наукової діяльності, кількість і якість яких відповідають рівню зазначених наукових ступенів.'
    ]
  },
  {
    id: '2025-05-13-competition-12',
    date: '2025-05-13',
    year: 2025,
    title: 'Заміщення вакантних посад наукових працівників',
    summary: 'Конкурс на посади у відділі обчислювальних методів.',
    positions: [
      {
        title: 'провідний науковий співробітник (0,5 ставки)',
        departments: [{ title: 'Відділ обчислювальних методів', href: '/departments/04-computational-methods/' }]
      },
      {
        title: 'молодший науковий співробітник',
        departments: [{ title: 'Відділ обчислювальних методів', href: '/departments/04-computational-methods/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (13.05.2025).',
    requirements: [
      'вища освіта з напряму «механіка» («механіка деформівного твердого тіла» або «теоретична механіка») та науковий ступінь доктора наук для вакансії провідного наукового співробітника;',
      'результати наукової діяльності, кількість і якість яких відповідають рівню зазначених наукових ступенів.'
    ]
  },
  {
    id: '2025-03-20-competition-11',
    date: '2025-03-20',
    year: 2025,
    title: 'Заміщення вакантної посади наукового працівника',
    summary: 'Конкурс на посаду старшого наукового співробітника.',
    positions: [
      {
        title: 'старший науковий співробітник',
        departments: [{ title: 'Відділ реології', href: '/departments/02-rheology/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (20.03.2025).',
    requirements: generalResearchRequirements
  },
  {
    id: '2025-02-06-competition-10',
    date: '2025-02-06',
    year: 2025,
    title: 'Заміщення вакантної посади наукового працівника',
    summary: 'Конкурс на посаду старшого наукового співробітника.',
    positions: [
      {
        title: 'старший науковий співробітник',
        departments: [{ title: 'Відділ механіки повзучості', href: '/departments/08-creep/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (06.02.2025).',
    requirements: generalResearchRequirements
  },
  {
    id: '2024-10-24-competition-09',
    date: '2024-10-24',
    year: 2024,
    title: 'Заміщення вакантної посади наукового працівника',
    summary: 'Конкурс на посаду старшого наукового співробітника.',
    positions: [
      {
        title: 'старший науковий співробітник (0,5 ставки)',
        departments: [{ title: 'Відділ механіки руйнування матеріалів', href: '/departments/09-fracture-mechanics/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (24.10.2024).',
    requirements: generalResearchRequirements
  },
  {
    id: '2024-09-17-competition-08',
    date: '2024-09-17',
    year: 2024,
    title: 'Заміщення вакантних посад наукових працівників',
    summary: 'Конкурс на посади головного та провідних наукових співробітників.',
    positions: [
      {
        title: 'головний науковий співробітник (0,5 ставки)',
        departments: [{ title: 'Відділ механіки руйнування матеріалів', href: '/departments/09-fracture-mechanics/' }]
      },
      {
        title: 'провідний науковий співробітник (0,5 ставки)',
        departments: [{ title: 'Відділ термопружності', href: '/departments/07-thermoelasticity/' }]
      },
      {
        title: 'провідний науковий співробітник (0,5 ставки)',
        departments: [{ title: 'Відділ будівельної механіки тонкостінних конструкцій', href: '/departments/05-thin-walled-structures/' }]
      },
      {
        title: 'провідний науковий співробітник',
        departments: [{ title: 'Відділ теорії коливань', href: '/departments/11-vibrations/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (17.09.2024).',
    requirements: doctorResearchRequirements
  },
  {
    id: '2024-08-06-competition-07',
    date: '2024-08-06',
    year: 2024,
    title: 'Участь у програмі постдокторальних досліджень',
    summary: 'Конкурс для участі у програмі постдокторальних досліджень у НАН України.',
    positions: [
      { title: 'участь у програмі постдокторальних досліджень у Національній академії наук України' }
    ],
    deadline: 'до 10.08.2024.',
    requirements: postdocRequirements
  },
  {
    id: '2024-07-11-competition-06',
    date: '2024-07-11',
    year: 2024,
    title: 'Заміщення вакантних посад',
    summary: 'Конкурс на керівні посади у наукових відділах Інституту.',
    positions: [
      {
        title: 'заступник завідувача відділу',
        departments: [{ title: 'Відділ термопружності', href: '/departments/07-thermoelasticity/' }]
      },
      {
        title: 'завідувач відділу',
        departments: [{ title: 'Відділ термопластичності', href: '/departments/06-thermoplasticity/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (15.07.2024).',
    requirements: [
      'вища освіта з напряму «механіка» («механіка деформівного твердого тіла» або «теоретична механіка»);',
      'для посади заступника завідувача відділу - науковий ступінь доктора філософії, кандидата або доктора наук;',
      'для посади завідувача відділу - науковий ступінь доктора наук;',
      'результати наукової діяльності, кількість і якість яких відповідають рівню зазначених наукових ступенів.'
    ]
  },
  {
    id: '2024-05-10-competition-05',
    date: '2024-05-10',
    year: 2024,
    title: 'Участь у програмі постдокторальних досліджень',
    summary: 'Конкурс для участі у програмі постдокторальних досліджень у НАН України.',
    positions: [
      { title: 'участь у програмі постдокторальних досліджень у Національній академії наук України' }
    ],
    deadline: 'до 10.06.2024.',
    requirements: postdocRequirements
  },
  {
    id: '2024-04-01-competition-03',
    date: '2024-04-01',
    year: 2024,
    title: 'Заміщення вакантних посад',
    summary: 'Конкурс на посади молодшого наукового співробітника та заступника завідувача відділу.',
    positions: [
      {
        title: 'молодший науковий співробітник',
        departments: [{ title: 'Відділ динаміки та стійкості суцільних середовищ', href: '/departments/01-dynamics-stability/' }]
      },
      {
        title: 'заступник завідувача відділу',
        departments: [{ title: 'Відділ термопластичності', href: '/departments/06-thermoplasticity/' }]
      }
    ],
    deadline: '30 календарних днів з моменту оприлюднення оголошення (01.04.2024).',
    requirements: [
      'вища освіта з напряму «механіка» («механіка деформівного твердого тіла» або «теоретична механіка»);',
      'для посади заступника завідувача відділу - науковий ступінь доктора філософії, кандидата або доктора наук;',
      'результати наукової діяльності, кількість і якість яких відповідають вищій освіті другого (магістерського) рівня для першої вакансії і рівню доктора філософії, кандидата або доктора наук для другої вакансії.'
    ]
  }
];

export const vacancyArchive: VacancyCompetition[] = competitions.map((competition) => ({
  ...competition,
  documents: documentsFor(competition.id)
}));
