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
  const isInProgress = status === 'partial'

  return (
    <button
      className={`${styles.row} ${isInProgress ? styles.inProgress : ''}`}
      onClick={onClick}
    >
      <span className={styles.number}>{String(number).padStart(2, '0')}</span>
      <span className={`${styles.title} ${isInProgress ? styles.titleBold : ''}`}>{title}</span>
      <span className={styles.meta}>
        {status === 'partial' && <span className={styles.statusInProgress}>In Progress</span>}
        {status === 'complete' && <span className={styles.statusComplete}>Complete</span>}
        {status === 'none' && isSafetyCritical && <Badge label="Critical" variant="danger" />}
        {status === 'none' && !isSafetyCritical && <span className={styles.statusNone}>Not Started</span>}
      </span>
      <svg className={styles.chevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  )
}
