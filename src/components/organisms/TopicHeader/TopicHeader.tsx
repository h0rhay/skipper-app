import type { Topic, TopicProgress } from '../../../types'
import { Badge } from '../../atoms/Badge'
import { SessionStatRow } from '../../molecules/SessionStatRow'
import styles from './TopicHeader.module.css'

interface TopicHeaderProps {
  topic: Topic
  progress: TopicProgress | null
}

export function TopicHeader({ topic, progress }: TopicHeaderProps) {
  const masteredCards = progress?.flashcards.masteredIds.length ?? 0
  const totalCards = progress?.flashcards.totalCards ?? topic.flashcards.length
  const mcqBest = progress?.mcq.bestScore ?? 0
  const mcqTotal = progress?.mcq.totalQuestions ?? topic.mcqQuestions.length

  return (
    <div className={styles.header}>
      <span className={styles.number}>{String(topic.number).padStart(2, '0')}</span>
      <h1 className={styles.title}>{topic.title}</h1>
      <p className={styles.description}>{topic.description}</p>
      {topic.isSafetyCritical && <Badge label="Safety Critical" variant="danger" />}
      <div className={styles.stats}>
        <SessionStatRow label="Cards mastered" value={`${masteredCards}/${totalCards}`} />
        <SessionStatRow label="MCQ best" value={mcqTotal > 0 ? `${mcqBest}/${mcqTotal}` : '—'} />
      </div>
    </div>
  )
}
