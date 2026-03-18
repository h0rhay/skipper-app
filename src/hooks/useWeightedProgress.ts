import { useMemo, useState } from 'react'
import { storage } from '../services/storage'
import topicsData from '../data/topics.json'
import { deriveTier } from './useTopicMastery'
import type { MasteryTier, UserProgress } from '../types'

const TIER_WEIGHT: Record<MasteryTier, number> = {
  none: 0, seen: 0.25, practised: 0.5, passed: 0.75, mastered: 1.0,
}

const DEFAULT_PROGRESS: UserProgress = { userId: 'local', topics: {}, currentStreak: 0, lastStudiedDate: '', longestStreak: 0 }

export function useWeightedProgress() {
  const [userProgress] = useState<UserProgress>(
    () => storage.get<UserProgress>('progress', DEFAULT_PROGRESS) ?? DEFAULT_PROGRESS
  )

  const topicTiers = useMemo(() => {
    const tiers: Record<string, MasteryTier> = {}
    for (const topic of topicsData) {
      tiers[topic.id] = deriveTier(userProgress.topics[topic.id])
    }
    return tiers
  }, [userProgress])

  const percentComplete = useMemo(() => {
    const total = topicsData.length
    if (total === 0) return 0
    const sum = Object.values(topicTiers).reduce((acc, tier) => acc + TIER_WEIGHT[tier], 0)
    return Math.round((sum / total) * 100)
  }, [topicTiers])

  return { percentComplete, topicTiers }
}
