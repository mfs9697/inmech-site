import type { ActiveVacancyAnnouncement, VacancyCompetition, VacancyDocument, VacancyDocumentType } from './vacancies';

function documentsFor(id: string): VacancyDocument[] {
  return [
    {
      title: 'Order announcing the competition',
      href: `/vacancies/${id}/order-competition.pdf`,
      type: 'competition-order'
    },
    {
      title: 'Order approving the participants',
      href: `/vacancies/${id}/order-participants.pdf`,
      type: 'participant-order'
    },
    {
      title: 'Order approving the results',
      href: `/vacancies/${id}/order-results.pdf`,
      type: 'result-order'
    }
  ];
}

const generalResearchRequirements = [
  'higher education in mechanics, including mechanics of deformable solids or theoretical mechanics, and a PhD or Candidate of Sciences degree;',
  'research results whose quantity and quality correspond to the stated academic degree.'
];

const doctorResearchRequirements = [
  'higher education in mechanics, including mechanics of deformable solids or theoretical mechanics, and a Doctor of Sciences degree;',
  'research results whose quantity and quality correspond to the stated academic degree.'
];

const postdocRequirements = [
  'citizenship of Ukraine;',
  'Candidate of Sciences degree or PhD;',
  'the candidate is not employed at the S. P. Timoshenko Institute of Mechanics of the NAS of Ukraine as their principal place of work;',
  'the candidate has not reached the age of 36 by the completion date of the competitive selection;',
  'no more than seven years have passed since the dissertation defence.'
];

export const activeVacancyAnnouncementsEn: ActiveVacancyAnnouncement[] = [
  {
    id: '2026-07-20-active-announcement',
    date: '2026-07-20',
    year: 2026,
    title: 'Announcement of a Competition to Fill Vacant Research Positions',
    summary: 'Active announcement of a competition for research positions in the Institute departments.',
    positions: [
      {
        title: 'senior research scientist',
        departments: [{ title: 'Department of Structural Mechanics of Thin-Walled Structures', href: '/en/departments/05-thin-walled-structures/' }]
      },
      {
        title: 'senior research scientist',
        departments: [{ title: 'Department of Fracture Mechanics of Materials', href: '/en/departments/09-fracture-mechanics/' }]
      },
      {
        title: 'leading research scientist',
        departments: [{ title: 'Department of Thermoelasticity', href: '/en/departments/07-thermoelasticity/' }]
      },
      {
        title: 'leading research scientist',
        departments: [{ title: 'Department of Computational Mechanics and Engineering', href: '/en/departments/03-computational-mechanics-engineering/' }]
      },
      {
        title: 'leading research scientist',
        departments: [{ title: 'Department of Rheology', href: '/en/departments/02-rheology/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement.',
    requirements: [
      'for the senior research scientist positions: higher education in mechanics, including mechanics of deformable solids or theoretical mechanics, and a PhD or Candidate of Sciences degree;',
      'for leading research scientist positions: higher education in mechanics, including mechanics of deformable solids or theoretical mechanics, and a Doctor of Sciences degree;',
      'research results whose quantity and quality correspond to the stated academic degrees.'
    ],
    note: 'Order No. 84/к of 20 July 2026 has been added to the competition card.',
    documents: [
      {
        title: 'Order No. 84/к of 20 July 2026 announcing the competition to fill vacant positions',
        href: '/documents/vacancies/active/2026-07-20-competition/order-competition.pdf'
      }
    ]
  }
];

const competitions: Omit<VacancyCompetition, 'documents'>[] = [
  {
    id: '2026-03-17-competition-17',
    date: '2026-03-17',
    year: 2026,
    title: 'Competition to Fill a Vacant Research Position',
    summary: 'Competition for the position of junior research scientist.',
    positions: [
      {
        title: 'junior research scientist',
        departments: [{ title: 'Department of Structural Mechanics of Thin-Walled Structures', href: '/en/departments/05-thin-walled-structures/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (17.03.2026).',
    requirements: [
      'higher education in mechanics, including mechanics of deformable solids or theoretical mechanics;',
      'postgraduate training or equivalent research training; an academic degree is not mandatory;',
      'research results and publications in professional scientific journals whose level, quantity and quality correspond to the requirements for the position.'
    ]
  },
  {
    id: '2026-02-05-competition-16',
    date: '2026-02-05',
    year: 2026,
    title: 'Competition to Fill Vacant Research Positions',
    summary: 'Competition for management and research positions in the Institute departments.',
    positions: [
      {
        title: 'head of department',
        departments: [{ title: 'Department of Structural Mechanics of Thin-Walled Structures', href: '/en/departments/05-thin-walled-structures/' }]
      },
      {
        title: 'two senior research scientist positions (0.5 FTE)',
        count: 2,
        departments: [{ title: 'Department of Structural Mechanics of Thin-Walled Structures', href: '/en/departments/05-thin-walled-structures/' }]
      },
      {
        title: 'junior research scientist',
        departments: [{ title: 'Department of Creep Mechanics', href: '/en/departments/08-creep/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (05.02.2026).',
    requirements: doctorResearchRequirements
  },
  {
    id: '2025-12-30-competition-15',
    date: '2025-12-30',
    year: 2025,
    title: 'Competition to Fill a Vacant Research Position',
    summary: 'Competition for the position of leading research scientist.',
    positions: [
      {
        title: 'leading research scientist',
        departments: [{ title: 'Department of Computational Methods', href: '/en/departments/04-computational-methods/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (30.12.2025).',
    requirements: doctorResearchRequirements
  },
  {
    id: '2025-09-02-competition-14',
    date: '2025-09-02',
    year: 2025,
    title: 'Competition to Fill a Vacant Position',
    summary: 'Competition for an engineering position in the Department of Fracture Mechanics of Materials.',
    positions: [
      {
        title: 'leading engineer',
        departments: [{ title: 'Department of Fracture Mechanics of Materials', href: '/en/departments/09-fracture-mechanics/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (02.09.2025).',
    requirements: [
      'higher education in mechanics, including mechanics of deformable solids or theoretical mechanics.'
    ]
  },
  {
    id: '2025-08-07-competition-13',
    date: '2025-08-07',
    year: 2025,
    title: 'Competition to Fill a Vacant Research Position',
    summary: 'Competition for the position of senior research scientist.',
    positions: [
      {
        title: 'senior research scientist',
        departments: [{ title: 'Department of Stability of Processes', href: '/en/departments/10-stability-processes/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (07.08.2025).',
    requirements: [
      'higher education in mechanics, including mechanics of deformable solids or theoretical mechanics, and a Candidate of Physical and Mathematical Sciences degree or PhD;',
      'research results whose quantity and quality correspond to the stated academic degree.'
    ]
  },
  {
    id: '2025-05-13-competition-12',
    date: '2025-05-13',
    year: 2025,
    title: 'Competition to Fill Vacant Research Positions',
    summary: 'Competition for positions in the Department of Computational Methods.',
    positions: [
      {
        title: 'leading research scientist (0.5 FTE)',
        departments: [{ title: 'Department of Computational Methods', href: '/en/departments/04-computational-methods/' }]
      },
      {
        title: 'junior research scientist',
        departments: [{ title: 'Department of Computational Methods', href: '/en/departments/04-computational-methods/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (13.05.2025).',
    requirements: [
      'higher education in mechanics, including mechanics of deformable solids or theoretical mechanics, and a Doctor of Sciences degree for the leading research scientist vacancy;',
      'research results whose quantity and quality correspond to the stated academic degrees.'
    ]
  },
  {
    id: '2025-03-20-competition-11',
    date: '2025-03-20',
    year: 2025,
    title: 'Competition to Fill a Vacant Research Position',
    summary: 'Competition for the position of senior research scientist.',
    positions: [
      {
        title: 'senior research scientist',
        departments: [{ title: 'Department of Rheology', href: '/en/departments/02-rheology/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (20.03.2025).',
    requirements: generalResearchRequirements
  },
  {
    id: '2025-02-06-competition-10',
    date: '2025-02-06',
    year: 2025,
    title: 'Competition to Fill a Vacant Research Position',
    summary: 'Competition for the position of senior research scientist.',
    positions: [
      {
        title: 'senior research scientist',
        departments: [{ title: 'Department of Creep Mechanics', href: '/en/departments/08-creep/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (06.02.2025).',
    requirements: generalResearchRequirements
  },
  {
    id: '2024-10-24-competition-09',
    date: '2024-10-24',
    year: 2024,
    title: 'Competition to Fill a Vacant Research Position',
    summary: 'Competition for the position of senior research scientist.',
    positions: [
      {
        title: 'senior research scientist (0.5 FTE)',
        departments: [{ title: 'Department of Fracture Mechanics of Materials', href: '/en/departments/09-fracture-mechanics/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (24.10.2024).',
    requirements: generalResearchRequirements
  },
  {
    id: '2024-09-17-competition-08',
    date: '2024-09-17',
    year: 2024,
    title: 'Competition to Fill Vacant Research Positions',
    summary: 'Competition for chief and leading research scientist positions.',
    positions: [
      {
        title: 'chief research scientist (0.5 FTE)',
        departments: [{ title: 'Department of Fracture Mechanics of Materials', href: '/en/departments/09-fracture-mechanics/' }]
      },
      {
        title: 'leading research scientist (0.5 FTE)',
        departments: [{ title: 'Department of Thermoelasticity', href: '/en/departments/07-thermoelasticity/' }]
      },
      {
        title: 'leading research scientist (0.5 FTE)',
        departments: [{ title: 'Department of Structural Mechanics of Thin-Walled Structures', href: '/en/departments/05-thin-walled-structures/' }]
      },
      {
        title: 'leading research scientist',
        departments: [{ title: 'Department of Theory of Vibrations', href: '/en/departments/11-vibrations/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (17.09.2024).',
    requirements: doctorResearchRequirements
  },
  {
    id: '2024-08-06-competition-07',
    date: '2024-08-06',
    year: 2024,
    title: 'Participation in the Postdoctoral Research Programme',
    summary: 'Competition for participation in the postdoctoral research programme of the NAS of Ukraine.',
    positions: [
      { title: 'participation in the postdoctoral research programme of the National Academy of Sciences of Ukraine' }
    ],
    deadline: 'by 10.08.2024.',
    requirements: postdocRequirements
  },
  {
    id: '2024-07-11-competition-06',
    date: '2024-07-11',
    year: 2024,
    title: 'Competition to Fill Vacant Positions',
    summary: 'Competition for management positions in the Institute research departments.',
    positions: [
      {
        title: 'deputy head of department',
        departments: [{ title: 'Department of Thermoelasticity', href: '/en/departments/07-thermoelasticity/' }]
      },
      {
        title: 'head of department',
        departments: [{ title: 'Department of Thermoplasticity', href: '/en/departments/06-thermoplasticity/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (15.07.2024).',
    requirements: [
      'higher education in mechanics, including mechanics of deformable solids or theoretical mechanics;',
      'for the deputy head of department position: PhD, Candidate of Sciences or Doctor of Sciences degree;',
      'for the head of department position: Doctor of Sciences degree;',
      'research results whose quantity and quality correspond to the stated academic degrees.'
    ]
  },
  {
    id: '2024-05-10-competition-05',
    date: '2024-05-10',
    year: 2024,
    title: 'Participation in the Postdoctoral Research Programme',
    summary: 'Competition for participation in the postdoctoral research programme of the NAS of Ukraine.',
    positions: [
      { title: 'participation in the postdoctoral research programme of the National Academy of Sciences of Ukraine' }
    ],
    deadline: 'by 10.06.2024.',
    requirements: postdocRequirements
  },
  {
    id: '2024-04-01-competition-03',
    date: '2024-04-01',
    year: 2024,
    title: 'Competition to Fill Vacant Positions',
    summary: 'Competition for the positions of junior research scientist and deputy head of department.',
    positions: [
      {
        title: 'junior research scientist',
        departments: [{ title: 'Department of Dynamics and Stability of Continua', href: '/en/departments/01-dynamics-stability/' }]
      },
      {
        title: 'deputy head of department',
        departments: [{ title: 'Department of Thermoplasticity', href: '/en/departments/06-thermoplasticity/' }]
      }
    ],
    deadline: '30 calendar days from the publication of the announcement (01.04.2024).',
    requirements: [
      'higher education in mechanics, including mechanics of deformable solids or theoretical mechanics;',
      'for the deputy head of department position: PhD, Candidate of Sciences or Doctor of Sciences degree;',
      'research results whose quantity and quality correspond to second-cycle higher education, Master level, for the first vacancy and to the PhD, Candidate of Sciences or Doctor of Sciences level for the second vacancy.'
    ]
  }
];

export const vacancyArchiveEn: VacancyCompetition[] = competitions.map((competition) => ({
  ...competition,
  documents: documentsFor(competition.id)
}));

export type { VacancyDocumentType };
