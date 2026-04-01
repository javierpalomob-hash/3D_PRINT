import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal de Print3D Badalona conforme a la LSSI-CE.',
}

export default function AvisoLegalPage() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Legal</span>
        <h1 className="text-4xl font-black text-navy tracking-tight mb-2">
          Aviso Legal
        </h1>
        <p className="text-xs text-muted mb-12">Última actualización: abril 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-[#475569]">

          <section>
            <h2 className="text-lg font-black text-navy mb-3">1. Datos identificativos del titular</h2>
            <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa:</p>
            <ul className="mt-3 space-y-1 list-none">
              <li><strong>Titular:</strong> Javier Palomo</li>
              <li><strong>NIF:</strong> 54039174F</li>
              <li><strong>Domicilio:</strong> Badalona, Barcelona, España</li>
              <li><strong>Email de contacto:</strong> <a href="mailto:info@print3dbadalona.com" className="text-[#2563EB] hover:underline">info@print3dbadalona.com</a></li>
              <li><strong>Sitio web:</strong> <a href="https://print3dbadalona.com" className="text-[#2563EB] hover:underline">print3dbadalona.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">2. Objeto</h2>
            <p>El presente sitio web tiene por objeto informar sobre los servicios de impresión 3D ofrecidos por el titular bajo la marca <strong>Print3D Badalona</strong>, con sede en Badalona (Barcelona), y facilitar el contacto con clientes potenciales para la solicitud de presupuestos.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">3. Propiedad intelectual e industrial</h2>
            <p>El titular es propietario de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (imágenes, textos, diseño gráfico, logotipos, marcas y nombres comerciales).</p>
            <p className="mt-2">Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación de cualquier parte del contenido de este sitio web sin autorización expresa del titular.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">4. Exclusión de garantías y responsabilidad</h2>
            <p>El titular no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar el acceso o el uso de los contenidos de la web. El titular se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">5. Legislación aplicable y jurisdicción</h2>
            <p>Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o las actividades en él desarrolladas, será de aplicación la legislación española, siendo competentes para la resolución de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales de Badalona.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
