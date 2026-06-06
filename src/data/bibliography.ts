import type { BibliographyTag } from './bibliographyTags';

export type BibliographyLanguage = 'uk' | 'en' | 'ru' | 'de' | 'other';

export type BibliographyType =
  | 'monograph'
  | 'textbook'
  | 'handbook'
  | 'dictionary'
  | 'edited-volume'
  | 'chapter'
  | 'series-volume';

export type BibliographyEntry = {
  id: string;
  authors: string;
  title: string;
  year: number | null;
  publisher: string;
  pages?: string;
  isbn?: string;
  doi?: string;
  url?: string;
  language: BibliographyLanguage;
  type: BibliographyType;
  tags: BibliographyTag[];
  note?: string;
  inLibraryOfCongress?: boolean;
};

export const bibliography = [
  {
    id: 'lugovyi-meish-meish-2022-dynamika-obolonkovykh-struktur',
    authors: 'Луговий П.З., Мейш В.Ф., Мейш Ю.В.',
    title: 'Динаміка конструктивнонеоднорідних оболонкових структур',
    year: 2022,
    publisher: 'Київ: Видавництво Ліра',
    pages: '326 с.',
    isbn: '978-617-520-320-0',
    language: 'uk',
    type: 'monograph',
    tags: ['shells-plates', 'dynamics-waves', 'monograph'],
    note: 'Монографія з блоку сучасних видань співробітників Інституту.'
  },
  {
    id: 'hryhorenko-budak-hryhorenko-2010-zadachi-teorii-obolonok',
    authors: 'Григоренко Я.М., Будак В.Д., Григоренко О.Я.',
    title: 'Розв’язання задач теорії оболонок на основі дискретно-континуальних методів',
    year: 2010,
    publisher: 'Миколаїв: Іліон',
    pages: '294 с.',
    language: 'uk',
    type: 'textbook',
    tags: ['shells-plates', 'numerical-methods', 'textbook'],
    note: 'Навчальний посібник з бібліотечного переліку.'
  },
  {
    id: 'hryhorenko-molchenko-2010-osnovy-teorii-plastyn-obolonok',
    authors: 'Григоренко Я.М., Мольченко Л.В.',
    title: 'Основи теорії пластин та оболонок з елементами магнітопружності',
    year: 2010,
    publisher: 'Київ: ВПЦ «Київський університет»',
    pages: '403 с.',
    language: 'uk',
    type: 'textbook',
    tags: ['shells-plates', 'solid-mechanics', 'textbook'],
    note: 'Навчальне видання з бібліотечного переліку.'
  },
  {
    id: 'kubenko-kovalchuk-podchasov-1989-nonlineinye-kolebaniia-tsilindricheskikh-obolochek',
    authors: 'Кубенко В.Д., Ковальчук П.С., Подчасов Н.П.',
    title: 'Нелинейные колебания цилиндрических оболочек',
    year: 1989,
    publisher: 'Київ: Вища школа',
    pages: '208 с.',
    language: 'ru',
    type: 'textbook',
    tags: ['shells-plates', 'dynamics-waves', 'stability-control', 'textbook'],
    note: 'Навчальне видання з бібліотечного переліку.'
  },
  {
    id: 'guz-babich-1980-trekhmernaia-teoriia-ustoichivosti-sterzhnei-plastin-obolochek',
    authors: 'Гузь А.Н., Бабич И.Ю.',
    title: 'Трехмерная теория устойчивости стержней, пластин и оболочек',
    year: 1980,
    publisher: 'Київ: Вища школа',
    pages: '168 с.',
    language: 'ru',
    type: 'textbook',
    tags: ['shells-plates', 'stability-control', 'solid-mechanics', 'textbook'],
    note: 'У старому списку позначене як представлене в Бібліотеці Конгресу США.',
    inLibraryOfCongress: true
  },
  {
    id: 'hryhorenko-vasylenko-pankratova-1985-statyka-anizotropnykh-tonkostennykh-obolochek',
    authors: 'Григоренко Я.М., Василенко А.Т., Панкратова Н.Д.',
    title: 'Статика анизотропных тонкостенных оболочек',
    year: 1985,
    publisher: 'Київ: Вища школа',
    pages: '190 с.',
    language: 'ru',
    type: 'textbook',
    tags: ['shells-plates', 'solid-mechanics', 'textbook'],
    note: 'Навчальне видання з бібліотечного переліку.'
  },
  {
    id: 'kilchevskii-izdebskaia-kiselevskaia-1974-lektsii-po-analiticheskoi-mekhanike-obolochek',
    authors: 'Кильчевский Н.А., Издебская Г.А., Киселевская Л.М.',
    title: 'Лекции по аналитической механике оболочек',
    year: 1974,
    publisher: 'Київ: Вища школа',
    pages: '231 с.',
    language: 'ru',
    type: 'textbook',
    tags: ['shells-plates', 'solid-mechanics', 'textbook'],
    note: 'Лекції з бібліотечного переліку.'
  },
  {
    id: 'guz-glukhov-2020-osesimmetrichnye-volny-kompozitnom-materiale',
    authors: 'Гузь А.Н., Глухов А.Ю.',
    title: 'Осесиммеричные волны в высокоэластичном композитном материале с начальными напряжениями',
    year: 2020,
    publisher: 'Київ: ТОВ «Видавничий будинок «Аванпост-Прим»',
    pages: '94 с.',
    isbn: '978-617-502-416-0',
    language: 'ru',
    type: 'monograph',
    tags: ['composites', 'dynamics-waves', 'initial-stresses', 'monograph'],
    note: 'Монографія з блоку сучасних видань співробітників Інституту.'
  },
  {
    id: 'guz-tomashevskii-shulga-yakovlev-1988-tekhnologicheskie-napriazheniia-kompozitov',
    authors: 'Гузь А.Н., Томашевский В.Т., Шульга Н.А., Яковлев В.С.',
    title: 'Технологические напряжения и деформации композитных материалов',
    year: 1988,
    publisher: 'Київ: Вища школа',
    pages: '270 с.',
    language: 'ru',
    type: 'textbook',
    tags: ['composites', 'materials-mechanics', 'thermoelasticity-creep', 'textbook'],
    note: 'Навчальне видання з бібліотечного переліку.'
  },
  {
    id: 'guz-2022-eight-non-classical-problems-fracture-mechanics',
    authors: 'Guz A.N.',
    title: 'Eight Non-Classical Problems of Fracture Mechanics',
    year: 2022,
    publisher: 'Advanced Structured Materials',
    pages: '400 p.',
    isbn: '978-3030775032',
    language: 'en',
    type: 'monograph',
    tags: ['fracture-mechanics', 'solid-mechanics', 'monograph'],
    note: 'Монографія з блоку сучасних видань співробітників Інституту.'
  },
  {
    id: 'guz-bogdanov-nazarenko-2020-fracture-compression-cracks',
    authors: 'Guz A.N., Bogdanov V.L., Nazarenko V.M.',
    title: 'Fracture of Materials Under Compression Along Cracks',
    year: 2020,
    publisher: 'Cham: Springer International Publishing',
    pages: '504 p.',
    isbn: '978-3-030-51813-4',
    doi: '10.1007/978-3-030-51814-1',
    url: 'https://doi.org/10.1007/978-3-030-51814-1',
    language: 'en',
    type: 'monograph',
    tags: ['fracture-mechanics', 'solid-mechanics', 'monograph'],
    note: 'Springer-монографія з блоку сучасних видань співробітників Інституту.'
  },
  {
    id: 'kaminskyi-dudyk-reshitnyk-2020-mizhfazna-trishchyna',
    authors: 'Камінський А.О., Дудик М.В., Решітник Ю.В.',
    title: 'Моделі структури привершинної області міжфазної тріщини на ламаній межі розділу матеріалів',
    year: 2020,
    publisher: 'Київ, Умань, Бровари: АНФ ГРУП',
    pages: '137 с.',
    isbn: '978-617-7252-22-0',
    url: 'https://dspace.udpu.edu.ua/handle/123456789/13305',
    language: 'uk',
    type: 'monograph',
    tags: ['fracture-mechanics', 'contact-mechanics', 'solid-mechanics', 'monograph'],
    note: 'Монографія з блоку сучасних видань співробітників Інституту; тематично належить до механіки міжфазних тріщин.'
  },
  {
    id: 'guz-2024-elastic-waves-in-bodies-with-initial-stresses',
    authors: 'Guz A.N.',
    title: 'Elastic Waves in Bodies with Initial (Residual) Stresses',
    year: 2024,
    publisher: 'Київ: Академперіодика',
    pages: '668 с.',
    isbn: '978-966-360-519-7',
    doi: '10.15407/akademperiodyka.519.668',
    url: 'https://doi.org/10.15407/akademperiodyka.519.668',
    language: 'en',
    type: 'monograph',
    tags: ['dynamics-waves', 'initial-stresses', 'solid-mechanics', 'monograph'],
    note: 'Монографія з блоку сучасних видань співробітників Інституту.'
  },
  {
    id: 'kubenko-yanchevskyi-2024-dyfraktsiia-akustychnykh-khvyl',
    authors: 'Кубенко В.Д., Янчевський І.В.',
    title: 'Дифракція акустичних хвиль на системах неоднотипних тіл',
    year: 2024,
    publisher: 'Київ: КПІ ім. Ігоря Сікорського, Вид-во «Політехніка»',
    pages: '265 с.',
    isbn: '978-966-990-114-9',
    language: 'uk',
    type: 'monograph',
    tags: ['dynamics-waves', 'acoustics', 'fluid-gas-mechanics', 'monograph'],
    note: 'Монографія з блоку сучасних видань співробітників Інституту.'
  },
  {
    id: 'zhuk-guz-zhuk-2023-radiatsiini-syly-akustychnoho-polia',
    authors: 'Жук О.П., Гузь О.М., Жук Я.О.',
    title: 'Радіаційні сили акустичного поля в рідині з включеннями',
    year: 2023,
    publisher: 'Київ: Альянт',
    pages: '240 с.',
    isbn: '978-617-7819-38-6',
    language: 'uk',
    type: 'monograph',
    tags: ['dynamics-waves', 'acoustics', 'fluid-gas-mechanics', 'monograph'],
    note: 'Монографія з блоку сучасних видань співробітників Інституту.'
  },
  {
    id: 'rushchitsky-2023-evolution-solitary-elastic-waves',
    authors: 'Rushchitsky J.J.',
    title: 'Evolution of Solitary Elastic Waves with Different Initial Profiles',
    year: 2023,
    publisher: 'Chapter 2 in Horizons in Physics, Vol. 312, Nova Science Publishers',
    pages: '252 p.',
    isbn: '979-8-89113-513-0',
    language: 'en',
    type: 'chapter',
    tags: ['dynamics-waves', 'solid-mechanics', 'chapter'],
    note: 'Видання з блоку сучасних праць співробітників Інституту; додано як розділ у виданні.'
  },
  {
    id: 'grigorenko-muller-loza-2021-elastodynamics-piezoceramic-bodies',
    authors: 'Grigorenko A.Ya., Müller W.H., Loza I.A.',
    title: 'Selected Problems in the Elastodynamics of Piezoceramic Bodies',
    year: 2021,
    publisher: 'Advanced Structured Materials',
    pages: '227 p.',
    isbn: '9783030741983',
    doi: '10.1007/978-3-030-74199-0',
    url: 'https://doi.org/10.1007/978-3-030-74199-0',
    language: 'en',
    type: 'monograph',
    tags: ['dynamics-waves', 'piezoelectricity', 'solid-mechanics', 'monograph'],
    note: 'Монографія з блоку сучасних видань співробітників Інституту.'
  },
  {
    id: 'savin-rushchytskyi-1986-elementy-mekhaniky-spadkovykh-seredovyshch',
    authors: 'Савін Г.М., Рущицький Я.Я.',
    title: 'Елементи механіки спадкових середовищ',
    year: 1986,
    publisher: 'Київ: Вища школа',
    pages: '251 с.',
    language: 'uk',
    type: 'textbook',
    tags: ['thermoelasticity-creep', 'materials-mechanics', 'textbook'],
    note: 'Навчальне видання з бібліотечного переліку.'
  },
  {
    id: 'kovalenko-1975-termouprugost',
    authors: 'Коваленко А.Д.',
    title: 'Термоупругость',
    year: 1975,
    publisher: 'Київ: Вища школа',
    pages: '216 с.',
    language: 'ru',
    type: 'textbook',
    tags: ['thermoelasticity-creep', 'solid-mechanics', 'textbook'],
    note: 'У старому списку позначене як представлене в Бібліотеці Конгресу США.',
    inLibraryOfCongress: true
  },
  {
    id: 'kondratenko-kuntsevich-chikrii-gubarev-2024-advanced-control-systems',
    authors: 'Kondratenko Yu.P., Kuntsevich V.M., Chikrii A.A., Gubarev V.F.',
    title: 'Advanced Control Systems Theory and Applications',
    year: 2024,
    publisher: 'River Publishers',
    pages: '476 p.',
    isbn: '978-877-004-308-3',
    language: 'en',
    type: 'monograph',
    tags: ['stability-control', 'monograph'],
    note: 'Монографія з блоку сучасних видань; теорія керування.'
  },
  {
    id: 'aliev-larin-velieva-2022-algorithms-synthesis-optimal-regulators',
    authors: 'Aliev F.A., Larin V.B., Velieva N.I.',
    title: 'Algorithms of the Synthesis of Optimal Regulators',
    year: 2022,
    publisher: 'Outskirts Press',
    pages: '410 p.',
    isbn: '978-197724-985-2',
    language: 'en',
    type: 'monograph',
    tags: ['stability-control', 'numerical-methods', 'monograph'],
    note: 'Монографія з блоку сучасних видань; синтез оптимальних регуляторів.'
  },
  {
    id: 'cruz-hernandez-martynyuk-mazko-2021-stability-control-uncertain-systems',
    authors: 'Cruz-Hernandez C., Martynyuk A.A., Mazko A.G.',
    title: 'Advances in Stability and Control Theory for Uncertain Dynamical Systems',
    year: 2021,
    publisher: 'Stability, Oscillations and Optimization of Systems, Vol. 11',
    pages: '340 p.',
    isbn: '978-1-908106-73-5',
    url: 'https://cambridgescientificpublishers.com/product/volume-eleven-advances-in-stability-and-control-theory-for-uncertain-dynamical-systems',
    language: 'en',
    type: 'monograph',
    tags: ['stability-control', 'dynamics-waves', 'monograph'],
    note: 'Сучасне видання з теорії стійкості та керування невизначеними динамічними системами.'
  },
  {
    id: 'martynyuk-radziszewski-szadkowski-2020-elements-theory-applications',
    authors: 'Martynyuk A.A., Radziszewski B., Szadkowski A.',
    title: 'Elements of the Theory and Applications with Examples',
    year: 2020,
    publisher: 'Sciendo',
    pages: '328 p.',
    doi: '10.2478/9788366675285',
    url: 'https://doi.org/10.2478/9788366675285',
    language: 'en',
    type: 'textbook',
    tags: ['stability-control', 'dynamics-waves', 'textbook'],
    note: 'Видання з прикладами застосування теорії.'
  },
  {
    id: 'obolenskii-2006-lektsii-kachestvennaia-teoriia-differentsialnykh-uravnenii',
    authors: 'Оболенский А.Ю.',
    title: 'Лекции по качественной теории дифференциальных уравнений',
    year: 2006,
    publisher: 'Москва–Ижевск: НИЦ «Регулярная и хаотическая динамика», Институт компьютерных исследований',
    pages: '320 с.',
    language: 'ru',
    type: 'textbook',
    tags: ['stability-control', 'numerical-methods', 'textbook'],
    note: 'Лекції з бібліотечного переліку; якісна теорія диференціальних рівнянь і динамічні системи.'
  },
  {
    id: 'guz-1986-osnovy-trekhmernoi-teorii-ustoichivosti',
    authors: 'Гузь А.Н.',
    title: 'Основы трехмерной теории устойчивости деформируемых тел',
    year: 1986,
    publisher: 'Київ: Вища школа',
    pages: '511 с.',
    language: 'ru',
    type: 'textbook',
    tags: ['stability-control', 'solid-mechanics', 'textbook'],
    note: 'Навчальне видання з бібліотечного переліку.'
  },
  {
    id: 'martyniak-ed-2024-kontaktna-mekhanika-poverkhnevi-yavyshcha',
    authors: 'За заг. ред. Р.М. Мартиняка',
    title: 'Контактна механіка та поверхневі явища',
    year: 2024,
    publisher: 'Львів: Растр-7',
    pages: '224 с.',
    isbn: '978-617-8537-87-6',
    language: 'uk',
    type: 'edited-volume',
    tags: ['contact-mechanics', 'solid-mechanics', 'edited-volume'],
    note: 'Основний запис тематичної групи контактної механіки.'
  },
  {
    id: 'altenbach-bogdanov-2024-selected-problems-solid-mechanics',
    authors: 'Altenbach H., Bogdanov V.',
    title: 'Selected Problems of Solid Mechanics and Solving Methods',
    year: 2024,
    publisher: 'Advanced Structured Materials',
    pages: '544 p.',
    isbn: '978-3031540622',
    doi: '10.1007/978-3-031-54063-9',
    url: 'https://doi.org/10.1007/978-3-031-54063-9',
    language: 'en',
    type: 'edited-volume',
    tags: ['solid-mechanics', 'contact-mechanics', 'numerical-methods', 'edited-volume'],
    note: 'Сучасна праця з прикладних задач механіки деформівного твердого тіла та методів їх розв’язання.'
  },
  {
    id: 'rushchitsky-2021-foundations-mechanics-materials',
    authors: 'Rushchitsky J.J.',
    title: 'Foundations of Mechanics of Materials',
    year: 2021,
    publisher: 'Copenhagen: Ventus Publishing ApS',
    pages: '276 p.',
    isbn: '978-87-403-3706-8',
    url: 'https://bookboon.com/premium/books/foundations-of-mechanics-of-materials-part-1',
    language: 'en',
    type: 'textbook',
    tags: ['materials-mechanics', 'solid-mechanics', 'textbook'],
    note: 'Навчально-наукове видання з основ механіки матеріалів.'
  }
] as const satisfies readonly BibliographyEntry[];

export const bibliographyYears = [...new Set(bibliography.map((item) => item.year).filter((year): year is number => typeof year === 'number'))].sort((a, b) => b - a);
export const bibliographyUsedTags = [...new Set(bibliography.flatMap((item) => item.tags))].sort();
export const bibliographyLibraryOfCongressCount = bibliography.filter((item) => item.inLibraryOfCongress).length;
