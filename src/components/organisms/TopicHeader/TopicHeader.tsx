import type { Topic, TopicProgress } from '../../../types'
import styles from './TopicHeader.module.css'

interface TopicHeaderProps {
  topic: Topic
  progress: TopicProgress | null
}

export function TopicHeader({ topic, progress }: TopicHeaderProps) {
  const factsCount = topic.keyTerms.length + topic.safetyNotes.length
  const termsCount = topic.flashcards.length
  const questionsCount = topic.mcqQuestions.length

  const masteredCards = progress?.flashcards.masteredIds.length ?? 0

  return (
    <div className={styles.header}>
      <span className={styles.number}>{String(topic.number).padStart(2, '0')}</span>
      <h1 className={styles.title}>{topic.title}</h1>
      <p className={styles.description}>{topic.description}</p>
      {topic.isSafetyCritical && (
        <div className={styles.criticalBadge}>
          <span className={styles.criticalDot} />
          <span className={styles.criticalText}>SAFETY CRITICAL TOPIC</span>
        </div>
      )}
      <div className={styles.statsBar}>
        <div className={styles.statCell}>
          <span className={styles.statValue}>{factsCount}</span>
          <span className={styles.statLabel}>KEY FACTS</span>
        </div>
        <div className={styles.statCell}>
          <span className={styles.statValue}>{masteredCards}/{termsCount}</span>
          <span className={styles.statLabel}>TERMS</span>
        </div>
        <div className={`${styles.statCell} ${styles.statCellLast}`}>
          <span className={styles.statValue}>{questionsCount}</span>
          <span className={styles.statLabel}>QUESTIONS</span>
        </div>
      </div>
    </div>
  )
}
