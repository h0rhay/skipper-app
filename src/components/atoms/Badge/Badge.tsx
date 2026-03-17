import styles from './Badge.module.css'

interface BadgeProps {
  label: string
  variant?: 'danger' | 'topic' | 'default'
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {label}
    </span>
  )
}
