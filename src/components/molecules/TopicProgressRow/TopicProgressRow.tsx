import { cn } from '#/lib/utils'

interface TopicProgressRowProps {
  title: string
  percent?: number
  isComplete?: boolean
  onClick: () => void
}

export function TopicProgressRow({ title, percent = 0, isComplete = false, onClick }: TopicProgressRowProps) {
  return (
    <button
      className={cn(
        'flex flex-col gap-1 w-full p-0 bg-transparent border-none text-left cursor-pointer',
        isComplete && 'bg-sage-gradient'
      )}
      onClick={onClick}
    >
      <span className="text-sm font-semibold text-text">{title}</span>
      <div className="h-1 bg-bg-muted overflow-hidden w-full">
        <div
          className="h-full bg-primary transition-[width] duration-300 ease-in-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </button>
  )
}
