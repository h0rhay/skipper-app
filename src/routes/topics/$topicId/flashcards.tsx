import { createFileRoute, useNavigate, Outlet, useChildMatches } from '@tanstack/react-router'
import { z } from 'zod'
import { useState, useRef } from 'react'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicProgress } from '../../../hooks/useTopicProgress'
import { useSessionHistory } from '../../../hooks/useSessionHistory'
import { SessionPage } from '../../../components/templates/SessionPage'
import { FlashcardDeck } from '../../../components/organisms/FlashcardDeck'
import { Counter } from '../../../components/atoms/Counter'

const searchSchema = z.object({
  mode: z.literal('review').optional(),
  cardIds: z.string().optional(),
})

export const Route = createFileRoute('/topics/$topicId/flashcards')({
  validateSearch: searchSchema,
  component: FlashcardSessionScreen,
})

export function FlashcardSessionScreenComponent({ topicId, cardIds }: { topicId: string; cardIds?: string[] }) {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { updateFlashcards } = useTopicProgress(topicId)
  const { appendSession } = useSessionHistory()
  const [progress, setProgress] = useState(0)
  const [cardIndex, setCardIndex] = useState(0)
  const startedAt = useRef(new Date().toISOString()).current

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

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
      to: '/topics/$topicId/flashcards/complete',
      params: { topicId },
      search: { masteredIds: result.masteredIds.join(','), total: result.total },
    })
  }

  const totalCards = topic.flashcards.length

  function handleProgressChange(p: number) {
    setProgress(p)
    setCardIndex(Math.round(p * totalCards))
  }

  return (
    <SessionPage
      progress={progress}
      onExit={() => navigate({ to: `/topics/${topicId}` })}
      counter={<Counter current={cardIndex + 1} total={totalCards} prefix="Card" />}
    >
      <FlashcardDeck
        topicId={topicId}
        cards={topic.flashcards}
        cardIds={cardIds}
        onComplete={handleComplete}
        onProgressChange={handleProgressChange}
      />
    </SessionPage>
  )
}

function FlashcardSessionScreen() {
  const { topicId } = Route.useParams()
  const search = Route.useSearch()
  const cardIds = search.cardIds ? search.cardIds.split(',') : undefined
  const childMatches = useChildMatches()
  if (childMatches.length > 0) return <Outlet />
  return <FlashcardSessionScreenComponent topicId={topicId} cardIds={cardIds} />
}
