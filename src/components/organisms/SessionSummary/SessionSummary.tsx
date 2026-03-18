import type { SessionMode } from '../../../types'

interface SessionSummaryProps {
  mode: SessionMode
  topicTitle: string
  score: number
  total: number
  wrongIds: string[]
  onReview: () => void
  onNext: () => void
}

export function SessionSummary({ mode, topicTitle, score, total, wrongIds, onReview, onNext }: SessionSummaryProps) {
  const pct = total === 0 ? 0 : Math.round((score / total) * 100)
  const hasWeak = wrongIds.length > 0
  const reviewLabel = mode === 'flashcards' ? 'Retry weak cards' : 'Review wrong answers'
  const message = pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Good effort, keep going' : 'Keep practising!'

  return (
    <div className="flex flex-col gap-5 p-6">
      <span className="font-body text-xs font-bold tracking-[1.5px] text-text-muted uppercase">{topicTitle.split('—')[0].trim().toUpperCase()}</span>
      <h1 className="font-heading text-[32px] font-medium text-text tracking-[-0.5px] m-0">Session Complete</h1>

      {/* Big score */}
      <div className="flex flex-col gap-1 py-5 pb-4 border-b border-border">
        <div className="flex items-end gap-2">
          <span className="font-heading text-[64px] font-medium text-text leading-none">{score}</span>
          <span className="font-heading text-[24px] font-light text-text-muted mb-2">/ {total}</span>
        </div>
        <p className="font-body text-md text-text-tertiary m-0">{mode === 'flashcards' ? 'cards mastered' : 'questions correct'}</p>
        <div className="flex items-center gap-2 bg-sand px-3 py-2 mt-1">
          <span className="font-heading text-xl font-bold text-primary">{pct}%</span>
          <span className="font-body text-md text-text-tertiary">— {message}</span>
        </div>
      </div>

      {/* Breakdown bar */}
      <div className="flex border border-border">
        <div className="flex-1 flex flex-col items-center gap-0.5 px-2 py-4">
          <span className="font-body text-[28px] font-bold text-primary" data-variant="correct">{score}</span>
          <span className="font-body text-[11px] text-text-muted">Correct</span>
        </div>
        <div className="w-px bg-border" />
        <div className="flex-1 flex flex-col items-center gap-0.5 px-2 py-4">
          <span className="font-body text-[28px] font-bold text-danger" data-variant="wrong">{total - score}</span>
          <span className="font-body text-[11px] text-text-muted">Incorrect</span>
        </div>
        <div className="w-px bg-border" />
        <div className="flex-1 flex flex-col items-center gap-0.5 px-2 py-4">
          <span className="font-body text-[28px] font-bold text-text" data-variant="pct">{pct}%</span>
          <span className="font-body text-[11px] text-text-muted">Score</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-[10px] pt-1">
        {hasWeak && (
          <button
            className="h-[52px] bg-bg-card border border-border font-body text-base font-semibold text-text-secondary cursor-pointer transition-[background] duration-150 hover:bg-bg-muted"
            onClick={onReview}
          >
            {reviewLabel}
          </button>
        )}
        <button
          className="h-[52px] bg-primary border-none font-body text-base font-bold text-white cursor-pointer transition-[background] duration-150 hover:bg-[var(--color-primary-hover)]"
          onClick={onNext}
        >
          Next Topic →
        </button>
      </div>
    </div>
  )
}
