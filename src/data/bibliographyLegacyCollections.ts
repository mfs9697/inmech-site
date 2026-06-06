import type { BibliographyEntry } from './bibliography';

export const bibliographyLegacyCollections = [
  {
    id: 'guz-ed-1978-institut-mekhaniki',
    authors: 'Отв. ред. А.Н. Гузь',
    title: 'Институт механики',
    year: 1978,
    publisher: 'Київ: Наук. думка',
    pages: '194 с.',
    language: 'ru',
    type: 'edited-volume',
    tags: ['institute-history', 'history-of-science', 'edited-volume'],
    note: 'Оглядове видання про Інститут механіки, його наукові напрями, структуру та розвиток наукових шкіл. Період: до 1978 року.',
    inLibraryOfCongress: true
  },
  {
    id: 'guz-nemysh-humeniuk-1989-institut-mekhaniki-1919-1989',
    authors: 'Отв. ред. А.Н. Гузь; сост. А.Н. Гузь, Ю.Н. Немиш, Б.П. Гуменюк',
    title: 'Институт механики (1919–1989)',
    year: 1989,
    publisher: 'Київ: Наук. думка',
    pages: '144 с.',
    language: 'ru',
    type: 'edited-volume',
    tags: ['institute-history', 'history-of-science', 'edited-volume'],
    note: 'Ювілейне видання, присвячене історії Інституту механіки у 1919–1989 роках.',
    inLibraryOfCongress: true
  },
  {
    id: 'guz-nemysh-1998-institut-mekhaniki-sp-tymoshenko',
    authors: 'Отв. ред. А.Н. Гузь; сост. Ю.Н. Немиш',
    title: 'Институт механики им. С.П. Тимошенко',
    year: 1998,
    publisher: 'Київ: Вид-во «А.С.К.»',
    pages: '248 с.',
    language: 'ru',
    type: 'edited-volume',
    tags: ['institute-history', 'history-of-science', 'edited-volume'],
    note: 'Видання про Інститут механіки ім. С.П. Тимошенка, його структуру, наукові підрозділи та основні результати. Станом на 1998 рік.',
    inLibraryOfCongress: true
  },
  {
    id: 'guz-chernyshenko-rushchitsky-2008-institut-mekhaniki-1918-2008',
    authors: 'Под общ. ред. А.Н. Гузя; сост. И.С. Чернышенко, Я.Я. Рущицкий',
    title: 'Институт механики им. С.П. Тимошенко НАН Украины (1918–2008). 90 лет Института: история, структура, информационные аспекты',
    year: 2008,
    publisher: 'Київ: Літера ЛТД',
    pages: '320 с.',
    language: 'ru',
    type: 'edited-volume',
    tags: ['institute-history', 'history-of-science', 'edited-volume'],
    note: 'Ювілейне видання до 90-річчя Інституту механіки ім. С.П. Тимошенка НАН України.',
    inLibraryOfCongress: true
  },
  {
    id: 'guz-ed-1980-1982-metody-rascheta-obolochek',
    authors: 'За редакцією О. М. Гузя',
    title: 'Методы расчета оболочек',
    year: 1980,
    publisher: 'Серія багатотомних видань',
    language: 'ru',
    type: 'series-volume',
    tags: ['shells-plates', 'solid-mechanics', 'multivolume'],
    note: '1980–1982; 5 томів. Фундаментальна серія, присвячена методам розрахунку оболонкових конструкцій, зокрема задачам статики, динаміки, стійкості та міцності оболонок.'
  },
  {
    id: 'guz-ed-1982-1983-mekhanika-kompozitnykh-materialov-elementov-konstruktsii',
    authors: 'За редакцією О. М. Гузя',
    title: 'Механика композитных материалов и элементов конструкций',
    year: 1982,
    publisher: 'Серія багатотомних видань',
    language: 'ru',
    type: 'series-volume',
    tags: ['composites', 'materials-mechanics', 'multivolume'],
    note: '1982–1983; 3 томи. Колективне видання, що узагальнює результати досліджень композитних матеріалів та конструктивних елементів з них.'
  },
  {
    id: 'guz-ed-1984-1986-trekhmernye-zadachi-uprugosti-plastichnosti',
    authors: 'За редакцією О. М. Гузя',
    title: 'Трехмерные задачи теории упругости и пластичности',
    year: 1984,
    publisher: 'Серія багатотомних видань',
    language: 'ru',
    type: 'series-volume',
    tags: ['solid-mechanics', 'materials-mechanics', 'multivolume'],
    note: '1984–1986; 6 томів. Багатотомна серія з просторових задач теорії пружності та пластичності, що відображає розвиток тривимірних підходів у механіці деформівного твердого тіла.'
  },
  {
    id: 'guz-ed-1987-1989-mekhanika-sviazannykh-polei-elementakh-konstruktsii',
    authors: 'За редакцією О. М. Гузя',
    title: 'Механика связанных полей в элементах конструкций',
    year: 1987,
    publisher: 'Серія багатотомних видань',
    language: 'ru',
    type: 'series-volume',
    tags: ['solid-mechanics', 'thermoelasticity-creep', 'piezoelectricity', 'multivolume'],
    note: '1987–1989; 5 томів. Серія праць із механіки зв’язаних полів у конструктивних елементах, зокрема термомеханічних, електропружних та інших взаємопов’язаних процесів.'
  },
  {
    id: 'guz-ed-1990-1994-neklassicheskie-problemy-mekhaniki-razrusheniia',
    authors: 'За редакцією О. М. Гузя',
    title: 'Неклассические проблемы механики разрушения',
    year: 1990,
    publisher: 'Серія багатотомних видань',
    language: 'ru',
    type: 'series-volume',
    tags: ['fracture-mechanics', 'solid-mechanics', 'multivolume'],
    note: '1990–1994; 4 томи. Фундаментальне видання з некласичних задач механіки руйнування, включно з тріщинами, концентраторами напружень і складними умовами навантаження.'
  },
  {
    id: 'guz-ed-1993-2003-mekhanika-kompozitov',
    authors: 'За редакцією О. М. Гузя',
    title: 'Механика композитов',
    year: 1993,
    publisher: 'Серія багатотомних видань',
    language: 'ru',
    type: 'series-volume',
    tags: ['composites', 'materials-mechanics', 'dynamics-waves', 'fracture-mechanics', 'multivolume'],
    note: '1993–2003; 12 томів. Одна з найбільших серій, присвячена механіці композитів, ефективним властивостям, хвильовим процесам, стійкості, міцності та руйнуванню композитних систем.'
  },
  {
    id: 'guz-ed-2005-2011-advances-of-mechanics-uspekhi-mekhaniki',
    authors: 'За редакцією О. М. Гузя',
    title: 'Advances of Mechanics / Успехи механики',
    year: 2005,
    publisher: 'Серія багатотомних видань',
    language: 'en',
    type: 'series-volume',
    tags: ['solid-mechanics', 'dynamics-waves', 'multivolume'],
    note: '2005–2011; 6 томів. Англомовна серія, що репрезентує сучасні результати та напрями розвитку механіки, пов’язані з науковими школами Інституту.'
  },
  {
    id: 'guz-ed-2016-2018-sovremennye-problemy-mekhaniki',
    authors: 'За редакцією О. М. Гузя',
    title: 'Современные проблемы механики',
    year: 2016,
    publisher: 'Серія багатотомних видань',
    language: 'ru',
    type: 'series-volume',
    tags: ['solid-mechanics', 'composites', 'dynamics-waves', 'fracture-mechanics', 'multivolume'],
    note: '2016–2018; 3 томи. Колективна серія, що узагальнює сучасні проблеми механіки деформівного твердого тіла, композитів, хвильових процесів, руйнування та суміжних напрямів.'
  }
] as const satisfies readonly BibliographyEntry[];
