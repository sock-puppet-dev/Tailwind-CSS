# Tailwind CSS 4.3 Guide RU

Учебный репозиторий для анализа, улучшения и практики по Tailwind CSS 4.3 на русском языке.

## Что внутри

| Файл или папка | Назначение |
|---|---|
| `guide-tailwind-css-4.3-ru.md` | Полный гайд для новичка по Tailwind CSS 4.3 |
| `quick-start-1-hour.md` | Быстрый маршрут на 1 час |
| `guide-setup-tailwind-css-4.3-ru.md` | Короткая установка через Tailwind CLI |
| `guide-basics-tailwind-css-4.3-ru.md` | Мини-шпаргалка по базовым utility-классам |
| `exercises/` | Практические задания от кнопки до финальной страницы |
| `src/input.css` | Входной CSS-файл Tailwind |
| `dist/output.css` | Сгенерированный CSS, создается командой сборки и игнорируется Git |
| `examples/tailwind-cli/` | HTML-примеры, которые реально сканирует Tailwind |
| `examples/vite/` | Отдельный пример Tailwind CSS 4.3 + Vite |
| `examples/plain-css/` | Примеры обычного CSS для сравнения с Tailwind |
| `scripts/check-project.mjs` | Автоматическая проверка структуры, версий и 4.3-утилит |
| `scripts/visual-check.mjs` | Headless-скриншоты HTML-примеров через локальный Chromium-браузер |

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

## Полная проверка проекта

```bash
npm run check
```

Команда сначала собирает `dist/output.css`, затем проверяет:

- версии Tailwind и CLI;
- наличие всех учебных файлов;
- отсутствие устаревших 4.2-ссылок в исходниках;
- корректные пути к CSS в HTML-примерах;
- генерацию 4.3-утилит: `scrollbar-*`, `zoom-*`, `tab-*`, `@container-size`;
- локальные Markdown-ссылки.

## Визуальная проверка

```bash
npm run visual:check
```

Команда делает desktop/mobile-скриншоты HTML-примеров в `visual-report/`. Папка игнорируется Git, потому что это локальный QA-артефакт.

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
npm run check
npm run visual:check
npm audit --audit-level=low
```

## Vite-пример

```bash
cd examples/vite
npm install
npm run dev
```

Vite-пример закреплен на `vite 8.0.13`, `tailwindcss 4.3.0` и `@tailwindcss/vite 4.3.0`.
