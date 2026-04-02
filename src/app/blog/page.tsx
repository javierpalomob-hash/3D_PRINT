import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blog — Impresión 3D',
  description: 'Guías, consejos y recursos sobre impresión 3D. Materiales, costes, prototipos y más desde Badalona.',
  openGraph: {
    title: 'Blog sobre impresión 3D — Print3D Badalona',
    description: 'Guías, consejos y recursos sobre impresión 3D. Materiales, costes, prototipos y más desde Badalona.',
    url: 'https://print3dbadalona.com/blog',
  },
}

const posts = [
  {
    slug: 'cuanto-cuesta-imprimir-en-3d',
    titulo: '¿Cuánto cuesta imprimir en 3D en España?',
    descripcion: 'Desglosamos el precio real de la impresión 3D: material, tiempo de impresión, diseño y más. Con ejemplos concretos y precios orientativos.',
    fecha: '2 abril 2026',
    tiempo: '5 min',
    imagen: '/galeria/industrial-3.jpg',
    categoria: 'Precios',
  },
  {
    slug: 'que-material-elegir-para-imprimir-en-3d',
    titulo: '¿Qué material elegir para imprimir en 3D? PLA, PETG, TPU y ASA',
    descripcion: 'Guía completa para elegir el material correcto según tu proyecto: resistencia, flexibilidad, temperatura, acabado y precio.',
    fecha: '2 abril 2026',
    tiempo: '6 min',
    imagen: '/galeria/prototipos-1.jpg',
    categoria: 'Materiales',
  },
  {
    slug: 'impresion-3d-para-prototipos-empresas',
    titulo: 'Impresión 3D para prototipos: guía para empresas y diseñadores',
    descripcion: 'Cómo usar la impresión 3D para validar productos antes de fabricarlos. Ventajas, limitaciones y casos de uso reales.',
    fecha: '2 abril 2026',
    tiempo: '7 min',
    imagen: '/galeria/prototipos-3.jpg',
    categoria: 'Prototipos',
  },
  {
    slug: 'miniaturas-impresas-en-3d',
    titulo: 'Miniaturas impresas en 3D: todo lo que necesitas saber',
    descripcion: 'Guía completa sobre miniaturas para wargames, D&D y coleccionismo. Materiales, detalle, pintura y dónde encargarlas.',
    fecha: '2 abril 2026',
    tiempo: '5 min',
    imagen: '/galeria/coleccionables-3.jpg',
    categoria: 'Coleccionables',
  },
]

export default function BlogPage() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Blog</span>
        <h1 className="text-4xl font-black text-navy tracking-tight mb-4">
          Recursos sobre impresión 3D
        </h1>
        <p className="text-[#475569] mb-12 max-w-xl">
          Guías prácticas, comparativas de materiales y consejos para sacar el máximo partido a la impresión 3D.
        </p>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="grid md:grid-cols-[280px_1fr] gap-6 border border-[#E5EAF0] rounded-xl overflow-hidden hover:border-[#BFDBFE] transition-colors">
                <div className="relative aspect-video md:aspect-auto">
                  <Image
                    src={post.imagen}
                    alt={post.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-1 rounded">{post.categoria}</span>
                    <span className="text-xs text-muted">{post.tiempo} de lectura</span>
                    <span className="text-xs text-muted">{post.fecha}</span>
                  </div>
                  <h2 className="text-xl font-black text-navy mb-2 group-hover:text-[#2563EB] transition-colors">
                    {post.titulo}
                  </h2>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {post.descripcion}
                  </p>
                  <span className="mt-4 text-sm font-bold text-[#2563EB]">Leer artículo →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
