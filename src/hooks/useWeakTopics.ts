import { useMemo, useState } from 'react'
import { storage } from '../services/storage'
import topicsData from '../data/topics.json'
import type { UserProgress, Topic } from '../types'

export function useWeakTopics() {
  const [userProgress] = useState<UserProgress>(
    () => storage.get<UserProgress>('progress', { userId: 'local', topics: {} }) ?? { userId: 'local', topics: {} }
  )

  const weakTopics = useMemo(() => {
    const weak: Array<{ id: string; title: string; number: number; isSafetyCritical: boolean; score: number; total: number }> = []

    for (const topic of topicsData as unknown as Topic[]) {
      const tp = userProgress.topics[topic.id]
      if (!tp) continue
      if (tp.mcq.totalQuestions === 0) continue
      if (tp.mcq.lastStudied === '') continue

      const ratio = tp.mcq.bestScore / tp.mcq.totalQuestions
      if (ratio < 0.7) {
        weak.push({
          id: topic.id,
          title: topic.title,
          number: topic.number,
          isSafetyCritical: topic.isSafetyCritical,
          score: tp.mcq.bestScore,
          total: tp.mcq.totalQuestions,
        })
      }
    }

    return weak
  }, [userProgress])

  return { weakTopics }
}
