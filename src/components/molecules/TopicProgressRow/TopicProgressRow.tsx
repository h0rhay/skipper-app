import styles from './TopicProgressRow.module.css'
import type { TopicCompletionStatus } from '../../../types'

interface TopicProgressRowProps {
  title: string
  status: TopicCompletionStatus
  mcqScore?: number
  onClick: () => void
}

export function TopicProgressRow({ title, status: _status, mcqScore, onClick }: TopicProgressRowProps) {
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
