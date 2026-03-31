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
