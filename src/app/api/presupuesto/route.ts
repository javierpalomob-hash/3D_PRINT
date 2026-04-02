import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { presupuestoSchema } from '@/lib/schemas'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const raw = {
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      telefono: formData.get('telefono') || undefined,
      descripcion: formData.get('descripcion'),
      sinDetalles: formData.get('sinDetalles') === 'true',
      material: formData.get('material') || undefined,
      cantidad: formData.get('cantidad') ? Number(formData.get('cantidad')) : undefined,
      cantidadExacta: formData.get('cantidadExacta')
        ? Number(formData.get('cantidadExacta'))
        : undefined,
      modalidad: formData.get('modalidad'),
      fechaDeseada: formData.get('fechaDeseada') || undefined,
    }

    const parsed = presupuestoSchema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos no válidos', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const cantidadDisplay = data.cantidadExacta ?? data.cantidad ?? '—'
    const adminEmail = process.env.EMAIL_ADMIN!
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://print3dbadalona.com'

    // Email to admin
    await resend.emails.send({
      from: `Print3D Badalona <presupuestos@${new URL(siteUrl).hostname}>`,
      to: adminEmail,
      subject: `Nuevo presupuesto de ${data.nombre}`,
      html: `
        <h2>Nuevo presupuesto recibido</h2>
        <table cellpadding="8">
          <tr><td><strong>Nombre</strong></td><td>${data.nombre}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Teléfono</strong></td><td>${data.telefono ?? '—'}</td></tr>
          <tr><td><strong>Descripción</strong></td><td>${data.descripcion}</td></tr>
          <tr><td><strong>Sin detalles</strong></td><td>${data.sinDetalles ? 'Sí' : 'No'}</td></tr>
          <tr><td><strong>Material</strong></td><td>${data.material ?? '—'}</td></tr>
          <tr><td><strong>Cantidad</strong></td><td>${cantidadDisplay}</td></tr>
          <tr><td><strong>Modalidad</strong></td><td>${data.modalidad}</td></tr>
        </table>
      `,
    })

    // Confirmation email to client
    await resend.emails.send({
      from: `Print3D Badalona <info@${new URL(siteUrl).hostname}>`,
      to: data.email,
      subject: '¡Hemos recibido tu presupuesto! — Print3D Badalona',
      html: `
        <h2>¡Gracias, ${data.nombre}!</h2>
        <p>Hemos recibido tu solicitud y te responderemos en menos de <strong>24 horas</strong>.</p>
        <p>Si tienes prisa, escríbenos directamente por WhatsApp.</p>
        <p style="margin-top:24px;">
          <a href="${buildWhatsAppUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '', `Hola! Soy ${data.nombre}, acabo de enviar un presupuesto`)}"
             style="background:#25D366;color:white;padding:12px 20px;border-radius:5px;text-decoration:none;font-weight:bold;">
            💬 Escribir por WhatsApp
          </a>
        </p>
        <p style="margin-top:32px;font-size:12px;color:#64748B;">
          Print3D Badalona · Badalona, Barcelona
        </p>
      `,
    })

    // Build WhatsApp URL for redirect
    const waMessage = `Hola! Soy ${data.nombre} y acabo de enviar un presupuesto desde la web. Mi proyecto: ${data.descripcion}`
    const waUrl = buildWhatsAppUrl(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
      waMessage
    )

    return NextResponse.json({
      success: true,
      message: 'Presupuesto recibido. Te responderemos en menos de 24h.',
      waUrl,
    })
  } catch (err) {
    console.error('[api/presupuesto]', err)
    return NextResponse.json(
      { error: 'Error interno. Por favor inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}
