import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { CheckIcon, CircleIcon } from 'lucide-react'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicMastery } from '../../../hooks/useTopicMastery'
import { AppShell } from '../../../components/templates/AppShell'
import { TabBar } from '../../../components/organisms/TabBar'
import { ScrollPage } from '../../../components/templates/ScrollPage'
import { BackHeader } from '../../../components/molecules/BackHeader'
import { Button } from '../../../components/atoms/Button'

const searchSchema = z.object({
  masteredIds: z.string().optional(),
  total: z.coerce.number(),
})

export const Route = createFileRoute('/topics/$topicId/flashcards/complete')({
  validateSearch: searchSchema,
  component: FlashcardsCompleteScreen,
})

interface FlashcardsCompleteScreenComponentProps {
  topicId: string
  masteredIds?: string
  total: number
}

export function FlashcardsCompleteScreenComponent({ topicId, masteredIds: masteredParam, total }: FlashcardsCompleteScreenComponentProps) {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { acceptFlashcards } = useTopicMastery(topicId)

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  const mastered = masteredParam ? masteredParam.split(',').filter(Boolean).length : 0
  const revisit = total - mastered

  function handleContinue() {
    acceptFlashcards()
    navigate({ to: '/topics/$topicId/mcq', params: { topicId } })
  }

  function handleRunAgain() {
    navigate({ to: '/topics/$topicId/flashcards', params: { topicId } })
  }

  return (
    <AppShell tabBar={<TabBar active="study" />}>
      <ScrollPage header={<BackHeader label={topic.title} to={`/topics/${topicId}`} />}>
        <div className="flex flex-col gap-6 pt-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-[0.5px]">{topic.title}</p>
            <h1 className="font-heading text-3xl font-medium text-text">Flashcards Complete</h1>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <span className="font-heading text-6xl font-medium text-text">{mastered}</span>
              <span className="font-heading text-2xl text-text-muted pb-2">/ {total}</span>
            </div>
            <p className="text-sm text-text-secondary">cards mastered</p>
            <div className="flex items-center gap-2 bg-[var(--color-success-bg)] px-3 py-2">
              <span className="font-heading text-lg font-bold text-[var(--color-success)]">{mastered}/{total}</span>
              <span className="text-sm text-text-secondary">— {mastered === total ? 'Perfect!' : 'Great work!'}</span>
            </div>
          </div>
          <div className="flex border border-border">
            <div className="flex-1 flex flex-col items-center gap-1 py-4">
              <span className="font-heading text-2xl font-bold text-[var(--color-success)]">{mastered}</span>
              <span className="text-xs text-text-muted uppercase tracking-[0.5px]">Mastered</span>
            </div>
            <div className="w-px bg-border" />
            <div className="flex-1 flex flex-col items-center gap-1 py-4">
              <span className="font-heading text-2xl font-bold text-[var(--color-warning)]">{revisit}</span>
              <span className="text-xs text-text-muted uppercase tracking-[0.5px]">Revisit</span>
            </div>
          </div>

          <div className="flex flex-col border-t border-border pt-4 gap-3">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-[0.5px]">What's next</p>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 py-3 border-b border-border">
                <CheckIcon size={16} className="text-[var(--color-success)] shrink-0" />
                <span className="text-sm font-medium text-text">Key Facts</span>
              </div>
              <div className="flex items-center gap-3 py-3 border-b border-border">
                <CheckIcon size={16} className="text-[var(--color-success)] shrink-0" />
                <span className="text-sm font-medium text-text">Flashcards</span>
              </div>
              <div className="flex items-center gap-3 py-3 opacity-40">
                <CircleIcon size={16} className="text-text-muted shrink-0" />
                <span className="text-sm text-text-muted">MCQ Quiz</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleContinue} fullWidth>Locked in — Continue to MCQ →</Button>
            <Button onClick={handleRunAgain} variant="secondary" fullWidth>Run through again</Button>
          </div>
        </div>
      </ScrollPage>
    </AppShell>
  )
}

function FlashcardsCompleteScreen() {
  const { topicId } = Route.useParams()
  const { masteredIds, total } = Route.useSearch()
  return <FlashcardsCompleteScreenComponent topicId={topicId} masteredIds={masteredIds} total={total} />
}
