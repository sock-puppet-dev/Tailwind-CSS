import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(path) {
  return JSON.parse(readFileSync(join(root, path), "utf8"));
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function requireFile(path) {
  if (!existsSync(join(root, path))) {
    fail(`Missing required file: ${path}`);
  }
}

function walk(dir, files = []) {
  const absolute = join(root, dir);
  if (!existsSync(absolute)) return files;

  for (const entry of readdirSync(absolute)) {
    if ([".git", ".idea", "node_modules", "dist"].includes(entry)) continue;
    const path = join(absolute, entry);
    const rel = relative(root, path);

    if (statSync(path).isDirectory()) {
      walk(rel, files);
    } else {
      files.push(rel);
    }
  }

  return files;
}

const requiredFiles = [
  "README.md",
  "quick-start-1-hour.md",
  "guide-tailwind-css-4.3-ru.md",
  "guide-setup-tailwind-css-4.3-ru.md",
  "guide-basics-tailwind-css-4.3-ru.md",
  "exercises/README.md",
  "src/input.css",
  "examples/tailwind-cli/index.html",
  "examples/tailwind-cli/sample-link.html",
  "examples/plain-css/inline-style.html",
  "examples/plain-css/external-css.html",
  "examples/plain-css/button.css",
  "examples/vite/package.json",
  "examples/vite/vite.config.js",
  "examples/vite/index.html",
  "examples/vite/src/main.js",
  "examples/vite/src/style.css",
  "scripts/visual-check.mjs",
];

for (const file of requiredFiles) requireFile(file);

const packageJson = readJson("package.json");
const packageLock = readJson("package-lock.json");

if (packageJson.devDependencies?.tailwindcss !== "4.3.0") {
  fail("package.json must pin tailwindcss to 4.3.0");
}

if (packageJson.devDependencies?.["@tailwindcss/cli"] !== "4.3.0") {
  fail("package.json must pin @tailwindcss/cli to 4.3.0");
}

if (packageJson.scripts?.check !== "npm run build && npm run check:project") {
  fail("package.json must include the expected check script");
}

if (packageJson.scripts?.["visual:check"] !== "node ./scripts/visual-check.mjs") {
  fail("package.json must include visual:check");
}

if (packageLock.packages?.[""]?.devDependencies?.tailwindcss !== "4.3.0") {
  fail("package-lock.json root must pin tailwindcss to 4.3.0");
}

if (packageLock.packages?.[""]?.devDependencies?.["@tailwindcss/cli"] !== "4.3.0") {
  fail("package-lock.json root must pin @tailwindcss/cli to 4.3.0");
}

const inputCss = read("src/input.css");
if (!inputCss.includes('@import "tailwindcss" source(none);')) {
  fail('src/input.css must use @import "tailwindcss" source(none);');
}

if (!inputCss.includes('@source "../examples";')) {
  fail('src/input.css must include @source "../examples";');
}

const sourceFiles = walk(".");
const legacyTerms = [
  "Tailwind CSS v4" + ".2",
  "tailwindcss@^4" + ".2",
  "@tailwindcss/cli@^4" + ".2",
  "with" + "-tw",
  "with" + "-css-file",
  "without" + "-tw",
  "GUIDE to " + "setup",
  "GUIDE to " + "basics",
];

for (const file of sourceFiles) {
  if (file === "package-lock.json") continue;
  if (file === "scripts/check-project.mjs") continue;
  const content = read(file);
  if (legacyTerms.some((term) => content.includes(term))) {
    fail(`Legacy Tailwind reference found in ${file}`);
  }
}

const tailwindExample = read("examples/tailwind-cli/index.html");
if (!tailwindExample.includes('href="../../dist/output.css"')) {
  fail("examples/tailwind-cli/index.html must link ../../dist/output.css");
}

const plainCssExample = read("examples/plain-css/external-css.html");
if (!plainCssExample.includes('href="./button.css"')) {
  fail("examples/plain-css/external-css.html must link ./button.css");
}

const vitePackage = readJson("examples/vite/package.json");
if (vitePackage.devDependencies?.tailwindcss !== "4.3.0") {
  fail("examples/vite/package.json must pin tailwindcss to 4.3.0");
}

if (vitePackage.devDependencies?.["@tailwindcss/vite"] !== "4.3.0") {
  fail("examples/vite/package.json must pin @tailwindcss/vite to 4.3.0");
}

if (vitePackage.devDependencies?.vite !== "8.0.13") {
  fail("examples/vite/package.json must pin vite to 8.0.13");
}

if (!existsSync(join(root, "dist/output.css"))) {
  fail("dist/output.css is missing. Run npm run build before npm run check.");
} else {
  const outputCss = read("dist/output.css");
  const expectedOutput = [
    ".\\@container-size",
    ".scrollbar-thin",
    ".zoom-75",
    ".tab-2",
  ];

  for (const expected of expectedOutput) {
    if (!outputCss.includes(expected)) {
      fail(`dist/output.css does not contain expected Tailwind 4.3 output: ${expected}`);
    }
  }
}

const markdownFiles = sourceFiles.filter((file) => file.endsWith(".md"));
const localMarkdownLinkPattern = /\[[^\]]+\]\((?!https?:|#)([^)]+)\)/g;

for (const file of markdownFiles) {
  const content = read(file);
  for (const match of content.matchAll(localMarkdownLinkPattern)) {
    const target = match[1].split("#")[0];
    if (!target || target.startsWith("mailto:")) continue;
    const resolved = join(root, dirname(file), target);
    if (!existsSync(resolved)) {
      fail(`Broken local Markdown link in ${file}: ${match[1]}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Project check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Project check passed.");
