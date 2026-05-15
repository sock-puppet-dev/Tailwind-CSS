# Tailwind CSS 4.3 Guide RU

Учебный репозиторий для анализа, улучшения и практики по Tailwind CSS 4.3 на русском языке.

## Что внутри

| Файл или папка | Назначение |
|---|---|
| `guide-tailwind-css-4.3-ru.md` | Полный гайд для новичка по Tailwind CSS 4.3 |
| `guide-setup-tailwind-css-4.3-ru.md` | Короткая установка через Tailwind CLI |
| `guide-basics-tailwind-css-4.3-ru.md` | Мини-шпаргалка по базовым utility-классам |
| `src/input.css` | Входной CSS-файл Tailwind |
| `dist/output.css` | Сгенерированный CSS, создается командой сборки и игнорируется Git |
| `examples/tailwind-cli/` | HTML-примеры, которые реально сканирует Tailwind |
| `examples/plain-css/` | Примеры обычного CSS для сравнения с Tailwind |

## Установка

```bash
npm install
```

Проект закреплен на Tailwind CSS `4.3.0` и `@tailwindcss/cli` `4.3.0`, чтобы примеры из гайда совпадали с локальной сборкой.

## Разработка

```bash
npm run dev
```

Команда следит за файлами из `examples/` и собирает CSS в `dist/output.css`.

Открой в браузере:

```text
examples/tailwind-cli/index.html
```

## Финальная сборка

```bash
npm run build
```

## Почему в `src/input.css` используется `source(none)`

В репозитории есть большой Markdown-гайд с большим количеством примеров классов, включая антипримеры. Если разрешить Tailwind автоматически сканировать весь проект, он сгенерирует CSS даже для классов из текста.

Поэтому в учебном проекте источники указаны явно:

```css
@import "tailwindcss" source(none);

@source "../examples";
```

Так CSS генерируется только для реальных HTML-примеров.

## Проверки

```bash
npm run build
npm audit --audit-level=low
```
