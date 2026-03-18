# Mastery & Progress System — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add user-triggered mastery tiers (None→Seen→Practised→Passed→Mastered), weighted progress, and study streak to replace the broken binary progress system.

**Architecture:** New hooks derive mastery tier from existing progress flags plus three new `accepted` booleans. Each study mode gets a dedicated completion screen (new route files) where the user explicitly confirms understanding. The home screen switches from a topic count to a weighted percentage. No changes to the storage key structure — all new fields land inside the existing `progress` key.

**Tech Stack:** React 19, TanStack Router (file-based routing, dot = path separator), Vitest, localStorage via `src/services/storage.ts`, Tailwind v4.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/types/index.ts` | Modify | Add `MasteryTier`, extend `TopicProgress` and `UserProgress` |
| `src/hooks/useTopicMastery.ts` | **Create** | Derive tier from progress; expose `acceptFacts/Flashcards/MCQ` callbacks |
| `src/hooks/useTopicMastery.test.ts` | **Create** | Unit tests: tier derivation, accept callbacks |
| `src/hooks/useStudyStreak.ts` | **Create** | Read/write streak fields in `UserProgress` |
| `src/hooks/useStudyStreak.test.ts` | **Create** | Unit tests: increment, idempotent same-day, reset on gap |
| `src/hooks/useWeightedProgress.ts` | **Create** | Weighted topic percentage from tiers across all topics |
| `src/hooks/useWeightedProgress.test.ts` | **Create** | Unit tests: 0%, 100%, mixed weights |
| `src/hooks/useTopicProgress.ts` | Modify | Add `markFactsAccepted`, `acceptFlashcards`, `acceptMCQ` (deep-merge patches) |
| `src/hooks/useTopicProgress.test.ts` | Modify | Tests for new accept methods; verify deep merge doesn't clobber nested fields |
| `src/routes/topics/$topicId/facts.tsx` | Modify | Navigate to `facts/complete` on "Mark as Read" |
| `src/routes/topics/$topicId/facts.complete.tsx` | **Create** | Facts completion screen: checkmark, key terms count, "Locked in ✓" / "Review again" |
| `src/routes/topics/$topicId/flashcards.tsx` | Modify | Navigate to `flashcards/complete` with `masteredIds` + `total` in search |
| `src/routes/topics/$topicId/flashcards.complete.tsx` | **Create** | Flashcards completion screen: mastered/revisit breakdown, "Locked in ✓" / "Run through again" |
| `src/routes/topics/$topicId/mcq.tsx` | Modify | Navigate to `mcq/complete` (same search params) |
| `src/routes/topics/$topicId/mcq.complete.tsx` | **Create** | MCQ completion: pass/fail state, "Accept Pass ✓" / "Go for 100%" or "Try again" / "Accept anyway" |
| `src/components/organisms/StudyModeList/StudyModeList.tsx` | Modify | Show accepted state per mode; soft MCQ warning |
| `src/components/organisms/StudyModeList/StudyModeList.test.tsx` | Modify | Tests for accepted states, warning display |
| `src/routes/index.tsx` | Modify | Use `useWeightedProgress` + `useStudyStreak`; pass tier to topic list |

**Not touched:** `$mode.complete.tsx` (still used by navTools), `useOverallProgress.ts` (still used by progress screen), `useWeakTopics.ts`.

---

## Task 1: Add mastery types

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Extend types**

  Add to `src/types/index.ts`:

  ```typescript
  export type MasteryTier = 'none' | 'seen' | 'practised' | 'passed' | 'mastered'
  ```

  Extend `FlashcardProgress`:
  ```typescript
  export interface FlashcardProgress {
    masteredIds: string[]
    totalCards: number
    lastStudied: string
    accepted: boolean          // NEW
  }
  ```

  Extend `MCQProgress`:
  ```typescript
  export interface MCQProgress {
    bestScore: number
    totalQuestions: number
    wrongIds: string[]
    lastStudied: string
    accepted: boolean          // NEW
  }
  ```

  Extend `TopicProgress`:
  ```typescript
  export interface TopicProgress {
    factsRead: boolean
    factsReadAt?: string
    factsAccepted: boolean     // NEW — source of truth for tier
    flashcards: FlashcardProgress
    mcq: MCQProgress
    navTools: Record<string, NavToolProgress>
  }
  ```

  Extend `UserProgress`:
  ```typescript
  export interface UserProgress {
    userId: string
    topics: Record<string, TopicProgress>
    currentStreak: number      // NEW
    lastStudiedDate: string    // NEW — YYYY-MM-DD
    longestStreak: number      // NEW
  }
  ```

- [ ] **Step 2: Update DEFAULT_TOPIC_PROGRESS in useTopicProgress.ts**

  Add the new required fields to the default object:
  ```typescript
  const DEFAULT_TOPIC_PROGRESS: TopicProgress = {
    factsRead: false,
    factsAccepted: false,
    flashcards: { masteredIds: [], totalCards: 0, lastStudied: '', accepted: false },
    mcq: { bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '', accepted: false },
    navTools: {},
  }
  ```

- [ ] **Step 3: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```
  Expected: 0 errors (or only pre-existing errors unrelated to these changes).

- [ ] **Step 4: Commit**

  ```bash
  git add src/types/index.ts src/hooks/useTopicProgress.ts
  git commit -m "feat: add mastery tier types to TopicProgress and UserProgress"
  ```

---

## Task 2: useTopicMastery hook

**Files:**
- Create: `src/hooks/useTopicMastery.ts`
- Create: `src/hooks/useTopicMastery.test.ts`

- [ ] **Step 1: Write the failing tests**

  Create `src/hooks/useTopicMastery.test.ts`:

  ```typescript
  import { renderHook, act } from '@testing-library/react'
  import { vi, describe, it, expect, beforeEach } from 'vitest'
  import { useTopicMastery } from './useTopicMastery'

  // Mock storage so tests don't hit real localStorage
  vi.mock('../services/storage', () => ({
    storage: {
      get: vi.fn(() => ({ userId: 'local', topics: {}, currentStreak: 0, lastStudiedDate: '', longestStreak: 0 })),
      set: vi.fn(),
    },
  }))

  describe('useTopicMastery — tier derivation', () => {
    it('returns none when nothing is accepted', () => {
      const { result } = renderHook(() => useTopicMastery('topic-1'))
      expect(result.current.tier).toBe('none')
      expect(result.current.weight).toBe(0)
    })

    it('returns seen when only facts are accepted', () => {
      const { storage } = require('../services/storage')
      storage.get.mockReturnValue({
        userId: 'local',
        topics: { 'topic-1': { factsAccepted: true, flashcards: { accepted: false }, mcq: { accepted: false, bestScore: 0, totalQuestions: 10 } } },
        currentStreak: 0, lastStudiedDate: '', longestStreak: 0,
      })
      const { result } = renderHook(() => useTopicMastery('topic-1'))
      expect(result.current.tier).toBe('seen')
      expect(result.current.weight).toBe(0.25)
    })

    it('returns practised when facts and flashcards are accepted', () => {
      const { storage } = require('../services/storage')
      storage.get.mockReturnValue({
        userId: 'local',
        topics: { 'topic-1': { factsAccepted: true, flashcards: { accepted: true }, mcq: { accepted: false, bestScore: 0, totalQuestions: 10 } } },
        currentStreak: 0, lastStudiedDate: '', longestStreak: 0,
      })
      const { result } = renderHook(() => useTopicMastery('topic-1'))
      expect(result.current.tier).toBe('practised')
      expect(result.current.weight).toBe(0.5)
    })

    it('returns passed when all accepted and mcq score >= 70%', () => {
      const { storage } = require('../services/storage')
      storage.get.mockReturnValue({
        userId: 'local',
        topics: { 'topic-1': { factsAccepted: true, flashcards: { accepted: true }, mcq: { accepted: true, bestScore: 7, totalQuestions: 10 } } },
        currentStreak: 0, lastStudiedDate: '', longestStreak: 0,
      })
      const { result } = renderHook(() => useTopicMastery('topic-1'))
      expect(result.current.tier).toBe('passed')
      expect(result.current.weight).toBe(0.75)
    })

    it('returns mastered when all accepted and mcq score is 100%', () => {
      const { storage } = require('../services/storage')
      storage.get.mockReturnValue({
        userId: 'local',
        topics: { 'topic-1': { factsAccepted: true, flashcards: { accepted: true }, mcq: { accepted: true, bestScore: 10, totalQuestions: 10 } } },
        currentStreak: 0, lastStudiedDate: '', longestStreak: 0,
      })
      const { result } = renderHook(() => useTopicMastery('topic-1'))
      expect(result.current.tier).toBe('mastered')
      expect(result.current.weight).toBe(1.0)
    })

    it('does NOT reach passed if mcq score < 70% even when accepted', () => {
      const { storage } = require('../services/storage')
      storage.get.mockReturnValue({
        userId: 'local',
        topics: { 'topic-1': { factsAccepted: true, flashcards: { accepted: true }, mcq: { accepted: true, bestScore: 6, totalQuestions: 10 } } },
        currentStreak: 0, lastStudiedDate: '', longestStreak: 0,
      })
      const { result } = renderHook(() => useTopicMastery('topic-1'))
      expect(result.current.tier).toBe('practised')
    })
  })
  ```

- [ ] **Step 2: Run tests to confirm they fail**

  ```bash
  npx vitest run src/hooks/useTopicMastery.test.ts
  ```
  Expected: FAIL — "Cannot find module './useTopicMastery'"

- [ ] **Step 3: Implement the hook**

  Create `src/hooks/useTopicMastery.ts`:

  ```typescript
  import { useCallback } from 'react'
  import { useTopicProgress } from './useTopicProgress'
  import type { MasteryTier, TopicProgress } from '../types'

  const TIER_WEIGHT: Record<MasteryTier, number> = {
    none: 0,
    seen: 0.25,
    practised: 0.5,
    passed: 0.75,
    mastered: 1.0,
  }

  export function deriveTier(tp: TopicProgress | null | undefined): MasteryTier {
    if (!tp?.factsAccepted) return 'none'
    if (!tp.flashcards.accepted) return 'seen'
    const mcqPassed = tp.mcq.accepted && tp.mcq.totalQuestions > 0 && (tp.mcq.bestScore / tp.mcq.totalQuestions) >= 0.7
    if (!mcqPassed) return 'practised'
    if (tp.mcq.bestScore === tp.mcq.totalQuestions) return 'mastered'
    return 'passed'
  }

  export function useTopicMastery(topicId: string) {
    const { progress, markFactsAccepted, acceptFlashcards, acceptMCQ } = useTopicProgress(topicId)

    const tier = deriveTier(progress)
    const weight = TIER_WEIGHT[tier]

    return { tier, weight, acceptFacts: markFactsAccepted, acceptFlashcards, acceptMCQ }
  }
  ```

- [ ] **Step 4: Run tests to confirm they pass**

  ```bash
  npx vitest run src/hooks/useTopicMastery.test.ts
  ```
  Expected: All PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add src/hooks/useTopicMastery.ts src/hooks/useTopicMastery.test.ts
  git commit -m "feat: useTopicMastery hook — tier derivation"
  ```

---

## Task 3: useStudyStreak hook

**Files:**
- Create: `src/hooks/useStudyStreak.ts`
- Create: `src/hooks/useStudyStreak.test.ts`

- [ ] **Step 1: Write the failing tests**

  Create `src/hooks/useStudyStreak.test.ts`:

  ```typescript
  import { renderHook, act } from '@testing-library/react'
  import { vi, describe, it, expect, beforeEach } from 'vitest'

  // We test the pure streak logic separately from React
  import { computeStreak } from './useStudyStreak'

  describe('computeStreak', () => {
    const today = '2026-03-18'

    it('starts streak at 1 when lastStudiedDate is empty', () => {
      expect(computeStreak({ currentStreak: 0, lastStudiedDate: '', longestStreak: 0 }, today))
        .toEqual({ currentStreak: 1, lastStudiedDate: today, longestStreak: 1 })
    })

    it('increments streak for consecutive day', () => {
      expect(computeStreak({ currentStreak: 3, lastStudiedDate: '2026-03-17', longestStreak: 3 }, today))
        .toEqual({ currentStreak: 4, lastStudiedDate: today, longestStreak: 4 })
    })

    it('is idempotent when already studied today', () => {
      expect(computeStreak({ currentStreak: 3, lastStudiedDate: today, longestStreak: 5 }, today))
        .toEqual({ currentStreak: 3, lastStudiedDate: today, longestStreak: 5 })
    })

    it('resets streak to 1 on a gap > 1 day', () => {
      expect(computeStreak({ currentStreak: 10, lastStudiedDate: '2026-03-15', longestStreak: 10 }, today))
        .toEqual({ currentStreak: 1, lastStudiedDate: today, longestStreak: 10 })
    })

    it('does not update longestStreak if current is lower', () => {
      expect(computeStreak({ currentStreak: 1, lastStudiedDate: '2026-03-17', longestStreak: 20 }, today))
        .toEqual({ currentStreak: 2, lastStudiedDate: today, longestStreak: 20 })
    })
  })
  ```

- [ ] **Step 2: Run tests to confirm they fail**

  ```bash
  npx vitest run src/hooks/useStudyStreak.test.ts
  ```
  Expected: FAIL — "Cannot find module"

- [ ] **Step 3: Implement**

  Create `src/hooks/useStudyStreak.ts`:

  ```typescript
  import { useState, useCallback } from 'react'
  import { storage } from '../services/storage'
  import type { UserProgress } from '../types'

  interface StreakFields {
    currentStreak: number
    lastStudiedDate: string
    longestStreak: number
  }

  function loadStreak(): StreakFields {
    const p = storage.get<UserProgress>('progress', { userId: 'local', topics: {}, currentStreak: 0, lastStudiedDate: '', longestStreak: 0 })
    return {
      currentStreak: p?.currentStreak ?? 0,
      lastStudiedDate: p?.lastStudiedDate ?? '',
      longestStreak: p?.longestStreak ?? 0,
    }
  }

  export function computeStreak(current: StreakFields, today: string): StreakFields {
    if (current.lastStudiedDate === today) return current

    const last = current.lastStudiedDate ? new Date(current.lastStudiedDate) : null
    const todayDate = new Date(today)
    const diffDays = last ? Math.round((todayDate.getTime() - last.getTime()) / 86_400_000) : null

    const newStreak = diffDays === 1 ? current.currentStreak + 1 : 1
    const newLongest = Math.max(newStreak, current.longestStreak)

    return { currentStreak: newStreak, lastStudiedDate: today, longestStreak: newLongest }
  }

  export function useStudyStreak() {
    const [streak, setStreak] = useState<StreakFields>(loadStreak)

    const recordStudyDay = useCallback(() => {
      const today = new Date().toISOString().slice(0, 10)
      setStreak(prev => {
        const next = computeStreak(prev, today)
        if (next === prev) return prev
        // Persist streak fields into existing progress blob
        const progress = storage.get<UserProgress>('progress', { userId: 'local', topics: {}, currentStreak: 0, lastStudiedDate: '', longestStreak: 0 })
        storage.set('progress', { ...progress, ...next })
        return next
      })
    }, [])

    return { currentStreak: streak.currentStreak, longestStreak: streak.longestStreak, recordStudyDay }
  }
  ```

- [ ] **Step 4: Run tests to confirm they pass**

  ```bash
  npx vitest run src/hooks/useStudyStreak.test.ts
  ```
  Expected: All PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add src/hooks/useStudyStreak.ts src/hooks/useStudyStreak.test.ts
  git commit -m "feat: useStudyStreak hook — consecutive study day tracking"
  ```

---

## Task 4: useWeightedProgress hook

**Files:**
- Create: `src/hooks/useWeightedProgress.ts`
- Create: `src/hooks/useWeightedProgress.test.ts`

- [ ] **Step 1: Write the failing tests**

  Create `src/hooks/useWeightedProgress.test.ts`:

  ```typescript
  import { renderHook } from '@testing-library/react'
  import { vi, describe, it, expect } from 'vitest'
  import { useWeightedProgress } from './useWeightedProgress'

  vi.mock('../data/topics.json', () => ({
    default: [{ id: 't1' }, { id: 't2' }, { id: 't3' }, { id: 't4' }],
  }))

  const makeProgress = (overrides: Record<string, Partial<{ factsAccepted: boolean; flashcardsAccepted: boolean; mcqAccepted: boolean; mcqScore: number; mcqTotal: number }>>) => {
    const topics: Record<string, any> = {}
    for (const [id, o] of Object.entries(overrides)) {
      topics[id] = {
        factsAccepted: o.factsAccepted ?? false,
        flashcards: { accepted: o.flashcardsAccepted ?? false },
        mcq: { accepted: o.mcqAccepted ?? false, bestScore: o.mcqScore ?? 0, totalQuestions: o.mcqTotal ?? 10 },
      }
    }
    return { userId: 'local', topics, currentStreak: 0, lastStudiedDate: '', longestStreak: 0 }
  }

  vi.mock('../services/storage', () => ({ storage: { get: vi.fn(), set: vi.fn() } }))

  describe('useWeightedProgress', () => {
    it('returns 0% when nothing done', () => {
      const { storage } = require('../services/storage')
      storage.get.mockReturnValue(makeProgress({}))
      const { result } = renderHook(() => useWeightedProgress())
      expect(result.current.percentComplete).toBe(0)
    })

    it('returns 100% when all topics mastered', () => {
      const { storage } = require('../services/storage')
      storage.get.mockReturnValue(makeProgress({
        t1: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 10, mcqTotal: 10 },
        t2: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 10, mcqTotal: 10 },
        t3: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 10, mcqTotal: 10 },
        t4: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 10, mcqTotal: 10 },
      }))
      const { result } = renderHook(() => useWeightedProgress())
      expect(result.current.percentComplete).toBe(100)
    })

    it('returns weighted average for mixed tiers', () => {
      const { storage } = require('../services/storage')
      // t1=mastered(1.0), t2=passed(0.75), t3=practised(0.5), t4=none(0) → avg = 0.5625 → 56%
      storage.get.mockReturnValue(makeProgress({
        t1: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 10, mcqTotal: 10 },
        t2: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 7, mcqTotal: 10 },
        t3: { factsAccepted: true, flashcardsAccepted: true },
      }))
      const { result } = renderHook(() => useWeightedProgress())
      expect(result.current.percentComplete).toBe(56)
    })

    it('exposes topicTiers map', () => {
      const { storage } = require('../services/storage')
      storage.get.mockReturnValue(makeProgress({ t1: { factsAccepted: true } }))
      const { result } = renderHook(() => useWeightedProgress())
      expect(result.current.topicTiers['t1']).toBe('seen')
      expect(result.current.topicTiers['t2']).toBe('none')
    })
  })
  ```

- [ ] **Step 2: Run to confirm failure**

  ```bash
  npx vitest run src/hooks/useWeightedProgress.test.ts
  ```
  Expected: FAIL

- [ ] **Step 3: Implement**

  Create `src/hooks/useWeightedProgress.ts`:

  ```typescript
  import { useMemo, useState } from 'react'
  import { storage } from '../services/storage'
  import topicsData from '../data/topics.json'
  import { deriveTier } from './useTopicMastery'
  import type { MasteryTier, UserProgress } from '../types'

  const TIER_WEIGHT: Record<MasteryTier, number> = {
    none: 0, seen: 0.25, practised: 0.5, passed: 0.75, mastered: 1.0,
  }

  export function useWeightedProgress() {
    const [userProgress] = useState<UserProgress>(
      () => storage.get<UserProgress>('progress', { userId: 'local', topics: {}, currentStreak: 0, lastStudiedDate: '', longestStreak: 0 })
        ?? { userId: 'local', topics: {}, currentStreak: 0, lastStudiedDate: '', longestStreak: 0 }
    )

    const topicTiers = useMemo(() => {
      const tiers: Record<string, MasteryTier> = {}
      for (const topic of topicsData) {
        tiers[topic.id] = deriveTier(userProgress.topics[topic.id])
      }
      return tiers
    }, [userProgress])

    const percentComplete = useMemo(() => {
      const total = topicsData.length
      if (total === 0) return 0
      const sum = Object.values(topicTiers).reduce((acc, tier) => acc + TIER_WEIGHT[tier], 0)
      return Math.round((sum / total) * 100)
    }, [topicTiers])

    return { percentComplete, topicTiers }
  }
  ```

- [ ] **Step 4: Run to confirm pass**

  ```bash
  npx vitest run src/hooks/useWeightedProgress.test.ts
  ```
  Expected: All PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add src/hooks/useWeightedProgress.ts src/hooks/useWeightedProgress.test.ts
  git commit -m "feat: useWeightedProgress hook — tier-weighted topic completion"
  ```

---

## Task 5: Extend useTopicProgress with accept methods

**Files:**
- Modify: `src/hooks/useTopicProgress.ts`
- Modify: `src/hooks/useTopicProgress.test.ts`

- [ ] **Step 1: Write failing tests**

  In `src/hooks/useTopicProgress.test.ts`, add:

  ```typescript
  describe('accept methods', () => {
    it('markFactsAccepted sets factsAccepted without clobbering other fields', () => {
      // Set up initial progress with existing flashcard data
      // Call markFactsAccepted
      // Assert factsAccepted=true AND flashcards.masteredIds still intact
    })

    it('acceptFlashcards sets flashcards.accepted without clobbering masteredIds', () => {
      // Setup: topic with masteredIds=['fc-1','fc-2'], totalCards=2
      // Call acceptFlashcards
      // Assert: flashcards.accepted=true, masteredIds still ['fc-1','fc-2']
    })

    it('acceptMCQ sets mcq.accepted without clobbering bestScore or wrongIds', () => {
      // Setup: topic with bestScore=8, wrongIds=['q3']
      // Call acceptMCQ
      // Assert: mcq.accepted=true, bestScore=8, wrongIds=['q3']
    })
  })
  ```

  Flesh out with `renderHook` + `act` following the existing test pattern in the file.

- [ ] **Step 2: Run to confirm failure**

  ```bash
  npx vitest run src/hooks/useTopicProgress.test.ts
  ```
  Expected: FAIL — "markFactsAccepted is not a function"

- [ ] **Step 3: Add accept methods to useTopicProgress**

  In `src/hooks/useTopicProgress.ts`, add after `updateMCQ`:

  ```typescript
  const markFactsAccepted = useCallback(() => {
    update({ factsRead: true, factsAccepted: true, factsReadAt: new Date().toISOString() })
  }, [update])

  const acceptFlashcards = useCallback(() => {
    const current = userProgress.topics[topicId] ?? DEFAULT_TOPIC_PROGRESS
    update({ flashcards: { ...current.flashcards, accepted: true } })
  }, [update, userProgress, topicId])

  const acceptMCQ = useCallback(() => {
    const current = userProgress.topics[topicId] ?? DEFAULT_TOPIC_PROGRESS
    update({ mcq: { ...current.mcq, accepted: true } })
  }, [update, userProgress, topicId])
  ```

  Add all three to the return object.

- [ ] **Step 4: Run to confirm pass**

  ```bash
  npx vitest run src/hooks/useTopicProgress.test.ts
  ```
  Expected: All PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add src/hooks/useTopicProgress.ts src/hooks/useTopicProgress.test.ts
  git commit -m "feat: add acceptFacts/Flashcards/MCQ to useTopicProgress"
  ```

---

## Task 6: Facts completion flow

**Files:**
- Modify: `src/routes/topics/$topicId/facts.tsx`
- Create: `src/routes/topics/$topicId/facts.complete.tsx`

- [ ] **Step 1: Create facts.complete.tsx**

  ```typescript
  import { createFileRoute, useNavigate } from '@tanstack/react-router'
  import { CheckIcon } from 'lucide-react'
  import { useTopics } from '../../../hooks/useTopics'
  import { useTopicMastery } from '../../../hooks/useTopicMastery'
  import { AppShell } from '../../../components/templates/AppShell'
  import { TabBar } from '../../../components/organisms/TabBar'
  import { ScrollPage } from '../../../components/templates/ScrollPage'
  import { Button } from '../../../components/atoms/Button'

  export const Route = createFileRoute('/topics/$topicId/facts/complete')({
    component: FactsCompleteScreen,
  })

  function FactsCompleteScreen() {
    const { topicId } = Route.useParams()
    const navigate = useNavigate()
    const { topics } = useTopics()
    const { acceptFacts } = useTopicMastery(topicId)

    const topic = topics.find(t => t.id === topicId)
    if (!topic) return <div>Topic not found</div>

    const factCount = topic.keyTerms.length

    function handleLockIn() {
      acceptFacts()
      navigate({ to: '/topics/$topicId', params: { topicId } })
    }

    function handleReview() {
      navigate({ to: '/topics/$topicId/facts', params: { topicId } })
    }

    return (
      <AppShell tabBar={<TabBar active="study" />}>
        <ScrollPage>
          <div className="flex flex-col gap-6 pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-[0.5px]">{topic.title}</p>
              <h1 className="font-heading text-3xl font-medium text-text">Facts Complete</h1>
            </div>
            <div className="flex flex-col gap-4">
              <CheckIcon size={48} className="text-[var(--color-success)]" aria-hidden="true" />
              <p className="text-text-secondary text-sm">{factCount} key facts reviewed</p>
              <div className="flex items-center gap-2 bg-[var(--color-success-bg)] px-3 py-2">
                <span className="font-heading text-lg font-bold text-[var(--color-success)]">{factCount}</span>
                <span className="text-sm text-text-secondary">— All covered</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <Button onClick={handleLockIn} fullWidth>Locked in ✓</Button>
              <Button onClick={handleReview} variant="secondary" fullWidth>Review again</Button>
            </div>
          </div>
        </ScrollPage>
      </AppShell>
    )
  }
  ```

- [ ] **Step 2: Update facts.tsx to navigate to facts/complete**

  In `src/routes/topics/$topicId/facts.tsx`, change the `onClick` of the "Mark as Read" button:

  ```typescript
  // Replace:
  onClick={() => {
    markFactsRead()
    navigate({ to: `/topics/${topicId}` })
  }}

  // With:
  onClick={() => {
    markFactsRead()
    navigate({ to: '/topics/$topicId/facts/complete', params: { topicId } })
  }}
  ```

- [ ] **Step 3: Verify the route works**

  ```bash
  npx vitest run
  ```
  Expected: All existing tests still pass.

- [ ] **Step 4: Commit**

  ```bash
  git add src/routes/topics/'$topicId'/facts.tsx src/routes/topics/'$topicId'/facts.complete.tsx
  git commit -m "feat: facts completion screen with Locked In CTA"
  ```

---

## Task 7: Flashcards completion flow

**Files:**
- Modify: `src/routes/topics/$topicId/flashcards.tsx`
- Create: `src/routes/topics/$topicId/flashcards.complete.tsx`

- [ ] **Step 1: Create flashcards.complete.tsx**

  ```typescript
  import { createFileRoute, useNavigate } from '@tanstack/react-router'
  import { z } from 'zod'
  import { useTopics } from '../../../hooks/useTopics'
  import { useTopicMastery } from '../../../hooks/useTopicMastery'
  import { AppShell } from '../../../components/templates/AppShell'
  import { TabBar } from '../../../components/organisms/TabBar'
  import { ScrollPage } from '../../../components/templates/ScrollPage'
  import { Button } from '../../../components/atoms/Button'

  const searchSchema = z.object({
    masteredIds: z.string().optional(),
    total: z.number(),
  })

  export const Route = createFileRoute('/topics/$topicId/flashcards/complete')({
    validateSearch: searchSchema,
    component: FlashcardsCompleteScreen,
  })

  function FlashcardsCompleteScreen() {
    const { topicId } = Route.useParams()
    const { masteredIds: masteredParam, total } = Route.useSearch()
    const navigate = useNavigate()
    const { topics } = useTopics()
    const { acceptFlashcards } = useTopicMastery(topicId)

    const topic = topics.find(t => t.id === topicId)
    if (!topic) return <div>Topic not found</div>

    const mastered = masteredParam ? masteredParam.split(',').filter(Boolean).length : 0
    const revisit = total - mastered
    const pct = total > 0 ? Math.round((mastered / total) * 100) : 0

    function handleLockIn() {
      acceptFlashcards()
      navigate({ to: '/topics/$topicId', params: { topicId } })
    }

    function handleRunAgain() {
      navigate({ to: '/topics/$topicId/flashcards', params: { topicId } })
    }

    return (
      <AppShell tabBar={<TabBar active="study" />}>
        <ScrollPage>
          <div className="flex flex-col gap-6 pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-[0.5px]">{topic.title}</p>
              <h1 className="font-heading text-3xl font-medium text-text">Flashcards Complete</h1>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <span className="font-heading text-6xl font-medium text-text">{mastered}</span>
                <span className="font-heading text-2xl text-text-muted pb-2">/ {total}</span>
              </div>
              <p className="text-sm text-text-secondary">cards mastered</p>
              <div className="flex items-center gap-2 bg-[var(--color-success-bg)] px-3 py-2">
                <span className="font-heading text-lg font-bold text-[var(--color-success)]">{mastered}/{total}</span>
                <span className="text-sm text-text-secondary">— {pct === 100 ? 'Perfect!' : 'Great work!'}</span>
              </div>
            </div>
            <div className="flex border border-border">
              <div className="flex-1 flex flex-col items-center gap-1 py-4">
                <span className="font-heading text-2xl font-bold text-[var(--color-success)]">{mastered}</span>
                <span className="text-xs text-text-muted uppercase tracking-[0.5px]">Mastered</span>
              </div>
              <div className="w-px bg-border" />
              <div className="flex-1 flex flex-col items-center gap-1 py-4">
                <span className="font-heading text-2xl font-bold text-[var(--color-warning)]">{revisit}</span>
                <span className="text-xs text-text-muted uppercase tracking-[0.5px]">Revisit</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button onClick={handleLockIn} fullWidth>Locked in — I've got this ✓</Button>
              <Button onClick={handleRunAgain} variant="secondary" fullWidth>Run through again</Button>
            </div>
          </div>
        </ScrollPage>
      </AppShell>
    )
  }
  ```

- [ ] **Step 2: Update flashcards.tsx navigation**

  In `src/routes/topics/$topicId/flashcards.tsx`, change `handleComplete`:

  ```typescript
  // Replace navigate call:
  navigate({
    to: '/topics/$topicId/$mode/complete',
    params: { topicId, mode: 'flashcards' },
    search: { score: result.score, total: result.total, wrongIds: wrongIds.join(',') },
  })

  // With:
  navigate({
    to: '/topics/$topicId/flashcards/complete',
    params: { topicId },
    search: { masteredIds: result.masteredIds.join(','), total: result.total },
  })
  ```

- [ ] **Step 3: Run all tests**

  ```bash
  npx vitest run
  ```
  Expected: All PASS.

- [ ] **Step 4: Commit**

  ```bash
  git add src/routes/topics/'$topicId'/flashcards.tsx src/routes/topics/'$topicId'/flashcards.complete.tsx
  git commit -m "feat: flashcards completion screen with mastered/revisit breakdown"
  ```

---

## Task 8: MCQ completion flow

**Files:**
- Modify: `src/routes/topics/$topicId/mcq.tsx`
- Create: `src/routes/topics/$topicId/mcq.complete.tsx`

- [ ] **Step 1: Create mcq.complete.tsx**

  ```typescript
  import { createFileRoute, useNavigate } from '@tanstack/react-router'
  import { z } from 'zod'
  import { useTopics } from '../../../hooks/useTopics'
  import { useTopicMastery } from '../../../hooks/useTopicMastery'
  import { AppShell } from '../../../components/templates/AppShell'
  import { TabBar } from '../../../components/organisms/TabBar'
  import { ScrollPage } from '../../../components/templates/ScrollPage'
  import { Button } from '../../../components/atoms/Button'

  const searchSchema = z.object({
    score: z.number(),
    total: z.number(),
    wrongIds: z.string().optional(),
  })

  export const Route = createFileRoute('/topics/$topicId/mcq/complete')({
    validateSearch: searchSchema,
    component: MCQCompleteScreen,
  })

  function MCQCompleteScreen() {
    const { topicId } = Route.useParams()
    const { score, total, wrongIds: wrongIdsParam } = Route.useSearch()
    const navigate = useNavigate()
    const { topics } = useTopics()
    const { acceptMCQ } = useTopicMastery(topicId)

    const topic = topics.find(t => t.id === topicId)
    if (!topic) return <div>Topic not found</div>

    const wrongIds = wrongIdsParam ? wrongIdsParam.split(',').filter(Boolean) : []
    const pct = total > 0 ? Math.round((score / total) * 100) : 0
    const isPassing = pct >= 70
    const isPerfect = score === total

    function handleAccept() {
      acceptMCQ()
      navigate({ to: '/topics/$topicId', params: { topicId } })
    }

    function handleRetry() {
      navigate({ to: '/topics/$topicId/mcq', params: { topicId } })
    }

    function handleGoFor100() {
      navigate({
        to: '/topics/$topicId/mcq',
        params: { topicId },
        search: { mode: 'review', questionIds: wrongIds.join(',') },
      })
    }

    return (
      <AppShell tabBar={<TabBar active="study" />}>
        <ScrollPage>
          <div className="flex flex-col gap-6 pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-[0.5px]">{topic.title}</p>
              <h1 className="font-heading text-3xl font-medium text-text">MCQ Complete</h1>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <span className="font-heading text-6xl font-medium text-text">{score}</span>
                <span className="font-heading text-2xl text-text-muted pb-2">/ {total}</span>
              </div>
              <p className="text-sm text-text-secondary">questions correct</p>
              <div className={`flex items-center gap-2 px-3 py-2 ${isPassing ? 'bg-[var(--color-success-bg)]' : 'bg-[var(--color-sand)]'}`}>
                <span className={`font-heading text-lg font-bold ${isPassing ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'}`}>
                  {pct}%
                </span>
                <span className="text-sm text-text-secondary">
                  {isPerfect ? '— Perfect score!' : isPassing ? '— You\'ve passed this topic' : '— Keep going'}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {isPassing ? (
                <>
                  <Button onClick={handleAccept} fullWidth>Accept Pass ✓</Button>
                  {!isPerfect && (
                    <Button onClick={handleGoFor100} variant="secondary" fullWidth>Go for 100% →</Button>
                  )}
                </>
              ) : (
                <>
                  <Button onClick={handleRetry} fullWidth>Try again</Button>
                  <Button onClick={handleAccept} variant="secondary" fullWidth disabled={false}>
                    <span className="opacity-60">Accept anyway</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </ScrollPage>
      </AppShell>
    )
  }
  ```

- [ ] **Step 2: Write MCQ complete screen tests**

  Create `src/routes/topics/$topicId/mcq.complete.test.tsx`:

  ```typescript
  import { render, screen } from '@testing-library/react'
  import userEvent from '@testing-library/user-event'
  import { vi } from 'vitest'

  // Wrap with router context using createMemoryRouter from TanStack Router test utils
  // or use the existing pattern from other route tests in the codebase.
  // Key assertions:

  it('shows "Accept Pass ✓" when score >= 70%', () => {
    // render with score=7, total=10
    // expect "Accept Pass ✓" button to be visible
    // expect "Go for 100%" to be visible
  })

  it('shows "Try again" when score < 70%', () => {
    // render with score=5, total=10
    // expect "Try again" button to be visible
    // expect "Accept anyway" to be visible (dimmed)
  })

  it('calls acceptMCQ and navigates on Accept Pass', async () => {
    // render with score=8, total=10
    // click "Accept Pass ✓"
    // expect acceptMCQ was called
    // expect navigation to topic detail
  })
  ```

  Follow the pattern of other screen tests in the codebase for router wrapping.

- [ ] **Step 3: Update mcq.tsx navigation**

  In `src/routes/topics/$topicId/mcq.tsx`, in the completion `useEffect`, change:

  ```typescript
  // Replace:
  navigate({
    to: '/topics/$topicId/$mode/complete',
    params: { topicId, mode: 'mcq' },
    search: { score: scoreRef.current, total: topicQuestionsLengthRef.current, wrongIds: wrongIdsRef.current.join(',') },
  })

  // With:
  navigate({
    to: '/topics/$topicId/mcq/complete',
    params: { topicId },
    search: { score: scoreRef.current, total: topicQuestionsLengthRef.current, wrongIds: wrongIdsRef.current.join(',') },
  })
  ```

- [ ] **Step 4: Run all tests**

  ```bash
  npx vitest run
  ```
  Expected: All PASS.

- [ ] **Step 5: Commit**

  ```bash
  git add src/routes/topics/'$topicId'/mcq.tsx src/routes/topics/'$topicId'/mcq.complete.tsx src/routes/topics/'$topicId'/mcq.complete.test.tsx
  git commit -m "feat: MCQ completion screen with pass/fail state and Accept CTA"
  ```

---

## Task 9: StudyModeList — accepted states and soft warning

**Files:**
- Modify: `src/components/organisms/StudyModeList/StudyModeList.tsx`
- Modify: `src/components/organisms/StudyModeList/StudyModeList.test.tsx`

- [ ] **Step 1: Write failing tests**

  In `StudyModeList.test.tsx`, add:

  ```typescript
  it('shows "Accepted ✓" on Key Facts row when factsAccepted is true', () => {
    const progress = { factsAccepted: true, flashcards: { accepted: false, masteredIds: [], totalCards: 0, lastStudied: '' }, mcq: { accepted: false, bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '' }, navTools: {}, factsRead: true }
    render(<StudyModeList topicId="t1" navTools={[]} onModeSelect={() => {}} progress={progress} />)
    expect(screen.getByText('Accepted ✓')).toBeInTheDocument()
  })

  it('shows soft warning on MCQ row when facts not accepted', () => {
    const progress = { factsAccepted: false, flashcards: { accepted: false, masteredIds: [], totalCards: 0, lastStudied: '' }, mcq: { accepted: false, bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '' }, navTools: {}, factsRead: false }
    render(<StudyModeList topicId="t1" navTools={[]} onModeSelect={() => {}} progress={progress} />)
    expect(screen.getByText(/complete facts and flashcards first/i)).toBeInTheDocument()
  })

  it('does NOT show warning when facts and flashcards accepted', () => {
    const progress = { factsAccepted: true, flashcards: { accepted: true, masteredIds: [], totalCards: 0, lastStudied: '' }, mcq: { accepted: false, bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '' }, navTools: {}, factsRead: true }
    render(<StudyModeList topicId="t1" navTools={[]} onModeSelect={() => {}} progress={progress} />)
    expect(screen.queryByText(/complete facts and flashcards first/i)).not.toBeInTheDocument()
  })
  ```

- [ ] **Step 2: Run to confirm failure**

  ```bash
  npx vitest run src/components/organisms/StudyModeList/StudyModeList.test.tsx
  ```

- [ ] **Step 3: Update StudyModeList**

  In `StudyModeList.tsx`, use accepted flags from progress:

  ```typescript
  const factsAccepted = progress?.factsAccepted ?? false
  const flashcardsAccepted = progress?.flashcards.accepted ?? false
  const mcqAccepted = progress?.mcq.accepted ?? false
  const showMCQWarning = !factsAccepted || !flashcardsAccepted

  // Update progressText for Key Facts:
  progressText={factsAccepted ? 'Accepted ✓' : (progress?.factsRead ? 'Read' : undefined)}

  // Update progressText for Flashcards:
  progressText={flashcardsAccepted ? 'Accepted ✓' : (totalCards > 0 ? `${masteredCards}/${totalCards}` : undefined)}

  // Update progressText for MCQ:
  progressText={mcqAccepted ? 'Accepted ✓' : (mcqTotal > 0 ? `${mcqBest}/${mcqTotal}` : undefined)}

  // Add below MCQ row (inside the list, after the MCQ StudyModeRow):
  {showMCQWarning && (
    <p className="text-xs text-text-muted px-4 py-2 border-b border-border">
      Complete facts and flashcards first to reach Passed
    </p>
  )}
  ```

- [ ] **Step 4: Run to confirm pass**

  ```bash
  npx vitest run src/components/organisms/StudyModeList/StudyModeList.test.tsx
  ```

- [ ] **Step 5: Run all tests**

  ```bash
  npx vitest run
  ```
  Expected: All PASS.

- [ ] **Step 6: Commit**

  ```bash
  git add src/components/organisms/StudyModeList/
  git commit -m "feat: StudyModeList shows accepted states and MCQ prerequisite warning"
  ```

---

## Task 10: Home screen — weighted progress, streak, tier chips

**Files:**
- Modify: `src/routes/index.tsx` (and any sub-components it delegates to)

> Read `src/routes/index.tsx` and the `OverallProgressCard` and `TopicList` component files before starting this task to understand the current prop interfaces.

- [ ] **Step 1: Identify current progress/streak usage**

  Read these files:
  - `src/routes/index.tsx`
  - `src/components/organisms/OverallProgressCard/OverallProgressCard.tsx`
  - Whichever component renders the topic list rows with status badges

- [ ] **Step 2: Update home route to use new hooks**

  In `src/routes/index.tsx`:

  ```typescript
  // Replace:
  import { useOverallProgress } from '../hooks/useOverallProgress'
  const { percentComplete, topicStatuses } = useOverallProgress()

  // With:
  import { useWeightedProgress } from '../hooks/useWeightedProgress'
  import { useStudyStreak } from '../hooks/useStudyStreak'
  const { percentComplete, topicTiers } = useWeightedProgress()
  const { currentStreak, recordStudyDay } = useStudyStreak()
  ```

  Call `recordStudyDay()` in a `useEffect` with an empty dependency array (once on mount = once per visit counts as a study day):

  ```typescript
  useEffect(() => { recordStudyDay() }, [])
  ```

- [ ] **Step 3: Pass tier to topic list**

  Pass `topicTiers` to the topic list component and update it to display tier chips instead of the old `none/partial/complete` status badges:

  | Tier | Label | Color class |
  |---|---|---|
  | `none` | (no chip) | — |
  | `seen` | SEEN | `text-primary` |
  | `practised` | PRACTISED | `text-text` |
  | `passed` | PASSED | `text-[var(--color-success)]` |
  | `mastered` | MASTERED | `text-[var(--color-success)]` |

- [ ] **Step 4: Update streak display**

  Pass `currentStreak` to `OverallProgressCard` (or wherever the streak is displayed). Replace the hardcoded "Day 1 STREAK" with `{currentStreak} DAY STREAK`.

- [ ] **Step 5: Update progress display**

  Replace "X / 17 topics" with `{percentComplete}% complete`.

- [ ] **Step 6: Run all tests**

  ```bash
  npx vitest run
  ```
  Expected: All PASS. Fix any type errors from prop interface changes.

- [ ] **Step 7: Commit**

  ```bash
  git add src/routes/index.tsx src/components/organisms/OverallProgressCard/ src/components/molecules/TopicRow/
  git commit -m "feat: home screen — weighted progress %, real streak, mastery tier chips"
  ```

---

## Final verification

- [ ] Run the full test suite: `npx vitest run`
- [ ] Confirm 0 TypeScript errors: `npx tsc --noEmit`
- [ ] Smoke test in browser: start a topic, complete all 3 modes accepting each, verify tier advances to `passed` on home screen
