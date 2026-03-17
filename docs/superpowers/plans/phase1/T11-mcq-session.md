# T11 — MCQSessionScreen

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Build MCQSessionScreen and MCQQuestion organism. Full session: 4-option select, Submit reveal, explanation, Next, auto-navigate to SessionCompleteScreen on last question.

**Architecture:** `MCQQuestion` organism owns per-question UI. `useMCQSession` hook owns all state. Screen saves progress on completion.

**Wave:** 5 — requires T03, T04, T05

---

### Task 1: MCQQuestion organism

**Files:** `src/components/organisms/MCQQuestion/`

- [ ] Write failing tests:

```typescript
const Q: MCQQuestion = {
  id: 'q-1',
  question: 'Which vessel is the give-way vessel?',
  options: ['The faster one', 'The vessel to port', 'The vessel required to keep out of the way', 'The stand-on vessel'],
  correctIndex: 2,
  explanation: 'The give-way vessel must take early action to keep well clear.',
}

// MCQQuestion is a controlled component — all state lives in useMCQSession hook
describe('MCQQuestion', () => {
  it('renders the question text', () => {
    render(<MCQQuestion question={Q} selectedIndex={null} isRevealed={false} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByText(Q.question)).toBeInTheDocument()
  })

  it('renders all 4 options', () => {
    render(<MCQQuestion question={Q} selectedIndex={null} isRevealed={false} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    Q.options.forEach(opt => expect(screen.getByText(opt)).toBeInTheDocument())
  })

  it('Submit button is disabled before selection', () => {
    render(<MCQQuestion question={Q} selectedIndex={null} isRevealed={false} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()
  })

  it('Submit button enabled when an option is selected', () => {
    render(<MCQQuestion question={Q} selectedIndex={0} isRevealed={false} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled()
  })

  it('shows explanation when isRevealed', () => {
    render(<MCQQuestion question={Q} selectedIndex={2} isRevealed={true} isCorrect={true} explanation={Q.explanation} onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByText(Q.explanation)).toBeInTheDocument()
  })

  it('marks selected wrong option with wrong class', () => {
    render(<MCQQuestion question={Q} selectedIndex={0} isRevealed={true} isCorrect={false} explanation={Q.explanation} onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByText(Q.options[0]).closest('button')).toHaveClass('wrong')
    expect(screen.getByText(Q.options[2]).closest('button')).toHaveClass('correct')
  })

  it('shows Next button after reveal', () => {
    render(<MCQQuestion question={Q} selectedIndex={0} isRevealed={true} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('calls onSubmit when Submit clicked', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<MCQQuestion question={Q} selectedIndex={0} isRevealed={false} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={onSubmit} onNext={() => {}} />)
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it('calls onNext when Next clicked', async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()
    render(<MCQQuestion question={Q} selectedIndex={2} isRevealed={true} isCorrect={true} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={onNext} />)
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(onNext).toHaveBeenCalledOnce()
  })
})
```

- [ ] Implement `MCQQuestion.tsx`:

```typescript
import { OptionButton } from '../../atoms/OptionButton'
import { Button } from '../../atoms/Button'
import type { MCQQuestion as MCQQuestionType } from '../../../types'
import styles from './MCQQuestion.module.css'

interface MCQQuestionProps {
  question: MCQQuestionType
  selectedIndex: number | null
  isRevealed: boolean
  isCorrect: boolean
  explanation: string
  onSelect: (index: number) => void
  onSubmit: () => void
  onNext: () => void
}

export function MCQQuestion({ question, selectedIndex, isRevealed, isCorrect, explanation, onSelect, onSubmit, onNext }: MCQQuestionProps) {
  function getOptionState(i: number) {
    if (!isRevealed) return selectedIndex === i ? 'selected' : 'idle'
    if (i === question.correctIndex) return 'correct'
    if (i === selectedIndex) return 'wrong'
    return 'idle'
  }

  return (
    <div className={styles.container}>
      {/* Question */}
      <div className={styles.questionCard}>
        <p className={styles.question}>{question.question}</p>
      </div>

      {/* Options */}
      <div className={styles.options}>
        {question.options.map((opt, i) => (
          <OptionButton
            key={i}
            label={String.fromCharCode(65 + i)} // A, B, C, D
            text={opt}
            state={getOptionState(i)}
            onClick={() => !isRevealed && onSelect(i)}
          />
        ))}
      </div>

      {/* Explanation */}
      {isRevealed && (
        <div className={styles.explanation}>
          <p>{explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        {!isRevealed ? (
          <Button onClick={onSubmit} disabled={selectedIndex === null} fullWidth>
            Submit
          </Button>
        ) : (
          <Button onClick={onNext} fullWidth>
            Next →
          </Button>
        )}
      </div>
    </div>
  )
}
```

```css
.container { display: flex; flex-direction: column; gap: 16px; }
.questionCard { background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 20px; }
.question { font-size: var(--font-size-base); font-weight: 600; line-height: 1.5; color: var(--color-text); margin: 0; }
.options { display: flex; flex-direction: column; gap: 8px; }
.explanation { background: color-mix(in srgb, var(--color-success) 8%, transparent); border: 2px solid var(--color-success); border-radius: var(--radius-md); padding: 16px; }
.explanation p { margin: 0; font-size: var(--font-size-sm); line-height: 1.6; color: var(--color-text); }
.actions { padding-top: 8px; }
```

- [ ] Run — PASS. Commit: `feat: add MCQQuestion organism`

---

### Task 2: MCQSessionScreen page

**Files:** `src/routes/topics/$topicId/mcq.tsx`

- [ ] Write failing test:

```typescript
describe('MCQSessionScreen', () => {
  it('renders the first question', () => {
    // render with topicId that has MCQ questions
    // verify question text appears
  })
})
```

- [ ] Implement:

```typescript
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import React from 'react'
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

function MCQSessionScreen() {
  const { topicId } = Route.useParams()
  const search = Route.useSearch()
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { updateMCQ } = useTopicProgress(topicId)
  const { appendSession } = useSessionHistory()

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  const questionIds = search.questionIds ? search.questionIds.split(',') : undefined
  const startedAt = React.useRef(new Date().toISOString()).current

  // All MCQ state lives in the hook — no logic in the screen component
  const {
    currentQuestion, selectedIndex, select, submit, next,
    isRevealed, isCorrect, explanation,
    progress, isComplete, score, wrongIds,
  } = useMCQSession(topicId, topic.mcqQuestions, questionIds)

  // When session completes, save progress and navigate (1.5s delay so user sees final result)
  React.useEffect(() => {
    if (!isComplete) return
    const completedAt = new Date().toISOString()
    updateMCQ({ bestScore: score, totalQuestions: topic.mcqQuestions.length, wrongIds })
    appendSession({
      id: `sess-${Date.now()}`,
      topicId, mode: 'mcq', toolId: null,
      startedAt, completedAt,
      score, total: topic.mcqQuestions.length,
      wrongIds,
    })
    const timer = setTimeout(() => {
      navigate({
        to: '/topics/$topicId/$mode/complete',
        params: { topicId, mode: 'mcq' },
        search: { score, total: topic.mcqQuestions.length, wrongIds: wrongIds.join(',') },
      })
    }, 1500)
    return () => clearTimeout(timer)
  }, [isComplete])

  if (!currentQuestion) return <div>No questions available</div>

  // MCQQuestion organism is now a controlled component driven by the hook's state
  return (
    <SessionPage
      progress={progress}
      onExit={() => navigate({ to: `/topics/${topicId}` })}
      counter={<Counter current={Math.round(progress * topic.mcqQuestions.length) + 1} total={topic.mcqQuestions.length} />}
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
```

- [ ] Run — PASS. Commit:

```bash
git add -A
git commit -m "feat: MCQSessionScreen complete — T11 complete"
```

---

### Task 3: Manual smoke test

- [ ] Navigate to a topic → MCQ Quiz
- [ ] Verify: question renders, options selectable, Submit disabled until selection
- [ ] Select an option, Submit — verify explanation appears, correct/wrong highlighting
- [ ] Click Next — verify advances to next question with counter incrementing
- [ ] Complete all questions — verify navigation to SessionCompleteScreen placeholder
