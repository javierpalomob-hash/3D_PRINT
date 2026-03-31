const DEFAULT_MESSAGE =
  'Hola! Me interesa vuestro servicio de impresión 3D en Badalona.'

export function buildWhatsAppUrl(
  phone: string,
  message: string = DEFAULT_MESSAGE
): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encoded}`
}
