import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo, useState, useCallback } from 'react'
import { AppShell } from '../../components/templates/AppShell'
import { TabBar } from '../../components/organisms/TabBar'
import { QuizQuestion } from '../../components/organisms/QuizQuestion'
import { QuizCompleteView } from '../../components/organisms/QuizCompleteView'
import { useTopics } from '../../hooks/useTopics'
import { useQuizSession, type QuizItem } from '../../hooks'
import { X } from 'lucide-react'

export const Route = createFileRoute('/quiz/')({
  component: QuizScreen,
})

// Exported wrapper for testing — intentionally a separate function from the route component
export function QuizScreenComponent() { return <QuizScreen /> }

const QUIZ_SIZE = 20

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function buildQuizItems(topics: ReturnType<typeof useTopics>['topics'], size: number): QuizItem[] {
  const all: QuizItem[] = []
  for (const topic of topics) {
    for (const q of (topic.mcqQuestions ?? [])) {
      all.push({ topicId: topic.id, topicTitle: topic.title, topicNumber: topic.number, question: q })
    }
  }
  return shuffleArray(all).slice(0, size)
}

function QuizScreen() {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const [sessionKey, setSessionKey] = useState(0)

  const items = useMemo(
    () => buildQuizItems(topics, QUIZ_SIZE),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topics, sessionKey]
  )

  const { current, currentIndex, total, selectedIndex, revealed, score, isLastQuestion, isComplete, progress, selectOption, submitAnswer, nextQuestion } = useQuizSession(items)

  const handleRestart = useCallback(() => setSessionKey(k => k + 1), [])
  const handleHome = useCallback(() => navigate({ to: '/' }), [navigate])

  if (topics.length === 0) {
    return (
      <AppShell tabBar={<TabBar active="quiz" />}>
        <div className="px-6 py-10 text-text-muted font-body">Loading quiz…</div>
      </AppShell>
    )
  }

  if (isComplete || currentIndex >= total) {
    return (
      <AppShell tabBar={<TabBar active="quiz" />}>
        <QuizCompleteView score={score} total={total} onRestart={handleRestart} onHome={handleHome} />
      </AppShell>
    )
  }

  return (
    <AppShell tabBar={<TabBar active="quiz" />}>
      <div className="flex flex-col h-full">
        {/* Progress bar */}
        <div className="h-1 bg-bg-muted shrink-0">
          <div className="h-full bg-primary transition-[width] duration-300 ease-in-out" style={{ width: `${progress * 100}%` }} />
        </div>
        {/* Session header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <button className="bg-none border-none p-1 cursor-pointer text-text flex items-center" onClick={handleHome} aria-label="Exit quiz">
            <X size={20} />
          </button>
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-body text-xs font-semibold text-text-muted tracking-[1px] uppercase max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">{current.topicTitle.split('—')[0].trim().substring(0, 30)}</span>
            <span className="font-body text-xs font-bold text-text tracking-[1.5px]">MIXED QUIZ</span>
          </div>
          <span className="font-heading text-md font-medium text-text-secondary">{currentIndex + 1} / {total}</span>
        </div>
        {/* Question */}
        <div className="flex-1 overflow-y-auto">
          <QuizQuestion
            question={current.question}
            questionNumber={currentIndex + 1}
            selectedIndex={selectedIndex}
            revealed={revealed}
            onSelect={selectOption}
            onSubmit={submitAnswer}
            onNext={nextQuestion}
            isLast={isLastQuestion}
          />
        </div>
      </div>
    </AppShell>
  )
}
