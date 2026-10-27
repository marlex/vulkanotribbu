// Plantillas generadas desde src/data/services.mjs.
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const two = ([a, b]) => `${esc(a)}<br><span class="serif">${esc(b)}</span>`;
const inline = ([a, b]) => `${esc(a)} <span class="serif">${esc(b)}</span>`;
const num = (i) => String(i + 1).padStart(2, "0");
export const servicePath = (s) => `servicio-${s.slug}.html`;
const icon = (s, cls = "svc-icon") =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${s.icon}</svg>`;

// Tarjetas de servicio (portada y servicios.html)
// Listado de servicios (portada, servicios y relacionados). Cada fila es un enlace completo.
//   detail: false → título + frase (portada, relacionados)
//   detail: true  → título + resumen + descripción + etiquetas (página de servicios)
const arrow = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export function serviceList(services, { detail = false } = {}) {
  return `<ul class="svc-list${detail ? " svc-list--detail" : ""}">
${services
  .map(
    (s, i) => `      <li class="svc-row reveal" style="--rd:${(i * 0.08).toFixed(2)}s">
        <a class="svc-link" href="${servicePath(s)}" data-cursor="Ver servicio">
          <span class="svc-title"><h3>${esc(s.name)}</h3>${detail ? `<span class="svc-short">${esc(s.short)}</span>` : ""}</span>
          <span class="svc-desc">${detail ? `<span class="svc-lead">${esc(s.lead)}</span><span class="svc-tags">${s.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</span>` : esc(s.short)}</span>
          <span class="svc-go">${arrow}</span>
        </a>
      </li>`
  )
  .join("\n")}
    </ul>`;
}
export const serviceCards = (services) => serviceList(services, { detail: true });

// Diagnóstico de marca: un eje por servicio
export function diagnostic(services) {
  const sliders = services
    .map(
      (s, i) => `          <div class="diag-row">
            <label for="diag-${s.slug}">${esc(s.name)}<small>${esc(s.axis)}</small></label>
            <input type="range" id="diag-${s.slug}" min="0" max="10" step="1" value="${[6, 5, 4, 3, 4, 5][i % 6]}" data-slug="${s.slug}" data-name="${esc(s.name)}" data-href="${servicePath(s)}" aria-describedby="diag-hint">
            <output for="diag-${s.slug}">${[6, 5, 4, 3, 4, 5][i % 6]}</output>
          </div>`
    )
    .join("\n");
  return `<section class="section s-light diag" id="diagnostico" aria-labelledby="diag-title">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Diagnóstico de marca</span>
      <h2 class="display xl reveal" id="diag-title">Tres ejes.<br><span class="serif">La foto de tu marca hoy.</span></h2>
      <p class="body-l reveal" id="diag-hint">Mueve cada eje según cómo ves tu marca hoy, de 0 a 10. El mapa se dibuja al momento y te muestra dónde está tu mayor oportunidad de crecer.</p>
    </div>
    <div class="diag-grid">
      <form class="diag-controls" onsubmit="return false">
${sliders}
      </form>
      <div class="diag-visual" aria-live="polite">
        <svg class="radar" viewBox="-270 -175 540 350" role="img" aria-labelledby="radar-title">
          <title id="radar-title">Mapa de tu marca en tres ejes</title>
          <g class="radar-grid"></g>
          <polygon class="radar-target" points=""></polygon>
          <polygon class="radar-shape" points=""></polygon>
          <g class="radar-dots"></g>
          <g class="radar-labels"></g>
        </svg>
        <div class="diag-result">
          <div class="diag-score"><span class="mono">Índice de marca</span><strong><span data-score>45</span><small>/100</small></strong></div>
          <div class="diag-reco"><span class="mono">Tu mayor oportunidad</span><p data-reco>Mueve los ejes para descubrirla.</p></div>
          <a class="btn" href="contacto.html" data-reco-cta>Hablemos de tu marca <span class="arrow" aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

// Página de detalle de un servicio
export function servicePage(s, services) {
  const i = services.indexOf(s);
  const related = s.related.map((slug) => services.find((x) => x.slug === slug)).filter(Boolean);
  const lower = s.name.toLowerCase();
  const formats = [
    ["Qué es", "Un proyecto concreto, con alcance cerrado", "El servicio completo, de principio a fin", "Equipo senior de forma continua"],
    ["Para", `Una pieza clave de ${lower}`, `Un salto completo en ${lower}`, `Evolucionar ${lower} mes a mes`],
    ["Ritmo", "Semanas", "Uno o varios meses", "Continuo, con objetivos trimestrales"],
    ["Equipo", "Dirección senior + especialista", "Equipo multidisciplinar dedicado", "Tu departamento creativo externo"],
    ["Precio", "Cerrado desde el inicio", "Cerrado por fases", "Cuota mensual"],
    ["Ideal si", "Tienes una necesidad clara y concreta", "Quieres dar un gran salto", "Buscas crecer de forma constante"]
  ];
  return {
    meta: { title: `${s.name} · Vulkano Tribbu`, description: `${s.short} ${s.lead.split(". ")[0]}.`, nav: "servicios" },
    body: `<section class="hero hero--page s-light">
  <div class="wrap">
    <nav class="crumbs mono settle" style="--d:.05s" aria-label="Migas"><a href="servicios.html">Servicios</a> <span aria-hidden="true">/</span> ${num(i)}</nav>
    <span class="eyebrow settle" style="--d:.1s">${esc(s.name)}</span>
    <h1 class="hero-title display xl">
      <span class="line ignite" style="--d:.2s">${esc(s.hero[0])}</span>
      <span class="serif-line serif settle" style="--d:1.1s">${esc(s.hero[1])}</span>
    </h1>
    <div class="hero-foot">
      <p class="lead settle" style="--d:1.4s">${esc(s.lead)}</p>
      <div class="actions settle" style="--d:1.6s">
        <a class="btn" href="contacto.html">Empecemos <span class="arrow" aria-hidden="true">→</span></a>
        <a class="btn btn--ghost" href="./#diagnostico">Haz el diagnóstico</a>
      </div>
    </div>
  </div>
</section>

<section class="section s-mist" aria-labelledby="logros-title">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Lo que consigues</span>
      <h2 class="display xl reveal" id="logros-title">Resultados<br><span class="serif">que impulsan tu negocio</span></h2>
    </div>
    <div class="principles">
${s.outcomes.map((o, k) => `      <article class="principle reveal" style="--rd:${k * 0.1}s"><span class="mono muted">${num(k)}</span><h3>${inline(o.title)}</h3><p>${esc(o.text)}</p></article>`).join("\n")}
    </div>
  </div>
</section>

<section class="section s-ink" aria-labelledby="incluye-title">
  <div class="wrap">
    <div class="section-head section-head--row">
      <div class="stack">
        <span class="eyebrow">Qué incluye</span>
        <h2 class="display xl reveal" id="incluye-title">Todo lo que<br><span class="serif">tu marca necesita</span></h2>
      </div>
      <p class="muted" style="max-width:34ch">Elegimos contigo las piezas que tienen sentido para tu momento. Sin paquetes cerrados.</p>
    </div>
    <ul class="incl-grid">
${s.includes.map(([t, d], k) => `      <li class="incl reveal" style="--rd:${(k % 4) * 0.06}s"><span class="incl-plus" aria-hidden="true">+</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("\n")}
    </ul>
  </div>
</section>

<section class="section s-light" aria-labelledby="proceso-title">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Cómo lo hacemos</span>
      <h2 class="display xl reveal" id="proceso-title">Cinco pasos,<br><span class="serif">un mismo equipo</span></h2>
    </div>
    <ol class="method method--5">
${s.process.map(([t, d], k) => `      <li class="step reveal" style="--rd:${k * 0.08}s"><span class="phase mono">Paso ${k + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("\n")}
    </ol>
  </div>
</section>

<section class="section s-mist" aria-labelledby="formatos-title">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Formas de trabajar juntos</span>
      <h2 class="display xl reveal" id="formatos-title">Tres formas<br><span class="serif">de trabajar con nosotros</span></h2>
    </div>
    <div class="table-scroll reveal">
      <table class="compare">
        <thead><tr><th scope="col"><span class="sr-only">Comparativa</span></th><th scope="col">Proyecto</th><th scope="col" class="is-featured">Programa</th><th scope="col">Partner</th></tr></thead>
        <tbody>
${formats.map(([h, a, b, c]) => `          <tr><th scope="row">${esc(h)}</th><td>${esc(a)}</td><td class="is-featured">${esc(b)}</td><td>${esc(c)}</td></tr>`).join("\n")}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section s-light" aria-labelledby="stack-title">
  <div class="wrap grid-12">
    <div class="col-head stack">
      <span class="eyebrow">Herramientas</span>
      <h2 class="display xl reveal" id="stack-title">Con qué<br><span class="serif">trabajamos</span></h2>
    </div>
    <div class="col-body stack-l">
      <ul class="pill-list reveal">${s.stack.map((t) => `<li class="tag tag--l">${esc(t)}</li>`).join("")}</ul>
      <div class="faq reveal">
${s.faq.map(([q, a]) => `        <details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n")}
      </div>
    </div>
  </div>
</section>

<section class="section s-ink" aria-labelledby="combina-title">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Se combina con</span>
      <h2 class="display xl reveal" id="combina-title">Más fuerza<br><span class="serif">juntos</span></h2>
    </div>
    ${serviceList(related)}
  </div>
</section>

<section class="section s-mist closing" aria-labelledby="cierre-title">
  <div class="wrap">
    <h2 class="display xl reveal" id="cierre-title">¿Empezamos<br><span class="serif">por aquí?</span></h2>
    <div class="closing-row reveal">
      <p class="body-l">Cuéntanos qué quieres conseguir con ${esc(lower)} y te proponemos el mejor camino en una primera conversación.</p>
      <a class="btn" href="contacto.html">Hablemos <span class="arrow" aria-hidden="true">→</span></a>
    </div>
  </div>
</section>
`
  };
}
