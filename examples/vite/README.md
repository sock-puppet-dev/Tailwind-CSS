# Tailwind CSS 4.3 + Vite

Отдельный минимальный пример для Vite. Он не использует корневой `src/input.css`, потому что у Vite свой входной CSS-файл.

## Запуск

```bash
cd examples/vite
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## Главное

В Vite-проекте Tailwind подключается через официальный плагин:

```js
import tailwindcss from "@tailwindcss/vite";
```

А в CSS достаточно:

```css
@import "tailwindcss";
```
