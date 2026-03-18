import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '#/lib/utils'
import { getTermPath } from '../../illustrations/paths'

interface KeyTermRowProps {
  term: string
  definition: string
  isOpen?: boolean
  onToggle?: () => void
}

export function KeyTermRow({ term, definition, isOpen, onToggle }: KeyTermRowProps) {
  const [selfOpen, setSelfOpen] = useState(false)
  const open = isOpen !== undefined ? isOpen : selfOpen
  const handleToggle = onToggle ?? (() => setSelfOpen(v => !v))
  const illustrationSrc = getTermPath(term)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center justify-between w-full px-4 py-3 bg-bg-card text-left text-base font-semibold text-text hover:bg-bg-muted cursor-pointer border-none"
        aria-expanded={open}
      >
        {term}
        <ChevronDown
          size={16}
          className={cn(
            'text-text-muted shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      <div hidden={!open} className="bg-bg-muted px-4 pb-3.5 pt-2 text-sm text-text-secondary leading-relaxed">
        {illustrationSrc && (
          <div className="flex justify-center py-3 pb-2">
            <img src={illustrationSrc} alt={term} width={200} height={200} className="w-[200px] h-[200px] object-contain" />
          </div>
        )}
        <p className="m-0">{definition}</p>
      </div>
    </div>
  )
}
