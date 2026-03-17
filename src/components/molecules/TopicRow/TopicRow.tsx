import { Badge } from '../../atoms/Badge'
import styles from './TopicRow.module.css'
import type { TopicCompletionStatus } from '../../../types'

interface TopicRowProps {
  number: number
  title: string
  status: TopicCompletionStatus
  isSafetyCritical?: boolean
  onClick: () => void
}

export function TopicRow({ number, title, status, isSafetyCritical, onClick }: TopicRowProps) {
  return (
    <button className={styles.row} onClick={onClick}>
      <Badge label={String(number).padStart(2, '0')} variant="topic" />
      <span className={styles.title}>{title}</span>
      {isSafetyCritical && <Badge label="Safety" variant="danger" />}
      {status === 'complete' && <Badge label="Complete" variant="default" />}
      <span className={styles.chevron}>›</span>
    </button>
  )
}
