import { describe, it, expect, beforeEach, vi } from 'vitest'
import { storage } from './storage'

describe('storage', () => {
  beforeEach(() => localStorage.clear())

  it('returns null for missing key', () => {
    expect(storage.get('progress')).toBeNull()
  })

  it('round-trips JSON', () => {
    storage.set('progress', { userId: 'local' })
    expect(storage.get('progress')).toEqual({ userId: 'local' })
  })

  it('returns fallback if value is corrupt JSON', () => {
    localStorage.setItem('skipper:progress', 'not-json')
    expect(storage.get('progress', { userId: 'local', topics: {} }))
      .toEqual({ userId: 'local', topics: {} })
  })

  it('does not throw if localStorage is full', () => {
    const originalSetItem = localStorage.setItem.bind(localStorage)
    vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
      throw new DOMException('QuotaExceededError')
    })
    expect(() => storage.set('progress', { userId: 'local' })).not.toThrow()
    localStorage.setItem = originalSetItem
  })
})
