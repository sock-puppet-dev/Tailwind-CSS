# Мини-основы Tailwind CSS 4.3

Эта короткая памятка дополняет полный гайд `guide-tailwind-css-4.3-ru.md`.

## Главная идея

Tailwind CSS позволяет писать стили через маленькие utility-классы прямо в HTML:

```html
<button class="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700">
  Сохранить
</button>
```

Разбор:

| Класс | Что делает |
|---|---|
| `rounded-lg` | Скругляет углы |
| `bg-sky-600` | Задает фон |
| `px-4 py-2` | Задает горизонтальные и вертикальные отступы |
| `font-semibold` | Делает текст полужирным |
| `text-white` | Делает текст белым |
| `hover:bg-sky-700` | Меняет фон при наведении |

## Самые частые группы классов

| Группа | Примеры |
|---|---|
| Отступы | `p-4`, `px-6`, `mt-4`, `gap-3` |
| Размеры | `w-full`, `max-w-4xl`, `min-h-screen`, `size-12` |
| Текст | `text-sm`, `text-2xl`, `font-bold`, `leading-8` |
| Цвета | `bg-white`, `text-slate-600`, `border-slate-200` |
| Layout | `flex`, `grid`, `items-center`, `justify-between` |
| Состояния | `hover:*`, `focus-visible:*`, `active:*`, `disabled:*` |
| Адаптивность | `sm:*`, `md:*`, `lg:*`, `xl:*`, `2xl:*` |

## Что помнить про Tailwind 4.3

- Tailwind подключается через `@import "tailwindcss"`.
- Основная настройка темы живет в CSS через `@theme`.
- В учебных репозиториях лучше ограничивать сканирование через `source(none)` и `@source`.
- Новые фичи 4.3: `scrollbar-*`, `zoom-*`, `tab-*`, `@container-size`, улучшенный `@variant`.
