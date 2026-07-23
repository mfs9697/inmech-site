export interface JournalEditorialMember {
  nameUk: string;
  nameEn: string;
  profileSlug: string;
}

export interface JournalLeadershipMember extends JournalEditorialMember {
  roleUk: string;
  roleEn: string;
  descriptionUk: string;
  descriptionEn: string;
}

export interface JournalSeniorBoardMember extends JournalEditorialMember {
  expertiseUk: string;
  expertiseEn: string;
}

export const journalLeadership: JournalLeadershipMember[] = [
  {
    roleUk: 'Почесний головний редактор',
    roleEn: 'Honorary Editor-in-Chief',
    nameUk: 'Гузь Олександр Миколайович',
    nameEn: 'Oleksandr M. Huz',
    profileSlug: 'huz',
    descriptionUk: 'Академік НАН України.',
    descriptionEn: 'Academician of the National Academy of Sciences of Ukraine.'
  },
  {
    roleUk: 'Головний редактор',
    roleEn: 'Editor-in-Chief',
    nameUk: 'Назаренко Володимир Михайлович',
    nameEn: 'Volodymyr M. Nazarenko',
    profileSlug: 'nazarenko',
    descriptionUk: 'Академік НАН України.',
    descriptionEn: 'Academician of the National Academy of Sciences of Ukraine.'
  },
  {
    roleUk: 'Асоційований редактор',
    roleEn: 'Associate Editor',
    nameUk: 'Маслов Борис Петрович',
    nameEn: 'Borys P. Maslov',
    profileSlug: 'maslov',
    descriptionUk: 'Доктор фізико-математичних наук.',
    descriptionEn: 'Doctor of Physical and Mathematical Sciences.'
  },
  {
    roleUk: 'Вчений секретар',
    roleEn: 'Scientific Secretary',
    nameUk: 'Щурук Галина Іванівна',
    nameEn: 'Halyna I. Shchuruk',
    profileSlug: 'shchuruk',
    descriptionUk: 'Кандидат фізико-математичних наук.',
    descriptionEn: 'Candidate of Physical and Mathematical Sciences.'
  }
];

export const journalAssociateEditors: JournalEditorialMember[] = [
  { nameUk: 'Богданов Вячеслав Леонідович', nameEn: 'Viacheslav L. Bogdanov', profileSlug: 'bogdanov' },
  { nameUk: 'Григоренко Олександр Ярославович', nameEn: 'Oleksandr Ya. Grigorenko', profileSlug: 'hryhorenko' },
  { nameUk: 'Жук Ярослав Олександрович', nameEn: 'Yaroslav O. Zhuk', profileSlug: 'zhuk-yaroslav' },
  { nameUk: 'Рущицький Ярема Ярославович', nameEn: 'Jeremiah Rushchitsky', profileSlug: 'rushchytskyi' },
  { nameUk: 'Селіванов Михайло Федорович', nameEn: 'Mykhailo F. Selivanov', profileSlug: 'selivanov' },
  { nameUk: 'Сторожук Євген Анатолійович', nameEn: 'Yevhen A. Storozhuk', profileSlug: 'storozhuk' },
  { nameUk: 'Максимюк Володимир Ананійович', nameEn: 'Volodymyr A. Maksymyuk', profileSlug: 'maksymyuk' },
  { nameUk: 'Кирилюк Віталій Семенович', nameEn: 'Vitaliy S. Kyryliuk', profileSlug: 'kyryliuk' },
  { nameUk: 'Кіпніс Олександр Леонідович', nameEn: 'Oleksandr L. Kipnis', profileSlug: 'kipnis' },
  { nameUk: 'Янчевський Ігор Владиславович', nameEn: 'Ihor V. Yanchevskyi', profileSlug: 'yanchevskyi' },
  { nameUk: 'Юрчук Василь Миколайович', nameEn: 'Vasyl M. Yurchuk', profileSlug: 'yurchuk' },
  { nameUk: 'Борисенко Максим Юрійович', nameEn: 'Maksym Yu. Borysenko', profileSlug: 'borysenko' },
  { nameUk: 'Левчук Ольга Іванівна', nameEn: 'Olha I. Levchuk', profileSlug: 'levchuk' }
];

export const journalSeniorEditorialBoard: JournalSeniorBoardMember[] = [
  {
    nameUk: 'Кубенко Веніамін Дмитрович',
    nameEn: 'Veniamin D. Kubenko',
    profileSlug: 'kubenko',
    expertiseUk: 'Коливання, гідропружність, акустика, динаміка оболонок і ударна взаємодія.',
    expertiseEn: 'Vibrations, hydroelasticity, acoustics, shell dynamics and impact interaction.'
  },
  {
    nameUk: 'Мартинюк Анатолій Андрійович',
    nameEn: 'Anatolii A. Martyniuk',
    profileSlug: 'martyniuk-anatolii',
    expertiseUk: 'Теорія стійкості, методи Ляпунова, нелінійні динамічні системи та керування.',
    expertiseEn: 'Stability theory, Lyapunov methods, nonlinear dynamical systems and control.'
  }
];
