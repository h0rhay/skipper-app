import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useEffect, useRef } from 'react'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicProgress } from '../../../hooks/useTopicProgress'
import { useSessionHistory } from '../../../hooks/useSessionHistory'
import { useMCQSession } from '../../../hooks/useMCQSession'
import { SessionPage } from '../../../components/templates/SessionPage'
import { MCQQuestion } from '../../../components/organisms/MCQQuestion'
import { Counter } from '../../../components/atoms/Counter'

const searchSchema = z.object({
  mode: z.literal('review').optional(),
  questionIds: z.string().optional(),
})

export const Route = createFileRoute('/topics/$topicId/mcq')({
  validateSearch: searchSchema,
  component: MCQSessionScreen,
})

interface MCQSessionScreenComponentProps {
  topicId: string
  questionIds?: string[]
}

export function MCQSessionScreenComponent({ topicId, questionIds }: MCQSessionScreenComponentProps) {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { updateMCQ } = useTopicProgress(topicId)
  const { appendSession } = useSessionHistory()

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  const startedAt = useRef(new Date().toISOString()).current

  const {
    currentQuestion, selectedIndex, select, submit, next,
    isRevealed, isCorrect, explanation,
    progress, isComplete, score, wrongIds,
  } = useMCQSession(topicId, topic.mcqQuestions, questionIds)

  useEffect(() => {
    if (!isComplete) return
    const completedAt = new Date().toISOString()
    updateMCQ({ bestScore: score, totalQuestions: topic.mcqQuestions.length, wrongIds })
    appendSession({
      id: `sess-${Date.now()}`,
      topicId,
      mode: 'mcq',
      toolId: null,
      startedAt,
      completedAt,
      score,
      total: topic.mcqQuestions.length,
      wrongIds,
    })
    const timer = setTimeout(() => {
      navigate({ to: '/topics/$topicId', params: { topicId } })
    }, 1500)
    return () => clearTimeout(timer)
  }, [isComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentQuestion) return <div>No questions available</div>

  const currentIndex = Math.round(progress * topic.mcqQuestions.length)

  return (
    <SessionPage
      progress={progress}
      onExit={() => navigate({ to: `/topics/${topicId}` })}
      counter={<Counter current={currentIndex + 1} total={topic.mcqQuestions.length} />}
    >
      <MCQQuestion
        key={currentQuestion.id}
        question={currentQuestion}
        selectedIndex={selectedIndex}
        isRevealed={isRevealed}
        isCorrect={isCorrect}
        explanation={explanation}
        onSelect={select}
        onSubmit={submit}
        onNext={next}
      />
    </SessionPage>
  )
}

function MCQSessionScreen() {
  const { topicId } = Route.useParams()
  const search = Route.useSearch()
  const questionIds = search.questionIds ? search.questionIds.split(',') : undefined
  return <MCQSessionScreenComponent topicId={topicId} questionIds={questionIds} />
}
