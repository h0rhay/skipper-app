import styles from './SessionStatRow.module.css'

interface SessionStatRowProps {
  label: string
  value: string | number
}

export function SessionStatRow({ label, value }: SessionStatRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}
