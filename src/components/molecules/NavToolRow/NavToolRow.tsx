import { ChevronRight } from 'lucide-react'

interface NavToolRowProps {
  toolId: string
  label: string
  attempts: number
  onClick: () => void
}

export function NavToolRow({ toolId: _toolId, label, attempts, onClick }: NavToolRowProps) {
  return (
    <button
      className="flex items-center gap-3 w-full px-4 py-3.5 bg-bg-card border-none border-b border-border text-left cursor-pointer hover:bg-bg-muted"
      onClick={onClick}
    >
      <span className="flex-1 text-base font-semibold text-text">{label}</span>
      {attempts > 0 && (
        <span className="text-sm text-text-secondary bg-bg-muted px-2 py-0.5">
          {attempts}
        </span>
      )}
      <ChevronRight size={18} className="text-text-muted" aria-hidden="true" />
    </button>
  )
}
