import { useState } from 'react'
import type { Flashcard } from '../types'

export function useFlashcardSession(_topicId: string, allCards: Flashcard[], cardIds?: string[]) {
  const cards = cardIds?.length
    ? allCards.filter(c => cardIds.includes(c.id))
    : allCards

  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentCard = cards[index] ?? null
  const isComplete = index >= cards.length
  const progress = cards.length === 0 ? 0 : index / cards.length

  function flip() { setIsFlipped(f => !f) }

  function next() {
    setIndex(i => i + 1)
    setIsFlipped(false)
  }

  function prev() {
    setIndex(i => Math.max(0, i - 1))
    setIsFlipped(false)
  }

  return { currentCard, isFlipped, flip, next, prev, progress, isComplete, index, total: cards.length }
}
