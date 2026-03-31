'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function WhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const waUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34600000000',
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? 'Hola! Me interesa la impresión 3D en Badalona.'
  )

  useGSAP(() => {
    const btn = buttonRef.current
    if (!btn) return

    // Entrance animation after 1.5s
    gsap.from(btn, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      delay: 1.5,
      ease: 'back.out(1.7)',
    })

    // Subtle pulse every ~4s (infinite loop)
    gsap.to(btn, {
      scale: 1.08,
      duration: 0.3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      repeatDelay: 3.7,
      delay: 2.5,
    })
  })

  return (
    <a
      ref={buttonRef}
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform"
    >
      <span className="text-2xl">💬</span>
    </a>
  )
}
