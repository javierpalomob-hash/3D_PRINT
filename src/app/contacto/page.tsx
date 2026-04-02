import type { Metadata } from 'next'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacta con Print3D Badalona por WhatsApp, email o visítanos en Badalona. Respondemos en menos de 24h.',
  openGraph: {
    title: 'Contacto — Print3D Badalona',
    description: 'Contacta con Print3D Badalona por WhatsApp, email o visítanos en Badalona. Respondemos en menos de 24h.',
    url: 'https://print3dbadalona.com/contacto',
  },
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

          <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_CONTACT ?? 'info@print3dbadalona.com'}`}>
            <Card className="p-6 hover:border-[#2563EB] transition-colors group">
              <div className="text-3xl mb-3">✉️</div>
              <h3 className="text-base font-black text-navy mb-1 group-hover:text-[#2563EB]">Email</h3>
              <p className="text-sm font-medium text-muted">
                {process.env.NEXT_PUBLIC_EMAIL_CONTACT ?? 'info@print3dbadalona.com'}
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

        <div className="w-full overflow-hidden rounded-xl border border-[#E5EAF0]">
          <iframe
            src="https://maps.google.com/maps?q=Badalona,+Barcelona,+Spain&z=14&output=embed"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de Badalona, Barcelona"
          />
        </div>
        <p className="text-xs text-muted mt-2">
          * Dirección exacta se confirma al solicitar recogida.
        </p>
      </div>
    </div>
  )
}
