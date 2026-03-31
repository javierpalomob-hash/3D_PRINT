import { describe, it, expect } from 'vitest'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

describe('buildWhatsAppUrl', () => {
  it('builds a valid wa.me URL', () => {
    const url = buildWhatsAppUrl('34600000000', 'Hola')
    expect(url).toBe('https://wa.me/34600000000?text=Hola')
  })

  it('encodes special characters in message', () => {
    const url = buildWhatsAppUrl('34600000000', 'Hola! Quiero información')
    expect(url).toContain('https://wa.me/34600000000?text=')
    expect(url).toContain('Hola')
  })

  it('uses default message when none provided', () => {
    const url = buildWhatsAppUrl('34600000000')
    expect(url).toContain('https://wa.me/34600000000?text=')
    expect(url.length).toBeGreaterThan(30)
  })
})
