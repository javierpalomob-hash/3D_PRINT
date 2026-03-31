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
