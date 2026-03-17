import { useState, useCallback } from 'react'
import { storage } from '../services/storage'
import type { Session } from '../types'

export function useSessionHistory() {
  const [sessions, setSessions] = useState<Session[]>(
    () => storage.get<Session[]>('sessions', []) ?? []
  )

  const appendSession = useCallback((session: Session) => {
    setSessions(prev => {
      const next = [...prev, session]
      storage.set('sessions', next)
      return next
    })
  }, [])

  return { sessions, appendSession }
}
