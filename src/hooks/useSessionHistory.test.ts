import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSessionHistory } from './useSessionHistory'
import type { Session } from '../types'

describe('useSessionHistory', () => {
  beforeEach(() => localStorage.clear())

  it('returns empty array initially', () => {
    const { result } = renderHook(() => useSessionHistory())
    expect(result.current.sessions).toEqual([])
  })

  it('appends a session', () => {
    const { result } = renderHook(() => useSessionHistory())
    const session: Session = {
      id: 'sess-1', topicId: '05-irpcs-colregs', mode: 'mcq', toolId: null,
      startedAt: '2026-01-01T00:00:00Z', completedAt: '2026-01-01T00:10:00Z',
      score: 8, total: 12, wrongIds: ['q-1'],
    }
    act(() => result.current.appendSession(session))
    expect(result.current.sessions).toHaveLength(1)
    expect(result.current.sessions[0].id).toBe('sess-1')
  })
})
