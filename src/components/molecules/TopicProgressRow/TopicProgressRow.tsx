import styles from './TopicProgressRow.module.css'

interface TopicProgressRowProps {
  title: string
  mcqScore?: number
  onClick: () => void
}

export function TopicProgressRow({ title, mcqScore, onClick }: TopicProgressRowProps) {
  return (
    <button className={styles.row} onClick={onClick}>
      <span className={styles.title}>{title}</span>
      <span className={styles.score}>
        {mcqScore !== undefined ? `${mcqScore}%` : '—'}
      </span>
      <span className={styles.chevron}>›</span>
    </button>
  )
}
