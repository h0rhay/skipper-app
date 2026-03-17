import { useState, useEffect, useCallback } from 'react'
import { storage } from '../services/storage'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (storage.get<Theme>('theme')) ?? 'light'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    storage.set('theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }, [])

  return { theme, toggle }
}
