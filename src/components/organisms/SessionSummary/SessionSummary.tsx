import type { SessionMode } from '../../../types'
import styles from './SessionSummary.module.css'

interface SessionSummaryProps {
  mode: SessionMode
  topicTitle: string
  score: number
  total: number
  wrongIds: string[]
  onReview: () => void
  onNext: () => void
}

export function SessionSummary({ mode, topicTitle, score, total, wrongIds, onReview, onNext }: SessionSummaryProps) {
  const pct = total === 0 ? 0 : Math.round((score / total) * 100)
  const hasWeak = wrongIds.length > 0
  const reviewLabel = mode === 'flashcards' ? 'Retry weak cards' : 'Review wrong answers'
  const message = pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Good effort, keep going' : 'Keep practising!'

  return (
    <div className={styles.container}>
      <span className={styles.topicTag}>{topicTitle.split('—')[0].trim().toUpperCase()}</span>
      <h1 className={styles.title}>Session Complete</h1>

      {/* Big score */}
      <div className={styles.scoreBox}>
        <div className={styles.scoreRow}>
          <span className={styles.scoreNum}>{score}</span>
          <span className={styles.scoreDenom}>/ {total}</span>
        </div>
        <p className={styles.scoreLabel}>{mode === 'flashcards' ? 'cards mastered' : 'questions correct'}</p>
        <div className={styles.pctBadge}>
          <span className={styles.pctNum}>{pct}%</span>
          <span className={styles.pctMsg}>— {message}</span>
        </div>
      </div>

      {/* Breakdown bar */}
      <div className={styles.breakdown}>
        <div className={styles.breakdownItem}>
          <span className={styles.breakdownNum} data-variant="correct">{score}</span>
          <span className={styles.breakdownLabel}>Correct</span>
        </div>
        <div className={styles.breakdownDivider} />
        <div className={styles.breakdownItem}>
          <span className={styles.breakdownNum} data-variant="wrong">{total - score}</span>
          <span className={styles.breakdownLabel}>Incorrect</span>
        </div>
        <div className={styles.breakdownDivider} />
        <div className={styles.breakdownItem}>
          <span className={styles.breakdownNum} data-variant="pct">{pct}%</span>
          <span className={styles.breakdownLabel}>Score</span>
        </div>
      </div>

      {/* CTAs */}
      <div className={styles.actions}>
        {hasWeak && (
          <button className={styles.secondaryBtn} onClick={onReview}>
            {reviewLabel}
          </button>
        )}
        <button className={styles.primaryBtn} onClick={onNext}>
          Next Topic →
        </button>
      </div>
    </div>
  )
}
