import { ChevronRight } from 'lucide-react'
import { cn } from '#/lib/utils'
import { buttonVariants } from '#/components/ui/button'

interface ButtonProps {
  children: React.ReactNode
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  fullWidth?: boolean
  hideChevron?: boolean
}

export function Button({ children, onClick, variant = 'primary', disabled = false, fullWidth = false, hideChevron = false }: ButtonProps) {
  const shadcnVariant = variant === 'primary' ? 'default' : variant === 'secondary' ? 'outline' : 'ghost'
  return (
    <button
      className={cn(
        buttonVariants({ variant: shadcnVariant }),
        'h-[52px] px-6 font-body text-base font-bold transition-[background,opacity]',
        variant === 'primary' && 'bg-primary text-white hover:bg-[var(--color-primary-hover)]',
        variant === 'secondary' && 'bg-transparent text-text border border-border hover:bg-bg-muted',
        variant === 'ghost' && 'bg-transparent text-primary',
        fullWidth && 'w-full shrink',
        disabled && 'opacity-40 cursor-not-allowed',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {!hideChevron && <ChevronRight className="ml-1 size-5" />}
    </button>
  )
}
