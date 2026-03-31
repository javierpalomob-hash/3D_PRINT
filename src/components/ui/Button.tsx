import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'whatsapp' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#1fba58] transition-colors',
  outline:
    'border border-[#BFDBFE] text-[#2563EB] bg-white hover:bg-[#EFF6FF] transition-colors',
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] text-sm font-bold',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
