import type { Metadata } from 'next'
import Link from 'next/link'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Presupuesto recibido',
  description: 'Hemos recibido tu solicitud de presupuesto. Te responderemos en menos de 24 horas.',
  robots: 'noindex',
}

export default function GraciasPage() {
  const waUrl = buildWhatsAppUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '')

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-24 px-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-6">✅</div>
        <h1 className="text-3xl font-black text-navy mb-3">Solicitud enviada</h1>
        <p className="text-[#475569] mb-8">
          Hemos recibido tu presupuesto y te responderemos en menos de 24 horas.
          Si tienes prisa, escríbenos por WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white font-bold px-6 py-3 rounded-[5px] hover:bg-[#1fba58] transition-colors"
          >
            Escribir por WhatsApp
          </a>
          <Link
            href="/"
            className="border border-[#E5EAF0] text-navy font-bold px-6 py-3 rounded-[5px] hover:border-[#2563EB] transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
