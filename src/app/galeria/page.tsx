import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { CTAFinalSection } from '@/components/sections/CTAFinalSection'
import piezasData from '../../../content/galeria/piezas.json'
import type { PiezaGaleria } from '@/types'

export const metadata: Metadata = {
  title: 'Galería de trabajos',
  description:
    'Galería de piezas impresas en 3D en Badalona. Decoración, prototipos, industrial, coleccionables y más.',
}

const piezas = piezasData as PiezaGaleria[]

export default function GaleriaPage() {
  return (
    <>
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="label-text block mb-3">Galería</span>
          <h1 className="text-4xl md:text-5xl font-black text-navy tracking-tight mb-4">
            Lo que hemos imprimido.
          </h1>
          <p className="text-base font-medium text-[#475569] mb-12">
            Piezas reales para clientes reales. Haz clic para ampliar.
          </p>
          <GalleryGrid piezas={piezas} />
        </div>
      </div>
      <CTAFinalSection />
    </>
  )
}
