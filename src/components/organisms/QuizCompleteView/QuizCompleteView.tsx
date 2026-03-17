import styles from './QuizCompleteView.module.css'

interface QuizCompleteViewProps {
  score: number
  total: number
  onRestart: () => void
  onHome: () => void
}

export function QuizCompleteView({ score, total, onRestart, onHome }: QuizCompleteViewProps) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0
  const message = percent >= 80 ? 'Excellent work!' : percent >= 60 ? 'Good effort, keep going' : 'Keep practising!'

  return (
    <div className={styles.container}>
      <div className={styles.topicTag}>MIXED QUIZ</div>
      <h1 className={styles.title}>Quiz Complete</h1>
      <div className={styles.scoreBox}>
        <div className={styles.scoreRow}>
          <span className={styles.scoreNum}>{score}</span>
          <span className={styles.scoreDenom}>/ {total}</span>
        </div>
        <p className={styles.scoreLabel}>questions correct</p>
        <div className={styles.pctBadge}>
          <span className={styles.pctNum}>{percent}%</span>
          <span className={styles.pctMsg}>— {message}</span>
        </div>
      </div>
      <div className={styles.breakdown}>
        <div className={styles.breakdownItem}>
          <span className={styles.breakdownNum} style={{ color: 'var(--color-primary)' }}>{score}</span>
          <span className={styles.breakdownLabel}>Correct</span>
        </div>
        <div className={styles.breakdownDivider} />
        <div className={styles.breakdownItem}>
          <span className={styles.breakdownNum} style={{ color: 'var(--color-error)' }}>{total - score}</span>
          <span className={styles.breakdownLabel}>Incorrect</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.secondaryBtn} onClick={onRestart}>Try Again</button>
        <button className={styles.primaryBtn} onClick={onHome}>Back to Study</button>
      </div>
    </div>
  )
}
