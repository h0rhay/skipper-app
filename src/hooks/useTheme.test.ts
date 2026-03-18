import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'
import { storage } from '../services/storage'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to light mode', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('restores persisted dark preference', () => {
    storage.set('theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('toggle switches theme and persists it', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggle())
    expect(result.current.theme).toBe('dark')
    expect(storage.get('theme')).toBe('dark')
  })

  it('sets data-theme on documentElement', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggle())
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
