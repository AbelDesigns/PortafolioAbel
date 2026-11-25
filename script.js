/* ==========================================================================
   ABEL ACOSTA — INTERACTIVE MOTION, BILINGUAL (ES/EN) & KINETIC ENGINE
   - Mandelo Floating Pill Menu + ES/EN Language Switcher
   - Marimba Interactive Parallax & Magnetic CTAs
   - Onlines Scroll-Scrubbed Manifesto & Pinned 4-Chapter Scrollytelling
   - Mandelo Inertia Drag/Wheel/Keyboard Project Slider + Case Study Drawer
   - Kinetic "ABEL ACOSTA" Elastic Letter-Stretch & Cursor Project Preview
========================================================================== */

(() => {
  'use strict';

  // Always run the requested GSAP + Lenis + Mandelo scroll choreography cleanly
  // (avoids Windows "Show animations" OS setting disabling the site's core scrollytelling)
  const prefersReducedMotion = false;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  if (hasGSAP) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.gsap.defaults({ ease: 'power3.out' });
  }

  // Crisp, low-latency Lenis Smooth Scroll synced 1:1 to GSAP ScrollTrigger (zero double-lag)
  let lenis = null;
  if (typeof window.Lenis !== 'undefined' && !prefersReducedMotion) {
    lenis = new window.Lenis({
      lerp: 0.14,
      smoothWheel: true,
      touchMultiplier: 1.3
    });

    if (hasGSAP) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      const lenisRaf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(lenisRaf);
      };
      requestAnimationFrame(lenisRaf);
    }

    // Route in-page anchor links smoothly through Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = href === '#proyectos' || href === '#inicio' ? 0 : -72;
        lenis.scrollTo(target, { offset, duration: 1.1 });
      });
    });
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function lockPageScroll(locked) {
    document.body.classList.toggle('no-scroll', locked);
    if (lenis) {
      if (locked) lenis.stop();
      else lenis.start();
    }
  }

  // Live Maracaibo Local Time Microcopy (MotionSites craft.md)
  const liveClockEl = document.getElementById('liveClock');
  function updateLiveClock() {
    if (!liveClockEl) return;
    try {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('es-VE', {
        timeZone: 'America/Caracas',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(now);
      liveClockEl.textContent = `MARACAIBO · ${timeStr}`;
    } catch {
      liveClockEl.textContent = 'MARACAIBO · VET';
    }
  }
  updateLiveClock();
  setInterval(updateLiveClock, 30000);

  /* ------------------------------------------------------------------------
     00. FULL BILINGUAL TRANSLATIONS (ES / EN)
  ------------------------------------------------------------------------ */
  const translations = {
    es: {
      metaTitle: 'Abel Acosta | Diseñador Web UI/UX y Especialista en Branding',
      metaDesc:
        'Portafolio de Abel Acosta. 8+ años diseñando webs B2B y B2C, interfaces Mobile-First e identidades de marca basadas en UX Research para equipos remotos.',
      menuClosed: 'MENU',
      menuOpen: 'CERRAR',
      waHero:
        'https://wa.me/584146051180?text=Hola%20Abel%2C%20vi%20tu%20portafolio%20y%20quiero%20conversar%20sobre%20un%20proyecto.',
      waFooter:
        'https://wa.me/584146051180?text=Hola%20Abel%2C%20quiero%20contarte%20sobre%20un%20proyecto%20de%20web%20o%20branding.',
      toastCopied: 'Correo copiado',
      cursorDrag: 'ARRASTRA',
      cursorGlide: 'DESLIZA',
      cursorView: 'VER CASO ↗',
      manifesto:
        'A diferencia del diseño gráfico tradicional, integro el UX Research desde el día uno. No opero sobre suposiciones. Cada pantalla nace de datos reales y comportamiento del usuario para cumplir metas claras de negocio.',
      manifestoHighlights: ['ux', 'research', 'suposiciones.', 'datos', 'reales', 'negocio.'],
      text: {
        'nav.heading': 'NAVEGACIÓN',
        'nav.status': 'Disponible · Remoto',
        'nav.home': 'Inicio',
        'nav.story': 'Proceso de trabajo',
        'nav.projects': 'Proyectos',
        'nav.services': 'Servicios',
        'nav.experience': 'Trayectoria',
        'nav.contact': 'Contacto',
        'nav.direct': 'CONTACTO DIRECTO',

        'track.label': 'ESPECIALIDAD',
        'track.all': 'Todo',
        'track.web': 'Diseño Web',
        'track.branding': 'Branding',
        'cat.web': 'DISEÑO WEB · UI/UX',
        'cat.branding': 'BRANDING',

        'hero.yearsTag': '8+ AÑOS DE EXPERIENCIA',
        'hero.ctaPrimary': 'Ver proyectos',
        'hero.ctaSecondary': 'Escribir por WhatsApp',
        'hero.scrollCue': 'Baja para ver cómo trabajo',

        'story.pill0': '01 Research',
        'story.pill1': '02 Mobile-First',
        'story.pill2': '03 Systems',
        'story.pill3': '04 Branding y CRO',
        'story.ch0Desc':
          'Antes de diseñar una pantalla, reviso tu producto en Google Analytics y valido hipótesis con pruebas A/B. Así inviertes tiempo y presupuesto solo en cambios que mejoran la experiencia real.',
        'story.ch0Tag1': 'Auditoría UX',
        'story.ch0Tag4': 'Estrategia de Producto',
        'story.ch1Desc':
          'Diseño primero para el móvil para reducir pasos y fricción en pantallas pequeñas. Luego llevo esa misma claridad a plataformas B2B y B2C complejas con prototipos interactivos y UX Writing.',
        'story.ch1Tag2': 'Prototipado Interactivo',
        'story.ch1Tag4': 'Flujos B2B y B2C',
        'story.ch2Desc':
          'Creo librerías en Figma con Autolayout, variables y reglas claras en Notion. Tu equipo de desarrollo implementa más rápido y cada pantalla nueva mantiene la misma consistencia.',
        'story.ch2Tag4': 'Gestión Ágil',
        'story.ch3Desc':
          'Uno identidad visual y estrategia de conversión (CRO) para que tu marca se reconozca al instante y guíe al visitante hacia el contacto o la compra sin dudas.',
        'story.ch3Tag1': 'Branding Estratégico',
        'story.ch3Tag3': 'Dirección de Arte',
        'story.ch3Tag4': 'IA Generativa',
        'story.card0Top': 'FIG. 01 · UX RESEARCH',
        'story.card0Cap': 'Hipótesis → Validación → Decisión clara',
        'story.card1Cap': 'Pensado para el móvil, listo para productos B2B y B2C',
        'story.card2Cap': 'Componentes reutilizables listos para desarrollo',
        'story.card3Cap': 'Identidad coherente + recorrido orientado a resultados',

        'projects.kicker': '03 · PROYECTOS SELECCIONADOS',
        'projects.viewCase': 'Ver caso completo',
        'projects.hint': 'arrastra o desliza para explorar →',
        'proj.shift.impact': 'Product Design · Asistente AI',
        'proj.shift.summary':
          'Caso de estudio de diseño de producto para Shift, un asistente AI orientado a ejecución inmediata sin chat sobre Gmail, Linear y Calendar.',
        'proj.vantage.impact': 'Web Fintech · Demo en Vivo',
        'proj.vantage.summary':
          'Landing page interactiva y concepto de app móvil para Vantage Capital, plataforma de banca privada, liquidez multi-divisa y tesorería.',
        'proj.synapse.impact': 'HealthTech · Producto Digital',
        'proj.synapse.summary':
          'Marca e interfaz HealthTech diseñada para explicar tecnología médica compleja con claridad ante médicos y pacientes.',
        'proj.volta.impact': 'Movilidad Eléctrica · Stealth',
        'proj.volta.summary':
          'Sistema de identidad y tipografía para movilidad eléctrica aplicado a vehículo, accesorios, credenciales y publicidad exterior.',
        'proj.raiz.impact': 'Hospitalidad · Eco-Refugio',
        'proj.raiz.summary':
          'Identidad visual para hotel boutique y eco-refugio aplicada a menús, amenities, papelería y experiencia del huésped.',
        'proj.solis.impact': 'Arquitectura · Sistema Visual',
        'proj.solis.role': 'Arquitectura · Brand System',
        'proj.solis.summary':
          'Identidad sobria para un estudio de arquitectura contemporánea que deja respirar las obras y ordena sus presentaciones.',
        'proj.infinite.impact': 'Producto B2B · Mobile-First',
        'proj.infinite.summary':
          'Rediseño de plataforma fintech B2B para Infinite Group con flujos móviles más directos y un Design System escalable en Figma.',
        'proj.zipzap.impact': 'SaaS UX · UX Research',
        'proj.zipzap.summary':
          'Rediseño de dashboards de analítica para Zip Zap Social PR tras auditorías de usabilidad para acelerar la lectura de campañas.',
        'proj.kayratech.impact': 'Web B2B · Estrategia CRO',
        'proj.kayratech.summary':
          'Web corporativa y arquitectura de conversión para Kayratech Servicios enfocada en explicar su oferta técnica a decisores B2B.',
        'proj.crush.impact': 'Identidad · Campaña Lifestyle',
        'proj.crush.summary':
          'Identidad, empaque y campaña visual para CRUSH creada para destacar rápido en anaquel y en redes sociales.',

        'serv.c1Title': 'Diseño UI/UX y experiencia de producto',
        'serv.c1Desc':
          'Diseño apps, plataformas SaaS y flujos B2B y B2C pensados para que tus usuarios completen tareas sin fricción. Parto de UX Research, arquitectura de información y prototipos validados en Figma.',
        'serv.c1Note':
          'Desde auditorías UX y wireframes hasta Design Systems con variables listos para tu equipo de desarrollo.',
        'serv.c2Title': 'Diseño de sitios web a medida',
        'serv.c2Desc':
          'Creo webs corporativas y landing pages para empresas B2B y B2C pensadas para explicar tu oferta con claridad y convertir visitas en clientes. Diseño Mobile-First con jerarquía editorial y foco en CRO.',
        'serv.c2Note':
          'Cada sitio se diseña desde cero según los objetivos de tu negocio, sin plantillas genéricas.',
        'serv.c3Title': 'Branding e identidad visual',
        'serv.c3Desc':
          'Construyo sistemas de marca para empresas B2B y B2C: logotipo, tipografía, paleta, dirección de arte y aplicaciones digitales o de empaque listas para escalar en cada punto de contacto.',
        'serv.c3Note':
          'Identidad sólida pensada para diferenciar tu marca desde el primer vistazo y acompañarla al crecer.',

        'exp.r1Date': 'AGO 2025 – ENE 2026',
        'exp.r1Role': 'Diseñador UI/UX · Remoto',
        'exp.r1Loc': 'República Dominicana',
        'exp.r2Date': 'AGO 2025 – ENE 2026',
        'exp.r2Role': 'Diseñador Web y UI/UX · Remoto',
        'exp.r3Date': 'ENE 2025 – JUN 2025',
        'exp.r3Role': 'Diseñador UI/UX · Remoto',
        'exp.r4Date': 'FEB 2024 – DIC 2024',
        'exp.r4Role': 'Diseñador UI/UX · Remoto',
        'exp.r5Date': 'ENE 2022 – AGO 2022',
        'exp.r5Role': 'Visual & Presentation Designer · Remoto',
        'exp.r6Date': 'ENE 2018 – ACTUALIDAD',
        'exp.r6Title': 'Freelancer Independiente',
        'exp.r6Role': 'Visual Designer, UI/UX y Branding Estratégico',
        'exp.spain': 'España',

        'kinetic.hint': 'pasa el cursor sobre las letras para explorar proyectos ↘',
        'kinetic.mobileHint': 'TOCA CUALQUIER LETRA PARA EXPLORAR UN PROYECTO ↗',

        'contact.reassurance':
          'Cuéntame tu proyecto por correo o WhatsApp. Respondo en menos de 24 h, sin compromiso.',
        'contact.copy': 'Copiar',
        'contact.role': 'Diseñador UI/UX y Especialista en Branding',
        'contact.legal': '© 2026 Abel Acosta. Diseñado bajo enfoque Mobile-First.',

        'modal.back': 'Volver al portafolio',
        'modal.close': 'CERRAR ✕',
        'modal.challengeLabel': 'EL PROBLEMA',
        'modal.solutionLabel': 'CÓMO LO RESOLVÍ',
        'modal.deliverablesLabel': 'ENTREGABLES Y HERRAMIENTAS',
        'modal.galleryLabel': 'EXPLORACIÓN VISUAL DEL PROYECTO',
        'modal.nextLabel': 'SIGUIENTE PROYECTO',
        'modal.demoCta': 'Ver demo en vivo',
        'modal.landingDemoCta': 'Ver demo Landing',
        'modal.appDemoCta': 'Ver demo de la App',
        'modal.dribbbleCta': 'Ver proyecto en Dribbble',
        'modal.behanceCta': 'Ver proyecto en Behance',
        'modal.quoteCta': 'Hablar sobre un proyecto similar'
      },
      heroTracks: {
        all: {
          pill: 'Diseño Web, UI/UX & Branding',
          t1a: 'Soy Abel',
          t1b: 'diseño experiencias',
          t2a: 'digitales',
          t2b: 'que elevan tu marca',
          t3: 'y convierten visitas en clientes.',
          workImg: 'assets/hero-work-pill.jpg',
          workAlt: 'RAÍZ — Identidad Visual & Hotel Boutique'
        },
        web: {
          pill: 'Diseño Web & Producto B2B / B2C',
          t1a: 'Soy Abel',
          t1b: 'diseño webs',
          t2a: 'y apps B2B / B2C',
          t2b: 'sin fricción',
          t3: 'pensadas para convertir.',
          workImg: 'assets/projects/infinite.jpg',
          workAlt: 'Infinite Ecosystem — Plataforma Fintech B2B'
        },
        branding: {
          pill: 'Identidad & Branding Estratégico',
          t1a: 'Soy Abel',
          t1b: 'creo marcas',
          t2a: 'claras y sólidas',
          t2b: 'listas',
          t3: 'para destacar desde el día uno.',
          workImg: 'assets/projects/raiz.jpg',
          workAlt: 'RAÍZ — Identidad Visual'
        }
      },
      html: {
        'story.ch0Title': 'Decisiones basadas en <em class="serif-accent">datos reales</em>, nunca al azar.',
        'story.ch1Title': 'Arquitectura <em class="serif-accent">Mobile-First</em> sin fricción.',
        'story.ch2Title': 'Design Systems hechos para <em class="serif-accent">escalar</em> en equipo.',
        'story.ch3Title': 'Marca memorable y <em class="serif-accent">conversión</em> medible.',
        'projects.title': '<strong>Proyectos</strong> <span class="mandelo-serif">selectos</span>',
        'exp.title': '8+ años diseñando para <em class="serif-accent">equipos remotos.</em>',
        'contact.headline': '¿Tienes una web o <em class="serif-accent">marca</em> en mente?'
      }
    },
    en: {
      metaTitle: 'Abel Acosta | UI/UX Web Designer & Branding Specialist',
      metaDesc:
        'Portfolio of Abel Acosta. 8+ years designing B2B & B2C websites, mobile-first UI/UX, and research-backed brand identities for remote teams.',
      menuClosed: 'MENU',
      menuOpen: 'CLOSE',
      waHero:
        'https://wa.me/584146051180?text=Hi%20Abel%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.',
      waFooter:
        'https://wa.me/584146051180?text=Hi%20Abel%2C%20I%20would%20like%20to%20share%20a%20web%20or%20branding%20brief.',
      toastCopied: 'Email copied',
      cursorDrag: 'DRAG',
      cursorGlide: 'GLIDE',
      cursorView: 'VIEW CASE ↗',
      manifesto:
        'Unlike traditional graphic design, I bring UX Research in from day one. I never design on guesswork. Every screen comes from real user behavior and Analytics data to hit clear business goals.',
      manifestoHighlights: ['ux', 'research', 'guesswork.', 'real', 'analytics', 'goals.'],
      text: {
        'nav.heading': 'NAVIGATION',
        'nav.status': 'Available · Remote',
        'nav.home': 'Home',
        'nav.story': 'How I work',
        'nav.projects': 'Projects',
        'nav.services': 'Services',
        'nav.experience': 'Experience',
        'nav.contact': 'Contact',
        'nav.direct': 'DIRECT CONTACT',

        'track.label': 'DISCIPLINE',
        'track.all': 'All',
        'track.web': 'Web Design',
        'track.branding': 'Branding',
        'cat.web': 'WEB DESIGN · UI/UX',
        'cat.branding': 'BRANDING',

        'hero.yearsTag': '8+ YEARS EXPERIENCE',
        'hero.ctaPrimary': 'See projects',
        'hero.ctaSecondary': 'Message on WhatsApp',
        'hero.scrollCue': 'Scroll to see how I work',

        'story.pill0': '01 Research',
        'story.pill1': '02 Mobile-First',
        'story.pill2': '03 Systems',
        'story.pill3': '04 Branding & CRO',
        'story.ch0Desc':
          'Before designing a single screen, I audit your product in Google Analytics and test ideas with A/B experiments. Your team spends time only on changes that improve real user behavior.',
        'story.ch0Tag1': 'UX Audit',
        'story.ch0Tag4': 'Product Strategy',
        'story.ch1Desc':
          'I design for mobile first to cut extra steps and friction on small screens. That same clarity carries over to B2B & B2C web platforms using interactive prototypes and crisp UX Writing.',
        'story.ch1Tag2': 'Interactive Prototyping',
        'story.ch1Tag4': 'B2B & B2C Flows',
        'story.ch2Desc':
          'I build Figma component libraries with Autolayout, tokens, and clear documentation in Notion. Developers ship faster and every new feature stays visually consistent.',
        'story.ch2Tag4': 'Agile Workflows',
        'story.ch3Desc':
          'I pair visual identity with conversion strategy (CRO) so visitors recognize your brand right away and know the exact next step to inquire or buy.',
        'story.ch3Tag1': 'Strategic Branding',
        'story.ch3Tag3': 'Art Direction',
        'story.ch3Tag4': 'Generative AI',
        'story.card0Top': 'FIG. 01 · UX RESEARCH',
        'story.card0Cap': 'Hypothesis → Validation → Clear decision',
        'story.card1Cap': 'Built for mobile first, ready for B2B & B2C products',
        'story.card2Cap': 'Reusable Figma components ready for engineering',
        'story.card3Cap': 'Consistent identity + outcome-driven interface',

        'projects.kicker': '03 · SELECTED PROJECTS',
        'projects.viewCase': 'Read full case',
        'projects.hint': 'drag or glide to explore →',
        'proj.shift.impact': 'Product Design · AI Assistant',
        'proj.shift.summary':
          'Product design case study for Shift, a zero-chat AI execution assistant unifying Gmail, Linear, and Calendar into one-click actions.',
        'proj.vantage.impact': 'Fintech Web · Live Demo',
        'proj.vantage.summary':
          'Interactive landing page and mobile app experience for Vantage Capital, a private banking, multi-currency liquidity, and treasury platform.',
        'proj.synapse.impact': 'HealthTech · Digital Product',
        'proj.synapse.summary':
          'HealthTech brand and interface system designed to make clinical technology clear and approachable for doctors and patients.',
        'proj.volta.impact': 'Electric Mobility · Stealth',
        'proj.volta.summary':
          'Stealth brand identity and custom typography system applied across electric bikes, rider gear, credentials, and billboards.',
        'proj.raiz.impact': 'Hospitality · Eco-Refuge',
        'proj.raiz.summary':
          'Boutique hotel and eco-refuge identity spanning print menus, in-room amenities, stationery, and guest touchpoints.',
        'proj.solis.impact': 'Architecture · Visual System',
        'proj.solis.role': 'Architecture · Brand System',
        'proj.solis.summary':
          'Restrained identity system for a contemporary architecture studio built to frame spatial photography and client presentations cleanly.',
        'proj.infinite.impact': 'B2B Product · Mobile-First',
        'proj.infinite.summary':
          'B2B fintech redesign for Infinite Group with faster mobile flows and a scalable Figma Design System.',
        'proj.zipzap.impact': 'SaaS UX · UX Research',
        'proj.zipzap.summary':
          'Analytics dashboard redesign for Zip Zap Social PR informed by usability audits so teams read campaign performance faster.',
        'proj.kayratech.impact': 'B2B Web · CRO Strategy',
        'proj.kayratech.summary':
          'Corporate website and conversion structure for Kayratech Servicios built to clarify enterprise tech offerings for B2B buyers.',
        'proj.crush.impact': 'Brand Identity · Lifestyle',
        'proj.crush.summary':
          'Brand identity, packaging, and lifestyle campaign for CRUSH designed for instant shelf and social recognition.',

        'serv.c1Title': 'UI/UX & digital product design',
        'serv.c1Desc':
          'I design apps, SaaS platforms, and B2B & B2C flows so users finish tasks without friction. Every interface starts with UX Research, clear information architecture, and tested Figma prototypes.',
        'serv.c1Note':
          'From UX audits and user flows to tokenized Figma Design Systems ready for engineering.',
        'serv.c2Title': 'Custom website design',
        'serv.c2Desc':
          'I craft B2B & B2C corporate websites and landing pages that explain your offer clearly and turn visitors into customers. Built Mobile-First with editorial hierarchy and CRO focus.',
        'serv.c2Note':
          'Every website is designed from scratch around your business goals—never generic templates.',
        'serv.c3Title': 'Branding & visual identity',
        'serv.c3Desc':
          'I build brand systems for B2B & B2C companies—logo, typography, color, art direction, and digital or packaging applications ready to scale across every customer touchpoint.',
        'serv.c3Note':
          'A distinct visual identity designed to set your brand apart from day one and scale with you.',

        'exp.r1Date': 'AUG 2025 – JAN 2026',
        'exp.r1Role': 'UI/UX Designer · Remote',
        'exp.r1Loc': 'Dominican Republic',
        'exp.r2Date': 'AUG 2025 – JAN 2026',
        'exp.r2Role': 'Web & UI/UX Designer · Remote',
        'exp.r3Date': 'JAN 2025 – JUN 2025',
        'exp.r3Role': 'UI/UX Designer · Remote',
        'exp.r4Date': 'FEB 2024 – DEC 2024',
        'exp.r4Role': 'UI/UX Designer · Remote',
        'exp.r5Date': 'JAN 2022 – AUG 2022',
        'exp.r5Role': 'Visual & Presentation Designer · Remote',
        'exp.r6Date': 'JAN 2018 – PRESENT',
        'exp.r6Title': 'Independent Freelancer',
        'exp.r6Role': 'Visual Designer, UI/UX & Strategic Branding',
        'exp.spain': 'Spain',

        'kinetic.hint': 'hover across the letters to explore projects ↘',
        'kinetic.mobileHint': 'TAP ANY LETTER TO OPEN A PROJECT ↗',

        'contact.reassurance':
          'Send your project details by email or WhatsApp. I reply within 24 hours, no strings attached.',
        'contact.copy': 'Copy',
        'contact.role': 'UI/UX Designer & Branding Specialist',
        'contact.legal': '© 2026 Abel Acosta. Built with Mobile-First precision.',

        'modal.back': 'Back to portfolio',
        'modal.close': 'CLOSE ✕',
        'modal.challengeLabel': 'THE PROBLEM',
        'modal.solutionLabel': 'HOW I SOLVED IT',
        'modal.deliverablesLabel': 'DELIVERABLES & TOOLS',
        'modal.galleryLabel': 'PROJECT VISUAL GALLERY',
        'modal.nextLabel': 'NEXT PROJECT',
        'modal.demoCta': 'View live demo',
        'modal.landingDemoCta': 'View Landing Demo',
        'modal.appDemoCta': 'View App Demo',
        'modal.dribbbleCta': 'View project on Dribbble',
        'modal.behanceCta': 'View project on Behance',
        'modal.quoteCta': 'Discuss a similar project'
      },
      heroTracks: {
        all: {
          pill: 'Web Design, UI/UX & Branding',
          t1a: 'I’m Abel',
          t1b: 'I craft digital',
          t2a: 'experiences',
          t2b: 'that elevate brands',
          t3: 'and turn visits into clients.',
          workImg: 'assets/hero-work-pill.jpg',
          workAlt: 'RAÍZ — Brand Identity & Boutique Hotel'
        },
        web: {
          pill: 'Web Design & B2B / B2C Product',
          t1a: 'I’m Abel',
          t1b: 'I design B2B & B2C',
          t2a: 'webs & apps',
          t2b: 'built with',
          t3: 'clarity to convert faster.',
          workImg: 'assets/projects/infinite.jpg',
          workAlt: 'Infinite Ecosystem — B2B Fintech Platform'
        },
        branding: {
          pill: 'Brand Identity & Visual Systems',
          t1a: 'I’m Abel',
          t1b: 'I build clear',
          t2a: 'brand systems',
          t2b: 'made to',
          t3: 'stand out from day one.',
          workImg: 'assets/projects/raiz.jpg',
          workAlt: 'RAÍZ — Visual Identity'
        }
      },
      html: {
        'story.ch0Title': 'Decisions backed by <em class="serif-accent">real data</em>, never guesswork.',
        'story.ch1Title': '<em class="serif-accent">Mobile-First</em> flows without friction.',
        'story.ch2Title': 'Design Systems built to <em class="serif-accent">scale</em> with teams.',
        'story.ch3Title': 'Distinct brand, measurable <em class="serif-accent">conversion.</em>',
        'projects.title': '<strong>Selected</strong> <span class="mandelo-serif">work</span>',
        'exp.title': '8+ years designing for <em class="serif-accent">remote teams.</em>',
        'contact.headline': 'Have a website or <em class="serif-accent">brand</em> in mind?'
      }
    }
  };

  let currentLang = localStorage.getItem('abel_lang') === 'en' ? 'en' : 'es';

  /* ------------------------------------------------------------------------
     01. MANDELO FLOATING PILL NAVBAR
  ------------------------------------------------------------------------ */
  const navShell = document.getElementById('navShell');
  const menuToggle = document.getElementById('menuToggle');
  const navDrawer = document.getElementById('navDrawer');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLabel = menuToggle?.querySelector('.nav-pill__label');

  function updateNavLabel() {
    if (!navLabel || !navShell) return;
    const isOpen = navShell.classList.contains('is-open');
    const dict = translations[currentLang];
    navLabel.textContent = isOpen ? dict.menuOpen : dict.menuClosed;
  }

  function setMenuOpen(open) {
    if (!navShell || !menuToggle || !navDrawer || !navBackdrop) return;
    navShell.classList.toggle('is-open', open);
    navBackdrop.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    navDrawer.setAttribute('aria-hidden', String(!open));
    updateNavLabel();
    lockPageScroll(open || Boolean(activeCaseId));

    if (open && hasGSAP && !prefersReducedMotion) {
      const links = navDrawer.querySelectorAll('.nav-drawer__link');
      gsap.fromTo(
        links,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.04, ease: 'power3.out', overwrite: true, clearProps: 'transform' }
      );
    }
  }

  window.addEventListener('resize', () => {
    if (navShell?.classList.contains('is-open')) setMenuOpen(false);
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = navShell.classList.contains('is-open');
    setMenuOpen(!isOpen);
  });

  navBackdrop?.addEventListener('click', () => setMenuOpen(false));

  navDrawer?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  /* ------------------------------------------------------------------------
     02. MARIMBA HERO: GSAP ENTRANCE TIMELINE, AMBIENT ORB & MAGNETIC CTAS
  ------------------------------------------------------------------------ */
  const heroSection = document.getElementById('inicio');
  const heroOrb = document.getElementById('heroOrb');

  let heroPlayed = false;
  function playHeroEntrance() {
    if (heroPlayed || !hasGSAP || prefersReducedMotion) return;
    heroPlayed = true;

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.from('#navPill', { y: -18, opacity: 0, duration: 0.65, clearProps: 'transform' }, 0.04)
      .from('.hero__topbar', { y: 12, opacity: 0, duration: 0.6, clearProps: 'transform' }, 0.08)
      .from('#heroKickerPill', { y: 14, opacity: 0, duration: 0.65, clearProps: 'transform' }, 0.14)
      .from('.hero-line-inner', { yPercent: 112, duration: 0.95, stagger: 0.1, clearProps: 'transform' }, 0.2)
      .from(
        '.hero-pill-media',
        { scale: 0.68, opacity: 0, duration: 0.85, stagger: 0.14, ease: 'back.out(1.45)', clearProps: 'transform,opacity' },
        0.38
      )
      .from('.hero-pill-media img', { scale: 1.18, duration: 1.35, stagger: 0.14, ease: 'expo.out', clearProps: 'transform' }, 0.38)
      .from('.hero__controls', { y: 18, opacity: 0, duration: 0.72, clearProps: 'transform' }, 0.54)
      .from('.hero__footer', { y: 12, opacity: 0, duration: 0.6, clearProps: 'transform' }, 0.64);
  }

  function scheduleHeroEntrance() {
    if (prefersReducedMotion || !hasGSAP) return;
    const safetyTimer = setTimeout(playHeroEntrance, 1100);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        clearTimeout(safetyTimer);
        playHeroEntrance();
      });
    } else {
      clearTimeout(safetyTimer);
      playHeroEntrance();
    }
  }

  if (!prefersReducedMotion && !isTouchDevice && heroSection) {
    if (hasGSAP && heroOrb) {
      const orbXTo = gsap.quickTo(heroOrb, 'x', { duration: 1.1, ease: 'power3.out' });
      const orbYTo = gsap.quickTo(heroOrb, 'y', { duration: 1.1, ease: 'power3.out' });

      heroSection.addEventListener('pointermove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        orbXTo(nx * 26);
        orbYTo(ny * 20);
      });

      heroSection.addEventListener('pointerleave', () => {
        orbXTo(0);
        orbYTo(0);
      });
    }

    document.querySelectorAll('.magnetic').forEach((btn) => {
      if (hasGSAP) {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.32, ease: 'power3.out' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.32, ease: 'power3.out' });
        btn.addEventListener('pointermove', (e) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.2);
          yTo((e.clientY - r.top - r.height / 2) * 0.2);
        });
        btn.addEventListener('pointerleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' });
        });
      }
    });
  }

  /* ------------------------------------------------------------------------
     03. ONLINES SCROLLYTELLING: GSAP SCROLLTRIGGER MANIFESTO & STACKING DECK
  ------------------------------------------------------------------------ */
  const storyManifesto = document.getElementById('storyManifesto');
  const manifestoEl = document.getElementById('manifestoText');
  const manifestoProgressFill = document.getElementById('manifestoProgressFill');
  const manifestoProgressPct = document.getElementById('manifestoProgressPct');
  let manifestoWords = [];
  let manifestoTl = null;

  function buildManifesto(lang) {
    if (!manifestoEl) return;
    const dict = translations[lang];
    const highlightSet = new Set(dict.manifestoHighlights);
    const rawWords = dict.manifesto.trim().split(/\s+/);

    manifestoEl.textContent = '';
    manifestoWords = [];
    const frag = document.createDocumentFragment();

    rawWords.forEach((word) => {
      const span = document.createElement('span');
      span.className = 'manifesto-word';
      if (highlightSet.has(word.toLowerCase())) {
        span.classList.add('is-highlight');
      }
      span.textContent = word;
      frag.appendChild(span);
      manifestoWords.push(span);
    });

    manifestoEl.appendChild(frag);
    initManifestoScrollTrigger();
  }

  function initManifestoScrollTrigger() {
    if (manifestoTl) {
      manifestoTl.scrollTrigger?.kill();
      manifestoTl.kill();
      manifestoTl = null;
    }

    if (!storyManifesto || !manifestoEl || manifestoWords.length === 0) return;

    if (!hasGSAP || prefersReducedMotion) {
      manifestoWords.forEach((w) => {
        w.style.opacity = '1';
        w.classList.add('is-lit');
      });
      if (manifestoProgressFill) manifestoProgressFill.style.transform = 'scaleX(1)';
      if (manifestoProgressPct) manifestoProgressPct.textContent = '100%';
      return;
    }

    gsap.set(manifestoWords, { opacity: 0.14, y: 8 });
    if (manifestoProgressFill) gsap.set(manifestoProgressFill, { scaleX: 0 });

    let lastPct = -1;
    let lastLitCount = -1;

    manifestoTl = gsap.timeline({
      scrollTrigger: {
        trigger: storyManifesto,
        start: 'top 14%',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const pct = Math.round(p * 100);
          if (manifestoProgressPct && pct !== lastPct) {
            lastPct = pct;
            manifestoProgressPct.textContent = `${String(pct).padStart(2, '0')}%`;
          }
          const total = manifestoWords.length;
          const litCount = Math.ceil(p * total);
          if (litCount !== lastLitCount) {
            const start = Math.max(0, Math.min(lastLitCount, litCount));
            const end = Math.min(total, Math.max(lastLitCount, litCount));
            for (let i = start; i < end; i++) {
              manifestoWords[i].classList.toggle('is-lit', i < litCount);
            }
            lastLitCount = litCount;
          }
        }
      }
    });

    manifestoTl.to(
      manifestoWords,
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.055,
        ease: 'none'
      },
      0
    );

    if (manifestoProgressFill) {
      manifestoTl.to(
        manifestoProgressFill,
        {
          scaleX: 1,
          duration: manifestoTl.duration(),
          ease: 'none'
        },
        0
      );
    }
  }

  // Vertical Sticky Stacking Cards Depth Choreography (GSAP ScrollTrigger)
  const stackCards = Array.from(document.querySelectorAll('[data-stack-card]'));
  let stackTriggers = [];

  function initStackCardTriggers() {
    stackTriggers.forEach((st) => st.kill());
    stackTriggers = [];

    if (!hasGSAP || prefersReducedMotion || stackCards.length === 0) return;

    const activeCards = stackCards.filter((card) => !card.classList.contains('is-hidden'));
    activeCards.forEach((card) => gsap.set(card, { clearProps: 'transform,filter' }));

    const n = activeCards.length;
    activeCards.forEach((card, i) => {
      const nextCard = activeCards[i + 1];
      if (!nextCard) return;
      const targetScale = 1 - (n - 1 - i) * 0.032;

      const tween = gsap.fromTo(
        card,
        { scale: 1 },
        {
          scale: targetScale,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 86%',
            end: 'top 16%',
            scrub: true
          }
        }
      );

      if (tween.scrollTrigger) {
        stackTriggers.push(tween.scrollTrigger);
      }
    });

    // Fine-line Swiss blueprint SVG stroke-draw choreography per visible card
    activeCards.forEach((card) => {
      const drawables = Array.from(card.querySelectorAll('[data-bp-draw]'));
      const nodes = Array.from(card.querySelectorAll('[data-bp-node]'));
      if (drawables.length === 0 && nodes.length === 0) return;

      const bpTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 78%',
          once: true
        }
      });

      drawables.forEach((el, idx) => {
        const isDashed = el.classList.contains('bp-dashed');
        if (!isDashed && typeof el.getTotalLength === 'function') {
          const len = Math.ceil(el.getTotalLength());
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
          bpTl.to(
            el,
            {
              strokeDashoffset: 0,
              duration: 0.9,
              ease: 'power2.inOut',
              clearProps: 'strokeDasharray,strokeDashoffset'
            },
            idx * 0.055
          );
        } else {
          gsap.set(el, { opacity: 0 });
          bpTl.to(el, { opacity: 1, duration: 0.5, ease: 'power2.out', clearProps: 'opacity' }, idx * 0.045);
        }
      });

      if (nodes.length > 0) {
        gsap.set(nodes, { opacity: 0, y: 4 });
        bpTl.to(
          nodes,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power3.out',
            clearProps: 'opacity,transform'
          },
          0.32
        );
      }

      if (bpTl.scrollTrigger) stackTriggers.push(bpTl.scrollTrigger);
    });
  }

  /* ------------------------------------------------------------------------
     04. MANDELO-STYLE PINNED HORIZONTAL SCROLL PROJECTS SHOWCASE (GSAP)
  ------------------------------------------------------------------------ */
  const projectsSection = document.getElementById('proyectos');
  const mandeloStage = document.getElementById('mandeloStage');
  const mandeloRail = document.getElementById('mandeloRail');
  const mandeloBackdrop = document.getElementById('mandeloBackdrop');
  const mandeloRingArc = document.getElementById('mandeloRingArc');
  const mandeloRingNum = document.getElementById('mandeloRingNum');
  let allSlides = Array.from(document.querySelectorAll('.mandelo-card'));

  const RING_CIRCUMFERENCE = 2 * Math.PI * 19;
  let visibleSlides = [...allSlides];
  let mandeloScrollTl = null;
  let cachedMandeloDist = 0;
  let lastMandeloRingIdx = -1;

  if (mandeloRingArc) {
    mandeloRingArc.style.strokeDasharray = `${RING_CIRCUMFERENCE}`;
  }

  function updateMandeloRing(progress) {
    const p = Math.max(0, Math.min(1, progress));
    if (mandeloRingArc) {
      mandeloRingArc.style.strokeDashoffset = `${(RING_CIRCUMFERENCE * (1 - p)).toFixed(2)}`;
    }
    if (mandeloRingNum) {
      const total = visibleSlides.length;
      const idx = p < 0.03 ? 0 : Math.min(total, Math.max(1, Math.ceil(p * total)));
      if (idx !== lastMandeloRingIdx) {
        lastMandeloRingIdx = idx;
        mandeloRingNum.textContent = String(idx);
      }
    }
  }

  function initMandeloHorizontalScroll() {
    if (mandeloScrollTl) {
      mandeloScrollTl.scrollTrigger?.kill();
      mandeloScrollTl.kill();
      mandeloScrollTl = null;
    }

    if (!projectsSection || !mandeloStage || !mandeloRail) return;

    const syncRunwayHeight = () => {
      cachedMandeloDist = Math.max(0, mandeloRail.scrollWidth - window.innerWidth);
      const runway = window.innerHeight + Math.max(window.innerHeight * 1.15, cachedMandeloDist * 1.1);
      projectsSection.style.height = `${Math.round(runway)}px`;
    };

    syncRunwayHeight();
    lastMandeloRingIdx = -1;
    gsap.set(mandeloRail, { x: 0 });
    if (mandeloBackdrop) gsap.set(mandeloBackdrop, { opacity: 1, scale: 1 });
    updateMandeloRing(0);

    if (!hasGSAP || visibleSlides.length === 0) return;

    mandeloScrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onRefreshInit: syncRunwayHeight,
        onUpdate: (self) => {
          updateMandeloRing(self.progress);
        }
      }
    });

    mandeloScrollTl.to(
      mandeloRail,
      {
        x: () => -cachedMandeloDist,
        ease: 'none'
      },
      0
    );

    if (mandeloBackdrop) {
      mandeloScrollTl.to(
        mandeloBackdrop,
        {
          opacity: 0.16,
          scale: 0.93,
          duration: 0.24,
          ease: 'power2.out'
        },
        0.03
      );
    }
  }

  if (mandeloRail) {
    mandeloRail.addEventListener('click', (e) => {
      const card = e.target.closest('.mandelo-card');
      if (card?.dataset.projectId) {
        openCaseModal(card.dataset.projectId);
      }
    });
    mandeloRail.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.mandelo-card');
        if (card?.dataset.projectId) {
          e.preventDefault();
          openCaseModal(card.dataset.projectId);
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     04.5 KINETIC "ABEL ACOSTA" ELASTIC LETTER-STRETCH (5 WEB + 5 BRANDING)
  ------------------------------------------------------------------------ */
  const kineticItems = [
    {
      letter: 'A',
      category: 'web',
      image: 'assets/projects/shift.jpg',
      caseId: 'shift',
      es: { title: 'Shift Landing', tag: 'AI Workspace · Live Demo' },
      en: { title: 'Shift Landing', tag: 'AI Workspace · Live Demo' }
    },
    {
      letter: 'B',
      category: 'branding',
      image: 'assets/projects/logos-marks.jpg',
      caseId: 'logos-marks',
      es: { title: 'Logos & Marks', tag: 'Logofolio · Branding' },
      en: { title: 'Logos & Marks', tag: 'Logofolio · Branding' }
    },
    {
      letter: 'E',
      category: 'web',
      image: 'assets/projects/alma-de-mar.jpg',
      caseId: 'alma-de-mar',
      es: { title: 'Alma de Mar', tag: 'Web · Luxury Nautical' },
      en: { title: 'Alma de Mar', tag: 'Web · Luxury Nautical' }
    },
    {
      letter: 'L',
      category: 'web',
      image: 'assets/projects/vantage.jpg',
      caseId: 'vantage',
      es: { title: 'Vantage Capital', tag: 'Diseño Web · Live Demo' },
      en: { title: 'Vantage Capital', tag: 'Web Design · Live Demo' }
    },
    {
      letter: 'A',
      category: 'branding',
      image: 'assets/projects/fuelit.jpg',
      caseId: 'fuelit',
      es: { title: 'Fuelit', tag: 'Branding · Identity' },
      en: { title: 'Fuelit', tag: 'Branding · Identity' }
    },
    {
      letter: 'C',
      category: 'branding',
      image: 'assets/projects/donuts-and-rolls.jpg',
      caseId: 'donuts-and-rolls',
      es: { title: 'Donuts & Rolls', tag: 'Branding · Packaging' },
      en: { title: 'Donuts & Rolls', tag: 'Branding · Packaging' }
    },
    {
      letter: 'O',
      category: 'branding',
      image: 'assets/projects/raiz.jpg',
      caseId: 'raiz',
      es: { title: 'RAÍZ', tag: 'Branding · Eco-Refugio' },
      en: { title: 'RAÍZ', tag: 'Branding · Eco-Refuge' }
    },
    {
      letter: 'S',
      category: 'branding',
      image: 'assets/projects/incandesce.jpg',
      caseId: 'incandesce',
      es: { title: 'Incandesce', tag: 'Branding · Luxury Packaging' },
      en: { title: 'Incandesce', tag: 'Branding · Luxury Packaging' }
    },
    {
      letter: 'T',
      category: 'branding',
      image: 'assets/projects/solis.jpg',
      caseId: 'solis',
      es: { title: 'SOLIS Architecture', tag: 'Branding · Arquitectura' },
      en: { title: 'SOLIS Architecture', tag: 'Branding · Architecture' }
    },
    {
      letter: 'A',
      category: 'web',
      image: 'assets/projects/stashed.jpg',
      caseId: 'stashed',
      es: { title: 'Stashed', tag: 'Fintech · Mobile App' },
      en: { title: 'Stashed', tag: 'Fintech · Mobile App' }
    }
  ];

  const kineticWord = document.getElementById('kineticWord');
  const kineticLetters = Array.from(document.querySelectorAll('.kinetic-letter'));
  const kineticPreview = document.getElementById('kineticPreview');
  const kineticPreviewImg = document.getElementById('kineticPreviewImg');
  const kineticPreviewTitle = document.getElementById('kineticPreviewTitle');
  const kineticPreviewTag = document.getElementById('kineticPreviewTag');

  const kineticState = {
    hoveredIndex: -1,
    currentFlex: kineticLetters.map(() => 1),
    targetFlex: kineticLetters.map(() => 1),
    pointerX: 0,
    pointerY: 0,
    previewX: 0,
    previewY: 0,
    previewScale: 0.9,
    targetScale: 0.9,
    rotation: 0,
    lastPointerX: 0,
    isInside: false
  };
  let kineticRafId = null;

  function wakeKinetic() {
    if (kineticRafId === null) {
      kineticRafId = requestAnimationFrame(animateKineticName);
    }
  }

  function updateKineticPreviewContent(index) {
    const item = kineticItems[index];
    if (!item) return;
    const localized = item[currentLang];
    if (kineticPreviewImg && kineticPreviewImg.getAttribute('src') !== item.image) {
      kineticPreviewImg.src = item.image;
      kineticPreviewImg.alt = localized.title;
    }
    if (kineticPreviewTitle) kineticPreviewTitle.textContent = localized.title;
    if (kineticPreviewTag) kineticPreviewTag.textContent = localized.tag;
  }

  function setKineticActive(index) {
    kineticState.hoveredIndex = index;
    const isActive = index >= 0;
    kineticWord?.classList.toggle('has-hover', isActive);

    const expandedWeight = 3.7;
    const compressedWeight = (kineticLetters.length - expandedWeight) / Math.max(1, kineticLetters.length - 1);

    kineticLetters.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === index);
      kineticState.targetFlex[i] = !isActive ? 1 : i === index ? expandedWeight : compressedWeight;
    });

    if (isActive) {
      updateKineticPreviewContent(index);
      kineticState.targetScale = 1;
      kineticPreview?.classList.add('is-visible', 'is-mobile-shown');
    } else {
      kineticState.targetScale = 0.9;
      kineticPreview?.classList.remove('is-visible');
    }
    wakeKinetic();
  }

  function animateKineticName() {
    const flexLerp = prefersReducedMotion ? 1 : 0.16;
    const posLerp = prefersReducedMotion ? 1 : 0.18;
    let stillMoving = false;

    for (let i = 0; i < kineticLetters.length; i++) {
      const diff = kineticState.targetFlex[i] - kineticState.currentFlex[i];
      if (Math.abs(diff) > 0.002) {
        kineticState.currentFlex[i] += diff * flexLerp;
        kineticLetters[i].style.flexGrow = kineticState.currentFlex[i].toFixed(4);
        stillMoving = true;
      } else if (kineticState.currentFlex[i] !== kineticState.targetFlex[i]) {
        kineticState.currentFlex[i] = kineticState.targetFlex[i];
        kineticLetters[i].style.flexGrow = kineticState.targetFlex[i].toFixed(4);
      }
    }

    if (kineticPreview && window.innerWidth > 768) {
      const dx = kineticState.pointerX - kineticState.previewX;
      const dy = kineticState.pointerY - kineticState.previewY;
      const ds = kineticState.targetScale - kineticState.previewScale;

      if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2 || Math.abs(ds) > 0.002 || Math.abs(kineticState.rotation) > 0.08) {
        kineticState.previewX += dx * posLerp;
        kineticState.previewY += dy * posLerp;
        kineticState.previewScale += ds * 0.2;
        kineticState.rotation *= 0.84;
        stillMoving = true;
      } else {
        kineticState.previewX = kineticState.pointerX;
        kineticState.previewY = kineticState.pointerY;
        kineticState.previewScale = kineticState.targetScale;
        kineticState.rotation = 0;
      }

      const halfW = (kineticPreview.offsetWidth || 260) / 2 + 16;
      const safeX = clamp(kineticState.previewX, halfW, window.innerWidth - halfW);
      const safeY = clamp(kineticState.previewY - 26, 90, window.innerHeight - 90);

      kineticPreview.style.transform = `translate3d(${safeX.toFixed(1)}px, ${safeY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${kineticState.previewScale.toFixed(3)}) rotate(${kineticState.rotation.toFixed(2)}deg)`;
    }

    if (stillMoving || kineticState.isInside) {
      kineticRafId = requestAnimationFrame(animateKineticName);
    } else {
      kineticRafId = null;
    }
  }

  if (kineticWord && kineticLetters.length > 0) {
    kineticWord.addEventListener('pointermove', (e) => {
      if (window.innerWidth <= 768) return;
      const vx = e.clientX - kineticState.lastPointerX;
      kineticState.lastPointerX = e.clientX;
      kineticState.pointerX = e.clientX;
      kineticState.pointerY = e.clientY;
      kineticState.rotation = clamp(vx * 0.3, -8, 8);

      if (!kineticState.isInside) {
        kineticState.isInside = true;
        kineticState.previewX = e.clientX;
        kineticState.previewY = e.clientY;
      }
      wakeKinetic();
    });

    kineticWord.addEventListener('pointerleave', () => {
      kineticState.isInside = false;
      setKineticActive(-1);
    });

    kineticLetters.forEach((btn, idx) => {
      btn.addEventListener('pointerenter', (e) => {
        if (window.innerWidth <= 768) return;
        if (!kineticState.isInside) {
          kineticState.pointerX = e.clientX;
          kineticState.pointerY = e.clientY;
          kineticState.previewX = e.clientX;
          kineticState.previewY = e.clientY;
          kineticState.lastPointerX = e.clientX;
          kineticState.isInside = true;
        }
        setKineticActive(idx);
      });

      btn.addEventListener('focus', () => {
        if (window.innerWidth <= 768) return;
        const rect = btn.getBoundingClientRect();
        kineticState.pointerX = rect.left + rect.width / 2;
        kineticState.pointerY = rect.top + rect.height / 2;
        kineticState.previewX = kineticState.pointerX;
        kineticState.previewY = kineticState.pointerY;
        setKineticActive(idx);
      });

      btn.addEventListener('blur', () => {
        setTimeout(() => {
          if (!kineticWord.contains(document.activeElement) && !kineticState.isInside) {
            setKineticActive(-1);
          }
        }, 20);
      });

      btn.addEventListener('click', () => {
        const item = kineticItems[idx];
        if (item?.caseId) {
          openCaseModal(item.caseId);
        } else {
          document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     05. CASE STUDY DRAWER MODAL (REAL DRIBBBLE PROJECTS · ES / EN)
  ------------------------------------------------------------------------ */
  const caseStudies = {
    shift: {
      image: 'assets/projects/shift.jpg',
      demoUrl: 'https://abeldesigns.github.io/Shift---Landing/',
      appDemoUrl: 'https://abeldesigns.github.io/Shift---Desktop-app/',
      url: 'https://www.behance.net/gallery/258802215/Shift-AI-Assistant-Product-Design-Case-Study',
      source: 'behance',
      gallery: [
        {
          src: 'assets/projects/shift-desktop.jpg',
          captionEs: 'Shift Desktop App — Today’s Triage, prioridades auto-clasificadas, Focus Mode y actividad en segundo plano',
          captionEn: 'Shift Desktop App — Today’s Triage, auto-triaged priorities, Focus Mode & autonomous background activity'
        },
        {
          src: 'assets/projects/shift-mobile.jpg',
          captionEs: 'Shift Mobile App — Flujo completo de Onboarding (01–04), Daily Brief, temporizador Focus 25:00, Activity Log y calendario',
          captionEn: 'Shift Mobile App — End-to-end Onboarding (01–04), Daily Brief, 25:00 Focus timer, Activity Log & calendar'
        }
      ],
      es: {
        tag: 'CASO 01 · LANDING + APP DESKTOP & MOBILE',
        client: 'Shift · Silent AI Workspace',
        year: 'PRODUCT & WEB DESIGN',
        title: 'Shift — Landing, Desktop & Mobile App',
        impact: 'Ecosistema Completo: Landing Web + App Desktop + App Mobile',
        challenge:
          'Diseñar el ecosistema integral de Shift —desde su landing de lanzamiento hasta la app de escritorio y la app móvil— para crear un workspace de IA silencioso que prioriza el día, sincroniza Gmail, Linear y Calendar y ejecuta acciones en un clic sin chats interminables.',
        solution:
          'Desarrollé la landing en vivo (“Execution at the speed of thought”), la Desktop App interactiva con Today’s Triage, Command Bar (⌘K) y actividad autónoma en segundo plano, y la Mobile App completa con Onboarding de 4 pasos, Daily Brief, Focus Mode y protección de calendario.',
        deliverables: ['Landing Web (Demo)', 'Desktop App (Demo)', 'Mobile App UI/UX', 'Onboarding & Core Flows', 'Design System']
      },
      en: {
        tag: 'CASE 01 · LANDING + DESKTOP & MOBILE APP',
        client: 'Shift · Silent AI Workspace',
        year: 'PRODUCT & WEB DESIGN',
        title: 'Shift — Landing, Desktop & Mobile App',
        impact: 'Full Ecosystem: Web Landing + Desktop App + Mobile App',
        challenge:
          'Design the complete Shift ecosystem—from launch landing page to the Desktop and Mobile apps—for a silent AI workspace that triages your day, syncs Gmail, Linear, and Calendar, and executes commands in one click without endless chat threads.',
        solution:
          'Crafted the live landing page (“Execution at the speed of thought”), the interactive Desktop App featuring Today’s Triage, Command Bar (⌘K), and autonomous background logs, plus the full Mobile App covering 4-step Onboarding, Daily Brief, Focus Mode, and deep-work calendar controls.',
        deliverables: ['Web Landing (Live Demo)', 'Desktop App (Live Demo)', 'Mobile App UI/UX', 'Onboarding & Core Flows', 'Design System']
      }
    },
    vantage: {
      image: 'assets/projects/vantage.jpg',
      demoUrl: 'https://abeldesigns.github.io/Vantage-capital-landing/',
      es: {
        tag: 'CASO 02 · WEB FINTECH & LIVE DEMO',
        client: 'Vantage Capital · Banca Privada y Tesorería',
        year: 'WEB & PRODUCT DESIGN',
        title: 'Vantage Capital Landing',
        impact: 'Landing Interactiva + App Móvil Multi-Divisa (Live Demo)',
        challenge:
          'Diseñar y maquetar una landing fintech de banca privada que comunique acceso global, liquidez multi-divisa y rendimientos del Tesoro sin fricción visual, guiando al usuario a solicitar acceso o probar la demo interactiva.',
        solution:
          'Construí una interfaz oscura de alto contraste con acento dorado, módulos interactivos de transferencia global y tesorería, y un sistema coherente extendido a la aplicación móvil iOS/Android e icono de marca.',
        deliverables: ['Diseño Web a Medida', 'UI/UX Fintech', 'Mobile App Concept', 'HTML/CSS/JS Demo', 'Dirección de Arte']
      },
      en: {
        tag: 'CASE 02 · FINTECH WEB & LIVE DEMO',
        client: 'Vantage Capital · Private Banking & Treasury',
        year: 'WEB & PRODUCT DESIGN',
        title: 'Vantage Capital Landing',
        impact: 'Interactive Landing + Multi-Currency Mobile App (Live Demo)',
        challenge:
          'Design and build a private-banking fintech landing page that communicates global access, multi-currency liquidity, and Treasury yields with immediate clarity while driving private access and interactive demo clicks.',
        solution:
          'Crafted a high-contrast dark interface with gold accents, interactive global transfer and treasury cards, and a cohesive visual system extending into the iOS/Android mobile experience and app icon.',
        deliverables: ['Custom Web Design', 'Fintech UI/UX', 'Mobile App Concept', 'Interactive Live Demo', 'Art Direction']
      }
    },
    'alma-de-mar': {
      image: 'assets/projects/alma-de-mar.jpg',
      url: 'https://www.behance.net/gallery/230920535/Alma-de-Mar-Luxury-Nautical-Branding-Web-Experience',
      source: 'behance',
      es: {
        tag: 'WEB & BRANDING · NÁUTICA DE LUJO',
        client: 'Alma de Mar · Costa Brava',
        year: 'BRANDING & WEB EXPERIENCE',
        title: 'Alma de Mar — Luxury Nautical Branding & Web',
        impact: 'Identidad Náutica de Lujo + Experiencia Web de Reserva',
        challenge:
          'Transmitir la exclusividad, calma y autenticidad de las travesías privadas en velero por la Costa Brava a través de una marca sofisticada y una web orientada a reservar experiencias.',
        solution:
          'Diseñé una identidad editorial elegante con isotipo de ancla minimalista, atmósfera nocturna azul Mediterráneo y una web inmersiva que presenta las rutas, al capitán y un flujo claro de «Reserva tu travesía».',
        deliverables: ['Web Experience UI/UX', 'Luxury Branding', 'Visual Identity', 'Art Direction', 'Booking Flow', 'Responsive Design']
      },
      en: {
        tag: 'WEB & BRANDING · LUXURY NAUTICAL',
        client: 'Alma de Mar · Costa Brava',
        year: 'BRANDING & WEB EXPERIENCE',
        title: 'Alma de Mar — Luxury Nautical Branding & Web',
        impact: 'Luxury Nautical Identity + Immersive Booking Web Experience',
        challenge:
          'Capture the exclusivity, serenity, and authenticity of private sailing charters along the Costa Brava through a refined brand identity and conversion-focused web experience.',
        solution:
          'Crafted an editorial luxury identity with a minimalist anchor emblem, deep Mediterranean-night visual atmosphere, and an immersive website highlighting curated voyages, the captain, and a seamless booking flow.',
        deliverables: ['Web Experience UI/UX', 'Luxury Branding', 'Visual Identity', 'Art Direction', 'Booking Flow', 'Responsive Design']
      }
    },
    'donuts-and-rolls': {
      image: 'assets/projects/donuts-and-rolls.jpg',
      url: 'https://www.behance.net/gallery/258524773/Donuts-and-Rolls-Visual-Identity',
      source: 'behance',
      es: {
        tag: 'BRANDING · IDENTIDAD & PACKAGING',
        client: 'Donuts & Rolls · Repostería Artesanal',
        year: 'VISUAL IDENTITY',
        title: 'Donuts & Rolls — Visual Identity',
        impact: 'Identidad Retro Ilustrada + Sistema de Packaging Memorables',
        challenge:
          'Crear una identidad visual cálida, divertida y altamente fotogénica para una marca de donas y rolls artesanales que destaque en empaque, punto de venta y redes sociales.',
        solution:
          'Desarrollé una mascota ilustrada con vibra retro sobre patines, tipografía display redondeada y un sistema de packaging en tonos crema y coral con patrones de cuadros aplicado a cajas, vasos, posavasos y stickers coleccionables.',
        deliverables: ['Visual Identity', 'Packaging Design', 'Mascot Illustration', 'Typography & Color', 'Stickers & Merch', 'Art Direction']
      },
      en: {
        tag: 'BRANDING · VISUAL IDENTITY & PACKAGING',
        client: 'Donuts & Rolls · Artisan Bakery',
        year: 'VISUAL IDENTITY',
        title: 'Donuts & Rolls — Visual Identity',
        impact: 'Playful Retro Mascot + Tactile Packaging System',
        challenge:
          'Craft a warm, joyful, and highly shareable visual identity for an artisan donut and bakery brand built to stand out across packaging, storefront, and social touchpoints.',
        solution:
          'Designed a retro roller-skating mascot paired with bubbly display typography and a cream-and-coral checkered packaging system spanning bakery boxes, takeaway cups, coasters, and collectible stickers.',
        deliverables: ['Visual Identity', 'Packaging Design', 'Mascot Illustration', 'Typography & Color', 'Stickers & Merch', 'Art Direction']
      }
    },
    raiz: {
      image: 'assets/projects/raiz.jpg',
      url: 'https://dribbble.com/shots/27533700-RA-Z-Boutique-Hotel-Eco-Refuge-Brand-Identity',
      es: {
        tag: 'CASO 05 · HOSPITALIDAD & ECO-REFUGIO',
        client: 'RAÍZ · Hotel Boutique & Refugio Ecológico',
        year: 'DRIBBBLE PORTFOLIO',
        title: 'RAÍZ — Boutique Hotel & Eco-Refuge',
        impact: 'Identidad Orgánica + Experiencia Táctil de Lujo',
        challenge:
          'Traducir la calma arquitectónica de un refugio ecológico en piedra y naturaleza en una identidad hotelera sobria, memorable y coherente en cada punto de contacto.',
        solution:
          'Desarrollé un isotipo orgánico inspirado en raíces, una paleta mineral cálida y aplicaciones editoriales para menús, amenities, papelería y señalética del huésped.',
        deliverables: ['Hospitality Branding', 'Editorial Design', 'Packaging & Amenities', 'Visual Identity', 'Art Direction']
      },
      en: {
        tag: 'CASE 05 · HOSPITALITY & ECO-REFUGE',
        client: 'RAÍZ · Boutique Hotel & Eco-Refuge',
        year: 'DRIBBBLE PORTFOLIO',
        title: 'RAÍZ — Boutique Hotel & Eco-Refuge',
        impact: 'Organic Identity + Tactile Luxury Guest Experience',
        challenge:
          'Translate the architectural stillness of a stone-and-nature eco-refuge into a refined hospitality brand felt across every physical touchpoint.',
        solution:
          'Crafted a root-inspired organic mark, warm mineral palette, and editorial collateral spanning menus, in-room amenities, textiles, and wayfinding.',
        deliverables: ['Hospitality Branding', 'Editorial Design', 'Packaging & Amenities', 'Visual Identity', 'Art Direction']
      }
    },
    solis: {
      image: 'assets/projects/solis.jpg',
      url: 'https://dribbble.com/shots/27500470-SOLIS-Architecture',
      es: {
        tag: 'CASO 06 · ARQUITECTURA',
        client: 'SOLIS Architecture',
        year: 'DRIBBBLE PORTFOLIO',
        title: 'SOLIS Architecture',
        impact: 'Sistema Geométrico + Identidad Editorial Contemporánea',
        challenge:
          'Crear una identidad atemporal para un estudio de arquitectura que acompañe sus obras sin competir con la fotografía espacial.',
        solution:
          'Establecí una retícula sobria, proporciones arquitectónicas exactas y un sistema de marca versátil para portafolios, planos y presencia digital.',
        deliverables: ['Brand Identity', 'Grid Systems', 'Editorial Collateral', 'Visual Direction']
      },
      en: {
        tag: 'CASE 06 · ARCHITECTURE',
        client: 'SOLIS Architecture',
        year: 'DRIBBBLE PORTFOLIO',
        title: 'SOLIS Architecture',
        impact: 'Geometric System + Contemporary Editorial Identity',
        challenge:
          'Create a timeless architectural studio identity that elevates spatial photography without ever competing with the built work.',
        solution:
          'Established a disciplined Swiss grid, architectural proportions, and a versatile visual identity spanning print portfolios, drawings, and digital media.',
        deliverables: ['Brand Identity', 'Grid Systems', 'Editorial Collateral', 'Visual Direction']
      }
    },
    'logos-marks': {
      image: 'assets/projects/logos-marks.jpg',
      url: 'https://www.behance.net/gallery/244801521/Logos-Marks-Collection-',
      source: 'behance',
      es: {
        tag: 'BRANDING · LOGOFOLIO VOL. 1',
        client: 'Colección Curada · Marcas & Símbolos',
        year: 'LOGOFOLIO VOL. 1',
        title: 'Logos & Marks Collection',
        impact: 'Selección de Logotipos, Monogramas & Símbolos Geométricos',
        challenge:
          'Reunir en una curaduría cohesiva una selección de marcas, símbolos e identidades desarrolladas para distintas industrias, demostrando síntesis conceptual y precisión geométrica.',
        solution:
          'Compilé Logofolio Vol. 1 bajo una dirección editorial oscura y minimalista que destaca la construcción reticular, la escalabilidad en micro-tamaños y el carácter propio de cada símbolo.',
        deliverables: ['Logo Design', 'Brand Marks', 'Monogramas', 'Sistemas Geométricos', 'Tipografía de Marca', 'Logofolio Editorial']
      },
      en: {
        tag: 'BRANDING · LOGOFOLIO VOL. 1',
        client: 'Curated Selection · Brands & Symbols',
        year: 'LOGOFOLIO VOL. 1',
        title: 'Logos & Marks Collection',
        impact: 'Curated Selection of Logos, Monograms & Geometric Marks',
        challenge:
          'Bring together a cohesive curation of logos, symbols, and brand marks crafted across diverse industries—highlighting conceptual clarity and geometric rigor.',
        solution:
          'Presented Logofolio Vol. 1 in a sleek dark editorial direction emphasizing grid construction, legibility at any scale, and distinctive personality across every mark.',
        deliverables: ['Logo Design', 'Brand Marks', 'Monograms', 'Geometric Grids', 'Brand Typography', 'Editorial Logofolio']
      }
    },
    level7: {
      image: 'assets/projects/level7.jpg',
      url: 'https://dribbble.com/shots/27513775-Level-7-Agency-Brand-Identity-Visual-System',
      es: {
        tag: 'ARCHIVO · AGENCIA CREATIVA',
        client: 'Level 7 Agency',
        year: 'DRIBBBLE PORTFOLIO',
        title: 'Level 7 Agency — Visual System',
        impact: 'Sistema Modular de Marca para Agencia',
        challenge:
          'Dotar a una agencia digital de una identidad adaptable que proyecte innovación estratégica y coherencia en presentaciones y activos digitales.',
        solution:
          'Desarrollé un sistema visual modular con tipografía contundente, reglas de grilla claras y aplicaciones digitales de alto contraste.',
        deliverables: ['Agency Branding', 'Visual System', 'Digital Assets', 'Brand Book']
      },
      en: {
        tag: 'ARCHIVE · CREATIVE AGENCY',
        client: 'Level 7 Agency',
        year: 'DRIBBBLE PORTFOLIO',
        title: 'Level 7 Agency — Visual System',
        impact: 'Modular Brand System for Digital Agency',
        challenge:
          'Equip a modern digital agency with an adaptable visual identity projecting strategic clarity across decks, web, and campaigns.',
        solution:
          'Built a modular identity system powered by bold typography, crisp grid rules, and high-contrast digital brand assets.',
        deliverables: ['Agency Branding', 'Visual System', 'Digital Assets', 'Brand Book']
      }
    },
    gummy: {
      image: 'assets/projects/gummy.jpg',
      url: 'https://dribbble.com/shots/27585728-GUMMY-Brand-Identity',
      es: {
        tag: 'ARCHIVO · BRAND IDENTITY',
        client: 'GUMMY',
        year: 'DRIBBBLE PORTFOLIO',
        title: 'GUMMY — Brand Identity',
        impact: 'Identidad Lúdica + Sistema Visual Expresivo',
        challenge:
          'Crear una marca fresca, memorable y fotogénica capaz de conectar instantáneamente con audiencias digitales modernas.',
        solution:
          'Combiné tipografía con carácter, color saturado estratégico y aplicaciones de empaque con enfoque editorial contemporáneo.',
        deliverables: ['Brand Identity', 'Packaging Design', 'Art Direction', 'Visual Language']
      },
      en: {
        tag: 'ARCHIVE · BRAND IDENTITY',
        client: 'GUMMY',
        year: 'DRIBBBLE PORTFOLIO',
        title: 'GUMMY — Brand Identity',
        impact: 'Playful Identity + Expressive Visual System',
        challenge:
          'Craft a fresh, memorable, highly shareable brand built to connect immediately with modern digital audiences.',
        solution:
          'Paired characterful display typography with bold color blocking and contemporary packaging art direction.',
        deliverables: ['Brand Identity', 'Packaging Design', 'Art Direction', 'Visual Language']
      }
    },
    entierra: {
      image: 'assets/projects/entierra.jpg',
      url: 'https://dribbble.com/shots/27539960-Entierra-Ancestral-Mezcal-Branding',
      es: {
        tag: 'ARCHIVO · SPIRITS & PACKAGING',
        client: 'Entierra · Ancestral Mezcal',
        year: 'DRIBBBLE PORTFOLIO',
        title: 'Entierra — Ancestral Mezcal Branding',
        impact: 'Narrativa Artesanal + Branding de Lujo',
        challenge:
          'Honrar la herencia artesanal del mezcal ancestral mediante una identidad contemporánea con fuerte valor percibido en mercado premium.',
        solution:
          'Diseñé un sistema de marca terroso y editorial con etiquetas táctiles, tipografía atemporal y narrativa visual centrada en el origen.',
        deliverables: ['Spirits Branding', 'Label & Packaging', 'Art Direction', 'Storytelling Visual']
      },
      en: {
        tag: 'ARCHIVE · SPIRITS & PACKAGING',
        client: 'Entierra · Ancestral Mezcal',
        year: 'DRIBBBLE PORTFOLIO',
        title: 'Entierra — Ancestral Mezcal Branding',
        impact: 'Artisanal Heritage + Luxury Spirits Branding',
        challenge:
          'Honor the artisanal heritage of ancestral mezcal through a contemporary identity commanding premium shelf presence.',
        solution:
          'Crafted an earthy editorial brand system with tactile label design, timeless typography, and origin-driven visual storytelling.',
        deliverables: ['Spirits Branding', 'Label & Packaging', 'Art Direction', 'Visual Storytelling']
      }
    },
    fuelit: {
      image: 'assets/projects/fuelit.jpg',
      url: 'https://www.behance.net/gallery/248530269/Fuelit-Brand-Identity',
      source: 'behance',
      es: {
        tag: 'BRANDING · IDENTIDAD DE MARCA',
        client: 'Fuelit · Energía & Movilidad',
        year: 'BRAND IDENTITY',
        title: 'Fuelit — Brand Identity',
        impact: 'Sistema de Identidad Visual de Alto Contraste & Dirección de Arte',
        challenge:
          'Construir una identidad de marca audaz y contemporánea para el sector de combustible y movilidad capaz de romper con la estética tradicional de las estaciones de servicio y proyectar velocidad, energía y eficiencia.',
        solution:
          'Diseñé un monograma geométrico “F” con dinamismo diagonal, un logotipo limpio de alto impacto y un sistema cromático nocturno verde neón sobre petróleo profundo, adaptable a señalética, aplicaciones digitales y dirección fotográfica.',
        deliverables: ['Brand Identity', 'Logo & Monograma', 'Sistema Visual', 'Dirección de Arte', 'Paleta & Tipografía', 'Aplicaciones de Marca']
      },
      en: {
        tag: 'BRANDING · BRAND IDENTITY',
        client: 'Fuelit · Energy & Mobility',
        year: 'BRAND IDENTITY',
        title: 'Fuelit — Brand Identity',
        impact: 'High-Contrast Visual Identity System & Art Direction',
        challenge:
          'Build a bold, contemporary brand identity for the fuel and mobility sector that breaks away from conventional service-station aesthetics while communicating speed, energy, and modern efficiency.',
        solution:
          'Crafted a forward-leaning geometric “F” monogram, clean high-impact wordmark, and deep-petrol + neon-lime visual system designed to scale seamlessly across signage, digital touchpoints, and editorial photography.',
        deliverables: ['Brand Identity', 'Logo & Monogram', 'Visual System', 'Art Direction', 'Color & Typography', 'Brand Applications']
      }
    },
    incandesce: {
      image: 'assets/projects/incandesce.jpg',
      url: 'https://www.behance.net/gallery/258407261/Incandesce-Luxury-Candle-Brand-Identity-Packaging',
      source: 'behance',
      es: {
        tag: 'BRANDING · IDENTIDAD & PACKAGING DE LUJO',
        client: 'Incandesce · Velas Aromáticas de Lujo',
        year: 'BRAND IDENTITY & PACKAGING',
        title: 'Incandesce — Luxury Candle Brand Identity',
        impact: '“The sensory state of light.” · Branding Sensorial & Empaque Táctil',
        challenge:
          'Posicionar una marca de velas artesanales en el segmento de lujo sensorial, transmitiendo calidez, introspección y refinamiento desde el primer contacto visual y táctil.',
        solution:
          'Creé un logotipo editorial con serif refinada donde el punto de la «I» cobra vida en forma de llama, acompañado de una paleta borgoña profunda, papel algodón crema y estuches rígidos deslizables pensados para una experiencia de unboxing inolvidable.',
        deliverables: ['Luxury Brand Identity', 'Packaging Design', 'Custom Wordmark', 'Materialidad & Acabados', 'Art Direction', 'Brand Guidelines']
      },
      en: {
        tag: 'BRANDING · LUXURY IDENTITY & PACKAGING',
        client: 'Incandesce · Luxury Scented Candles',
        year: 'BRAND IDENTITY & PACKAGING',
        title: 'Incandesce — Luxury Candle Brand Identity',
        impact: '“The sensory state of light.” · Sensory Branding & Tactile Packaging',
        challenge:
          'Position an artisanal candle brand within the sensory luxury segment—conveying warmth, stillness, and refined craftsmanship from the very first visual and tactile impression.',
        solution:
          'Crafted an editorial serif wordmark where the tittle of the “I” transforms into a delicate candle flame, paired with deep plum tinted glass, warm cotton-stock labels, and matte rigid drawer boxes engineered for an elevated unboxing ritual.',
        deliverables: ['Luxury Brand Identity', 'Packaging Design', 'Custom Wordmark', 'Materiality & Finishes', 'Art Direction', 'Brand Guidelines']
      }
    },
    stashed: {
      image: 'assets/projects/stashed.jpg',
      url: 'https://www.behance.net/gallery/258595007/Stashed-Micro-Savings-Fintech-App',
      source: 'behance',
      es: {
        tag: 'PRODUCT DESIGN · FINTECH MOBILE APP',
        client: 'Stashed · Micro-Savings Fintech',
        year: 'UI/UX & MOBILE PRODUCT',
        title: 'Stashed — Micro-Savings Fintech App',
        impact: 'App Móvil de Micro-Ahorro · Billetera Inteligente & Control de Tarjetas',
        challenge:
          'Simplificar el hábito del micro-ahorro diario para usuarios jóvenes mediante una experiencia financiera luminosa, clara y libre de fricción técnica o jerga bancaria.',
        solution:
          'Diseñé una aplicación móvil limpia en azul cobalto y blanco con seguimiento visual de balance en tiempo real, gestión instantánea de tarjetas (detalles, congelar, límites mensuales) y componentes iOS escalables.',
        deliverables: ['Mobile App UI/UX', 'Fintech Product Design', 'Design System iOS', 'Wallet & Cards Flow', 'Data Visualization', 'Prototipado Interactivo']
      },
      en: {
        tag: 'PRODUCT DESIGN · FINTECH MOBILE APP',
        client: 'Stashed · Micro-Savings Fintech',
        year: 'UI/UX & MOBILE PRODUCT',
        title: 'Stashed — Micro-Savings Fintech App',
        impact: 'Micro-Savings Mobile App · Smart Wallet & Instant Card Controls',
        challenge:
          'Make everyday micro-saving effortless and intuitive for mobile-first users through a bright, trustworthy financial experience free of banking friction.',
        solution:
          'Designed a crisp cobalt-blue and white mobile app featuring real-time savings curves, instant card controls (details, freeze, monthly limits), smart notifications, and a modular iOS component system.',
        deliverables: ['Mobile App UI/UX', 'Fintech Product Design', 'iOS Design System', 'Wallet & Cards Flow', 'Data Visualization', 'Interactive Prototyping']
      }
    }
  };

  const caseModal = document.getElementById('caseModal');
  const caseModalPanel = document.getElementById('caseModalPanel');
  const caseModalTag = document.getElementById('caseModalTag');
  const caseModalImg = document.getElementById('caseModalImg');
  const caseModalClient = document.getElementById('caseModalClient');
  const caseModalYear = document.getElementById('caseModalYear');
  const caseModalTitle = document.getElementById('caseModalTitle');
  const caseModalImpact = document.getElementById('caseModalImpact');
  const caseModalChallenge = document.getElementById('caseModalChallenge');
  const caseModalSolution = document.getElementById('caseModalSolution');
  const caseModalPills = document.getElementById('caseModalPills');
  const caseModalDemoLink = document.getElementById('caseModalDemoLink');
  const caseModalAppDemoLink = document.getElementById('caseModalAppDemoLink');
  const caseTopDemoBtn = document.getElementById('caseTopDemoBtn');
  const caseModalExternalLink = document.getElementById('caseModalExternalLink');
  const caseModalGalleryWrap = document.getElementById('caseModalGalleryWrap');
  const caseModalGallery = document.getElementById('caseModalGallery');
  const caseNextBtn = document.getElementById('caseNextBtn');
  const caseNextTitle = document.getElementById('caseNextTitle');

  let projectOrder = allSlides.map((s) => s.dataset.projectId).filter((id) => Boolean(caseStudies[id]));
  let activeCaseId = null;
  let nextCaseId = null;

  function renderCaseModal(id) {
    const entry = caseStudies[id];
    if (!entry) return;
    const data = entry[currentLang];

    caseModalTag.textContent = data.tag;
    caseModalImg.src = entry.image;
    caseModalImg.alt = data.title;
    caseModalClient.textContent = data.client;
    caseModalYear.textContent = data.year;
    caseModalTitle.textContent = data.title;
    caseModalImpact.textContent = data.impact;
    caseModalChallenge.textContent = data.challenge;
    caseModalSolution.textContent = data.solution;

    // Live Demo button(s) (header + hero)
    const hasDemo = Boolean(entry.demoUrl);
    const hasAppDemo = Boolean(entry.appDemoUrl);
    if (caseModalDemoLink) {
      caseModalDemoLink.classList.toggle('is-hidden', !hasDemo);
      if (hasDemo) {
        caseModalDemoLink.href = entry.demoUrl;
        const demoSpan = caseModalDemoLink.querySelector('span');
        if (demoSpan) {
          const demoKey = hasAppDemo ? 'modal.landingDemoCta' : 'modal.demoCta';
          demoSpan.textContent = translations[currentLang].text[demoKey];
        }
      }
    }
    if (caseModalAppDemoLink) {
      caseModalAppDemoLink.classList.toggle('is-hidden', !hasAppDemo);
      if (hasAppDemo) {
        caseModalAppDemoLink.href = entry.appDemoUrl;
        const appSpan = caseModalAppDemoLink.querySelector('span');
        if (appSpan) {
          appSpan.textContent = translations[currentLang].text['modal.appDemoCta'];
        }
      }
    }
    if (caseTopDemoBtn) {
      caseTopDemoBtn.classList.toggle('is-hidden', !hasDemo);
      if (hasDemo) caseTopDemoBtn.href = entry.demoUrl;
    }

    // External Dribbble / Behance link (hidden if project is local/unpublished)
    const hasExternal = Boolean(entry.url);
    if (caseModalExternalLink) {
      caseModalExternalLink.classList.toggle('is-hidden', !hasExternal);
      if (hasExternal) {
        caseModalExternalLink.href = entry.url;
        caseModalExternalLink.classList.toggle('btn--ghost', hasDemo);
        caseModalExternalLink.classList.toggle('btn--primary', !hasDemo);
        const ctaSpan = caseModalExternalLink.querySelector('span');
        if (ctaSpan) {
          const key = entry.source === 'behance' ? 'modal.behanceCta' : 'modal.dribbbleCta';
          ctaSpan.textContent = translations[currentLang].text[key];
        }
      }
    }

    // Deliverables pills
    caseModalPills.textContent = '';
    data.deliverables.forEach((item) => {
      const span = document.createElement('span');
      span.textContent = item;
      caseModalPills.appendChild(span);
    });

    // Multi-image project detail gallery
    const galleryItems = Array.isArray(entry.gallery) ? entry.gallery : [];
    if (caseModalGalleryWrap && caseModalGallery) {
      caseModalGallery.textContent = '';
      caseModalGalleryWrap.classList.toggle('is-hidden', galleryItems.length === 0);
      galleryItems.forEach((item) => {
        const fig = document.createElement('figure');
        fig.className = 'case-detail__figure';
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = (currentLang === 'en' ? item.captionEn : item.captionEs) || data.title;
        img.loading = 'lazy';
        img.decoding = 'async';
        fig.appendChild(img);
        const capText = currentLang === 'en' ? item.captionEn : item.captionEs;
        if (capText) {
          const cap = document.createElement('figcaption');
          cap.textContent = capText;
          fig.appendChild(cap);
        }
        caseModalGallery.appendChild(fig);
      });
    }

    // Next project navigation
    const order = projectOrder.length > 0 ? projectOrder : Object.keys(caseStudies);
    const curIdx = order.indexOf(id);
    nextCaseId = order[(curIdx + 1) % order.length];
    if (caseNextTitle && nextCaseId && caseStudies[nextCaseId]) {
      caseNextTitle.textContent = caseStudies[nextCaseId][currentLang].title;
    }
  }

  function openCaseModal(id, updateHash = true) {
    if (!caseStudies[id] || !caseModal) return;
    activeCaseId = id;
    renderCaseModal(id);
    if (caseModalPanel) caseModalPanel.scrollTop = 0;
    caseModal.classList.add('is-open');
    caseModal.setAttribute('aria-hidden', 'false');
    lockPageScroll(true);

    if (updateHash && window.location.hash !== `#proyecto/${id}`) {
      history.pushState({ projectId: id }, '', `#proyecto/${id}`);
    }

    if (hasGSAP && !prefersReducedMotion) {
      gsap.fromTo(
        '.case-detail__header, .case-modal__img-wrap, .case-detail__narrative, .case-detail__gallery-wrap',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, delay: 0.06, ease: 'power3.out', overwrite: true, clearProps: 'transform' }
      );
    }
  }

  function closeCaseModal(updateHash = true) {
    if (!caseModal || !activeCaseId) return;
    activeCaseId = null;
    caseModal.classList.remove('is-open');
    caseModal.setAttribute('aria-hidden', 'true');
    lockPageScroll(Boolean(navShell?.classList.contains('is-open')));
    if (updateHash && window.location.hash.startsWith('#proyecto/')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  caseNextBtn?.addEventListener('click', () => {
    if (nextCaseId) openCaseModal(nextCaseId);
  });

  window.addEventListener('popstate', () => {
    const match = window.location.hash.match(/^#proyecto\/([a-z0-9-]+)$/i);
    if (match && caseStudies[match[1]]) {
      openCaseModal(match[1], false);
    } else if (activeCaseId) {
      closeCaseModal(false);
    }
  });

  document.querySelectorAll('[data-open-case]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openCaseModal(btn.dataset.openCase);
    });
  });

  document.querySelectorAll('[data-close-case]').forEach((el) => {
    el.addEventListener('click', () => {
      closeCaseModal(true);
      const href = el.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target && lenis) {
          requestAnimationFrame(() => lenis.scrollTo(target, { offset: -72, duration: 1.0 }));
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     06. GLOBAL DISCIPLINE TRACK (ALL / WEB / BRANDING) & LANGUAGE (ES / EN)
  ------------------------------------------------------------------------ */
  const trackButtons = document.querySelectorAll('[data-set-track]');
  const heroKickerPill = document.getElementById('heroKickerPill');
  const heroT1a = document.getElementById('heroT1a');
  const heroT1b = document.getElementById('heroT1b');
  const heroT2a = document.getElementById('heroT2a');
  const heroT2b = document.getElementById('heroT2b');
  const heroT3 = document.getElementById('heroT3');
  const heroWorkPillImg = document.getElementById('heroWorkPillImg');

  let currentTrack = 'all';

  function renderHeroTrackCopy(animate = false) {
    const copy = translations[currentLang].heroTracks[currentTrack] || translations[currentLang].heroTracks.all;
    if (heroKickerPill) heroKickerPill.textContent = copy.pill;
    if (heroT1a) heroT1a.textContent = copy.t1a;
    if (heroT1b) heroT1b.textContent = copy.t1b;
    if (heroT2a) heroT2a.textContent = copy.t2a;
    if (heroT2b) heroT2b.textContent = copy.t2b;
    if (heroT3) heroT3.textContent = copy.t3;
    if (heroWorkPillImg && copy.workImg) {
      heroWorkPillImg.src = copy.workImg;
      heroWorkPillImg.alt = copy.workAlt || '';
    }

    if (animate && hasGSAP && !prefersReducedMotion) {
      gsap.fromTo(
        '.hero-line-inner',
        { yPercent: 28, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.44, stagger: 0.055, ease: 'power3.out', overwrite: true, clearProps: 'transform' }
      );
      if (heroKickerPill) {
        gsap.fromTo(heroKickerPill, { y: 6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.34, ease: 'power3.out', overwrite: true, clearProps: 'transform' });
      }
      if (heroWorkPillImg) {
        gsap.fromTo(heroWorkPillImg, { scale: 1.14 }, { scale: 1, duration: 0.65, ease: 'expo.out', overwrite: true, clearProps: 'transform' });
      }
    }
  }

  function applyTrack(trackName, animate = false, scrollToProjects = false) {
    const safeTrack = trackName === 'web' || trackName === 'branding' ? trackName : 'all';
    currentTrack = safeTrack;

    // 1. Sync all track switchers (Menu Drawer & Projects Showcase)
    trackButtons.forEach((btn) => {
      const active = btn.dataset.setTrack === safeTrack;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    // 2. Update Hero copy & preview pill for active discipline
    renderHeroTrackCopy(animate);

    // 3. Filter Mandelo Horizontal Projects without shifting height above #proyectos
    visibleSlides = [];
    allSlides.forEach((slide) => {
      const match = safeTrack === 'all' || slide.dataset.category === safeTrack;
      slide.classList.toggle('is-hidden', !match);
      if (match) visibleSlides.push(slide);
    });

    // Force synchronous width measurement after visibility toggle before rebuilding ScrollTrigger
    if (mandeloRail) {
      void mandeloRail.offsetWidth;
    }
    initMandeloHorizontalScroll();

    if (animate && hasGSAP && visibleSlides.length > 0) {
      gsap.fromTo(
        visibleSlides,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.36,
          stagger: 0.04,
          ease: 'power2.out',
          clearProps: 'opacity'
        }
      );
    }

    // 4. Highlight matching letters in Kinetic ABEL ACOSTA showcase
    kineticLetters.forEach((btn, idx) => {
      const item = kineticItems[idx];
      const match = safeTrack === 'all' || item?.category === safeTrack;
      btn.classList.toggle('is-dimmed', !match);
    });

    if (hasGSAP) {
      ScrollTrigger.refresh();
    }

    // Keep user cleanly anchored at start of #proyectos when switching filters
    if (scrollToProjects && projectsSection) {
      if (lenis) {
        lenis.scrollTo(projectsSection, { offset: 0, duration: 0.55 });
      } else {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  trackButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const chosen = btn.dataset.setTrack;
      const fromMenu = Boolean(btn.closest('#navDrawer'));
      const fromProjects = Boolean(btn.closest('.mandelo-topbar'));
      if (fromMenu) setMenuOpen(false);
      applyTrack(chosen, true, fromMenu || fromProjects);
    });
  });

  const langButtons = document.querySelectorAll('[data-set-lang]');
  const heroWaBtn = document.getElementById('heroWaBtn');
  const footerWaBtn = document.getElementById('footerWaBtn');

  function applyLanguage(lang) {
    const safeLang = lang === 'en' ? 'en' : 'es';
    currentLang = safeLang;
    localStorage.setItem('abel_lang', safeLang);

    const dict = translations[safeLang];
    document.documentElement.lang = safeLang;
    document.title = dict.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', dict.metaDesc);

    langButtons.forEach((btn) => {
      const isCurrent = btn.dataset.setLang === safeLang;
      btn.classList.toggle('is-active', isCurrent);
      btn.setAttribute('aria-pressed', String(isCurrent));
    });

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (dict.text[key] !== undefined) {
        el.textContent = dict.text[key];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.dataset.i18nHtml;
      if (dict.html[key] !== undefined) {
        el.innerHTML = dict.html[key];
      }
    });

    renderHeroTrackCopy();

    if (heroWaBtn) heroWaBtn.href = dict.waHero;
    if (footerWaBtn) footerWaBtn.href = dict.waFooter;

    updateNavLabel();
    buildManifesto(safeLang);
    if (hasGSAP) ScrollTrigger.refresh();

    if (activeCaseId) {
      renderCaseModal(activeCaseId);
    }

    if (kineticState.hoveredIndex >= 0) {
      updateKineticPreviewContent(kineticState.hoveredIndex);
    }
  }

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.setLang);
    });
  });

  /* ------------------------------------------------------------------------
     07. COPY EMAIL TOAST, SCROLL REVEALS & GLOBAL KEYS
  ------------------------------------------------------------------------ */
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 2600);
  }

  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.copyEmail;
      const prefix = translations[currentLang].toastCopied;
      try {
        await navigator.clipboard.writeText(email);
        showToast(`${prefix} (${email})`);
      } catch {
        const area = document.createElement('textarea');
        area.value = email;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(area);
        if (copied) {
          showToast(`${prefix} (${email})`);
        } else {
          window.location.href = `mailto:${email}`;
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     08. GSAP SCROLLTRIGGER SECTION REVEALS (EXPERIENCE, KINETIC NAME, FOOTER)
  ------------------------------------------------------------------------ */
  function initSectionScrollTriggers() {
    if (!hasGSAP || prefersReducedMotion) return;

    // Services 3-column editorial cards cascade
    gsap.from('.service-col', {
      y: 34,
      opacity: 0,
      duration: 0.72,
      stagger: 0.1,
      ease: 'expo.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: '.services__grid',
        start: 'top 82%',
        once: true
      }
    });

    // Experience rows cascade
    gsap.from('.exp-row', {
      y: 24,
      opacity: 0,
      duration: 0.55,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.exp-list',
        start: 'top 82%',
        once: true
      }
    });

    // Kinetic ABEL ACOSTA giant letters wave reveal
    gsap.from('.kinetic-letter', {
      yPercent: 28,
      opacity: 0,
      duration: 0.72,
      stagger: 0.032,
      ease: 'power4.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: '#kineticWord',
        start: 'top 85%',
        once: true
      }
    });

    // Contact footer finale
    gsap.from('.contact__headline, .contact__reassurance, .contact__actions', {
      y: 26,
      opacity: 0,
      duration: 0.65,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
        once: true
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const adminOverlay = document.getElementById('adminOverlay');
      if (adminOverlay && adminOverlay.classList.contains('is-open')) return;
      setMenuOpen(false);
      closeCaseModal();
    }
  });

  /* ------------------------------------------------------------------------
     09. DYNAMIC PROJECTS RENDERER & LIVE SYNC API (data/projects.json + Admin)
  ------------------------------------------------------------------------ */
  const CARD_TILTS = [2.4, -2.2, 1.9, -2.5, 2.1, -1.8, 2.3, -2.1, 1.8, -2.4, 2.0, -1.9];

  function createMandeloCardEl(p, idx) {
    const tilt = CARD_TILTS[idx % CARD_TILTS.length];
    const article = document.createElement('article');
    article.className = 'mandelo-card';
    article.style.setProperty('--tilt', `${tilt}deg`);
    article.dataset.projectId = p.id;
    article.dataset.category = p.category === 'branding' ? 'branding' : 'web';
    article.tabIndex = 0;
    article.setAttribute('role', 'button');
    article.setAttribute('aria-label', `${p.cardTitle || p.es?.title || p.id} — Ver detalle del proyecto`);

    const img = document.createElement('img');
    img.className = 'mandelo-card__img';
    img.src = p.image || '';
    img.alt = p.es?.title || p.cardTitle || p.id;
    img.draggable = false;
    img.loading = 'lazy';
    img.decoding = 'async';

    const scrim = document.createElement('div');
    scrim.className = 'mandelo-card__scrim';
    scrim.setAttribute('aria-hidden', 'true');

    const tagsEl = document.createElement('div');
    tagsEl.className = 'mandelo-card__tags';
    const tags = Array.isArray(p.tags) ? p.tags.filter(Boolean) : [];
    tags.forEach((tag) => {
      const sp = document.createElement('span');
      sp.textContent = tag;
      tagsEl.appendChild(sp);
    });

    const footer = document.createElement('div');
    footer.className = 'mandelo-card__footer';
    const titleEl = document.createElement('h3');
    titleEl.className = 'mandelo-card__title';
    titleEl.textContent = p.cardTitle || p.es?.title || p.id;
    const arrow = document.createElement('span');
    arrow.className = 'mandelo-card__btn';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';
    footer.appendChild(titleEl);
    footer.appendChild(arrow);

    article.appendChild(img);
    article.appendChild(scrim);
    article.appendChild(tagsEl);
    article.appendChild(footer);
    return article;
  }

  function syncProjectsFromData(projects) {
    if (!Array.isArray(projects) || projects.length === 0) return;

    // 1. Replace caseStudies entries cleanly
    Object.keys(caseStudies).forEach((k) => delete caseStudies[k]);
    projects.forEach((p) => {
      if (!p || !p.id) return;
      const esData = p.es || {};
      const enData = p.en || esData;
      caseStudies[p.id] = {
        image: p.image || '',
        demoUrl: p.demoUrl || '',
        appDemoUrl: p.appDemoUrl || '',
        url: p.url || '',
        source: p.source || 'behance',
        gallery: Array.isArray(p.gallery) ? p.gallery : [],
        es: {
          tag: esData.tag || '',
          client: esData.client || '',
          year: esData.year || '',
          title: esData.title || p.cardTitle || p.id,
          impact: esData.impact || '',
          challenge: esData.challenge || '',
          solution: esData.solution || '',
          deliverables: Array.isArray(esData.deliverables) ? esData.deliverables : []
        },
        en: {
          tag: enData.tag || esData.tag || '',
          client: enData.client || esData.client || '',
          year: enData.year || esData.year || '',
          title: enData.title || esData.title || p.cardTitle || p.id,
          impact: enData.impact || esData.impact || '',
          challenge: enData.challenge || esData.challenge || '',
          solution: enData.solution || esData.solution || '',
          deliverables: Array.isArray(enData.deliverables)
            ? enData.deliverables
            : Array.isArray(esData.deliverables)
              ? esData.deliverables
              : []
        }
      };
    });

    // 2. Rebuild Mandelo slider cards for visible projects
    const sliderProjects = projects.filter((p) => p && p.id && p.inSlider !== false);
    if (mandeloRail) {
      mandeloRail.textContent = '';
      sliderProjects.forEach((p, idx) => {
        mandeloRail.appendChild(createMandeloCardEl(p, idx));
      });
      allSlides = Array.from(mandeloRail.querySelectorAll('.mandelo-card'));
      projectOrder = sliderProjects.map((p) => p.id);
    }

    // 3. Update filter count badges dynamically
    const webCount = sliderProjects.filter((p) => p.category !== 'branding').length;
    const brandCount = sliderProjects.filter((p) => p.category === 'branding').length;
    const fmt = (n) => String(n).padStart(2, '0');
    document.querySelectorAll('[data-track-count="all"]').forEach((el) => (el.textContent = fmt(sliderProjects.length)));
    document.querySelectorAll('[data-track-count="web"]').forEach((el) => (el.textContent = fmt(webCount)));
    document.querySelectorAll('[data-track-count="branding"]').forEach((el) => (el.textContent = fmt(brandCount)));

    // 4. Sync Kinetic ABEL ACOSTA letter showcase with current projects
    const byId = new Map(projects.map((p) => [p.id, p]));
    kineticItems.forEach((item, idx) => {
      const matched = byId.get(item.caseId) || projects[idx % projects.length];
      if (!matched) return;
      item.caseId = matched.id;
      item.category = matched.category === 'branding' ? 'branding' : 'web';
      item.image = matched.image || item.image;
      item.es = {
        title: matched.cardTitle || matched.es?.title || matched.id,
        tag: (matched.tags || []).slice(0, 2).join(' · ') || matched.es?.tag || ''
      };
      item.en = {
        title: matched.cardTitle || matched.en?.title || matched.id,
        tag: (matched.tags || []).slice(0, 2).join(' · ') || matched.en?.tag || ''
      };
      const btn = kineticLetters[idx];
      if (btn) {
        btn.setAttribute('aria-label', `${item.letter} — ${item.es.title}`);
      }
    });

    if (kineticState.hoveredIndex >= 0) {
      updateKineticPreviewContent(kineticState.hoveredIndex);
    }

    // 5. Re-apply active track filter & refresh ScrollTrigger
    applyTrack(currentTrack, false);

    // 6. Refresh open project modal if still exists
    if (activeCaseId) {
      if (caseStudies[activeCaseId]) {
        renderCaseModal(activeCaseId);
      } else {
        closeCaseModal();
      }
    }
  }

  // Expose lightweight bridge for private admin studio (admin.js)
  window.AbelPortfolio = {
    syncProjectsFromData,
    openCaseModal,
    closeCaseModal,
    lockPageScroll,
    showToast,
    getCurrentLang: () => currentLang
  };

  // Initialize language, discipline track & MotionSites + GSAP animations
  applyLanguage(currentLang);
  initStackCardTriggers();
  applyTrack(currentTrack, false);
  scheduleHeroEntrance();
  initSectionScrollTriggers();

  // Support direct deep links like #proyecto/vantage
  const initProjectMatch = window.location.hash.match(/^#proyecto\/([a-z0-9-]+)$/i);
  if (initProjectMatch && caseStudies[initProjectMatch[1]]) {
    openCaseModal(initProjectMatch[1], false);
  }

  // Load live data/projects.json (keeps GitHub Pages & localhost synced automatically)
  fetch('data/projects.json', { cache: 'no-store' })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data && Array.isArray(data.projects) && data.projects.length > 0) {
        syncProjectsFromData(data.projects);
        const match = window.location.hash.match(/^#proyecto\/([a-z0-9-]+)$/i);
        if (match && !activeCaseId && caseStudies[match[1]]) {
          openCaseModal(match[1], false);
        }
      }
    })
    .catch(() => {
      // Static HTML fallback remains active if opened directly via file://
    });

  window.addEventListener('load', () => {
    if (hasGSAP) ScrollTrigger.refresh();
  });
})();
