# 🖨️ Print3D Badalona — Instrucciones del Proyecto

## Visión General

Web de servicios de impresión 3D local con sede en **Badalona (Barcelona)**.
El objetivo es captar clientes locales mediante SEO local y ofrecer recogida en persona,
sin descartar envíos a domicilio para clientes de fuera de la ciudad.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS + CSS Variables |
| Formularios | React Hook Form + Zod |
| Email | Resend (o Nodemailer) |
| Despliegue | Vercel |
| SEO | next/metadata + JSON-LD |
| Animaciones | Framer Motion |

---

## Identidad de Marca

### Nombre sugerido
`Print3D Badalona` o `Layer3D` (decidir antes de lanzar)

### Paleta de colores (propuesta)
```css
--color-primary: #0D0D0D;       /* Negro profundo */
--color-accent: #FF5722;        /* Naranja impresión */
--color-surface: #F5F0EB;       /* Crema cálida */
--color-muted: #6B6B6B;         /* Gris texto secundario */
--color-highlight: #1A1A2E;     /* Azul noche (alternativo) */
```

### Tono de comunicación
- Cercano y profesional (hablar de "tú")
- Énfasis en lo local: "hecho en Badalona"
- Confianza: tiempos de entrega claros, precio transparente

---

## Páginas del Proyecto

### 1. `/` — Home
- **Hero**: Titular impactante + CTA doble (Pedir presupuesto / Ver galería)
- **Propuesta de valor**: 3 columnas (Calidad, Rapidez, Local)
- **Servicios resumidos**: Cards clicables
- **Cómo funciona**: Steps visuales (Envías el archivo → Confirmamos precio → Imprimimos → Recoges o te lo enviamos)
- **Galería preview**: 6 piezas destacadas
- **Testimonios**: Carrusel
- **CTA final**: Formulario de presupuesto rápido

### 2. `/servicios` — Servicios
- **Impresión bajo demanda**: Prototipos, piezas únicas
- **Pedidos recurrentes**: Para empresas y makers
- **Materiales disponibles**: PLA, PETG, TPU, etc. (tabla comparativa)
- **Acabados**: Lijado, pintado, soporte disolvible
- **Tabla de precios orientativa**: Por gramos / tiempo / complejidad

### 3. `/galeria` — Galería
- Grid masonry de trabajos realizados
- Filtros por categoría: Decoración, Industria, Prototipos, Coleccionables, etc.
- Modal con zoom y detalle de cada pieza

### 4. `/presupuesto` — Solicitar Presupuesto
- **Formulario completo**:
  - Nombre y contacto
  - Descripción del proyecto
  - Upload del archivo STL/OBJ (opcional)
  - Material preferido
  - Cantidad
  - Fecha de entrega deseada
  - Modalidad: Recogida en Badalona / Envío a domicilio
- Confirmación por email automática
- Respuesta en menos de 24h (mensaje claro)

### 5. `/contacto` — Contacto
- Dirección en Badalona (zona aproximada si no se quiere publicar exacta)
- WhatsApp Business directo
- Email
- Formulario simple
- Horario de atención
- Mapa de Google Maps embebido (barrio Badalona)

### 6. `/about` — Sobre Mí / Nosotros
- Historia del proyecto
- Equipos de impresión disponibles
- Por qué elegir un servicio local
- Foto/avatar (placeholder)

---

## SEO Local — Estrategia

### Keywords objetivo
```
impresión 3D Badalona
impresión 3D Barcelona
servicio impresión 3D cerca de mi
imprimir en 3D Badalona
prototipos 3D Badalona
piezas PLA Barcelona
impresión 3D a domicilio Barcelona
```

### Implementación técnica SEO
- `next/metadata` con título y descripción por página
- JSON-LD Schema `LocalBusiness` en el layout raíz
- Sitemap.xml generado automáticamente
- Open Graph tags para compartir en redes
- Imágenes con `alt` descriptivos y geo-referenciados

### Ejemplo JSON-LD LocalBusiness
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Print3D Badalona",
  "description": "Servicio de impresión 3D en Badalona. Recogida en persona o envío a domicilio.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Badalona",
    "addressRegion": "Barcelona",
    "addressCountry": "ES"
  },
  "areaServed": ["Badalona", "Barcelona", "Maresme"],
  "serviceType": "Impresión 3D",
  "openingHours": "Mo-Fr 09:00-20:00"
}
```

---

## Modalidades de Entrega

### Recogida en persona (principal)
- Zona Badalona (dirección a definir)
- Sin coste adicional
- Coordinación por WhatsApp/email

### Envío a domicilio
- Península: Correos / MRW / SEUR
- Precio según peso y destino
- Embalaje seguro para piezas frágiles
- Tracking incluido

---

## Formulario de Presupuesto — Lógica

```
Usuario envía formulario
  → API Route /api/presupuesto
    → Validación Zod
    → Email al admin (Resend)
    → Email de confirmación al cliente
    → Respuesta 200 OK
  → UI muestra mensaje de éxito
```

### Campos requeridos
- `nombre` (string, min 2)
- `email` (email válido)
- `descripcion` (string, min 10)
- `material` (enum: PLA | PETG | TPU | ASA | Otro)
- `cantidad` (number, min 1)
- `modalidad` (enum: recogida | envio)
- `archivo` (File opcional, max 50MB, .stl .obj .3mf)

---

## Componentes a Crear

### Layout
- `Navbar.tsx` — Logo + nav links + CTA "Pedir presupuesto"
- `Footer.tsx` — Links, redes sociales, info legal, WhatsApp
- `WhatsAppButton.tsx` — Botón flotante WhatsApp

### UI Primitivos
- `Button.tsx` — Variantes: primary, secondary, outline
- `Card.tsx` — Para servicios y galería
- `Badge.tsx` — Para materiales y categorías
- `Modal.tsx` — Para galería expandida
- `Stepper.tsx` — Para "Cómo funciona"

### Sections (HomePage)
- `HeroSection.tsx`
- `PropuestaValorSection.tsx`
- `ServiciosResumenSection.tsx`
- `ComoFuncionaSection.tsx`
- `GaleriaPreviewSection.tsx`
- `TestimoniosSection.tsx`
- `CTASection.tsx`

### Forms
- `PresupuestoForm.tsx`
- `ContactoForm.tsx`

---

## Variables de Entorno (.env.local)

```env
# Email
RESEND_API_KEY=re_xxxx
EMAIL_ADMIN=tu@email.com

# WhatsApp Business
NEXT_PUBLIC_WHATSAPP_NUMBER=34XXXXXXXXX
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola! Quiero información sobre impresión 3D

# Google Maps (opcional)
NEXT_PUBLIC_GMAPS_KEY=AIzaXXXXX

# URL pública
NEXT_PUBLIC_SITE_URL=https://print3dbadalona.com
```

---

## Roadmap de Desarrollo

### Fase 1 — MVP (2–3 semanas)
- [ ] Setup Next.js 14 + Tailwind + TypeScript
- [ ] Layout base (Navbar + Footer)
- [ ] Homepage completa
- [ ] Página Servicios
- [ ] Formulario de Presupuesto funcional
- [ ] Página Contacto con mapa
- [ ] Deploy en Vercel

### Fase 2 — Mejoras (1–2 semanas)
- [ ] Galería con filtros y modal
- [ ] Página About
- [ ] Animaciones con Framer Motion
- [ ] WhatsApp Button flotante
- [ ] SEO avanzado (JSON-LD, sitemap, robots.txt)

### Fase 3 — Extras (futuro)
- [ ] Panel admin simple para gestionar pedidos
- [ ] Integración pago online (Stripe)
- [ ] Blog / SEO de contenidos
- [ ] Sistema de seguimiento de pedidos
- [ ] Reviews de Google integradas

---

## Convenciones de Código

- Componentes en PascalCase: `HeroSection.tsx`
- Funciones utils en camelCase: `formatPrice.ts`
- CSS: Tailwind classes primero, CSS variables para colores de marca
- Tipos: siempre tipados, nunca `any`
- Comentarios en español para contexto de negocio, inglés para lógica técnica

---

## Notas Importantes

- El sitio debe funcionar perfectamente en **móvil** (mayoría de tráfico local es mobile)
- WhatsApp es el canal de comunicación principal → destacarlo siempre
- Los precios son **orientativos** — no publicar tarifa fija sin disclaimer
- Incluir aviso legal, política de privacidad y cookies (RGPD España)
- Poner el nombre de la ciudad en H1 y meta description para SEO local
