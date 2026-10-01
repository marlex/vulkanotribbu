# Vulkano Tribbu · web

Web de la agencia Vulkano Tribbu. Sitio estático, sin dependencias: HTML, CSS y JavaScript propios.

**Concepto:** lava que se enfría. Los titulares entran incandescentes y se asientan en piedra; el fuego vive en el movimiento (brasas, resplandores, transiciones) y la estructura es sobria. Cada página empieza con energía y termina en calma. Lema: *Todo el fuego. Nada de humo.*

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Portada: intro animada, manifiesto, cifras, marcas, servicios, método, ética, trabajo, cierre |
| `agencia.html` | Origen, cómo somos, equipo, únete a la tribbu |
| `servicios.html` | Seis disciplinas, formatos de colaboración, preguntas frecuentes |
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
assets/js/site.js      Movimiento: brasas, titulares que se enfrían, revelados, transiciones
src/partials/          Cabecera, pie y <head> comunes
src/pages/             Contenido de cada página (primera línea: título y descripción en JSON)
site.config.mjs        Dominio, email, redes y menú
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

## Pendiente de validar
- Design system definitivo (si existe uno distinto, sustituir los tokens de `:root`).
- Email de contacto y perfiles sociales en `site.config.mjs`.
- Sectores de Zertiban e Ignia Institution en `src/pages/marcas.html`.
- Compromisos con cifra: respuesta en 48 h y plazos orientativos en las preguntas frecuentes.
- Datos fiscales en `legal.html`.
