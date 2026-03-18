import { useWeightedProgress } from '../../../hooks/useWeightedProgress'

interface OverallProgressCardProps {
  variant?: 'compact' | 'full'
  percentComplete?: number
  currentStreak?: number
}

export function OverallProgressCard({ variant = 'full', percentComplete: percentCompleteProp, currentStreak: currentStreakProp }: OverallProgressCardProps) {
  const { percentComplete: computedPercent } = useWeightedProgress()
  const percentComplete = percentCompleteProp ?? computedPercent

  if (variant === 'compact') {
    const streak = currentStreakProp ?? 0
    return (
      <div className="flex items-center justify-between border border-border p-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-text-muted uppercase tracking-[1px]">OVERALL PROGRESS</span>
          <p className="m-0">
            <span className="font-heading text-2xl font-medium text-navy">{percentComplete}</span>
            <span className="text-base text-text-secondary">% complete</span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-heading text-lg font-medium text-primary">{streak} DAY</span>
          <span className="text-xs font-semibold text-text-muted tracking-[1.5px]">STREAK</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 pt-5 pb-4">
      <span className="text-xs font-bold text-text-muted uppercase tracking-[1px]">OVERALL COMPLETION</span>
      <div className="flex items-end gap-1">
        <span className="font-heading font-medium text-navy leading-none" style={{ fontSize: '52px' }}>{percentComplete}</span>
        <span className="font-heading text-base text-text-muted pb-2">% complete</span>
      </div>
      <div className="h-1.5 bg-bg-muted overflow-hidden">
        <div
          className="h-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${percentComplete}%`, minWidth: 0 }}
        />
      </div>
    </div>
  )
}
