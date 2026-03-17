import { useMemo } from 'react'
import { storage } from '../services/storage'
import topicsData from '../data/topics.json'
import type { TopicCompletionStatus, UserProgress, TopicProgress } from '../types'

function isTopicComplete(tp: TopicProgress): boolean {
  return (
    tp.factsRead &&
    tp.flashcards.masteredIds.length >= tp.flashcards.totalCards &&
    tp.flashcards.totalCards > 0 &&
    tp.mcq.totalQuestions > 0 &&
    (tp.mcq.bestScore / tp.mcq.totalQuestions) >= 0.7
  )
}

function isTopicPartial(tp: TopicProgress): boolean {
  return (
    tp.factsRead ||
    tp.flashcards.masteredIds.length > 0 ||
    tp.mcq.bestScore > 0
  )
}

export function useOverallProgress() {
  const userProgress = useMemo(() => {
    return storage.get<UserProgress>('progress', { userId: 'local', topics: {} })
      ?? { userId: 'local', topics: {} }
  }, [])

  const topicStatuses = useMemo(() => {
    const statuses: Record<string, TopicCompletionStatus> = {}
    for (const topic of topicsData) {
      const tp = userProgress.topics[topic.id]
      if (!tp) {
        statuses[topic.id] = 'none'
      } else if (isTopicComplete(tp)) {
        statuses[topic.id] = 'complete'
      } else if (isTopicPartial(tp)) {
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

  return { topicStatuses, percentComplete }
}
