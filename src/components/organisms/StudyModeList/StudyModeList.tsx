import { StudyModeRow } from '../../molecules/StudyModeRow'
import type { TopicProgress } from '../../../types'
import styles from './StudyModeList.module.css'

interface StudyModeListProps {
  topicId: string
  navTools: string[]
  onModeSelect: (mode: string) => void
  progress: TopicProgress | null
}

export function StudyModeList({ topicId, navTools, onModeSelect, progress }: StudyModeListProps) {
  const masteredCards = progress?.flashcards.masteredIds.length ?? 0
  const totalCards = progress?.flashcards.totalCards ?? 0
  const mcqBest = progress?.mcq.bestScore ?? 0
  const mcqTotal = progress?.mcq.totalQuestions ?? 0

  return (
    <div className={styles.list}>
      <StudyModeRow
        label="Key Facts"
        progressText={progress?.factsRead ? 'Read' : undefined}
        onClick={() => onModeSelect('facts')}
      />
      <StudyModeRow
        label="Flashcards"
        progressText={totalCards > 0 ? `${masteredCards}/${totalCards}` : undefined}
        onClick={() => onModeSelect('flashcards')}
      />
      <StudyModeRow
        label="MCQ Quiz"
        progressText={mcqTotal > 0 ? `${mcqBest}/${mcqTotal}` : undefined}
        onClick={() => onModeSelect('mcq')}
      />
      {navTools.map(tool => (
        <StudyModeRow
          key={tool}
          label={tool}
          progressText={progress?.navTools[tool] ? `${progress.navTools[tool].bestScore}/${progress.navTools[tool].totalQuestions}` : undefined}
          onClick={() => onModeSelect(`nav/${tool}`)}
        />
      ))}
    </div>
  )
}
