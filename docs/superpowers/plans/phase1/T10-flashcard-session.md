# T10 — FlashcardSessionScreen

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Build FlashcardSessionScreen and the FlashcardDeck organism. Full session: flip cards, got it / again, re-queue, complete, save progress, navigate to SessionCompleteScreen.

**Architecture:** `FlashcardDeck` organism owns the session UI. `useFlashcardSession` hook owns all state. Screen saves progress on completion and navigates to SessionCompleteScreen via search params.

**Wave:** 5 — requires T03, T04, T05

---

### Task 1: FlashcardDeck organism

**Files:** `src/components/organisms/FlashcardDeck/`

- [ ] Write failing tests:

```typescript
const CARDS: Flashcard[] = [
  { id: 'fc-1', front: 'What is a cleat?', back: 'A fitting for securing lines.' },
  { id: 'fc-2', front: 'What is a halyard?', back: 'A line used to hoist a sail.' },
]

describe('FlashcardDeck', () => {
  it('renders the front of the first card', () => {
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={() => {}} />)
    expect(screen.getByText('What is a cleat?')).toBeInTheDocument()
  })

  it('shows "Tap to reveal" hint', () => {
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={() => {}} />)
    expect(screen.getByText(/tap to reveal/i)).toBeInTheDocument()
  })

  it('shows Got it / Again buttons after tap', async () => {
    const user = userEvent.setup()
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={() => {}} />)
    await user.click(screen.getByText('What is a cleat?'))
    expect(screen.getByRole('button', { name: /got it/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /again/i })).toBeInTheDocument()
  })

  it('calls onComplete when deck is exhausted', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={onComplete} />)
    // Card 1: flip + got it
    await user.click(screen.getByText('What is a cleat?'))
    await user.click(screen.getByRole('button', { name: /got it/i }))
    // Card 2: flip + got it
    await user.click(screen.getByText('What is a halyard?'))
    await user.click(screen.getByRole('button', { name: /got it/i }))
    expect(onComplete).toHaveBeenCalledWith({ masteredIds: ['fc-1', 'fc-2'], score: 2, total: 2 })
  })

  it('shows progress bar', () => {
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={() => {}} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
```

- [ ] Implement `FlashcardDeck.tsx`:

```typescript
import { useEffect } from 'react'
import { FlashCard } from '../../molecules/FlashCard'
import { Button } from '../../atoms/Button'
import { ProgressBar } from '../../atoms/ProgressBar'
import { Counter } from '../../atoms/Counter'
import { useFlashcardSession } from '../../../hooks/useFlashcardSession'
import type { Flashcard } from '../../../types'
import styles from './FlashcardDeck.module.css'

interface FlashcardDeckProps {
  topicId: string
  cards: Flashcard[]
  cardIds?: string[]
  onComplete: (result: { masteredIds: string[]; score: number; total: number }) => void
  onProgressChange?: (progress: number) => void
}

export function FlashcardDeck({ topicId, cards, cardIds, onComplete, onProgressChange }: FlashcardDeckProps) {
  const { currentCard, isFlipped, flip, markGotIt, markAgain, progress, isComplete, score, masteredIds } =
    useFlashcardSession(topicId, cards, cardIds)

  // Lift progress to parent (SessionPage progress bar)
  useEffect(() => { onProgressChange?.(progress) }, [progress, onProgressChange])

  // Call onComplete when deck exhausted
  // masteredIds is returned directly from useFlashcardSession — these are the actual card IDs the user got right
  useEffect(() => {
    if (isComplete) {
      onComplete({ masteredIds, score, total: cards.length })
    }
  }, [isComplete])

  if (!currentCard) return null

  return (
    <div className={styles.deck}>
      <ProgressBar value={progress} />
      <Counter current={Math.round(progress * cards.length)} total={cards.length} prefix="Card" />

      <FlashCard
        front={currentCard.front}
        back={currentCard.back}
        isFlipped={isFlipped}
        onClick={!isFlipped ? flip : undefined}
      />

      {!isFlipped && (
        <p className={styles.hint}>Tap card to reveal</p>
      )}

      {isFlipped && (
        <div className={styles.actions}>
          <Button onClick={markAgain} variant="secondary" fullWidth>Again ✗</Button>
          <Button onClick={markGotIt} fullWidth>Got it ✓</Button>
        </div>
      )}
    </div>
  )
}
```

```css
.deck { display: flex; flex-direction: column; gap: 20px; }
.hint { text-align: center; color: var(--color-text-muted); font-size: var(--font-size-sm); }
.actions { display: flex; gap: 12px; }
```

- [ ] Run — PASS. Commit: `feat: add FlashcardDeck organism`

---

### Task 2: FlashcardSessionScreen page

**Files:** `src/routes/topics/$topicId/flashcards.tsx`

- [ ] Write failing test:

```typescript
describe('FlashcardSessionScreen', () => {
  it('renders the flashcard deck', () => {
    // Render with a topicId that has flashcards in topics.json
    // Verify a card front text appears
  })
})
```

- [ ] Implement:

```typescript
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { z } from 'zod'
import { useState } from 'react'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicProgress } from '../../../hooks/useTopicProgress'
import { useSessionHistory } from '../../../hooks/useSessionHistory'
import { SessionPage } from '../../../components/templates/SessionPage'
import { FlashcardDeck } from '../../../components/organisms/FlashcardDeck'

const searchSchema = z.object({
  mode: z.literal('review').optional(),
  cardIds: z.string().optional(), // comma-separated
})

export const Route = createFileRoute('/topics/$topicId/flashcards')({
  validateSearch: searchSchema,
  component: FlashcardSessionScreen,
})

function FlashcardSessionScreen() {
  const { topicId } = Route.useParams()
  const search = Route.useSearch()
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { updateFlashcards } = useTopicProgress(topicId)
  const { appendSession } = useSessionHistory()

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  const cardIds = search.cardIds ? search.cardIds.split(',') : undefined
  const startedAt = new Date().toISOString()

  function handleComplete(result: { masteredIds: string[]; score: number; total: number }) {
    const completedAt = new Date().toISOString()
    // Cards not mastered are the "wrong" ones for the review flow
    const wrongIds = topic.flashcards
      .map(c => c.id)
      .filter(id => !result.masteredIds.includes(id))
    // Save progress
    updateFlashcards({ masteredIds: result.masteredIds, totalCards: result.total })
    // Log session
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
    // Navigate to session complete
    navigate({
      to: '/topics/$topicId/$mode/complete',
      params: { topicId, mode: 'flashcards' },
      search: { score: result.score, total: result.total, wrongIds: wrongIds.join(',') },
    })
  }

  const [progress, setProgress] = useState(0)

  return (
    <SessionPage progress={progress} onExit={() => navigate({ to: `/topics/${topicId}` })} counter={null}>
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
```

- [ ] Run — PASS. Commit:

```bash
git add -A
git commit -m "feat: FlashcardSessionScreen complete — T10 complete"
```

---

### Task 3: Manual smoke test

- [ ] Navigate to a topic → Flashcards
- [ ] Verify: card renders, tap to flip works, Got it / Again buttons appear after flip
- [ ] Complete the deck — verify navigation to SessionCompleteScreen placeholder with score in URL
