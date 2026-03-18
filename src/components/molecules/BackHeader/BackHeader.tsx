import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

interface BackHeaderProps {
  label: string
  to: LinkProps['to']
  params?: LinkProps["params"]
}

export function BackHeader({ label, to, params }: BackHeaderProps) {
  return (
    <div className="h-14 flex items-center sticky top-0">
      <Link
        to={to}
        params={params}
        className="flex items-center gap-1.5 text-text-secondary text-md font-normal no-underline active:opacity-70"
      >
        <ChevronLeft size={20} aria-hidden="true" />
        <span>{label}</span>
      </Link>
    </div>
  )
}
