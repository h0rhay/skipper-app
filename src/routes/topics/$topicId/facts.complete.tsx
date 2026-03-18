import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CheckIcon } from 'lucide-react'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicMastery } from '../../../hooks/useTopicMastery'
import { AppShell } from '../../../components/templates/AppShell'
import { TabBar } from '../../../components/organisms/TabBar'
import { ScrollPage } from '../../../components/templates/ScrollPage'
import { BackHeader } from '../../../components/molecules/BackHeader'
import { Button } from '../../../components/atoms/Button'

export const Route = createFileRoute('/topics/$topicId/facts/complete')({
  component: FactsCompleteScreen,
})

interface FactsCompleteScreenComponentProps {
  topicId: string
}

export function FactsCompleteScreenComponent({ topicId }: FactsCompleteScreenComponentProps) {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { acceptFacts } = useTopicMastery(topicId)

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  const factCount = topic.keyTerms.length

  function handleLockIn() {
    acceptFacts()
    navigate({ to: '/topics/$topicId', params: { topicId } })
  }

  function handleReview() {
    navigate({ to: '/topics/$topicId/facts', params: { topicId } })
  }

  return (
    <AppShell tabBar={<TabBar active="study" />}>
      <ScrollPage header={<BackHeader label={topic.title} to={`/topics/${topicId}`} />}>
        <div className="flex flex-col gap-6 pt-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-[0.5px]">{topic.title}</p>
            <h1 className="font-heading text-3xl font-medium text-text">Facts Complete</h1>
          </div>
          <div className="flex flex-col gap-4">
            <CheckIcon size={48} className="text-[var(--color-success)]" aria-hidden="true" />
            <p className="text-text-secondary text-sm">{factCount} key facts reviewed</p>
            <div className="flex items-center gap-2 bg-[var(--color-success-bg)] px-3 py-2">
              <span className="font-heading text-lg font-bold text-[var(--color-success)]">{factCount}</span>
              <span className="text-sm text-text-secondary">— All covered</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Button onClick={handleLockIn} fullWidth>Locked in ✓</Button>
            <Button onClick={handleReview} variant="secondary" fullWidth>Review again</Button>
          </div>
        </div>
      </ScrollPage>
    </AppShell>
  )
}

function FactsCompleteScreen() {
  const { topicId } = Route.useParams()
  return <FactsCompleteScreenComponent topicId={topicId} />
}
