import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '¿Qué material elegir para imprimir en 3D? PLA, PETG, TPU y ASA',
  description: 'Guía completa para elegir el material correcto: PLA, PETG, TPU o ASA. Comparativa de resistencia, flexibilidad, temperatura y precio.',
  openGraph: {
    title: '¿Qué material elegir para imprimir en 3D? — Print3D Badalona',
    description: 'Guía completa para elegir el material correcto: PLA, PETG, TPU o ASA. Comparativa de resistencia, flexibilidad, temperatura y precio.',
    url: 'https://print3dbadalona.com/blog/que-material-elegir-para-imprimir-en-3d',
  },
}

export default function Post() {
  return (
    <article className="py-16 md:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        <div className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
          <span>/</span>
          <span>Materiales</span>
        </div>

        <span className="label-text block mb-3">Materiales</span>
        <h1 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-4">
          ¿Qué material elegir para imprimir en 3D? PLA, PETG, TPU y ASA
        </h1>
        <div className="flex items-center gap-4 text-xs text-muted mb-8">
          <span>2 abril 2026</span>
          <span>6 min de lectura</span>
          <span>Print3D Badalona</span>
        </div>

        <div className="relative aspect-video rounded-xl overflow-hidden mb-12">
          <Image src="/galeria/prototipos-1.jpg" alt="Materiales de impresión 3D" fill className="object-cover" />
        </div>

        <div className="prose-content space-y-6 text-[#475569] text-[15px] leading-relaxed">

          <p>
            Elegir el material equivocado puede arruinar una pieza perfectamente diseñada. Cada filamento tiene sus puntos fuertes y sus limitaciones. En esta guía te explicamos cuándo usar cada uno para que tomes la mejor decisión sin necesidad de ser un experto.
          </p>

          <h2 className="text-xl font-black text-navy mt-10 mb-4">PLA — El material de referencia</h2>
          <p>
            El <strong className="text-navy">PLA (ácido poliláctico)</strong> es el filamento más usado en impresión 3D por una razón: es fácil de imprimir, produce buenos acabados y es económico. Se obtiene de fuentes renovables como el maíz o la caña de azúcar, lo que lo hace biodegradable en condiciones controladas.
          </p>
          <h3 className="text-base font-bold text-navy mb-2">Úsalo cuando:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>La pieza es decorativa o de interior</li>
            <li>No va a recibir impactos fuertes ni calor</li>
            <li>Quieres el mejor acabado superficial</li>
            <li>Buscas el precio más bajo</li>
          </ul>
          <h3 className="text-base font-bold text-navy mb-2">Evítalo cuando:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>La pieza va a estar al sol o en un coche (se deforma a partir de 60°C)</li>
            <li>Necesitas resistencia mecánica alta</li>
            <li>Va a estar en contacto con agua de forma continuada</li>
          </ul>

          <h2 className="text-xl font-black text-navy mt-10 mb-4">PETG — El equilibrio perfecto</h2>
          <p>
            El <strong className="text-navy">PETG</strong> combina la facilidad de impresión del PLA con mejor resistencia mecánica y térmica. Es el material que más usamos en piezas funcionales porque aguanta bien el uso real sin ser tan exigente de imprimir como el ABS.
          </p>
          <h3 className="text-base font-bold text-navy mb-2">Úsalo cuando:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>La pieza va a recibir carga mecánica moderada</li>
            <li>Necesitas resistencia al agua o humedad</li>
            <li>La pieza va a estar en un entorno con temperaturas de hasta 80°C</li>
            <li>Buscas durabilidad sin pagar por materiales más técnicos</li>
          </ul>

          <h2 className="text-xl font-black text-navy mt-10 mb-4">TPU — Cuando necesitas flexibilidad</h2>
          <p>
            El <strong className="text-navy">TPU (poliuretano termoplástico)</strong> es el filamento flexible por excelencia. Produce piezas elásticas que absorben impactos y recuperan su forma. Piensa en suelas, juntas, fundas o cualquier pieza que necesite ceder sin romperse.
          </p>
          <h3 className="text-base font-bold text-navy mb-2">Úsalo cuando:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Necesitas que la pieza sea flexible o elástica</li>
            <li>La pieza va a absorber vibraciones o impactos</li>
            <li>Quieres un agarre antideslizante</li>
            <li>Necesitas una junta o sello</li>
          </ul>

          <h2 className="text-xl font-black text-navy mt-10 mb-4">ASA — Para el exterior y altas temperaturas</h2>
          <p>
            El <strong className="text-navy">ASA</strong> es la alternativa al ABS pero con mejor resistencia a los rayos UV. Es el material ideal para piezas de exterior que van a estar expuestas al sol, la lluvia y los cambios de temperatura. Aguanta hasta 100°C sin deformarse.
          </p>
          <h3 className="text-base font-bold text-navy mb-2">Úsalo cuando:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>La pieza va al exterior (jardín, coche, balcón)</li>
            <li>Necesitas resistencia UV sin amarillamiento</li>
            <li>Las temperaturas pueden superar los 80°C</li>
            <li>Necesitas resistencia química moderada</li>
          </ul>

          <h2 className="text-xl font-black text-navy mt-10 mb-3">Comparativa rápida</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E5EAF0] rounded-lg overflow-hidden">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="text-left px-4 py-3 font-bold text-navy">Material</th>
                  <th className="text-left px-4 py-3 font-bold text-navy">Resistencia</th>
                  <th className="text-left px-4 py-3 font-bold text-navy">Temp. max.</th>
                  <th className="text-left px-4 py-3 font-bold text-navy">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                <tr><td className="px-4 py-3 font-medium">PLA</td><td className="px-4 py-3">Baja</td><td className="px-4 py-3">~60°C</td><td className="px-4 py-3 text-green-600">Bajo</td></tr>
                <tr><td className="px-4 py-3 font-medium">PETG</td><td className="px-4 py-3">Media</td><td className="px-4 py-3">~80°C</td><td className="px-4 py-3 text-yellow-600">Medio</td></tr>
                <tr><td className="px-4 py-3 font-medium">TPU</td><td className="px-4 py-3">Flexible</td><td className="px-4 py-3">~90°C</td><td className="px-4 py-3 text-yellow-600">Medio</td></tr>
                <tr><td className="px-4 py-3 font-medium">ASA</td><td className="px-4 py-3">Alta + UV</td><td className="px-4 py-3">~100°C</td><td className="px-4 py-3 text-orange-600">Alto</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-6 mt-10">
            <h3 className="font-black text-navy mb-2">¿No tienes claro qué material necesitas?</h3>
            <p className="text-sm mb-4">Cuéntanos qué quieres hacer y te recomendamos el material más adecuado sin coste adicional.</p>
            <Link href="/presupuesto" className="inline-block bg-[#2563EB] text-white font-bold px-5 py-2.5 rounded-[5px] hover:bg-[#1D4ED8] transition-colors text-sm">
              Solicitar asesoramiento gratis →
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
