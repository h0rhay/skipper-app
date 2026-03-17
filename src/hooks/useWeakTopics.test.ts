import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useWeakTopics } from './useWeakTopics'
import { storage } from '../services/storage'

describe('useWeakTopics', () => {
  beforeEach(() => localStorage.clear())

  it('returns empty array when no progress', () => {
    const { result } = renderHook(() => useWeakTopics())
    expect(result.current.weakTopics).toHaveLength(0)
  })

  it('includes a topic when MCQ bestScore < 70% of totalQuestions', () => {
    storage.set('progress', {
      userId: 'local',
      topics: {
        '05-irpcs-colregs': {
          factsRead: false,
          flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' },
          mcq: { bestScore: 3, totalQuestions: 12, wrongIds: [], lastStudied: '2026-03-17T00:00:00Z' },
          navTools: {}
        }
      }
    })
    const { result } = renderHook(() => useWeakTopics())
    expect(result.current.weakTopics.some(t => t.id === '05-irpcs-colregs')).toBe(true)
  })

  it('excludes a topic when MCQ bestScore >= 70% of totalQuestions', () => {
    storage.set('progress', {
      userId: 'local',
      topics: {
        '05-irpcs-colregs': {
          factsRead: false,
          flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' },
          mcq: { bestScore: 9, totalQuestions: 12, wrongIds: [], lastStudied: '2026-03-17T00:00:00Z' },
          navTools: {}
        }
      }
    })
    const { result } = renderHook(() => useWeakTopics())
    expect(result.current.weakTopics.some(t => t.id === '05-irpcs-colregs')).toBe(false)
  })

  it('excludes topics with no MCQ sessions (totalQuestions === 0)', () => {
    storage.set('progress', {
      userId: 'local',
      topics: {
        '05-irpcs-colregs': {
          factsRead: false,
          flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' },
          mcq: { bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '' },
          navTools: {}
        }
      }
    })
    const { result } = renderHook(() => useWeakTopics())
    expect(result.current.weakTopics).toHaveLength(0)
  })
})
