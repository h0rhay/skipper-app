import topicsData from "../data/topics.json"
import type { Topic } from "../types"

export function useTopics() {
  return { topics: topicsData as unknown as Topic[] }
}
