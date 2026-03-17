import { useState, useCallback } from 'react'
import { storage } from '../services/storage'
import type { TopicProgress, UserProgress } from '../types'

const DEFAULT_TOPIC_PROGRESS: TopicProgress = {
  factsRead: false,
  flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' },
  mcq: { bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '' },
  navTools: {},
}

function loadProgress(): UserProgress {
  return storage.get<UserProgress>('progress', { userId: 'local', topics: {} })
    ?? { userId: 'local', topics: {} }
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

  const markFactsRead = useCallback(() => {
    update({ factsRead: true, factsReadAt: new Date().toISOString() })
  }, [update])

  const updateFlashcards = useCallback((data: { masteredIds: string[]; totalCards: number }) => {
    update({
      flashcards: { ...data, lastStudied: new Date().toISOString() },
    })
  }, [update])

  const updateMCQ = useCallback((data: { bestScore: number; totalQuestions: number; wrongIds: string[] }) => {
    update({
      mcq: { ...data, lastStudied: new Date().toISOString() },
    })
  }, [update])

  return { progress, markFactsRead, updateFlashcards, updateMCQ }
}
