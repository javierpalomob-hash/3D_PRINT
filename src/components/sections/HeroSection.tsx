'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const waUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34600000000'
  )

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from('.hero-label', { opacity: 0, y: 20 })
        .from('.hero-title', { opacity: 0, y: 24, duration: 0.6 }, '-=0.2')
        .from('.hero-body', { opacity: 0, y: 20 }, '-=0.3')
        .from('.hero-ctas > *', { opacity: 0, y: 16, stagger: 0.12 }, '-=0.2')
        .from(
          '.hero-stat',
          { opacity: 0, y: 12, stagger: 0.1, duration: 0.4 },
          '-=0.2'
        )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#EFF6FF] py-20 md:py-28"
    >
      {/* Decorative blob */}
      <div
        aria-hidden
        className="absolute -top-16 right-0 w-[300px] h-[300px] bg-[#BFDBFE] rounded-full opacity-20 blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="hero-label label-text block mb-4">
          📍 Badalona · Barcelona
        </span>

        <h1 className="hero-title text-[clamp(2.5rem,6vw,4rem)] font-black text-navy leading-[1.05] tracking-tight mb-6 max-w-2xl">
          Imprimimos<br />
          <span>lo que imaginas.</span>
        </h1>

        <p className="hero-body text-base md:text-lg font-medium text-[#475569] leading-relaxed mb-8 max-w-xl">
          Servicio local de impresión 3D en Badalona. Prototipos, piezas
          técnicas y coleccionables. Respuesta en 24h.
        </p>

        <div className="hero-ctas flex flex-wrap gap-3 mb-12">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-3 rounded-[5px] hover:bg-[#1fba58] transition-colors"
          >
            💬 Escríbenos por WhatsApp
          </a>
          <a
            href="/galeria"
            className="inline-flex items-center gap-2 border border-[#BFDBFE] text-[#2563EB] font-semibold px-5 py-3 rounded-[5px] bg-white hover:bg-[#EFF6FF] transition-colors"
          >
            Ver galería →
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 flex-wrap">
          <div className="hero-stat text-center">
            <div className="text-2xl font-black text-navy">24h</div>
            <div className="text-xs font-medium text-muted">respuesta</div>
          </div>
          <div className="w-px h-8 bg-[#E5EAF0]" />
          <div className="hero-stat text-center">
            <div className="text-2xl font-black text-navy">3+</div>
            <div className="text-xs font-medium text-muted">materiales</div>
          </div>
          <div className="w-px h-8 bg-[#E5EAF0]" />
          <div className="hero-stat text-center">
            <div className="text-2xl font-black text-navy">5★</div>
            <div className="text-xs font-medium text-muted">valoración</div>
          </div>
        </div>
      </div>
    </section>
  )
}
