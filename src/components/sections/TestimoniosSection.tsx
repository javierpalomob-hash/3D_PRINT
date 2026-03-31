'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Card } from '@/components/ui/Card'
import testimoniosData from '../../../content/testimonios/testimonios.json'
import type { Testimonio } from '@/types'

const testimonios = testimoniosData as Testimonio[]

export function TestimoniosSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.testimonio-card', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        scrollTrigger: { trigger: '.testimonios-grid', start: 'top 80%', once: true },
      })
    },
    { scope: containerRef }
  )

  // Show first 2 testimonials on home
  const featured = testimonios.slice(0, 2)

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Clientes</span>
        <h2 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-12">
          Lo que dicen de nosotros.
        </h2>
        <div className="testimonios-grid grid md:grid-cols-2 gap-6">
          {featured.map((t) => (
            <Card key={t.id} className="testimonio-card p-6">
              <div className="text-amber-400 text-sm mb-3">
                {'★'.repeat(t.valoracion)}
              </div>
              <p className="text-sm font-medium text-[#475569] leading-relaxed italic mb-4">
                &quot;{t.texto}&quot;
              </p>
              <p className="text-xs font-bold text-navy">
                {t.nombre} · {t.ciudad}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
