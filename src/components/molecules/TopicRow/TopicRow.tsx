import { ChevronRight } from 'lucide-react'
import { Badge } from '../../atoms/Badge'
import { cn } from '#/lib/utils'
import type { TopicCompletionStatus, MasteryTier } from '../../../types'

interface TopicRowProps {
  number: number
  title: string
  status: TopicCompletionStatus
  isSafetyCritical?: boolean
  tier?: MasteryTier
  onClick: () => void
}

export function TopicRow({ number, title, status, isSafetyCritical, tier, onClick }: TopicRowProps) {
  const isInProgress = status === 'partial'
  const isComplete = tier === 'passed' || tier === 'mastered'

  return (
    <button
      className={cn(
        'flex items-center gap-3 w-full px-4 py-3 border-none border-b border-border text-left cursor-pointer transition-colors duration-100 last:border-b-0',
        isComplete ? 'bg-sage-gradient' : isInProgress ? 'bg-warning/10 active:bg-warning/20' : 'bg-bg-card active:bg-bg-muted'
      )}
      onClick={onClick}
    >
      <span className="font-heading text-md font-medium text-primary min-w-[22px]">
        {String(number).padStart(2, '0')}
      </span>
      <span className={cn('flex-1 text-md text-text', isInProgress ? 'font-semibold' : 'font-normal')}>
        {title}
      </span>
      <span className="flex items-center gap-2">
        {isSafetyCritical && <Badge label="Critical" variant="danger" />}
        {tier && tier !== 'none' && (
          <span className={cn(
            'text-xs font-semibold uppercase tracking-widest whitespace-nowrap',
            tier === 'seen' && 'text-primary',
            tier === 'practised' && 'text-text',
            (tier === 'passed' || tier === 'mastered') && 'text-[var(--color-success)]',
          )}>
            {tier === 'seen' && 'SEEN'}
            {tier === 'practised' && 'PRACTISED'}
            {tier === 'passed' && 'PASSED'}
            {tier === 'mastered' && 'MASTERED'}
          </span>
        )}
      </span>
      <ChevronRight size={16} className="text-text-muted flex-shrink-0" strokeWidth={2.5} aria-hidden="true" />
    </button>
  )
}
