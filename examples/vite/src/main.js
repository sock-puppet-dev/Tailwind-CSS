import "./style.css";

document.querySelector("#app").innerHTML = `
  <main class="mx-auto grid min-h-screen w-full max-w-6xl min-w-0 justify-items-start gap-8 overflow-x-hidden bg-slate-100 px-4 py-10 text-slate-900 md:grid-cols-2 md:items-center md:justify-items-stretch">
    <section class="w-full max-w-xs min-w-0 sm:max-w-sm md:max-w-none">
      <p class="text-sm font-semibold uppercase tracking-wide text-sky-600">Tailwind CSS 4.3 + Vite</p>
      <h1 class="mt-3 max-w-xs break-words text-4xl font-bold tracking-tight text-slate-950 sm:max-w-sm md:max-w-none md:text-6xl">
        Vite-пример <br class="sm:hidden" />работает отдельно
      </h1>
      <p class="mt-5 max-w-xs break-words text-lg leading-8 text-slate-600 sm:max-w-sm md:max-w-none">
        Этот пример показывает официальный плагин @tailwindcss/vite и обычный импорт CSS.
      </p>
      <button class="mt-8 rounded-lg bg-sky-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-700 active:scale-95">
        Проверить стили
      </button>
    </section>

    <section class="w-full max-w-xs min-w-0 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:max-w-sm md:max-w-none">
      <pre class="tab-2 max-h-64 w-full max-w-full overflow-auto rounded-xl bg-slate-950 p-4 text-sm/6 text-slate-100 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900"><code>npm install -D tailwindcss@4.3.0 @tailwindcss/vite@4.3.0</code></pre>
    </section>
  </main>
`;
