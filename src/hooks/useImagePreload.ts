import { useCallback } from 'react'

// Imperatively prefetches one or more images into the browser cache.
// Pass null/undefined values freely — they are silently ignored.
// Usage: const preload = useImagePreload()
//        preload([getHeroPath(id), getHeroPlaceholder(id)])
export function useImagePreload() {
  return useCallback((urls: (string | null | undefined)[]) => {
    for (const url of urls) {
      if (!url) continue
      const img = new Image()
      img.src = url
    }
  }, [])
}
