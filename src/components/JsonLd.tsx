export function JsonLdLocalBusiness() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Print3D Badalona',
    description:
      'Servicio de impresión 3D en Badalona. Recogida en persona o envío a domicilio.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://print3dbadalona.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Badalona',
      addressRegion: 'Barcelona',
      addressCountry: 'ES',
    },
    areaServed: ['Badalona', 'Barcelona', 'Maresme'],
    serviceType: 'Impresión 3D',
    openingHours: 'Mo-Fr 09:00-20:00',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
