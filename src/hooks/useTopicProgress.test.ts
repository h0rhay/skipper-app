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

  it('update() sets factsRead', () => {
    const { result } = renderHook(() => useTopicProgress('05-irpcs-colregs'))
    act(() => result.current.update({ factsRead: true }))
    expect(result.current.progress.factsRead).toBe(true)
  })

  it('updateFlashcards merges mastered IDs', () => {
    const { result } = renderHook(() => useTopicProgress('05-irpcs-colregs'))
    act(() => result.current.updateFlashcards({ masteredIds: ['fc-1', 'fc-2'], totalCards: 18 }))
    expect(result.current.progress.flashcards.masteredIds).toEqual(['fc-1', 'fc-2'])
  })

  it('updateMCQ overwrites wrongIds', () => {
    const { result } = renderHook(() => useTopicProgress('05-irpcs-colregs'))
    act(() => result.current.updateMCQ({ bestScore: 8, totalQuestions: 12, wrongIds: ['q-1'] }))
    act(() => result.current.updateMCQ({ bestScore: 9, totalQuestions: 12, wrongIds: ['q-2'] }))
    expect(result.current.progress.mcq.wrongIds).toEqual(['q-2'])
    expect(result.current.progress.mcq.bestScore).toBe(9)
  })

  it('updateMCQ does not regress bestScore', () => {
    const { result } = renderHook(() => useTopicProgress('05-irpcs-colregs'))
    act(() => result.current.updateMCQ({ bestScore: 10, totalQuestions: 12, wrongIds: [] }))
    act(() => result.current.updateMCQ({ bestScore: 6, totalQuestions: 12, wrongIds: ['q-1'] }))
    expect(result.current.progress.mcq.bestScore).toBe(10)
  })

  it('update() does not clobber existing nested state', () => {
    const { result } = renderHook(() => useTopicProgress('topic-1'))
    act(() => result.current.updateFlashcards({ masteredIds: ['fc-1'], totalCards: 2 }))
    act(() => result.current.update({ factsRead: true, factsAccepted: true }))
    expect(result.current.progress.flashcards.masteredIds).toEqual(['fc-1'])
    expect(result.current.progress.factsAccepted).toBe(true)
  })
})
