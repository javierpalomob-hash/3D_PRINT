import { z } from 'zod'

export const presupuestoSchema = z
  .object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email no válido'),
    telefono: z.string().optional(),
    descripcion: z.string().min(10, 'Describe tu proyecto (mínimo 10 caracteres)'),
    sinDetalles: z.boolean().default(false),
    material: z.enum(['pla', 'petg', 'tpu', 'asa', 'otro']).optional(),
    cantidad: z.number().min(1, 'La cantidad mínima es 1').optional(),
    cantidadExacta: z.number().min(6).optional(),
    modalidad: z.enum(['recogida', 'envio']),
    fechaDeseada: z.string().optional(),
  })
  .refine(
    (data) => {
      // If sinDetalles is false, material and cantidad are required
      if (!data.sinDetalles) {
        return data.material !== undefined && data.cantidad !== undefined
      }
      return true
    },
    {
      message: 'Material y cantidad son obligatorios si conoces los detalles',
      path: ['material'],
    }
  )

export type PresupuestoFormData = z.infer<typeof presupuestoSchema>
