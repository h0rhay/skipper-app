import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { CheckIcon } from 'lucide-react'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicMastery } from '../../../hooks/useTopicMastery'
import { AppShell } from '../../../components/templates/AppShell'
import { TabBar } from '../../../components/organisms/TabBar'
import { ScrollPage } from '../../../components/templates/ScrollPage'
import { BackHeader } from '../../../components/molecules/BackHeader'
import { Button } from '../../../components/atoms/Button'
import { Divider } from '../../../components/atoms/Divider'

const searchSchema = z.object({
  score: z.coerce.number(),
  total: z.coerce.number(),
  wrongIds: z.string().optional(),
})

export const Route = createFileRoute('/topics/$topicId/mcq/complete')({
  validateSearch: searchSchema,
  component: MCQCompleteScreen,
})

interface MCQCompleteScreenComponentProps {
  topicId: string
  score: number
  total: number
}

export function MCQCompleteScreenComponent({ topicId, score, total }: MCQCompleteScreenComponentProps) {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { acceptMCQ } = useTopicMastery(topicId)

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const isPassing = pct >= 70
  const isPerfect = score === total

  function handleAccept() {
    acceptMCQ()
    navigate({ to: '/topics/$topicId', params: { topicId } })
  }

  function handleRetry() {
    navigate({ to: '/topics/$topicId/mcq', params: { topicId } })
  }

  return (
    <AppShell tabBar={<TabBar active="study" />}>
      <ScrollPage header={<BackHeader label={topic.title} to="/topics/$topicId" params={{ topicId }} />}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-[0.5px]">{topic.title}</p>
            <h1 className="font-heading text-3xl font-medium text-text">MCQ Complete</h1>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <span className="font-heading text-6xl font-medium text-text">{score}</span>
              <span className="font-heading text-2xl text-text-muted pb-2">/ {total}</span>
            </div>
            <p className="text-sm text-text-secondary">questions correct</p>
            <div className={`flex items-center gap-2 px-3 py-2 ${isPassing ? 'bg-[var(--color-success-bg)]' : 'bg-[var(--color-sand)]'}`}>
              <span className={`font-heading text-lg font-bold ${isPassing ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'}`}>
                {pct}%
              </span>
              <span className="text-sm text-text-secondary">
                {isPerfect ? '— Perfect score!' : isPassing ? "— You've passed this topic" : '— Keep going'}
              </span>
            </div>
          </div>
          <div className="flex flex-col border-t border-border pt-4 gap-3">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-[0.5px]">Progress</p>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 py-3 border-b border-border">
                <CheckIcon size={16} className="text-[var(--color-success)] shrink-0" />
                <span className="text-sm font-medium text-text">Key Facts</span>
              </div>
              <div className="flex items-center gap-3 py-3 border-b border-border">
                <CheckIcon size={16} className="text-[var(--color-success)] shrink-0" />
                <span className="text-sm font-medium text-text">Flashcards</span>
              </div>
              <div className="flex items-center gap-3 py-3">
                <CheckIcon size={16} className={isPassing ? 'text-[var(--color-success)] shrink-0' : 'text-text-muted shrink-0 opacity-40'} />
                <span className={`text-sm font-medium ${isPassing ? 'text-text' : 'text-text-muted opacity-40'}`}>MCQ Quiz</span>
              </div>
            </div>
          </div>

          <Divider padded />
          <div className="flex flex-col gap-3">
            {isPassing ? (
              <>
                <Button onClick={handleAccept} fullWidth>Accept Pass ✓</Button>
                {!isPerfect && (
                  <Button onClick={handleRetry} variant="secondary" fullWidth>Go for 100%</Button>
                )}
              </>
            ) : (
              <>
                <Button onClick={handleRetry} fullWidth>Try again</Button>
                <Button onClick={handleAccept} variant="secondary" fullWidth>
                  <span className="opacity-60">Accept anyway</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </ScrollPage>
    </AppShell>
  )
}

function MCQCompleteScreen() {
  const { topicId } = Route.useParams()
  const { score, total } = Route.useSearch()
  return <MCQCompleteScreenComponent topicId={topicId} score={score} total={total} />
}
