import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLastSession } from './useLastSession'
import { useSessionHistory } from './useSessionHistory'
import type { Session } from '../types'

describe('useLastSession', () => {
  beforeEach(() => localStorage.clear())

  it('returns null with no sessions', () => {
    const { result } = renderHook(() => useLastSession())
    expect(result.current.session).toBeNull()
  })

  it('returns the most recent session when sessions exist', () => {
    const session1: Session = {
      id: 'sess-1', topicId: '01-nautical-terms', mode: 'flashcards', toolId: null,
      startedAt: '2026-01-01T00:00:00Z', completedAt: '2026-01-01T00:05:00Z',
      score: 5, total: 10, wrongIds: [],
    }
    const session2: Session = {
      id: 'sess-2', topicId: '05-irpcs-colregs', mode: 'mcq', toolId: null,
      startedAt: '2026-01-01T00:10:00Z', completedAt: '2026-01-01T00:20:00Z',
      score: 8, total: 12, wrongIds: ['q-1'],
    }

    // Seed sessions via useSessionHistory
    const { result: histResult } = renderHook(() => useSessionHistory())
    act(() => histResult.current.appendSession(session1))
    act(() => histResult.current.appendSession(session2))

    const { result } = renderHook(() => useLastSession())
    expect(result.current.session).not.toBeNull()
    expect(result.current.session?.id).toBe('sess-2')
  })
})
