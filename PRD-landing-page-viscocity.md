# PRD — Landing Page Viscocity
**Versión:** 1.0  
**Fecha:** Mayo 2026  
**Estado:** Borrador  

---

## 1. Executive Summary

### Problema
Viscocity no cuenta con una presencia web propia donde los clientes potenciales puedan descubrir la marca, conocer el menú de productos y conectar con la identidad urbana del negocio. La comunicación actual depende exclusivamente de Instagram, limitando el alcance y la credibilidad digital de la marca.

### Solución Propuesta
Diseñar y desarrollar una landing page de alto impacto visual que refleje la identidad urbana de Viscocity, presente su catálogo de bebidas (sodas, granizados y smoothies), y convierta visitantes en clientes a través de llamadas a la acción claras.

### Criterios de Éxito (KPIs)
| KPI | Meta |
|-----|------|
| Tiempo de carga (LCP) | ≤ 2.5 segundos |
| Lighthouse Performance Score | ≥ 90 |
| Lighthouse Accessibility Score | 100 |
| Tasa de rebote | < 50% al mes 3 |
| Clics en CTA principal ("Ver Menú" / WhatsApp) | ≥ 20% de visitantes únicos |

---

## 2. Contexto del Negocio

### Descripción de la Marca
**Viscocity** es una marca de bebidas con identidad urbana colombiana. Según el manual de marca 2025:

> *"En Viscocity no vendemos solo granizados… servimos flow en vaso. Somos la ciudad donde el sabor se vive en cada esquina y el parche nunca se enfría."*

La marca fusiona la cultura callejera con elegancia: personajes ilustrados tipo sticker, grafitis y una paleta cromática vibrante que comunica energía, alegría y pertenencia.

**Tagline oficial:** *"Bebe, ríe y repite con Viscocity. Únete al parche."*

### Identidad Visual (Manual de Marca 2025)

| Elemento | Especificación |
|----------|---------------|
| **Color Principal** | Degradé `#fdc738` → `#E7971c` (amarillo a naranja) |
| **Color Amarillo** | `#fdc738` — Representa: *Alegría* |
| **Color Naranja** | `#E7971c` — Representa: *Unión* |
| **Color Morado** | `#261536` — Representa: *Parche* (color complementario/fondos) |
| **Tipografía Display** | **Milker** — usada en logo y títulos |
| **Tipografía Cuerpo** | **Montserrat** — usada en párrafos y papelería |

### Catálogo de Productos
- **Granizados** — bebida icónica de la marca, en múltiples sabores con personajes propios
- **Sodas** — bebidas carbonatadas con identidad Viscocity
- **Smoothies** — opciones de fruta con la misma personalidad de marca

### Personajes de Marca (Ilustraciones)
Los productos están representados por personajes ilustrados con actitud urbana:
- Hoja (granizado verde)
- Manzana (granizado manzana)
- Cerezas diabólicas (morado)
- Luna/Mango con gorra (amarillo)
- Frambuesas/Moras (rosa/morado)
- Mora azul (con lengua, tono turquesa)

---

## 3. Usuarios y Personas

### Persona 1 — El Parcero Urbano
- **Edad:** 16–28 años
- **Perfil:** Joven de ciudad, conectado a redes sociales, amante de la cultura urbana, hip-hop, streetwear
- **Necesidad:** Encontrar una bebida que vaya con su estilo y sea algo más que "otro refresco"
- **Motivación:** Sentirse parte de un colectivo/parche con identidad propia

### Persona 2 — El Cliente Casual
- **Edad:** 25–40 años
- **Perfil:** Persona que busca opciones de bebidas frescas y originales para compartir
- **Necesidad:** Ver el menú, precios y cómo hacer un pedido rápidamente
- **Motivación:** Comodidad y rapidez para ordenar

---

## 4. User Stories y Criterios de Aceptación

### US-01 — Descubrimiento de Marca
> *Como visitante nuevo, quiero entender qué es Viscocity en menos de 5 segundos para decidir si me interesa.*

**Criterios de Aceptación:**
- [ ] La sección hero muestra el logo, tagline y un CTA visible sin hacer scroll
- [ ] La propuesta de valor ("granizados, sodas y smoothies con actitud urbana") se comunica en el hero
- [ ] El tiempo de carga del hero (LCP) ≤ 2.5 s en conexión 4G

### US-02 — Exploración del Menú
> *Como cliente potencial, quiero ver los productos y sabores disponibles para saber qué ordenar.*

**Criterios de Aceptación:**
- [ ] Sección de menú con mínimo 3 categorías: Granizados, Sodas, Smoothies
- [ ] Cada categoría muestra imagen del producto, nombre y descripción corta
- [ ] Los personajes ilustrados son visibles y están asociados a cada sabor/producto
- [ ] La sección es navegable en móvil sin scroll horizontal

### US-03 — Llamada a la Acción (Pedido/Contacto)
> *Como cliente interesado, quiero contactar fácilmente a Viscocity para hacer un pedido.*

**Criterios de Aceptación:**
- [ ] Botón flotante o sección de CTA con enlace directo a WhatsApp Business
- [ ] El número o enlace de contacto está visible en header y/o footer
- [ ] El CTA de WhatsApp funciona en dispositivos móviles (abre app nativa)

### US-04 — Conexión con Redes Sociales
> *Como usuario de redes, quiero acceder al Instagram de Viscocity desde la web.*

**Criterios de Aceptación:**
- [ ] Ícono/enlace a Instagram visible en footer y/o sección de comunidad
- [ ] Opcionalmente: galería embebida o grid de posts recientes de Instagram

### US-05 — Experiencia Móvil
> *Como usuario de smartphone, quiero navegar la página cómodamente desde mi celular.*

**Criterios de Aceptación:**
- [ ] Diseño 100% responsivo (mobile-first)
- [ ] Elementos táctiles (botones, links) con área mínima de toque de 44×44 px
- [ ] No hay overflow horizontal en ningún viewport (375px–428px)

---

## 5. Estructura de la Landing Page

### Arquitectura de Secciones (Top → Bottom)

```
┌─────────────────────────────────────────────┐
│  NAVBAR                                      │
│  Logo + Links de navegación + CTA WhatsApp  │
├─────────────────────────────────────────────┤
│  HERO                                        │
│  Ilustración/mascota + Tagline + CTA         │
│  Fondo: morado #261536 con pattern           │
├─────────────────────────────────────────────┤
│  ABOUT / BRAND STORY                         │
│  "Servimos flow en vaso" — historia corta   │
├─────────────────────────────────────────────┤
│  MENÚ DE PRODUCTOS                           │
│  Cards por categoría: Granizados / Sodas /  │
│  Smoothies — con personajes ilustrados      │
├─────────────────────────────────────────────┤
│  GALERÍA / VIBRA VISUAL                      │
│  Grid de imágenes (Instagram o fotos reales)│
├─────────────────────────────────────────────┤
│  CTA FINAL                                   │
│  "¿Listo para el parche?" + Botón WhatsApp  │
├─────────────────────────────────────────────┤
│  FOOTER                                      │
│  Logo + Links + Redes + Dirección/Horario   │
└─────────────────────────────────────────────┘
```

---

## 6. Especificaciones Técnicas

### Stack Tecnológico Recomendado
| Capa | Tecnología | Justificación |
|------|------------|---------------|
| Framework | **Next.js 14+ (App Router)** | SSG/SSR, SEO óptimo, Vercel deploy |
| Estilos | **Tailwind CSS** | Rápido, utilitario, fácil de mantener |
| Animaciones | **Framer Motion** | Animaciones fluidas acordes al estilo de marca |
| Hosting | **Vercel** | Deploy automático, CDN global, gratis |
| Imágenes | **Next/Image** | Optimización automática WebP/AVIF |
| Formulario/Contacto | **WhatsApp API link** | Sin backend requerido para MVP |

### Diseño de Sistema de Colores (CSS Variables)
```css
:root {
  --color-primary-yellow: #fdc738;
  --color-primary-orange: #E7971c;
  --color-background-dark: #261536;
  --color-text-light: #ffffff;
  --gradient-primary: linear-gradient(135deg, #fdc738, #E7971c);
}
```

### Tipografías Web
```css
/* Títulos y display */
font-family: 'Milker', sans-serif; /* Cargar como @font-face local */

/* Cuerpo y párrafos */
font-family: 'Montserrat', sans-serif; /* Google Fonts */
```

### Requerimientos SEO
- `<title>`: "Viscocity — Granizados, Sodas & Smoothies con Actitud"
- `<meta name="description">`: "En Viscocity servimos flow en vaso. Granizados, sodas y smoothies con sabor urbano. Únete al parche."
- Open Graph tags para compartir en redes sociales
- Schema.org markup `LocalBusiness` con datos de contacto
- Sitemap.xml y robots.txt

### Rendimiento y Accesibilidad
- Imágenes en formato WebP/AVIF con `alt` descriptivo en todas
- Contraste mínimo WCAG AA (4.5:1) para texto sobre fondos de marca
- Soporte para navegación por teclado
- `preconnect` a Google Fonts
- Fuente Milker cargada con `font-display: swap`

---

## 7. Non-Goals (Lo que NO incluye este proyecto)

- ❌ Sistema de pedidos online o e-commerce
- ❌ Carrito de compras o pasarela de pago
- ❌ Autenticación / cuentas de usuario
- ❌ Panel de administración de contenido (CMS) en MVP
- ❌ Blog o sección de noticias
- ❌ App móvil nativa
- ❌ Multiidioma (solo español en v1.0)

---

## 8. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| La fuente Milker no tiene licencia web | Media | Alto | Verificar licencia; alternativa: usar SVG del logo o fuente similar con licencia web |
| Imágenes de alta resolución ralentizan carga | Alta | Medio | Usar Next/Image con lazy loading y formatos modernos |
| Los personajes ilustrados no están en formato SVG/PNG optimizado | Media | Medio | Exportar desde archivos originales en resolución adecuada |
| Falta de contenido final (precios, sabores completos) | Media | Medio | Usar contenido placeholder en MVP, iterar con cliente |

---

## 9. Fases de Desarrollo (Roadmap)

### Fase 1 — MVP (2–3 semanas)
**Objetivo:** Landing funcional lista para compartir

- [ ] Setup proyecto Next.js + Tailwind
- [ ] Configurar tipografías y tokens de color
- [ ] Sección Hero con logo, tagline y personaje principal
- [ ] Sección de productos con 3 categorías (cards con ilustraciones)
- [ ] CTA WhatsApp
- [ ] Footer con redes sociales
- [ ] Deploy en Vercel

### Fase 2 — v1.1 (1–2 semanas post-MVP)
**Objetivo:** Pulir experiencia y añadir contenido real

- [ ] Animaciones de entrada con Framer Motion
- [ ] Galería con imágenes reales de productos
- [ ] Sección "Nuestro Parche" (historia de la marca)
- [ ] Optimización SEO completa
- [ ] Integración Google Analytics / Meta Pixel

### Fase 3 — v2.0 (TBD)
**Objetivo:** Funcionalidades avanzadas

- [ ] Menú interactivo con filtros por categoría
- [ ] Mapa de ubicación integrado (Google Maps)
- [ ] CMS headless (Sanity / Contentful) para gestión de menú
- [ ] Formulario de eventos/pedidos especiales

---

## 10. Assets Disponibles

| Asset | Ruta | Estado |
|-------|------|--------|
| Logo color naranja | `logos/logo a color naranja png.png` | ✅ Disponible |
| Logo color amarillo | `logos/logo color amarillo png.png` | ✅ Disponible |
| Logo negro | `logos/logo a color negro png.png` | ✅ Disponible |
| Logo blanco | `logos/logo blanco png.png` | ✅ Disponible |
| Logo original (degradé) | `logos/logo original png.png` | ✅ Disponible |
| Personajes Instagram (x6) | `instagram/*.png` | ✅ Disponible |
| Fondo patrón Viscocity | `fondoetiquetaviscocity.jpeg` | ✅ Disponible |
| Tipografía Milker | `tipografias/milker.zip` | ✅ Disponible |
| Manual de Marca | `manual de marca/manual de marca viscocity 2025.pdf` | ✅ Disponible |

---

## 11. Apéndice — Paleta de Colores Extendida

```
Primarios:
  Amarillo    #fdc738   rgb(253, 199, 56)   — Alegría
  Naranja     #E7971c   rgb(231, 151, 28)   — Unión
  Degradé     #fdc738 → #E7971c             — Color principal de marca

Complementarios:
  Morado      #261536   rgb(38, 21, 54)     — Parche (fondos oscuros)
  Blanco      #ffffff                        — Textos sobre fondos oscuros
  Negro       #000000                        — Variante monocromática
```

---

*Documento generado en base al Manual de Marca Viscocity 2025 y assets provistos por el cliente.*
