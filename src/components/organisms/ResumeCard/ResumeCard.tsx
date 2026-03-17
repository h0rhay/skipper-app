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

  const to = session.mode === 'flashcards'
    ? '/topics/$topicId/flashcards'
    : '/topics/$topicId/mcq'

  const questionCount = session.mode === 'flashcards'
    ? topic.flashcards.length
    : topic.mcqQuestions.length

  return (
    <Link to={to} params={{ topicId: topic.id }} className={styles.card}>
      <div className={styles.body}>
        <span className={styles.label}>Continue where you left off</span>
        <span className={styles.title}>
          {String(topic.number).padStart(2, '0')} — {topic.title}
        </span>
        <span className={styles.meta}>
          {topic.description} · {questionCount} {session.mode === 'flashcards' ? 'cards' : 'questions'}
        </span>
      </div>
      <svg className={styles.arrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </Link>
  )
}
