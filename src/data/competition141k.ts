import type { ActiveVacancyAnnouncement, VacancyPosition } from './vacancies.ts';

const id = '2026-11-26-competition-20';
const publicationDate = '2026-11-28';
const deadline = new Date(publicationDate + 'T00:00:00Z');
deadline.setUTCDate(deadline.getUTCDate() + 30);
const deadlineDate = deadline.toISOString().slice(0, 10);

const roles = [
  { department: '11-vibrations', uk: ['Завідувач відділу', 'Відділ теорії коливань'], en: ['Head of department', 'Department of Theory of Vibrations'], fte: 1 },
  { department: '08-creep', uk: ['Завідувач відділу', 'Відділ механіки повзучості'], en: ['Head of department', 'Department of Creep Mechanics'], fte: 1 },
  { department: '05-thin-walled-structures', uk: ['Провідний науковий співробітник', 'Відділ будівельної механіки тонкостінних конструкцій'], en: ['Leading research scientist', 'Department of Structural Mechanics of Thin-Walled Structures'], fte: 1 },
  { department: '03-computational-mechanics-engineering', uk: ['Молодший науковий співробітник', 'Відділ обчислювальної механіки та техніки'], en: ['Junior research scientist', 'Department of Computational Mechanics and Engineering'], fte: 0.5 }
];

export function competition141k(locale: 'uk' | 'en'): ActiveVacancyAnnouncement {
  const uk = locale === 'uk';
  const fteFormat = new Intl.NumberFormat(locale, { minimumFractionDigits: 1 });
  const positions: VacancyPosition[] = roles.map(({ department, fte, [locale]: [role, title] }) => ({
    title: `${role} — ${fteFormat.format(fte)} ${uk ? 'штатної одиниці' : 'FTE'}`,
    departments: [{ title, href: `${uk ? '' : '/en'}/departments/${department}/` }],
    fte
  }));
  const formattedDeadline = new Intl.DateTimeFormat(uk ? 'uk-UA' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  }).format(deadline);
  const track = {
    id: 'research-staff',
    label: uk ? 'Кадровий конкурс' : 'Staff recruitment',
    title: uk ? 'Вакантні наукові посади' : 'Vacant research positions',
    positions,
    deadlineDate,
    deadline: uk ? `До ${formattedDeadline} включно (30 календарних днів від дати оприлюднення).`
      : `Through ${formattedDeadline} inclusive (30 calendar days from publication).`,
    requirements: uk ? [
      'Вища освіта відповідного наукового напряму не нижче магістерського рівня.',
      'Результати наукової діяльності, що відповідають рівню посади.',
      'Для завідувачів відділів і провідного наукового співробітника — ступінь доктора наук або доктора філософії (кандидата наук).'
    ] : [
      'Higher education in the relevant scientific field, at least at the master’s level.',
      'Research achievements appropriate to the position.',
      'For heads of departments and the leading research scientist: a Doctor of Sciences or PhD (Candidate of Sciences) degree.'
    ]
  };
  return {
    id, publicationDate, date: '2026-11-26', year: 2026, orderNumber: '141/к',
    title: uk ? 'Конкурс на заміщення вакантних посад наукових працівників' : 'Competition to Fill Vacant Research Positions',
    summary: uk ? 'Чотири вакантні посади (3,5 штатної одиниці).' : 'Four vacant positions (3.5 FTE in total).',
    positions,
    deadline: track.deadline,
    requirements: track.requirements,
    note: uk ? 'Подайте заяву та документи відповідно до пункту 11 Положення Інституту. Перелік документів, адреса та контакт відповідальної особи наведені нижче.'
      : 'Submit your application and documents in accordance with paragraph 11 of the Institute’s competition regulations. See the checklist, address and contact person below.',
    tracks: [track],
    documents: [{
      title: uk ? 'Наказ про проведення конкурсу та затвердження складу конкурсної комісії'
        : 'Order announcing the competition and approving the composition of the competition committee',
      href: `/vacancies/${id}/order-competition.pdf`
    }]
  };
}
