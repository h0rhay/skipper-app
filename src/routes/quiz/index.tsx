import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo, useState, useCallback } from 'react'
import { AppShell } from '../../components/templates/AppShell'
import { TabBar } from '../../components/organisms/TabBar'
import { QuizQuestion } from '../../components/organisms/QuizQuestion'
import { QuizCompleteView } from '../../components/organisms/QuizCompleteView'
import { useTopics } from '../../hooks/useTopics'
import { useQuizSession, type QuizItem } from '../../hooks'
import styles from '../../styles/screens/quiz.module.css'

export const Route = createFileRoute('/quiz/')({
  component: QuizScreen,
})

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
        <div className={styles.loading}>Loading quiz…</div>
      </AppShell>
    )
  }

  if (isComplete || currentIndex >= total) {
    return (
      <AppShell tabBar={<TabBar active="quiz" />}>
        <div className={styles.scrollContent}>
          <QuizCompleteView score={score} total={total} onRestart={handleRestart} onHome={handleHome} />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell tabBar={<TabBar active="quiz" />}>
      <div className={styles.sessionWrapper}>
        {/* Progress bar */}
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress * 100}%` }} />
        </div>
        {/* Session header */}
        <div className={styles.sessionHeader}>
          <button className={styles.closeBtn} onClick={handleHome} aria-label="Exit quiz">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className={styles.sessionMeta}>
            <span className={styles.topicLabel}>{current.topicTitle.split('—')[0].trim().substring(0, 30)}</span>
            <span className={styles.modeLabel}>MIXED QUIZ</span>
          </div>
          <span className={styles.counter}>{currentIndex + 1} / {total}</span>
        </div>
        {/* Question */}
        <div className={styles.scrollContent}>
          <QuizQuestion
            question={current.question}
            questionNumber={currentIndex + 1}
            total={total}
            selectedIndex={selectedIndex}
            revealed={revealed}
            onSelect={selectOption}
            onSubmit={submitAnswer}
            onNext={nextQuestion}
            isLast={isLastQuestion}
            topicLabel={current.topicTitle}
          />
        </div>
      </div>
    </AppShell>
  )
}
