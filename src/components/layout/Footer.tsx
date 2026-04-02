import Link from 'next/link'
import Image from 'next/image'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const serviciosLinks = [
  { label: 'Impresión FDM', href: '/servicios', title: 'Ver servicios de impresión FDM en Badalona' },
  { label: 'Materiales', href: '/servicios#materiales', title: 'Ver materiales disponibles: PLA, PETG, TPU, ASA' },
  { label: 'Acabados', href: '/servicios#acabados', title: 'Ver acabados y opciones de post-procesado' },
  { label: 'Presupuesto', href: '/presupuesto', title: 'Solicitar presupuesto de impresión 3D' },
]
const empresaLinks = [
  { label: 'Sobre nosotros', href: '/about', title: 'Conoce el equipo de Print3D Badalona' },
  { label: 'Galería', href: '/galeria', title: 'Ver galería de trabajos impresos en 3D' },
  { label: 'Contacto', href: '/contacto', title: 'Contactar con Print3D Badalona' },
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
            <div className="mb-3">
              <Image src="/logo.png" alt="Print3D Badalona" width={120} height={34} className="h-8 w-auto brightness-0 invert" />
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
                  <Link href={s.href} title={s.title} className="text-xs text-muted hover:text-white transition-colors">
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
                  <Link href={l.href} title={l.title} className="text-xs text-muted hover:text-white transition-colors">
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
                <a href={waUrl} target="_blank" rel="noopener noreferrer" title="Escribir a Print3D Badalona por WhatsApp" className="hover:text-white transition-colors">
                  💬 WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_CONTACT ?? 'hola@print3dbadalona.com'}`} title="Enviar email a Print3D Badalona" className="hover:text-white transition-colors">
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
            <Link href="/aviso-legal" title="Aviso legal de Print3D Badalona" className="hover:text-white transition-colors">Aviso legal</Link>
            <Link href="/privacidad" title="Política de privacidad de Print3D Badalona" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/cookies" title="Política de cookies de Print3D Badalona" className="hover:text-white transition-colors">Cookies</Link>
          </div>
          <span>Hecho en Badalona 🇪🇸</span>
        </div>
      </div>
    </footer>
  )
}
