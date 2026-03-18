import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTopics } from './useTopics'

describe('useTopics', () => {
  it('returns all topics', () => {
    const { result } = renderHook(() => useTopics())
    expect(result.current.topics.length).toBe(17)
  })

  it('returns a topic by id', () => {
    const { result } = renderHook(() => useTopics())
    const topic = result.current.topics.find(t => t.id === '01-nautical-terms')
    expect(topic).toBeDefined()
    expect(topic?.isSafetyCritical).toBeDefined()
  })
})
