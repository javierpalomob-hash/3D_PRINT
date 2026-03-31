'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import Image from 'next/image'
import type { PiezaGaleria, CategoriaGaleria } from '@/types'

const CATEGORIAS: { id: CategoriaGaleria; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'decoracion', label: 'Decoración' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'prototipos', label: 'Prototipos' },
  { id: 'coleccionables', label: 'Coleccionables' },
  { id: 'hogar', label: 'Hogar' },
]

interface GalleryGridProps {
  piezas: PiezaGaleria[]
}

export function GalleryGrid({ piezas }: GalleryGridProps) {
  const [categoria, setCategoria] = useState<CategoriaGaleria>('todos')
  const [selected, setSelected] = useState<PiezaGaleria | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered =
    categoria === 'todos' ? piezas : piezas.filter((p) => p.categoria === categoria)

  useGSAP(
    () => {
      gsap.from('.gallery-item', {
        opacity: 0,
        scale: 0.95,
        stagger: 0.06,
        duration: 0.4,
      })
    },
    { scope: gridRef, dependencies: [categoria] }
  )

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategoria(c.id)}
            className={`text-xs font-semibold px-3 py-1.5 rounded border transition-colors ${
              categoria === c.id
                ? 'bg-[#2563EB] text-white border-[#2563EB]'
                : 'bg-white text-[#475569] border-[#E5EAF0] hover:border-[#BFDBFE]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((pieza) => (
          <button
            key={pieza.id}
            onClick={() => setSelected(pieza)}
            className="gallery-item relative aspect-square rounded-lg overflow-hidden group text-left"
          >
            <Image
              src={pieza.imagen}
              alt={pieza.titulo}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors flex items-end p-3">
              <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                {pieza.titulo}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-navy/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-white rounded-xl overflow-hidden max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={selected.imagen}
                alt={selected.titulo}
                fill
                className="object-cover"
                sizes="512px"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-black text-navy mb-1">{selected.titulo}</h3>
              <div className="flex gap-2">
                <span className="text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded uppercase">
                  {selected.material}
                </span>
                <span className="text-xs font-semibold text-muted bg-surface border border-[#E5EAF0] px-2 py-0.5 rounded">
                  {selected.categoria}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-navy font-black shadow"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}
