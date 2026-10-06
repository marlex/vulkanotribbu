// Datos editables del sitio. Cambia aquí y vuelve a ejecutar `npm run build`.
export default {
  name: "Vulkano Tribbu",
  // Dominio definitivo (sin https://). Al rellenarlo se genera el archivo CNAME
  // para GitHub Pages y las URLs canónicas del sitemap.
  domain: "",
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
  // scene: render 3D de assets/img/scenes/<scene>.jpg (o una foto propia en image).
  // featured: aparece en las tarjetas apiladas de la portada.
  brands: [
    { slug: "ikea", name: "IKEA", sector: "Hogar · Retail", scene: "knot", featured: true },
    { slug: "santander", name: "Banco Santander", sector: "Banca", scene: "ember", featured: true },
    { slug: "ey", name: "EY", sector: "Consultoría", scene: "noir", featured: true },
    { slug: "prisa-radio", name: "Prisa Radio", sector: "Medios · Audio", scene: "spheres", featured: true },
    { slug: "leroymerlin", name: "Leroy Merlin", sector: "Hogar · Retail", scene: "lime", featured: true },
    { slug: "carnaval-tenerife", name: "Carnaval de Tenerife", sector: "Cultura · Evento", scene: "silk" },
    { slug: "coverwallet", name: "Coverwallet", sector: "Seguros · Digital", scene: "rings" },
    { slug: "zertiban", name: "Zertiban", sector: "Empresa", scene: "drop" },
    { slug: "ignia", name: "Ignia Institution", sector: "Institución", scene: "twist" }
  ],
  // Galería horizontal de la portada (assets/img/gallery). shape: tall | wide | square
  gallery: [
    { scene: "rock", shape: "square" }, { scene: "pearl", shape: "wide" }, { scene: "twist", shape: "tall" },
    { scene: "sunrock", shape: "square" }, { scene: "knot", shape: "wide" }, { scene: "drop", shape: "tall" },
    { scene: "rings", shape: "square" }, { scene: "lime", shape: "wide" }
  ],
  nav: [
    { slug: "agencia", label: "Agencia" },
    { slug: "servicios", label: "Servicios" },
    { slug: "marcas", label: "Marcas" },
    { slug: "manifiesto", label: "Manifiesto" },
    { slug: "trabajo", label: "Trabajo" },
    { slug: "diario", label: "Diario" }
  ]
};
