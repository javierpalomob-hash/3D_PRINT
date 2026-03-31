'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Card } from '@/components/ui/Card'

const valores = [
  {
    icon: '⚡',
    titulo: 'Rápido',
    descripcion: 'Entrega en 24-48h para piezas estándar. Sin esperas innecesarias.',
  },
  {
    icon: '📍',
    titulo: 'Local',
    descripcion: 'Recoge en Badalona sin coste adicional. Sin esperar al mensajero.',
  },
  {
    icon: '💬',
    titulo: 'Cercano',
    descripcion: 'Hablamos por WhatsApp, sin formularios complicados. Trato directo.',
  },
]

export function PropuestaValorSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.valor-card', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.valor-grid',
          start: 'top 80%',
          once: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Por qué elegirnos</span>
        <h2 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-12">
          Local, rápido y de confianza.
        </h2>
        <div className="valor-grid grid md:grid-cols-3 gap-6">
          {valores.map((v) => (
            <Card key={v.titulo} className="valor-card p-6">
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="text-lg font-bold text-navy mb-2">{v.titulo}</h3>
              <p className="text-sm font-medium text-[#475569] leading-relaxed">
                {v.descripcion}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
