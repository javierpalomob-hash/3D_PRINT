import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-[#E5EAF0] rounded-lg p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
