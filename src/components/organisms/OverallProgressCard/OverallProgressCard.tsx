import { useOverallProgress } from '../../../hooks'
import { ScoreRing } from '../../atoms/ScoreRing'
import styles from './OverallProgressCard.module.css'

export function OverallProgressCard() {
  const { percentComplete, topicStatuses } = useOverallProgress()
  const completeCount = Object.values(topicStatuses).filter(s => s === 'complete').length

  return (
    <div className={styles.card}>
      <ScoreRing score={percentComplete} total={100} size={64} />
      <div className={styles.text}>
        <span className={styles.headline}>{completeCount} of 17 topics complete</span>
        <span className={styles.sub}>Day Skipper Theory</span>
      </div>
    </div>
  )
}
