import { useTopicProgress } from '../../../hooks'
import { SessionStatRow } from '../../molecules/SessionStatRow'
import styles from './TopicProgressDetail.module.css'

interface TopicProgressDetailProps {
  topicId: string
}

export function TopicProgressDetail({ topicId }: TopicProgressDetailProps) {
  const { progress } = useTopicProgress(topicId)

  const hasAnyProgress =
    progress.factsRead ||
    progress.flashcards.lastStudied !== '' ||
    progress.mcq.lastStudied !== ''

  if (!hasAnyProgress) {
    return (
      <div className={styles.container}>
        <p className={styles.notStarted}>Not started</p>
      </div>
    )
  }

  const flashcardValue = `${progress.flashcards.masteredIds.length} / ${progress.flashcards.totalCards}`
  const mcqValue = progress.mcq.totalQuestions > 0
    ? `${progress.mcq.bestScore} / ${progress.mcq.totalQuestions}`
    : '—'

  return (
    <div className={styles.container}>
      {progress.factsRead && (
        <SessionStatRow label="Key Facts" value="Read" />
      )}
      {progress.flashcards.lastStudied !== '' && (
        <SessionStatRow label="Flashcards mastered" value={flashcardValue} />
      )}
      {progress.mcq.lastStudied !== '' && (
        <SessionStatRow label="MCQ best score" value={mcqValue} />
      )}
    </div>
  )
}
