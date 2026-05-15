# Tailwind CSS 4.3 за 1 час

Короткий маршрут для первого знакомства. Он не заменяет полный гайд, а помогает быстро пройти путь от установки до первой адаптивной карточки.

## 0-10 минут: понять идею

Tailwind - это способ писать CSS через маленькие utility-классы прямо в HTML.

```html
<button class="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700">
  Сохранить
</button>
```

Читай классы группами:

| Группа | Классы |
|---|---|
| Форма | `rounded-lg` |
| Цвет | `bg-sky-600 text-white` |
| Отступы | `px-4 py-2` |
| Текст | `font-semibold` |
| Состояние | `hover:bg-sky-700` |

## 10-20 минут: запустить проект

```bash
npm install
npm run dev
```

Открой:

```text
examples/tailwind-cli/index.html
```

Если страница оформлена, Tailwind работает.

## 20-35 минут: собрать кнопку и карточку

Попробуй заменить содержимое примера на:

```html
<article class="max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
  <p class="text-sm font-semibold text-sky-600">Практика</p>
  <h2 class="mt-2 text-2xl font-bold text-slate-950">Первая карточка</h2>
  <p class="mt-3 text-slate-600">
    Здесь есть фон, отступы, типографика, скругление и тень.
  </p>
  <button class="mt-5 rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700">
    Готово
  </button>
</article>
```

## 35-50 минут: добавить адаптивность

Сделай сетку:

```html
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <article class="rounded-xl bg-white p-5 shadow-sm">1</article>
  <article class="rounded-xl bg-white p-5 shadow-sm">2</article>
  <article class="rounded-xl bg-white p-5 shadow-sm">3</article>
</div>
```

Запомни: Tailwind mobile-first. Стили без префикса работают всегда, `sm:` и `lg:` включаются от указанной ширины и выше.

## 50-60 минут: проверить себя

Ты должен уметь объяснить:

- Что делает `@import "tailwindcss"`.
- Чем отличаются `p-4`, `px-4`, `py-4`, `mt-4`.
- Почему `hover:bg-sky-700` срабатывает только при наведении.
- Почему `sm:grid-cols-2` не значит "только телефон".
- Почему в этом проекте используется `source(none)` и `@source "../examples"`.

Дальше переходи к `guide-tailwind-css-4.3-ru.md`.
