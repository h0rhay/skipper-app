import styles from './StudyModeRow.module.css'

interface StudyModeRowProps {
  label: string
  progressText?: string
  onClick: () => void
}

export function StudyModeRow({ label, progressText, onClick }: StudyModeRowProps) {
  return (
    <button className={styles.row} onClick={onClick}>
      <span className={styles.label}>{label}</span>
      {progressText && <span className={styles.progress}>{progressText}</span>}
      <span className={styles.chevron}>›</span>
    </button>
  )
}
