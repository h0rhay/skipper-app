import { useState, useCallback, useMemo } from 'react'
import type { Flashcard } from '../types'

export function useFlashcardSession(cards: Flashcard[]) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [masteredIds, setMasteredIds] = useState<string[]>([])

  const currentCard = useMemo(
    () => (currentIndex < cards.length ? cards[currentIndex] : null),
    [cards, currentIndex]
  )

  const isComplete = currentIndex >= cards.length

  const flip = useCallback(() => {
    setIsFlipped(prev => !prev)
  }, [])

  const advance = useCallback(() => {
    setCurrentIndex(prev => prev + 1)
    setIsFlipped(false)
  }, [])

  const markMastered = useCallback(() => {
    if (currentCard) {
      setMasteredIds(prev => [...prev, currentCard.id])
    }
    advance()
  }, [currentCard, advance])

  const markNotMastered = useCallback(() => {
    advance()
  }, [advance])

  return {
    currentIndex,
    currentCard,
    isFlipped,
    isComplete,
    masteredIds,
    totalCards: cards.length,
    flip,
    markMastered,
    markNotMastered,
  }
}
