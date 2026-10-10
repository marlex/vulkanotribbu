# Vulkano Tribbu · web

Web de la agencia Vulkano Tribbu. Sitio estático, sin dependencias: HTML, CSS y JavaScript propios.

**Concepto:** agencia independiente de marca, diseño y tecnología. Lenguaje visual propio en blanco y negro: titulares grandes en Manrope de peso medio, texto ligero, líneas finas, esquinas apenas redondeadas, botones píldora de trazo fino y renders 3D abstractos en blanco y negro (cerámica blanca, laca negra). Lenguaje profesional y declarativo (tono Palantir). Lema: *Direction that build. Passion that create.*

**Logo:** logotipo tipográfico «Vulkano Tribbu.».

## Portada
1. Titular centrado que entra palabra a palabra.
2. Vídeo con esquinas redondeadas que crece hasta ocupar todo el ancho al hacer scroll; el botón de play lo abre a pantalla completa.
3. Párrafo que se colorea palabra a palabra con el scroll.
4. Cuatro contadores en blanco y negro con paralaje escalonado y cuenta animada.
5. Carrusel de las nueve marcas, grande y siempre girando.
6. Sección oscura con tarjetas apiladas (sticky): la anterior se reduce y se oscurece al llegar la siguiente. Cada tarjeta abre su ficha de proyecto.
7. Galería horizontal que se desplaza de lado con el scroll.
8. «Nuestra especialidad»: los seis servicios numerados en una tarjeta blanca que, al subir, descubre el pie fijo que hay detrás.
9. Pie con «Hablemos» gigante y cuatro columnas. Cursor propio: punto blanco en modo diferencia que se convierte en píldora («Ver proyecto», «Play») sobre tarjetas y vídeo.

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Portada (ver arriba) |
| `agencia.html` | Origen, cómo somos, equipo, únete a la tribbu |
| `servicios.html` | Seis disciplinas, diagnóstico de marca interactivo, formatos de colaboración, preguntas frecuentes |
| `servicio-<slug>.html` | Una página por servicio (estrategia, identidad, web, contenido, motion, experiencias), generada desde `src/data/services.mjs` |
| `marcas.html` | Las nueve marcas en tarjetas apiladas |
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
assets/img/scenes/     Renders 3D de las tarjetas de marcas (scripts/studio.html → scripts/render-media.cjs)
assets/img/gallery/    Renders 3D de la galería horizontal
assets/video/          Vídeo de la portada, MP4 + WebM + póster
src/partials/          Cabecera, pie, <head> y vídeo de la portada
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

## Fichas de proyecto
Al pulsar una marca se abre un panel que sube desde abajo, sin ocupar toda la pantalla (estilo móvil): imagen, sector, disciplinas, **el reto**, **cómo lo hicimos** y **qué conseguimos**, con llamada a la acción. Se cierra con la ×, la tecla Esc, pulsando fuera o arrastrando el asa hacia abajo. `marcas.html#<slug>` abre directamente la ficha de esa marca.

Los textos viven en `src/data/projects.mjs`. **Son borradores sin cifras: hay que sustituirlos por el contexto, el proceso y los resultados reales de cada proyecto.**

## Vídeo e imágenes 3D
Todo es generado, sin fotos de stock: renders 3D abstractos de estudio en blanco y negro (esferas, nudos, gotas líquidas, roca, anillos, seda) hechos con raymarching en WebGL (`scripts/studio.html`). El vídeo de la portada son cuatro tomas de 4,5 s que se funden y enlazan en bucle (18 s). Para regenerar todo: `node scripts/render-media.cjs` (Playwright + ffmpeg). Las paletas y formas se ajustan en `LOOKS`; las tomas del vídeo, en `SHOTS`.

## Contraste entre bloques
Las secciones alternan blanco (`s-light`), gris muy claro (`s-mist`) y negro (`s-ink`). `s-ink` invierte los tokens dentro de su ámbito, así cualquier componente funciona sobre fondo oscuro sin estilos extra; la cabecera cambia a claro al pasar por encima.

## Diagnóstico de marca
Seis ejes (uno por servicio) con deslizadores de 0 a 10. El radar se dibuja en vivo, calcula el índice de marca (media × 10), muestra con línea discontinua el potencial de cada eje y recomienda empezar por los dos ejes con más recorrido, enlazando a su página de servicio.

## Marcas y logos
Las marcas se definen en `brands` (`site.config.mjs`). Las que llevan `featured: true` aparecen en las tarjetas apiladas de la portada; `marcas.html` muestra las nueve.
- **Logo** (carrusel de marcas de la portada, siempre girando): se usa `assets/logos/<slug>.svg` si existe, monocromo con `fill="currentColor"`. Ahora hay logos de IKEA y Leroy Merlin (Simple Icons, CC0); el resto se muestra con su nombre.
- **Imagen de fondo:** `scene` elige un render de `assets/img/scenes/`. Para usar una foto propia, añadir `image: "assets/img/brands/archivo.jpg"`.

## Tipografía
- **Manrope** (Google Fonts) en todo el sitio: titulares en 500 con interletraje cerrado, párrafos grandes en 300, texto en 400–500. Sin negritas fuertes ni cursivas.

## Pendiente de validar
- Textos reales de cada proyecto en `src/data/projects.mjs` (reto, proceso y resultados).
- Logos en SVG de Prisa Radio, EY, Carnaval de Tenerife, Banco Santander, Coverwallet, Zertiban e Ignia Institution.
- Email de contacto y perfiles sociales en `site.config.mjs`.
- Sectores de Zertiban e Ignia Institution en `site.config.mjs`.
- Compromisos con cifra: respuesta en 48 h y plazos orientativos en las preguntas frecuentes.
- Datos fiscales en `legal.html`.
