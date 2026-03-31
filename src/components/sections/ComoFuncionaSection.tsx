'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const steps = [
  {
    n: 1,
    titulo: 'Envías tu archivo o nos lo describes',
    desc: 'STL, OBJ, 3MF — o simplemente cuéntanos qué necesitas por WhatsApp.',
  },
  {
    n: 2,
    titulo: 'Confirmamos precio y plazo',
    desc: 'Respuesta en menos de 24h con presupuesto claro y sin sorpresas.',
  },
  {
    n: 3,
    titulo: 'Imprimimos tu pieza',
    desc: 'PLA, PETG, TPU y más. Te avisamos cuando esté lista.',
  },
  {
    n: 4,
    titulo: 'Recoges en Badalona o te lo enviamos',
    desc: 'Sin coste de recogida. Envío a domicilio con tracking incluido.',
  },
]

export function ComoFuncionaSection() {
  const containerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Draw the connector line
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // Pop each circle
      gsap.from('.step-circle', {
        scale: 0,
        opacity: 0,
        stagger: 0.25,
        duration: 0.4,
        ease: 'back.out(1.7)',
        delay: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // Fade step content
      gsap.from('.step-content', {
        opacity: 0,
        x: 16,
        stagger: 0.25,
        duration: 0.5,
        delay: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">El proceso</span>
        <h2 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-12">
          Cuatro pasos, sin complicaciones.
        </h2>

        <div className="relative max-w-xl">
          {/* Vertical connector line */}
          <div
            ref={lineRef}
            aria-hidden
            className="absolute left-5 top-8 bottom-8 w-px bg-[#E5EAF0]"
          />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div key={step.n} className="flex gap-5 items-start">
                <div
                  className={`step-circle relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-black ${
                    i === steps.length - 1 ? 'bg-navy' : 'bg-[#2563EB]'
                  }`}
                >
                  {step.n}
                </div>
                <div className="step-content pt-1">
                  <h3 className="text-base font-bold text-navy mb-1">
                    {step.titulo}
                  </h3>
                  <p className="text-sm font-medium text-[#475569] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
