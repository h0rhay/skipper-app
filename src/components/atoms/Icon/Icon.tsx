import { Map, BookOpen, BarChart2, ChevronRight, ChevronLeft, AlertTriangle, Check, X } from 'lucide-react'

const ICONS = {
  map: Map,
  study: BookOpen,
  progress: BarChart2,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  warning: AlertTriangle,
  check: Check,
  close: X,
} as const

type IconName = keyof typeof ICONS

interface IconProps { name: IconName; size?: number; color?: string }

export function Icon({ name, size = 20, color = 'currentColor' }: IconProps) {
  const Component = ICONS[name]
  return <Component size={size} color={color} />
}
