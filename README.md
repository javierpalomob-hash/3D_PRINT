# Print3D Badalona 🖨️

> Servicio de impresión 3D local en Badalona · Recogida en persona · Envío a domicilio

---

## Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local

# 3. Rellenar las variables en .env.local

# 4. Iniciar en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Linting con ESLint |
| `npm run type-check` | Verificación TypeScript |

---

## Estructura del Proyecto

```
3D_PRINT/
│
├── public/                    # Assets estáticos
│   ├── images/
│   │   ├── hero/             # Imágenes del hero principal
│   │   ├── gallery/          # Fotos de trabajos realizados
│   │   ├── services/         # Imágenes de servicios
│   │   └── team/             # Foto del equipo/maker
│   ├── icons/                # SVGs e iconos
│   └── fonts/                # Fuentes locales (si aplica)
│
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # Homepage
│   │   ├── layout.tsx        # Layout raíz (Navbar + Footer)
│   │   ├── globals.css       # Estilos globales
│   │   ├── about/            # Sobre nosotros
│   │   ├── servicios/        # Servicios y materiales
│   │   ├── galeria/          # Galería de trabajos
│   │   ├── presupuesto/      # Formulario de presupuesto
│   │   ├── contacto/         # Contacto y mapa
│   │   └── api/
│   │       └── presupuesto/  # Endpoint envío de formulario
│   │
│   ├── components/
│   │   ├── ui/               # Primitivos: Button, Card, Badge, Modal...
│   │   ├── layout/           # Navbar, Footer, WhatsAppButton
│   │   ├── sections/         # Secciones de la homepage
│   │   └── forms/            # Formularios con validación
│   │
│   ├── lib/                  # Utilidades, helpers, config
│   ├── hooks/                # Custom React hooks
│   ├── types/                # Tipos TypeScript compartidos
│   └── styles/               # CSS adicional si es necesario
│
├── content/                  # Contenido estático (JSON/MD)
│   ├── servicios/            # Descripción de servicios y materiales
│   ├── faq/                  # Preguntas frecuentes
│   └── testimonios/          # Reseñas de clientes
│
├── docs/                     # Documentación interna del proyecto
│
├── .env.example              # Variables de entorno de ejemplo
├── .env.local                # Variables de entorno locales (NO subir a git)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── PROJECT.md                # Instrucciones completas del proyecto
```

---

## Deploy

El proyecto está configurado para desplegarse en **Vercel** automáticamente al hacer push a `main`.

1. Conectar el repositorio en [vercel.com](https://vercel.com)
2. Añadir las variables de entorno en el panel de Vercel
3. Cada push a `main` genera un deploy automático

---

## Documentación completa

Ver [`PROJECT.md`](./PROJECT.md) para instrucciones detalladas, estrategia SEO, roadmap y convenciones.
