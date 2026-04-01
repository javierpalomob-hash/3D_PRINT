'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'cookie-consent'

type ConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
  savedAt: string
}

function loadConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

function saveConsent(analytics: boolean, marketing: boolean): ConsentState {
  const consent: ConsentState = {
    necessary: true,
    analytics,
    marketing,
    savedAt: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
  return consent
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    if (!loadConsent()) setVisible(true)
  }, [])

  if (!visible) return null

  function acceptAll() {
    saveConsent(true, true)
    setVisible(false)
  }

  function rejectAll() {
    saveConsent(false, false)
    setVisible(false)
  }

  function saveCustom() {
    saveConsent(analytics, marketing)
    setVisible(false)
    setModalOpen(false)
  }

  return (
    <>
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5EAF0] shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 text-sm text-[#475569]">
            🍪 <strong className="text-navy">Usamos cookies</strong> para mejorar tu experiencia.
            Puedes aceptarlas, rechazarlas o{' '}
            <span
              role="link"
              tabIndex={0}
              onClick={() => setModalOpen(true)}
              onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
              className="text-[#2563EB] underline hover:no-underline cursor-pointer"
            >
              personalizar
            </span>{' '}
            tu elección.{' '}
            <Link href="/cookies" className="text-[#2563EB] hover:underline">
              Más info
            </Link>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={rejectAll}
              className="text-xs font-semibold px-4 py-2 rounded border border-[#E5EAF0] text-[#475569] hover:border-[#94A3B8] transition-colors"
            >
              Rechazar
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs font-semibold px-4 py-2 rounded border border-[#BFDBFE] text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] transition-colors"
            >
              Personalizar
            </button>
            <button
              onClick={acceptAll}
              className="text-xs font-bold px-4 py-2 rounded bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
            >
              Aceptar todo
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-navy/60 z-50 flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-black text-navy mb-1">Preferencias de cookies</h2>
            <p className="text-xs text-[#475569] mb-6">
              Elige qué cookies aceptas. Las necesarias siempre están activas.
            </p>

            <div className="space-y-4 mb-6">
              {/* Necesarias */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-navy">Cookies necesarias</p>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Imprescindibles para el funcionamiento del sitio. No se pueden desactivar.
                  </p>
                </div>
                <div className="w-10 h-6 rounded-full bg-[#2563EB] flex-shrink-0 flex items-center justify-end pr-1">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>

              {/* Analíticas */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <label htmlFor="analytics-toggle" className="text-sm font-bold text-navy cursor-pointer">
                    Cookies analíticas
                  </label>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Nos ayudan a entender cómo usas el sitio (Google Analytics).
                  </p>
                </div>
                <button
                  id="analytics-toggle"
                  role="checkbox"
                  aria-label="Analíticas"
                  aria-checked={analytics}
                  onClick={() => setAnalytics(!analytics)}
                  className={cn(
                    'w-10 h-6 rounded-full flex-shrink-0 flex items-center transition-colors',
                    analytics ? 'bg-[#2563EB] justify-end pr-1' : 'bg-[#CBD5E1] justify-start pl-1'
                  )}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <label htmlFor="marketing-toggle" className="text-sm font-bold text-navy cursor-pointer">
                    Cookies de marketing
                  </label>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Publicidad personalizada. Actualmente no las usamos.
                  </p>
                </div>
                <button
                  id="marketing-toggle"
                  role="checkbox"
                  aria-label="Marketing"
                  aria-checked={marketing}
                  onClick={() => setMarketing(!marketing)}
                  className={cn(
                    'w-10 h-6 rounded-full flex-shrink-0 flex items-center transition-colors',
                    marketing ? 'bg-[#2563EB] justify-end pr-1' : 'bg-[#CBD5E1] justify-start pl-1'
                  )}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={rejectAll}
                className="flex-1 text-xs font-semibold py-2.5 rounded border border-[#E5EAF0] text-[#475569] hover:border-[#94A3B8] transition-colors"
              >
                Rechazar todo
              </button>
              <button
                onClick={saveCustom}
                className="flex-1 text-xs font-bold py-2.5 rounded bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
