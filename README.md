# InMech Astro Prototype

Astro-сайт Інституту механіки ім. С.П. Тимошенка НАН України.

Репозиторій `mfs9697/inmech-site` є основним місцем редагування сайту. Сервер `new.inmech.kyiv.ua` містить лише зібрану статичну версію сайту з папки `dist/`. Файли на сервері не слід редагувати вручну, бо наступне розгортання з GitHub перезапише їх.

## Адреси сайту

- Робоча публічна адреса: `https://new.inmech.kyiv.ua/`
- GitHub Pages-версія: `https://mfs9697.github.io/inmech-site/`
- Локальна адреса під час розробки: `http://localhost:4321/inmech-site/`

## Основна структура

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
    workflows/
      astro.yml
      deploy-to-inmech.yml
```

Найважливіші папки:

- `src/pages/` — сторінки сайту;
- `src/components/` — спільні блоки сайту, зокрема шапка, меню, картки новин;
- `src/content/news/` — записи новин у форматі Markdown;
- `src/content/departments/` — матеріали наукових відділів;
- `src/content/people/` — персональні сторінки співробітників;
- `public/` — статичні файли: зображення, документи, PDF, Word-файли тощо;
- `.github/workflows/` — автоматичні сценарії GitHub Actions.

## Локальна робота із сайтом

Перед редагуванням бажано підтягнути актуальну версію з GitHub:

```powershell
git fetch origin
git reset --hard origin/main
git clean -fd
```

Після цього встановити або оновити залежності:

```powershell
npm.cmd install
```

Запуск локальної версії:

```powershell
npm.cmd run dev
```

Astro покаже локальну адресу, зазвичай:

```text
http://localhost:4321/inmech-site/
```

PowerShell у Windows може блокувати команду `npm` через Execution Policy. Тому в цьому проєкті зручно використовувати саме `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

## Перевірка перед публікацією

Перед відправленням змін бажано виконати збірку:

```powershell
npm.cmd run build
```

Якщо збірка пройшла без помилок, Astro створить готову статичну версію сайту в папці:

```text
dist/
```

## Як зберегти зміни в GitHub

Після редагування локально:

```powershell
git status
git add .
git commit -m "Update site content"
git push origin main
```

Після `push` зміни потрапляють у GitHub-репозиторій.

## Оновлення GitHub Pages

GitHub Pages-версія сайту за адресою

```text
https://mfs9697.github.io/inmech-site/
```

оновлюється автоматично після кожного `push` у гілку `main`.

За це відповідає workflow:

```text
.github/workflows/astro.yml
```

Ця версія сайту використовує base path:

```text
/inmech-site
```

## Розгортання на сервер `new.inmech.kyiv.ua`

Для основного серверного сайту використовується окремий workflow:

```text
.github/workflows/deploy-to-inmech.yml
```

Він запускається автоматично після `push` у гілку `main`, якщо змінено файли сайту:

```text
src/**
public/**
astro.config.mjs
package.json
package-lock.json
.github/workflows/deploy-to-inmech.yml
```

Його також можна запустити вручну:

```text
GitHub → Actions → Deploy Astro site to inmech.kyiv.ua → Run workflow
```

Workflow виконує такі дії:

1. бере останню версію репозиторію;
2. встановлює залежності;
3. збирає сайт командою `npm run build`;
4. копіює вміст папки `dist/` на сервер через `rsync` і SSH.

Для серверного розгортання використовується режим:

```text
DEPLOY_TARGET=inmech
```

У цьому режимі `astro.config.mjs` збирає сайт для кореня домену:

```text
https://new.inmech.kyiv.ua/
```

тобто з base path:

```text
/
```

## GitHub Secrets для серверного деплою

Дані доступу до сервера не зберігаються в коді. Вони зберігаються в GitHub Secrets:

```text
GitHub → Settings → Secrets and variables → Actions → Repository secrets
```

Потрібні secrets:

```text
INMECH_HOST
INMECH_USER
INMECH_PATH
INMECH_PORT
INMECH_SSH_PRIVATE_KEY
```

Поточна логіка така:

```text
INMECH_HOST = new.inmech.kyiv.ua
INMECH_USER = серверний користувач
INMECH_PATH = шлях до папки сайту на сервері
INMECH_PORT = 22
INMECH_SSH_PRIVATE_KEY = приватний SSH-ключ для деплою
```

Приватний SSH-ключ не можна публікувати в репозиторії або надсилати у відкритому вигляді. Він має бути лише в GitHub Secret `INMECH_SSH_PRIVATE_KEY`.

## Робота секретаря через ChatGPT

Секретар може створювати новини через ChatGPT без доступу до сервера. Для цього їй потрібен доступ до GitHub-репозиторію `mfs9697/inmech-site` і підключений GitHub у ChatGPT.

Бажана схема:

1. Секретар пише в чат текст новини.
2. Секретар завантажує рисунки або фотографії.
3. У тексті вона ставить мітки місць вставлення, наприклад:

```text
[рисунок 1 тут]
[фото делегації тут]
[афіша тут]
```

4. ChatGPT сам формує Markdown-файл новини у `src/content/news/YYYY/`.
5. ChatGPT сам заповнює frontmatter за схемою нижче.
6. Якщо дата не вказана, ChatGPT використовує поточну дату.
7. Якщо англійські поля не надані, ChatGPT створює їх автоматично.
8. Рисунки зберігаються в `public/images/news/YYYY/` з короткими латинськими назвами файлів.
9. У текст новини вставляються посилання на рисунки відповідно до міток секретаря.
10. Після коміту в `main` GitHub Pages і `new.inmech.kyiv.ua` оновлюються автоматично.

Секретар не повинна отримувати серверний пароль, приватний SSH-ключ або GitHub Secrets. Для додавання новин достатньо доступу до GitHub-репозиторію.

### Приклад запиту секретаря до ChatGPT

```text
Створи новину для сайту Інституту в репозиторії mfs9697/inmech-site.

Використай правила з README.md.
Якщо дата не вказана, постав поточну дату.
Автоматично заповни titleEn, descriptionEn, categoryEn, tagsEn та imageAltEn.
Файл новини створи в src/content/news/2026/.
Рисунки збережи в public/images/news/2026/.
Не змінюй інші файли сайту без потреби.

Назва новини:
...

Категорія:
...

Теги:
...

Текст новини:
...

[рисунок 1 тут]

Продовження тексту:
...
```

Якщо потрібно уникнути прямої публікації без перевірки, секретар має просити ChatGPT створювати окрему гілку або Pull Request. Тоді сайт оновиться після перевірки та злиття змін у `main`.

## Як формується нова новина

Кожна новина — це окремий Markdown-файл у папці:

```text
src/content/news/
```

Для новин зручно використовувати підпапку відповідного року:

```text
src/content/news/2026/
```

Назва файла формує адресу сторінки новини. Рекомендований формат:

```text
YYYY-MM-DD-short-english-slug.md
```

Наприклад:

```text
src/content/news/2026/2026-06-18-inmech-day-shimanovsky.md
```

Така новина буде доступна на сайті як окрема сторінка новини у відповідному розділі `/news/`.

## Шаблон новини

```markdown
---
title: "Назва новини українською"
titleEn: "News title in English"
description: "Короткий опис новини українською. Він показується в картках новин і вгорі сторінки."
descriptionEn: "Short English description for the English version."
date: 2026-06-20
category: "Наукова співпраця"
categoryEn: "Scientific cooperation"
tags: ["співпраця", "НАН України"]
tagsEn: ["cooperation", "NAS of Ukraine"]
image: "/images/news/2026/example-news-image.jpg"
imageAlt: "Опис зображення українською для доступності"
imageAltEn: "English image description for accessibility"
year: 2026
featured: false
---

Текст новини українською мовою.

Другий абзац новини.

![Опис рисунка](/images/news/2026/example-news-image.jpg)

## Підзаголовок

- пункт списку;
- ще один пункт списку.
```

## Обов’язкові поля новини

У frontmatter обов’язкові:

```text
title
description
date
category
year
featured
```

Рекомендовані для двомовного сайту:

```text
titleEn
descriptionEn
categoryEn
tagsEn
imageAltEn
```

Поля `tags`, `image`, `imageAlt`, `externalUrl` є необов’язковими, але для звичайної повної новини бажано додавати `tags`, `image` та `imageAlt`.

## Зображення для новини

Зображення треба класти в папку `public/images/news/` за роками:

```text
public/images/news/2026/example-news-image.jpg
```

У frontmatter шлях записується від кореня папки `public`, тобто так:

```yaml
image: "/images/news/2026/example-news-image.jpg"
```

Не треба використовувати шлях із `public` на початку:

```yaml
image: "/public/images/news/2026/example-news-image.jpg"
```

Для головного зображення новини використовується поле `image`. Додаткові зображення можна вставляти безпосередньо в текст Markdown:

```markdown
![Опис зображення](/images/news/2026/example-image.jpg)
```

Для основного сайту `new.inmech.kyiv.ua` такі посилання працюють від кореня домену. Якщо потрібно, щоб додаткові зображення також гарантовано працювали на GitHub Pages, краще перевіряти сторінку після публікації або використовувати лише головне зображення через поле `image`, яке обробляється сайтом автоматично.

## Поле `featured`

```yaml
featured: true
```

означає, що новина може потрапити у видиміші блоки на головній сторінці.

Для звичайної новини краще ставити:

```yaml
featured: false
```

Якщо кілька новин мають `featured: true`, порядок показу залежить від дати та логіки відповідного компонента новин.

## Зовнішня новина або посилання

Якщо новина має вести на зовнішній ресурс, можна використати поле:

```yaml
externalUrl: "https://example.com/news-page"
```

У такому випадку запис може використовуватися як картка-посилання, а не як повна внутрішня сторінка.

## Українська та англійська версії новини

Український текст основної новини пишеться в тілі Markdown-файлу після frontmatter.

Англомовні поля в frontmatter відповідають за англомовні заголовки, описи, категорії, теги та описи зображення. Для повноцінного англомовного тексту новини потрібно також підтримувати відповідний англомовний рендеринг у сторінках `/en/news/`.

## Загальна процедура публікації новини

1. Створити Markdown-файл новини в `src/content/news/YYYY/`.
2. Додати зображення в `public/images/news/YYYY/`, якщо воно потрібне.
3. Заповнити frontmatter.
4. Написати текст новини після frontmatter.
5. Перевірити локально:

```powershell
npm.cmd run dev
```

6. Перевірити збірку:

```powershell
npm.cmd run build
```

7. Зберегти зміни в GitHub:

```powershell
git add .
git commit -m "Add news item"
git push origin main
```

8. GitHub Pages оновиться автоматично.
9. `new.inmech.kyiv.ua` також оновиться автоматично після `push` у `main`, якщо зміни стосуються файлів сайту.
10. Після успішного деплою відкрити сайт і за потреби оновити сторінку через `Ctrl + F5`.

## Як додати або змінити відділ

Створити або відредагувати файл у папці:

```text
src/content/departments/
```

Порядок відображення контролюється полем `order`, а не датою створення файла.

Приклад:

```yaml
---
number: 9
title: "Відділ механіки руйнування матеріалів"
titleEn: "Department of Fracture Mechanics of Materials"
shortTitle: "Механіка руйнування матеріалів"
shortTitleEn: "Fracture Mechanics of Materials"
group: "Довготривала міцність, руйнування та втома"
groupEn: "Long-Term Strength, Fracture and Fatigue"
head: "чл.-кор. НАН України М.Ф. Селіванов"
headEn: "Corresponding Member of the NAS of Ukraine M.F. Selivanov"
summary: "Короткий опис наукових напрямів відділу."
summaryEn: "A short description of the department research areas."
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
