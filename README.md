# InMech Astro Site

Astro-сайт Інституту механіки ім. С.П. Тимошенка НАН України.

Репозиторій `mfs9697/inmech-site` є основним місцем редагування сайту. Сервер `new.inmech.kyiv.ua` містить лише зібрану статичну версію з папки `dist/`. Файли на сервері не слід редагувати вручну, оскільки наступне розгортання з GitHub перезапише їх.

## Адреси

- Робочий сайт: `https://new.inmech.kyiv.ua/`
- Локальна розробка: `http://localhost:4321/`

Сайт завжди збирається для кореня домену з base path `/`.

## Структура проєкту

```text
inmech-site/
  .nvmrc
  astro.config.mjs
  package.json
  public/
    assets/
    documents/
    images/
      news/
  src/
    components/
    content/
      departments/
      news/
      people/
    data/
    layouts/
    pages/
    styles/
  scripts/
    audit-generated-assets.mjs
    check-internal-links.mjs
    check-main-landmarks.mjs
    check-sitemap-output.mjs
    check-vacancy-archive.mjs
  .github/
    CODEOWNERS
    scripts/
    workflows/
      deploy-to-inmech.yml
```

Основні папки:

- `src/pages/` — сторінки сайту;
- `src/components/` — спільні блоки сайту;
- `src/content/news/` — новини у форматі Markdown;
- `src/content/departments/` — матеріали наукових відділів;
- `src/content/people/` — сторінки співробітників;
- `public/` — зображення, документи та інші статичні файли.

## Локальна робота

Для Astro 7 потрібен Node.js `>=22.12.0`; рекомендована локальна версія
записана в `.nvmrc` і відповідає версії Node.js, яку використовує GitHub
Actions.

Оновити локальну копію:

```powershell
git checkout main
git pull
```

Встановити залежності:

```powershell
npm.cmd install
```

Запустити локальний сайт:

```powershell
npm.cmd run dev
```

Перевірити збірку:

```powershell
npm.cmd run build
```

Виконати повну перевірку, таку саму як у GitHub Actions:

```powershell
npm.cmd run validate
```

Готова статична версія створюється в папці `dist/`.

The `validate` command runs the Astro build, sitemap check, generated
`<main>` landmark check, generated internal-link check, and vacancy archive
consistency check. The vacancy check keeps Ukrainian and English vacancy
records aligned and verifies that each vacancy folder contains:

```text
order-competition.pdf
order-participants.pdf
order-results.pdf
```

Generated asset and download references can be audited manually after a build:

```powershell
npm.cmd run audit:assets
```

This asset audit is intentionally non-blocking. It reports missing generated
asset/download references, references that incorrectly begin with `/public/`,
duplicate files under `public/`, and unusually large public assets.

У Windows зручно використовувати `npm.cmd`, оскільки PowerShell іноді блокує команду `npm` через Execution Policy.

## Vacancy archive

Vacancy records are maintained in both `src/data/vacancies.ts` and
`src/data/vacanciesEn.ts`. The IDs, dates, years, record order, and number of
positions must stay synchronized between the two files. The ID must start with
the source/display date, for example:

```text
2026-03-17-competition-17
```

The PDF archive for that record must be stored in:

```text
public/vacancies/2026-03-17-competition-17/
```

Each vacancy folder must contain the three standard archival PDFs named:

```text
order-competition.pdf
order-participants.pdf
order-results.pdf
```

Do not add personal names to vacancy card headings when the official
announcement is for a position. Use the position title and department link
shown in the source order/announcement. Deadlines should remain expressed on
the page as the official "30 calendar days from publication" wording unless a
source announcement states a special fixed deadline.

## Public asset policy

Use short Latin filenames without spaces for new public files. In site content,
refer to files without the `public` prefix:

```text
public/images/news/2026/example.jpg
```

becomes:

```markdown
![Image description](/images/news/2026/example.jpg)
```

PDFs and archival documents should not be visually altered. If size reduction is
needed, optimize only when the rendered pages remain equivalent and the
archival meaning is unchanged. Avoid adding duplicate PDFs or images; when a
replacement is intentional, remove the obsolete asset in the same PR.

Large binary additions should be justified in the PR description. Do not
rewrite repository history or introduce Git LFS without explicit approval.

## Збереження змін

Гілка `main` захищена. Прямі зміни та команда `git push origin main` не використовуються. Кожне оновлення сайту, документації або конфігурації виконується в окремій гілці та надсилається через Pull Request.

```powershell
git checkout main
git pull
git checkout -b descriptive-branch-name
git status
git add .
git commit -m "Describe the change"
git push -u origin descriptive-branch-name
```

Після завантаження гілки потрібно відкрити Pull Request до `main`. Для злиття обов’язкові дві умови:

1. перевірка `validate` має завершитися успішно;
2. Code Owner `@mfs9697` має переглянути та схвалити зміни.

Лише власник сайту зливає схвалений Pull Request у `main`. Інші редактори, зокрема секретар, готують зміни та відкривають Pull Request, але не публікують їх самостійно.

## Розгортання

Робочий сайт розгортається workflow:

```text
.github/workflows/deploy-to-inmech.yml
```

Workflow має назву **Validate and deploy Astro site** і працює у двох режимах.

Для кожного Pull Request job `validate`:

1. встановлює залежності командою `npm ci`;
2. запускає `npm run validate`, що збирає Astro-сайт;
3. перевіряє наявність файлів sitemap;
4. перевіряє, що кожна згенерована HTML-сторінка містить рівно один елемент `<main>`;
5. перевіряє, що згенеровані внутрішні посилання на сторінки сайту ведуть до
   файлів у `dist/`;
6. перевіряє синхронність українського й англійського архіву вакансій та
   наявність трьох обов’язкових PDF-файлів у кожній папці конкурсу.

Після злиття змін у `main` job `build-and-deploy` повторює ту саму команду `npm run validate` та копіює вміст `dist/` на сервер через захищене SSH-з’єднання. Перед копіюванням workflow створює `dist/deploy-version.txt` із SHA поточного коміту. Після `rsync` workflow читає `https://new.inmech.kyiv.ua/deploy-version.txt` або адресу з `INMECH_SITE_URL` і завершується з помилкою, якщо публічний сайт не повертає той самий SHA. Потім виконуються прості HTTP-перевірки головних українських та англійських сторінок, сторінок вакансій і sitemap.

Файл `deploy-version.txt` залишається публічно доступним після розгортання. Він містить лише публічний SHA коміту й потрібен для подальшої діагностики: якщо `rsync` успішний, але сайт показує стару версію або іншу директорію, цей файл одразу це покаже.

Workflow також можна запустити вручну:

```text
GitHub → Actions → Validate and deploy Astro site → Run workflow
```

`astro.config.mjs` використовує робочу адресу `https://new.inmech.kyiv.ua` і base path `/`. За потреби адресу можна перевизначити змінною середовища `INMECH_SITE_URL`.

Google Analytics вмикається лише тоді, коли під час збірки задано публічну змінну середовища `PUBLIC_GOOGLE_ANALYTICS_ID`, наприклад у GitHub Actions repository variables. Це не секрет: значення потрапляє у згенерований HTML. Якщо змінна порожня або не задана, скрипти Google Analytics не додаються до сторінок.

Дані доступу до сервера зберігаються лише в GitHub Actions secrets. Їх не можна публікувати в репозиторії, надсилати у відкритому вигляді або передавати редакторам контенту.

Pull Request зі змінами лише в `README.md` також проходить перевірку `validate`, але після злиття не запускає розгортання, оскільки документація не впливає на зібраний сайт.

## Правило кольорів для блоків

Колір блока визначається його **функцією та рівнем акценту**, а не порядком на сторінці, номером відділу або чергуванням карток. Однакові за значенням повторювані блоки повинні мати однаковий тон.

Система містить чотири семантичні тони:

- `neutral` — звичайний зміст, довідкові картки та рівноправні пункти; білий фон;
- `information` — наукові напрями, новини, групи відділів та інші інформаційні добірки; дуже світлий синій фон;
- `heritage` — історія, засновник, спадкоємність, хронологія та особливий історичний статус; дуже світлий золотистий фон;
- `emphasis` — один головний інституційний або зовнішній акцент у межах екрана; темно-синій фон із білим текстом.

Для нового блока тон задається атрибутом `data-block-tone`:

```astro
<article class="card" data-block-tone="information">
  ...
</article>
```

Дозволені значення:

```text
neutral
information
heritage
emphasis
```

Основні правила:

1. Не використовувати `:nth-child`, odd/even або випадкове чергування кольорів.
2. Не надавати різні кольори рівноправним карткам лише для декоративної різноманітності.
3. На одному екрані зазвичай має бути не більше одного блока `emphasis`.
4. Колір не повинен бути єдиним носієм змісту: призначення блока має бути зрозумілим із заголовка й тексту.
5. Не задавати фонові кольори безпосередньо в окремій сторінці, якщо потрібний тон уже існує. Спільні змінні та правила зберігаються у `src/styles/block-colors.css`.

На головній сторінці правило застосовано так: звичайні картки та головний вступний блок — `neutral`; групи наукових відділів і головна новина — `information`; блок про засновника — `heritage`; блок інститутських сайтів — `emphasis`. Історичні блоки й чинний статут також віднесено до `heritage`.

## Робота секретаря через ChatGPT

Секретар може створювати новини без доступу до сервера. Для цього потрібен доступ до GitHub-репозиторію та підключений GitHub у ChatGPT.

Рекомендований процес:

1. Надіслати текст новини в чат.
2. Вказати назву, дату, категорію та теги.
3. Позначити місця для зображень, наприклад `[рисунок 1 тут]`.
4. ChatGPT створює Markdown-файл у `src/content/news/YYYY/`.
5. ChatGPT заповнює українські та англійські поля frontmatter.
6. Зображення завантажуються в `public/images/news/YYYY/`.
7. ChatGPT створює окрему гілку та відкриває Pull Request до `main`.
8. GitHub автоматично запускає перевірку `validate`.
9. `@mfs9697` переглядає зміни як Code Owner і схвалює або повертає їх на доопрацювання.
10. Після схвалення власник сайту зливає Pull Request у `main`, і сайт оновлюється автоматично.

Секретар не виконує прямий запис у `main`, не зливає Pull Request і не редагує файли на сервері.

Приклад запиту:

```text
Створи новину для сайту Інституту в репозиторії mfs9697/inmech-site.

Використай правила з README.md.
Якщо дата не вказана, постав поточну дату.
Автоматично заповни titleEn, descriptionEn, categoryEn, tagsEn та imageAltEn.
Файл новини створи в src/content/news/2026/.
Рисунки будуть завантажені в public/images/news/2026/.
Не змінюй інші файли без потреби.
Створи окрему гілку та Pull Request. Не зливай Pull Request і не змінюй `main` без схвалення Code Owner.

Назва:
...

Категорія:
...

Теги:
...

Текст:
...

[рисунок 1 тут]
```

## Завантаження зображень

Зображення для новин зберігаються за роками:

```text
public/images/news/YYYY/
```

Імена файлів мають бути короткими, латиницею, без пробілів:

```text
section-2-apmme-2026.jpg
shimanovsky-visit.jpg
conference-announcement-2026.png
```

Після завантаження файл використовується без `public` на початку шляху.

Файл:

```text
public/images/news/2026/example.jpg
```

у Markdown:

```markdown
![Опис зображення](/images/news/2026/example.jpg)
```

у frontmatter:

```yaml
image: "/images/news/2026/example.jpg"
imageAlt: "Опис зображення українською"
imageAltEn: "English image description"
```

Не слід використовувати шлях `/public/images/...`.

## Створення новини

Кожна новина — окремий Markdown-файл у папці:

```text
src/content/news/YYYY/
```

Рекомендована назва:

```text
YYYY-MM-DD-short-english-slug.md
```

Наприклад:

```text
src/content/news/2026/2026-06-18-inmech-day-shimanovsky.md
```

### Шаблон

```markdown
---
title: "Назва новини українською"
titleEn: "News title in English"
description: "Короткий опис українською"
descriptionEn: "Short English description"
date: 2026-06-20
category: "Наукова співпраця"
categoryEn: "Scientific cooperation"
tags: ["співпраця", "НАН України"]
tagsEn: ["cooperation", "NAS of Ukraine"]
image: "/images/news/2026/example.jpg"
imageAlt: "Опис зображення українською"
imageAltEn: "English image description"
year: 2026
featured: false
---

Текст новини українською мовою.

![Опис рисунка](/images/news/2026/example.jpg)
```

Обов’язкові поля:

```text
title
description
date
category
year
featured
```

Для двомовного сайту рекомендовані:

```text
titleEn
descriptionEn
categoryEn
tagsEn
imageAltEn
```

Українські та англійські теги мають збігатися за змістом. Для англійської версії не слід залишати українські слова в `tagsEn`.

`featured: true` дозволяє показувати новину у видиміших блоках. Для звичайної новини використовується `featured: false`.

Для зовнішнього посилання можна додати:

```yaml
externalUrl: "https://example.com/news-page"
```

## Процедура публікації новини

1. Створити Markdown-файл у `src/content/news/YYYY/`.
2. Додати зображення в `public/images/news/YYYY/`.
3. Заповнити frontmatter.
4. Перевірити локально командою `npm.cmd run dev`.
5. Перевірити збірку командою `npm.cmd run build`.
6. Зберегти зміни в окремій гілці та відкрити Pull Request до `main`.
7. Дочекатися успішної перевірки `validate` та схвалення Code Owner `@mfs9697`.
8. Після злиття власником сайту workflow оновить `new.inmech.kyiv.ua`.
9. Після успішного деплою перевірити сторінку та за потреби використати `Ctrl + F5`.

## Відділи

Матеріали відділів зберігаються в:

```text
src/content/departments/
```

Порядок відображення контролюється полем `order`.

Приклад основних полів:

```yaml
---
number: 9
title: "Відділ механіки руйнування матеріалів"
titleEn: "Department of Fracture Mechanics of Materials"
shortTitle: "Механіка руйнування матеріалів"
shortTitleEn: "Fracture Mechanics of Materials"
order: 9
contactEmail: "example@inmech.kyiv.ua"
staff:
  - name: "Прізвище Ім’я По батькові"
    nameEn: "Name Surname"
    url: "/people/example-person/"
    position: "посада українською"
    positionEn: "position in English"
---
```

## Головне правило

Редагуємо сайт у GitHub або локальній копії репозиторію, завжди через окрему гілку та Pull Request. Сервер `new.inmech.kyiv.ua` використовується лише для публікації готової зібраної версії сайту.

