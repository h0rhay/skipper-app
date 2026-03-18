import { cn } from '#/lib/utils'

export type OptionState = 'idle' | 'selected' | 'correct' | 'wrong'

interface OptionButtonProps {
  label: string
  text: string
  state: OptionState
  onClick: () => void
}

export function OptionButton({ label, text, state, onClick }: OptionButtonProps) {
  const isLocked = state === 'correct' || state === 'wrong'
  return (
    <button
      className={cn(
        'flex items-center gap-3 w-full px-4 py-[14px] border-0 border-b border-border bg-bg-card text-left cursor-pointer last:border-b-0',
        state === 'idle' && 'hover:bg-bg-muted',
        state === 'selected' && 'bg-[var(--color-sea-light)]',
        state === 'correct' && 'bg-[var(--color-success-bg)]',
        state === 'wrong' && 'bg-[var(--color-error-bg)]',
      )}
      data-state={state}
      onClick={onClick}
      disabled={isLocked}
    >
      <span
        className={cn(
          'w-7 h-7 flex items-center justify-center font-bold text-sm text-text border border-text shrink-0',
          state === 'selected' && 'bg-primary text-white border-primary',
          state === 'correct' && 'bg-success text-white border-success',
          state === 'wrong' && 'bg-danger text-white border-danger',
        )}
      >
        {label}
      </span>
      <span className="flex-1 text-md text-text">{text}</span>
    </button>
  )
}
