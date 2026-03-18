import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useTopics } from '../../../hooks/useTopics'
import { SessionSummary } from '../../../components/organisms/SessionSummary'
import type { SessionMode } from '../../../types'

const searchSchema = z.object({
  score: z.number(),
  total: z.number(),
  wrongIds: z.string().optional(),
})

export const Route = createFileRoute('/topics/$topicId/$mode/complete')({
  validateSearch: searchSchema,
  component: SessionCompleteScreen,
})

function SessionCompleteScreen() {
  const { topicId, mode } = Route.useParams()
  const { score, total, wrongIds: wrongIdsParam } = Route.useSearch()
  const navigate = useNavigate()
  const { topics } = useTopics()

  const topic = topics.find(t => t.id === topicId)
  const topicIndex = topics.findIndex(t => t.id === topicId)
  const nextTopic = topics[topicIndex + 1]

  const wrongIds = wrongIdsParam ? wrongIdsParam.split(',').filter(Boolean) : []
  const sessionMode = mode as SessionMode

  function handleReview() {
    if (sessionMode === 'flashcards') {
      navigate({
        to: '/topics/$topicId/flashcards',
        params: { topicId },
        search: { mode: 'review', cardIds: wrongIds.join(',') },
      })
    } else {
      navigate({
        to: '/topics/$topicId/mcq',
        params: { topicId },
        search: { mode: 'review', questionIds: wrongIds.join(',') },
      })
    }
  }

  function handleNext() {
    if (nextTopic) {
      navigate({ to: '/topics/$topicId', params: { topicId: nextTopic.id } })
    } else {
      navigate({ to: '/' })
    }
  }

  if (!topic) return <div>Topic not found</div>

  return (
    <SessionSummary
      mode={sessionMode}
      topicTitle={topic.title}
      score={score}
      total={total}
      wrongIds={wrongIds}
      onReview={handleReview}
      onNext={handleNext}
    />
  )
}
