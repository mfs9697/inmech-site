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

export const scientificBooks = [] as const satisfies readonly ScientificBook[];

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
