import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTopicProgress } from './useTopicProgress'
import { useTopicMastery } from './useTopicMastery'

describe('full accept flow integration', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('advances tier from none → seen → practised → passed after full accept sequence', () => {
    const topicId = 'test-topic-integration'

    // Render both hooks for the same topic
    const { result: progressResult } = renderHook(() => useTopicProgress(topicId))
    const { result: masteryResult } = renderHook(() => useTopicMastery(topicId))

    // 1. Start: tier should be none
    expect(masteryResult.current.tier).toBe('none')

    // 2. After markFactsAccepted: tier should be seen
    act(() => {
      progressResult.current.markFactsAccepted()
    })

    // Re-render to pick up localStorage changes
    const { result: masteryAfterFacts } = renderHook(() => useTopicMastery(topicId))
    expect(masteryAfterFacts.current.tier).toBe('seen')

    // 3. After acceptFlashcards: tier should be practised
    const { result: progressAfterFacts } = renderHook(() => useTopicProgress(topicId))
    act(() => {
      progressAfterFacts.current.acceptFlashcards()
    })

    const { result: masteryAfterFlashcards } = renderHook(() => useTopicMastery(topicId))
    expect(masteryAfterFlashcards.current.tier).toBe('practised')

    // 4. After updateMCQ with score >= 70% + acceptMCQ: tier should be passed
    const { result: progressAfterFlashcards } = renderHook(() => useTopicProgress(topicId))
    act(() => {
      progressAfterFlashcards.current.updateMCQ({ bestScore: 7, totalQuestions: 10, wrongIds: [] })
    })
    act(() => {
      progressAfterFlashcards.current.acceptMCQ()
    })

    const { result: masteryAfterMCQ } = renderHook(() => useTopicMastery(topicId))
    expect(masteryAfterMCQ.current.tier).toBe('passed')
  })
})
