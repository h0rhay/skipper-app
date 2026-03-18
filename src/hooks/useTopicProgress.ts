import { useState, useCallback } from 'react'
import { storage } from '../services/storage'
import type { TopicProgress, UserProgress } from '../types'

const DEFAULT_TOPIC_PROGRESS: TopicProgress = {
  factsRead: false,
  factsAccepted: false,
  flashcards: { masteredIds: [], totalCards: 0, lastStudied: '', accepted: false },
  mcq: { bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '', accepted: false },
  navTools: {},
}

const DEFAULT_USER_PROGRESS: UserProgress = {
  userId: 'local', topics: {}, currentStreak: 0, lastStudiedDate: '', longestStreak: 0,
}

function loadProgress(): UserProgress {
  return storage.get<UserProgress>('progress', DEFAULT_USER_PROGRESS) ?? DEFAULT_USER_PROGRESS
}

export function useTopicProgress(topicId: string) {
  const [userProgress, setUserProgress] = useState<UserProgress>(loadProgress)

  const progress: TopicProgress = userProgress.topics[topicId] ?? DEFAULT_TOPIC_PROGRESS

  const update = useCallback((patch: Partial<TopicProgress>) => {
    setUserProgress(prev => {
      const current = prev.topics[topicId] ?? DEFAULT_TOPIC_PROGRESS
      const next: UserProgress = {
        ...prev,
        topics: { ...prev.topics, [topicId]: { ...current, ...patch } },
      }
      storage.set('progress', next)
      return next
    })
  }, [topicId])

  const updateFlashcards = useCallback((data: { masteredIds: string[]; totalCards: number }) => {
    const current = userProgress.topics[topicId] ?? DEFAULT_TOPIC_PROGRESS
    update({ flashcards: { ...current.flashcards, ...data, lastStudied: new Date().toISOString() } })
  }, [update, userProgress, topicId])

  const updateMCQ = useCallback((data: { bestScore: number; totalQuestions: number; wrongIds: string[] }) => {
    const current = userProgress.topics[topicId] ?? DEFAULT_TOPIC_PROGRESS
    update({
      mcq: {
        ...current.mcq,
        bestScore: Math.max(current.mcq.bestScore, data.bestScore),
        totalQuestions: data.totalQuestions,
        wrongIds: data.wrongIds,
        lastStudied: new Date().toISOString(),
      },
    })
  }, [update, userProgress, topicId])

  return { progress, update, updateFlashcards, updateMCQ }
}
