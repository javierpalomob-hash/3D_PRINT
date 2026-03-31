'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import Image from 'next/image'
import Link from 'next/link'

// Stock images from Unsplash (free, 3D printing related)
const preview = [
  { src: 'https://images.unsplash.com/photo-1611117775350-ac3950990985?w=400&q=80', alt: 'Pieza impresa en 3D' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', alt: 'Impresora 3D en proceso' },
  { src: 'https://images.unsplash.com/photo-1631544625787-ccb1a3ef22e2?w=400&q=80', alt: 'Detalle de pieza PLA' },
  { src: 'https://images.unsplash.com/photo-1631544824938-a6a1a4bf3d09?w=400&q=80', alt: 'Prototipo funcional' },
  { src: 'https://images.unsplash.com/photo-1644425934863-b39b42803af8?w=400&q=80', alt: 'Pieza decorativa impresa' },
]

export function GaleriaPreviewSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.galeria-item', {
        opacity: 0,
        scale: 0.95,
        stagger: 0.08,
        duration: 0.5,
        scrollTrigger: { trigger: '.galeria-grid', start: 'top 80%', once: true },
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Trabajos recientes</span>
        <h2 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-12">
          Lo que hemos imprimido.
        </h2>

        <div className="galeria-grid grid grid-cols-3 gap-3 mb-6">
          {preview.map((img, i) => (
            <div
              key={i}
              className="galeria-item relative aspect-square rounded-lg overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 20vw"
              />
            </div>
          ))}
          <Link href="/galeria" className="galeria-item">
            <div className="aspect-square rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center hover:bg-[#dbeafe] transition-colors">
              <div className="text-center">
                <div className="text-sm font-bold text-[#2563EB]">Ver todo →</div>
                <div className="text-xs text-muted mt-1">Galería completa</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
