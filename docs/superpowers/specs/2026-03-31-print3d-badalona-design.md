# Print3D Badalona — Diseño del MVP

**Fecha:** 2026-03-31
**Estado:** Aprobado
**Alcance:** MVP completo — Fase 1

---

## 1. Resumen del proyecto

Web de servicios de impresión 3D local con sede en Badalona (Barcelona). Objetivo: captar clientes locales mediante SEO local con WhatsApp como canal de conversión principal. Sin panel de administración ni pagos online en esta fase.

**Nombre:** Print3D Badalona
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · GSAP · React Hook Form + Zod · Resend · Vercel
**Animaciones:** GSAP (reemplaza Framer Motion del package.json inicial)

---

## 2. Sistema de diseño visual

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#0F2137` | Títulos principales, footer |
| `--blue` | `#2563EB` | CTAs, accents, bordes activos |
| `--blue-light` | `#BFDBFE` | Borders, highlights, fondos hover |
| `--surface` | `#F8FAFC` | Fondo secciones alternadas |
| `--muted` | `#64748B` | Textos secundarios |
| `--slate` | `#475569` | Body text |
| `--whatsapp` | `#25D366` | Botón y CTAs WhatsApp |

### Tipografía — Inter (Google Fonts)

| Rol | Peso | Tamaño | Detalles |
|---|---|---|---|
| H1 | 900 | 52px | tracking -1.5px, line-height 1.1 |
| H2 | 800 | 36px | tracking -0.5px |
| H3 | 700 | 22px | — |
| Body | **500** | **16px** | color `#475569`, line-height 1.75 |
| Body small | 500 | 14px | color `#64748B` |
| Label | **800** | **12px** | uppercase, letter-spacing 2px, color `--blue` |

### Componentes UI base

- **Button primary:** fondo `--blue`, blanco, border-radius 5px, font-weight 700
- **Button WhatsApp:** fondo `--whatsapp`, blanco, font-weight 700
- **Button outline:** borde `--blue-light`, texto `--blue`, fondo blanco
- **Card:** fondo blanco, borde `#E5EAF0`, border-radius 8px, padding 14-16px
- **Badge material:** fondo `#EFF6FF`, texto `--blue`, borde `--blue-light`, font-weight 600
- **WhatsApp flotante:** círculo 44px, fondo `--whatsapp`, sombra `rgba(37,211,102,0.35)`, esquina inferior derecha

---

## 3. Estructura de páginas

### Navbar (sticky)
- Logo `P3D.` (punto en `--blue`)
- Links: Servicios · Galería · Sobre nosotros · Contacto
- CTA principal: botón verde WhatsApp
- Comportamiento: sticky en scroll, hamburger en móvil

### Rutas del MVP

| Ruta | Contenido principal | CTA principal |
|---|---|---|
| `/` | Home completa | WhatsApp |
| `/servicios` | Tipos impresión, materiales, precios orientativos | WhatsApp |
| `/galeria` | Grid masonry + filtros + modal zoom | WhatsApp |
| `/presupuesto` | Formulario completo con upload STL | WhatsApp / email |
| `/contacto` | WhatsApp Business, email, mapa, horario | WhatsApp |
| `/about` | Historia, equipos, por qué local | WhatsApp |

### Jerarquía de CTAs (global)
1. **WhatsApp** — verde, primario, siempre visible
2. **Formulario presupuesto** — azul outline, secundario
3. **Ver galería / Saber más** — ghost/link, terciario

### Footer
- Fondo `--navy`
- 4 columnas: marca / servicios / empresa / contacto
- Pie: aviso legal · privacidad · cookies (RGPD) · "Hecho en Badalona 🇪🇸"

---

## 4. Layout de la Homepage

Secciones en orden, de arriba abajo:

1. **Navbar** — sticky
2. **Hero** — gradiente sutil blanco→`#EFF6FF`, label geolocalizado, H1, body, CTAs (WhatsApp primario + Ver galería), stats (24h / 3+ materiales / 5★)
3. **Propuesta de valor** — 3 cards: Rápido (24-48h) / Local (recogida Badalona) / Cercano (WhatsApp)
4. **Cómo funciona** — 4 steps con línea conectora vertical: Envías archivo → Confirmamos precio → Imprimimos → Recoges o envío
5. **Servicios** — grid 2x2: Bajo demanda / Pedidos recurrentes / Acabados / "Ver todos →"
6. **Galería preview** — grid 3x3, 5 fotos stock + 1 tile "Ver todo →"
7. **Testimonios** — 2 cards con estrellas, nombre y ciudad
8. **CTA final** — fondo `--navy`, headline, WhatsApp primario + formulario secundario

**Imágenes:** stock en esta fase, slots preparados para sustituir por fotos reales.

---

## 5. Estrategia de animaciones GSAP

### Principios
- Solo `transform` y `opacity` (nunca propiedades de layout)
- `gsap.matchMedia()` para respetar `prefers-reduced-motion`
- Hero animation arranca solo tras LCP completado
- ScrollTrigger con `once: true` donde la animación no deba repetirse

### Configuración global (`lib/gsap-config.ts`)
```ts
gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power2.out', duration: 0.5 })
```

### Animaciones por sección

| Sección | Animación | Herramienta |
|---|---|---|
| **Hero** | Entrada escalonada: label→H1→body→botones→stats. `opacity:0→1` + `y:20→0`, stagger 0.1s | `gsap-timeline`, `gsap-react` |
| **Stats** | Contador animado 0→valor al entrar viewport, once | `gsap-scrolltrigger`, `gsap-utils` |
| **Propuesta de valor** | Stagger izq→dcha en las 3 cards, `y:30→0` | `gsap-scrolltrigger`, `gsap-core` |
| **Cómo funciona** | Línea conectora `scaleY:0→1` + círculos `scale:0→1.1→1` secuencial | `gsap-scrolltrigger`, `gsap-timeline` |
| **Galería preview** | Stagger en grid 6 fotos + hover `scale:1.04` | `gsap-core`, `gsap-performance` |
| **WhatsApp flotante** | Entrada con rebote delay 1.5s + pulso suave `scale:1→1.08→1` cada 4s | `gsap-core` |

---

## 6. Formulario de presupuesto

### Dos modos (toggle global)

**Modo normal (toggle OFF):**
- Nombre · Email · Teléfono (opcional) · Descripción
- Material: PLA / PETG / TPU / ASA
- Cantidad: 1 / 2–5 / +5 → si eligen +5, aparece input numérico para cantidad exacta
- Modalidad: Recogida en Badalona / Envío a domicilio
- Upload archivo: STL · OBJ · 3MF, max 50MB (opcional)

**Modo "no sé" (toggle ON):**
- Toggle activa aviso: "No te preocupes por los detalles técnicos. Cuéntanos qué quieres conseguir."
- Campos material y cantidad se ocultan
- Descripción se amplía con placeholder orientativo
- Quedan: nombre, email, descripción, modalidad, upload

### API Route (`/api/presupuesto`)
```
POST /api/presupuesto
  1. Validar con Zod schema
  2. Gestionar archivo adjunto si existe
  3. Enviar email al admin (Resend)
  4. Enviar email de confirmación al cliente
  5. Generar URL WhatsApp con datos del proyecto
  → 200 OK + { waUrl, message }
  → 400 Error de validación
  → 500 Error de servidor
```

### Botón WhatsApp flotante
- URL: `https://wa.me/{NEXT_PUBLIC_WA_NUMBER}?text=...`
- Mensaje predefinido personalizable por página
- Visible en todas las páginas

---

## 7. Variables de entorno

```env
RESEND_API_KEY=re_xxxx
EMAIL_ADMIN=tu@email.com
NEXT_PUBLIC_WHATSAPP_NUMBER=34XXXXXXXXX
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola!+Me+interesa+la+impresión+3D+en+Badalona
NEXT_PUBLIC_SITE_URL=https://print3dbadalona.com
```

---

## 8. Plan de implementación — por bloques

### Bloque 1 — Base
`tailwind.config.ts` · `globals.css` · `lib/utils.ts` (`cn()`) · componentes UI primitivos (Button, Card, Badge) · Navbar · Footer · WhatsAppButton · `layout.tsx`

### Bloque 2 — Homepage
Todas las secciones de la home con animaciones GSAP

### Bloque 3 — Formulario y API
`/presupuesto` + `/api/presupuesto` + emails Resend

### Bloque 4 — Resto de páginas
`/servicios` · `/galeria` (con filtros y modal) · `/contacto` · `/about`

### Bloque 5 — SEO y deploy
Metadata · JSON-LD LocalBusiness · sitemap · robots.txt · deploy Vercel

---

## 9. Notas y decisiones

- **Framer Motion eliminado** del stack — reemplazado por GSAP
- **Sin acabados en formulario** — simplifica la experiencia para el usuario final
- **WhatsApp como canal primario** en toda la web — preparado para automatización con IA (n8n/Make) en Fase 2
- **Imágenes stock** en MVP, slots preparados para fotos reales
- **RGPD:** aviso legal, política de privacidad y cookies obligatorios (España)
- **Mobile first:** mayoría del tráfico local es móvil — diseño y animaciones optimizados
