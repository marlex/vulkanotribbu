// Generador estático sin dependencias.
// Une src/partials + src/pages en dist/ y copia assets/.
//   node scripts/build.mjs            → dist/ (para GitHub Pages / dominio)
//   node scripts/build.mjs --preview  → dist-preview/ (portada sin envoltorio,
//                                       para publicarla como Artifact de pruebas)
import { readFile, writeFile, mkdir, readdir, cp, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../site.config.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const preview = process.argv.includes("--preview");
const out = join(root, preview ? "dist-preview" : "dist");

const read = (p) => readFile(join(root, p), "utf8");
const [head, header, footer] = await Promise.all([
  read("src/partials/head.html"),
  read("src/partials/header.html"),
  read("src/partials/footer.html")
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

const fill = (tpl, vars) => tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, "assets"), join(out, "assets"), { recursive: true });

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
    socialLinks
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

console.log(`✓ ${pages.length} páginas → ${out}`);
