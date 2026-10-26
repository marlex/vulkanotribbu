// Fichas de proyecto que se abren en el panel inferior (portada y marcas.html).
// IKEA, Banco Santander, EY y Leroy Merlin describen el proyecto real (validar
// detalles y, si se puede, añadir resultados con cifra). El resto son borradores.
//   title     → qué fue el proyecto (se muestra en la tarjeta y en la ficha)
//   services  → disciplinas y capacidades que intervinieron
//   project   → qué hicimos, en una frase
//   challenge → el problema de partida
//   approach  → cómo lo resolvimos (pasos)
//   results   → qué conseguimos
export default {
  ikea: {
    title: "App interna de gestión de stock",
    services: ["Estrategia de producto", "Research UX", "Diseño UX/UI", "Design system", "Prototipado", "Desarrollo"],
    project: "Aplicación interna para que los equipos de tienda y almacén gestionen el inventario en tiempo real: recuento, reposición e incidencias desde un mismo dispositivo.",
    challenge: "Los equipos trabajaban con procesos y herramientas fragmentados para controlar el stock. Cada recuento, ajuste o reposición consumía tiempo, generaba errores y dificultaba tener una visión fiable de la disponibilidad de producto en lineal y almacén.",
    approach: [
      "Discovery y shadowing en tienda y almacén: mapeamos el journey del empleado, los flujos de reposición y los puntos de fricción de cada rol.",
      "Estrategia de producto y un MVP priorizado por impacto operativo: recuento cíclico, alertas de rotura de stock, ubicaciones y gestión de incidencias.",
      "Experiencia mobile-first para uso en planta: escaneo de códigos, flujos de pocos toques, alto contraste y uso con una mano, alineada con el design system de la marca.",
      "Prototipado y test de usabilidad con empleados reales antes de desarrollar, con integración en los sistemas de inventario existentes."
    ],
    results: [
      "Una sola herramienta para recuento, reposición e incidencias.",
      "Visibilidad del stock en tiempo real para tienda y almacén.",
      "Procesos más ágiles y con menos errores en el día a día del equipo."
    ]
  },
  santander: {
    title: "App de gestión de la PRL",
    services: ["Estrategia digital", "Service design", "Diseño UX/UI", "Accesibilidad", "Desarrollo de app", "Comunicación interna"],
    project: "Aplicación para digitalizar la Prevención de Riesgos Laborales: evaluaciones de riesgos, formación obligatoria, comunicación de incidentes y seguimiento de acciones correctivas.",
    challenge: "La PRL en una organización de gran escala implica normativa exigente, múltiples centros y miles de empleados. La información estaba dispersa entre documentos y procesos manuales, lo que dificultaba la trazabilidad, el cumplimiento normativo y la respuesta rápida ante incidentes.",
    approach: [
      "Service blueprint del proceso de prevención con los equipos de PRL, RR. HH. y responsables de centro, recogiendo los requisitos de compliance y auditoría.",
      "Arquitectura de información y flujos por perfil: técnico de prevención, responsable de centro y empleado.",
      "Diseño UX/UI accesible (WCAG) para comunicar incidentes y casi accidentes en segundos, consultar protocolos y completar la formación.",
      "Cuadros de mando con indicadores de siniestralidad, estado de las evaluaciones y acciones pendientes, con trazabilidad completa para auditorías."
    ],
    results: [
      "Gestión de la PRL centralizada y trazable en una sola app.",
      "Comunicación de incidentes más rápida y sencilla para cualquier empleado.",
      "Información lista para auditoría y para la toma de decisiones."
    ]
  },
  ey: {
    title: "Sistema de invitaciones a clientes",
    services: ["Estrategia", "Customer experience", "Diseño UX/UI", "Branding de eventos", "Marketing automation", "Desarrollo web"],
    project: "Plataforma de invitaciones y gestión de eventos para clientes: de la invitación personalizada al registro, la acreditación y el seguimiento posterior.",
    challenge: "Los eventos son un canal clave de relación con clientes en una firma de servicios profesionales. Gestionar invitaciones, confirmaciones y aforos de forma manual entre varias áreas restaba tiempo a los equipos y no daba una visión clara del engagement de cada cliente.",
    approach: [
      "Mapeamos el journey del invitado y el del equipo organizador, de la segmentación de contactos al follow-up tras el evento.",
      "Invitaciones personalizadas on-brand y un flujo de registro (RSVP) sencillo, pensado para móvil y alineado con la identidad de la firma.",
      "Automatización de recordatorios, listas de espera, control de aforo y acreditación con código QR el día del evento.",
      "Datos de asistencia conectados con el CRM y un panel de métricas de engagement para medir el retorno de cada evento."
    ],
    results: [
      "Una experiencia de invitación premium y coherente con la marca.",
      "Menos gestión manual para los equipos organizadores.",
      "Datos de asistencia y engagement conectados con la relación comercial."
    ]
  },
  "prisa-radio": {
    services: ["Identidad", "Motion", "Contenido"],
    project: "Identidad en movimiento y contenido para marcas de audio con audiencias muy fieles.",
    challenge: "Dar presencia visual a marcas que nacen en el sonido y hacerlo en pantallas, redes y eventos sin diluir su personalidad.",
    approach: [
      "Traducimos el carácter sonoro de cada marca a reglas visuales.",
      "Creamos sistemas de animación para cabeceras, redes y directos.",
      "Entregamos plantillas que el equipo usa a diario."
    ],
    results: [
      "Marcas de audio con una presencia visual propia y constante.",
      "Producción diaria más ágil gracias a las plantillas.",
      "Coherencia entre antena, redes y eventos."
    ]
  },
  leroymerlin: {
    title: "Experiencia omnicanal de cocinas",
    services: ["Estrategia omnicanal", "Customer journey", "Diseño UX/UI", "Contenido", "Retail experience", "Marketing"],
    project: "Experiencia omnicanal para el proyecto de cocina: de la inspiración online al diseño con un proyectista en tienda y la instalación en casa.",
    challenge: "Comprar una cocina es una decisión de alto valor y ciclo de compra largo. El cliente salta entre web, app, tienda y atención telefónica, y cada salto sin continuidad genera dudas, abandonos y una experiencia fragmentada.",
    approach: [
      "Customer journey mapping del proyecto de cocina con clientes y vendedores: inspiración, planificación, presupuesto, compra, instalación y posventa.",
      "Puntos de contacto clave conectados entre sí: contenidos de inspiración, planificador 3D, cita previa con proyectista y seguimiento del pedido.",
      "Diseño UX/UI y contenidos para web y app, y materiales para el espacio de cocinas en tienda, con un mismo lenguaje y mensajes.",
      "Recorrido phygital: el proyecto empezado online continúa en tienda sin volver a empezar, y la tienda alimenta el canal digital."
    ],
    results: [
      "Un recorrido continuo entre online, tienda y casa.",
      "Más confianza del cliente en una compra de alto valor.",
      "Tienda y canal digital trabajando sobre el mismo proyecto del cliente."
    ]
  },
  coverwallet: {
    services: ["Estrategia", "Web", "Contenido"],
    project: "Estrategia de comunicación y producto digital para simplificar los seguros de empresa.",
    challenge: "Explicar un producto técnico a autónomos y pequeñas empresas, generar confianza y facilitar la contratación online.",
    approach: [
      "Definimos un mensaje central claro y orientado al beneficio.",
      "Rediseñamos recorridos digitales para reducir fricción.",
      "Creamos contenido educativo para cada perfil de cliente."
    ],
    results: [
      "Una propuesta de valor más clara y diferencial.",
      "Recorridos digitales más sencillos.",
      "Contenido que acompaña al cliente en la decisión."
    ]
  },
  ignia: {
    services: ["Estrategia", "Identidad", "Contenido"],
    project: "Plataforma de marca y comunicación para una institución con vocación de referencia.",
    challenge: "Comunicar una misión ambiciosa con credibilidad, alinear a públicos muy diversos y construir una voz propia desde el principio.",
    approach: [
      "Definimos la plataforma de marca: propósito, valores y mensajes.",
      "Creamos una identidad sobria y reconocible.",
      "Diseñamos las primeras piezas de comunicación y su tono."
    ],
    results: [
      "Un relato compartido por todo el equipo.",
      "Una identidad con credibilidad institucional.",
      "Bases sólidas para comunicar de forma constante."
    ]
  }
};
