import { useState, useCallback, useMemo } from 'react'
import type { Flashcard } from '../types'

export function useFlashcardSession(
  _topicId: string,
  allCards: Flashcard[],
  cardIds?: string[]
) {
  const initialDeck = useMemo(() => {
    if (cardIds && cardIds.length > 0) {
      return allCards.filter(c => cardIds.includes(c.id))
    }
    return allCards
  }, [allCards, cardIds])

  const [deck, setDeck] = useState<Flashcard[]>(initialDeck)
  const [masteredIds, setMasteredIds] = useState<string[]>([])
  const [isFlipped, setIsFlipped] = useState(false)

  const currentCard = deck[0] ?? null
  const isComplete = deck.length === 0
  const progress = initialDeck.length === 0 ? 0 : masteredIds.length / initialDeck.length
  const score = masteredIds.length

  const flip = useCallback(() => setIsFlipped(f => !f), [])

  const markGotIt = useCallback(() => {
    if (!currentCard) return
    setMasteredIds(prev => [...prev, currentCard.id])
    setDeck(prev => prev.slice(1))
    setIsFlipped(false)
  }, [currentCard])

  const markAgain = useCallback(() => {
    setDeck(prev => [...prev.slice(1), prev[0]])
    setIsFlipped(false)
  }, [])

  return { currentCard, isFlipped, flip, markGotIt, markAgain, progress, isComplete, score, masteredIds }
}
