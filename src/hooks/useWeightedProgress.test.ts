import { renderHook } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useWeightedProgress } from './useWeightedProgress'
import { storage } from '../services/storage'

vi.mock('../data/topics.json', () => ({
  default: [{ id: 't1' }, { id: 't2' }, { id: 't3' }, { id: 't4' }],
}))

vi.mock('../services/storage', () => ({
  storage: { get: vi.fn(), set: vi.fn() },
}))

const makeProgress = (overrides: Record<string, Partial<{
  factsAccepted: boolean
  flashcardsAccepted: boolean
  mcqAccepted: boolean
  mcqScore: number
  mcqTotal: number
}>>) => {
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

const mockStorage = vi.mocked(storage)

describe('useWeightedProgress', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 0% when nothing done', () => {
    mockStorage.get.mockReturnValue(makeProgress({}))
    const { result } = renderHook(() => useWeightedProgress())
    expect(result.current.percentComplete).toBe(0)
  })

  it('returns 100% when all topics mastered', () => {
    mockStorage.get.mockReturnValue(makeProgress({
      t1: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 10, mcqTotal: 10 },
      t2: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 10, mcqTotal: 10 },
      t3: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 10, mcqTotal: 10 },
      t4: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 10, mcqTotal: 10 },
    }))
    const { result } = renderHook(() => useWeightedProgress())
    expect(result.current.percentComplete).toBe(100)
  })

  it('returns weighted average for mixed tiers', () => {
    // t1=mastered(1.0), t2=passed(0.75), t3=practised(0.5), t4=none(0) → avg = 0.5625 → 56%
    mockStorage.get.mockReturnValue(makeProgress({
      t1: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 10, mcqTotal: 10 },
      t2: { factsAccepted: true, flashcardsAccepted: true, mcqAccepted: true, mcqScore: 7, mcqTotal: 10 },
      t3: { factsAccepted: true, flashcardsAccepted: true },
    }))
    const { result } = renderHook(() => useWeightedProgress())
    expect(result.current.percentComplete).toBe(56)
  })

  it('exposes topicTiers map', () => {
    mockStorage.get.mockReturnValue(makeProgress({ t1: { factsAccepted: true } }))
    const { result } = renderHook(() => useWeightedProgress())
    expect(result.current.topicTiers['t1']).toBe('seen')
    expect(result.current.topicTiers['t2']).toBe('none')
  })
})
