import { describe, it, expect } from 'vitest'
import { presupuestoSchema } from '@/lib/schemas'

describe('presupuestoSchema', () => {
  const valid = {
    nombre: 'Marc',
    email: 'marc@test.com',
    descripcion: 'Necesito una pieza de repuesto',
    material: 'pla' as const,
    cantidad: 1,
    modalidad: 'recogida' as const,
    sinDetalles: false,
  }

  it('accepts a valid payload', () => {
    const result = presupuestoSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('rejects missing nombre', () => {
    const result = presupuestoSchema.safeParse({ ...valid, nombre: '' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = presupuestoSchema.safeParse({ ...valid, email: 'no-es-email' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid material', () => {
    const result = presupuestoSchema.safeParse({ ...valid, material: 'madera' })
    expect(result.success).toBe(false)
  })

  it('accepts sinDetalles:true without material/cantidad', () => {
    const { material, cantidad, ...rest } = valid
    const result = presupuestoSchema.safeParse({ ...rest, sinDetalles: true })
    expect(result.success).toBe(true)
  })

  it('rejects cantidad < 1', () => {
    const result = presupuestoSchema.safeParse({ ...valid, cantidad: 0 })
    expect(result.success).toBe(false)
  })

  it('rejects sinDetalles:false with material but no cantidad', () => {
    const result = presupuestoSchema.safeParse({ ...valid, cantidad: undefined })
    expect(result.success).toBe(false)
  })
})
