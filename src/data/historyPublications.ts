export const historyPublications = [
  {
    title: 'Институт механики',
    editors: 'Отв. ред. А.Н. Гузь',
    year: 1978,
    publisher: 'Київ: Наук. думка',
    pages: '194 с.',
    description: 'Оглядове видання про Інститут механіки, його наукові напрями, структуру та розвиток наукових шкіл.',
    period: 'До 1978 року',
    inLibraryOfCongress: true
  },
  {
    title: 'Институт механики (1919–1989)',
    editors: 'Отв. ред. А.Н. Гузь; сост. А.Н. Гузь, Ю.Н. Немиш, Б.П. Гуменюк',
    year: 1989,
    publisher: 'Київ: Наук. думка',
    pages: '144 с.',
    description: 'Ювілейне видання, присвячене історії Інституту механіки у 1919–1989 роках.',
    period: '1919–1989',
    inLibraryOfCongress: true
  },
  {
    title: 'Институт механики им. С.П. Тимошенко',
    editors: 'Отв. ред. А.Н. Гузь; сост. Ю.Н. Немиш',
    year: 1998,
    publisher: 'Київ: Вид-во «А.С.К.»',
    pages: '248 с.',
    description: 'Видання про Інститут механіки ім. С.П. Тимошенка, його структуру, наукові підрозділи та основні результати.',
    period: 'Станом на 1998 рік',
    inLibraryOfCongress: true
  },
  {
    title: 'Институт механики им. С.П. Тимошенко НАН Украины (1918–2008). 90 лет Института: история, структура, информационные аспекты',
    editors: 'Под общ. ред. А.Н. Гузя; сост. И.С. Чернышенко, Я.Я. Рущицкий',
    year: 2008,
    publisher: 'Київ: Літера ЛТД',
    pages: '320 с.',
    description: 'Ювілейне видання до 90-річчя Інституту механіки ім. С.П. Тимошенка НАН України.',
    period: '1918–2008',
    inLibraryOfCongress: true
  }
] as const;

export const historyPublicationYears = historyPublications.map((item) => item.year).sort((a, b) => b - a);
export const historyPublicationLibraryOfCongressCount = historyPublications.filter((item) => item.inLibraryOfCongress).length;
