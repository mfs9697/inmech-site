import type { BibliographyEntry } from './bibliography';

export const bibliographyModernAdditions = [
  {
    id: 'guz-altenbach-2023-current-research-results-nas-ukraine',
    authors: 'Guz A.N., Altenbach H.',
    title: 'Current Research Results of the NAS of Ukraine',
    year: 2023,
    publisher: 'Springer',
    pages: '585 p.',
    isbn: '978-3031373121',
    url: 'https://link.springer.com/book/10.1007/978-3-031-37313-8',
    language: 'en',
    type: 'edited-volume',
    tags: ['solid-mechanics', 'edited-volume', 'monograph'],
    note: 'Колективне видання з блоку сучасних публікацій співробітників Інституту.'
  },
  {
    id: 'zahorodnii-yermoliev-bogdanov-yermolieva-2020-few-nexus-ua',
    authors: 'За ред. Загороднього А.Г., Єрмольєва Ю.М., Богданова В.Л., Єрмольєвої Т.Ю.',
    title: 'Взаємозв’язки в системі продовольство, енергія та вода для сталого розвитку: інтегроване моделювання та надійне управління',
    year: 2020,
    publisher: 'Київ: Академперіодика',
    pages: '446 с.',
    isbn: '978-966-02-9344-1',
    language: 'uk',
    type: 'edited-volume',
    tags: ['interdisciplinary-modeling', 'stability-control', 'numerical-methods', 'edited-volume'],
    note: 'Колективне видання з інтегрованого моделювання та надійного управління.'
  },
  {
    id: 'zagorodny-ermoliev-bogdanov-ermolieva-2020-few-nexus-en',
    authors: 'Zagorodny A.G., Ermoliev Yu.M., Bogdanov V.L., Ermolieva T.Yu.',
    title: 'FEW Nexus for Sustainable Development: Integrated Modeling & Robust Management',
    year: 2020,
    publisher: 'Kyiv: Akademperiodyka',
    pages: '446 p.',
    isbn: '978-966-02-9344-1',
    language: 'en',
    type: 'edited-volume',
    tags: ['interdisciplinary-modeling', 'stability-control', 'numerical-methods', 'edited-volume'],
    note: 'English-language edition on food–energy–water nexus modeling and robust management.'
  },
  {
    id: 'hrachov-khorevin-2020-akademichna-nauka-krain-svitu',
    authors: 'Грачов О.О., Хоревін В.І.',
    title: 'Академічна наука країн світу',
    year: 2020,
    publisher: 'Київ: Фенікс',
    pages: '576 с.',
    isbn: '978-966-136-724-0',
    language: 'uk',
    type: 'monograph',
    tags: ['history-of-science', 'monograph'],
    note: 'Видання з історії та організації академічної науки.'
  },
  {
    id: 'zagorodniy-2021-nas-ukraine-1991-2021',
    authors: 'Zagorodniy A.G.',
    title: 'National Academy of Sciences of Ukraine in 1991–2021. To the 30th Anniversary of Independence of Ukraine',
    year: 2021,
    publisher: 'Kyiv: Akademperiodyka',
    pages: '228 p.',
    isbn: '978-966-360-441-1',
    doi: '10.15407/academperiodyka.441.228',
    url: 'https://doi.org/10.15407/academperiodyka.441.228',
    language: 'en',
    type: 'monograph',
    tags: ['history-of-science', 'monograph'],
    note: 'Видання з історії НАН України до 30-річчя незалежності України.'
  },
  {
    id: 'chornoivan-2022-kurs-vyshchoi-matematyky',
    authors: 'Чорноіван Ю.О.',
    title: 'Курс вищої математики (короткий конспект лекцій)',
    year: 2022,
    publisher: 'Сайт дистанційної освіти КНУБіА',
    pages: '94 с.',
    url: 'http://org2.knuba.edu.ua/pluginfile.php/14036/mod_resource/content/47/lect2.pdf',
    language: 'uk',
    type: 'textbook',
    tags: ['numerical-methods', 'textbook'],
    note: 'Навчальний матеріал з блоку сучасних видань.'
  }
] as const satisfies readonly BibliographyEntry[];
