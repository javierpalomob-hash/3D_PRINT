import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Print3D Badalona conforme al RGPD.',
}

export default function PrivacidadPage() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <span className="label-text block mb-3">Legal</span>
        <h1 className="text-4xl font-black text-navy tracking-tight mb-2">
          Política de Privacidad
        </h1>
        <p className="text-xs text-muted mb-12">Última actualización: abril 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-[#475569]">

          <section>
            <h2 className="text-lg font-black text-navy mb-3">1. Responsable del tratamiento</h2>
            <ul className="space-y-1 list-none">
              <li><strong>Titular:</strong> Javier Palomo</li>
              <li><strong>NIF:</strong> 54039174F</li>
              <li><strong>Domicilio:</strong> Badalona, Barcelona, España</li>
              <li><strong>Email:</strong> <a href="mailto:info@print3dbadalona.com" className="text-[#2563EB] hover:underline">info@print3dbadalona.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">2. Datos que recogemos</h2>
            <p>A través del formulario de solicitud de presupuesto recogemos los siguientes datos:</p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>Nombre y apellidos</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>Descripción del proyecto</li>
              <li>Archivo de diseño 3D (opcional, formatos STL/OBJ/3MF)</li>
            </ul>
            <p className="mt-3">No recogemos datos de tarjetas de crédito ni información bancaria.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">3. Finalidad y base legal</h2>
            <p><strong>Finalidad:</strong> Gestionar las solicitudes de presupuesto, responder a las consultas recibidas y llevar a cabo la relación comercial derivada.</p>
            <p className="mt-2"><strong>Base legal:</strong> Consentimiento del interesado (Art. 6.1.a del Reglamento General de Protección de Datos — RGPD UE 2016/679) y ejecución de un contrato o medidas precontractuales (Art. 6.1.b RGPD).</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">4. Plazo de conservación</h2>
            <p>Los datos se conservarán durante el tiempo necesario para gestionar tu solicitud y, en caso de relación comercial, durante el período que exija la normativa fiscal y mercantil aplicable (generalmente 5 años). Transcurrido dicho plazo, los datos serán suprimidos o anonimizados.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">5. Encargados de tratamiento</h2>
            <p>Para la prestación del servicio contamos con los siguientes proveedores que actúan como encargados del tratamiento:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><strong>Resend Inc.</strong> — envío de correos electrónicos transaccionales. Política de privacidad: <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">resend.com</a></li>
              <li><strong>Vercel Inc.</strong> — alojamiento del sitio web. Política de privacidad: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">vercel.com</a></li>
            </ul>
            <p className="mt-3">Dichos proveedores están ubicados en Estados Unidos y operan bajo el marco EU-U.S. Data Privacy Framework.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">6. Tus derechos</h2>
            <p>Como interesado, tienes derecho a:</p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li><strong>Acceso:</strong> conocer qué datos tuyos tratamos.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
              <li><strong>Supresión:</strong> solicitar el borrado de tus datos.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
              <li><strong>Limitación:</strong> solicitar la restricción del tratamiento.</li>
            </ul>
            <p className="mt-3">Para ejercer cualquiera de estos derechos, envía un email a <a href="mailto:info@print3dbadalona.com" className="text-[#2563EB] hover:underline">info@print3dbadalona.com</a> indicando el derecho que deseas ejercer y adjuntando copia de tu DNI.</p>
            <p className="mt-2">También tienes derecho a presentar una reclamación ante la <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">Agencia Española de Protección de Datos (AEPD)</a>.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
