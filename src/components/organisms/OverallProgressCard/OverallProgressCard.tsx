import { useOverallProgress } from '../../../hooks'
import { useTopics } from '../../../hooks/useTopics'
import styles from './OverallProgressCard.module.css'

interface OverallProgressCardProps {
  variant?: 'compact' | 'full'
}

export function OverallProgressCard({ variant = 'full' }: OverallProgressCardProps) {
  const { percentComplete, topicStatuses } = useOverallProgress()
  const { topics } = useTopics()
  const completeCount = Object.values(topicStatuses).filter(s => s === 'complete').length
  const totalCount = topics.length

  if (variant === 'compact') {
    return (
      <div className={styles.compact}>
        <div className={styles.compactLeft}>
          <span className={styles.label}>OVERALL PROGRESS</span>
          <p className={styles.count}>
            <span className={styles.countValue}>{completeCount}</span>
            <span className={styles.countSep}> / {totalCount} topics</span>
          </p>
        </div>
        <div className={styles.compactRight}>
          <span className={styles.streakValue}>Day 1</span>
          <span className={styles.streakLabel}>STREAK</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <span className={styles.label}>OVERALL COMPLETION</span>
      <div className={styles.percentRow}>
        <span className={styles.percent}>{percentComplete}</span>
        <span className={styles.percentSuffix}>% complete</span>
      </div>
      <div className={styles.barBg}>
        <div className={styles.barFill} style={{ width: `${percentComplete}%` }} />
      </div>
    </div>
  )
}
