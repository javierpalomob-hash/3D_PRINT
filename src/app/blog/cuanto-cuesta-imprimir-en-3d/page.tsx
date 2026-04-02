import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '¿Cuánto cuesta imprimir en 3D en España?',
  description: 'Desglosamos el precio real de la impresión 3D: material, tiempo, diseño y más. Con ejemplos concretos y precios orientativos para 2026.',
  openGraph: {
    title: '¿Cuánto cuesta imprimir en 3D en España? — Print3D Badalona',
    description: 'Desglosamos el precio real de la impresión 3D: material, tiempo, diseño y más. Con ejemplos concretos y precios orientativos para 2026.',
    url: 'https://print3dbadalona.com/blog/cuanto-cuesta-imprimir-en-3d',
  },
}

export default function Post() {
  return (
    <article className="py-16 md:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
          <span>/</span>
          <span>Precios</span>
        </div>

        {/* Header */}
        <span className="label-text block mb-3">Precios</span>
        <h1 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-4">
          ¿Cuánto cuesta imprimir en 3D en España?
        </h1>
        <div className="flex items-center gap-4 text-xs text-muted mb-8">
          <span>2 abril 2026</span>
          <span>5 min de lectura</span>
          <span>Print3D Badalona</span>
        </div>

        <div className="relative aspect-video rounded-xl overflow-hidden mb-12">
          <Image src="/galeria/industrial-3.jpg" alt="Pieza de impresión 3D" fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="prose-content space-y-6 text-[#475569] text-[15px] leading-relaxed">

          <p>
            Una de las preguntas más frecuentes que recibimos es: <strong className="text-navy">¿cuánto me va a costar imprimir esto en 3D?</strong> La respuesta no es única porque depende de varios factores. En este artículo los desglosamos todos para que entiendas exactamente qué estás pagando y puedas comparar presupuestos con criterio.
          </p>

          <h2 className="text-xl font-black text-navy mt-10 mb-3">Los factores que determinan el precio</h2>

          <h3 className="text-base font-bold text-navy mb-2">1. El material</h3>
          <p>
            El material es el factor más directo. El PLA es el más económico (desde 20€/kg), seguido del PETG (25-30€/kg), el TPU (30-40€/kg) y el ASA (35-45€/kg). Una pieza pequeña de 20g en PLA supone un coste de material de apenas 0,40€.
          </p>

          <h3 className="text-base font-bold text-navy mb-2">2. El tiempo de impresión</h3>
          <p>
            La impresora tarda horas en fabricar tu pieza. Una pieza sencilla puede tardar 1-2 horas; una pieza compleja o grande puede tardar 10-20 horas. El tiempo de máquina tiene un coste que el proveedor traslada al precio final.
          </p>

          <h3 className="text-base font-bold text-navy mb-2">3. La complejidad del diseño</h3>
          <p>
            Si ya tienes el archivo STL o 3MF listo para imprimir, el coste es menor. Si necesitas que diseñen la pieza desde cero o a partir de un plano, el diseño se cobra aparte — generalmente entre 30-80€/hora dependiendo de la complejidad.
          </p>

          <h3 className="text-base font-bold text-navy mb-2">4. Los soportes y el post-procesado</h3>
          <p>
            Algunas geometrías requieren soportes que luego hay que retirar manualmente. Si además quieres lijar, pintar o tratar la superficie, eso suma tiempo y por tanto coste.
          </p>

          <h2 className="text-xl font-black text-navy mt-10 mb-3">Precios orientativos por tipo de pieza</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E5EAF0] rounded-lg overflow-hidden">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="text-left px-4 py-3 font-bold text-navy">Tipo de pieza</th>
                  <th className="text-left px-4 py-3 font-bold text-navy">Precio orientativo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                <tr><td className="px-4 py-3">Pieza pequeña decorativa</td><td className="px-4 py-3 font-medium text-navy">3 — 10€</td></tr>
                <tr><td className="px-4 py-3">Organizador o soporte de hogar</td><td className="px-4 py-3 font-medium text-navy">8 — 20€</td></tr>
                <tr><td className="px-4 py-3">Pieza técnica o de repuesto</td><td className="px-4 py-3 font-medium text-navy">10 — 35€</td></tr>
                <tr><td className="px-4 py-3">Prototipo funcional</td><td className="px-4 py-3 font-medium text-navy">20 — 80€</td></tr>
                <tr><td className="px-4 py-3">Figura o miniatura detallada</td><td className="px-4 py-3 font-medium text-navy">8 — 30€</td></tr>
                <tr><td className="px-4 py-3">Maqueta arquitectónica</td><td className="px-4 py-3 font-medium text-navy">50 — 200€</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-black text-navy mt-10 mb-3">¿Cómo conseguir el mejor precio?</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Ten el archivo STL o 3MF listo — ahorras el coste de diseño</li>
            <li>Si necesitas varias piezas iguales, pídelas todas a la vez — la escala baja el precio unitario</li>
            <li>No pagues por tolerancias que no necesitas — una pieza decorativa no necesita la misma precisión que una pieza técnica</li>
            <li>Pregunta qué material es suficiente para tu uso — el PLA suele ser más que suficiente para el 80% de los casos</li>
          </ul>

          <h2 className="text-xl font-black text-navy mt-10 mb-3">¿Merece la pena frente a comprar la pieza fabricada?</h2>
          <p>
            Depende del caso. Para piezas estándar que puedes comprar en tienda, probablemente no. Pero para piezas personalizadas, de repuesto que ya no se fabrican, o prototipos únicos, la impresión 3D es imbatible en precio y velocidad.
          </p>

          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-6 mt-10">
            <h3 className="font-black text-navy mb-2">¿Quieres saber cuánto costaría tu pieza?</h3>
            <p className="text-sm mb-4">En Print3D Badalona hacemos presupuestos gratis en menos de 24 horas. Sin compromiso.</p>
            <Link href="/presupuesto" className="inline-block bg-[#2563EB] text-white font-bold px-5 py-2.5 rounded-[5px] hover:bg-[#1D4ED8] transition-colors text-sm">
              Solicitar presupuesto gratis →
            </Link>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#E5EAF0]">
          <Link href="/blog" className="text-sm font-bold text-[#2563EB] hover:underline">← Volver al blog</Link>
        </div>
      </div>
    </article>
  )
}
