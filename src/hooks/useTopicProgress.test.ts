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

  it('updateMCQ does not regress bestScore', () => {
    const { result } = renderHook(() => useTopicProgress('05-irpcs-colregs'))
    act(() => result.current.updateMCQ({ bestScore: 10, totalQuestions: 12, wrongIds: [] }))
    act(() => result.current.updateMCQ({ bestScore: 6, totalQuestions: 12, wrongIds: ['q-1'] }))
    expect(result.current.progress.mcq.bestScore).toBe(10)
  })
})

describe('accept methods', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('markFactsAccepted sets factsAccepted without clobbering flashcard data', () => {
    const { result } = renderHook(() => useTopicProgress('topic-accept-1'))
    // First set up some flashcard data
    act(() => {
      result.current.updateFlashcards({ masteredIds: ['fc-1', 'fc-2'], totalCards: 2, lastStudied: '2026-03-18' })
    })
    // Now accept facts
    act(() => {
      result.current.markFactsAccepted()
    })
    expect(result.current.progress?.factsAccepted).toBe(true)
    expect(result.current.progress?.flashcards.masteredIds).toEqual(['fc-1', 'fc-2'])
  })

  it('acceptFlashcards sets flashcards.accepted without clobbering masteredIds', () => {
    const { result } = renderHook(() => useTopicProgress('topic-accept-2'))
    act(() => {
      result.current.updateFlashcards({ masteredIds: ['fc-1', 'fc-2'], totalCards: 2, lastStudied: '2026-03-18' })
    })
    act(() => {
      result.current.acceptFlashcards()
    })
    expect(result.current.progress?.flashcards.accepted).toBe(true)
    expect(result.current.progress?.flashcards.masteredIds).toEqual(['fc-1', 'fc-2'])
    expect(result.current.progress?.flashcards.totalCards).toBe(2)
  })

  it('acceptMCQ sets mcq.accepted without clobbering bestScore or wrongIds', () => {
    const { result } = renderHook(() => useTopicProgress('topic-accept-3'))
    act(() => {
      result.current.updateMCQ({ bestScore: 8, totalQuestions: 10, wrongIds: ['q3'], lastStudied: '2026-03-18' })
    })
    act(() => {
      result.current.acceptMCQ()
    })
    expect(result.current.progress?.mcq.accepted).toBe(true)
    expect(result.current.progress?.mcq.bestScore).toBe(8)
    expect(result.current.progress?.mcq.wrongIds).toEqual(['q3'])
  })
})
