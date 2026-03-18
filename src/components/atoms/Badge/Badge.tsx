import { cn } from '#/lib/utils'

interface BadgeProps {
  label: string
  variant?: 'danger' | 'warning' | 'topic' | 'default'
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-[7px] py-[2px] font-body text-xs font-bold tracking-[0.5px] uppercase whitespace-nowrap',
        variant,
        variant === 'default' && 'bg-bg-muted text-text-secondary',
        variant === 'danger' && 'bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)] text-danger',
        variant === 'warning' && 'bg-sand text-warning',
        variant === 'topic' && 'bg-primary text-white',
      )}
    >
      {label}
    </span>
  )
}
