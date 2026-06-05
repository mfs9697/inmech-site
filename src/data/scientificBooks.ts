export type ScientificBook = {
  authors: string;
  title: string;
  year: number | null;
  publisher: string;
  pages: string;
  isbn?: string;
  url?: string;
  category: string;
  note?: string;
  inLibraryOfCongress?: boolean;
};

export const scientificBooks = [
  {
    authors: 'Луговий П.З., Мейш В.Ф., Мейш Ю.В.',
    title: 'Динаміка конструктивнонеоднорідних оболонкових структур',
    year: 2022,
    publisher: 'Київ: Видавництво Ліра',
    pages: '326 с.',
    isbn: '978-617-520-320-0',
    url: '',
    category: 'Механіка оболонок і пластин',
    note: 'Монографія з блоку сучасних видань співробітників Інституту.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Григоренко Я.М., Будак В.Д., Григоренко О.Я.',
    title: 'Розв’язання задач теорії оболонок на основі дискретно-континуальних методів',
    year: 2010,
    publisher: 'Миколаїв: Іліон',
    pages: '294 с.',
    isbn: '',
    url: '',
    category: 'Механіка оболонок і пластин',
    note: 'Навчальний посібник з бібліотечного переліку; додано до тематичної групи оболонок і пластин.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Григоренко Я.М., Мольченко Л.В.',
    title: 'Основи теорії пластин та оболонок з елементами магнітопружності',
    year: 2010,
    publisher: 'Київ: ВПЦ «Київський університет»',
    pages: '403 с.',
    isbn: '',
    url: '',
    category: 'Механіка оболонок і пластин',
    note: 'Навчальне видання з бібліотечного переліку; тематично належить до теорії пластин і оболонок.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Кубенко В.Д., Ковальчук П.С., Подчасов Н.П.',
    title: 'Нелинейные колебания цилиндрических оболочек',
    year: 1989,
    publisher: 'Київ: Вища школа',
    pages: '208 с.',
    isbn: '',
    url: '',
    category: 'Механіка оболонок і пластин',
    note: 'Навчальне видання з бібліотечного переліку; додано до групи оболонкової динаміки.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Гузь А.Н., Бабич И.Ю.',
    title: 'Трехмерная теория устойчивости стержней, пластин и оболочек',
    year: 1980,
    publisher: 'Київ: Вища школа',
    pages: '168 с.',
    isbn: '',
    url: '',
    category: 'Механіка оболонок і пластин',
    note: 'Навчальне видання з бібліотечного переліку; у старому списку позначене як представлене в Бібліотеці Конгресу США.',
    inLibraryOfCongress: true
  },
  {
    authors: 'Григоренко Я.М., Василенко А.Т., Панкратова Н.Д.',
    title: 'Статика анизотропных тонкостенных оболочек',
    year: 1985,
    publisher: 'Київ: Вища школа',
    pages: '190 с.',
    isbn: '',
    url: '',
    category: 'Механіка оболонок і пластин',
    note: 'Навчальне видання з бібліотечного переліку; тематично належить до статики тонкостінних оболонок.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Кильчевский Н.А., Издебская Г.А., Киселевская Л.М.',
    title: 'Лекции по аналитической механике оболочек',
    year: 1974,
    publisher: 'Київ: Вища школа',
    pages: '231 с.',
    isbn: '',
    url: '',
    category: 'Механіка оболонок і пластин',
    note: 'Лекції з бібліотечного переліку; включено до групи аналітичної механіки оболонок.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Гузь А.Н., Глухов А.Ю.',
    title: 'Осесиммеричные волны в высокоэластичном композитном материале с начальными напряжениями',
    year: 2020,
    publisher: 'Київ: ТОВ «Видавничий будинок «Аванпост-Прим»',
    pages: '94 с.',
    isbn: '978-617-502-416-0',
    url: '',
    category: 'Механіка композитів',
    note: 'Монографія з блоку сучасних видань співробітників Інституту; додано до групи композитних матеріалів.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Гузь А.Н., Томашевский В.Т., Шульга Н.А., Яковлев В.С.',
    title: 'Технологические напряжения и деформации композитных материалов',
    year: 1988,
    publisher: 'Київ: Вища школа',
    pages: '270 с.',
    isbn: '',
    url: '',
    category: 'Механіка композитів',
    note: 'Навчальне видання з бібліотечного переліку; тематично належить до механіки композитних матеріалів.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Guz A.N.',
    title: 'Eight Non-Classical Problems of Fracture Mechanics',
    year: 2022,
    publisher: 'Advanced Structured Materials',
    pages: '400 p.',
    isbn: '978-3030775032',
    url: '',
    category: 'Механіка руйнування',
    note: 'Монографія з блоку сучасних видань співробітників Інституту; додано до тематичної групи механіки руйнування.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Guz A.N., Bogdanov V.L., Nazarenko V.M.',
    title: 'Fracture of Materials Under Compression Along Cracks',
    year: 2020,
    publisher: 'Cham: Springer International Publishing',
    pages: '504 p.',
    isbn: '978-3-030-51813-4',
    url: 'https://doi.org/10.1007/978-3-030-51814-1',
    category: 'Механіка руйнування',
    note: 'Springer-монографія з блоку сучасних видань співробітників Інституту.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Камінський А.О., Дудик М.В., Решітник Ю.В.',
    title: 'Моделі структури привершинної області міжфазної тріщини на ламаній межі розділу матеріалів',
    year: 2020,
    publisher: 'Київ, Умань, Бровари: АНФ ГРУП',
    pages: '137 с.',
    isbn: '978-617-7252-22-0',
    url: 'https://dspace.udpu.edu.ua/handle/123456789/13305',
    category: 'Механіка руйнування',
    note: 'Монографія з блоку сучасних видань співробітників Інституту; тематично належить до механіки міжфазних тріщин.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Guz A.N.',
    title: 'Elastic Waves in Bodies with Initial (Residual) Stresses',
    year: 2024,
    publisher: 'Київ: Академперіодика',
    pages: '668 с.',
    isbn: '978-966-360-519-7',
    url: 'https://doi.org/10.15407/akademperiodyka.519.668',
    category: 'Динаміка, коливання та хвилі',
    note: 'Монографія з блоку сучасних видань співробітників Інституту; тематично належить до пружних хвиль у тілах з початковими напруженнями.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Кубенко В.Д., Янчевський І.В.',
    title: 'Дифракція акустичних хвиль на системах неоднотипних тіл',
    year: 2024,
    publisher: 'Київ: КПІ ім. Ігоря Сікорського, Вид-во «Політехніка»',
    pages: '265 с.',
    isbn: '978-966-990-114-9',
    url: '',
    category: 'Динаміка, коливання та хвилі',
    note: 'Монографія з блоку сучасних видань співробітників Інституту; додано до групи акустичних хвиль і дифракції.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Жук О.П., Гузь О.М., Жук Я.О.',
    title: 'Радіаційні сили акустичного поля в рідині з включеннями',
    year: 2023,
    publisher: 'Київ: Альянт',
    pages: '240 с.',
    isbn: '978-617-7819-38-6',
    url: '',
    category: 'Динаміка, коливання та хвилі',
    note: 'Монографія з блоку сучасних видань співробітників Інституту; тематично належить до акустичних полів і хвильових процесів.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Rushchitsky J.J.',
    title: 'Evolution of Solitary Elastic Waves with Different Initial Profiles',
    year: 2023,
    publisher: 'Chapter 2 in Horizons in Physics, Vol. 312, Nova Science Publishers',
    pages: '252 p.',
    isbn: '979-8-89113-513-0',
    url: '',
    category: 'Динаміка, коливання та хвилі',
    note: 'Видання з блоку сучасних праць співробітників Інституту; додано до групи нелінійних і поодиноких пружних хвиль.',
    inLibraryOfCongress: false
  },
  {
    authors: 'Grigorenko A.Ya., Müller W.H., Loza I.A.',
    title: 'Selected Problems in the Elastodynamics of Piezoceramic Bodies',
    year: 2021,
    publisher: 'Advanced Structured Materials',
    pages: '227 p.',
    isbn: '9783030741983',
    url: 'https://doi.org/10.1007/978-3-030-74199-0',
    category: 'Динаміка, коливання та хвилі',
    note: 'Монографія з блоку сучасних видань співробітників Інституту; тематично належить до еластодинаміки п’єзокерамічних тіл.',
    inLibraryOfCongress: false
  }
] as const satisfies readonly ScientificBook[];

export const scientificBookPlannedCategories = [
  {
    title: 'Механіка оболонок і пластин',
    description: 'Окремі монографії з теорії оболонок, пластин, стержнів і тонкостінних елементів конструкцій.'
  },
  {
    title: 'Механіка композитів',
    description: 'Видання з механіки композитних матеріалів, армованих середовищ, ефективних властивостей і структурної неоднорідності.'
  },
  {
    title: 'Механіка руйнування',
    description: 'Монографії з тріщин, концентрації напружень, довготривалого руйнування, міцності та довговічності матеріалів.'
  },
  {
    title: 'Динаміка, коливання та хвилі',
    description: 'Праці з динаміки механічних систем, коливань оболонок, акустичних і пружних хвиль.'
  },
  {
    title: 'Термопружність, повзучість і непружне деформування',
    description: 'Видання з термопружності, термов’язкопружності, пластичності, повзучості та пошкоджуваності матеріалів.'
  },
  {
    title: 'Стійкість, керування та нелінійні системи',
    description: 'Монографії з теорії стійкості, керування, біфуркацій, гіроскопічних і великомасштабних систем.'
  },
  {
    title: 'Контактна механіка та прикладні задачі',
    description: 'Праці з контактної взаємодії, задач із початковими напруженнями, інженерних застосувань і методів розрахунку.'
  },
  {
    title: 'Довідники, словники та енциклопедичні видання',
    description: 'Довідкові видання, словники термінів, покажчики та інші допоміжні бібліографічні ресурси.'
  }
] as const;

export const scientificBookYears = [...new Set(scientificBooks.map((item) => item.year).filter((year): year is number => typeof year === 'number'))].sort((a, b) => b - a);
export const scientificBookCategories = [...new Set(scientificBooks.map((item) => item.category))].sort();
export const scientificBookLibraryOfCongressCount = scientificBooks.filter((item) => item.inLibraryOfCongress).length;
