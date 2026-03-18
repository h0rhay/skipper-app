import { useNavigate } from '@tanstack/react-router'
import { CheckIcon, CircleIcon } from 'lucide-react'
import { useTopicProgress } from '../../../hooks'
import { useTopics } from '../../../hooks/useTopics'
import { Button } from '../../atoms/Button'

interface TopicProgressDetailProps {
  topicId: string
}

export function TopicProgressDetail({ topicId }: TopicProgressDetailProps) {
  const { progress } = useTopicProgress(topicId)
  const { topics } = useTopics()
  const navigate = useNavigate()

  const topic = topics.find(t => t.id === topicId)

  const factsAccepted = progress.factsAccepted
  const flashcardsAccepted = progress.flashcards.accepted
  const mcqAccepted = progress.mcq.accepted

  const nextStep = !factsAccepted ? 'facts' : !flashcardsAccepted ? 'flashcards' : !mcqAccepted ? 'mcq' : null

  const factCount = topic?.keyTerms.length ?? 0
  const flashcardMastered = progress.flashcards.masteredIds.length
  const flashcardTotal = progress.flashcards.totalCards
  const mcqBest = progress.mcq.bestScore
  const mcqTotal = progress.mcq.totalQuestions

  function handleContinue() {
    if (nextStep === 'facts') navigate({ to: '/topics/$topicId/facts', params: { topicId } })
    else if (nextStep === 'flashcards') navigate({ to: '/topics/$topicId/flashcards', params: { topicId } })
    else if (nextStep === 'mcq') navigate({ to: '/topics/$topicId/mcq', params: { topicId } })
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex flex-col">

        {/* Key Facts */}
        <div className={`flex items-start gap-3 py-4 border-b border-border ${!factsAccepted && progress.factsRead === false ? 'opacity-40' : ''}`}>
          {factsAccepted
            ? <CheckIcon size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
            : <CircleIcon size={16} className="text-text-muted shrink-0 mt-0.5" />
          }
          <div className="flex-1 flex flex-col gap-0.5">
            <span className={`text-sm font-medium ${factsAccepted ? 'text-text' : 'text-text-muted'}`}>Key Facts</span>
            {factsAccepted
              ? <span className="text-xs text-text-muted">{factCount} facts reviewed</span>
              : progress.factsRead
                ? <span className="text-xs text-text-muted">Read — not yet locked in</span>
                : <span className="text-xs text-text-muted">Not started</span>
            }
          </div>
          {factsAccepted && (
            <span className="text-xs font-semibold text-[var(--color-success)] uppercase tracking-[0.5px]">Accepted ✓</span>
          )}
        </div>

        {/* Flashcards */}
        <div className={`flex items-start gap-3 py-4 border-b border-border ${!factsAccepted ? 'opacity-40' : ''}`}>
          {flashcardsAccepted
            ? <CheckIcon size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
            : <CircleIcon size={16} className="text-text-muted shrink-0 mt-0.5" />
          }
          <div className="flex-1 flex flex-col gap-0.5">
            <span className={`text-sm font-medium ${flashcardsAccepted ? 'text-text' : 'text-text-muted'}`}>Flashcards</span>
            {flashcardsAccepted
              ? <span className="text-xs text-text-muted">{flashcardMastered}/{flashcardTotal} mastered</span>
              : flashcardTotal > 0
                ? <span className="text-xs text-text-muted">{flashcardMastered}/{flashcardTotal} mastered — not yet locked in</span>
                : <span className="text-xs text-text-muted">Not started</span>
            }
          </div>
          {flashcardsAccepted && (
            <span className="text-xs font-semibold text-[var(--color-success)] uppercase tracking-[0.5px]">Accepted ✓</span>
          )}
        </div>

        {/* MCQ Quiz */}
        <div className={`flex items-start gap-3 py-4 ${!flashcardsAccepted ? 'opacity-40' : ''}`}>
          {mcqAccepted
            ? <CheckIcon size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
            : <CircleIcon size={16} className="text-text-muted shrink-0 mt-0.5" />
          }
          <div className="flex-1 flex flex-col gap-0.5">
            <span className={`text-sm font-medium ${mcqAccepted ? 'text-text' : 'text-text-muted'}`}>MCQ Quiz</span>
            {mcqAccepted
              ? <span className="text-xs text-text-muted">{mcqBest}/{mcqTotal} best score</span>
              : mcqTotal > 0
                ? <span className="text-xs text-text-muted">{mcqBest}/{mcqTotal} best — not yet accepted</span>
                : <span className="text-xs text-text-muted">Not started</span>
            }
          </div>
          {mcqAccepted && (
            <span className="text-xs font-semibold text-[var(--color-success)] uppercase tracking-[0.5px]">Accepted ✓</span>
          )}
        </div>
      </div>

      {nextStep && (
        <Button onClick={handleContinue} fullWidth>
          Continue →
        </Button>
      )}
    </div>
  )
}
