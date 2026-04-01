import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de Print3D Badalona.',
}

export default function CookiesPage() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Legal</span>
        <h1 className="text-4xl font-black text-navy tracking-tight mb-2">
          Política de Cookies
        </h1>
        <p className="text-xs text-muted mb-12">Última actualización: abril 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-[#475569]">

          <section>
            <h2 className="text-lg font-black text-navy mb-3">¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas. Se utilizan para que el sitio funcione correctamente, recordar tus preferencias y, en algunos casos, analizar cómo se usa el sitio.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">Cookies que utilizamos</h2>

            <h3 className="text-base font-bold text-navy mt-4 mb-2">Necesarias (siempre activas)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="border border-[#E5EAF0] px-3 py-2 text-left font-bold text-navy">Nombre</th>
                    <th className="border border-[#E5EAF0] px-3 py-2 text-left font-bold text-navy">Finalidad</th>
                    <th className="border border-[#E5EAF0] px-3 py-2 text-left font-bold text-navy">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#E5EAF0] px-3 py-2 font-mono">cookie-consent</td>
                    <td className="border border-[#E5EAF0] px-3 py-2">Guarda tus preferencias de cookies (localStorage)</td>
                    <td className="border border-[#E5EAF0] px-3 py-2">Indefinida</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-bold text-navy mt-6 mb-2">Analíticas (requieren consentimiento)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="border border-[#E5EAF0] px-3 py-2 text-left font-bold text-navy">Nombre</th>
                    <th className="border border-[#E5EAF0] px-3 py-2 text-left font-bold text-navy">Finalidad</th>
                    <th className="border border-[#E5EAF0] px-3 py-2 text-left font-bold text-navy">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#E5EAF0] px-3 py-2 font-mono">_ga, _ga_*</td>
                    <td className="border border-[#E5EAF0] px-3 py-2">Google Analytics — análisis de visitas y comportamiento (pendiente de activar)</td>
                    <td className="border border-[#E5EAF0] px-3 py-2">2 años</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-bold text-navy mt-6 mb-2">Marketing (requieren consentimiento)</h3>
            <p className="text-xs">Actualmente no utilizamos cookies de marketing ni publicidad.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">Gestionar tus preferencias</h2>
            <p>Puedes modificar tus preferencias de cookies en cualquier momento. Tu elección se guarda en tu dispositivo.</p>
            <p className="mt-3">También puedes desactivar las cookies directamente desde tu navegador:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">Safari</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">Más información</h2>
            <p>Para más información sobre cómo tratamos tus datos, consulta nuestra <Link href="/privacidad" className="text-[#2563EB] hover:underline">Política de Privacidad</Link>.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
