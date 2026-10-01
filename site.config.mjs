// Datos editables del sitio. Cambia aquí y vuelve a ejecutar `npm run build`.
export default {
  name: "Vulkano Tribbu",
  // Dominio definitivo (sin https://). Al rellenarlo se genera el archivo CNAME
  // para GitHub Pages y las URLs canónicas del sitemap.
  domain: "",
  email: "hola@vulkanotribbu.com",
  tagline: "Fuego que impulsa. Marcas que ganan.",
  social: [
    // Sustituir por los perfiles reales. Los vacíos no se muestran.
    { label: "Instagram", url: "" },
    { label: "LinkedIn", url: "" },
    { label: "Behance", url: "" }
  ],
  // Marcas: el logo se toma de assets/logos/<slug>.svg si existe (en monocromo,
  // fill="currentColor"); si no, se muestra el nombre como marca tipográfica.
  // La imagen de fondo sale de assets/img/scenes/<scene>.jpg (o de image si se indica).
  brands: [
    { slug: "ikea", name: "IKEA", sector: "Hogar · Retail", scene: "basalt" },
    { slug: "prisa-radio", name: "Prisa Radio", sector: "Medios · Audio", scene: "milky" },
    { slug: "leroymerlin", name: "Leroy Merlin", sector: "Hogar · Retail", scene: "crater" },
    { slug: "ey", name: "EY", sector: "Consultoría", scene: "trails" },
    { slug: "carnaval-tenerife", name: "Carnaval de Tenerife", sector: "Cultura · Evento", scene: "teide" },
    { slug: "santander", name: "Banco Santander", sector: "Banca", scene: "lava" },
    { slug: "coverwallet", name: "Coverwallet", sector: "Seguros · Digital", scene: "clouds" },
    { slug: "zertiban", name: "Zertiban", sector: "Empresa", scene: "sand" },
    { slug: "ignia", name: "Ignia Institution", sector: "Institución", scene: "smoke" }
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
