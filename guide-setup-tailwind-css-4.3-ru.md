# Быстрая установка Tailwind CSS 4.3 через CLI

Короткая памятка для простого HTML-проекта без Vite, React и Vue.

## 1. Установи зависимости

```bash
npm install -D tailwindcss@4.3.0 @tailwindcss/cli@4.3.0
```

## 2. Создай структуру

```bash
mkdir -p src dist examples/tailwind-cli
touch src/input.css examples/tailwind-cli/index.html
```

Примерная структура:

```text
TAILWIND-CSS-GUIDE/
  dist/
  examples/
    tailwind-cli/
      index.html
  src/
    input.css
  package.json
```

## 3. Подключи Tailwind

`src/input.css`:

```css
@import "tailwindcss" source(none);

@source "../examples";
```

В этом учебном проекте `source(none)` нужен специально: он запрещает Tailwind сканировать Markdown-гайды и генерировать CSS из примеров внутри текста.

## 4. Добавь команды

`package.json`:

```json
{
  "scripts": {
    "dev": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch",
    "build": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify"
  }
}
```

## 5. Запусти сборку

```bash
npm run dev
```

Финальная сборка:

```bash
npm run build
```
