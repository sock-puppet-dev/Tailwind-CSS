Полный учебник по Tailwind CSS v4.2 для новичка, но сразу в правильной современной логике:
не “научиться на игрушечном примере”, а понимать, как реально строить production-интерфейсы в 2026 году.

Tailwind Plus сейчас указывает, что его компоненты рассчитаны на актуальную ветку Tailwind CSS v4.2.

npm install -D tailwindcss@^4.2 @tailwindcss/cli@^4.2

mkdir -p src dist

src   — здесь будет исходный CSS
dist  — здесь будет готовый CSS после сборки

npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch

