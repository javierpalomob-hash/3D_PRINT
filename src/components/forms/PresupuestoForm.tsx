'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { presupuestoSchema, type PresupuestoFormData } from '@/lib/schemas'
import { cn } from '@/lib/utils'

const MATERIALES = [
  { id: 'pla', label: 'PLA' },
  { id: 'petg', label: 'PETG' },
  { id: 'tpu', label: 'TPU' },
  { id: 'asa', label: 'ASA' },
] as const

type CantidadOpcion = '1' | '2-5' | 'mas5'

export function PresupuestoForm() {
  const [sinDetalles, setSinDetalles] = useState(false)
  const [cantidadOpcion, setCantidadOpcion] = useState<CantidadOpcion>('1')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [submitResult, setSubmitResult] = useState<{
    ok: boolean
    message: string
    waUrl?: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PresupuestoFormData>({
    resolver: zodResolver(presupuestoSchema),
    defaultValues: {
      sinDetalles: false,
      cantidad: 1,
      modalidad: 'recogida',
    },
  })

  const modalidad = watch('modalidad')

  function handleSinDetallesToggle() {
    const next = !sinDetalles
    setSinDetalles(next)
    setValue('sinDetalles', next)
  }

  function handleCantidadOpcion(op: CantidadOpcion) {
    setCantidadOpcion(op)
    if (op === '1') setValue('cantidad', 1)
    if (op === '2-5') setValue('cantidad', 2)
    if (op === 'mas5') setValue('cantidad', 6)
  }

  async function onSubmit(data: PresupuestoFormData) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          formData.append(k, String(v))
        }
      })
      if (selectedFile) {
        formData.append('archivo', selectedFile)
      }

      const res = await fetch('/api/presupuesto', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()

      if (res.ok) {
        setSubmitResult({ ok: true, message: json.message, waUrl: json.waUrl })
      } else {
        setSubmitResult({ ok: false, message: json.error ?? 'Error al enviar' })
      }
    } catch {
      setSubmitResult({ ok: false, message: 'Error de conexión. Inténtalo de nuevo.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitResult?.ok) {
    return (
      <div className="bg-white border border-[#E5EAF0] rounded-xl p-8 text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-xl font-black text-navy mb-2">¡Recibido!</h2>
        <p className="text-sm font-medium text-[#475569] mb-6">{submitResult.message}</p>
        {submitResult.waUrl && (
          <a
            href={submitResult.waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-3 rounded-[5px] hover:bg-[#1fba58] transition-colors"
          >
            💬 Seguir por WhatsApp
          </a>
        )}
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-[#E5EAF0] rounded-xl overflow-hidden max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#F1F5F9]">
        <span className="label-text block mb-2">Solicitar presupuesto</span>
        <h1 className="text-xl font-black text-navy">Cuéntanos tu proyecto</h1>
        <p className="text-sm font-medium text-muted mt-1">
          Respondemos en menos de 24h. Sin compromiso.
        </p>
      </div>

      <div className="px-6 py-5 flex flex-col gap-5">
        {/* Toggle "no sé" */}
        <button
          type="button"
          onClick={handleSinDetallesToggle}
          className={cn(
            'flex items-center gap-3 p-3 rounded-lg border text-left transition-colors',
            sinDetalles
              ? 'bg-[#EFF6FF] border-[#2563EB]'
              : 'bg-surface border-[#E5EAF0]'
          )}
        >
          <div
            className={cn(
              'w-9 h-5 rounded-full relative transition-colors flex-shrink-0',
              sinDetalles ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
            )}
          >
            <div
              className={cn(
                'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                sinDetalles ? 'translate-x-4' : 'translate-x-0.5'
              )}
            />
          </div>
          <div>
            <p className={cn('text-sm font-bold', sinDetalles ? 'text-[#1D4ED8]' : 'text-navy')}>
              No tengo claro los detalles técnicos
            </p>
            <p className="text-xs text-muted">Solo cuéntanos qué quieres, nosotros te asesoramos</p>
          </div>
        </button>

        {sinDetalles && (
          <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-3 text-xs text-[#92400E] leading-relaxed">
            💡 No te preocupes por el material ni la cantidad. Cuéntanos qué quieres conseguir y te recomendamos lo mejor para tu proyecto.
          </div>
        )}

        {/* Nombre + Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-1.5">
              Nombre *
            </label>
            <input
              {...register('nombre')}
              placeholder="Tu nombre"
              className={cn(
                'w-full border rounded-[5px] px-3 py-2 text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]',
                errors.nombre ? 'border-red-400' : 'border-[#E5EAF0]'
              )}
            />
            {errors.nombre && (
              <p className="text-xs text-red-500 mt-1">{errors.nombre.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-1.5">
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="tu@email.com"
              className={cn(
                'w-full border rounded-[5px] px-3 py-2 text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]',
                errors.email ? 'border-red-400' : 'border-[#E5EAF0]'
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-1.5">
            Teléfono / WhatsApp
          </label>
          <input
            {...register('telefono')}
            placeholder="+34 6XX XXX XXX (opcional)"
            className="w-full border border-[#E5EAF0] rounded-[5px] px-3 py-2 text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-1.5">
            {sinDetalles ? '¿Qué necesitas? *' : 'Descripción del proyecto *'}
          </label>
          <textarea
            {...register('descripcion')}
            rows={3}
            placeholder={
              sinDetalles
                ? 'Ej: "quiero una pieza para sujetar mi teléfono en la bici"'
                : '¿Qué necesitas imprimir?'
            }
            className={cn(
              'w-full border rounded-[5px] px-3 py-2 text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] resize-none',
              errors.descripcion ? 'border-red-400' : 'border-[#E5EAF0]'
            )}
          />
          {errors.descripcion && (
            <p className="text-xs text-red-500 mt-1">{errors.descripcion.message}</p>
          )}
        </div>

        {/* Material + Cantidad — only if sinDetalles is false */}
        {!sinDetalles && (
          <>
            <div>
              <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-2">
                Material *
              </label>
              <div className="flex gap-2 flex-wrap">
                {MATERIALES.map((m) => (
                  <label key={m.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={m.id}
                      {...register('material')}
                      className="sr-only"
                    />
                    <span className="inline-block bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] text-xs font-semibold px-3 py-1.5 rounded has-[:checked]:bg-[#2563EB] has-[:checked]:text-white has-[:checked]:border-[#2563EB] transition-colors">
                      {m.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.material && (
                <p className="text-xs text-red-500 mt-1">{errors.material.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-2">
                Cantidad *
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {(['1', '2-5', 'mas5'] as CantidadOpcion[]).map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => handleCantidadOpcion(op)}
                    className={cn(
                      'text-xs font-semibold px-3 py-1.5 rounded border transition-colors',
                      cantidadOpcion === op
                        ? 'bg-[#2563EB] text-white border-[#2563EB]'
                        : 'bg-white text-[#475569] border-[#E5EAF0] hover:border-[#BFDBFE]'
                    )}
                  >
                    {op === 'mas5' ? '+5' : op}
                  </button>
                ))}
                {cantidadOpcion === 'mas5' && (
                  <input
                    type="number"
                    min={6}
                    placeholder="¿Cuántas?"
                    onChange={(e) => setValue('cantidadExacta', parseInt(e.target.value))}
                    className="w-24 border border-[#2563EB] bg-[#EFF6FF] rounded-[5px] px-3 py-1.5 text-sm text-navy focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                  />
                )}
              </div>
            </div>
          </>
        )}

        {/* Modalidad */}
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-2">
            Modalidad de entrega *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['recogida', 'envio'] as const).map((op) => (
              <label key={op} className="cursor-pointer">
                <input
                  type="radio"
                  value={op}
                  {...register('modalidad')}
                  className="sr-only"
                />
                <div
                  className={cn(
                    'border rounded-[5px] p-3 text-center transition-colors',
                    modalidad === op
                      ? 'border-[#2563EB] bg-[#EFF6FF]'
                      : 'border-[#E5EAF0] hover:border-[#BFDBFE]'
                  )}
                >
                  <div className="text-lg mb-1">{op === 'recogida' ? '📍' : '🚚'}</div>
                  <div className={cn('text-xs font-bold', modalidad === op ? 'text-[#1D4ED8]' : 'text-navy')}>
                    {op === 'recogida' ? 'Recogida' : 'Envío'}
                  </div>
                  <div className="text-[10px] text-muted">
                    {op === 'recogida' ? 'Badalona' : 'Península'}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Archivo */}
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase tracking-wide mb-2">
            Archivo (opcional)
          </label>
          <div className="border-2 border-dashed border-[#BFDBFE] rounded-[5px] p-4 text-center bg-[#F8FAFF]">
            <div className="text-xl mb-1">📎</div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".stl,.obj,.3mf"
              className="hidden"
              id="archivo-upload"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            />
            <label htmlFor="archivo-upload" className="cursor-pointer">
              <span className="text-xs font-semibold text-[#2563EB]">
                {selectedFile ? selectedFile.name : 'Arrastra o selecciona archivo'}
              </span>
              <p className="text-[10px] text-muted mt-0.5">STL · OBJ · 3MF · max 50MB</p>
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#25D366] text-white font-black py-3 rounded-[5px] hover:bg-[#1fba58] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : '💬 Enviar y recibir respuesta'}
        </button>

        {submitResult && !submitResult.ok && (
          <p className="text-xs text-red-500 text-center">{submitResult.message}</p>
        )}

        <p className="text-[10px] text-muted text-center leading-relaxed">
          Al enviar aceptas nuestra{' '}
          <a href="/privacidad" className="text-[#2563EB] hover:underline">
            Política de privacidad
          </a>
          . Nunca compartimos tus datos con terceros.
        </p>
      </div>
    </form>
  )
}
