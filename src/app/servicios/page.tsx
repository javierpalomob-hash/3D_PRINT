import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { CTAFinalSection } from '@/components/sections/CTAFinalSection'
import materialesData from '../../../content/servicios/materiales.json'
import type { Material } from '@/types'

export const metadata: Metadata = {
  title: 'Servicios de impresión 3D',
  description:
    'Impresión FDM bajo demanda y pedidos recurrentes. PLA, PETG, TPU, ASA. Precios orientativos y tiempos de entrega en Badalona.',
}

const materiales = materialesData as Material[]

const precioLabel: Record<Material['precio'], string> = {
  'económico': '€',
  'medio': '€€',
  'medio-alto': '€€€',
  'alto': '€€€€',
}

export default function ServiciosPage() {
  return (
    <>
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="label-text block mb-3">Servicios</span>
          <h1 className="text-4xl md:text-5xl font-black text-navy tracking-tight mb-6">
            Impresión 3D en Badalona.
          </h1>
          <p className="text-base font-medium text-[#475569] max-w-2xl mb-16 leading-relaxed">
            Ofrecemos impresión FDM para prototipos, piezas funcionales y coleccionables. Pedidos únicos o recurrentes para empresas y makers.
          </p>

          <span className="label-text block mb-6">Materiales disponibles</span>
          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {materiales.map((m) => (
              <Card key={m.id} className={`p-6 ${!m.disponible ? 'opacity-50' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-black text-navy">{m.nombre}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2563EB]">{precioLabel[m.precio]}</span>
                    {!m.disponible && (
                      <span className="text-xs text-muted bg-[#F1F5F9] px-2 py-0.5 rounded">Próximamente</span>
                    )}
                  </div>
                </div>
                <p className="text-sm font-medium text-[#475569] leading-relaxed mb-4">
                  {m.descripcion}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {m.usos.map((uso) => (
                    <Badge key={uso} label={uso} className="text-[10px]" />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-surface rounded p-2">
                    <span className="text-muted">Temp. máx.</span>
                    <div className="font-bold text-navy">{m.resistenciaTermica}</div>
                  </div>
                  <div className="bg-surface rounded p-2">
                    <span className="text-muted">Resistencia</span>
                    <div className="font-bold text-navy">{m.resistenciaMecanica}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <span className="label-text block mb-6">Precios orientativos</span>
          <Card className="p-6 mb-4">
            <p className="text-sm font-medium text-[#475569] leading-relaxed">
              Los precios dependen del material, el volumen de la pieza, el tiempo de impresión y la complejidad.
              Envíanos tu archivo o descríbenos tu proyecto y te damos un presupuesto exacto sin compromiso.
            </p>
          </Card>
          <p className="text-xs text-muted">
            * Los precios mostrados son orientativos. El presupuesto final se confirma tras revisar el archivo.
          </p>
        </div>
      </div>
      <CTAFinalSection />
    </>
  )
}
