import { useState, useCallback } from 'react'
import { storage } from '../services/storage'
import type { UserProgress } from '../types'

interface StreakFields {
  currentStreak: number
  lastStudiedDate: string
  longestStreak: number
}

const DEFAULT_PROGRESS: UserProgress = {
  userId: 'local',
  topics: {},
  currentStreak: 0,
  lastStudiedDate: '',
  longestStreak: 0,
}

function loadStreak(): StreakFields {
  const p = storage.get<UserProgress>('progress', DEFAULT_PROGRESS) ?? DEFAULT_PROGRESS
  return {
    currentStreak: p.currentStreak ?? 0,
    lastStudiedDate: p.lastStudiedDate ?? '',
    longestStreak: p.longestStreak ?? 0,
  }
}

export function computeStreak(current: StreakFields, today: string): StreakFields {
  if (current.lastStudiedDate === today) return current

  const last = current.lastStudiedDate ? new Date(current.lastStudiedDate + 'T00:00:00Z') : null
  const todayDate = new Date(today + 'T00:00:00Z')
  const diffDays = last ? Math.round((todayDate.getTime() - last.getTime()) / 86_400_000) : null

  const newStreak = diffDays === 1 ? current.currentStreak + 1 : 1
  const newLongest = Math.max(newStreak, current.longestStreak)

  return { currentStreak: newStreak, lastStudiedDate: today, longestStreak: newLongest }
}

export function useStudyStreak() {
  const [streak, setStreak] = useState<StreakFields>(loadStreak)

  const recordStudyDay = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10)
    setStreak(prev => {
      const next = computeStreak(prev, today)
      if (next === prev) return prev
      // Persist streak fields into existing progress blob
      const progress = storage.get<UserProgress>('progress', DEFAULT_PROGRESS) ?? DEFAULT_PROGRESS
      storage.set('progress', { ...progress, ...next })
      return next
    })
  }, [])

  return { currentStreak: streak.currentStreak, longestStreak: streak.longestStreak, recordStudyDay }
}
