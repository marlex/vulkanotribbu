// Datos editables del sitio. Cambia aquí y vuelve a ejecutar `npm run build`.
export default {
  name: "Vulkano Tribbu",
  // Dominio definitivo (sin https://). Al rellenarlo se genera el archivo CNAME
  // para GitHub Pages y las URLs canónicas del sitemap.
  domain: "vulkanotribbu.com",
  email: "hola@vulkanotribbu.com",
  tagline: "Direction that build. Passion that create.",
  social: [
    // Sustituir por los perfiles reales. Los vacíos no se muestran.
    { label: "Instagram", url: "" },
    { label: "LinkedIn", url: "" },
    { label: "Behance", url: "" }
  ],
  // Marcas: el logo se toma de assets/logos/<slug>.svg si existe (en monocromo,
  // fill="currentColor"); si no, se muestra el nombre.
  // image: fotograma o foto del proyecto; si falta, se usa el render 3D de assets/img/scenes/<scene>.jpg.
  // featured: aparece en las tarjetas apiladas de la portada.
  brands: [
    { slug: "ikea", name: "IKEA", sector: "Retail · Operaciones", scene: "knot", featured: true, image: "assets/img/projects/ikea.jpg" },
    { slug: "santander", name: "Banco Santander", sector: "Banca · Prevención de riesgos", scene: "ember", featured: true, image: "assets/img/projects/santander.jpg" },
    { slug: "ey", name: "EY", sector: "Consultoría · Eventos", scene: "noir", featured: true, image: "assets/img/projects/ey.jpg" },
    { slug: "prisa-radio", name: "Prisa Radio", sector: "Medios · Audio", scene: "spheres", featured: true, image: "assets/img/projects/prisa-radio.jpg" },
    { slug: "leroymerlin", name: "Leroy Merlin", sector: "Retail · Omnicanalidad", scene: "lime", featured: true, image: "assets/img/projects/leroymerlin.jpg" },
    { slug: "carnaval-tenerife", name: "Carnaval de Tenerife", sector: "Cultura · Evento", scene: "silk", image: "assets/img/projects/carnaval-tenerife.jpg" },
    { slug: "coverwallet", name: "Coverwallet", sector: "Seguros · Digital", scene: "rings", image: "assets/img/projects/coverwallet.jpg" },
    { slug: "zertiban", name: "Zertiban", sector: "Empresa", scene: "drop", image: "assets/img/projects/zertiban.jpg" },
    { slug: "ignia", name: "Ignia Institution", sector: "Institución", scene: "twist", image: "assets/img/projects/ignia.jpg" }
  ],
  // Galería horizontal de la portada: fotogramas de vuestros vídeos (assets/img/gallery/<file>.jpg).
  // shape: tall | wide | square
  gallery: [
    { file: "g1", shape: "square" }, { file: "g2", shape: "wide" }, { file: "g3", shape: "tall" },
    { file: "g4", shape: "square" }, { file: "g5", shape: "wide" }, { file: "g6", shape: "tall" },
    { file: "g7", shape: "square" }, { file: "g8", shape: "wide" }
  ],
  nav: [
    { slug: "agencia", label: "Agencia" },
    { slug: "servicios", label: "Servicios" },
    { slug: "marcas", label: "Marcas" },
    { slug: "manifiesto", label: "Manifiesto" },
    { slug: "diario", label: "Diario" }
  ]
};
