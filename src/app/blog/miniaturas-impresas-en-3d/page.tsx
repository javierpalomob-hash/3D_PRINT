import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Miniaturas impresas en 3D: todo lo que necesitas saber',
  description: 'Guía completa sobre miniaturas para wargames, D&D y coleccionismo. Materiales, nivel de detalle, pintura y cómo encargarlas en Barcelona.',
  openGraph: {
    title: 'Miniaturas impresas en 3D — Print3D Badalona',
    description: 'Guía completa sobre miniaturas para wargames, D&D y coleccionismo. Materiales, nivel de detalle, pintura y cómo encargarlas en Barcelona.',
    url: 'https://print3dbadalona.com/blog/miniaturas-impresas-en-3d',
  },
}

export default function Post() {
  return (
    <article className="py-16 md:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        <div className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
          <span>/</span>
          <span>Coleccionables</span>
        </div>

        <span className="label-text block mb-3">Coleccionables</span>
        <h1 className="text-3xl md:text-4xl font-black text-navy tracking-tight mb-4">
          Miniaturas impresas en 3D: todo lo que necesitas saber
        </h1>
        <div className="flex items-center gap-4 text-xs text-muted mb-8">
          <span>2 abril 2026</span>
          <span>5 min de lectura</span>
          <span>Print3D Badalona</span>
        </div>

        <div className="relative aspect-video rounded-xl overflow-hidden mb-12">
          <Image src="/galeria/coleccionables-3.jpg" alt="Miniaturas impresas en 3D" fill className="object-cover" />
        </div>

        <div className="prose-content space-y-6 text-[#475569] text-[15px] leading-relaxed">

          <p>
            Las miniaturas impresas en 3D han revolucionado el mundo del wargame, los juegos de rol y el coleccionismo. Lo que antes requería comprar cajas enteras de miniaturas de plástico o metal a precios elevados, hoy se puede conseguir a medida, con el diseño que quieras y a un coste mucho más razonable.
          </p>

          <h2 className="text-xl font-black text-navy mt-10 mb-3">¿Para qué se usan las miniaturas impresas en 3D?</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-navy">Wargames:</strong> Warhammer 40K, Age of Sigmar, Kings of War y otros juegos de miniaturas</li>
            <li><strong className="text-navy">Juegos de rol:</strong> D&D, Pathfinder, Call of Cthulhu — para representar personajes y criaturas en la mesa</li>
            <li><strong className="text-navy">Coleccionismo:</strong> figuras de videojuegos, películas, series o diseños originales</li>
            <li><strong className="text-navy">Decoración:</strong> piezas únicas para estanterías, escritorios o vitrinas</li>
            <li><strong className="text-navy">Regalos personalizados:</strong> una miniatura del personaje favorito de alguien es un regalo imposible de encontrar en tienda</li>
          </ul>

          <h2 className="text-xl font-black text-navy mt-10 mb-3">¿Qué nivel de detalle se puede conseguir?</h2>
          <p>
            Con impresión FDM (filamento) el detalle es bueno para piezas de tamaño medio — personajes de 75mm o más quedan muy bien. Para miniaturas muy pequeñas (28mm o menos) con detalles finos como caras, manos o texturas de tela, la tecnología de resina ofrece mejores resultados.
          </p>
          <p>
            En Print3D Badalona trabajamos con FDM de alta resolución, que es suficiente para la gran mayoría de casos de uso. Si necesitas el máximo detalle en piezas muy pequeñas, te lo indicamos y buscamos la mejor solución.
          </p>

          <h2 className="text-xl font-black text-navy mt-10 mb-3">Materiales recomendados para miniaturas</h2>

          <h3 className="text-base font-bold text-navy mb-2">PLA — La elección habitual</h3>
          <p>
            El PLA es el material más usado para miniaturas por su excelente acabado superficial y facilidad de pintura. Acepta muy bien la imprimación y las pinturas acrílicas. Si la miniatura va a estar en un entorno de interior y no va a recibir golpes fuertes, el PLA es la opción correcta.
          </p>

          <h3 className="text-base font-bold text-navy mb-2">PETG — Para miniaturas que se van a usar</h3>
          <p>
            Si las miniaturas van a usarse en partidas de wargame con contacto frecuente, el PETG aguanta mejor los golpes y no se rompe tan fácilmente como el PLA. El acabado es ligeramente inferior pero la durabilidad compensa.
          </p>

          <h2 className="text-xl font-black text-navy mt-10 mb-3">¿Cómo conseguir el archivo para imprimir?</h2>
          <p>
            Hay varias opciones según tu caso:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-navy">Thingiverse, MyMiniFactory, Cults3D:</strong> repositorios gratuitos o de pago con miles de modelos listos para imprimir</li>
            <li><strong className="text-navy">Kickstarter y Patreon:</strong> muchos diseñadores de miniaturas publican sus modelos por suscripción mensual</li>
            <li><strong className="text-navy">Diseño personalizado:</strong> si quieres algo único, podemos ayudarte a encontrar un diseñador o evaluamos si tenemos el modelo</li>
          </ul>
          <p>
            Si ya tienes el archivo STL, solo tienes que enviárnoslo y te hacemos el presupuesto.
          </p>

          <h2 className="text-xl font-black text-navy mt-10 mb-3">¿Se pueden pintar las miniaturas impresas en 3D?</h2>
          <p>
            Sí, perfectamente. El proceso es el mismo que con miniaturas de plástico convencionales:
          </p>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Lijar suavemente si hay líneas de capa visibles</li>
            <li>Aplicar imprimación en spray (negro o gris)</li>
            <li>Pintar con acrílicos de modelismo</li>
            <li>Aplicar wash para los detalles y acabado final con barniz</li>
          </ol>
          <p>
            El resultado es indistinguible de una miniatura comercial una vez pintada.
          </p>

          <h2 className="text-xl font-black text-navy mt-10 mb-3">¿Cuánto cuesta una miniatura impresa en 3D?</h2>
          <p>
            Depende del tamaño y la complejidad. Como referencia orientativa:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E5EAF0] rounded-lg overflow-hidden">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="text-left px-4 py-3 font-bold text-navy">Tipo</th>
                  <th className="text-left px-4 py-3 font-bold text-navy">Precio orientativo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                <tr><td className="px-4 py-3">Miniatura 28mm (D&D estándar)</td><td className="px-4 py-3 font-medium text-navy">2 — 5€</td></tr>
                <tr><td className="px-4 py-3">Personaje 75mm con detalle</td><td className="px-4 py-3 font-medium text-navy">8 — 15€</td></tr>
                <tr><td className="px-4 py-3">Figura grande 100-150mm</td><td className="px-4 py-3 font-medium text-navy">15 — 30€</td></tr>
                <tr><td className="px-4 py-3">Figura coleccionable 200mm+</td><td className="px-4 py-3 font-medium text-navy">30 — 80€</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-6 mt-10">
            <h3 className="font-black text-navy mb-2">¿Tienes un modelo en mente?</h3>
            <p className="text-sm mb-4">Envíanos el archivo STL o descríbenos lo que quieres y te hacemos presupuesto gratis. Estamos en Badalona, Barcelona.</p>
            <Link href="/presupuesto" className="inline-block bg-[#2563EB] text-white font-bold px-5 py-2.5 rounded-[5px] hover:bg-[#1D4ED8] transition-colors text-sm">
              Pedir presupuesto gratis →
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
