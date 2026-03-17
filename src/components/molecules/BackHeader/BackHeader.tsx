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
        <span>‹</span>
        <span>{label}</span>
      </Link>
    </div>
  )
}
