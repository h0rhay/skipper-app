import { describe, it, expect } from 'vitest'
import { deriveTier } from './useTopicMastery'
import type { TopicProgress } from '../types'

const base: TopicProgress = {
  factsRead: false,
  factsAccepted: false,
  flashcards: { masteredIds: [], totalCards: 0, lastStudied: '', accepted: false },
  mcq: { bestScore: 0, totalQuestions: 10, wrongIds: [], lastStudied: '', accepted: false },
  navTools: {},
}

describe('deriveTier', () => {
  it('returns none when nothing accepted', () => {
    expect(deriveTier(base)).toBe('none')
    expect(deriveTier(null)).toBe('none')
    expect(deriveTier(undefined)).toBe('none')
  })

  it('returns seen when only facts accepted', () => {
    expect(deriveTier({ ...base, factsAccepted: true })).toBe('seen')
  })

  it('returns practised when facts + flashcards accepted', () => {
    expect(deriveTier({ ...base, factsAccepted: true, flashcards: { ...base.flashcards, accepted: true } })).toBe('practised')
  })

  it('returns passed when all accepted and score >= 70%', () => {
    const tp = { ...base, factsAccepted: true, flashcards: { ...base.flashcards, accepted: true }, mcq: { ...base.mcq, accepted: true, bestScore: 7, totalQuestions: 10 } }
    expect(deriveTier(tp)).toBe('passed')
  })

  it('returns mastered when all accepted and score === 100%', () => {
    const tp = { ...base, factsAccepted: true, flashcards: { ...base.flashcards, accepted: true }, mcq: { ...base.mcq, accepted: true, bestScore: 10, totalQuestions: 10 } }
    expect(deriveTier(tp)).toBe('mastered')
  })

  it('does NOT reach passed if score < 70% even when accepted', () => {
    const tp = { ...base, factsAccepted: true, flashcards: { ...base.flashcards, accepted: true }, mcq: { ...base.mcq, accepted: true, bestScore: 6, totalQuestions: 10 } }
    expect(deriveTier(tp)).toBe('practised')
  })

  it('does NOT reach seen if flashcards skipped to MCQ', () => {
    // mcq accepted but flashcards not accepted → still 'seen'
    const tp = { ...base, factsAccepted: true, mcq: { ...base.mcq, accepted: true, bestScore: 10, totalQuestions: 10 } }
    expect(deriveTier(tp)).toBe('seen')
  })
})
