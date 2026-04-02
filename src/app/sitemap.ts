import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://print3dbadalona.com'

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/servicios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/galeria`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/presupuesto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/blog/cuanto-cuesta-imprimir-en-3d`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/que-material-elegir-para-imprimir-en-3d`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/impresion-3d-para-prototipos-empresas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/miniaturas-impresas-en-3d`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
