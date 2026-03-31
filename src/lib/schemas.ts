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
  .superRefine((data, ctx) => {
    if (!data.sinDetalles) {
      if (data.material === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El material es obligatorio si conoces los detalles',
          path: ['material'],
        })
      }
      if (data.cantidad === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'La cantidad es obligatoria si conoces los detalles',
          path: ['cantidad'],
        })
      }
    }
  })

export type PresupuestoFormData = z.infer<typeof presupuestoSchema>
