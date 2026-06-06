import type { BibliographyEntry } from './bibliography';

// Technical alphabetic batch for entries extracted from the old Бібліотека.html file.
// Public display remains unified; this file is only an internal data chunk.
// Source section: “Окремі наукові монографії, довідники та словники з механіки”.
export const bibliographyLibraryV = [
  {
    id: 'vainberg-1948-novyi-metod-rascheta-klemmovykh-soedinenii-proushin',
    authors: 'Вайнберг Д.В.',
    title: 'Новый метод расчета клеммовых соединений и проушин',
    year: 1948,
    publisher: 'Київ: Гостехиздат Украины',
    pages: '88 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'materials-mechanics', 'monograph']
  },
  {
    id: 'vainberg-1952-napriazhennoe-sostoianie-sostavnykh-diskov-plastin',
    authors: 'Вайнберг Д.В.',
    title: 'Напряженное состояние составных дисков и пластин',
    year: 1952,
    publisher: 'Київ: Изд-во АН УССР',
    pages: '420 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['shells-plates', 'solid-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'van-fo-fy-1971-konstruktsii-iz-armirovannykh-plastmass',
    authors: 'Ван Фо Фы Г.А.',
    title: 'Конструкции из армированных пластмасс',
    year: 1971,
    publisher: 'Київ: Техника',
    pages: '220 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['composites', 'materials-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'van-fo-fy-1971-teoriia-armirovannykh-materialov-s-pokrytiiami',
    authors: 'Ван Фо Фы Г.А.',
    title: 'Теория армированных материалов с покрытиями',
    year: 1971,
    publisher: 'Київ: Наук. думка',
    pages: '232 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['composites', 'materials-mechanics', 'solid-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'vanin-semeniuk-emelianov-1978-ustoichivost-obolochek-iz-armirovannykh-materialov',
    authors: 'Ванин Г.А., Семенюк Н.П., Емельянов Р.Ф.',
    title: 'Устойчивость оболочек из армированных материалов',
    year: 1978,
    publisher: 'Київ: Наук. думка',
    pages: '212 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['composites', 'shells-plates', 'stability-control', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'vanin-1985-mikromekhanika-kompozitsionnykh-materialov',
    authors: 'Ванин Г.А.',
    title: 'Микромеханика композиционных материалов',
    year: 1985,
    publisher: 'Київ: Наук. думка',
    pages: '304 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['composites', 'materials-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'vanin-semeniuk-1987-ustoichivost-obolochek-iz-kompozitsionnykh-materialov-s-nesovershenstvami',
    authors: 'Ванин Г.А., Семенюк Н.П.',
    title: 'Устойчивость оболочек из композиционных материалов с несовершенствами',
    year: 1987,
    publisher: 'Київ: Наук. думка',
    pages: '200 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['composites', 'shells-plates', 'stability-control', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'varvak-vasylenko-herasymiuk-1935-utochnennia-rozrakhunku-korpusa-richkovykh-suden',
    authors: 'Варвак П.М., Василенко О.М., Герасимюк О.В., Соколов Д.В., Стрельбицька О.І., Тимченко Є.М.',
    title: 'Про уточнення методів розрахунку корпуса річкових суден',
    year: 1935,
    publisher: 'Київ: Вид-во ВУАН',
    pages: '169 с.',
    language: 'uk',
    type: 'monograph',
    tags: ['shells-plates', 'solid-mechanics', 'monograph']
  },
  {
    id: 'varvak-1949-1952-metod-setok-k-raschetu-plastinok',
    authors: 'Варвак П.М.',
    title: 'Развитие и приложение метода сеток к расчету пластинок. В 2-х ч.',
    year: 1949,
    publisher: 'Київ: Изд-во АН УССР',
    pages: 'Ч. 1 — 136 с.; Ч. 2 — 116 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['shells-plates', 'numerical-methods', 'monograph']
  },
  {
    id: 'varvak-grozin-draigor-1959-tablitsy-dlia-rascheta-priamougolnykh-plit',
    authors: 'Варвак П.М. (ред.), Грозин Б.Д. (ред.), Губерман И.О., Драйгор Д.А., Мирошниченко М.М., Предтеченский Н.Д., Семирог-Орлик В.Н., Пузанов М.А., Горб М.Л., Янкевич В.Ф., Синявская М.Д., Вальчук Г.И.',
    title: 'Таблицы для расчета прямоугольных плит',
    year: 1959,
    publisher: 'Київ: Изд. АН УССР',
    pages: '419 с.',
    language: 'ru',
    type: 'handbook',
    tags: ['shells-plates', 'numerical-methods', 'reference-edition']
  },
  {
    id: 'vasylenko-1951-raschet-prostranstvennykh-ferm-kranovykh-konstruktsii-na-kruchenie',
    authors: 'Василенко А.М.',
    title: 'Расчет пространственных ферм крановых конструкций на кручение',
    year: 1951,
    publisher: 'Київ: Изд-во АН УССР',
    pages: '51 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'theoretical-mechanics', 'monograph']
  },
  {
    id: 'vlaikov-grigorenko-1998-osesimmetrichnye-zadachi-anizotropnykh-tel-tsilindricheskoi-formy',
    authors: 'Влайков Г.Г., Григоренко А.Я.',
    title: 'Некоторые осесимметричные задачи статики и динамики анизотропных тел цилиндрической формы',
    year: 1998,
    publisher: 'Київ: НАНУ, Технический центр',
    pages: '60 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'shells-plates', 'dynamics-waves', 'monograph']
  },
  {
    id: 'vlaikov-grigorenko-shevchenko-2001-zadachi-uprugosti-anizotropnykh-tsilindrov',
    authors: 'Влайков Г.Г., Григоренко А.Я., Шевченко С.Н.',
    title: 'Некоторые задачи теории упругости для анизотропных цилиндров с некруговым поперечным сечением',
    year: 2001,
    publisher: 'Київ: НАНУ, Технический центр',
    pages: '147 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'shells-plates', 'monograph']
  },
  {
    id: 'vlasov-1935-zahalnyi-metod-rozrakhunku-tsylindrychnykh-obolonok',
    authors: 'Власов В.З.',
    title: 'Загальний метод розрахунку циліндричних оболонок',
    year: 1935,
    publisher: 'Київ: ВУАН',
    pages: '62 с.',
    language: 'uk',
    type: 'monograph',
    tags: ['shells-plates', 'solid-mechanics', 'monograph']
  },
  {
    id: 'vujicic-martynyuk-1991-zadachi-mekhaniki-neavtonomnykh-sistem',
    authors: 'Вуйичич В.А., Мартынюк А.А.',
    title: 'Некоторые задачи механики неавтономных систем',
    year: 1991,
    publisher: 'Белград–Киев: Наук. думка',
    pages: '392 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['stability-control', 'dynamics-waves', 'monograph'],
    inLibraryOfCongress: true
  }
] as const satisfies readonly BibliographyEntry[];
