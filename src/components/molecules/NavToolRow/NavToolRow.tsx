import styles from './NavToolRow.module.css'

interface NavToolRowProps {
  toolId: string
  label: string
  attempts: number
  onClick: () => void
}

export function NavToolRow({ toolId: _toolId, label, attempts, onClick }: NavToolRowProps) {
  return (
    <button className={styles.row} onClick={onClick}>
      <span className={styles.label}>{label}</span>
      {attempts > 0 && <span className={styles.attempts}>{attempts}</span>}
      <span className={styles.chevron}>›</span>
    </button>
  )
}
