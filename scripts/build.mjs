// Generador estático sin dependencias.
// Une src/partials + src/pages en dist/ y copia assets/.
//   node scripts/build.mjs            → dist/ (para GitHub Pages / dominio)
//   node scripts/build.mjs --preview  → dist-preview/ (portada sin envoltorio,
//                                       para publicarla como Artifact de pruebas)
import { readFile, writeFile, mkdir, readdir, cp, rm, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../site.config.mjs";
import services from "../src/data/services.mjs";
import projects from "../src/data/projects.mjs";
import { serviceCards, diagnostic, servicePage, servicePath } from "./templates.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const preview = process.argv.includes("--preview");
const out = join(root, preview ? "dist-preview" : "dist");

const read = (p) => readFile(join(root, p), "utf8");
const [head, header, footer, heroVideo] = await Promise.all([
  read("src/partials/head.html"),
  read("src/partials/header.html"),
  read("src/partials/footer.html"),
  read("src/partials/hero-video.html")
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
  .map((s) => (s.url ? `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>` : `<span class="soon">${s.label}</span>`))
  .join("\n        ");

const exists = (p) => access(join(root, p)).then(() => true, () => false);
const pad = (i) => String(i + 1).padStart(2, "0");

// Marcas: tarjetas apiladas con render 3D de fondo (scripts/render-media.cjs → assets/img/scenes).
const brandStack = (list) =>
  list
    .map((b, i) => {
      const img = b.image || `assets/img/scenes/${b.scene}.jpg`;
      const p = projects[b.slug];
      const sheet = p
        ? `<template class="project-tpl">
          <figure class="sheet-media"><img src="${img}" alt="" width="1600" height="1000"></figure>
          <div class="sheet-head">
            <span class="sheet-kicker"><span>${pad(i)}</span><span>${b.sector}</span></span>
            <h2 class="sheet-title" id="sheet-title">${b.name}</h2>
            <p class="sheet-lead">${p.project}</p>
            <ul class="sheet-tags">${p.services.map((t) => `<li>${t}</li>`).join("")}</ul>
          </div>
          <div class="sheet-grid">
            <section class="sheet-block"><h3>El reto</h3><p>${p.challenge}</p></section>
            <section class="sheet-block"><h3>Cómo lo hicimos</h3><ol>${p.approach.map((t) => `<li>${t}</li>`).join("")}</ol></section>
            <section class="sheet-block sheet-block--wide"><h3>Qué conseguimos</h3><ul class="sheet-results">${p.results.map((t) => `<li>${t}</li>`).join("")}</ul></section>
          </div>
          <div class="sheet-cta"><p>¿Tienes un reto parecido?</p><a class="btn" href="contacto.html">Hablemos <span class="arrow" aria-hidden="true">→</span></a></div>
        </template>`
        : "";
      return `<li class="stack-item" id="${b.slug}" style="--i:${i}">
        <a class="stack-card" href="marcas.html#${b.slug}" data-project data-cursor="Ver proyecto">
          <img src="${img}" alt="" width="1600" height="1000" loading="lazy" decoding="async">
          <span class="stack-top"><span>${pad(i)}</span><span>${b.sector}</span></span>
          <span class="stack-name">${b.name}</span>
          <span class="stack-open">Ver proyecto <span aria-hidden="true">+</span></span>
        </a>
        ${sheet}
      </li>`;
    })
    .join("\n      ");
const brandLogos = (
  await Promise.all(
    config.brands.map(async (b) => {
      const logoPath = `assets/logos/${b.slug}.svg`;
      const inner = (await exists(logoPath))
        ? (await read(logoPath)).replace(/<svg /, `<svg role="img" aria-label="${b.name}" `)
        : `<span>${b.name}</span>`;
      return `<li class="logo">${inner}</li>`;
    })
  )
).join("\n      ");
const gallery = config.gallery
  .map((g, i) => `<li class="gallery-item gallery-item--${g.shape}"><img src="assets/img/gallery/${g.scene}.jpg" alt="" width="720" height="900" loading="lazy" decoding="async"></li>`)
  .join("\n      ");
const expertise = services
  .map((s, i) => `<li class="exp-row reveal">
        <span class="exp-num">${pad(i)}</span>
        <h3><a href="${servicePath(s)}">${s.name}</a></h3>
        <p>${s.lead.split(". ")[0].replace(/\.$/, "")}.</p>
      </li>`)
  .join("\n      ");

const fill = (tpl, vars) => tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, "assets"), join(out, "assets"), { recursive: true });

// Páginas escritas a mano (src/pages) + páginas de servicio generadas desde los datos.
const pages = [];
for (const file of (await readdir(join(root, "src/pages"))).filter((f) => f.endsWith(".html"))) {
  const src = await read(`src/pages/${file}`);
  const metaMatch = src.match(/^<!--(\{.*?\})-->\s*/s);
  if (!metaMatch) throw new Error(`Falta la cabecera JSON en ${file}`);
  pages.push({ file, meta: JSON.parse(metaMatch[1]), body: src.slice(metaMatch[0].length) });
}
for (const s of services) pages.push({ file: servicePath(s), ...servicePage(s, services) });
const svcCards = serviceCards(services);
const diag = diagnostic(services);
const urls = [];

for (const { file, meta, body } of pages) {
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
    heroVideo,
    brandStack: brandStack(config.brands),
    brandStackHome: brandStack(config.brands.filter((b) => b.featured)),
    brandLogos,
    gallery,
    expertise,
    contactCurrent: meta.nav === "contacto" ? ' aria-current="page"' : "",
    serviceCards: svcCards,
    diagnostic: diag
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
