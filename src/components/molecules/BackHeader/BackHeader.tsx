import { Link } from '@tanstack/react-router'
import styles from './BackHeader.module.css'

interface BackHeaderProps {
  label: string
  to: string
}

export function BackHeader({ label, to }: BackHeaderProps) {
  return (
    <div className={styles.header}>
      <Link to={to as '/'} className={styles.back}>
        <span>‹</span>
        <span>{label}</span>
      </Link>
    </div>
  )
}
