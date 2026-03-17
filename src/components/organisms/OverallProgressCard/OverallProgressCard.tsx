import { useOverallProgress } from '../../../hooks'
import styles from './OverallProgressCard.module.css'

export function OverallProgressCard() {
  const { topicStatuses } = useOverallProgress()
  const completeCount = Object.values(topicStatuses).filter(s => s === 'complete').length

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <span className={styles.label}>Overall Progress</span>
        <p className={styles.count}>
          <span className={styles.done}>{completeCount}</span>
          <span className={styles.sep}> / 17 topics</span>
        </p>
      </div>
      <div className={styles.right}>
        <span className={styles.streakValue}>Day 1</span>
        <span className={styles.streakLabel}>Streak</span>
      </div>
    </div>
  )
}
