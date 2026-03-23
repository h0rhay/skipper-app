import { describe, it, expect } from 'vitest'

// We test the pure streak logic separately from React
import { computeStreak } from './useStudyStreak'

describe('computeStreak', () => {
  const today = '2026-03-18'

  it('starts streak at 1 when lastStudiedDate is empty', () => {
    expect(computeStreak({ currentStreak: 0, lastStudiedDate: '', longestStreak: 0 }, today))
      .toEqual({ currentStreak: 1, lastStudiedDate: today, longestStreak: 1 })
  })

  it('increments streak for consecutive day', () => {
    expect(computeStreak({ currentStreak: 3, lastStudiedDate: '2026-03-17', longestStreak: 3 }, today))
      .toEqual({ currentStreak: 4, lastStudiedDate: today, longestStreak: 4 })
  })

  it('is idempotent when already studied today', () => {
    expect(computeStreak({ currentStreak: 3, lastStudiedDate: today, longestStreak: 5 }, today))
      .toEqual({ currentStreak: 3, lastStudiedDate: today, longestStreak: 5 })
  })

  it('resets streak to 1 on a gap > 1 day', () => {
    expect(computeStreak({ currentStreak: 10, lastStudiedDate: '2026-03-15', longestStreak: 10 }, today))
      .toEqual({ currentStreak: 1, lastStudiedDate: today, longestStreak: 10 })
  })

  it('does not update longestStreak if current is lower', () => {
    expect(computeStreak({ currentStreak: 1, lastStudiedDate: '2026-03-17', longestStreak: 20 }, today))
      .toEqual({ currentStreak: 2, lastStudiedDate: today, longestStreak: 20 })
  })
})
