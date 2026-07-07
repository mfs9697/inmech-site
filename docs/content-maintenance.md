# Підтримка змісту сайту

Цей документ призначений для редакторів і секретаря, які додають або уточнюють матеріали сайту Інституту. GitHub-репозиторій є джерелом правди. Публічний сервер не редагується вручну: після злиття Pull Request сайт збирається і розгортається автоматично.

## Загальний порядок роботи

1. Оновіть локальну копію і створіть окрему гілку для однієї логічної зміни:

```powershell
git checkout main
git pull
git checkout -b content/short-description
```

2. Додавайте зміни у відповідні файли в `src/` і документи або зображення у `public/`.

3. У посиланнях на файли з `public/` ніколи не пишіть префікс `public`. Наприклад, файл `public/people/example.jpg` на сайті має шлях `/people/example.jpg`.

4. Для двомовних сторінок одразу перевіряйте українську й англійську версії. Не залишайте запис лише в одній мові, якщо сторінка має двомовну структуру.

5. Перед Pull Request виконайте перевірки з розділу "Перевірка перед Pull Request".

## Новини

Новини зберігаються у Markdown-файлах:

```text
src/content/news/YYYY/yyyy-mm-dd-short-slug.md
```

Назва файлу має бути латиницею, без пробілів. Бажано починати її з дати публікації.

Типова структура:

```markdown
---
title: "Український заголовок"
titleEn: "English title"
description: "Короткий український опис для картки новини."
descriptionEn: "Short English description for the news card."
date: 2026-04-16
category: "Оголошення"
categoryEn: "Announcements"
tags: ["оголошення", "конкурс"]
tagsEn: ["announcement", "competition"]
year: 2026
featured: false
image: "/images/news/2026/example.jpg"
imageAlt: "Опис зображення"
imageAltEn: "Image description"
---

Український текст новини.

<!-- en:start -->

English text of the news item.

<!-- en:end -->
```

Важливі правила:

- сторінка `/news/` показує новини поточного календарного року;
- головна сторінка показує чотири найновіші записи за полем `date`;
- якщо потрібно вести картку прямо на PDF або зовнішній сайт, додайте `externalUrl`; тоді окрема сторінка новини не створюється;
- для внутрішніх документів використовуйте шлях на зразок `/documents/news/2026/file.pdf`;
- для зображень використовуйте `public/images/news/YYYY/filename.jpg` і шлях `/images/news/YYYY/filename.jpg`;
- якщо англійський повний текст ще не готовий, англійська сторінка покаже примітку, але `titleEn` і `descriptionEn` все одно бажані;
- теги для фільтрації визначаються з тексту, категорій і тегів, тому використовуйте зрозумілі ключові слова: "аспірантура", "акредитація", "освіта", "конкурс", "ювілей", "вчена рада", "співпраця", "конференції", "семінари", "публікації", "оголошення".

## Конкурси на вакантні посади

Архів вакансій зберігається у двох синхронних файлах:

```text
src/data/vacancies.ts
src/data/vacanciesEn.ts
```

PDF-документи кожного конкурсу зберігаються в окремій папці:

```text
public/vacancies/yyyy-mm-dd-competition-nn/
```

У кожній папці мають бути рівно три стандартні PDF-файли:

```text
order-competition.pdf
order-participants.pdf
order-results.pdf
```

Для нового конкурсу:

1. Визначте ID з дати наказу про конкурс або з офіційного Word-файлу "Оголошення про конкурс". Формат:

```text
yyyy-mm-dd-competition-nn
```

2. Створіть папку в `public/vacancies/` з таким самим ID.

3. Покладіть у неї три PDF-файли зі стандартними назвами.

4. Додайте український запис у `src/data/vacancies.ts` і англійський запис у `src/data/vacanciesEn.ts`.

5. У полі `positions` зазначайте саме посади, а не прізвища осіб. Якщо одна посада належить до відділу, додавайте посилання на відділ у тому самому блоці позиції.

6. У полі `deadline` залишайте офіційне формулювання "30 календарних днів з моменту оприлюднення оголошення" або його англійський відповідник, якщо немає спеціального строку в джерелі.

7. Поле `requirements` заповнюйте з відповідного файлу "Оголошення про конкурс", а не лише з наказів.

8. Не додавайте конкурс, який не був офіційно оголошений.

Автоматична перевірка `npm.cmd run check:vacancies` контролює синхронність українського й англійського архівів, ID, дати, роки, кількість позицій і наявність трьох PDF-файлів.

## Захисти дисертацій і архів матеріалів

Поточні й недавні захисти редагуються безпосередньо у сторінках:

```text
src/pages/dissertations.astro
src/pages/en/dissertations.astro
```

Файли матеріалів зберігаються у:

```text
public/documents/dissertations/YYYY/NN/
```

Типові назви документів:

```text
abstract.pdf
dissertation.pdf
conclusion.pdf
record-card.pdf
opponent-review-1.pdf
opponent-review-2.pdf
opponent-review-3.pdf
```

Для кожного захисту перевіряйте обидві мовні сторінки: прізвище, тему, дату, місце, науковий ступінь, спеціальність, консультанта, опонентів і всі посилання на PDF або відео.

Старіші матеріали захистів зберігаються у:

```text
src/data/defenseMaterialsArchive.ts
public/documents/dissertations/archive/
```

Бібліографічний каталог захищених дисертацій зберігається в окремих файлах за першою літерою прізвища:

```text
src/data/defendedDissertationsA.ts
src/data/defendedDissertationsB.ts
...
```

Сторінка каталогу збирається компонентом:

```text
src/components/DefendedDissertationCatalog.astro
```

Не перейменовуйте архівні файли без потреби: старі посилання можуть уже використовуватися в офіційних документах.

## Сторінки співробітників

Профілі співробітників зберігаються у:

```text
src/content/people/person-id.md
```

ID файлу має бути латиницею, без пробілів. Приклад базових полів:

```markdown
---
name: "Прізвище Ім'я По батькові"
nameEn: "Name Surname"
position: "Посада"
positionEn: "Position"
department: "Назва відділу"
departmentEn: "Department name"
departmentUrl: "/departments/05-thin-walled-structures/"
degree: "Науковий ступінь"
degreeEn: "Academic degree"
academicTitle: "Вчене звання"
academicTitleEn: "Academic title"
email: "person@example.org"
photo: "/people/person.jpg"
featured: false
order: 10
profiles: []
researchAreas: []
researchAreasEn: []
publications: []
---
```

Фотографії зберігаються у `public/people/`, а в профілі записуються як `/people/file.jpg`. Якщо погодженої фотографії немає, краще не вказувати поле `photo`: сторінка автоматично покаже ініціали співробітника.

Після додавання або перейменування профілю перевірте:

- чи є співробітник у списку `staff` відповідного відділу;
- чи правильний `departmentUrl`;
- чи англійські поля не залишилися випадково українськими;
- чи посилання на Scopus, Web of Science, Google Scholar, ORCID або ResearchGate відкриваються;
- чи не містить профіль неузгодженого або застарілого службового e-mail.

## Відділи

Сторінки відділів зберігаються у:

```text
src/content/departments/department-id.md
```

Основні поля:

```markdown
---
number: 5
title: "Українська назва відділу"
titleEn: "English department name"
shortTitle: "Коротка назва"
shortTitleEn: "Short title"
group: "Українська наукова група"
groupEn: "English research group"
head: "Керівник"
headEn: "Head"
summary: "Короткий опис"
summaryEn: "Short summary"
order: 5
contactEmail: "department@example.org"
staff:
  - name: "Прізвище Ім'я По батькові"
    nameEn: "Name Surname"
    position: "посада"
    positionEn: "position"
    url: "/people/person-id/"
sectionsEn:
  - title: "Research profile"
    paragraphs:
      - "English paragraph."
    items: []
---

Український опис відділу у Markdown.
```

Українська сторінка бере основний текст після frontmatter. Англійська сторінка використовує `titleEn`, `summaryEn`, `headEn`, `groupEn`, `sectionsEn` і англійські поля у списку `staff`. Якщо `sectionsEn` порожній, англійська сторінка показує загальну примітку, що детальний опис готується.

Під час оновлення відділу перевіряйте синхронність із профілями співробітників: якщо людина додана до відділу, її профіль також має вести на цей відділ.

## Перевірка перед Pull Request

Для звичайної змістової зміни виконайте:

```powershell
npm.cmd ci
npm.cmd run validate
npm.cmd run audit:assets
npm.cmd audit --audit-level=low
git diff --check
git status --short
```

Що перевіряють команди:

- `npm.cmd run validate` збирає Astro-сайт, перевіряє sitemap, один `<main>` на кожній HTML-сторінці, внутрішні посилання й архів вакансій;
- `npm.cmd run audit:assets` не блокує роботу, але показує відсутні файли, неправильні шляхи з `/public/`, дублікати та надто великі файли у `public/`;
- `npm.cmd audit --audit-level=low` показує відомі вразливості залежностей; не запускайте `npm audit fix --force`;
- `git diff --check` знаходить проблеми з пробілами в змінених файлах;
- `git status --short` показує, які файли потраплять у Pull Request.

Якщо зміна стосується лише документації, сайт усе одно бажано зібрати, бо README і документація мають відповідати реальним командам і структурі проєкту.

## Короткий редакторський чекліст

- Чи зміна зроблена в окремій гілці, не в `main`?
- Чи немає редагування файлів напряму на сервері?
- Чи всі внутрішні посилання починаються з `/`, але без `/public/`?
- Чи є українська й англійська версії там, де сторінка двомовна?
- Чи не додано персональні прізвища в картки вакансій замість назв посад?
- Чи для кожного конкурсу є три PDF-файли зі стандартними назвами?
- Чи фотографія співробітника справді існує в `public/people/`, або поле `photo` прибране для показу ініціалів?
- Чи пройшли перевірки перед Pull Request?
