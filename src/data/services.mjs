// Servicios de Vulkano Tribbu. Una sola fuente para:
//  - las páginas de detalle (servicio-<slug>.html),
//  - las tarjetas de servicios de la portada y de servicios.html,
//  - los ejes del diagnóstico de marca.
// Títulos en dos tonos: [primera parte (Geist regular), segunda parte (Sharphy Light)].

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
    lead: "Bajamos al subsuelo de tu marca para encontrar lo que la hace única y lo convertimos en una plataforma clara, compartida y accionable. El mapa que hace que cada decisión posterior sea más fácil y más rentable.",
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
    related: ["identidad", "contenido"]
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
    related: ["estrategia", "web"]
  },
  {
    slug: "web",
    name: "Web y producto digital",
    title: ["Web y producto", "digital"],
    icon: '<rect x="3" y="4.5" width="18" height="15"/><path d="M3 8.5h18M6 6.5h.01M8.5 6.5h.01"/>',
    short: "Webs y experiencias digitales rápidas, accesibles y que convierten.",
    tags: ["Diseño web", "UX / UI", "Desarrollo", "E-commerce", "Accesibilidad"],
    axis: "¿Tu web trabaja para ti las 24 horas?",
    hero: ["Tu mejor comercial,", "abierto las 24 horas."],
    lead: "Diseñamos y desarrollamos webs, tiendas online y productos digitales que cargan rápido, se leen bien y convierten. Cuidamos el detalle del movimiento tanto como el rendimiento, la accesibilidad y el SEO.",
    outcomes: [
      { title: ["Más", "conversión"], text: "Recorridos claros que llevan a cada visitante a la acción que importa: contactar, comprar, reservar." },
      { title: ["Velocidad", "y alcance"], text: "Webs ligeras y bien posicionadas que llegan a más gente y se disfrutan en cualquier dispositivo." },
      { title: ["Control", "total"], text: "Un gestor de contenidos sencillo para que tu equipo actualice sin depender de nadie." }
    ],
    includes: [
      ["Arquitectura de información", "Estructura, navegación y contenidos ordenados para tu usuario."],
      ["Investigación UX", "Entrevistas, analítica y pruebas para decidir con datos."],
      ["Wireframes y prototipo", "Recorridos validados antes de diseñar el detalle."],
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
    related: ["identidad", "motion"]
  },
  {
    slug: "contenido",
    name: "Contenido y campañas",
    title: ["Contenido", "y campañas"],
    icon: '<path d="M4 15V9l11-4v14L4 15z"/><path d="M15 9.5a3 3 0 0 1 0 5M7 15.5l1.5 4h3l-1-3.6"/>',
    short: "Ideas que la gente quiere compartir, con la elegancia de tu marca.",
    tags: ["Concepto creativo", "Social media", "Campañas virales", "Copywriting", "Creadores"],
    axis: "¿Tu marca genera conversación?",
    hero: ["Ideas que", "se propagan solas."],
    lead: "Creamos conceptos con potencial para propagarse, planes de contenido y campañas en redes, medios y espacio público. Buscamos lo que se comparte porque emociona y porque aporta.",
    outcomes: [
      { title: ["Alcance", "orgánico"], text: "Ideas pensadas para compartirse, que multiplican la inversión con conversación real." },
      { title: ["Comunidad", "que crece"], text: "Una audiencia que te sigue porque le aportas valor de forma constante." },
      { title: ["Marca", "en la cultura"], text: "Presencia en las conversaciones que importan a tu público." }
    ],
    includes: [
      ["Concepto creativo", "La gran idea de campaña, con su relato y su recorrido."],
      ["Estrategia de contenido", "Pilares, formatos, canales y calendario editorial."],
      ["Campañas 360", "Ejecución coordinada en digital, medios y espacio público."],
      ["Social media", "Contenido nativo para cada red y gestión de comunidad."],
      ["Copywriting", "Textos que suenan a tu marca, del claim al microcopy."],
      ["Fotografía y vídeo", "Producción propia con dirección de arte."],
      ["Creadores de contenido", "Selección y colaboración con creadores afines a tu marca."],
      ["Relaciones con medios", "Historias con interés periodístico para ampliar el alcance."],
      ["Activaciones digitales", "Retos, filtros y dinámicas que invitan a participar."],
      ["Medición", "Indicadores de alcance, interacción y negocio."],
      ["Optimización", "Aprendizaje continuo para mejorar cada pieza."],
      ["Guías de contenido", "Para que tu equipo cree con el mismo nivel."]
    ],
    process: [
      ["Insight", "Encontramos la verdad de tu audiencia que conecta con tu marca."],
      ["Idea", "Concepto creativo y recorrido de campaña."],
      ["Producción", "Piezas para cada canal, con calidad de marca."],
      ["Lanzamiento", "Activación coordinada y gestión en tiempo real."],
      ["Aprendizaje", "Medimos, aprendemos y optimizamos la siguiente ola."]
    ],
    stack: ["Meta", "TikTok", "LinkedIn", "YouTube", "CapCut", "Adobe Premiere", "Metricool"],
    faq: [
      ["¿Podéis garantizar que algo sea viral?", "Nadie puede garantizarlo, pero sí diseñar ideas con los ingredientes que hacen que la gente quiera compartir: emoción, utilidad y verdad."],
      ["¿Gestionáis las redes del día a día?", "Sí, con un equipo dedicado o acompañando al tuyo con estrategia, plantillas y producción."],
      ["¿Trabajáis con creadores?", "Sí. Seleccionamos perfiles afines a tus valores y diseñamos colaboraciones auténticas."],
      ["¿Cómo medís los resultados?", "Acordamos indicadores desde el inicio y compartimos informes claros con aprendizajes y próximos pasos."]
    ],
    related: ["motion", "experiencias"]
  },
  {
    slug: "motion",
    name: "Motion y audiovisual",
    title: ["Motion", "y audiovisual"],
    icon: '<rect x="3" y="5" width="18" height="14"/><path d="M10 9.5v5l4.5-2.5L10 9.5z"/>',
    short: "Movimiento con intención para que tu marca respire en cada pantalla.",
    tags: ["Motion branding", "Vídeo", "Animación 2D / 3D", "Sonido de marca"],
    axis: "¿Tu marca se mueve tan bien como se ve?",
    hero: ["Marcas que", "se mueven con intención."],
    lead: "Damos movimiento y sonido a las marcas: animación de logotipos, sistemas de motion, vídeos de marca, piezas para redes y producción audiovisual completa.",
    outcomes: [
      { title: ["Atención", "que se queda"], text: "Piezas que detienen el scroll y cuentan tu historia en segundos." },
      { title: ["Emoción", "de marca"], text: "El movimiento y el sonido convierten tu identidad en una experiencia." },
      { title: ["Sistema", "reutilizable"], text: "Plantillas animadas para producir contenido nuevo rápido y con coherencia." }
    ],
    includes: [
      ["Motion branding", "Cómo se mueve tu logotipo y tu sistema visual."],
      ["Logo animado", "Aperturas y cierres con personalidad."],
      ["Vídeo de marca", "Manifiestos y piezas institucionales que emocionan."],
      ["Animación 2D", "Explicativos, ilustración animada y tipografía en movimiento."],
      ["Animación 3D", "Producto, espacios y mundos imposibles."],
      ["Piezas sociales", "Formatos verticales y cortos para cada red."],
      ["Producción audiovisual", "Guion, rodaje, edición y postproducción."],
      ["Sonido de marca", "Firma sonora, música y diseño de sonido."],
      ["Locución", "Voces que encajan con la personalidad de tu marca."],
      ["Plantillas animadas", "Sistemas editables para tu equipo."],
      ["Motion para producto", "Microinteracciones y animaciones de interfaz."],
      ["Gráfica para eventos", "Pantallas, visuales y aperturas en directo."]
    ],
    process: [
      ["Guion", "La historia y el ritmo antes que nada."],
      ["Estilo", "Frames clave y dirección visual."],
      ["Animática", "La pieza en movimiento, para validar tiempos."],
      ["Producción", "Animación, rodaje y sonido."],
      ["Entrega", "Versiones para cada canal y formato."]
    ],
    stack: ["After Effects", "Cinema 4D", "Blender", "Premiere Pro", "DaVinci Resolve", "Rive", "Lottie"],
    faq: [
      ["¿Hacéis rodajes?", "Sí, coordinamos producción completa: guion, equipo, localizaciones, rodaje y postproducción."],
      ["¿Qué formatos entregáis?", "Todos los necesarios: horizontal, vertical, cuadrado, con y sin subtítulos, y archivos para web y producto."],
      ["¿Podéis animar mi identidad actual?", "Por supuesto. Creamos un sistema de motion que respeta y potencia tu marca."],
      ["¿Incluye música?", "Podemos componer música original o licenciar la adecuada, junto con diseño de sonido y locución."]
    ],
    related: ["contenido", "identidad"]
  },
  {
    slug: "experiencias",
    name: "Experiencias y eventos",
    title: ["Experiencias", "y eventos"],
    icon: '<path d="M3 20h18M5 20V9l7-5 7 5v11"/><path d="M9.5 20v-5h5v5"/>',
    short: "Del espacio físico a la emoción colectiva, en directo y para el recuerdo.",
    tags: ["Eventos", "Espacios", "Señalética", "Activaciones"],
    axis: "¿Cómo se vive tu marca en persona?",
    hero: ["Momentos que", "se recuerdan durante años."],
    lead: "Llevamos la marca al mundo físico: identidad de eventos, espacios, stands, señalética y activaciones. Sabemos diseñar para miles de personas a la vez y en la calle.",
    outcomes: [
      { title: ["Experiencia", "memorable"], text: "Momentos que las personas cuentan y comparten durante años." },
      { title: ["Marca", "en el espacio"], text: "Lugares que transmiten tu identidad desde que alguien entra." },
      { title: ["Conexión", "directa"], text: "El contacto en persona que convierte audiencias en comunidad." }
    ],
    includes: [
      ["Concepto de experiencia", "La idea y el recorrido emocional del visitante."],
      ["Identidad de evento", "Marca, gráfica y lenguaje propios para cada edición."],
      ["Diseño de espacios", "Stands, oficinas, tiendas y espacios efímeros."],
      ["Señalética", "Orientación clara y bonita en espacios complejos."],
      ["Escenografía", "Escenarios y montajes con impacto."],
      ["Activaciones de marca", "Acciones en calle y espacios públicos."],
      ["Contenido en directo", "Pantallas, visuales y cobertura en tiempo real."],
      ["Merchandising", "Objetos con diseño que la gente quiere conservar."],
      ["Producción técnica", "Coordinación con proveedores, montaje y desmontaje."],
      ["Experiencias digitales", "Extensión online del evento para llegar más lejos."],
      ["Accesibilidad", "Experiencias pensadas para todas las personas."],
      ["Memoria del evento", "Resultados, imágenes y aprendizajes."]
    ],
    process: [
      ["Concepto", "La idea y la emoción que queremos provocar."],
      ["Diseño", "Espacio, recorrido, gráfica y contenidos."],
      ["Producción", "Proveedores, materiales y planificación técnica."],
      ["Directo", "Coordinación en el día y gestión en tiempo real."],
      ["Recuerdo", "Contenido posterior y medición del impacto."]
    ],
    stack: ["Diseño 3D", "Planos técnicos", "Gráfica de gran formato", "Producción audiovisual", "Iluminación", "Proveedores locales"],
    faq: [
      ["¿Gestionáis la producción completa?", "Sí. Coordinamos proveedores, montaje y la operación en el día para que tú solo disfrutes del resultado."],
      ["¿Trabajáis con eventos multitudinarios?", "Sí, tenemos experiencia diseñando para miles de personas en la calle, como el Carnaval de Tenerife."],
      ["¿Hacéis espacios permanentes?", "También: oficinas, tiendas y señalética para espacios que se viven a diario."],
      ["¿Podéis extender el evento al digital?", "Sí, con retransmisiones, contenido para redes y experiencias online complementarias."]
    ],
    related: ["contenido", "identidad"]
  }
];
