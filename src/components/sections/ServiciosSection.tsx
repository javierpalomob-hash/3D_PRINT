'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

const servicios = [
  { icon: '🔩', titulo: 'Bajo demanda', desc: 'Prototipos y piezas únicas.' },
  { icon: '🔄', titulo: 'Pedidos recurrentes', desc: 'Para empresas y makers.' },
  { icon: '🎨', titulo: 'Acabados', desc: 'Lijado, pintado, soportes disolvibles.' },
]

export function ServiciosSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.servicio-card', {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        scrollTrigger: { trigger: '.servicios-grid', start: 'top 80%', once: true },
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Qué hacemos</span>
        <h2 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-12">
          Servicios de impresión 3D.
        </h2>
        <div className="servicios-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {servicios.map((s) => (
            <Card key={s.titulo} className="servicio-card p-5">
              <div className="text-2xl mb-3">{s.icon}</div>
              <h3 className="text-sm font-bold text-navy mb-1">{s.titulo}</h3>
              <p className="text-xs font-medium text-muted leading-relaxed">{s.desc}</p>
            </Card>
          ))}
          <Link href="/servicios" title="Ver todos los servicios de impresión 3D">
            <Card className="servicio-card p-5 border-[#BFDBFE] bg-[#EFF6FF] h-full flex flex-col justify-center hover:bg-[#dbeafe] transition-colors">
              <p className="text-sm font-bold text-[#2563EB]">Ver todos →</p>
              <p className="text-xs text-muted mt-1">Materiales, precios y más</p>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
