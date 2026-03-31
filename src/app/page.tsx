import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { PropuestaValorSection } from '@/components/sections/PropuestaValorSection'
import { ComoFuncionaSection } from '@/components/sections/ComoFuncionaSection'
import { ServiciosSection } from '@/components/sections/ServiciosSection'
import { GaleriaPreviewSection } from '@/components/sections/GaleriaPreviewSection'
import { TestimoniosSection } from '@/components/sections/TestimoniosSection'
import { CTAFinalSection } from '@/components/sections/CTAFinalSection'

export const metadata: Metadata = {
  title: 'Print3D Badalona — Impresión 3D local en Badalona',
  description:
    'Servicio de impresión 3D en Badalona. Recoge en persona o envío a domicilio. Respuesta en 24h.',
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <PropuestaValorSection />
      <ComoFuncionaSection />
      <ServiciosSection />
      <GaleriaPreviewSection />
      <TestimoniosSection />
      <CTAFinalSection />
    </>
  )
}
