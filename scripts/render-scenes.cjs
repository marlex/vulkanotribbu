// Renderiza las escenas volcánicas de scripts/scenes.html a assets/img/scenes/*.jpg.
// Requiere Playwright (npx playwright o instalación global).
const { writeFileSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require("/opt/node-tools/node_modules/playwright")); }

const SIZES = {
  teide: [1000, 1300], trails: [1000, 1000], lava: [1000, 760], basalt: [1000, 1250], clouds: [1000, 1000],
  crater: [1000, 1300], milky: [1000, 760], sand: [1000, 1000], smoke: [1000, 1250]
};

(async () => {
  const root = join(__dirname, "..");
  const out = join(root, "assets/img/scenes");
  mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + join(__dirname, "scenes.html"));
  for (const [name, [w, h]] of Object.entries(SIZES)) {
    const url = await page.evaluate(([n, w, h]) => window.render(n, w, h), [name, w, h]);
    writeFileSync(join(out, `${name}.jpg`), Buffer.from(url.split(",")[1], "base64"));
    console.log("✓", name);
  }
  await browser.close();
})();
