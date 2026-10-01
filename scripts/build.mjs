// Generador estático sin dependencias.
// Une src/partials + src/pages en dist/ y copia assets/.
//   node scripts/build.mjs            → dist/ (para GitHub Pages / dominio)
//   node scripts/build.mjs --preview  → dist-preview/ (portada sin envoltorio,
//                                       para publicarla como Artifact de pruebas)
import { readFile, writeFile, mkdir, readdir, cp, rm, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../site.config.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const preview = process.argv.includes("--preview");
const out = join(root, preview ? "dist-preview" : "dist");

const read = (p) => readFile(join(root, p), "utf8");
const [head, header, footer, teide] = await Promise.all([
  read("src/partials/head.html"),
  read("src/partials/header.html"),
  read("src/partials/footer.html"),
  read("src/partials/teide.html")
]);

const href = (slug) => `${slug}.html`;
const navLinks = (active) =>
  config.nav
    .map((n) => `<a href="${href(n.slug)}"${n.slug === active ? ' aria-current="page"' : ""}>${n.label}</a>`)
    .join("\n      ");
const mobileLinks = (active) =>
  [{ slug: "", label: "Inicio" }, ...config.nav, { slug: "contacto", label: "Contacto" }]
    .map((n, i) => {
      const url = n.slug ? href(n.slug) : "./";
      const current = (n.slug || "inicio") === active ? ' aria-current="page"' : "";
      return `<a href="${url}"${current}><small>0${i + 1}</small>${n.label}</a>`;
    })
    .join("\n    ");
const socialLinks = config.social
  .filter((s) => s.url)
  .map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`)
  .join("\n        ");

const exists = (p) => access(join(root, p)).then(() => true, () => false);
const SCENE_SIZES = { teide: [1000, 1300], trails: [1000, 1000], lava: [1000, 760], basalt: [1000, 1250], clouds: [1000, 1000], crater: [1000, 1300], milky: [1000, 760], sand: [1000, 1000], smoke: [1000, 1250] };
const brandCards = (
  await Promise.all(
    config.brands.map(async (b, i) => {
      const logoPath = `assets/logos/${b.slug}.svg`;
      const logo = (await exists(logoPath))
        ? (await read(logoPath)).replace(/<svg /, `<svg aria-hidden="true" focusable="false" `)
        : `<span class="wordmark" aria-hidden="true">${b.name}</span>`;
      const img = b.image || `assets/img/scenes/${b.scene}.jpg`;
      const [w, h] = SCENE_SIZES[b.scene] || [1000, 1000];
      const n = String(i + 1).padStart(2, "0");
      return `<li class="bcard reveal" style="--rd:${(i % 3) * 0.08}s">
        <img src="${img}" alt="" width="${w}" height="${h}" loading="lazy" decoding="async">
        <div class="bcard-logo">${logo}</div>
        <div class="bcard-meta"><span class="mono">${n}</span><h3>${b.name}</h3><span class="mono">${b.sector}</span></div>
      </li>`;
    })
  )
).join("\n      ");

// Sharphy (atipo) se sirve desde assets/fonts/. Solo se declaran los archivos que
// existen, así no hay peticiones fallidas mientras falten; hasta entonces se usa Manrope.
// Nombres esperados: Sharphy-<Peso>.<woff2|woff|ttf|otf>, p. ej. Sharphy-Light.woff2.
// Las cursivas no se usan nunca: los archivos *Italic se ignoran.
const WEIGHTS = { Thin: 100, ExtraLight: 200, Light: 300, Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 };
const FORMATS = { woff2: "woff2", woff: "woff", ttf: "truetype", otf: "opentype" };
const fontFiles = (await readdir(join(root, "assets/fonts")).catch(() => [])).filter((f) => /^Sharphy-/i.test(f));
const faces = new Map();
for (const f of fontFiles) {
  const m = f.match(/^Sharphy-(Thin|ExtraLight|Light|Regular|Medium|SemiBold|Bold)?(Italic)?\.(woff2|woff|ttf|otf)$/i);
  if (!m || m[2]) continue;
  const weightName = Object.keys(WEIGHTS).find((k) => k.toLowerCase() === (m[1] || "Regular").toLowerCase());
  const key = `${WEIGHTS[weightName]}-${m[2] ? "italic" : "normal"}`;
  if (!faces.has(key)) faces.set(key, []);
  faces.get(key).push({ file: f, format: FORMATS[m[3].toLowerCase()] });
}
const order = ["woff2", "woff", "opentype", "truetype"];
const fontCss = [...faces.entries()]
  .map(([key, files]) => {
    const [weight, style] = key.split("-");
    const src = files
      .sort((a, b) => order.indexOf(a.format) - order.indexOf(b.format))
      .map((x) => `url("../fonts/${x.file}") format("${x.format}")`)
      .join(", ");
    return `@font-face { font-family: "Sharphy"; src: ${src}; font-weight: ${weight}; font-style: ${style}; font-display: swap; }`;
  })
  .join("\n");
const fontFaces = fontCss ? `<link rel="stylesheet" href="assets/css/fonts.css">` : "";

const fill = (tpl, vars) => tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, "assets"), join(out, "assets"), { recursive: true });
if (fontCss) await writeFile(join(out, "assets/css/fonts.css"), `/* Generado por scripts/build.mjs */\n${fontCss}\n`);

const pages = (await readdir(join(root, "src/pages"))).filter((f) => f.endsWith(".html"));
const urls = [];

for (const file of pages) {
  const src = await read(`src/pages/${file}`);
  const metaMatch = src.match(/^<!--(\{.*?\})-->\s*/s);
  if (!metaMatch) throw new Error(`Falta la cabecera JSON en ${file}`);
  const meta = JSON.parse(metaMatch[1]);
  const body = src.slice(metaMatch[0].length);
  const slug = file.replace(/\.html$/, "");
  const pageUrl = config.domain ? `https://${config.domain}/${slug === "index" ? "" : file}` : "";
  if (config.domain && slug !== "404") urls.push(pageUrl);

  const vars = {
    title: meta.title,
    description: meta.description,
    canonical: pageUrl ? `<link rel="canonical" href="${pageUrl}">` : "",
    email: config.email,
    tagline: config.tagline,
    navLinks: navLinks(meta.nav),
    mobileLinks: mobileLinks(meta.nav),
    socialLinks,
    teide,
    brandCards,
    fontFaces
  };
  const headHtml = fill(head, vars);
  const bodyHtml = fill(`${fill(header, vars)}\n<main id="main">\n${body}</main>\n${fill(footer, vars)}`, vars);

  let html;
  if (preview && slug === "index") {
    // El visor de Artifacts aporta su propio <!doctype>/<head>/<body>.
    html = `${headHtml}\n${bodyHtml}`;
  } else {
    html = `<!doctype html>\n<html lang="es">\n<head>\n${headHtml}</head>\n<body class="page-${slug}">\n${bodyHtml}</body>\n</html>\n`;
  }
  await writeFile(join(out, file), html);
}

if (!preview) {
  await writeFile(join(out, ".nojekyll"), "");
  await writeFile(join(out, "robots.txt"), `User-agent: *\nAllow: /\n${config.domain ? `Sitemap: https://${config.domain}/sitemap.xml\n` : ""}`);
  if (config.domain) {
    await writeFile(join(out, "CNAME"), `${config.domain}\n`);
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`;
    await writeFile(join(out, "sitemap.xml"), sitemap);
  }
}

console.log(`✓ ${pages.length} páginas → ${out}${faces.size ? ` · Sharphy: ${faces.size} pesos` : " · Sharphy: sin archivos en assets/fonts (se usa Geist)"}`);
