import { renderHook, act } from '@testing-library/react'
import { useFlashcardSession } from './useFlashcardSession'
import type { Flashcard } from '../types'

const CARDS: Flashcard[] = [
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

  it('next() advances to next card and resets flip', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS))
    act(() => result.current.next())
    expect(result.current.currentCard).toEqual(CARDS[1])
    expect(result.current.isFlipped).toBe(false)
  })

  it('prev() goes back to previous card', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS))
    act(() => result.current.next())
    act(() => result.current.prev())
    expect(result.current.currentCard).toEqual(CARDS[0])
  })

  it('prev() does not go below index 0', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS))
    act(() => result.current.prev())
    expect(result.current.index).toBe(0)
  })

  it('isComplete when advanced past last card', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS))
    act(() => result.current.next())
    act(() => result.current.next())
    act(() => result.current.next())
    expect(result.current.isComplete).toBe(true)
  })

  it('progress reflects fraction of deck seen', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS))
    act(() => result.current.next())
    expect(result.current.progress).toBeCloseTo(1/3)
  })

  it('accepts optional cardIds to filter deck', () => {
    const { result } = renderHook(() => useFlashcardSession('topic-1', CARDS, ['fc-2']))
    expect(result.current.currentCard).toEqual(CARDS[1])
  })
})
