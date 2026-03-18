import { createFileRoute, useNavigate, Outlet, useChildMatches } from '@tanstack/react-router'
import { z } from 'zod'
import { useEffect, useRef } from 'react'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicProgress } from '../../../hooks/useTopicProgress'
import { useSessionHistory } from '../../../hooks/useSessionHistory'
import { useMCQSession } from '../../../hooks/useMCQSession'
import { SessionPage } from '../../../components/templates/SessionPage'
import { MCQQuestion } from '../../../components/organisms/MCQQuestion'
import { Counter } from '../../../components/atoms/Counter'
import { TabBar } from '../../../components/organisms/TabBar'

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
  const startedAt = useRef(new Date().toISOString()).current

  const topic = topics.find(t => t.id === topicId)

  const questions = (questionIds
    ? topic?.mcqQuestions.filter(q => questionIds.includes(q.id))
    : topic?.mcqQuestions) ?? []

  const { currentQuestion, selectedIndex, select, submit, next, isRevealed, isCorrect, explanation, progress, isComplete, score, wrongIds } =
    useMCQSession(topicId, questions)

  useEffect(() => {
    if (!isComplete) return
    const total = topic?.mcqQuestions.length ?? 0
    const completedAt = new Date().toISOString()
    updateMCQ({ bestScore: score, totalQuestions: total, wrongIds })
    appendSession({ id: `sess-${Date.now()}`, topicId, mode: 'mcq', toolId: null, startedAt, completedAt, score, total, wrongIds })
    navigate({ to: '/topics/$topicId/mcq/complete', params: { topicId }, search: { score, total, wrongIds: wrongIds.join(',') } })
  }, [isComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!topic) return <div>Topic not found</div>
  if (!currentQuestion) return <div>No questions available</div>

  const currentIndex = Math.round(progress * topic.mcqQuestions.length)

  return (
    <SessionPage
      progress={progress}
      onExit={() => navigate({ to: '/topics/$topicId', params: { topicId } })}
      counter={<Counter current={currentIndex + 1} total={topic.mcqQuestions.length} />}
      tabBar={<TabBar active="study" />}
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
  const childMatches = useChildMatches()
  if (childMatches.length > 0) return <Outlet />
  return <MCQSessionScreenComponent topicId={topicId} questionIds={questionIds} />
}
