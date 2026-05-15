import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const reportDir = join(root, "visual-report");

const browserCandidates = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
];

const browser = browserCandidates.find((path) => existsSync(path));

if (!browser) {
  console.error("No supported Chromium browser found for visual check.");
  process.exit(1);
}

mkdirSync(reportDir, { recursive: true });

const targets = [
  {
    name: "tailwind-cli-desktop",
    page: "examples/tailwind-cli/index.html",
    width: 1440,
    height: 1000,
  },
  {
    name: "tailwind-cli-mobile",
    page: "examples/tailwind-cli/index.html",
    width: 390,
    height: 900,
  },
  {
    name: "tailwind-cli-sample-link",
    page: "examples/tailwind-cli/sample-link.html",
    width: 1440,
    height: 1000,
  },
];

for (const target of targets) {
  const pagePath = join(root, target.page);
  const outputPath = join(reportDir, `${target.name}.png`);
  const url = pathToFileURL(pagePath).href;

  const result = spawnSync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--window-size=${target.width},${target.height}`,
    `--screenshot=${outputPath}`,
    url,
  ], {
    encoding: "utf8",
  });

  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    process.exit(result.status ?? 1);
  }

  if (!existsSync(outputPath) || statSync(outputPath).size < 10_000) {
    console.error(`Visual check failed for ${target.page}: screenshot is missing or too small.`);
    process.exit(1);
  }
}

console.log(`Visual screenshots saved to ${reportDir}`);
