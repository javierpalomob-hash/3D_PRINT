import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  className?: string
}

export function Badge({ label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]',
        'text-[10px] font-semibold px-2.5 py-1 rounded',
        className
      )}
    >
      {label}
    </span>
  )
}
