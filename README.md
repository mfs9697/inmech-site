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
  .github/
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

Готова статична версія створюється в папці `dist/`.

У Windows зручно використовувати `npm.cmd`, оскільки PowerShell іноді блокує команду `npm` через Execution Policy.

## Збереження змін

Для невеликих перевірених змін:

```powershell
git status
git add .
git commit -m "Update site content"
git push origin main
```

Для суттєвих змін безпечніше створити окрему гілку та Pull Request:

```powershell
git checkout -b descriptive-branch-name
git add .
git commit -m "Describe the change"
git push -u origin descriptive-branch-name
```

## Розгортання

Робочий сайт розгортається workflow:

```text
.github/workflows/deploy-to-inmech.yml
```

Workflow запускається автоматично після потрапляння змін у `main`, якщо змінено файли сайту або конфігурацію збірки. Його також можна запустити вручну:

```text
GitHub → Actions → Deploy Astro site to inmech.kyiv.ua → Run workflow
```

Workflow:

1. отримує останню версію репозиторію;
2. перевіряє дозволені зміни для користувачів з обмеженим доступом;
3. встановлює залежності;
4. збирає Astro-сайт;
5. перевіряє sitemap;
6. копіює вміст `dist/` на сервер через захищене SSH-з’єднання.

`astro.config.mjs` використовує робочу адресу `https://new.inmech.kyiv.ua` і base path `/`. За потреби адресу можна перевизначити змінною середовища `INMECH_SITE_URL`.

Дані доступу до сервера зберігаються лише в GitHub Actions secrets. Їх не можна публікувати в репозиторії, надсилати у відкритому вигляді або передавати редакторам контенту.

Зміни лише в `README.md` не запускають розгортання, оскільки не впливають на зібраний сайт.

## Робота секретаря через ChatGPT

Секретар може створювати новини без доступу до сервера. Для цього потрібен доступ до GitHub-репозиторію та підключений GitHub у ChatGPT.

Рекомендований процес:

1. Надіслати текст новини в чат.
2. Вказати назву, дату, категорію та теги.
3. Позначити місця для зображень, наприклад `[рисунок 1 тут]`.
4. ChatGPT створює Markdown-файл у `src/content/news/YYYY/`.
5. ChatGPT заповнює українські та англійські поля frontmatter.
6. Зображення завантажуються в `public/images/news/YYYY/`.
7. Зміни перевіряються у Pull Request або локально.
8. Після злиття в `main` сайт оновлюється автоматично.

Приклад запиту:

```text
Створи новину для сайту Інституту в репозиторії mfs9697/inmech-site.

Використай правила з README.md.
Якщо дата не вказана, постав поточну дату.
Автоматично заповни titleEn, descriptionEn, categoryEn, tagsEn та imageAltEn.
Файл новини створи в src/content/news/2026/.
Рисунки будуть завантажені в public/images/news/2026/.
Не змінюй інші файли без потреби.

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
6. Зберегти зміни в GitHub безпосередньо або через Pull Request.
7. Після потрапляння змін у `main` workflow оновить `new.inmech.kyiv.ua`.
8. Після успішного деплою перевірити сторінку та за потреби використати `Ctrl + F5`.

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

Редагуємо сайт у GitHub або локальній копії репозиторію. Сервер `new.inmech.kyiv.ua` використовується лише для публікації готової зібраної версії сайту.
