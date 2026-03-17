import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFlashcardSession } from './useFlashcardSession'
import type { Flashcard } from '../types'

const CARDS: Flashcard[] = [
  { id: 'fc-0', front: 'Q1', back: 'A1' },
  { id: 'fc-1', front: 'Q2', back: 'A2' },
  { id: 'fc-2', front: 'Q3', back: 'A3' },
]

describe('useFlashcardSession', () => {
  beforeEach(() => localStorage.clear())

  it('starts at index 0 with flipped false', () => {
    const { result } = renderHook(() => useFlashcardSession(CARDS))
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.isFlipped).toBe(false)
    expect(result.current.currentCard).toEqual(CARDS[0])
  })

  it('flip toggles isFlipped', () => {
    const { result } = renderHook(() => useFlashcardSession(CARDS))
    act(() => result.current.flip())
    expect(result.current.isFlipped).toBe(true)
    act(() => result.current.flip())
    expect(result.current.isFlipped).toBe(false)
  })

  it('markMastered advances to next card', () => {
    const { result } = renderHook(() => useFlashcardSession(CARDS))
    act(() => result.current.markMastered())
    expect(result.current.currentIndex).toBe(1)
    expect(result.current.masteredIds).toEqual(['fc-0'])
  })

  it('markNotMastered advances without adding to mastered', () => {
    const { result } = renderHook(() => useFlashcardSession(CARDS))
    act(() => result.current.markNotMastered())
    expect(result.current.currentIndex).toBe(1)
    expect(result.current.masteredIds).toEqual([])
  })

  it('isComplete is true after all cards reviewed', () => {
    const { result } = renderHook(() => useFlashcardSession(CARDS))
    act(() => result.current.markMastered())
    act(() => result.current.markMastered())
    act(() => result.current.markMastered())
    expect(result.current.isComplete).toBe(true)
    expect(result.current.masteredIds).toEqual(['fc-0', 'fc-1', 'fc-2'])
  })

  it('resets flipped state on advance', () => {
    const { result } = renderHook(() => useFlashcardSession(CARDS))
    act(() => result.current.flip())
    expect(result.current.isFlipped).toBe(true)
    act(() => result.current.markMastered())
    expect(result.current.isFlipped).toBe(false)
  })
})
