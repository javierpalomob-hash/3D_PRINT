import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { JsonLdLocalBusiness } from '@/components/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Print3D Badalona — Impresión 3D local en Badalona',
    template: '%s | Print3D Badalona',
  },
  description:
    'Servicio de impresión 3D en Badalona. Prototipos, piezas técnicas y coleccionables. Recogida en persona o envío a domicilio. Respuesta en 24h.',
  keywords: [
    'impresión 3D Badalona',
    'impresión 3D Barcelona',
    'servicio impresión 3D',
    'prototipos 3D Badalona',
    'piezas PLA Barcelona',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Print3D Badalona',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <JsonLdLocalBusiness />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
