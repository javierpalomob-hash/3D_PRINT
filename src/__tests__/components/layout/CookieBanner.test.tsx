import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CookieBanner } from '@/components/layout/CookieBanner'

const STORAGE_KEY = 'cookie-consent'

beforeEach(() => {
  localStorage.clear()
})

describe('CookieBanner', () => {
  it('shows banner when no consent stored', () => {
    render(<CookieBanner />)
    expect(screen.getByText(/usamos cookies/i)).toBeInTheDocument()
  })

  it('does not show banner when consent already stored', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ necessary: true, analytics: false, marketing: false, savedAt: new Date().toISOString() })
    )
    render(<CookieBanner />)
    expect(screen.queryByText(/usamos cookies/i)).not.toBeInTheDocument()
  })

  it('hides banner and saves consent on "Aceptar todo"', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByRole('button', { name: /aceptar todo/i }))
    expect(screen.queryByText(/usamos cookies/i)).not.toBeInTheDocument()
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored).toMatchObject({ necessary: true, analytics: true, marketing: true })
  })

  it('hides banner and saves deny on "Rechazar"', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByRole('button', { name: /rechazar/i }))
    expect(screen.queryByText(/usamos cookies/i)).not.toBeInTheDocument()
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored).toMatchObject({ necessary: true, analytics: false, marketing: false })
  })

  it('opens preferences modal on "Personalizar"', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByRole('button', { name: /personalizar/i }))
    expect(screen.getByText(/cookies necesarias/i)).toBeInTheDocument()
    expect(screen.getByText(/cookies analíticas/i)).toBeInTheDocument()
    expect(screen.getByText(/cookies de marketing/i)).toBeInTheDocument()
  })

  it('saves custom preferences from modal', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByRole('button', { name: /personalizar/i }))
    const analyticsToggle = screen.getByRole('checkbox', { name: /analíticas/i })
    fireEvent.click(analyticsToggle)
    fireEvent.click(screen.getByRole('button', { name: /guardar preferencias/i }))
    expect(screen.queryByText(/usamos cookies/i)).not.toBeInTheDocument()
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored).toMatchObject({ necessary: true, analytics: true, marketing: false })
  })
})
