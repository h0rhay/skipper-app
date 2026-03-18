import { FileText, CreditCard, HelpCircle, Navigation } from 'lucide-react'
import { StudyModeRow } from '../../molecules/StudyModeRow'
import type { TopicProgress } from '../../../types'

interface StudyModeListProps {
  topicId: string
  navTools: string[]
  onModeSelect: (mode: string) => void
  progress: TopicProgress | null
}

export function StudyModeList({ topicId: _topicId, navTools, onModeSelect, progress }: StudyModeListProps) {
  const masteredCards = progress?.flashcards.masteredIds.length ?? 0
  const totalCards = progress?.flashcards.totalCards ?? 0
  const mcqBest = progress?.mcq.bestScore ?? 0
  const mcqTotal = progress?.mcq.totalQuestions ?? 0

  const factsAccepted = progress?.factsAccepted ?? false
  const flashcardsAccepted = progress?.flashcards?.accepted ?? false
  const mcqAccepted = progress?.mcq?.accepted ?? false
  const showMCQWarning = !factsAccepted || !flashcardsAccepted

  return (
    <div className="flex flex-col border border-border overflow-hidden">
      <StudyModeRow
        label="Key Facts"
        description="Read key terms and safety notes"
        icon={<FileText size={18} aria-hidden="true" />}
        progressText={factsAccepted ? 'Accepted ✓' : (progress?.factsRead ? 'Read' : undefined)}
        onClick={() => onModeSelect('facts')}
      />
      <StudyModeRow
        label="Flashcards"
        description="Key facts + terms — flip to reveal"
        icon={<CreditCard size={18} aria-hidden="true" />}
        progressText={flashcardsAccepted ? 'Accepted ✓' : (totalCards > 0 ? `${masteredCards}/${totalCards}` : undefined)}
        onClick={() => onModeSelect('flashcards')}
      />
      <StudyModeRow
        label="MCQ Quiz"
        description="Multiple-choice questions"
        icon={<HelpCircle size={18} aria-hidden="true" />}
        variant="featured"
        progressText={mcqAccepted ? 'Accepted ✓' : (mcqTotal > 0 ? `${mcqBest}/${mcqTotal}` : undefined)}
        onClick={() => onModeSelect('mcq')}
      />
      {showMCQWarning && (
        <p className="text-xs text-text-muted px-4 py-2 border-b border-border">
          Complete facts and flashcards first to reach Passed
        </p>
      )}
      {navTools.map(tool => (
        <StudyModeRow
          key={tool}
          label={tool}
          description="Interactive navigation tool"
          icon={<Navigation size={18} aria-hidden="true" />}
          progressText={progress?.navTools[tool] ? `${progress.navTools[tool].bestScore}/${progress.navTools[tool].totalQuestions}` : undefined}
          onClick={() => onModeSelect(`nav/${tool}`)}
        />
      ))}
    </div>
  )
}
