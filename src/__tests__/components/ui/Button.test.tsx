import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Enviar</Button>)
    expect(screen.getByText('Enviar')).toBeInTheDocument()
  })

  it('applies primary variant by default', () => {
    render(<Button>Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-[#2563EB]')
  })

  it('applies whatsapp variant', () => {
    render(<Button variant="whatsapp">WhatsApp</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-[#25D366]')
  })

  it('applies outline variant', () => {
    render(<Button variant="outline">Ver más</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')
  })

  it('passes through html button props', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
