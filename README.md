# Vulkano Tribbu · web

Web de la agencia Vulkano Tribbu. Sitio estático, sin dependencias: HTML, CSS y JavaScript propios.

**Concepto:** agencia independiente de marca, diseño y tecnología. Modo claro, minimalista y editorial (referencias: Pentagram en lo visual, Palantir en el tono). Papel y tinta, líneas finas, mucho aire y bandas de tinta para el contraste. Lenguaje profesional y declarativo, orientado a resultados, sin metáforas. Lema: *Direction that build. Passion that create.*

**Logo:** línea de horizonte (`currentColor`): negra sobre fondos claros y blanca sobre oscuros. El favicon (`assets/img/mark.svg`) cambia solo según el modo claro u oscuro del sistema.

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Portada: héroe con vídeo, manifiesto, cifras, marcas, servicios, diagnóstico de marca interactivo, método, ética, trabajo, cierre |
| `agencia.html` | Origen, cómo somos, equipo, únete a la tribbu |
| `servicios.html` | Seis disciplinas, formatos de colaboración, preguntas frecuentes |
| `servicio-<slug>.html` | Una página por servicio (estrategia, identidad, web, contenido, motion, experiencias), generada desde `src/data/services.mjs` |
| `marcas.html` | Las nueve marcas con las que hemos trabajado |
| `manifiesto.html` | Lo que creemos y nuestros compromisos éticos |
| `trabajo.html` | Casos en preparación (se irán añadiendo) |
| `diario.html` | Blog con los primeros temas en preparación |
| `contacto.html` | Email, formulario y otras vías de contacto |
| `legal.html` | Aviso legal, privacidad y cookies (faltan datos fiscales) |
| `404.html` | Página no encontrada |

## Estructura

```
assets/css/site.css    Tokens de diseño (color, tipografía, espacio) y componentes
assets/js/site.js      Movimiento: entrada de titulares, revelados, transiciones, diagnóstico de marca
assets/logos/          Logos de marcas en SVG monocromo (fill="currentColor")
assets/img/scenes/     Imágenes de línea de las cards (generadas con scripts/render-media.cjs)
assets/video/          Vídeo abstracto de los héroes, MP4 + WebM + póster (scripts/flow.html → scripts/render-media.cjs)
src/partials/          Cabecera, pie, <head> y vídeo de héroe comunes
src/pages/             Contenido de cada página (primera línea: título y descripción en JSON)
site.config.mjs        Dominio, email, redes, menú y marcas (logo, sector, imagen)
src/data/services.mjs  Contenido de los seis servicios (páginas, tarjetas y ejes del diagnóstico)
scripts/templates.mjs  Plantillas de página de servicio, tarjetas y diagnóstico
scripts/build.mjs      Genera dist/
```

Los tokens de `:root` en `assets/css/site.css` son el único sitio donde viven colores y tipografías: si se sustituye el design system, basta con cambiar ese bloque.

## Uso

```sh
npm run build          # genera dist/
npm run dev            # genera y sirve en http://localhost:4173
npm run build:preview  # genera dist-preview/ para la URL de pruebas (Artifact)
```

## Publicación

### URL de pruebas
Cada push a `main` o a `claude/vulkano-tribbu-website-ly55uj` publica la web en GitHub Pages mediante `.github/workflows/pages.yml`.

Activación (una sola vez): en GitHub, **Settings → Pages → Build and deployment → Source: GitHub Actions**. Si se publica desde una rama distinta de la principal, añadirla en **Settings → Environments → github-pages → Deployment branches**.

### Dominio propio
1. Escribir el dominio en `site.config.mjs` (`domain: "vulkanotribbu.com"`). El build genera `CNAME`, `sitemap.xml` y las URLs canónicas.
2. En el proveedor del dominio, crear estos registros DNS:
   - Dominio raíz (`@`), registros `A`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Registros `AAAA` (opcional): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `www`, registro `CNAME`: `marlex.github.io`
3. En **Settings → Pages**, escribir el dominio en *Custom domain* y marcar **Enforce HTTPS** cuando aparezca disponible.

## Vídeo de los héroes
Formas fluidas abstractas en grises muy claros sobre papel, con líneas de flujo finísimas. Cinco imágenes de 5 s que se funden lentamente y enlazan en bucle sin corte (25 s). Se renderiza con un shader WebGL (`scripts/flow.html`): para regenerarlo, `node scripts/render-media.cjs` (Playwright + ffmpeg). Las escenas se ajustan en el array `SCENES` (escala, flujo, dirección, densidad de líneas, contraste).

## Contraste entre bloques
Las secciones alternan papel (`s-light`), niebla (`s-mist`) y tinta (`s-ink`). `s-ink` invierte los tokens dentro de su ámbito, así cualquier componente funciona sobre fondo oscuro sin estilos extra; la cabecera cambia a claro al pasar por encima.

## Diagnóstico de marca
Seis ejes (uno por servicio) con deslizadores de 0 a 10. El radar se dibuja en vivo, calcula el índice de marca (media × 10), muestra con línea discontinua el potencial de cada eje y recomienda empezar por los dos ejes con más recorrido, enlazando a su página de servicio.

## Marcas y logos
Las cards de marcas (portada y `marcas.html`) se generan desde `brands` en `site.config.mjs`.
- **Logo:** se usa `assets/logos/<slug>.svg` si existe. Debe ser monocromo con `fill="currentColor"` para que salga en blanco sobre la imagen. Ahora hay logos de IKEA y Leroy Merlin (Simple Icons, CC0); el resto se muestra como marca tipográfica hasta tener su SVG.
- **Imagen de fondo:** `scene` elige una de `assets/img/scenes/`. Para usar una foto propia, añadir `image: "assets/img/brands/archivo.jpg"`; se pasa a blanco y negro y se le aplica el velo automáticamente.

## Tipografía
- **Geist** (Google Fonts): títulos en regular (400).
- **Sharphy** (atipo): frases de contraste en Light (300) y logotipo ("Vulkano" en Regular, "tribbu" en Light). Nunca en cursiva.
- **Manrope** (Google Fonts): texto, etiquetas, menú y botones.
- Solo dos pesos, regular y light. Sin negritas ni cursivas en ningún sitio.

Sharphy se sirve desde `assets/fonts/`; el build declara solo los archivos que encuentra:
`Sharphy-Light.<woff2|woff|ttf|otf>` y `Sharphy-Regular.<…>`. Los archivos *Italic se ignoran.
Mientras falten, se usa Geist en su lugar, sin errores.

## Pendiente de validar
- Archivos `Sharphy-Light` y `Sharphy-Regular` en `assets/fonts/`.
- Logos en SVG de Prisa Radio, EY, Carnaval de Tenerife, Banco Santander, Coverwallet, Zertiban e Ignia Institution.
- Email de contacto y perfiles sociales en `site.config.mjs`.
- Sectores de Zertiban e Ignia Institution en `src/pages/marcas.html`.
- Compromisos con cifra: respuesta en 48 h y plazos orientativos en las preguntas frecuentes.
- Datos fiscales en `legal.html`.
