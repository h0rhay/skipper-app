import { renderHook, act } from '@testing-library/react'
import { useMCQSession } from './useMCQSession'
import type { MCQQuestion } from '../types'

const QUESTIONS: MCQQuestion[] = [
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
