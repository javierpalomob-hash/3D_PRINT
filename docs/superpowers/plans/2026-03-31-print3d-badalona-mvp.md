# Print3D Badalona MVP — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete MVP for Print3D Badalona — a Next.js 14 website for a local 3D printing service in Badalona, with WhatsApp as primary conversion channel, GSAP animations, and a budget request form with email delivery.

**Architecture:** Next.js 14 App Router with TypeScript. UI primitives in `src/components/ui/`, layout components in `src/components/layout/`, homepage sections in `src/components/sections/`. All animated components are Client Components. Server Components handle page composition and SEO metadata.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · GSAP + @gsap/react · React Hook Form + Zod · Resend · Lucide React · Vitest + Testing Library

---

## File Map

```
src/
  app/
    layout.tsx                      # Root layout: Inter font, Navbar, Footer, WhatsAppButton
    globals.css                     # Tailwind directives + base styles
    page.tsx                        # Homepage — composes all sections
    servicios/page.tsx              # Services page
    galeria/page.tsx                # Gallery page with filters and modal
    presupuesto/page.tsx            # Budget form page
    contacto/page.tsx               # Contact page
    about/page.tsx                  # About page
    sitemap.ts                      # Auto-generated sitemap
    robots.ts                       # robots.txt
    api/
      presupuesto/route.ts          # POST handler: validate, email admin, confirm client
  components/
    ui/
      Button.tsx                    # Variants: primary | whatsapp | outline
      Card.tsx                      # Base card with border and padding
      Badge.tsx                     # Material badge (PLA/PETG/TPU/ASA)
    layout/
      Navbar.tsx                    # Sticky nav with logo, links, WhatsApp CTA
      Footer.tsx                    # 4-column footer, dark navy background
      WhatsAppButton.tsx            # Floating button, fixed bottom-right, GSAP entrance
    sections/
      HeroSection.tsx               # Hero with GSAP staggered entrance
      PropuestaValorSection.tsx     # 3 value props with GSAP scroll stagger
      ComoFuncionaSection.tsx       # 4 steps with GSAP line draw + circle pop
      ServiciosSection.tsx          # 2x2 services grid with GSAP scroll entry
      GaleriaPreviewSection.tsx     # 3x3 grid preview with GSAP stagger + hover
      TestimoniosSection.tsx        # Testimonials from content JSON
      CTAFinalSection.tsx           # Dark navy CTA with WhatsApp + form buttons
    forms/
      PresupuestoForm.tsx           # Full form: toggle "no sé", conditional quantity
  lib/
    utils.ts                        # cn() helper (clsx + tailwind-merge)
    gsap.ts                         # GSAP plugin registration + defaults
    whatsapp.ts                     # WhatsApp URL builder with message encoding
    schemas.ts                      # Zod schemas for presupuesto form + API
  types/
    index.ts                        # Already exists — DO NOT MODIFY
src/__tests__/
  setup.ts                          # Testing Library matchers setup
  lib/
    utils.test.ts
    whatsapp.test.ts
    schemas.test.ts
  components/
    ui/Button.test.tsx
tailwind.config.ts                  # Custom colors and font
vitest.config.ts                    # Vitest with jsdom + React plugin
```

---

## BLOQUE 1 — Setup

### Task 1: Install dependencies and configure Vitest

**Files:**
- Modify: `package.json` (via npm)
- Create: `vitest.config.ts`
- Create: `src/__tests__/setup.ts`

- [ ] **Step 1: Install GSAP and remove Framer Motion**

```bash
cd C:/Users/javier.palomo/Documents/Claude/3D_PRINT
npm install gsap @gsap/react
npm uninstall framer-motion
```

Expected: no errors, `node_modules/gsap` and `node_modules/@gsap/react` present.

- [ ] **Step 2: Install Vitest and Testing Library**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 4: Create `src/__tests__/setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script to `package.json`**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Run test suite to verify setup works**

```bash
npm test
```

Expected: "No test files found" or 0 tests — no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: install GSAP, remove framer-motion, add vitest"
```

---

### Task 2: Tailwind config and global styles

**Files:**
- Create: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `tsconfig.json`

- [ ] **Step 1: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0F2137',
        'brand-blue': '#2563EB',
        'blue-light': '#BFDBFE',
        surface: '#F8FAFC',
        muted: '#64748B',
        'body-slate': '#475569',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Write `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply text-body-slate bg-white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4 {
    @apply text-navy;
  }
}

@layer utilities {
  .label-text {
    @apply text-xs font-extrabold text-brand-blue uppercase tracking-[2px];
  }
}
```

- [ ] **Step 3: Add path alias to `tsconfig.json`**

In `tsconfig.json`, inside `"compilerOptions"`, add:
```json
"paths": {
  "@/*": ["./src/*"]
}
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css tsconfig.json
git commit -m "chore: configure tailwind custom colors, globals, tsconfig paths"
```

---

## BLOQUE 2 — Utilities y componentes base

### Task 3: lib/utils.ts and lib/whatsapp.ts

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/whatsapp.ts`
- Create: `src/__tests__/lib/utils.test.ts`
- Create: `src/__tests__/lib/whatsapp.test.ts`

- [ ] **Step 1: Write failing tests for `cn()` utility**

```ts
// src/__tests__/lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })

  it('resolves tailwind conflicts — last wins', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8')
  })

  it('ignores falsy values', () => {
    expect(cn('px-4', false, undefined, null, 'py-2')).toBe('px-4 py-2')
  })
})
```

- [ ] **Step 2: Run to verify tests fail**

```bash
npm test
```
Expected: FAIL — `Cannot find module '@/lib/utils'`

- [ ] **Step 3: Write failing tests for `buildWhatsAppUrl()`**

```ts
// src/__tests__/lib/whatsapp.test.ts
import { describe, it, expect } from 'vitest'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

describe('buildWhatsAppUrl', () => {
  it('builds a valid wa.me URL', () => {
    const url = buildWhatsAppUrl('34600000000', 'Hola')
    expect(url).toBe('https://wa.me/34600000000?text=Hola')
  })

  it('encodes special characters in message', () => {
    const url = buildWhatsAppUrl('34600000000', 'Hola! Quiero información')
    expect(url).toContain('https://wa.me/34600000000?text=')
    expect(url).toContain('Hola')
  })

  it('uses default message when none provided', () => {
    const url = buildWhatsAppUrl('34600000000')
    expect(url).toContain('https://wa.me/34600000000?text=')
    expect(url.length).toBeGreaterThan(30)
  })
})
```

- [ ] **Step 4: Implement `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 5: Implement `src/lib/whatsapp.ts`**

```ts
const DEFAULT_MESSAGE =
  'Hola! Me interesa vuestro servicio de impresión 3D en Badalona.'

export function buildWhatsAppUrl(
  phone: string,
  message: string = DEFAULT_MESSAGE
): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encoded}`
}
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
npm test
```
Expected: 6 tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/lib/utils.ts src/lib/whatsapp.ts src/__tests__/lib/
git commit -m "feat: add cn() utility and WhatsApp URL builder"
```

---

### Task 4: lib/gsap.ts and lib/schemas.ts

**Files:**
- Create: `src/lib/gsap.ts`
- Create: `src/lib/schemas.ts`
- Create: `src/__tests__/lib/schemas.test.ts`

- [ ] **Step 1: Write failing tests for Zod schema**

```ts
// src/__tests__/lib/schemas.test.ts
import { describe, it, expect } from 'vitest'
import { presupuestoSchema } from '@/lib/schemas'

describe('presupuestoSchema', () => {
  const valid = {
    nombre: 'Marc',
    email: 'marc@test.com',
    descripcion: 'Necesito una pieza de repuesto',
    material: 'pla' as const,
    cantidad: 1,
    modalidad: 'recogida' as const,
    sinDetalles: false,
  }

  it('accepts a valid payload', () => {
    const result = presupuestoSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('rejects missing nombre', () => {
    const result = presupuestoSchema.safeParse({ ...valid, nombre: '' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = presupuestoSchema.safeParse({ ...valid, email: 'no-es-email' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid material', () => {
    const result = presupuestoSchema.safeParse({ ...valid, material: 'madera' })
    expect(result.success).toBe(false)
  })

  it('accepts sinDetalles:true without material/cantidad', () => {
    const { material, cantidad, ...rest } = valid
    const result = presupuestoSchema.safeParse({ ...rest, sinDetalles: true })
    expect(result.success).toBe(true)
  })

  it('rejects cantidad < 1', () => {
    const result = presupuestoSchema.safeParse({ ...valid, cantidad: 0 })
    expect(result.success).toBe(false)
  })
})
```

- [ ] **Step 2: Run to verify tests fail**

```bash
npm test
```
Expected: FAIL — `Cannot find module '@/lib/schemas'`

- [ ] **Step 3: Create `src/lib/gsap.ts`**

```ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once at module level
gsap.registerPlugin(ScrollTrigger)

// Global defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.5,
})

export { gsap, ScrollTrigger }
```

- [ ] **Step 4: Create `src/lib/schemas.ts`**

```ts
import { z } from 'zod'

export const presupuestoSchema = z
  .object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email no válido'),
    telefono: z.string().optional(),
    descripcion: z.string().min(10, 'Describe tu proyecto (mínimo 10 caracteres)'),
    sinDetalles: z.boolean().default(false),
    material: z.enum(['pla', 'petg', 'tpu', 'asa', 'otro']).optional(),
    cantidad: z.number().min(1, 'La cantidad mínima es 1').optional(),
    cantidadExacta: z.number().min(6).optional(),
    modalidad: z.enum(['recogida', 'envio']),
    fechaDeseada: z.string().optional(),
  })
  .refine(
    (data) => {
      // If sinDetalles is false, material and cantidad are required
      if (!data.sinDetalles) {
        return data.material !== undefined && data.cantidad !== undefined
      }
      return true
    },
    {
      message: 'Material y cantidad son obligatorios si conoces los detalles',
      path: ['material'],
    }
  )

export type PresupuestoFormData = z.infer<typeof presupuestoSchema>
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test
```
Expected: All 6 schema tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/gsap.ts src/lib/schemas.ts src/__tests__/lib/schemas.test.ts
git commit -m "feat: add GSAP config and presupuesto Zod schema"
```

---

### Task 5: UI primitives — Button, Card, Badge

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/__tests__/components/ui/Button.test.tsx`

- [ ] **Step 1: Write failing test for Button**

```tsx
// src/__tests__/components/ui/Button.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Enviar</Button>)
    expect(screen.getByText('Enviar')).toBeInTheDocument()
  })

  it('applies primary variant by default', () => {
    render(<Button>Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-[#2563EB]')
  })

  it('applies whatsapp variant', () => {
    render(<Button variant="whatsapp">WhatsApp</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-[#25D366]')
  })

  it('applies outline variant', () => {
    render(<Button variant="outline">Ver más</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')
  })

  it('passes through html button props', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

- [ ] **Step 2: Run to verify tests fail**

```bash
npm test
```
Expected: FAIL — `Cannot find module '@/components/ui/Button'`

- [ ] **Step 3: Create `src/components/ui/Button.tsx`**

```tsx
import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'whatsapp' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#1fba58] transition-colors',
  outline:
    'border border-[#BFDBFE] text-[#2563EB] bg-white hover:bg-[#EFF6FF] transition-colors',
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] text-sm font-bold',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Create `src/components/ui/Card.tsx`**

```tsx
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-[#E5EAF0] rounded-lg p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 5: Create `src/components/ui/Badge.tsx`**

```tsx
import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  className?: string
}

export function Badge({ label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]',
        'text-[10px] font-semibold px-2.5 py-1 rounded',
        className
      )}
    >
      {label}
    </span>
  )
}
```

- [ ] **Step 6: Run tests**

```bash
npm test
```
Expected: All 5 Button tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/ src/__tests__/components/
git commit -m "feat: add Button, Card, Badge UI primitives"
```

---

### Task 6: Layout components — Navbar, Footer, WhatsAppButton

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/WhatsAppButton.tsx`

- [ ] **Step 1: Create `src/components/layout/Navbar.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const navLinks = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/galeria', label: 'Galería' },
  { href: '/about', label: 'Sobre nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const pathname = usePathname()
  const waUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34600000000'
  )

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#F1F5F9]">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-[15px] font-black text-navy tracking-tight">
          P3D<span className="text-[#2563EB]">.</span>
        </Link>

        {/* Links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-navy'
                  : 'text-muted hover:text-navy'
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white text-sm font-bold px-4 py-2 rounded-[5px] hover:bg-[#1fba58] transition-colors"
          >
            💬 WhatsApp
          </a>
        </div>

        {/* Mobile: only WhatsApp CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden bg-[#25D366] text-white text-sm font-bold px-3 py-2 rounded-[5px]"
        >
          💬
        </a>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Create `src/components/layout/Footer.tsx`**

```tsx
import Link from 'next/link'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const serviciosLinks = ['Impresión FDM', 'Materiales', 'Acabados', 'Presupuesto']
const empresaLinks = [
  { label: 'Sobre nosotros', href: '/about' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Contacto', href: '/contacto' },
]

export function Footer() {
  const waUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34600000000'
  )
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="text-lg font-black tracking-tight mb-3">
              P3D<span className="text-[#2563EB]">.</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Impresión 3D local en<br />Badalona, Barcelona.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <div className="label-text mb-4">Servicios</div>
            <ul className="space-y-2">
              {serviciosLinks.map((s) => (
                <li key={s} className="text-xs text-muted">{s}</li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <div className="label-text mb-4">Empresa</div>
            <ul className="space-y-2">
              {empresaLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-muted hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <div className="label-text mb-4">Contacto</div>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  💬 WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_CONTACT ?? 'hola@print3dbadalona.com'}`} className="hover:text-white transition-colors">
                  ✉️ Email
                </a>
              </li>
              <li>📍 Badalona, Barcelona</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1E3A5F] pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted">
          <div className="flex gap-4">
            <span>© {year} Print3D Badalona</span>
            <Link href="/legal" className="hover:text-white transition-colors">Aviso legal</Link>
            <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
          <span>Hecho en Badalona 🇪🇸</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Create `src/components/layout/WhatsAppButton.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function WhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const waUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34600000000',
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? 'Hola! Me interesa la impresión 3D en Badalona.'
  )

  useGSAP(() => {
    const btn = buttonRef.current
    if (!btn) return

    // Entrance animation after 1.5s
    gsap.from(btn, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      delay: 1.5,
      ease: 'back.out(1.7)',
    })

    // Subtle pulse every 4s
    gsap.to(btn, {
      scale: 1.08,
      duration: 0.3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: 1,
      repeatDelay: 3.7,
      delay: 2.5,
    })
  })

  return (
    <a
      ref={buttonRef}
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-content-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <span className="text-2xl">💬</span>
    </a>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add Navbar, Footer, WhatsAppButton layout components"
```

---

### Task 7: Root layout

**Files:**
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Print3D Badalona — Impresión 3D local en Badalona',
    template: '%s | Print3D Badalona',
  },
  description:
    'Servicio de impresión 3D en Badalona. Prototipos, piezas técnicas y coleccionables. Recogida en persona o envío a domicilio. Respuesta en 24h.',
  keywords: [
    'impresión 3D Badalona',
    'impresión 3D Barcelona',
    'servicio impresión 3D',
    'prototipos 3D Badalona',
    'piezas PLA Barcelona',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Print3D Badalona',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Create `.env.local` from example**

```bash
cp .env.example .env.local
```

If `.env.example` doesn't exist, create it:

```env
# Email (Resend)
RESEND_API_KEY=re_xxxx
EMAIL_ADMIN=tu@email.com

# WhatsApp Business
NEXT_PUBLIC_WHATSAPP_NUMBER=34XXXXXXXXX
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola!+Me+interesa+la+impresión+3D+en+Badalona
NEXT_PUBLIC_EMAIL_CONTACT=hola@print3dbadalona.com

# Site
NEXT_PUBLIC_SITE_URL=https://print3dbadalona.com
```

- [ ] **Step 3: Start dev server and verify it compiles**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: page loads with Navbar and Footer visible. No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx .env.example
git commit -m "feat: add root layout with Inter font, Navbar, Footer, WhatsAppButton"
```

---

## BLOQUE 3 — Homepage y animaciones GSAP

### Task 8: HeroSection

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Create `src/components/sections/HeroSection.tsx`**

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const waUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34600000000'
  )

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from('.hero-label', { opacity: 0, y: 20 })
        .from('.hero-title', { opacity: 0, y: 24, duration: 0.6 }, '-=0.2')
        .from('.hero-body', { opacity: 0, y: 20 }, '-=0.3')
        .from('.hero-ctas > *', { opacity: 0, y: 16, stagger: 0.12 }, '-=0.2')
        .from(
          '.hero-stat',
          { opacity: 0, y: 12, stagger: 0.1, duration: 0.4 },
          '-=0.2'
        )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#EFF6FF] py-20 md:py-28"
    >
      {/* Decorative blob */}
      <div
        aria-hidden
        className="absolute -top-16 right-0 w-[300px] h-[300px] bg-[#BFDBFE] rounded-full opacity-20 blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="hero-label label-text block mb-4">
          📍 Badalona · Barcelona
        </span>

        <h1 className="hero-title text-[clamp(2.5rem,6vw,4rem)] font-black text-navy leading-[1.05] tracking-tight mb-6 max-w-2xl">
          Imprimimos<br />
          <span>lo que imaginas.</span>
        </h1>

        <p className="hero-body text-base md:text-lg font-medium text-[#475569] leading-relaxed mb-8 max-w-xl">
          Servicio local de impresión 3D en Badalona. Prototipos, piezas
          técnicas y coleccionables. Respuesta en 24h.
        </p>

        <div className="hero-ctas flex flex-wrap gap-3 mb-12">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-3 rounded-[5px] hover:bg-[#1fba58] transition-colors"
          >
            💬 Escríbenos por WhatsApp
          </a>
          <a
            href="/galeria"
            className="inline-flex items-center gap-2 border border-[#BFDBFE] text-[#2563EB] font-semibold px-5 py-3 rounded-[5px] bg-white hover:bg-[#EFF6FF] transition-colors"
          >
            Ver galería →
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 flex-wrap">
          <div className="hero-stat text-center">
            <div className="text-2xl font-black text-navy">24h</div>
            <div className="text-xs font-medium text-muted">respuesta</div>
          </div>
          <div className="w-px h-8 bg-[#E5EAF0]" />
          <div className="hero-stat text-center">
            <div className="text-2xl font-black text-navy">3+</div>
            <div className="text-xs font-medium text-muted">materiales</div>
          </div>
          <div className="w-px h-8 bg-[#E5EAF0]" />
          <div className="hero-stat text-center">
            <div className="text-2xl font-black text-navy">5★</div>
            <div className="text-xs font-medium text-muted">valoración</div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

With `npm run dev` running, open `http://localhost:3000` and add `<HeroSection />` temporarily to `src/app/page.tsx`:
```tsx
import { HeroSection } from '@/components/sections/HeroSection'
export default function Home() {
  return <HeroSection />
}
```
Expected: hero renders, staggered animation plays on load.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx src/app/page.tsx
git commit -m "feat: add HeroSection with GSAP stagger entrance"
```

---

### Task 9: PropuestaValorSection and ComoFuncionaSection

**Files:**
- Create: `src/components/sections/PropuestaValorSection.tsx`
- Create: `src/components/sections/ComoFuncionaSection.tsx`

- [ ] **Step 1: Create `src/components/sections/PropuestaValorSection.tsx`**

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Card } from '@/components/ui/Card'

const valores = [
  {
    icon: '⚡',
    titulo: 'Rápido',
    descripcion: 'Entrega en 24-48h para piezas estándar. Sin esperas innecesarias.',
  },
  {
    icon: '📍',
    titulo: 'Local',
    descripcion: 'Recoge en Badalona sin coste adicional. Sin esperar al mensajero.',
  },
  {
    icon: '💬',
    titulo: 'Cercano',
    descripcion: 'Hablamos por WhatsApp, sin formularios complicados. Trato directo.',
  },
]

export function PropuestaValorSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.valor-card', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.valor-grid',
          start: 'top 80%',
          once: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Por qué elegirnos</span>
        <h2 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-12">
          Local, rápido y de confianza.
        </h2>
        <div className="valor-grid grid md:grid-cols-3 gap-6">
          {valores.map((v) => (
            <Card key={v.titulo} className="valor-card p-6">
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="text-lg font-bold text-navy mb-2">{v.titulo}</h3>
              <p className="text-sm font-medium text-[#475569] leading-relaxed">
                {v.descripcion}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/sections/ComoFuncionaSection.tsx`**

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const steps = [
  {
    n: 1,
    titulo: 'Envías tu archivo o nos lo describes',
    desc: 'STL, OBJ, 3MF — o simplemente cuéntanos qué necesitas por WhatsApp.',
  },
  {
    n: 2,
    titulo: 'Confirmamos precio y plazo',
    desc: 'Respuesta en menos de 24h con presupuesto claro y sin sorpresas.',
  },
  {
    n: 3,
    titulo: 'Imprimimos tu pieza',
    desc: 'PLA, PETG, TPU y más. Te avisamos cuando esté lista.',
  },
  {
    n: 4,
    titulo: 'Recoges en Badalona o te lo enviamos',
    desc: 'Sin coste de recogida. Envío a domicilio con tracking incluido.',
  },
]

export function ComoFuncionaSection() {
  const containerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Draw the connector line
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // Pop each circle
      gsap.from('.step-circle', {
        scale: 0,
        opacity: 0,
        stagger: 0.25,
        duration: 0.4,
        ease: 'back.out(1.7)',
        delay: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // Fade step content
      gsap.from('.step-content', {
        opacity: 0,
        x: 16,
        stagger: 0.25,
        duration: 0.5,
        delay: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">El proceso</span>
        <h2 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-12">
          Cuatro pasos, sin complicaciones.
        </h2>

        <div className="relative max-w-xl">
          {/* Vertical connector line */}
          <div
            ref={lineRef}
            aria-hidden
            className="absolute left-5 top-8 bottom-8 w-px bg-[#E5EAF0]"
          />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div key={step.n} className="flex gap-5 items-start">
                <div
                  className={`step-circle relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-black ${
                    i === steps.length - 1 ? 'bg-navy' : 'bg-[#2563EB]'
                  }`}
                >
                  {step.n}
                </div>
                <div className="step-content pt-1">
                  <h3 className="text-base font-bold text-navy mb-1">
                    {step.titulo}
                  </h3>
                  <p className="text-sm font-medium text-[#475569] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/PropuestaValorSection.tsx src/components/sections/ComoFuncionaSection.tsx
git commit -m "feat: add PropuestaValor and ComoFunciona sections with ScrollTrigger"
```

---

### Task 10: ServiciosSection, GaleriaPreviewSection, TestimoniosSection, CTAFinalSection

**Files:**
- Create: `src/components/sections/ServiciosSection.tsx`
- Create: `src/components/sections/GaleriaPreviewSection.tsx`
- Create: `src/components/sections/TestimoniosSection.tsx`
- Create: `src/components/sections/CTAFinalSection.tsx`

- [ ] **Step 1: Create `src/components/sections/ServiciosSection.tsx`**

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

const servicios = [
  { icon: '🔩', titulo: 'Bajo demanda', desc: 'Prototipos y piezas únicas.' },
  { icon: '🔄', titulo: 'Pedidos recurrentes', desc: 'Para empresas y makers.' },
  { icon: '🎨', titulo: 'Acabados', desc: 'Lijado, pintado, soportes disolvibles.' },
]

export function ServiciosSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.servicio-card', {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        scrollTrigger: { trigger: '.servicios-grid', start: 'top 80%', once: true },
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Qué hacemos</span>
        <h2 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-12">
          Servicios de impresión 3D.
        </h2>
        <div className="servicios-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {servicios.map((s) => (
            <Card key={s.titulo} className="servicio-card p-5">
              <div className="text-2xl mb-3">{s.icon}</div>
              <h3 className="text-sm font-bold text-navy mb-1">{s.titulo}</h3>
              <p className="text-xs font-medium text-muted leading-relaxed">{s.desc}</p>
            </Card>
          ))}
          <Link href="/servicios">
            <Card className="servicio-card p-5 border-[#BFDBFE] bg-[#EFF6FF] h-full flex flex-col justify-center hover:bg-[#dbeafe] transition-colors">
              <p className="text-sm font-bold text-[#2563EB]">Ver todos →</p>
              <p className="text-xs text-muted mt-1">Materiales, precios y más</p>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/sections/GaleriaPreviewSection.tsx`**

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import Image from 'next/image'
import Link from 'next/link'

// Stock images from Unsplash (free, 3D printing related)
const preview = [
  { src: 'https://images.unsplash.com/photo-1611117775350-ac3950990985?w=400&q=80', alt: 'Pieza impresa en 3D' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', alt: 'Impresora 3D en proceso' },
  { src: 'https://images.unsplash.com/photo-1631544625787-ccb1a3ef22e2?w=400&q=80', alt: 'Detalle de pieza PLA' },
  { src: 'https://images.unsplash.com/photo-1631544824938-a6a1a4bf3d09?w=400&q=80', alt: 'Prototipo funcional' },
  { src: 'https://images.unsplash.com/photo-1644425934863-b39b42803af8?w=400&q=80', alt: 'Pieza decorativa impresa' },
]

export function GaleriaPreviewSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.galeria-item', {
        opacity: 0,
        scale: 0.95,
        stagger: 0.08,
        duration: 0.5,
        scrollTrigger: { trigger: '.galeria-grid', start: 'top 80%', once: true },
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Trabajos recientes</span>
        <h2 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-12">
          Lo que hemos imprimido.
        </h2>

        <div className="galeria-grid grid grid-cols-3 gap-3 mb-6">
          {preview.map((img, i) => (
            <div
              key={i}
              className="galeria-item relative aspect-square rounded-lg overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 20vw"
              />
            </div>
          ))}
          <Link href="/galeria" className="galeria-item">
            <div className="aspect-square rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center hover:bg-[#dbeafe] transition-colors">
              <div className="text-center">
                <div className="text-sm font-bold text-[#2563EB]">Ver todo →</div>
                <div className="text-xs text-muted mt-1">Galería completa</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `src/components/sections/TestimoniosSection.tsx`**

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Card } from '@/components/ui/Card'
import testimoniosData from '../../../content/testimonios/testimonios.json'
import type { Testimonio } from '@/types'

const testimonios = testimoniosData as Testimonio[]

export function TestimoniosSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.testimonio-card', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        scrollTrigger: { trigger: '.testimonios-grid', start: 'top 80%', once: true },
      })
    },
    { scope: containerRef }
  )

  // Show first 2 testimonials on home
  const featured = testimonios.slice(0, 2)

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Clientes</span>
        <h2 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-12">
          Lo que dicen de nosotros.
        </h2>
        <div className="testimonios-grid grid md:grid-cols-2 gap-6">
          {featured.map((t) => (
            <Card key={t.id} className="testimonio-card p-6">
              <div className="text-amber-400 text-sm mb-3">
                {'★'.repeat(t.valoracion)}
              </div>
              <p className="text-sm font-medium text-[#475569] leading-relaxed italic mb-4">
                "{t.texto}"
              </p>
              <p className="text-xs font-bold text-navy">
                {t.nombre} · {t.ciudad}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/components/sections/CTAFinalSection.tsx`**

```tsx
import Link from 'next/link'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function CTAFinalSection() {
  const waUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34600000000',
    '¡Hola! Tengo un proyecto de impresión 3D y me gustaría más información.'
  )

  return (
    <section className="py-16 md:py-24 bg-navy">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <span className="label-text block mb-4">¿Tienes un proyecto?</span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
          Cuéntanoslo ahora.
        </h2>
        <p className="text-base font-medium text-muted mb-10 max-w-md mx-auto">
          Respondemos en menos de 24h. Sin compromiso.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-[5px] hover:bg-[#1fba58] transition-colors"
          >
            💬 WhatsApp ahora
          </a>
          <Link
            href="/presupuesto"
            className="inline-flex items-center gap-2 border border-[#2563EB] text-white font-semibold px-6 py-3 rounded-[5px] hover:bg-[#1E3A5F] transition-colors"
          >
            Formulario de presupuesto
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/
git commit -m "feat: add Servicios, GaleriaPreview, Testimonios, CTAFinal sections"
```

---

### Task 11: Homepage — compose all sections

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write `src/app/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { PropuestaValorSection } from '@/components/sections/PropuestaValorSection'
import { ComoFuncionaSection } from '@/components/sections/ComoFuncionaSection'
import { ServiciosSection } from '@/components/sections/ServiciosSection'
import { GaleriaPreviewSection } from '@/components/sections/GaleriaPreviewSection'
import { TestimoniosSection } from '@/components/sections/TestimoniosSection'
import { CTAFinalSection } from '@/components/sections/CTAFinalSection'

export const metadata: Metadata = {
  title: 'Print3D Badalona — Impresión 3D local en Badalona',
  description:
    'Servicio de impresión 3D en Badalona. Recoge en persona o envío a domicilio. Respuesta en 24h.',
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <PropuestaValorSection />
      <ComoFuncionaSection />
      <ServiciosSection />
      <GaleriaPreviewSection />
      <TestimoniosSection />
      <CTAFinalSection />
    </>
  )
}
```

- [ ] **Step 2: Verify full homepage in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected:
- All 7 sections visible
- GSAP animations play on load (hero) and on scroll (rest)
- WhatsApp floating button appears after ~1.5s
- No console errors

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose homepage with all sections"
```

---

## BLOQUE 4 — Formulario y API

### Task 12: PresupuestoForm component

**Files:**
- Create: `src/components/forms/PresupuestoForm.tsx`

- [ ] **Step 1: Create `src/components/forms/PresupuestoForm.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { presupuestoSchema, type PresupuestoFormData } from '@/lib/schemas'
import { cn } from '@/lib/utils'

const MATERIALES = [
  { id: 'pla', label: 'PLA' },
  { id: 'petg', label: 'PETG' },
  { id: 'tpu', label: 'TPU' },
  { id: 'asa', label: 'ASA' },
] as const

type CantidadOpcion = '1' | '2-5' | 'mas5'

export function PresupuestoForm() {
  const [sinDetalles, setSinDetalles] = useState(false)
  const [cantidadOpcion, setCantidadOpcion] = useState<CantidadOpcion>('1')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    ok: boolean
    message: string
    waUrl?: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PresupuestoFormData>({
    resolver: zodResolver(presupuestoSchema),
    defaultValues: {
      sinDetalles: false,
      cantidad: 1,
      modalidad: 'recogida',
    },
  })

  const modalidad = watch('modalidad')

  function handleSinDetallesToggle() {
    const next = !sinDetalles
    setSinDetalles(next)
    setValue('sinDetalles', next)
  }

  function handleCantidadOpcion(op: CantidadOpcion) {
    setCantidadOpcion(op)
    if (op === '1') setValue('cantidad', 1)
    if (op === '2-5') setValue('cantidad', 2)
    if (op === 'mas5') setValue('cantidad', 6)
  }

  async function onSubmit(data: PresupuestoFormData) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          formData.append(k, String(v))
        }
      })

      const res = await fetch('/api/presupuesto', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()

      if (res.ok) {
        setSubmitResult({ ok: true, message: json.message, waUrl: json.waUrl })
      } else {
        setSubmitResult({ ok: false, message: json.error ?? 'Error al enviar' })
      }
    } catch {
      setSubmitResult({ ok: false, message: 'Error de conexión. Inténtalo de nuevo.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitResult?.ok) {
    return (
      <div className="bg-white border border-[#E5EAF0] rounded-xl p-8 text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-xl font-black text-navy mb-2">¡Recibido!</h2>
        <p className="text-sm font-medium text-[#475569] mb-6">{submitResult.message}</p>
        {submitResult.waUrl && (
          <a
            href={submitResult.waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-3 rounded-[5px] hover:bg-[#1fba58] transition-colors"
          >
            💬 Seguir por WhatsApp
          </a>
        )}
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-[#E5EAF0] rounded-xl overflow-hidden max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#F1F5F9]">
        <span className="label-text block mb-2">Solicitar presupuesto</span>
        <h1 className="text-xl font-black text-navy">Cuéntanos tu proyecto</h1>
        <p className="text-sm font-medium text-muted mt-1">
          Respondemos en menos de 24h. Sin compromiso.
        </p>
      </div>

      <div className="px-6 py-5 flex flex-col gap-5">
        {/* Toggle "no sé" */}
        <button
          type="button"
          onClick={handleSinDetallesToggle}
          className={cn(
            'flex items-center gap-3 p-3 rounded-lg border text-left transition-colors',
            sinDetalles
              ? 'bg-[#EFF6FF] border-[#2563EB]'
              : 'bg-surface border-[#E5EAF0]'
          )}
        >
          <div
            className={cn(
              'w-9 h-5 rounded-full relative transition-colors flex-shrink-0',
              sinDetalles ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
            )}
          >
            <div
              className={cn(
                'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                sinDetalles ? 'translate-x-4' : 'translate-x-0.5'
              )}
            />
          </div>
          <div>
            <p className={cn('text-sm font-bold', sinDetalles ? 'text-[#1D4ED8]' : 'text-navy')}>
              No tengo claro los detalles técnicos
            </p>
            <p className="text-xs text-muted">Solo cuéntanos qué quieres, nosotros te asesoramos</p>
          </div>
        </button>

        {sinDetalles && (
          <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-3 text-xs text-[#92400E] leading-relaxed">
            💡 No te preocupes por el material ni la cantidad. Cuéntanos qué quieres conseguir y te recomendamos lo mejor para tu proyecto.
          </div>
        )}

        {/* Nombre + Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-1.5">
              Nombre *
            </label>
            <input
              {...register('nombre')}
              placeholder="Tu nombre"
              className={cn(
                'w-full border rounded-[5px] px-3 py-2 text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]',
                errors.nombre ? 'border-red-400' : 'border-[#E5EAF0]'
              )}
            />
            {errors.nombre && (
              <p className="text-xs text-red-500 mt-1">{errors.nombre.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-1.5">
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="tu@email.com"
              className={cn(
                'w-full border rounded-[5px] px-3 py-2 text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]',
                errors.email ? 'border-red-400' : 'border-[#E5EAF0]'
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-1.5">
            Teléfono / WhatsApp
          </label>
          <input
            {...register('telefono')}
            placeholder="+34 6XX XXX XXX (opcional)"
            className="w-full border border-[#E5EAF0] rounded-[5px] px-3 py-2 text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-1.5">
            {sinDetalles ? '¿Qué necesitas? *' : 'Descripción del proyecto *'}
          </label>
          <textarea
            {...register('descripcion')}
            rows={3}
            placeholder={
              sinDetalles
                ? 'Ej: "quiero una pieza para sujetar mi teléfono en la bici"'
                : '¿Qué necesitas imprimir?'
            }
            className={cn(
              'w-full border rounded-[5px] px-3 py-2 text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] resize-none',
              errors.descripcion ? 'border-red-400' : 'border-[#E5EAF0]'
            )}
          />
          {errors.descripcion && (
            <p className="text-xs text-red-500 mt-1">{errors.descripcion.message}</p>
          )}
        </div>

        {/* Material + Cantidad — only if sinDetalles is false */}
        {!sinDetalles && (
          <>
            <div>
              <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-2">
                Material *
              </label>
              <div className="flex gap-2 flex-wrap">
                {MATERIALES.map((m) => (
                  <label key={m.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={m.id}
                      {...register('material')}
                      className="sr-only"
                    />
                    <span className="inline-block bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] text-xs font-semibold px-3 py-1.5 rounded has-[:checked]:bg-[#2563EB] has-[:checked]:text-white has-[:checked]:border-[#2563EB] transition-colors">
                      {m.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.material && (
                <p className="text-xs text-red-500 mt-1">{errors.material.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-2">
                Cantidad *
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {(['1', '2-5', 'mas5'] as CantidadOpcion[]).map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => handleCantidadOpcion(op)}
                    className={cn(
                      'text-xs font-semibold px-3 py-1.5 rounded border transition-colors',
                      cantidadOpcion === op
                        ? 'bg-[#2563EB] text-white border-[#2563EB]'
                        : 'bg-white text-[#475569] border-[#E5EAF0] hover:border-[#BFDBFE]'
                    )}
                  >
                    {op === 'mas5' ? '+5' : op}
                  </button>
                ))}
                {cantidadOpcion === 'mas5' && (
                  <input
                    type="number"
                    min={6}
                    placeholder="¿Cuántas?"
                    onChange={(e) => setValue('cantidadExacta', parseInt(e.target.value))}
                    className="w-24 border border-[#2563EB] bg-[#EFF6FF] rounded-[5px] px-3 py-1.5 text-sm text-navy focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                  />
                )}
              </div>
            </div>
          </>
        )}

        {/* Modalidad */}
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-2">
            Modalidad de entrega *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['recogida', 'envio'] as const).map((op) => (
              <label key={op} className="cursor-pointer">
                <input
                  type="radio"
                  value={op}
                  {...register('modalidad')}
                  className="sr-only"
                />
                <div
                  className={cn(
                    'border rounded-[5px] p-3 text-center transition-colors',
                    modalidad === op
                      ? 'border-[#2563EB] bg-[#EFF6FF]'
                      : 'border-[#E5EAF0] hover:border-[#BFDBFE]'
                  )}
                >
                  <div className="text-lg mb-1">{op === 'recogida' ? '📍' : '🚚'}</div>
                  <div className={cn('text-xs font-bold', modalidad === op ? 'text-[#1D4ED8]' : 'text-navy')}>
                    {op === 'recogida' ? 'Recogida' : 'Envío'}
                  </div>
                  <div className="text-[10px] text-muted">
                    {op === 'recogida' ? 'Badalona' : 'Península'}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Archivo */}
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-2">
            Archivo (opcional)
          </label>
          <div className="border-2 border-dashed border-[#BFDBFE] rounded-[5px] p-4 text-center bg-[#F8FAFF]">
            <div className="text-xl mb-1">📎</div>
            <input
              type="file"
              accept=".stl,.obj,.3mf"
              className="hidden"
              id="archivo-upload"
              {...register('archivo')}
            />
            <label htmlFor="archivo-upload" className="cursor-pointer">
              <span className="text-xs font-semibold text-[#2563EB]">
                Arrastra o selecciona archivo
              </span>
              <p className="text-[10px] text-muted mt-0.5">STL · OBJ · 3MF · max 50MB</p>
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#25D366] text-white font-black py-3 rounded-[5px] hover:bg-[#1fba58] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : '💬 Enviar y recibir respuesta'}
        </button>

        <p className="text-[10px] text-muted text-center leading-relaxed">
          Al enviar aceptas nuestra{' '}
          <a href="/privacidad" className="text-[#2563EB] hover:underline">
            Política de privacidad
          </a>
          . Nunca compartimos tus datos con terceros.
        </p>
      </div>
    </form>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/forms/PresupuestoForm.tsx
git commit -m "feat: add PresupuestoForm with toggle sinDetalles and conditional quantity"
```

---

### Task 13: API route — /api/presupuesto

**Files:**
- Create: `src/app/api/presupuesto/route.ts`

- [ ] **Step 1: Create `src/app/api/presupuesto/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { presupuestoSchema } from '@/lib/schemas'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const raw = {
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      telefono: formData.get('telefono') || undefined,
      descripcion: formData.get('descripcion'),
      sinDetalles: formData.get('sinDetalles') === 'true',
      material: formData.get('material') || undefined,
      cantidad: formData.get('cantidad') ? Number(formData.get('cantidad')) : undefined,
      cantidadExacta: formData.get('cantidadExacta')
        ? Number(formData.get('cantidadExacta'))
        : undefined,
      modalidad: formData.get('modalidad'),
      fechaDeseada: formData.get('fechaDeseada') || undefined,
    }

    const parsed = presupuestoSchema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos no válidos', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const cantidadDisplay = data.cantidadExacta ?? data.cantidad ?? '—'
    const adminEmail = process.env.EMAIL_ADMIN!
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://print3dbadalona.com'

    // Email to admin
    await resend.emails.send({
      from: `Print3D Badalona <presupuestos@${new URL(siteUrl).hostname}>`,
      to: adminEmail,
      subject: `Nuevo presupuesto de ${data.nombre}`,
      html: `
        <h2>Nuevo presupuesto recibido</h2>
        <table cellpadding="8">
          <tr><td><strong>Nombre</strong></td><td>${data.nombre}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Teléfono</strong></td><td>${data.telefono ?? '—'}</td></tr>
          <tr><td><strong>Descripción</strong></td><td>${data.descripcion}</td></tr>
          <tr><td><strong>Sin detalles</strong></td><td>${data.sinDetalles ? 'Sí' : 'No'}</td></tr>
          <tr><td><strong>Material</strong></td><td>${data.material ?? '—'}</td></tr>
          <tr><td><strong>Cantidad</strong></td><td>${cantidadDisplay}</td></tr>
          <tr><td><strong>Modalidad</strong></td><td>${data.modalidad}</td></tr>
        </table>
      `,
    })

    // Confirmation email to client
    await resend.emails.send({
      from: `Print3D Badalona <hola@${new URL(siteUrl).hostname}>`,
      to: data.email,
      subject: '¡Hemos recibido tu presupuesto! — Print3D Badalona',
      html: `
        <h2>¡Gracias, ${data.nombre}!</h2>
        <p>Hemos recibido tu solicitud y te responderemos en menos de <strong>24 horas</strong>.</p>
        <p>Si tienes prisa, escríbenos directamente por WhatsApp.</p>
        <p style="margin-top:24px;">
          <a href="${buildWhatsAppUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '', `Hola! Soy ${data.nombre}, acabo de enviar un presupuesto`)}"
             style="background:#25D366;color:white;padding:12px 20px;border-radius:5px;text-decoration:none;font-weight:bold;">
            💬 Escribir por WhatsApp
          </a>
        </p>
        <p style="margin-top:32px;font-size:12px;color:#64748B;">
          Print3D Badalona · Badalona, Barcelona
        </p>
      `,
    })

    // Build WhatsApp URL for redirect
    const waMessage = `Hola! Soy ${data.nombre} y acabo de enviar un presupuesto desde la web. Mi proyecto: ${data.descripcion}`
    const waUrl = buildWhatsAppUrl(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
      waMessage
    )

    return NextResponse.json({
      success: true,
      message: 'Presupuesto recibido. Te responderemos en menos de 24h.',
      waUrl,
    })
  } catch (err) {
    console.error('[api/presupuesto]', err)
    return NextResponse.json(
      { error: 'Error interno. Por favor inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Add `next.config.js` image domains for Unsplash**

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/presupuesto/route.ts next.config.js
git commit -m "feat: add presupuesto API route with Resend email and WhatsApp redirect"
```

---

### Task 14: /presupuesto page

**Files:**
- Create: `src/app/presupuesto/page.tsx`

- [ ] **Step 1: Create `src/app/presupuesto/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { PresupuestoForm } from '@/components/forms/PresupuestoForm'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Solicitar presupuesto',
  description:
    'Solicita un presupuesto para tu proyecto de impresión 3D en Badalona. Respuesta en menos de 24h.',
}

export default function PresupuestoPage() {
  const waUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34600000000',
    '¡Hola! Quiero un presupuesto para impresión 3D.'
  )

  return (
    <div className="min-h-screen bg-surface py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="label-text block mb-3">Presupuesto</span>
          <h1 className="text-4xl font-black text-navy tracking-tight mb-4">
            ¿Tienes un proyecto?
          </h1>
          <p className="text-base font-medium text-[#475569] max-w-md mx-auto">
            Rellena el formulario o escríbenos directamente por WhatsApp. Respondemos en menos de 24h.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-[#25D366] hover:underline"
          >
            💬 O escríbenos directamente por WhatsApp →
          </a>
        </div>
        <PresupuestoForm />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Test the form end-to-end**

With `RESEND_API_KEY` set in `.env.local`:
1. Open `http://localhost:3000/presupuesto`
2. Fill all required fields
3. Submit
4. Expected: success screen with WhatsApp link, email arrives in admin inbox

- [ ] **Step 3: Commit**

```bash
git add src/app/presupuesto/
git commit -m "feat: add presupuesto page"
```

---

## BLOQUE 5 — Resto de páginas

### Task 15: /servicios page

**Files:**
- Create: `src/app/servicios/page.tsx`

- [ ] **Step 1: Create `src/app/servicios/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { CTAFinalSection } from '@/components/sections/CTAFinalSection'
import materialesData from '../../../content/servicios/materiales.json'
import type { Material } from '@/types'

export const metadata: Metadata = {
  title: 'Servicios de impresión 3D',
  description:
    'Impresión FDM bajo demanda y pedidos recurrentes. PLA, PETG, TPU, ASA. Precios orientativos y tiempos de entrega en Badalona.',
}

const materiales = materialesData as Material[]

const precioLabel: Record<Material['precio'], string> = {
  económico: '€',
  medio: '€€',
  'medio-alto': '€€€',
  alto: '€€€€',
}

export default function ServiciosPage() {
  return (
    <>
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="label-text block mb-3">Servicios</span>
          <h1 className="text-4xl md:text-5xl font-black text-navy tracking-tight mb-6">
            Impresión 3D en Badalona.
          </h1>
          <p className="text-base font-medium text-[#475569] max-w-2xl mb-16 leading-relaxed">
            Ofrecemos impresión FDM para prototipos, piezas funcionales y coleccionables. Pedidos únicos o recurrentes para empresas y makers.
          </p>

          {/* Materiales */}
          <span className="label-text block mb-6">Materiales disponibles</span>
          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {materiales.map((m) => (
              <Card key={m.id} className={`p-6 ${!m.disponible ? 'opacity-50' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-black text-navy">{m.nombre}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2563EB]">{precioLabel[m.precio]}</span>
                    {!m.disponible && (
                      <span className="text-xs text-muted bg-[#F1F5F9] px-2 py-0.5 rounded">Próximamente</span>
                    )}
                  </div>
                </div>
                <p className="text-sm font-medium text-[#475569] leading-relaxed mb-4">
                  {m.descripcion}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {m.usos.map((uso) => (
                    <Badge key={uso} label={uso} className="text-[10px]" />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-surface rounded p-2">
                    <span className="text-muted">Temp. máx.</span>
                    <div className="font-bold text-navy">{m.resistenciaTermica}</div>
                  </div>
                  <div className="bg-surface rounded p-2">
                    <span className="text-muted">Resistencia</span>
                    <div className="font-bold text-navy">{m.resistenciaMecanica}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Precios orientativos */}
          <span className="label-text block mb-6">Precios orientativos</span>
          <Card className="p-6 mb-4">
            <p className="text-sm font-medium text-[#475569] leading-relaxed">
              Los precios dependen del material, el volumen de la pieza, el tiempo de impresión y la complejidad.
              Envíanos tu archivo o descríbenos tu proyecto y te damos un presupuesto exacto sin compromiso.
            </p>
          </Card>
          <p className="text-xs text-muted">
            * Los precios mostrados son orientativos. El presupuesto final se confirma tras revisar el archivo.
          </p>
        </div>
      </div>
      <CTAFinalSection />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/servicios/
git commit -m "feat: add servicios page with materiales grid"
```

---

### Task 16: /galeria page

**Files:**
- Create: `src/app/galeria/page.tsx`
- Create: `src/components/sections/GalleryGrid.tsx`

- [ ] **Step 1: Create gallery data file `content/galeria/piezas.json`**

```json
[
  { "id": "g1", "titulo": "Soporte bici", "categoria": "hogar", "material": "petg", "imagen": "https://images.unsplash.com/photo-1611117775350-ac3950990985?w=600&q=80", "destacado": true },
  { "id": "g2", "titulo": "Figura decorativa", "categoria": "decoracion", "material": "pla", "imagen": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", "destacado": true },
  { "id": "g3", "titulo": "Prototipo industrial", "categoria": "prototipos", "material": "petg", "imagen": "https://images.unsplash.com/photo-1631544625787-ccb1a3ef22e2?w=600&q=80" },
  { "id": "g4", "titulo": "Pieza técnica", "categoria": "industrial", "material": "asa", "imagen": "https://images.unsplash.com/photo-1631544824938-a6a1a4bf3d09?w=600&q=80" },
  { "id": "g5", "titulo": "Miniatura coleccionable", "categoria": "coleccionables", "material": "pla", "imagen": "https://images.unsplash.com/photo-1644425934863-b39b42803af8?w=600&q=80" },
  { "id": "g6", "titulo": "Organizador hogar", "categoria": "hogar", "material": "pla", "imagen": "https://images.unsplash.com/photo-1611117775350-ac3950990985?w=600&q=80" }
]
```

- [ ] **Step 2: Create `src/components/sections/GalleryGrid.tsx`**

```tsx
'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import Image from 'next/image'
import type { PiezaGaleria, CategoriaGaleria } from '@/types'

const CATEGORIAS: { id: CategoriaGaleria; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'decoracion', label: 'Decoración' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'prototipos', label: 'Prototipos' },
  { id: 'coleccionables', label: 'Coleccionables' },
  { id: 'hogar', label: 'Hogar' },
]

interface GalleryGridProps {
  piezas: PiezaGaleria[]
}

export function GalleryGrid({ piezas }: GalleryGridProps) {
  const [categoria, setCategoria] = useState<CategoriaGaleria>('todos')
  const [selected, setSelected] = useState<PiezaGaleria | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered =
    categoria === 'todos' ? piezas : piezas.filter((p) => p.categoria === categoria)

  useGSAP(
    () => {
      gsap.from('.gallery-item', {
        opacity: 0,
        scale: 0.95,
        stagger: 0.06,
        duration: 0.4,
      })
    },
    { scope: gridRef, dependencies: [categoria] }
  )

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategoria(c.id)}
            className={`text-xs font-semibold px-3 py-1.5 rounded border transition-colors ${
              categoria === c.id
                ? 'bg-[#2563EB] text-white border-[#2563EB]'
                : 'bg-white text-[#475569] border-[#E5EAF0] hover:border-[#BFDBFE]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((pieza) => (
          <button
            key={pieza.id}
            onClick={() => setSelected(pieza)}
            className="gallery-item relative aspect-square rounded-lg overflow-hidden group text-left"
          >
            <Image
              src={pieza.imagen}
              alt={pieza.titulo}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors flex items-end p-3">
              <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                {pieza.titulo}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-navy/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={selected.imagen}
                alt={selected.titulo}
                fill
                className="object-cover"
                sizes="512px"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-black text-navy mb-1">{selected.titulo}</h3>
              <div className="flex gap-2">
                <span className="text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded uppercase">
                  {selected.material}
                </span>
                <span className="text-xs font-semibold text-muted bg-surface border border-[#E5EAF0] px-2 py-0.5 rounded">
                  {selected.categoria}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-navy font-black shadow"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 3: Create `src/app/galeria/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { CTAFinalSection } from '@/components/sections/CTAFinalSection'
import piezasData from '../../../content/galeria/piezas.json'
import type { PiezaGaleria } from '@/types'

export const metadata: Metadata = {
  title: 'Galería de trabajos',
  description:
    'Galería de piezas impresas en 3D en Badalona. Decoración, prototipos, industrial, coleccionables y más.',
}

const piezas = piezasData as PiezaGaleria[]

export default function GaleriaPage() {
  return (
    <>
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="label-text block mb-3">Galería</span>
          <h1 className="text-4xl md:text-5xl font-black text-navy tracking-tight mb-4">
            Lo que hemos imprimido.
          </h1>
          <p className="text-base font-medium text-[#475569] mb-12">
            Piezas reales para clientes reales. Haz clic para ampliar.
          </p>
          <GalleryGrid piezas={piezas} />
        </div>
      </div>
      <CTAFinalSection />
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add content/galeria/ src/components/sections/GalleryGrid.tsx src/app/galeria/
git commit -m "feat: add galeria page with category filters and modal"
```

---

### Task 17: /contacto and /about pages

**Files:**
- Create: `src/app/contacto/page.tsx`
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create `src/app/contacto/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacta con Print3D Badalona por WhatsApp, email o visítanos en Badalona. Respondemos en menos de 24h.',
}

export default function ContactoPage() {
  const waUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34600000000',
    '¡Hola! Quiero información sobre impresión 3D.'
  )

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Contacto</span>
        <h1 className="text-4xl font-black text-navy tracking-tight mb-4">
          Hablemos.
        </h1>
        <p className="text-base font-medium text-[#475569] mb-12">
          Estamos en Badalona y respondemos rápido. Elige el canal que prefieras.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <Card className="p-6 hover:border-[#25D366] transition-colors group">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-base font-black text-navy mb-1 group-hover:text-[#166534]">WhatsApp</h3>
              <p className="text-sm font-medium text-muted">Canal principal. Respuesta rápida.</p>
            </Card>
          </a>

          <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_CONTACT ?? 'hola@print3dbadalona.com'}`}>
            <Card className="p-6 hover:border-[#2563EB] transition-colors group">
              <div className="text-3xl mb-3">✉️</div>
              <h3 className="text-base font-black text-navy mb-1 group-hover:text-[#2563EB]">Email</h3>
              <p className="text-sm font-medium text-muted">
                {process.env.NEXT_PUBLIC_EMAIL_CONTACT ?? 'hola@print3dbadalona.com'}
              </p>
            </Card>
          </a>

          <Card className="p-6">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="text-base font-black text-navy mb-1">Ubicación</h3>
            <p className="text-sm font-medium text-muted">Badalona, Barcelona</p>
            <p className="text-xs text-muted mt-1">Recogida en persona disponible</p>
          </Card>

          <Card className="p-6">
            <div className="text-3xl mb-3">🕐</div>
            <h3 className="text-base font-black text-navy mb-1">Horario</h3>
            <p className="text-sm font-medium text-muted">Lun–Vie · 9:00–20:00</p>
            <p className="text-xs text-muted mt-1">Respuesta en menos de 24h</p>
          </Card>
        </div>

        {/* Google Maps placeholder */}
        <div className="w-full h-64 bg-surface rounded-xl border border-[#E5EAF0] flex items-center justify-center">
          <p className="text-sm text-muted">📍 Mapa — Badalona, Barcelona</p>
        </div>
        <p className="text-xs text-muted mt-2">
          * Dirección exacta se confirma al solicitar recogida.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/app/about/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { Card } from '@/components/ui/Card'
import { CTAFinalSection } from '@/components/sections/CTAFinalSection'

export const metadata: Metadata = {
  title: 'Sobre nosotros',
  description:
    'Conoce Print3D Badalona. Servicio local de impresión 3D hecho por makers para makers.',
}

const equipos = [
  { nombre: 'Bambu Lab X1C', material: 'PLA, PETG, TPU, ASA', velocidad: 'Alta' },
  { nombre: 'Prusa MK4', material: 'PLA, PETG, TPU', velocidad: 'Estándar' },
]

export default function AboutPage() {
  return (
    <>
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="label-text block mb-3">Sobre nosotros</span>
          <h1 className="text-4xl md:text-5xl font-black text-navy tracking-tight mb-6">
            Makers de Badalona.
          </h1>
          <p className="text-base font-medium text-[#475569] leading-relaxed max-w-2xl mb-16">
            Somos un servicio local de impresión 3D nacido en Badalona. Empezamos imprimiendo piezas para nuestros propios proyectos y acabamos ayudando a vecinos, empresas y makers de toda Barcelona. Hecho cerca, hecho bien.
          </p>

          {/* Equipos */}
          <span className="label-text block mb-6">Nuestros equipos</span>
          <div className="grid md:grid-cols-2 gap-4 mb-16">
            {equipos.map((e) => (
              <Card key={e.nombre} className="p-5">
                <h3 className="text-base font-black text-navy mb-2">{e.nombre}</h3>
                <div className="text-sm font-medium text-[#475569] space-y-1">
                  <p><span className="text-muted">Materiales:</span> {e.material}</p>
                  <p><span className="text-muted">Velocidad:</span> {e.velocidad}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Por qué local */}
          <span className="label-text block mb-6">Por qué local</span>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '⚡', txt: 'Sin tiempos de envío desde fábricas lejanas. Recogida el mismo día en muchos casos.' },
              { icon: '💬', txt: 'Hablamos tu idioma. Puedes describirnos el proyecto en persona o por WhatsApp.' },
              { icon: '🔁', txt: 'Fácil de repetir. Si necesitas más piezas, ya tenemos tu historial.' },
            ].map((item, i) => (
              <Card key={i} className="p-5">
                <div className="text-2xl mb-3">{item.icon}</div>
                <p className="text-sm font-medium text-[#475569] leading-relaxed">{item.txt}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <CTAFinalSection />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/contacto/ src/app/about/
git commit -m "feat: add contacto and about pages"
```

---

## BLOQUE 6 — SEO y deploy

### Task 18: JSON-LD LocalBusiness schema + per-page metadata

**Files:**
- Create: `src/components/JsonLd.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/components/JsonLd.tsx`**

```tsx
export function JsonLdLocalBusiness() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Print3D Badalona',
    description:
      'Servicio de impresión 3D en Badalona. Recogida en persona o envío a domicilio.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://print3dbadalona.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Badalona',
      addressRegion: 'Barcelona',
      addressCountry: 'ES',
    },
    areaServed: ['Badalona', 'Barcelona', 'Maresme'],
    serviceType: 'Impresión 3D',
    openingHours: 'Mo-Fr 09:00-20:00',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

- [ ] **Step 2: Add JsonLd to root layout**

In `src/app/layout.tsx`, inside `<head>` or after `<body>` opening, add:
```tsx
import { JsonLdLocalBusiness } from '@/components/JsonLd'

// Inside <html>/<body>:
<JsonLdLocalBusiness />
```

Full updated `<body>` in layout.tsx:
```tsx
<body>
  <JsonLdLocalBusiness />
  <Navbar />
  <main>{children}</main>
  <Footer />
  <WhatsAppButton />
</body>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/JsonLd.tsx src/app/layout.tsx
git commit -m "feat: add JSON-LD LocalBusiness schema"
```

---

### Task 19: Sitemap, robots.txt, and .gitignore

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://print3dbadalona.com'

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/servicios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/galeria`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/presupuesto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}
```

- [ ] **Step 2: Create `src/app/robots.ts`**

```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://print3dbadalona.com'
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
  }
}
```

- [ ] **Step 3: Update `.gitignore`**

Append to `.gitignore`:
```
# Superpowers brainstorm sessions
.superpowers/

# Environment
.env.local
.env.*.local

# Next.js
.next/
out/

# Node
node_modules/
```

- [ ] **Step 4: Run build to verify no errors**

```bash
npm run build
```

Expected: build completes successfully with no TypeScript errors.

- [ ] **Step 5: Run full test suite**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 6: Final commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts .gitignore
git commit -m "feat: add sitemap, robots.txt, update .gitignore"
```

---

## Checklist de verificación final

Antes de hacer deploy en Vercel:

- [ ] `npm run build` sin errores
- [ ] `npm test` todos los tests en verde
- [ ] `.env.local` con todas las variables rellenas
- [ ] Variables de entorno configuradas en Vercel
- [ ] WhatsApp flotante aparece en todas las páginas
- [ ] Formulario de presupuesto envía email correctamente
- [ ] Animaciones GSAP funcionan en móvil
- [ ] Imágenes de Unsplash cargan correctamente
- [ ] Navbar sticky funciona en scroll
- [ ] Metadata y Open Graph correctos (verificar con https://opengraph.xyz)
