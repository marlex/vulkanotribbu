// Genera, desde scripts/studio.html (renders 3D abstractos con WebGL):
//   assets/img/scenes/<escena>.jpg   → imágenes de las cards de marcas (1600×1000)
//   assets/img/gallery/<escena>.jpg  → galería horizontal de la portada (720×900)
//   assets/video/hero.mp4 / hero.webm / hero-poster.jpg → vídeo de la portada
// Requiere Playwright y ffmpeg (con libx264 y libvpx-vp9).
const { writeFileSync, mkdirSync, rmSync, readdirSync } = require("node:fs");
const { join } = require("node:path");
const { spawn } = require("node:child_process");
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require("/opt/node-tools/node_modules/playwright")); }

const root = join(__dirname, "..");
const SCENES = ["knot", "spheres", "lime", "noir", "silk", "ember", "rings", "drop", "twist"];
const GALLERY = ["rock", "pearl", "sunrock", "knot", "drop", "rings", "twist", "lime"];

function ffmpeg(args, frames) {
  return new Promise((resolve, reject) => {
    const p = spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: ["pipe", "inherit", "inherit"] });
    p.on("close", (code) => (code === 0 ? resolve() : reject(new Error("ffmpeg " + code))));
    if (frames) { for (const f of frames) p.stdin.write(f); p.stdin.end(); }
  });
}
const save = (file, url) => writeFileSync(file, Buffer.from(url.split(",")[1], "base64"));

(async () => {
  const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage();
  await page.goto("file://" + join(__dirname, "studio.html"));

  // node scripts/render-media.cjs --video  → solo el vídeo
  const stills = process.argv.includes("--video") ? [] : [["scenes", SCENES, 1600, 1000], ["gallery", GALLERY, 720, 900]];
  for (const [dir, list, w, h] of stills) {
    const out = join(root, "assets/img", dir);
    rmSync(out, { recursive: true, force: true });
    mkdirSync(out, { recursive: true });
    for (const name of list) {
      save(join(out, `${name}.jpg`), await page.evaluate(([n, w, h]) => window.studioStill(n, w, h, 2), [name, w, h]));
      console.log("✓ imagen", dir, name);
    }
  }

  const W = 1600, H = 900, FPS = 24;
  const duration = await page.evaluate(() => window.videoDuration);
  const total = Math.round(duration * FPS);
  const frames = [];
  for (let i = 0; i < total; i++) {
    const url = await page.evaluate(([t, w, h]) => window.studioFrame(t, w, h), [i / FPS, W, H]);
    frames.push(Buffer.from(url.split(",")[1], "base64"));
  }
  await browser.close();

  const videoDir = join(root, "assets/video");
  mkdirSync(videoDir, { recursive: true });
  writeFileSync(join(videoDir, "hero-poster.jpg"), frames[0]);
  const input = ["-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-"];
  await ffmpeg([...input, "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", join(videoDir, "hero.mp4")], frames);
  await ffmpeg([...input, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", "-an", join(videoDir, "hero.webm")], frames);
  console.log(`✓ vídeo ${total} fotogramas (${duration}s) →`, readdirSync(videoDir).join(", "));
})();
