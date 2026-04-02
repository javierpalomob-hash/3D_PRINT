'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const navLinks = [
  { href: '/servicios', label: 'Servicios', title: 'Ver servicios de impresión 3D en Badalona' },
  { href: '/galeria', label: 'Galería', title: 'Ver galería de trabajos impresos en 3D' },
  { href: '/about', label: 'Sobre nosotros', title: 'Conoce el equipo de Print3D Badalona' },
  { href: '/contacto', label: 'Contacto', title: 'Contactar con Print3D Badalona' },
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
        <Link href="/" title="Print3D Badalona — Inicio">
          <Image src="/logo.png" alt="Print3D Badalona" width={140} height={40} className="h-9 w-auto" priority />
        </Link>

        {/* Links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={link.title}
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
            title="Escribir a Print3D Badalona por WhatsApp"
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
          title="Escribir a Print3D Badalona por WhatsApp"
          className="md:hidden bg-[#25D366] text-white text-sm font-bold px-3 py-2 rounded-[5px]"
        >
          💬
        </a>
      </nav>
    </header>
  )
}
