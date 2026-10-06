// Genera:
//   assets/img/scenes/<escena>.jpg  → imágenes de las cards de marcas (scripts/motion.html)
//   assets/video/hero.mp4 / hero.webm / hero-poster.jpg → vídeo de lava del héroe (scripts/lava.html, WebGL)
// Requiere Playwright y ffmpeg (con libx264 y libvpx-vp9).
const { writeFileSync, mkdirSync, rmSync, readdirSync } = require("node:fs");
const { join } = require("node:path");
const { spawn } = require("node:child_process");
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require("/opt/node-tools/node_modules/playwright")); }

const root = join(__dirname, "..");
// Escena → [ancho, alto, instante]
const STILLS = {
  basalt: [1000, 1250, 0], constellation: [1000, 760, 2], rings: [1000, 1300, 8],
  trails: [1000, 1000, 0], teide: [1000, 1300, 9], strata: [1000, 760, 3],
  contours: [1000, 1000, 1], dots: [1000, 1000, 2.5], contoursTall: [1000, 1250, 4]
};

function ffmpeg(args, frames) {
  return new Promise((resolve, reject) => {
    const p = spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: ["pipe", "inherit", "inherit"] });
    p.on("close", (code) => (code === 0 ? resolve() : reject(new Error("ffmpeg " + code))));
    if (frames) { for (const f of frames) p.stdin.write(f); p.stdin.end(); }
  });
}

(async () => {
  const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage();
  await page.goto("file://" + join(__dirname, "motion.html"));

  const scenesDir = join(root, "assets/img/scenes");
  rmSync(scenesDir, { recursive: true, force: true });
  mkdirSync(scenesDir, { recursive: true });
  for (const [name, [w, h, t]] of Object.entries(STILLS)) {
    const scene = name === "contoursTall" ? "contours" : name;
    const url = await page.evaluate(([s, w, h, t]) => window.still(s, w, h, t, "dark"), [scene, w, h, t]);
    writeFileSync(join(scenesDir, `${name}.jpg`), Buffer.from(url.split(",")[1], "base64"));
    console.log("✓ imagen", name);
  }

  await page.goto("file://" + join(__dirname, "lava.html"));
  const W = 1600, H = 900, FPS = 24;
  const duration = await page.evaluate(() => window.videoDuration);
  const total = Math.round(duration * FPS);
  const frames = [];
  for (let i = 0; i < total; i++) {
    const url = await page.evaluate(([t, w, h]) => window.lavaFrame(t, w, h), [i / FPS, W, H]);
    frames.push(Buffer.from(url.split(",")[1], "base64"));
  }
  await browser.close();

  const videoDir = join(root, "assets/video");
  mkdirSync(videoDir, { recursive: true });
  writeFileSync(join(videoDir, "hero-poster.jpg"), frames[0]);
  const input = ["-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-"];
  await ffmpeg([...input, "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", join(videoDir, "hero.mp4")], frames);
  await ffmpeg([...input, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "40", "-row-mt", "1", "-an", join(videoDir, "hero.webm")], frames);
  console.log(`✓ vídeo ${total} fotogramas (${duration}s) →`, readdirSync(videoDir).join(", "));
})();
