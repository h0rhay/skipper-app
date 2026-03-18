import { useTopicProgress } from './useTopicProgress'
import type { MasteryTier, TopicProgress } from '../types'

const TIER_WEIGHT: Record<MasteryTier, number> = {
  none: 0,
  seen: 0.25,
  practised: 0.5,
  passed: 0.75,
  mastered: 1.0,
}

export function deriveTier(tp: TopicProgress | null | undefined): MasteryTier {
  if (!tp?.factsAccepted) return 'none'
  if (!tp.flashcards.accepted) return 'seen'
  const mcqPassed =
    tp.mcq.accepted &&
    tp.mcq.totalQuestions > 0 &&
    tp.mcq.bestScore / tp.mcq.totalQuestions >= 0.7
  if (!mcqPassed) return 'practised'
  if (tp.mcq.bestScore === tp.mcq.totalQuestions) return 'mastered'
  return 'passed'
}

export function useTopicMastery(topicId: string) {
  const { progress, markFactsRead, updateFlashcards, updateMCQ, markFactsAccepted, acceptFlashcards, acceptMCQ } = useTopicProgress(topicId)
  const tier = deriveTier(progress)
  const weight = TIER_WEIGHT[tier]

  const acceptFacts: () => void = markFactsAccepted

  return { tier, weight, acceptFacts, acceptFlashcards, acceptMCQ, updateFlashcards, updateMCQ, markFactsRead }
}
