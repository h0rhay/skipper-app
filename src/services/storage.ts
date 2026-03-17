const PREFIX = 'skipper:'

type StorageKey = 'progress' | 'sessions' | 'theme'

export const storage = {
  get<T>(key: StorageKey, fallback?: T): T | null {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      if (raw === null) return fallback ?? null
      return JSON.parse(raw) as T
    } catch {
      return fallback ?? null
    }
  },
  set<T>(key: StorageKey, value: T): void {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
      // QuotaExceededError or private browsing — fail silently
    }
  },
}
