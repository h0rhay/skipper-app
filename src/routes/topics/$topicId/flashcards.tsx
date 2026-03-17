import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useState } from 'react'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicProgress } from '../../../hooks/useTopicProgress'
import { useSessionHistory } from '../../../hooks/useSessionHistory'
import { SessionPage } from '../../../components/templates/SessionPage'
import { FlashcardDeck } from '../../../components/organisms/FlashcardDeck'

const searchSchema = z.object({
  mode: z.literal('review').optional(),
  cardIds: z.string().optional(),
})

export const Route = createFileRoute('/topics/$topicId/flashcards')({
  validateSearch: searchSchema,
  component: FlashcardSessionScreen,
})

export function FlashcardSessionScreenComponent({ topicId }: { topicId: string }) {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { updateFlashcards } = useTopicProgress(topicId)
  const { appendSession } = useSessionHistory()
  const [progress, setProgress] = useState(0)

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  const startedAt = new Date().toISOString()

  function handleComplete(result: { masteredIds: string[]; score: number; total: number }) {
    const completedAt = new Date().toISOString()
    const wrongIds = topic!.flashcards
      .map(c => c.id)
      .filter(id => !result.masteredIds.includes(id))
    updateFlashcards({ masteredIds: result.masteredIds, totalCards: result.total })
    appendSession({
      id: `sess-${Date.now()}`,
      topicId,
      mode: 'flashcards',
      toolId: null,
      startedAt,
      completedAt,
      score: result.score,
      total: result.total,
      wrongIds,
    })
    navigate({
      to: '/topics/$topicId/$mode/complete',
      params: { topicId, mode: 'flashcards' },
      search: { score: result.score, total: result.total, wrongIds: wrongIds.join(',') },
    })
  }

  return (
    <SessionPage
      progress={progress}
      onExit={() => navigate({ to: `/topics/${topicId}` })}
      counter={null}
    >
      <FlashcardDeck
        topicId={topicId}
        cards={topic.flashcards}
        onComplete={handleComplete}
        onProgressChange={setProgress}
      />
    </SessionPage>
  )
}

function FlashcardSessionScreen() {
  const { topicId } = Route.useParams()
  const search = Route.useSearch()
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { updateFlashcards } = useTopicProgress(topicId)
  const { appendSession } = useSessionHistory()
  const [progress, setProgress] = useState(0)

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  const cardIds = search.cardIds ? search.cardIds.split(',') : undefined
  const startedAt = new Date().toISOString()

  function handleComplete(result: { masteredIds: string[]; score: number; total: number }) {
    const completedAt = new Date().toISOString()
    const wrongIds = topic!.flashcards
      .map(c => c.id)
      .filter(id => !result.masteredIds.includes(id))
    updateFlashcards({ masteredIds: result.masteredIds, totalCards: result.total })
    appendSession({
      id: `sess-${Date.now()}`,
      topicId,
      mode: 'flashcards',
      toolId: null,
      startedAt,
      completedAt,
      score: result.score,
      total: result.total,
      wrongIds,
    })
    navigate({
      to: '/topics/$topicId/$mode/complete',
      params: { topicId, mode: 'flashcards' },
      search: { score: result.score, total: result.total, wrongIds: wrongIds.join(',') },
    })
  }

  return (
    <SessionPage
      progress={progress}
      onExit={() => navigate({ to: `/topics/${topicId}` })}
      counter={null}
    >
      <FlashcardDeck
        topicId={topicId}
        cards={topic.flashcards}
        cardIds={cardIds}
        onComplete={handleComplete}
        onProgressChange={setProgress}
      />
    </SessionPage>
  )
}
