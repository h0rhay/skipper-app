import { StudyModeRow } from '../../molecules/StudyModeRow'
import type { TopicProgress } from '../../../types'
import styles from './StudyModeList.module.css'

interface StudyModeListProps {
  topicId: string
  navTools: string[]
  onModeSelect: (mode: string) => void
  progress: TopicProgress | null
}

const IconFacts = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
)

const IconFlashcards = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
)

const IconMCQ = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
  </svg>
)

const IconNavTool = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
)

export function StudyModeList({ topicId: _topicId, navTools, onModeSelect, progress }: StudyModeListProps) {
  const masteredCards = progress?.flashcards.masteredIds.length ?? 0
  const totalCards = progress?.flashcards.totalCards ?? 0
  const mcqBest = progress?.mcq.bestScore ?? 0
  const mcqTotal = progress?.mcq.totalQuestions ?? 0

  return (
    <div className={styles.list}>
      <StudyModeRow
        label="Key Facts"
        description="Read key terms and safety notes"
        icon={<IconFacts />}
        progressText={progress?.factsRead ? 'Read' : undefined}
        onClick={() => onModeSelect('facts')}
      />
      <StudyModeRow
        label="Flashcards"
        description="Key facts + terms — flip to reveal"
        icon={<IconFlashcards />}
        progressText={totalCards > 0 ? `${masteredCards}/${totalCards}` : undefined}
        onClick={() => onModeSelect('flashcards')}
      />
      <StudyModeRow
        label="MCQ Quiz"
        description="Multiple-choice questions"
        icon={<IconMCQ />}
        variant="featured"
        progressText={mcqTotal > 0 ? `${mcqBest}/${mcqTotal}` : undefined}
        onClick={() => onModeSelect('mcq')}
      />
      {navTools.map(tool => (
        <StudyModeRow
          key={tool}
          label={tool}
          description="Interactive navigation tool"
          icon={<IconNavTool />}
          progressText={progress?.navTools[tool] ? `${progress.navTools[tool].bestScore}/${progress.navTools[tool].totalQuestions}` : undefined}
          onClick={() => onModeSelect(`nav/${tool}`)}
        />
      ))}
    </div>
  )
}
