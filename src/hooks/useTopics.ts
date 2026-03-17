import { useMemo } from 'react'
import topicsData from '../data/topics.json'
import type { Topic } from '../types'

export function useTopics() {
  const topics = useMemo(() => topicsData as unknown as Topic[], [])
  return { topics, isLoading: false, error: null }
}
