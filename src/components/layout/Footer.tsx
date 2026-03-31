import Link from 'next/link'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const serviciosLinks = [
  { label: 'Impresión FDM', href: '/servicios' },
  { label: 'Materiales', href: '/servicios#materiales' },
  { label: 'Acabados', href: '/servicios#acabados' },
  { label: 'Presupuesto', href: '/presupuesto' },
]
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
                <li key={s.href}>
                  <Link href={s.href} className="text-xs text-muted hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
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
