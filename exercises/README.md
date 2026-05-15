# Практические задания по Tailwind CSS 4.3

Задания идут от простого к сложному. Делай их в `examples/tailwind-cli/index.html`, запускай `npm run dev` и смотри результат в браузере.

## Задание 1. Кнопка

Собери кнопку "Сохранить".

Требования:

- Фон `bg-sky-600`.
- Белый текст.
- Скругление `rounded-lg`.
- Отступы `px-4 py-2`.
- Hover-состояние `hover:bg-sky-700`.
- Видимый keyboard focus через `focus-visible:*`.

Проверка:

```html
<button class="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
  Сохранить
</button>
```

## Задание 2. Карточка

Собери карточку курса с заголовком, описанием и кнопкой.

Требования:

- Максимальная ширина `max-w-sm`.
- Белый фон.
- Внутренний отступ `p-6`.
- Скругление и тонкая рамка через `ring-1`.
- Заголовок `text-2xl font-bold`.
- Описание `text-slate-600`.

## Задание 3. Адаптивная сетка

Сделай сетку из 6 карточек.

Требования:

- На мобильном 1 колонка.
- От `sm` - 2 колонки.
- От `lg` - 3 колонки.
- Расстояние между карточками `gap-4` или `gap-6`.

Подсказка:

```html
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  ...
</div>
```

## Задание 4. Состояния формы

Собери поле email.

Требования:

- `border border-slate-300`.
- `focus:border-sky-500`.
- `focus:outline-none`.
- `disabled:opacity-50`.
- Подпись под полем маленьким серым текстом.

## Задание 5. Dark mode

Сделай карточку, которая красиво выглядит в светлой и темной теме.

Требования:

- Светлая тема: `bg-white text-slate-900`.
- Темная тема: `dark:bg-slate-900 dark:text-white`.
- Вторичный текст тоже должен иметь отдельный dark-цвет.

## Задание 6. Новые возможности 4.3

Сделай блок кода с прокруткой.

Требования:

- `max-h-64 overflow-auto`.
- `scrollbar-thin`.
- `scrollbar-thumb-slate-600`.
- `scrollbar-track-slate-900`.
- `tab-2`.

## Финальная работа

Собери маленькую страницу из:

- Header.
- Hero-блока.
- Сетки карточек.
- Формы подписки.
- Dark mode-стилей.
- Минимум одной 4.3-фичи: `scrollbar-*`, `zoom-*`, `tab-*` или `@container-size`.

После финальной работы запусти:

```bash
npm run build
npm run check
```
