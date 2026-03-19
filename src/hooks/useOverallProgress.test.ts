import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useOverallProgress } from './useOverallProgress'
import { useWeakTopics } from './useWeakTopics'
import { storage } from '../services/storage'

describe('useOverallProgress', () => {
  beforeEach(() => localStorage.clear())

  it('returns 0 percentComplete with no progress', () => {
    const { result } = renderHook(() => useOverallProgress())
    expect(result.current.percentComplete).toBe(0)
  })

  it('marks topic as complete when all three modes done', () => {
    storage.set('progress', {
      userId: 'local',
      topics: {
        '05-irpcs-colregs': {
          factsRead: true,
          factsAccepted: true,
          factsReadAt: '2026-03-17T00:00:00Z',
          flashcards: { masteredIds: ['fc-1', 'fc-2', 'fc-3'], totalCards: 3, accepted: true, lastStudied: '2026-03-17T00:00:00Z' },
          mcq: { bestScore: 9, totalQuestions: 12, accepted: true, wrongIds: [], lastStudied: '2026-03-17T00:00:00Z' },
          navTools: {}
        }
      }
    })
    const { result } = renderHook(() => useOverallProgress())
    expect(result.current.topicStatuses['05-irpcs-colregs']).toBe('complete')
  })
})

describe('useWeakTopics', () => {
  beforeEach(() => localStorage.clear())

  it('returns empty array when no topics attempted', () => {
    const { result } = renderHook(() => useWeakTopics())
    expect(result.current.weakTopics).toEqual([])
  })

  it('returns topics where mcq bestScore / totalQuestions < 0.7', () => {
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

  it('does not return topics above 70%', () => {
    storage.set('progress', {
      userId: 'local',
      topics: {
        '05-irpcs-colregs': {
          factsRead: false,
          flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' },
          mcq: { bestScore: 10, totalQuestions: 12, wrongIds: [], lastStudied: '2026-03-17T00:00:00Z' },
          navTools: {}
        }
      }
    })
    const { result } = renderHook(() => useWeakTopics())
    expect(result.current.weakTopics.some(t => t.id === '05-irpcs-colregs')).toBe(false)
  })
})
