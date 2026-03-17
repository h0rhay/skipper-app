import { useOverallProgress } from '../../../hooks'
import styles from './OverallProgressCard.module.css'

export function OverallProgressCard() {
  const { percentComplete } = useOverallProgress()

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
