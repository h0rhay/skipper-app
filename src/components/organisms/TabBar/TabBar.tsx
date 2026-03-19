import { Link } from '@tanstack/react-router'
import { BookOpen, Brain, TrendingUp } from 'lucide-react'
import { cn } from '#/lib/utils'

interface TabBarProps { active: 'study' | 'quiz' | 'progress' }

export function TabBar({ active }: TabBarProps) {
  return (
    <nav className="px-[21px] pt-3 pb-[34px] bg-bg-card border-t border-border">
      <div className="flex gap-1 rounded-[36px] border border-border p-1 h-[62px]">
        {([
          { key: 'study', to: '/', icon: BookOpen, label: 'STUDY' },
          { key: 'quiz', to: '/quiz', icon: Brain, label: 'QUIZ' },
          { key: 'progress', to: '/progress', icon: TrendingUp, label: 'PROGRESS' },
        ] as const).map(({ key, to, icon: Icon, label }) => (
          <Link
            key={key}
            to={to}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-1 font-body text-xs font-semibold tracking-[0.5px] uppercase no-underline transition-[background,color] duration-150 rounded-[26px]',
              active === key ? 'bg-navy text-white tab-active' : 'text-text-muted tab-inactive'
            )}
            activeProps={{}}
            activeOptions={key === 'study' ? { exact: true, includeSearch: false } : undefined}
          >
            <Icon size={18} className="shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
