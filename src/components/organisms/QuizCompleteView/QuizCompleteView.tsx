interface QuizCompleteViewProps {
  score: number
  total: number
  onRestart: () => void
  onHome: () => void
}

export function QuizCompleteView({ score, total, onRestart, onHome }: QuizCompleteViewProps) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0
  const message = percent >= 80 ? 'Excellent work!' : percent >= 60 ? 'Good effort, keep going' : 'Keep practising!'

  return (
    <div className="flex flex-col gap-4 px-6 pb-8">
      <div className="font-body text-xs font-bold tracking-[1.5px] text-text-muted uppercase pt-5">MIXED QUIZ</div>
      <h1 className="font-heading text-[32px] font-medium text-text tracking-[-0.5px] m-0">Quiz Complete</h1>
      <div className="flex flex-col gap-1 py-5 pb-4">
        <div className="flex items-end gap-2">
          <span className="font-heading text-[64px] font-medium text-text leading-none">{score}</span>
          <span className="font-heading text-[24px] font-light text-text-muted mb-2">/ {total}</span>
        </div>
        <p className="font-body text-md text-text-tertiary m-0">questions correct</p>
        <div className="flex items-center gap-2 bg-sand px-3 py-2 mt-1">
          <span className="font-heading text-xl font-bold text-primary">{percent}%</span>
          <span className="font-body text-md text-text-tertiary">— {message}</span>
        </div>
      </div>
      <div className="flex border border-border py-4">
        <div className="flex-1 flex flex-col items-center gap-0.5 px-2">
          <span className="font-body text-[28px] font-bold text-primary">{score}</span>
          <span className="font-body text-[11px] text-text-tertiary">Correct</span>
        </div>
        <div className="w-px bg-border" />
        <div className="flex-1 flex flex-col items-center gap-0.5 px-2">
          <span className="font-body text-[28px] font-bold text-danger">{total - score}</span>
          <span className="font-body text-[11px] text-text-tertiary">Incorrect</span>
        </div>
      </div>
      <div className="flex flex-col gap-[10px] pt-4">
        <button
          className="h-[52px] bg-bg-card border border-border font-body text-base font-semibold text-text-secondary cursor-pointer hover:bg-bg-muted"
          onClick={onRestart}
        >
          Try Again
        </button>
        <button
          className="h-[52px] bg-primary border-none font-body text-base font-bold text-white cursor-pointer hover:bg-[var(--color-primary-hover)]"
          onClick={onHome}
        >
          Back to Study
        </button>
      </div>
    </div>
  )
}
