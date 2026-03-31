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
