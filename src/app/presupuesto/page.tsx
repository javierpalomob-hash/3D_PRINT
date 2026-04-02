import type { Metadata } from 'next'
import { PresupuestoForm } from '@/components/forms/PresupuestoForm'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Solicitar presupuesto',
  description:
    'Solicita un presupuesto para tu proyecto de impresión 3D en Badalona. Respuesta en menos de 24h.',
  openGraph: {
    title: 'Solicitar presupuesto — Print3D Badalona',
    description: 'Solicita un presupuesto para tu proyecto de impresión 3D en Badalona. Respuesta en menos de 24h.',
    url: 'https://print3dbadalona.com/presupuesto',
  },
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
