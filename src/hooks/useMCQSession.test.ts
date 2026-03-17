import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMCQSession } from './useMCQSession'
import type { MCQQuestion } from '../types'

const QUESTIONS: MCQQuestion[] = [
  { id: 'q-0', question: 'Q1?', options: ['A', 'B', 'C', 'D'], correctIndex: 0, explanation: 'A is correct' },
  { id: 'q-1', question: 'Q2?', options: ['A', 'B', 'C', 'D'], correctIndex: 2, explanation: 'C is correct' },
  { id: 'q-2', question: 'Q3?', options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'B is correct' },
]

describe('useMCQSession', () => {
  beforeEach(() => localStorage.clear())

  it('starts at question 0 with no answer selected', () => {
    const { result } = renderHook(() => useMCQSession('test-topic', QUESTIONS))
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.selectedIndex).toBeNull()
    expect(result.current.currentQuestion).toEqual(QUESTIONS[0])
  })

  it('selectAnswer sets selectedIndex', () => {
    const { result } = renderHook(() => useMCQSession('test-topic', QUESTIONS))
    act(() => result.current.selectAnswer(2))
    expect(result.current.selectedIndex).toBe(2)
  })

  it('confirmAnswer with correct answer increments score', () => {
    const { result } = renderHook(() => useMCQSession('test-topic', QUESTIONS))
    act(() => result.current.selectAnswer(0))
    act(() => result.current.confirmAnswer())
    expect(result.current.isAnswered).toBe(true)
    expect(result.current.isCorrect).toBe(true)
    expect(result.current.score).toBe(1)
  })

  it('confirmAnswer with wrong answer adds to wrongIds', () => {
    const { result } = renderHook(() => useMCQSession('test-topic', QUESTIONS))
    act(() => result.current.selectAnswer(3))
    act(() => result.current.confirmAnswer())
    expect(result.current.isCorrect).toBe(false)
    expect(result.current.wrongIds).toEqual(['q-0'])
    expect(result.current.score).toBe(0)
  })

  it('nextQuestion advances to next question', () => {
    const { result } = renderHook(() => useMCQSession('test-topic', QUESTIONS))
    act(() => result.current.selectAnswer(0))
    act(() => result.current.confirmAnswer())
    act(() => result.current.nextQuestion())
    expect(result.current.currentIndex).toBe(1)
    expect(result.current.selectedIndex).toBeNull()
    expect(result.current.isAnswered).toBe(false)
  })

  it('isComplete is true after all questions answered', () => {
    const { result } = renderHook(() => useMCQSession('test-topic', QUESTIONS))

    // Q1 - correct
    act(() => result.current.selectAnswer(0))
    act(() => result.current.confirmAnswer())
    act(() => result.current.nextQuestion())

    // Q2 - wrong
    act(() => result.current.selectAnswer(0))
    act(() => result.current.confirmAnswer())
    act(() => result.current.nextQuestion())

    // Q3 - correct
    act(() => result.current.selectAnswer(1))
    act(() => result.current.confirmAnswer())
    act(() => result.current.nextQuestion())

    expect(result.current.isComplete).toBe(true)
    expect(result.current.score).toBe(2)
    expect(result.current.wrongIds).toEqual(['q-1'])
  })
})
