# Diseño: Páginas Legales RGPD + Cookie Banner + OG Image

**Fecha:** 2026-04-01
**Proyecto:** Print3D Badalona
**Estado:** Aprobado

---

## Resumen

Implementar los requisitos pre-lanzamiento obligatorios:
1. Tres páginas legales RGPD adaptadas al negocio
2. Cookie banner con gestión por categorías
3. OG image estática alineada con el estilo de la web

---

## 1. Páginas Legales

### Rutas

| Ruta | Archivo |
|------|---------|
| `/aviso-legal` | `src/app/aviso-legal/page.tsx` |
| `/privacidad` | `src/app/privacidad/page.tsx` |
| `/cookies` | `src/app/cookies/page.tsx` |

### Contenido generado para

- **Titular:** persona física (nombre a completar antes de publicar)
- **Negocio:** Print3D Badalona — servicio de impresión 3D
- **Dominio:** print3dbadalona.com
- **Localización:** Badalona, Barcelona, España
- **Marco legal:** RGPD (UE 2016/679) + LSSI-CE + LOPDGDD

### Aviso Legal (`/aviso-legal`)
- Datos del titular (nombre, NIF, dirección, email: info@print3dbadalona.com)
- Objeto del sitio web
- Propiedad intelectual
- Limitación de responsabilidad
- Legislación aplicable: derecho español, jurisdicción Badalona

### Política de Privacidad (`/privacidad`)
- Responsable del tratamiento
- Datos recogidos: nombre, email, teléfono (opcional), descripción del proyecto — vía formulario de presupuesto
- Base legal: consentimiento del interesado (Art. 6.1.a RGPD)
- Finalidad: gestión de solicitudes de presupuesto y comunicación con el cliente
- Conservación: mientras dure la relación comercial + 3 años
- Encargados de tratamiento: Resend Inc. (envío de emails), Vercel Inc. (hosting)
- Derechos del usuario: acceso, rectificación, supresión, oposición, portabilidad
- Contacto para ejercer derechos: info@print3dbadalona.com

### Política de Cookies (`/cookies`)
- Explicación de qué son las cookies
- Tabla por categorías (ver sección 2)
- Enlace para abrir el panel de preferencias de cookies
- Cómo desactivar cookies desde el navegador

### Estilo
- Mismo layout que `/about` y `/contacto` (Navbar + Footer)
- Componente reutilizable `LegalPage` con header de sección y contenido en prosa
- Clases Tailwind existentes: `text-navy`, `text-[#475569]`, `label-text`

---

## 2. Cookie Banner

### Componente
- **Archivo:** `src/components/layout/CookieBanner.tsx`
- **Registro en:** `src/app/layout.tsx` (junto a `WhatsAppButton`)
- **Tipo:** `'use client'`

### Comportamiento
- Se muestra en primera visita si `localStorage['cookie-consent']` no existe
- No se muestra si la preferencia ya está guardada
- Posición: fixed, bottom, full width, z-index alto (por encima de WhatsApp button)

### UI — Banner principal
```
┌─────────────────────────────────────────────────────┐
│ 🍪 Usamos cookies para mejorar tu experiencia.      │
│ Puedes aceptarlas, rechazarlas o personalizar...    │
│                                                     │
│ [Rechazar]  [Personalizar]  [Aceptar todo]          │
└─────────────────────────────────────────────────────┘
```

### UI — Modal de personalización
- Overlay oscuro sobre la página
- Tres toggles (uno por categoría):

| Categoría | Default | Editable |
|-----------|---------|----------|
| Necesarias | ON | No (siempre activas) |
| Analíticas | OFF | Sí |
| Marketing | OFF | Sí |

- Botón "Guardar preferencias"

### Estado en localStorage
```json
// Clave: "cookie-consent"
{
  "necessary": true,
  "analytics": false,
  "marketing": false,
  "savedAt": "2026-04-01T..."
}
```

### Integración futura con GA4
Cuando se active `NEXT_PUBLIC_GA_ID`, el script de GA4 solo se inyecta si `consent.analytics === true`. El banner ya deja el estado listo para este control.

---

## 3. OG Image

### Archivo
- **Output:** `public/og-image.png` (1200×630px)
- **Generación:** componente `src/app/og-image/page.tsx` para renderizar en navegador y capturar como PNG

### Estilo (opción A aprobada)
- Fondo: gradiente `white → #EFF6FF` (igual que el hero)
- Blob decorativo: `#BFDBFE`, blur-3xl, esquina superior derecha
- Label: `📍 Badalona · Barcelona`, color `#2563EB`, uppercase, tracking
- Título: "Imprimimos lo que imaginas." — Inter black, `#0F2137`
- Subtítulo: "Servicio local de impresión 3D en Badalona." — `#475569`
- Stats: 24h / 3+ materiales / 5★ — separados por divisores `#E5EAF0`
- Dominio: `print3dbadalona.com` — esquina inferior derecha, color muted

### Referencia en metadata
```ts
// src/app/layout.tsx
openGraph: {
  images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Print3D Badalona' }],
},
twitter: {
  card: 'summary_large_image',
  images: ['/og-image.png'],
},
```

---

## 4. Footer — enlaces legales

Añadir sección "Legal" en `src/components/layout/Footer.tsx`:
- Aviso legal → `/aviso-legal`
- Política de privacidad → `/privacidad`
- Política de cookies → `/cookies`

---

## Archivos a crear / modificar

| Acción | Archivo |
|--------|---------|
| Crear | `src/app/aviso-legal/page.tsx` |
| Crear | `src/app/privacidad/page.tsx` |
| Crear | `src/app/cookies/page.tsx` |
| Crear | `src/components/layout/CookieBanner.tsx` |
| Crear | `src/app/og-image/page.tsx` |
| Crear | `public/og-image.png` (captura manual del componente) |
| Modificar | `src/app/layout.tsx` — añadir CookieBanner + OG metadata |
| Modificar | `src/components/layout/Footer.tsx` — añadir enlaces legales |

---

## No está en scope

- Integración real de GA4 (queda preparada pero no activada)
- OG images dinámicas por página
- Gestión de consentimiento IAB TCF
- Panel de administración de cookies
