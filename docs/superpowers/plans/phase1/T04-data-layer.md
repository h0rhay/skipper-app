# T04 — Data Layer + Hooks

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Build the storage service, populate `topics.json` from the syllabus files, and implement all 8 business logic hooks.

**Architecture:** `storage.ts` is the only file that touches `localStorage` — all hooks go through it. Hooks are pure logic: they read/write through storage and derive computed state. No UI. All Convex-ready (userId = "local" now, real ID later).

**Tech Stack:** React hooks, TypeScript, Vitest, `renderHook` from React Testing Library

**Spec:** `docs/superpowers/specs/2026-03-17-skipper-app-design.md` — Sections 5, 7

**Source material:** `syllabus/` directory — all 17 topic markdown files

**Wave:** 2 — requires T01

---

### Task 1: Storage service

**Files:**
- Create: `src/services/storage.ts`
- Create: `src/services/storage.test.ts`

- [ ] Write failing tests:

```typescript
import { storage } from './storage'

describe('storage', () => {
  beforeEach(() => localStorage.clear())

  it('returns null for missing key', () => {
    expect(storage.get('progress')).toBeNull()
  })

  it('round-trips JSON', () => {
    storage.set('progress', { userId: 'local' })
    expect(storage.get('progress')).toEqual({ userId: 'local' })
  })

  it('returns fallback if value is corrupt JSON', () => {
    localStorage.setItem('skipper:progress', 'not-json')
    expect(storage.get('progress', { userId: 'local', topics: {} }))
      .toEqual({ userId: 'local', topics: {} })
  })
})
```

- [ ] Implement `storage.ts`:

```typescript
const PREFIX = 'skipper:'

type StorageKey = 'progress' | 'sessions' | 'theme'

export const storage = {
  get<T>(key: StorageKey, fallback?: T): T | null {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      if (raw === null) return fallback ?? null
      return JSON.parse(raw) as T
    } catch {
      return fallback ?? null
    }
  },
  set<T>(key: StorageKey, value: T): void {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  },
}
```

- [ ] Run — PASS. Commit: `feat: add storage service`

---

### Task 2: Populate topics.json

**Files:**
- Create: `src/data/topics.json`

The syllabus files live in `syllabus/`. Read each one and extract:
- `id` — derived from filename (e.g., `01-nautical-terms`)
- `number` — topic number
- `title` — from the filename / H1
- `description` — one-line summary
- `isSafetyCritical` — true if the file contains "safety-critical" in the frontmatter or a Safety-Critical Notes section
- `summary` — the Summary section text
- `keyTerms` — from the Key Terms table (term + definition)
- `safetyNotes` — bullet points from Safety-Critical Notes section
- `flashcards` — from Flashcard Candidates section (front = term/question, back = definition/answer)
- `mcqQuestions` — from MCQ Candidates section (question + 4 options + correctIndex + explanation)
- `navTools` — empty array for now (populated in T14)

- [ ] Read each syllabus file and extract the data. Create `src/data/topics.json` with all 17 topics following the `Topic` interface from `src/types/index.ts`.

Each flashcard needs a stable `id` — use `{topicId}-fc-{index}` e.g. `01-nautical-terms-fc-0`.
Each MCQ question needs a stable `id` — use `{topicId}-q-{index}`.

- [ ] Validate the JSON compiles against the type by running:

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] Commit:

```bash
git add src/data/topics.json
git commit -m "feat: populate topics.json from syllabus — all 17 topics"
```

---

### Task 3: useTopics hook

**Files:**
- Create: `src/hooks/useTopics.ts`
- Create: `src/hooks/useTopics.test.ts`

- [ ] Write failing test:

```typescript
import { renderHook } from '@testing-library/react'
import { useTopics } from './useTopics'

describe('useTopics', () => {
  it('returns all topics', () => {
    const { result } = renderHook(() => useTopics())
    expect(result.current.topics.length).toBe(17)
  })

  it('returns isLoading false after mount', () => {
    const { result } = renderHook(() => useTopics())
    expect(result.current.isLoading).toBe(false)
  })

  it('returns a topic by id', () => {
    const { result } = renderHook(() => useTopics())
    const topic = result.current.topics.find(t => t.id === '01-nautical-terms')
    expect(topic).toBeDefined()
    expect(topic?.isSafetyCritical).toBeDefined()
  })
})
```

- [ ] Implement `useTopics.ts`:

```typescript
import { useMemo } from 'react'
import topicsData from '../data/topics.json'
import type { Topic } from '../types'

export function useTopics() {
  const topics = useMemo(() => topicsData as Topic[], [])
  return { topics, isLoading: false, error: null }
}
```

- [ ] Run — PASS. Commit: `feat: add useTopics hook`

---

### Task 4: useSessionHistory hook

**Files:**
- Create: `src/hooks/useSessionHistory.ts`
- Create: `src/hooks/useSessionHistory.test.ts`

- [ ] Write failing tests:

```typescript
describe('useSessionHistory', () => {
  beforeEach(() => localStorage.clear())

  it('returns empty array initially', () => {
    const { result } = renderHook(() => useSessionHistory())
    expect(result.current.sessions).toEqual([])
  })

  it('appends a session', () => {
    const { result } = renderHook(() => useSessionHistory())
    const session: Session = {
      id: 'sess-1', topicId: '05-irpcs-colregs', mode: 'mcq', toolId: null,
      startedAt: '2026-01-01T00:00:00Z', completedAt: '2026-01-01T00:10:00Z',
      score: 8, total: 12, wrongIds: ['q-1'],
    }
    act(() => result.current.appendSession(session))
    expect(result.current.sessions).toHaveLength(1)
    expect(result.current.sessions[0].id).toBe('sess-1')
  })
})
```

- [ ] Implement:

```typescript
import { useState, useCallback } from 'react'
import { storage } from '../services/storage'
import type { Session } from '../types'

export function useSessionHistory() {
  const [sessions, setSessions] = useState<Session[]>(
    () => storage.get<Session[]>('sessions', []) ?? []
  )

  const appendSession = useCallback((session: Session) => {
    setSessions(prev => {
      const next = [...prev, session]
      storage.set('sessions', next)
      return next
    })
  }, [])

  return { sessions, appendSession }
}
```

- [ ] Run — PASS. Commit: `feat: add useSessionHistory hook`

---

### Task 5: useLastSession hook

**Files:**
- Create: `src/hooks/useLastSession.ts`
- Create: `src/hooks/useLastSession.test.ts`

- [ ] Test that it returns `null` with no sessions, and the most recent session when sessions exist.

- [ ] Implement:

```typescript
import { useSessionHistory } from './useSessionHistory'

export function useLastSession() {
  const { sessions } = useSessionHistory()
  const session = sessions.length > 0 ? sessions[sessions.length - 1] : null
  return { session }
}
```

- [ ] Run — PASS. Commit: `feat: add useLastSession hook`

---

### Task 6: useTopicProgress hook

**Files:**
- Create: `src/hooks/useTopicProgress.ts`
- Create: `src/hooks/useTopicProgress.test.ts`

- [ ] Write failing tests:

```typescript
describe('useTopicProgress', () => {
  beforeEach(() => localStorage.clear())

  it('returns default empty progress for a new topic', () => {
    const { result } = renderHook(() => useTopicProgress('05-irpcs-colregs'))
    expect(result.current.progress.factsRead).toBe(false)
    expect(result.current.progress.flashcards.masteredIds).toEqual([])
    expect(result.current.progress.mcq.bestScore).toBe(0)
  })

  it('markFactsRead sets factsRead to true', () => {
    const { result } = renderHook(() => useTopicProgress('05-irpcs-colregs'))
    act(() => result.current.markFactsRead())
    expect(result.current.progress.factsRead).toBe(true)
    expect(result.current.progress.factsReadAt).toBeDefined()
  })

  it('updateFlashcards merges mastered IDs', () => {
    const { result } = renderHook(() => useTopicProgress('05-irpcs-colregs'))
    act(() => result.current.updateFlashcards({ masteredIds: ['fc-1', 'fc-2'], totalCards: 18 }))
    expect(result.current.progress.flashcards.masteredIds).toEqual(['fc-1', 'fc-2'])
  })

  it('updateMCQ overwrites wrongIds (not union)', () => {
    const { result } = renderHook(() => useTopicProgress('05-irpcs-colregs'))
    act(() => result.current.updateMCQ({ bestScore: 8, totalQuestions: 12, wrongIds: ['q-1'] }))
    act(() => result.current.updateMCQ({ bestScore: 9, totalQuestions: 12, wrongIds: ['q-2'] }))
    expect(result.current.progress.mcq.wrongIds).toEqual(['q-2'])
    expect(result.current.progress.mcq.bestScore).toBe(9)
  })
})
```

- [ ] Implement `useTopicProgress.ts`:

```typescript
import { useState, useCallback } from 'react'
import { storage } from '../services/storage'
import type { TopicProgress, UserProgress } from '../types'

const DEFAULT_TOPIC_PROGRESS: TopicProgress = {
  factsRead: false,
  flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' },
  mcq: { bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '' },
  navTools: {},
}

function loadProgress(): UserProgress {
  return storage.get<UserProgress>('progress', { userId: 'local', topics: {} })
    ?? { userId: 'local', topics: {} }
}

export function useTopicProgress(topicId: string) {
  const [userProgress, setUserProgress] = useState<UserProgress>(loadProgress)

  const progress: TopicProgress = userProgress.topics[topicId] ?? DEFAULT_TOPIC_PROGRESS

  const save = useCallback((next: UserProgress) => {
    storage.set('progress', next)
    setUserProgress(next)
  }, [])

  const update = useCallback((patch: Partial<TopicProgress>) => {
    const current = userProgress.topics[topicId] ?? DEFAULT_TOPIC_PROGRESS
    const next: UserProgress = {
      ...userProgress,
      topics: { ...userProgress.topics, [topicId]: { ...current, ...patch } },
    }
    save(next)
  }, [userProgress, topicId, save])

  const markFactsRead = useCallback(() => {
    update({ factsRead: true, factsReadAt: new Date().toISOString() })
  }, [update])

  const updateFlashcards = useCallback((data: { masteredIds: string[]; totalCards: number }) => {
    update({
      flashcards: { ...data, lastStudied: new Date().toISOString() },
    })
  }, [update])

  const updateMCQ = useCallback((data: { bestScore: number; totalQuestions: number; wrongIds: string[] }) => {
    update({
      mcq: { ...data, lastStudied: new Date().toISOString() },
    })
  }, [update])

  return { progress, markFactsRead, updateFlashcards, updateMCQ }
}
```

- [ ] Run — PASS. Commit: `feat: add useTopicProgress hook`

---

### Task 7: useOverallProgress + useWeakTopics hooks

**Files:**
- Create: `src/hooks/useOverallProgress.ts`
- Create: `src/hooks/useWeakTopics.ts`
- Create: `src/hooks/useOverallProgress.test.ts`

- [ ] Write failing tests:

```typescript
describe('useOverallProgress', () => {
  beforeEach(() => localStorage.clear())

  it('returns 0 percentComplete with no progress', () => {
    const { result } = renderHook(() => useOverallProgress())
    expect(result.current.percentComplete).toBe(0)
  })

  it('marks topic as complete when all three modes done', () => {
    storage.set('progress', {
      userId: 'local',
      topics: {
        '05-irpcs-colregs': {
          factsRead: true,
          factsReadAt: '2026-03-17T00:00:00Z',
          flashcards: { masteredIds: ['fc-1', 'fc-2', 'fc-3'], totalCards: 3, lastStudied: '2026-03-17T00:00:00Z' },
          mcq: { bestScore: 9, totalQuestions: 12, wrongIds: [], lastStudied: '2026-03-17T00:00:00Z' },
          navTools: {}
        }
      }
    })
    const { result } = renderHook(() => useOverallProgress())
    expect(result.current.topicStatuses['05-irpcs-colregs']).toBe('complete')
  })
})

describe('useWeakTopics', () => {
  beforeEach(() => localStorage.clear())

  it('returns empty array when no topics attempted', () => {
    const { result } = renderHook(() => useWeakTopics())
    expect(result.current.weakTopics).toEqual([])
  })

  it('returns topics where mcq bestScore / totalQuestions < 0.7', () => {
    storage.set('progress', {
      userId: 'local',
      topics: {
        '05-irpcs-colregs': {
          factsRead: false,
          flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' },
          mcq: { bestScore: 3, totalQuestions: 12, wrongIds: [], lastStudied: '2026-03-17T00:00:00Z' },
          navTools: {}
        }
      }
    })
    const { result } = renderHook(() => useWeakTopics())
    expect(result.current.weakTopics.some(t => t.id === '05-irpcs-colregs')).toBe(true)
  })

  it('does not return topics above 70%', () => {
    storage.set('progress', {
      userId: 'local',
      topics: {
        '05-irpcs-colregs': {
          factsRead: false,
          flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' },
          mcq: { bestScore: 10, totalQuestions: 12, wrongIds: [], lastStudied: '2026-03-17T00:00:00Z' },
          navTools: {}
        }
      }
    })
    const { result } = renderHook(() => useWeakTopics())
    expect(result.current.weakTopics.some(t => t.id === '05-irpcs-colregs')).toBe(false)
  })
})
```

- [ ] Implement `useOverallProgress.ts`:

```typescript
import { useMemo } from 'react'
import { storage } from '../services/storage'
import { useTopics } from './useTopics'
import type { UserProgress, TopicCompletionStatus } from '../types'

export function useOverallProgress() {
  const { topics } = useTopics()
  const userProgress = storage.get<UserProgress>('progress', { userId: 'local', topics: {} })
    ?? { userId: 'local', topics: {} }

  const topicStatuses = useMemo((): Record<string, TopicCompletionStatus> => {
    return Object.fromEntries(topics.map(t => {
      const p = userProgress.topics[t.id]
      if (!p) return [t.id, 'none']
      const factsOk = p.factsRead
      const flashcardsOk = p.flashcards.masteredIds.length === p.flashcards.totalCards && p.flashcards.totalCards > 0
      const mcqOk = p.mcq.totalQuestions > 0 && (p.mcq.bestScore / p.mcq.totalQuestions) >= 0.7
      if (factsOk && flashcardsOk && mcqOk) return [t.id, 'complete']
      if (factsOk || p.flashcards.masteredIds.length > 0 || p.mcq.bestScore > 0) return [t.id, 'partial']
      return [t.id, 'none']
    }))
  }, [topics, userProgress])

  const percentComplete = useMemo(() => {
    const complete = Object.values(topicStatuses).filter(s => s === 'complete').length
    return topics.length === 0 ? 0 : Math.round((complete / topics.length) * 100)
  }, [topicStatuses, topics.length])

  return { percentComplete, topicStatuses }
}
```

- [ ] Implement `useWeakTopics.ts`:

```typescript
import { useMemo } from 'react'
import { storage } from '../services/storage'
import { useTopics } from './useTopics'
import type { UserProgress } from '../types'

export function useWeakTopics() {
  const { topics } = useTopics()
  const userProgress = storage.get<UserProgress>('progress', { userId: 'local', topics: {} })
    ?? { userId: 'local', topics: {} }

  const weakTopics = useMemo(() => topics.filter(t => {
    const p = userProgress.topics[t.id]?.mcq
    if (!p || p.totalQuestions === 0) return false
    return (p.bestScore / p.totalQuestions) < 0.7
  }), [topics, userProgress])

  return { weakTopics }
}
```

- [ ] Run — PASS. Commit: `feat: add useOverallProgress and useWeakTopics hooks`

---

### Task 8: useFlashcardSession hook

**Files:**
- Create: `src/hooks/useFlashcardSession.ts`
- Create: `src/hooks/useFlashcardSession.test.ts`

- [ ] Write failing tests:

```typescript
const CARDS = [
  { id: 'fc-1', front: 'Q1', back: 'A1' },
  { id: 'fc-2', front: 'Q2', back: 'A2' },
  { id: 'fc-3', front: 'Q3', back: 'A3' },
]

describe('useFlashcardSession', () => {
  it('starts with first card, not flipped', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS))
    expect(result.current.currentCard).toEqual(CARDS[0])
    expect(result.current.isFlipped).toBe(false)
  })

  it('flip() toggles isFlipped', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS))
    act(() => result.current.flip())
    expect(result.current.isFlipped).toBe(true)
    act(() => result.current.flip())
    expect(result.current.isFlipped).toBe(false)
  })

  it('markGotIt() advances to next card and resets flip', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS))
    act(() => result.current.markGotIt())
    expect(result.current.currentCard).toEqual(CARDS[1])
    expect(result.current.isFlipped).toBe(false)
  })

  it('markAgain() re-queues card at end', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS))
    act(() => result.current.markAgain())
    // deck is now [fc-2, fc-3, fc-1]
    expect(result.current.currentCard).toEqual(CARDS[1])
  })

  it('isComplete when all cards marked gotIt', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS))
    act(() => result.current.markGotIt())
    act(() => result.current.markGotIt())
    act(() => result.current.markGotIt())
    expect(result.current.isComplete).toBe(true)
  })

  it('progress reflects fraction of original deck mastered', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS))
    act(() => result.current.markGotIt())
    expect(result.current.progress).toBeCloseTo(1/3)
  })

  it('accepts optional cardIds to filter deck', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS, ['fc-2']))
    expect(result.current.currentCard).toEqual(CARDS[1])
  })
})
```

- [ ] Implement `useFlashcardSession.ts`:

```typescript
import { useState, useCallback, useMemo } from 'react'
import type { Flashcard } from '../types'

export function useFlashcardSession(
  topicId: string,
  allCards: Flashcard[],
  cardIds?: string[]
) {
  const initialDeck = useMemo(() => {
    if (cardIds && cardIds.length > 0) {
      return allCards.filter(c => cardIds.includes(c.id))
    }
    return allCards
  }, [allCards, cardIds])

  const [deck, setDeck] = useState<Flashcard[]>(initialDeck)
  const [masteredIds, setMasteredIds] = useState<string[]>([])
  const [isFlipped, setIsFlipped] = useState(false)

  const currentCard = deck[0] ?? null
  const isComplete = deck.length === 0
  const progress = initialDeck.length === 0 ? 0 : masteredIds.length / initialDeck.length
  const score = masteredIds.length

  const flip = useCallback(() => setIsFlipped(f => !f), [])

  const markGotIt = useCallback(() => {
    if (!currentCard) return
    setMasteredIds(prev => [...prev, currentCard.id])
    setDeck(prev => prev.slice(1))
    setIsFlipped(false)
  }, [currentCard])

  const markAgain = useCallback(() => {
    setDeck(prev => [...prev.slice(1), prev[0]])
    setIsFlipped(false)
  }, [])

  return { currentCard, isFlipped, flip, markGotIt, markAgain, progress, isComplete, score, masteredIds }
}
```

- [ ] Run — PASS. Commit: `feat: add useFlashcardSession hook`

---

### Task 9: useMCQSession hook

**Files:**
- Create: `src/hooks/useMCQSession.ts`
- Create: `src/hooks/useMCQSession.test.ts`

- [ ] Write failing tests:

```typescript
const QUESTIONS = [
  { id: 'q-1', question: 'Q1?', options: ['A','B','C','D'], correctIndex: 2, explanation: 'Because C' },
  { id: 'q-2', question: 'Q2?', options: ['A','B','C','D'], correctIndex: 0, explanation: 'Because A' },
]

describe('useMCQSession', () => {
  it('starts with first question, nothing selected', () => {
    const { result } = renderHook(() => useMCQSession('topic-1', QUESTIONS))
    expect(result.current.currentQuestion).toEqual(QUESTIONS[0])
    expect(result.current.selectedIndex).toBeNull()
    expect(result.current.isRevealed).toBe(false)
  })

  it('select() sets selectedIndex', () => {
    const { result } = renderHook(() => useMCQSession('topic-1', QUESTIONS))
    act(() => result.current.select(1))
    expect(result.current.selectedIndex).toBe(1)
  })

  it('select() does not change after reveal', () => {
    const { result } = renderHook(() => useMCQSession('topic-1', QUESTIONS))
    act(() => result.current.select(1))
    act(() => result.current.submit())
    act(() => result.current.select(2))
    expect(result.current.selectedIndex).toBe(1) // unchanged
  })

  it('submit() reveals answer', () => {
    const { result } = renderHook(() => useMCQSession('topic-1', QUESTIONS))
    act(() => result.current.select(2))
    act(() => result.current.submit())
    expect(result.current.isRevealed).toBe(true)
    expect(result.current.isCorrect).toBe(true)
    expect(result.current.explanation).toBe('Because C')
  })

  it('submit() does nothing if nothing selected', () => {
    const { result } = renderHook(() => useMCQSession('topic-1', QUESTIONS))
    act(() => result.current.submit())
    expect(result.current.isRevealed).toBe(false)
  })

  it('next() advances to next question and resets state', () => {
    const { result } = renderHook(() => useMCQSession('topic-1', QUESTIONS))
    act(() => result.current.select(2))
    act(() => result.current.submit())
    act(() => result.current.next())
    expect(result.current.currentQuestion).toEqual(QUESTIONS[1])
    expect(result.current.selectedIndex).toBeNull()
    expect(result.current.isRevealed).toBe(false)
  })

  it('isComplete after last question next()', () => {
    const { result } = renderHook(() => useMCQSession('topic-1', QUESTIONS))
    act(() => { result.current.select(0); result.current.submit(); result.current.next() })
    act(() => { result.current.select(0); result.current.submit(); result.current.next() })
    expect(result.current.isComplete).toBe(true)
  })

  it('tracks wrongIds', () => {
    const { result } = renderHook(() => useMCQSession('topic-1', QUESTIONS))
    act(() => { result.current.select(0); result.current.submit(); result.current.next() }) // wrong (correct is 2)
    act(() => { result.current.select(0); result.current.submit(); result.current.next() }) // correct
    expect(result.current.wrongIds).toEqual(['q-1'])
  })

  it('accepts optional questionIds to filter', () => {
    const { result } = renderHook(() => useMCQSession('topic-1', QUESTIONS, ['q-2']))
    expect(result.current.currentQuestion).toEqual(QUESTIONS[1])
  })
})
```

- [ ] Implement `useMCQSession.ts`:

```typescript
import { useState, useCallback, useMemo } from 'react'
import type { MCQQuestion } from '../types'

export function useMCQSession(
  topicId: string,
  allQuestions: MCQQuestion[],
  questionIds?: string[]
) {
  const questions = useMemo(() => {
    if (questionIds && questionIds.length > 0) {
      return allQuestions.filter(q => questionIds.includes(q.id))
    }
    return allQuestions
  }, [allQuestions, questionIds])

  const [index, setIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [wrongIds, setWrongIds] = useState<string[]>([])

  const currentQuestion = questions[index] ?? null
  const isComplete = index >= questions.length
  const progress = questions.length === 0 ? 0 : index / questions.length
  const score = index - wrongIds.length
  const isCorrect = isRevealed && selectedIndex === currentQuestion?.correctIndex
  const explanation = isRevealed ? (currentQuestion?.explanation ?? '') : ''

  const select = useCallback((i: number) => {
    if (!isRevealed) setSelectedIndex(i)
  }, [isRevealed])

  const submit = useCallback(() => {
    if (selectedIndex === null || isRevealed) return
    setIsRevealed(true)
    if (selectedIndex !== currentQuestion?.correctIndex) {
      setWrongIds(prev => [...prev, currentQuestion!.id])
    }
  }, [selectedIndex, isRevealed, currentQuestion])

  const next = useCallback(() => {
    setIndex(i => i + 1)
    setSelectedIndex(null)
    setIsRevealed(false)
  }, [])

  return {
    currentQuestion, selectedIndex, select, submit, next,
    isRevealed, isCorrect, explanation,
    progress, isComplete, score, wrongIds,
  }
}
```

- [ ] Run — PASS. Commit: `feat: add useMCQSession hook`

---

### Task 10: Barrel export + full test run

- [ ] Create `src/hooks/index.ts`:

```typescript
export * from './useTopics'
export * from './useTopicProgress'
export * from './useOverallProgress'
export * from './useWeakTopics'
export * from './useLastSession'
export * from './useFlashcardSession'
export * from './useMCQSession'
export * from './useSessionHistory'
```

- [ ] Run all tests:

```bash
npm test
```

Expected: all pass.

- [ ] TypeScript check:

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] Commit:

```bash
git add -A
git commit -m "feat: data layer complete — all hooks and topics.json — T04 complete"
```
