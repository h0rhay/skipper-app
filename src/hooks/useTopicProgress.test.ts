import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTopicProgress } from './useTopicProgress'

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
