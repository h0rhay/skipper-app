import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import styles from './BackHeader.module.css'

interface BackHeaderProps {
  label: string
  to: LinkProps['to']
}

export function BackHeader({ label, to }: BackHeaderProps) {
  return (
    <div className={styles.header}>
      <Link to={to} className={styles.back}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        <span>{label}</span>
      </Link>
    </div>
  )
}
