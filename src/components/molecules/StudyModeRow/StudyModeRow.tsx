import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '#/lib/utils'

interface StudyModeRowProps {
  label: string
  description?: string
  progressText?: string
  icon?: ReactNode
  variant?: 'default' | 'featured'
  onClick: () => void
}

export function StudyModeRow({ label, description, progressText, icon, variant = 'default', onClick }: StudyModeRowProps) {
  const featured = variant === 'featured'

  return (
    <button
      className={cn(
        'flex items-center gap-3.5 w-full px-4 py-4 border-none text-left cursor-pointer transition-opacity duration-100 mb-2 active:opacity-85',
        featured ? 'bg-navy' : 'bg-bg-card'
      )}
      onClick={onClick}
    >
      {icon && (
        <span
          className={cn(
            'w-10 h-10 flex items-center justify-center flex-shrink-0',
            featured ? 'bg-white/12 text-white' : 'bg-primary/10 text-primary'
          )}
        >
          {icon}
        </span>
      )}
      <span className="flex-1 flex flex-col gap-0.5 min-w-0">
        <span className={cn('text-base font-semibold', featured ? 'text-white' : 'text-text')}>
          {label}
        </span>
        {description && (
          <span className={cn('text-sm', featured ? 'text-white/65' : 'text-text-secondary')}>
            {description}
          </span>
        )}
      </span>
      <span className="flex items-center gap-1.5 flex-shrink-0">
        {progressText && (
          <span className={cn('text-xs font-semibold', featured ? 'text-white/55' : 'text-text-muted')}>
            {progressText}
          </span>
        )}
        <ChevronRight
          size={16}
          className={cn(featured ? 'text-white/60' : 'text-text-muted')}
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </span>
    </button>
  )
}
