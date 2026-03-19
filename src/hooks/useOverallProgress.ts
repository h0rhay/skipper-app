import { useMemo, useState } from 'react'
import { storage } from '../services/storage'
import topicsData from '../data/topics.json'
import { deriveTier } from './useTopicMastery'
import type { TopicCompletionStatus, UserProgress } from '../types'

const DEFAULT_USER_PROGRESS: UserProgress = {
  userId: 'local',
  topics: {},
  currentStreak: 0,
  lastStudiedDate: '',
  longestStreak: 0,
}

export function useOverallProgress() {
  const [userProgress] = useState<UserProgress>(
    () => storage.get<UserProgress>('progress', DEFAULT_USER_PROGRESS) ?? DEFAULT_USER_PROGRESS
  )

  const topicStatuses = useMemo(() => {
    const statuses: Record<string, TopicCompletionStatus> = {}
    for (const topic of topicsData) {
      const tp = userProgress.topics[topic.id]
      const tier = tp ? deriveTier(tp) : 'none'
      if (tier === 'passed' || tier === 'mastered') {
        statuses[topic.id] = 'complete'
      } else if (tier !== 'none') {
        statuses[topic.id] = 'partial'
      } else {
        statuses[topic.id] = 'none'
      }
    }
    return statuses
  }, [userProgress])

  const percentComplete = useMemo(() => {
    const total = topicsData.length
    if (total === 0) return 0
    const complete = Object.values(topicStatuses).filter(s => s === 'complete').length
    return Math.round((complete / total) * 100)
  }, [topicStatuses])

  const topicStepPercents = useMemo(() => {
    const out: Record<string, number> = {}
    for (const topic of topicsData) {
      const tp = userProgress.topics[topic.id]
      if (!tp) { out[topic.id] = 0; continue }
      const done = [tp.factsAccepted, tp.flashcards.accepted, tp.mcq.accepted].filter(Boolean).length
      out[topic.id] = Math.round((done / 3) * 100)
    }
    return out
  }, [userProgress])

  return { topicStatuses, percentComplete, topicStepPercents }
}
