'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import Image from 'next/image'
import Link from 'next/link'

const preview = [
  { src: '/galeria/hogar-1.jpg',          alt: 'Soporte bici pared impreso en 3D' },
  { src: '/galeria/industrial-2.jpg',     alt: 'Engranajes mecánicos impresos en 3D' },
  { src: '/galeria/prototipos-3.jpg',     alt: 'Maqueta arquitectónica impresa en 3D' },
  { src: '/galeria/coleccionables-1.jpg', alt: 'Figura guerrero coleccionable impresa en 3D' },
  { src: '/galeria/decoracion-3.jpg',     alt: 'Lámpara geométrica impresa en 3D' },
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
          <div className="galeria-item">
            <Link href="/galeria" title="Ver galería completa de trabajos impresos en 3D">
              <div className="aspect-square rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center hover:bg-[#dbeafe] transition-colors">
                <div className="text-center">
                  <div className="text-sm font-bold text-[#2563EB]">Ver todo →</div>
                  <div className="text-xs text-muted mt-1">Galería completa</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
