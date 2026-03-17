import { Link } from '@tanstack/react-router'
import { useLastSession } from '../../../hooks/useLastSession'
import { useTopics } from '../../../hooks/useTopics'
import styles from './ResumeCard.module.css'

export function ResumeCard() {
  const { session } = useLastSession()
  const { topics } = useTopics()
  if (!session) return null
  const topic = topics.find(t => t.id === session.topicId)
  if (!topic) return null

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <span className={styles.label}>Continue where you left off</span>
        <span className={styles.title}>{topic.title}</span>
        <span className={styles.meta}>{session.mode.toUpperCase()} · {session.score}/{session.total}</span>
      </div>
      <Link
        to={session.mode === 'flashcards' ? '/topics/$topicId/flashcards' : '/topics/$topicId/mcq'}
        params={{ topicId: topic.id }}
        className={styles.btn}
      >
        Resume →
      </Link>
    </div>
  )
}
