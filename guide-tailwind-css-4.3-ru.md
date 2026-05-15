# Tailwind CSS 4.3: понятный гайд для новичка

Актуально для Tailwind CSS v4.3. Основано на официальной документации Tailwind CSS и релизе v4.3 от 8 мая 2026.

Этот гайд написан для человека, который уже знает базовый HTML и немного CSS, но только начинает Tailwind. Цель не в том, чтобы выучить тысячу классов наизусть. Цель - понять логику Tailwind, научиться читать классы, собирать интерфейсы и не попасть в типичные ошибки v4.

## Как читать этот гайд

Если ты совсем новичок, сначала пройди `quick-start-1-hour.md`, потом прочитай разделы 0-2, затем 4, 6-14 и 21. Разделы 3, 17, 19 и 20 можно считать вторым кругом: они важные, но не должны мешать первому знакомству.

После первых разделов обязательно сделай задания из `exercises/README.md`. Tailwind быстрее становится понятным через практику, а не через чтение списков классов.

## Содержание

- 0-2: что такое Tailwind и чем v4 отличается от старых уроков.
- 3: что нового в Tailwind CSS 4.3.
- 4-5: установка через CLI и Vite.
- 6-18: основные utility-классы, цвета, типографика, flex, grid, адаптивность, состояния, dark mode, container queries и произвольные значения.
- 19-21: `@theme`, директивы Tailwind и обнаружение классов.
- 22-25: компоненты, полный пример страницы, типичные ошибки и шпаргалка.
- 26-28: план обучения, чеклист и официальные источники.

Дополнительные файлы проекта:

- `quick-start-1-hour.md` - быстрый маршрут на первый час.
- `exercises/README.md` - практические задания.
- `examples/tailwind-cli/` - рабочий пример без Vite.
- `examples/vite/` - отдельный рабочий пример с Vite.
- `npm run check` - автоматическая проверка структуры, версий и 4.3-утилит.

---

## 0. Быстрый ответ: что такое Tailwind

Tailwind CSS - это CSS-фреймворк, где ты стилизуешь элементы не через свои классы вроде `.button` или `.card`, а через готовые маленькие utility-классы прямо в HTML.

Обычный CSS:

```html
<button class="button">Сохранить</button>
```

```css
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: #0284c7;
  color: white;
  font-weight: 600;
}

.button:hover {
  background: #0369a1;
}
```

Tailwind:

```html
<button class="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700">
  Сохранить
</button>
```

Обе версии делают примерно одно и то же. Разница в том, что в Tailwind стиль виден прямо на элементе, а классы имеют предсказуемые имена.

---

## 1. Главная идея Tailwind

В Tailwind каждый класс обычно отвечает за одно маленькое CSS-свойство.

```html
<div class="rounded-xl bg-white p-6 shadow-md">
  Карточка
</div>
```

Разбор:

| Класс | Что делает |
|---|---|
| `rounded-xl` | Скругляет углы |
| `bg-white` | Делает фон белым |
| `p-6` | Добавляет внутренний отступ со всех сторон |
| `shadow-md` | Добавляет тень |

То есть ты строишь дизайн как из небольших деталей.

Важно: Tailwind - это не замена пониманию CSS. Он делает написание CSS быстрее, но тебе все равно нужно понимать, что такое `display`, `margin`, `padding`, `flex`, `grid`, `position`, `color`, `font-size`.

---

## 2. Что изменилось в Tailwind v4

Если ты видел старые уроки по Tailwind v3, будь осторожен: в Tailwind v4 многое выглядит иначе.

Главные отличия v4:

1. Tailwind импортируется одной строкой в CSS:

```css
@import "tailwindcss";
```

2. Настройка темы теперь в основном живет в CSS через `@theme`, а не в `tailwind.config.js`.

3. Tailwind сам сканирует файлы проекта и генерирует CSS только для реально найденных классов.

4. Для CLI используется отдельный пакет `@tailwindcss/cli`.

5. Для PostCSS используется отдельный пакет `@tailwindcss/postcss`.

6. Для Vite есть официальный плагин `@tailwindcss/vite`.

7. Tailwind v4 рассчитан на современные браузеры: Safari 16.4+, Chrome 111+, Firefox 128+.

Практическое правило для новичка: если в уроке тебе предлагают начинать с `npx tailwindcss init` и создавать `tailwind.config.js`, скорее всего это урок для v3 или старой логики.

---

## 3. Что нового именно в Tailwind CSS 4.3

Tailwind CSS 4.3 добавил несколько новых возможностей. Новичку не нужно сразу использовать все, но важно знать, что они существуют.

### 3.1. Scrollbar utilities

Теперь можно стилизовать скроллбар встроенными классами.

```html
<div class="max-h-48 overflow-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-100">
  <p class="p-4">
    Здесь длинный текст. Если он не помещается, появится тонкий скроллбар.
  </p>
</div>
```

Полезные классы:

| Класс | Смысл |
|---|---|
| `scrollbar-auto` | Обычный скроллбар |
| `scrollbar-thin` | Тонкий скроллбар |
| `scrollbar-none` | Скрыть скроллбар |
| `scrollbar-thumb-sky-700` | Цвет "ползунка" |
| `scrollbar-track-sky-100` | Цвет дорожки |
| `scrollbar-gutter-stable` | Зарезервировать место под скроллбар, чтобы верстка не прыгала |

### 3.2. `@container-size`

Раньше `@container` создавал контейнер для запросов по ширине. В 4.3 появился `@container-size`, который полезен, когда нужно учитывать и высоту контейнера.

```html
<div class="@container-size h-80 rounded-xl border p-4">
  <div class="h-[50cqb] rounded-lg bg-sky-100">
    Высота зависит от размера контейнера
  </div>
</div>
```

На старте тебе чаще хватит обычного `@container`, но `@container-size` стоит помнить для сложных компонентов.

### 3.3. `zoom-*`

Можно использовать CSS-свойство `zoom`.

```html
<div class="zoom-75 md:zoom-100">
  На маленьком экране блок уменьшен до 75%, на средних и выше - обычный размер.
</div>
```

Также можно использовать произвольное значение:

```html
<div class="zoom-[1.1]">Увеличено на 10%</div>
```

### 3.4. `tab-*`

Можно управлять шириной символа табуляции в кодовых блоках.

```html
<pre class="tab-2 overflow-x-auto rounded-lg bg-slate-950 p-4 text-slate-100">
function hello() {
	return "Привет";
}
</pre>
```

### 3.5. Улучшенный `@variant`

В CSS теперь удобнее использовать составные и сгруппированные варианты.

```css
.button {
  background: var(--color-sky-600);
  color: white;

  @variant hover, focus {
    background: var(--color-sky-700);
  }
}
```

Для новичка главный вывод такой: чаще пиши варианты прямо в HTML (`hover:bg-sky-700`), а `@variant` используй, когда действительно пишешь отдельный CSS.

---

## 4. Установка Tailwind 4.3 через CLI

Этот способ удобен для простого HTML-проекта без React, Vue и других фреймворков.

### 4.1. Создай проект

```bash
mkdir tailwind-start
cd tailwind-start
npm init -y
```

### 4.2. Установи Tailwind и CLI

```bash
npm install -D tailwindcss@4.3.0 @tailwindcss/cli@4.3.0
```

### 4.3. Создай структуру

```bash
mkdir -p src dist
touch src/input.css index.html
```

Структура:

```text
tailwind-start/
  index.html
  package.json
  src/
    input.css
  dist/
```

### 4.4. Подключи Tailwind в CSS

Файл `src/input.css`:

```css
@import "tailwindcss";
```

В обычном маленьком проекте этого достаточно. Если в проекте лежат Markdown-гайды с большим количеством примеров классов, лучше ограничить сканирование источников:

```css
@import "tailwindcss" source(none);

@source "../examples";
```

Так Tailwind будет генерировать CSS только по реальным HTML-примерам, а не по учебному тексту.

### 4.5. Подключи готовый CSS в HTML

Файл `index.html`:

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./dist/output.css" rel="stylesheet" />
    <title>Tailwind 4.3</title>
  </head>
  <body class="bg-slate-100 text-slate-900">
    <main class="mx-auto max-w-3xl p-6">
      <h1 class="text-3xl font-bold">Привет, Tailwind!</h1>
      <p class="mt-3 text-slate-600">
        Если этот текст красиво оформлен, Tailwind работает.
      </p>
    </main>
  </body>
</html>
```

### 4.6. Добавь scripts в `package.json`

```json
{
  "scripts": {
    "dev": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch",
    "build": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify"
  }
}
```

### 4.7. Запусти сборку

```bash
npm run dev
```

Команда будет следить за файлами и обновлять `dist/output.css`.

Для финальной минифицированной сборки:

```bash
npm run build
```

---

## 5. Установка Tailwind 4.3 с Vite

Для React, Vue, Svelte и обычных Vite-проектов чаще выбирают официальный Vite-плагин.

### 5.1. Создай Vite-проект

```bash
npm create vite@latest my-app
cd my-app
npm install
```

### 5.2. Установи Tailwind и Vite-плагин

```bash
npm install -D tailwindcss@4.3.0 @tailwindcss/vite@4.3.0
```

### 5.3. Подключи плагин

`vite.config.js`:

```js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### 5.4. Импортируй Tailwind в главный CSS

Например, `src/style.css` или `src/index.css`:

```css
@import "tailwindcss";
```

### 5.5. Запусти проект

```bash
npm run dev
```

---

## 6. Как читать классы Tailwind

Большинство классов читаются по схеме:

```text
что-значение
```

Примеры:

| Класс | Как читать | CSS-идея |
|---|---|---|
| `p-4` | padding 4 | Внутренний отступ |
| `mt-6` | margin-top 6 | Отступ сверху |
| `text-lg` | text large | Размер текста |
| `font-bold` | font bold | Жирный шрифт |
| `bg-blue-600` | background blue 600 | Синий фон |
| `rounded-xl` | border-radius xl | Скругление |
| `shadow-sm` | small shadow | Небольшая тень |
| `flex` | display flex | Flex-контейнер |
| `grid` | display grid | Grid-контейнер |

### 6.1. Стороны в отступах

```html
<div class="p-4">Отступ со всех сторон</div>
<div class="px-4">Отступ слева и справа</div>
<div class="py-4">Отступ сверху и снизу</div>
<div class="pt-4">Отступ сверху</div>
<div class="pr-4">Отступ справа</div>
<div class="pb-4">Отступ снизу</div>
<div class="pl-4">Отступ слева</div>
```

То же работает для margin:

```html
<div class="m-4">Margin со всех сторон</div>
<div class="mt-4">Margin сверху</div>
<div class="mx-auto">Автоматические отступы слева и справа</div>
```

### 6.2. Почему `4` - это не 4 пикселя

В Tailwind числа обычно идут по шкале дизайна. Например, `p-4` обычно означает `1rem`, то есть примерно `16px`, если базовый размер шрифта браузера равен `16px`.

Примерная логика:

| Класс | Примерное значение |
|---|---|
| `p-1` | `0.25rem` |
| `p-2` | `0.5rem` |
| `p-4` | `1rem` |
| `p-6` | `1.5rem` |
| `p-8` | `2rem` |

Не нужно заучивать всю шкалу сразу. На практике ты быстро запомнишь самые частые значения: `2`, `3`, `4`, `6`, `8`, `12`.

---

## 7. Первый реальный компонент: карточка

HTML:

```html
<article class="max-w-sm rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
  <p class="text-sm font-medium text-sky-600">Новый урок</p>
  <h2 class="mt-2 text-2xl font-bold text-slate-950">Основы Tailwind CSS</h2>
  <p class="mt-3 text-slate-600">
    Научись собирать интерфейсы из маленьких utility-классов без постоянного
    переключения между HTML и CSS.
  </p>
  <a
    href="#"
    class="mt-5 inline-flex rounded-lg bg-slate-950 px-4 py-2 font-semibold text-white hover:bg-slate-800"
  >
    Читать
  </a>
</article>
```

Разбор:

| Группа | Классы |
|---|---|
| Размер | `max-w-sm` |
| Внешний вид | `rounded-2xl bg-white shadow-md ring-1 ring-slate-200` |
| Отступы | `p-6 mt-2 mt-3 mt-5 px-4 py-2` |
| Текст | `text-sm text-2xl font-bold text-slate-950 text-slate-600` |
| Интерактивность | `hover:bg-slate-800` |

Запомни важную привычку: читай классы не слева направо как случайный набор слов, а группами: размер, layout, отступы, цвета, текст, состояния.

---

## 8. Цвета

Цвета в Tailwind обычно выглядят так:

```text
bg-sky-600
text-slate-900
border-red-300
ring-black/10
```

Схема:

```text
свойство-цвет-яркость
```

Примеры:

| Класс | Значение |
|---|---|
| `bg-blue-600` | Синий фон |
| `text-white` | Белый текст |
| `text-slate-500` | Серый текст |
| `border-slate-200` | Цвет границы |
| `ring-black/10` | Цвет ring с прозрачностью 10% |

Число у цвета обычно означает яркость:

| Число | Обычно значит |
|---|---|
| `50` | Очень светлый |
| `100`-`200` | Светлый |
| `300`-`500` | Средний |
| `600`-`700` | Насыщенный |
| `800`-`950` | Темный |

Пример:

```html
<button class="bg-blue-600 text-white hover:bg-blue-700">
  Синяя кнопка
</button>
```

Начиная с v4.2, в стандартной палитре есть дополнительные нейтральные палитры: `mauve`, `olive`, `mist`, `taupe`.

```html
<div class="rounded-xl bg-mauve-950 p-6 text-mauve-100">
  Темный mauve-блок
</div>
```

---

## 9. Типографика

Самые частые классы для текста:

| Класс | Что делает |
|---|---|
| `text-sm` | Маленький текст |
| `text-base` | Обычный текст |
| `text-lg` | Крупнее обычного |
| `text-2xl` | Заголовок |
| `font-medium` | Средняя насыщенность |
| `font-semibold` | Полужирный |
| `font-bold` | Жирный |
| `leading-6` | Высота строки |
| `tracking-tight` | Более плотные буквы |
| `text-center` | Выравнивание по центру |

Пример:

```html
<section class="max-w-2xl">
  <p class="text-sm font-semibold uppercase tracking-wide text-sky-600">
    Учебный модуль
  </p>
  <h1 class="mt-2 text-4xl font-bold tracking-tight text-slate-950">
    Tailwind CSS без паники
  </h1>
  <p class="mt-4 text-lg leading-8 text-slate-600">
    Начни с базовых классов, научись читать их группами, а затем переходи к
    адаптивности, состояниям и настройке темы.
  </p>
</section>
```

Короткая запись `text-sm/6` означает размер текста плюс line-height:

```html
<p class="text-sm/6 text-slate-600">
  Маленький текст с удобной высотой строки.
</p>
```

---

## 10. Размеры

Частые классы:

| Класс | Что делает |
|---|---|
| `w-64` | Ширина |
| `h-32` | Высота |
| `size-12` | Одинаковая ширина и высота |
| `max-w-md` | Максимальная ширина |
| `min-h-screen` | Минимальная высота равна высоте экрана |
| `w-full` | Ширина 100% |
| `h-full` | Высота 100% |

Пример аватара:

```html
<img
  class="size-12 rounded-full object-cover"
  src="avatar.jpg"
  alt="Фото пользователя"
/>
```

Пример центрированной страницы:

```html
<main class="mx-auto max-w-5xl px-4 py-10">
  Контент страницы
</main>
```

---

## 11. Flexbox

Flex нужен, когда элементы стоят в ряд или колонку и их нужно выравнивать.

```html
<div class="flex items-center justify-between">
  <span>Логотип</span>
  <button>Меню</button>
</div>
```

Разбор:

| Класс | Что делает |
|---|---|
| `flex` | Включает flexbox |
| `items-center` | Выравнивает по вертикальной оси |
| `justify-between` | Разносит элементы по краям |

Частые классы Flexbox:

| Класс | Смысл |
|---|---|
| `flex` | Сделать flex-контейнер |
| `flex-col` | Элементы колонкой |
| `items-start` | Выровнять по началу поперечной оси |
| `items-center` | Выровнять по центру поперечной оси |
| `justify-center` | Выровнять по центру главной оси |
| `justify-between` | Разнести элементы |
| `gap-4` | Расстояние между элементами |
| `shrink-0` | Запретить элементу сжиматься |
| `grow` | Разрешить элементу занять свободное место |

Пример компонента:

```html
<div class="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
  <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
    i
  </div>
  <div>
    <h3 class="font-semibold text-slate-950">Быстрая настройка</h3>
    <p class="mt-1 text-sm/6 text-slate-600">
      Установи Tailwind, импортируй CSS и начинай писать utility-классы.
    </p>
  </div>
</div>
```

---

## 12. Grid

Grid удобен для сеток: карточек, галерей, дашбордов.

```html
<div class="grid grid-cols-3 gap-4">
  <div class="rounded-lg bg-white p-4">1</div>
  <div class="rounded-lg bg-white p-4">2</div>
  <div class="rounded-lg bg-white p-4">3</div>
</div>
```

Частые классы:

| Класс | Смысл |
|---|---|
| `grid` | Включить CSS Grid |
| `grid-cols-2` | 2 колонки |
| `grid-cols-3` | 3 колонки |
| `gap-4` | Расстояние между ячейками |
| `col-span-2` | Элемент занимает 2 колонки |

Адаптивная сетка:

```html
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <article class="rounded-xl bg-white p-5 shadow-sm">Карточка 1</article>
  <article class="rounded-xl bg-white p-5 shadow-sm">Карточка 2</article>
  <article class="rounded-xl bg-white p-5 shadow-sm">Карточка 3</article>
</div>
```

На мобильном будет 1 колонка, с `sm` - 2, с `lg` - 3.

---

## 13. Responsive design: адаптивность

В Tailwind адаптивность делается префиксами:

```html
<div class="text-center md:text-left">
  На маленьких экранах текст по центру, на md и выше - слева.
</div>
```

Стандартные breakpoint'ы:

| Префикс | Минимальная ширина |
|---|---|
| `sm:` | `40rem` / 640px |
| `md:` | `48rem` / 768px |
| `lg:` | `64rem` / 1024px |
| `xl:` | `80rem` / 1280px |
| `2xl:` | `96rem` / 1536px |

### 13.1. Tailwind работает mobile-first

Это самый важный принцип адаптивности.

Классы без префикса работают на всех размерах:

```html
<div class="text-center">
  Всегда по центру
</div>
```

Классы с префиксом работают с указанного breakpoint'а и выше:

```html
<div class="text-center md:text-left">
  Мобильный: центр. md и выше: слева.
</div>
```

Не думай, что `sm:` означает "только телефон". `sm:` означает "от 640px и выше".

Плохо:

```html
<div class="sm:text-center">
  Это не мобильная настройка. На очень маленьких экранах класс не сработает.
</div>
```

Хорошо:

```html
<div class="text-center sm:text-left">
  Сначала мобильный стиль, потом переопределение для экранов шире.
</div>
```

### 13.2. Пример адаптивного блока

```html
<section class="mx-auto max-w-5xl px-4 py-10">
  <div class="grid gap-6 md:grid-cols-2 md:items-center">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
        Учись Tailwind по шагам
      </h1>
      <p class="mt-4 text-slate-600 md:text-lg">
        На мобильном блоки идут друг под другом. На md и выше появляется сетка
        из двух колонок.
      </p>
    </div>

    <div class="rounded-2xl bg-white p-6 shadow-md">
      <p class="text-sm font-medium text-sky-600">Пример</p>
      <p class="mt-2 text-slate-600">Адаптивный layout без отдельного CSS.</p>
    </div>
  </div>
</section>
```

---

## 14. Состояния: hover, focus, active, disabled

Состояния пишутся как префиксы перед классом:

```html
<button class="bg-sky-600 hover:bg-sky-700">
  Наведи на меня
</button>
```

Схема:

```text
состояние:класс
```

Примеры:

| Класс | Смысл |
|---|---|
| `hover:bg-sky-700` | Фон при наведении |
| `focus:outline-none` | Убрать outline при фокусе |
| `focus-visible:outline-2` | Outline при клавиатурном фокусе |
| `active:scale-95` | Уменьшить при нажатии |
| `disabled:opacity-50` | Прозрачность, если кнопка disabled |

Хорошая кнопка:

```html
<button
  class="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-sky-700 active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
>
  Сохранить
</button>
```

Здесь:

| Часть | Зачем |
|---|---|
| `transition` | Плавность |
| `hover:bg-sky-700` | Реакция на мышь |
| `active:scale-95` | Реакция на клик |
| `disabled:*` | Вид недоступного состояния |
| `focus-visible:*` | Доступность для клавиатуры |

---

## 15. Групповые состояния: `group-hover`

Иногда нужно изменить дочерний элемент, когда навели мышь на родителя.

```html
<a href="#" class="group block rounded-xl bg-white p-6 shadow-sm hover:shadow-md">
  <h3 class="font-semibold text-slate-950 group-hover:text-sky-700">
    Документация
  </h3>
  <p class="mt-2 text-slate-600">
    Заголовок меняет цвет, когда навели на всю карточку.
  </p>
</a>
```

Как это работает:

1. Родителю добавляем `group`.
2. Дочернему элементу добавляем `group-hover:*`.

---

## 16. Dark mode

По умолчанию `dark:` ориентируется на системную настройку `prefers-color-scheme`.

```html
<div class="rounded-xl bg-white p-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white">
  Этот блок меняется в темной теме.
</div>
```

Частый пример:

```html
<article class="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
  <h2 class="text-xl font-bold text-slate-950 dark:text-white">
    Темная тема
  </h2>
  <p class="mt-2 text-slate-600 dark:text-slate-300">
    Для каждого цвета в светлой теме обычно нужен отдельный цвет для темной.
  </p>
</article>
```

### 16.1. Ручное переключение dark mode

Если хочешь включать темную тему через класс `.dark`, добавь в CSS:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

Тогда можно управлять темой так:

```html
<html lang="ru" class="dark">
  <body>
    <div class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      Темная тема включена классом на html.
    </div>
  </body>
</html>
```

Можно использовать и `data-theme`:

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

```html
<html lang="ru" data-theme="dark">
  ...
</html>
```

---

## 17. Container queries

Обычные breakpoint'ы смотрят на ширину окна браузера. Container queries смотрят на размер родительского контейнера.

Это полезно для компонентов, которые могут жить в разных местах: в широкой колонке, в узком сайдбаре, внутри карточки.

```html
<article class="@container rounded-xl bg-white p-4 shadow-sm">
  <div class="flex flex-col gap-4 @md:flex-row @md:items-center">
    <div class="size-16 rounded-xl bg-sky-100"></div>
    <div>
      <h3 class="font-semibold text-slate-950">Компонент</h3>
      <p class="text-sm text-slate-600">
        Меняет layout по размеру своего контейнера, а не окна.
      </p>
    </div>
  </div>
</article>
```

Логика:

| Класс | Смысл |
|---|---|
| `@container` | Родитель становится контейнером |
| `@md:flex-row` | На дочернем элементе: если контейнер достаточно широкий, включить row |

В Tailwind 4.3 появился `@container-size`, который нужен, когда важна не только ширина, но и высота контейнера.

---

## 18. Произвольные значения

Иногда нужного значения нет в стандартной шкале. Тогда используются квадратные скобки.

```html
<div class="top-[117px]">
  Ровно 117px от верха
</div>
```

Другие примеры:

```html
<div class="bg-[#316ff6]">Произвольный цвет</div>
<div class="grid grid-cols-[16rem_1fr]">Произвольная сетка</div>
<div class="max-h-[calc(100dvh-4rem)] overflow-auto">Высота через calc()</div>
```

Если внутри значения нужен пробел, обычно используют `_`:

```html
<div class="grid grid-cols-[1fr_20rem]">
  ...
</div>
```

Правило для новичка: произвольные значения полезны, но не превращай весь проект в набор случайных пикселей. Если значение повторяется, лучше вынести его в тему через `@theme`.

---

## 19. CSS-first настройка через `@theme`

В Tailwind v4 настройка темы в основном делается в CSS.

Пример:

```css
@import "tailwindcss";

@theme {
  --font-display: Inter, ui-sans-serif, system-ui, sans-serif;

  --color-brand-50: oklch(97% 0.02 250);
  --color-brand-100: oklch(93% 0.04 250);
  --color-brand-500: oklch(62% 0.18 250);
  --color-brand-600: oklch(55% 0.2 250);
  --color-brand-700: oklch(48% 0.19 250);

  --radius-card: 1rem;
}
```

После этого можно использовать новые классы:

```html
<div class="rounded-card bg-brand-50 p-6 text-brand-700">
  Классы появились из переменных темы.
</div>
```

Почему это важно:

| Переменная | Какие классы появляются |
|---|---|
| `--color-brand-500` | `bg-brand-500`, `text-brand-500`, `border-brand-500` |
| `--font-display` | `font-display` |
| `--radius-card` | `rounded-card` |
| `--breakpoint-3xl` | `3xl:*` |

### 19.1. `@theme` - это не обычный `:root`

Обычная CSS-переменная в `:root` просто создает переменную.

```css
:root {
  --page-gap: 24px;
}
```

А переменная внутри `@theme` еще и сообщает Tailwind, какие utility-классы нужно создать.

```css
@theme {
  --color-accent-500: oklch(65% 0.2 35);
}
```

Теперь появятся классы вроде:

```html
<button class="bg-accent-500 text-white">
  Акцентная кнопка
</button>
```

Используй `@theme`, когда хочешь новый Tailwind-класс. Используй `:root`, когда тебе нужна обычная CSS-переменная без генерации utility-классов.

---

## 20. Директивы Tailwind v4

Директивы - это специальные правила, которые Tailwind понимает во время сборки CSS.

| Директива | Для чего нужна |
|---|---|
| `@import "tailwindcss"` | Подключает Tailwind |
| `@theme` | Добавляет или меняет токены дизайна |
| `@source` | Явно указывает файлы, где искать классы |
| `@utility` | Создает свой utility-класс |
| `@variant` | Применяет вариант внутри CSS |
| `@custom-variant` | Создает свой вариант |
| `@apply` | Вставляет utility-классы в обычный CSS |
| `@reference` | Подключает тему для CSS modules, Vue/Svelte style blocks и похожих случаев без дублирования CSS |

### 20.1. `@utility`

```css
@import "tailwindcss";

@utility content-auto {
  content-visibility: auto;
}
```

Теперь можно писать:

```html
<section class="content-auto">
  ...
</section>
```

И даже с вариантами:

```html
<section class="lg:content-auto">
  ...
</section>
```

### 20.2. Functional utility с default value в 4.3

В Tailwind 4.3 можно задать значение по умолчанию для функциональной utility.
Классы `tab-*` уже есть в Tailwind 4.3, поэтому пример ниже нужен не для добавления tab-утилит вручную, а для понимания механики `@utility`.

```css
@utility tab-* {
  tab-size: --value(integer, --default(4));
}
```

Теперь:

```html
<pre class="tab">Табуляция по умолчанию 4</pre>
<pre class="tab-2">Табуляция 2</pre>
```

Для новичка это пока необязательно, но полезно понимать: Tailwind можно расширять не только готовыми классами, но и целыми семействами классов.

### 20.3. `@apply`

`@apply` позволяет использовать Tailwind-классы внутри CSS.

```css
.form-input {
  @apply rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none;
}
```

HTML:

```html
<input class="form-input" type="email" />
```

Не злоупотребляй `@apply`. Если ты пишешь свои `.btn`, `.card`, `.title` для всего подряд, ты теряешь главный плюс Tailwind - стили рядом с разметкой. Используй `@apply`, когда нужно стилизовать стороннюю библиотеку или когда повторение действительно мешает.

---

## 21. Как Tailwind находит классы

Tailwind сканирует файлы проекта как обычный текст и ищет строки, похожие на классы.

Это значит: класс должен существовать в коде целиком.

Плохо:

```html
<div class="text-{{ error ? 'red' : 'green' }}-600"></div>
```

Tailwind не увидит `text-red-600` и `text-green-600` как полные классы.

Хорошо:

```html
<div class="{{ error ? 'text-red-600' : 'text-green-600' }}"></div>
```

В React/Vue тоже нельзя собирать классы из кусочков:

Плохо:

```jsx
function Button({ color }) {
  return <button className={`bg-${color}-600 text-white`}>Кнопка</button>;
}
```

Хорошо:

```jsx
function Button({ color }) {
  const variants = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    slate: "bg-slate-900 hover:bg-slate-800 text-white",
  };

  return <button className={`${variants[color]} rounded-lg px-4 py-2`}>Кнопка</button>;
}
```

### 21.1. Когда нужен `@source`

Если классы находятся в папке, которую Tailwind сам не сканирует, можно указать путь явно.

```css
@import "tailwindcss";

@source "../node_modules/@my-company/ui-lib";
```

Можно принудительно добавить класс:

```css
@import "tailwindcss";

@source inline("bg-red-600 text-white hover:bg-red-700");
```

Это полезно для редких случаев: классы приходят из CMS, базы данных, внешней библиотеки или генерируются не там, где Tailwind может их увидеть.

### 21.2. Важное правило для учебных репозиториев

Если в проекте рядом с кодом лежит большой Markdown-гайд, Tailwind может найти классы внутри текста гайда. Это не ошибка Tailwind: он сканирует файлы как текст. Но итоговый CSS может стать больше, а в сборку попадут классы из антипримеров.

Для учебного проекта лучше явно ограничить источники:

```css
@import "tailwindcss" source(none);

@source "../examples";
```

Так проще объяснять новичку причинно-следственную связь: класс есть в HTML-примере - CSS сгенерировался; класса нет - CSS не нужен.

---

## 22. Компоненты без лишнего CSS

Один из частых страхов новичка: "А если классов слишком много?"

Ответ: в реальных проектах повторяющиеся куски обычно выносят в компонент.

Например, React:

```jsx
export function Button({ children, variant = "primary" }) {
  const variants = {
    primary: "bg-sky-600 text-white hover:bg-sky-700",
    secondary: "bg-white text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50",
  };

  return (
    <button
      className={`${variants[variant]} rounded-lg px-4 py-2 font-semibold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600`}
    >
      {children}
    </button>
  );
}
```

Теперь в приложении:

```jsx
<Button>Сохранить</Button>
<Button variant="secondary">Отмена</Button>
```

В обычном HTML без компонентов можно просто копировать готовые блоки или аккуратно использовать `@apply` для действительно повторяющихся элементов.

---

## 23. Полный пример страницы

`index.html`:

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./dist/output.css" rel="stylesheet" />
    <title>Tailwind 4.3 Demo</title>
  </head>
  <body class="bg-slate-100 text-slate-900">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#" class="text-lg font-bold tracking-tight text-slate-950">
          TailwindGuide
        </a>
        <nav class="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="#" class="hover:text-slate-950">Уроки</a>
          <a href="#" class="hover:text-slate-950">Примеры</a>
          <a href="#" class="hover:text-slate-950">Практика</a>
        </nav>
        <button class="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Начать
        </button>
      </div>
    </header>

    <main>
      <section class="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-sky-600">
            Tailwind CSS 4.3
          </p>
          <h1 class="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Собирай интерфейсы быстрее и понятнее
          </h1>
          <p class="mt-5 text-lg leading-8 text-slate-600">
            Utility-классы позволяют писать стили прямо рядом с HTML и быстро
            видеть, как устроен каждый элемент.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#cards"
              class="inline-flex justify-center rounded-lg bg-sky-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              Смотреть примеры
            </a>
            <a
              href="#"
              class="inline-flex justify-center rounded-lg bg-white px-5 py-3 font-semibold text-slate-900 shadow-sm ring-1 ring-slate-300 hover:bg-slate-50"
            >
              Документация
            </a>
          </div>
        </div>

        <div class="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
          <pre class="tab-2 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm/6 text-slate-100 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900"><code>&lt;button class="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"&gt;
  Сохранить
&lt;/button&gt;</code></pre>
        </div>
      </section>

      <section id="cards" class="mx-auto max-w-6xl px-4 pb-16">
        <div class="grid gap-6 md:grid-cols-3">
          <article class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 class="text-lg font-bold text-slate-950">Быстро</h2>
            <p class="mt-2 text-sm/6 text-slate-600">
              Не нужно придумывать имена классов и постоянно прыгать между HTML и CSS.
            </p>
          </article>
          <article class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 class="text-lg font-bold text-slate-950">Предсказуемо</h2>
            <p class="mt-2 text-sm/6 text-slate-600">
              Каждый utility-класс делает одну конкретную вещь.
            </p>
          </article>
          <article class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 class="text-lg font-bold text-slate-950">Адаптивно</h2>
            <p class="mt-2 text-sm/6 text-slate-600">
              Breakpoint-префиксы позволяют менять любой стиль на нужной ширине.
            </p>
          </article>
        </div>
      </section>
    </main>
  </body>
</html>
```

Что здесь есть:

| Фича | Где видно |
|---|---|
| Layout | `flex`, `grid`, `md:grid-cols-2`, `md:grid-cols-3` |
| Отступы | `px-4`, `py-12`, `mt-8`, `gap-6` |
| Цвета | `bg-slate-100`, `text-sky-600`, `bg-sky-600` |
| Состояния | `hover:bg-sky-700`, `hover:text-slate-950` |
| Responsive | `hidden md:flex`, `sm:flex-row`, `md:text-6xl` |
| Tailwind 4.3 | `tab-2`, `scrollbar-thin`, `scrollbar-thumb-*` |

---

## 24. Типичные ошибки новичков

### 24.1. Ошибка: учить все классы наизусть

Не надо. Лучше выучи группы:

| Что нужно | Где искать в голове |
|---|---|
| Отступы | `p`, `m`, `gap`, `space` |
| Размер | `w`, `h`, `size`, `max-w`, `min-h` |
| Текст | `text`, `font`, `leading`, `tracking` |
| Цвет | `bg`, `text`, `border`, `ring` |
| Layout | `flex`, `grid`, `block`, `hidden` |
| Состояния | `hover`, `focus`, `active`, `disabled` |
| Адаптивность | `sm`, `md`, `lg`, `xl`, `2xl` |

### 24.2. Ошибка: писать v3-синтаксис в v4

В v4 не начинай с этого:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

В v4 используй:

```css
@import "tailwindcss";
```

### 24.3. Ошибка: собирать классы динамически

Плохо:

```js
const className = `bg-${color}-600`;
```

Хорошо:

```js
const colors = {
  blue: "bg-blue-600",
  red: "bg-red-600",
};
```

### 24.4. Ошибка: думать, что `sm:` - это мобильный стиль

`sm:` значит "от 640px и выше". Мобильные стили пиши без префикса.

### 24.5. Ошибка: злоупотреблять произвольными значениями

Плохо, если весь проект выглядит так:

```html
<div class="mt-[17px] w-[413px] rounded-[13px] text-[15px]">
  ...
</div>
```

Иногда это нормально, но если значения повторяются, добавь их в тему или используй стандартную шкалу.

### 24.6. Ошибка: забыть `meta viewport`

Для адаптивности в HTML должен быть:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 24.7. Ошибка: слишком рано делать свои `.btn` и `.card`

Сначала попробуй писать utility-классы прямо в разметке. Когда повторение станет реальной проблемой, вынеси в компонент или аккуратно используй `@apply`.

---

## 25. Мини-шпаргалка

### Layout

```html
<div class="block"></div>
<div class="hidden"></div>
<div class="flex items-center justify-between gap-4"></div>
<div class="grid grid-cols-3 gap-6"></div>
```

### Spacing

```html
<div class="p-4"></div>
<div class="px-6 py-4"></div>
<div class="mt-8"></div>
<div class="mx-auto"></div>
<div class="gap-4"></div>
```

### Sizing

```html
<div class="w-full"></div>
<div class="max-w-4xl"></div>
<div class="min-h-screen"></div>
<div class="size-10"></div>
```

### Typography

```html
<h1 class="text-4xl font-bold tracking-tight"></h1>
<p class="text-sm/6 text-slate-600"></p>
<p class="text-center md:text-left"></p>
```

### Colors

```html
<div class="bg-white text-slate-900"></div>
<div class="border border-slate-200"></div>
<div class="ring-1 ring-black/10"></div>
```

### States

```html
<button class="hover:bg-sky-700 active:scale-95 focus-visible:outline-2"></button>
```

### Responsive

```html
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"></div>
```

### Dark mode

```html
<div class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white"></div>
```

### Tailwind 4.3

```html
<div class="overflow-auto scrollbar-thin scrollbar-thumb-slate-500"></div>
<div class="@container-size"></div>
<div class="zoom-75 md:zoom-100"></div>
<pre class="tab-2"></pre>
```

---

## 26. Как учиться дальше

Правильный порядок для новичка:

1. Научись ставить Tailwind и подключать `@import "tailwindcss"`.
2. Собери 5-10 маленьких компонентов: кнопку, карточку, навигацию, форму, список.
3. Освой отступы, цвета, типографику, flex и grid.
4. Добавь адаптивность через `sm:`, `md:`, `lg:`.
5. Добавь состояния: `hover:`, `focus-visible:`, `disabled:`.
6. Разбери dark mode.
7. Научись настраивать тему через `@theme`.
8. Только потом переходи к `@utility`, `@variant`, `@source inline()` и сложным произвольным значениям.

Главная мысль: Tailwind не требует магии. Это просто короткий, системный способ писать CSS.

---

## 27. Контрольный чеклист

Перед тем как считать, что ты понял базу Tailwind 4.3, проверь себя:

- Ты понимаешь, зачем нужна строка `@import "tailwindcss"`.
- Ты можешь объяснить разницу между `p-4`, `px-4`, `py-4`, `mt-4`.
- Ты понимаешь, что `sm:` - это не "только маленький экран", а "от 640px и выше".
- Ты можешь собрать кнопку с `hover`, `active`, `focus-visible`, `disabled`.
- Ты знаешь, почему нельзя писать `bg-${color}-600`.
- Ты понимаешь, зачем нужен `@theme`.
- Ты знаешь, что `tailwind.config.js` больше не является главным способом настройки в v4.
- Ты можешь собрать простую адаптивную сетку.
- Ты понимаешь, когда использовать произвольные значения вроде `w-[37rem]`.
- Ты знаешь, какие новые утилиты появились в 4.3: `scrollbar-*`, `zoom-*`, `tab-*`, `@container-size`.

---

## 28. Официальные источники

Основные страницы официальной документации, по которым собран этот гайд:

- Tailwind CSS v4.3 release: https://tailwindcss.com/blog/tailwindcss-v4-3
- Installation with Tailwind CLI: https://tailwindcss.com/docs/installation/tailwind-cli
- Installation with Vite: https://tailwindcss.com/docs/installation/using-vite
- Styling with utility classes: https://tailwindcss.com/docs/styling-with-utility-classes
- Responsive design: https://tailwindcss.com/docs/responsive-design
- Dark mode: https://tailwindcss.com/docs/dark-mode
- Theme variables: https://tailwindcss.com/docs/theme
- Adding custom styles: https://tailwindcss.com/docs/adding-custom-styles
- Detecting classes in source files: https://tailwindcss.com/docs/detecting-classes-in-source-files
- Functions and directives: https://tailwindcss.com/docs/functions-and-directives
- Compatibility: https://tailwindcss.com/docs/compatibility
