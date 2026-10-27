// Servicios de Vulkano Tribbu. Una sola fuente para:
//  - las páginas de detalle (servicio-<slug>.html),
//  - las tarjetas de servicios de la portada y de servicios.html,
//  - los ejes del diagnóstico de marca.
// Títulos en dos partes: [primera línea, segunda línea].

export default [
  {
    slug: "estrategia",
    name: "Estrategia de marca",
    title: ["Estrategia", "de marca"],
    icon: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
    short: "Posicionamiento, propósito y una idea clara que guía cada decisión.",
    tags: ["Posicionamiento", "Propósito", "Arquitectura", "Naming", "Tono de voz"],
    axis: "¿Tienes claro qué te hace imprescindible?",
    hero: ["La idea", "que lo ordena todo."],
    lead: "Analizamos en profundidad tu compañía, tu mercado y tus clientes para identificar lo que te hace único y lo convertimos en una plataforma clara, compartida y accionable. El mapa que hace que cada decisión posterior sea más fácil y más rentable.",
    outcomes: [
      { title: ["Foco", "compartido"], text: "Dirección, equipo y agencias reman en la misma dirección con un relato que todos entienden y pueden contar." },
      { title: ["Decisiones", "más rápidas"], text: "Cada campaña, producto o mensaje se valida contra una plataforma clara. Menos debate, más avance." },
      { title: ["Valor", "que se percibe"], text: "Un posicionamiento diferencial que justifica precio, atrae talento y abre conversaciones nuevas." }
    ],
    includes: [
      ["Investigación y escucha", "Entrevistas a dirección, equipo y clientes; análisis de mercado y competencia."],
      ["Auditoría de marca", "Qué funciona hoy, qué se puede potenciar y dónde está la gran oportunidad."],
      ["Propósito", "El porqué de la marca, formulado para inspirar y para orientar decisiones."],
      ["Posicionamiento", "El territorio que ocupas en la mente de tu cliente, frente a las alternativas."],
      ["Promesa y valores", "Lo que garantizas y cómo te comportas para cumplirlo."],
      ["Personalidad y tono", "Cómo suena tu marca: principios de voz con ejemplos de uso."],
      ["Arquitectura de marca", "Relación entre marca madre, submarcas, productos y servicios."],
      ["Naming", "Nombres con sentido, verificados a nivel lingüístico y de disponibilidad."],
      ["Mensajes clave", "Relato principal y mensajes por audiencia, listos para usar."],
      ["Talleres con tu equipo", "Sesiones de co-creación para que la estrategia sea también vuestra."],
      ["Plan de activación", "Prioridades, calendario y responsables para llevarla a la práctica."],
      ["Documento de plataforma", "Todo en un documento claro, visual y fácil de compartir."]
    ],
    process: [
      ["Escuchar", "Entrevistas, datos y conversación honesta hasta entender qué mueve a tu marca."],
      ["Destilar", "Ordenamos los hallazgos y detectamos la oportunidad de diferenciación."],
      ["Formular", "Escribimos propósito, posicionamiento, promesa y personalidad."],
      ["Validar", "Contrastamos con tu equipo y con clientes reales. Ajustamos."],
      ["Activar", "Entregamos la plataforma y el plan para ponerla a trabajar desde el primer día."]
    ],
    stack: ["Entrevistas en profundidad", "Talleres", "Benchmark", "Análisis de audiencias", "Miro", "Notion"],
    faq: [
      ["¿Necesito estrategia si ya tengo logotipo?", "Sí, y suele ser el mejor momento: la estrategia da sentido a la identidad que ya tienes y orienta cómo evolucionarla."],
      ["¿Quién participa por vuestra parte?", "Dirección estratégica y creativa senior durante todo el proyecto, las mismas personas de principio a fin."],
      ["¿Qué recibo al final?", "Un documento de plataforma de marca, los mensajes clave y un plan de activación con prioridades."],
      ["¿Se puede hacer con un equipo pequeño?", "Por supuesto. Adaptamos el formato de talleres al tamaño y ritmo de tu organización."]
    ],
    related: ["identidad", "ux"]
  },
  {
    slug: "identidad",
    name: "Identidad visual",
    title: ["Identidad", "visual"],
    icon: '<rect x="3.5" y="3.5" width="17" height="17"/><circle cx="12" cy="12" r="5.5"/>',
    short: "Logotipos y sistemas visuales con carácter, pensados para crecer contigo.",
    tags: ["Logotipo", "Sistema visual", "Design system", "Packaging", "Manual"],
    axis: "¿Tu imagen está a la altura de lo que haces?",
    hero: ["Una identidad", "que se reconoce al instante."],
    lead: "Creamos identidades con carácter y con sistema: un lenguaje visual completo que funciona igual de bien en una tarjeta, una pantalla o un edificio, y que tu equipo puede usar con libertad.",
    outcomes: [
      { title: ["Reconocimiento", "inmediato"], text: "Una presencia visual propia que se recuerda y se asocia a ti en cualquier contexto." },
      { title: ["Coherencia", "en cada punto"], text: "Un sistema que mantiene la marca impecable en todos los canales, sin depender de nadie." },
      { title: ["Autonomía", "para tu equipo"], text: "Plantillas y reglas claras para crear piezas nuevas rápido y con calidad." }
    ],
    includes: [
      ["Concepto visual", "La idea que conecta la estrategia con la forma."],
      ["Logotipo y versiones", "Símbolo, logotipo, versiones y comportamiento a todos los tamaños."],
      ["Tipografía", "Selección y jerarquía tipográfica con licencias resueltas."],
      ["Color", "Paleta principal y secundaria, con accesibilidad verificada."],
      ["Sistema gráfico", "Retículas, formas, patrones y recursos propios."],
      ["Iconografía", "Familia de iconos coherente con la identidad."],
      ["Fotografía e ilustración", "Dirección de arte y criterios de imagen."],
      ["Motion de marca", "Cómo se mueve el logotipo y el sistema en pantalla."],
      ["Aplicaciones", "Papelería, digital, señalética, merchandising."],
      ["Packaging", "Envases y etiquetado que destacan en el lineal."],
      ["Design system", "Componentes y tokens listos para producto digital."],
      ["Manual de marca", "Guía viva, online y descargable, con ejemplos de uso."]
    ],
    process: [
      ["Inmersión", "Partimos de la estrategia y del contexto visual de tu sector."],
      ["Exploración", "Varias rutas creativas, razonadas y presentadas en contexto."],
      ["Desarrollo", "Afinamos la ruta elegida hasta el último detalle."],
      ["Sistema", "Construimos el lenguaje completo y sus aplicaciones."],
      ["Entrega", "Manual, archivos maestros y formación a tu equipo."]
    ],
    stack: ["Figma", "Adobe Illustrator", "After Effects", "Glyphs", "Tokens de diseño", "Zeroheight"],
    faq: [
      ["¿Cuántas propuestas presentáis?", "Normalmente entre dos y tres rutas creativas bien desarrolladas, cada una con su razonamiento."],
      ["¿Podéis evolucionar mi logotipo actual?", "Sí. A veces la mejor decisión es evolucionar el patrimonio visual que ya tienes en lugar de empezar de cero."],
      ["¿Recibo los archivos editables?", "Todos: archivos maestros, fuentes con licencia, plantillas y el manual completo."],
      ["¿Incluye el design system para producto digital?", "Puede incluirlo. Lo entregamos en Figma con tokens listos para desarrollo."]
    ],
    related: ["estrategia", "ux"]
  },
  {
    slug: "ux",
    name: "UX y producto digital",
    title: ["UX y producto", "digital"],
    icon: "",
    short: "Apps y herramientas que la gente entiende y usa sin ayuda.",
    tags: ["Research UX", "Journey maps", "Prototipado", "Diseño UX/UI", "Test de usabilidad"],
    axis: "¿Tus usuarios consiguen lo que vienen a hacer sin ayuda?",
    hero: ["Producto que se entiende", "a la primera."],
    lead: "Diseñamos apps internas, herramientas de gestión y experiencias omnicanal a partir de cómo trabaja y decide la gente real. Investigamos, prototipamos y validamos antes de construir, para que cada pantalla ahorre tiempo y errores.",
    outcomes: [
      { title: ["Adopción", "real"], text: "Herramientas que los equipos quieren usar porque encajan en su día a día, no al revés." },
      { title: ["Menos", "fricción"], text: "Flujos de pocos pasos, claros y accesibles, que reducen errores, soporte y formación." },
      { title: ["Decisiones", "con datos"], text: "Cada funcionalidad se prioriza por impacto y se valida con usuarios antes de desarrollarla." }
    ],
    includes: [
      ["Discovery", "Objetivos de negocio, usuarios, procesos y métricas de éxito."],
      ["Research UX", "Entrevistas, shadowing y analítica para entender el uso real."],
      ["Customer journey", "Mapas de experiencia de cliente y de empleado, extremo a extremo."],
      ["Service design", "Procesos, roles y canales alineados detrás de cada pantalla."],
      ["Arquitectura de información", "Estructura y navegación pensadas para cada perfil."],
      ["Estrategia de producto", "Visión, roadmap y MVP priorizado por impacto."],
      ["Wireframes y prototipo", "Recorridos navegables para validar antes de diseñar el detalle."],
      ["Diseño UX/UI", "Interfaces claras, mobile-first y coherentes con tu marca."],
      ["Design system de producto", "Componentes y pautas para escalar con coherencia."],
      ["Test de usabilidad", "Pruebas con usuarios reales e iteración continua."],
      ["Accesibilidad", "Criterios WCAG desde el primer boceto."],
      ["Handoff y acompañamiento", "Especificaciones y soporte al equipo de desarrollo hasta el lanzamiento."]
    ],
    process: [
      ["Entender", "Usuarios, procesos y objetivos: qué problema resolvemos y cómo lo mediremos."],
      ["Definir", "Journeys, prioridades y alcance del MVP."],
      ["Prototipar", "Flujos navegables que se prueban con usuarios reales."],
      ["Diseñar", "Interfaz y design system listos para construir."],
      ["Validar y evolucionar", "Test, métricas de uso y mejora continua."]
    ],
    stack: ["Figma", "FigJam", "Maze", "Hotjar", "Miro", "Notion", "Jira", "Google Analytics"],
    faq: [
      ["¿Hacéis solo el diseño o también el desarrollo?", "Las dos cosas. Podemos diseñar y desarrollar el producto completo, o trabajar junto a tu equipo técnico con un handoff detallado."],
      ["¿Con qué usuarios hacéis las pruebas?", "Con los reales siempre que sea posible: empleados, clientes o perfiles equivalentes que reclutamos para cada estudio."],
      ["¿Trabajáis con herramientas internas?", "Sí, es una de nuestras especialidades: apps de gestión, operaciones y prevención para grandes compañías."],
      ["¿Cuánto tarda un MVP?", "Depende del alcance, pero un primer producto validado suele estar listo entre ocho y dieciséis semanas."]
    ],
    cases: ["ikea", "santander", "ey", "leroymerlin"],
    related: ["web", "estrategia"]
  },
  {
    slug: "web",
    name: "Web y desarrollo",
    title: ["Web y", "desarrollo"],
    icon: '<rect x="3" y="4.5" width="18" height="15"/><path d="M3 8.5h18M6 6.5h.01M8.5 6.5h.01"/>',
    short: "Webs y tiendas online rápidas, accesibles y que convierten.",
    tags: ["Diseño web", "Desarrollo", "E-commerce", "SEO", "Accesibilidad"],
    axis: "¿Tu web trabaja para ti las 24 horas?",
    hero: ["Tu mejor comercial,", "abierto las 24 horas."],
    lead: "Diseñamos y desarrollamos webs y tiendas online que cargan rápido, se leen bien y convierten. Cuidamos el detalle del movimiento tanto como el rendimiento, la accesibilidad y el SEO.",
    outcomes: [
      { title: ["Más", "conversión"], text: "Recorridos claros que llevan a cada visitante a la acción que importa: contactar, comprar, reservar." },
      { title: ["Velocidad", "y alcance"], text: "Webs ligeras y bien posicionadas que llegan a más gente y se disfrutan en cualquier dispositivo." },
      { title: ["Control", "total"], text: "Un gestor de contenidos sencillo para que tu equipo actualice sin depender de nadie." }
    ],
    includes: [
      ["Arquitectura de información", "Estructura, navegación y contenidos ordenados para tu usuario."],
      ["Diseño UI", "Interfaces con la identidad de tu marca y un sistema de componentes."],
      ["Motion e interacción", "Microinteracciones y transiciones que dan vida a la experiencia."],
      ["Desarrollo front-end", "Código limpio, rápido y mantenible."],
      ["CMS a medida", "Edición sencilla de contenidos para tu equipo."],
      ["E-commerce", "Tiendas online que venden, con catálogo, pagos y logística integrados."],
      ["SEO técnico", "Estructura, rendimiento y metadatos para posicionar desde el día uno."],
      ["Accesibilidad", "Cumplimiento WCAG para que tu web sea para todas las personas."],
      ["Analítica", "Medición de objetivos y paneles para seguir la evolución."],
      ["Mantenimiento y evolución", "Mejoras continuas, soporte y nuevas funcionalidades."]
    ],
    process: [
      ["Descubrir", "Objetivos de negocio, usuarios y métricas que vamos a mover."],
      ["Estructurar", "Arquitectura, contenidos y prototipo navegable."],
      ["Diseñar", "Interfaz, componentes y movimiento con tu identidad."],
      ["Desarrollar", "Construcción, pruebas de rendimiento y accesibilidad."],
      ["Lanzar y crecer", "Publicación, medición y mejora continua."]
    ],
    stack: ["Figma", "Astro", "Next.js", "Webflow", "Shopify", "WordPress", "Sanity", "Google Analytics"],
    faq: [
      ["¿Trabajáis con mi plataforma actual?", "Sí. Elegimos la tecnología según tus necesidades: desde Webflow o WordPress hasta desarrollos a medida."],
      ["¿Podré editar los contenidos?", "Siempre. Entregamos un gestor sencillo y formamos a tu equipo."],
      ["¿Incluye posicionamiento SEO?", "Incluimos SEO técnico de base en todos los proyectos y podemos acompañarte en la estrategia de contenidos."],
      ["¿Qué pasa después del lanzamiento?", "Te acompañamos con mantenimiento, analítica y mejoras continuas en el formato que prefieras."]
    ],
    related: ["ux", "identidad"]
  }
];
