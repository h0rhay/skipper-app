# T12 — SessionCompleteScreen

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Build the SessionCompleteScreen and SessionSummary organism. Shows score, breakdown, and context-appropriate CTAs (retry weak cards / review wrong answers / next topic).

**Architecture:** Screen reads score data from search params. `SessionSummary` is props-only. CTAs navigate back into FlashcardSession or MCQSession with `?mode=review`.

**Wave:** 6 — requires T10, T11

---

### Task 1: SessionSummary organism

**Files:** `src/components/organisms/SessionSummary/`

- [ ] Write failing tests:

```typescript
describe('SessionSummary', () => {
  it('renders score', () => {
    render(<SessionSummary mode="mcq" topicTitle="IRPCS" score={8} total={12} wrongIds={[]} onReview={() => {}} onNext={() => {}} />)
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('shows percentage', () => {
    render(<SessionSummary mode="mcq" topicTitle="IRPCS" score={8} total={12} wrongIds={[]} onReview={() => {}} onNext={() => {}} />)
    expect(screen.getByText('67%')).toBeInTheDocument()
  })

  it('shows "Review wrong answers" button when wrongIds present', () => {
    render(<SessionSummary mode="mcq" topicTitle="IRPCS" score={8} total={12} wrongIds={['q-1','q-2']} onReview={() => {}} onNext={() => {}} />)
    expect(screen.getByRole('button', { name: /review wrong/i })).toBeInTheDocument()
  })

  it('hides "Review" button when no wrong answers', () => {
    render(<SessionSummary mode="mcq" topicTitle="IRPCS" score={12} total={12} wrongIds={[]} onReview={() => {}} onNext={() => {}} />)
    expect(screen.queryByRole('button', { name: /review/i })).not.toBeInTheDocument()
  })

  it('calls onReview when review button clicked', async () => {
    const user = userEvent.setup()
    const onReview = vi.fn()
    render(<SessionSummary mode="mcq" topicTitle="IRPCS" score={8} total={12} wrongIds={['q-1']} onReview={onReview} onNext={() => {}} />)
    await user.click(screen.getByRole('button', { name: /review/i }))
    expect(onReview).toHaveBeenCalledOnce()
  })

  it('calls onNext', async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()
    render(<SessionSummary mode="mcq" topicTitle="IRPCS" score={12} total={12} wrongIds={[]} onReview={() => {}} onNext={onNext} />)
    await user.click(screen.getByRole('button', { name: /next topic/i }))
    expect(onNext).toHaveBeenCalledOnce()
  })
})
```

- [ ] Implement `SessionSummary.tsx`:

```typescript
import { ScoreRing } from '../../atoms/ScoreRing'
import { Button } from '../../atoms/Button'
import { SessionStatRow } from '../../molecules/SessionStatRow'
import type { SessionMode } from '../../../types'
import styles from './SessionSummary.module.css'

interface SessionSummaryProps {
  mode: SessionMode
  topicTitle: string
  score: number
  total: number
  wrongIds: string[]
  onReview: () => void
  onNext: () => void
}

export function SessionSummary({ mode, topicTitle, score, total, wrongIds, onReview, onNext }: SessionSummaryProps) {
  const pct = total === 0 ? 0 : Math.round((score / total) * 100)
  const reviewLabel = mode === 'flashcards' ? 'Retry weak cards' : 'Review wrong answers'
  const hasWeak = wrongIds.length > 0

  return (
    <div className={styles.summary}>
      <span className={styles.topicTag}>{topicTitle.toUpperCase()}</span>
      <h2 className={styles.title}>Session Complete</h2>

      <div className={styles.scoreSection}>
        <ScoreRing score={score} total={total} size={100} />
      </div>

      <div className={styles.stats}>
        <SessionStatRow label="Score" value={`${score} / ${total}`} />
        <SessionStatRow label="Percentage" value={`${pct}%`} />
        {hasWeak && <SessionStatRow label="Needs review" value={wrongIds.length} />}
      </div>

      {hasWeak && (
        <Button onClick={onReview} variant="secondary" fullWidth>
          {reviewLabel}
        </Button>
      )}

      <Button onClick={onNext} fullWidth>
        Next Topic →
      </Button>
    </div>
  )
}
```

```css
.summary { display: flex; flex-direction: column; gap: 20px; align-items: center; text-align: center; }
.topicTag { font-size: var(--font-size-xs); font-weight: 700; letter-spacing: 1.5px; color: var(--color-text-muted); }
.title { font-family: var(--font-heading); font-size: var(--font-size-xl); font-weight: 500; color: var(--color-navy); letter-spacing: -0.5px; }
.scoreSection { padding: 8px 0; }
.stats { width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
```

- [ ] Run — PASS. Commit: `feat: add SessionSummary organism`

---

### Task 2: SessionCompleteScreen page

**Files:** `src/routes/topics/$topicId/$mode.complete.tsx`

- [ ] Write failing test:

```typescript
describe('SessionCompleteScreen', () => {
  it('renders score from search params', () => {
    // Render with search params: score=8&total=12&wrongIds=
    // verify score visible
  })
})
```

- [ ] Implement:

```typescript
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useTopics } from '../../../hooks/useTopics'
import { CentredCard } from '../../../components/templates/CentredCard'
import { SessionSummary } from '../../../components/organisms/SessionSummary'
import type { SessionMode } from '../../../types'

const searchSchema = z.object({
  score: z.number(),
  total: z.number(),
  wrongIds: z.string().optional(), // comma-separated
})

export const Route = createFileRoute('/topics/$topicId/$mode/complete')({
  validateSearch: searchSchema,
  component: SessionCompleteScreen,
})

function SessionCompleteScreen() {
  const { topicId, mode } = Route.useParams()
  const search = Route.useSearch()
  const navigate = useNavigate()
  const { topics } = useTopics()

  const topic = topics.find(t => t.id === topicId)
  const wrongIds = search.wrongIds ? search.wrongIds.split(',').filter(Boolean) : []
  const sessionMode = mode as SessionMode

  function handleReview() {
    const reviewRoute = sessionMode === 'flashcards'
      ? `/topics/${topicId}/flashcards`
      : `/topics/${topicId}/mcq`

    navigate({
      to: reviewRoute,
      search: { mode: 'review', ...(sessionMode === 'mcq' ? { questionIds: wrongIds.join(',') } : { cardIds: wrongIds.join(',') }) }
    })
  }

  function handleNext() {
    // Find next topic by number
    const current = topics.find(t => t.id === topicId)
    const next = topics.find(t => t.number === (current?.number ?? 0) + 1)
    if (next) {
      navigate({ to: '/topics/$topicId', params: { topicId: next.id } })
    } else {
      navigate({ to: '/' })
    }
  }

  return (
    <CentredCard>
      <SessionSummary
        mode={sessionMode}
        topicTitle={topic?.title ?? topicId}
        score={search.score}
        total={search.total}
        wrongIds={wrongIds}
        onReview={handleReview}
        onNext={handleNext}
      />
    </CentredCard>
  )
}
```

- [ ] Run — PASS. Commit:

```bash
git add -A
git commit -m "feat: SessionCompleteScreen complete — T12 complete"
```

---

### Task 3: Manual smoke test

- [ ] Complete a flashcard session — verify SessionCompleteScreen shows correct score
- [ ] Complete an MCQ session with wrong answers — verify "Review wrong answers" button appears
- [ ] Tap review — verify re-launches MCQ with only the wrong questions
- [ ] Tap "Next Topic" — verify navigates to the next topic in sequence
