import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTopicMastery } from './useTopicMastery'

describe('full accept flow integration', () => {
  beforeEach(() => localStorage.clear())

  it('advances tier none → seen → practised → passed after full accept sequence', () => {
    const topicId = 'test-topic-integration'

    const { result } = renderHook(() => useTopicMastery(topicId))
    expect(result.current.tier).toBe('none')

    act(() => result.current.acceptFacts())
    expect(result.current.tier).toBe('seen')

    act(() => result.current.acceptFlashcards())
    expect(result.current.tier).toBe('practised')

    act(() => result.current.updateMCQ({ bestScore: 7, totalQuestions: 10, wrongIds: [] }))
    act(() => result.current.acceptMCQ())
    expect(result.current.tier).toBe('passed')
  })
})
