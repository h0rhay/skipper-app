import { Anchor, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../../hooks'

export function TopNav() {
  const { theme, toggle } = useTheme()
  return (
    <header className="flex items-center justify-between px-6 pt-4 pb-2 bg-bg">
      <div className="flex items-center gap-1.5 text-navy font-body text-xs font-bold uppercase tracking-[1.5px]">
        <Anchor size={14} aria-hidden="true" />
        <span>Skipper</span>
      </div>
      <button
        className="bg-transparent border-0 text-text-muted p-1.5 cursor-pointer leading-none transition-[color] duration-150 hover:text-text"
        onClick={toggle}
        aria-label="Toggle dark mode"
      >
        {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      </button>
    </header>
  )
}
