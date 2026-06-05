export const textbooks = [
  {
    authors: 'Чорноіван Ю.О.',
    title: 'Курс вищої математики (короткий конспект лекцій)',
    type: 'Навчальний посібник / конспект лекцій',
    year: 2022,
    publisher: 'Сайт дистанційної освіти КНУБіА',
    pages: '94 с.',
    url: 'http://org2.knuba.edu.ua/pluginfile.php/14036/mod_resource/content/47/lect2.pdf',
    category: 'Вища математика'
  },
  {
    authors: 'Rushchitsky J.J.',
    title: 'Foundations of Mechanics of Materials',
    type: 'Навчальне видання',
    year: 2021,
    publisher: 'Copenhagen: Ventus Publishing ApS',
    pages: '276 p.',
    isbn: '978-87-403-3706-8',
    url: 'https://bookboon.com/premium/books/foundations-of-mechanics-of-materials-part-1',
    category: 'Механіка матеріалів'
  },
  {
    authors: 'Martynyuk A.A., Radziszewski B., Szadkowski A.',
    title: 'Elements of the Theory and Applications with Examples',
    type: 'Навчально-наукове видання',
    year: 2020,
    publisher: 'Sciendo',
    pages: '328 p.',
    isbn: '',
    url: 'https://doi.org/10.2478/9788366675285',
    category: 'Стійкість і динамічні системи'
  }
] as const;

export const textbookYears = [...new Set(textbooks.map((item) => item.year))].sort((a, b) => b - a);
export const textbookCategories = [...new Set(textbooks.map((item) => item.category))].sort();
