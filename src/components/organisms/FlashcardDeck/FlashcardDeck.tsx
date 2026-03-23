import { useEffect, useRef } from 'react'
import { FlashCard } from '../../molecules/FlashCard'
import { Button } from '../../atoms/Button'
import { Divider } from '../../atoms/Divider'
import { useFlashcardSession } from '../../../hooks/useFlashcardSession'
import { useImagePreload } from '../../../hooks/useImagePreload'
import { getCardPath, getCardPlaceholder } from '../../illustrations/paths'
import type { Flashcard } from '../../../types'

interface FlashcardDeckProps {
  topicId: string
  cards: Flashcard[]
  cardIds?: string[]
  onComplete: (result: { masteredIds: string[]; score: number; total: number }) => void
  onProgressChange?: (progress: number) => void
}

export function FlashcardDeck({ topicId, cards, cardIds, onComplete, onProgressChange }: FlashcardDeckProps) {
  const { currentCard, nextCard, isFlipped, flip, next, progress, isComplete, index, total } =
    useFlashcardSession(topicId, cards, cardIds)

  const preload = useImagePreload()

  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  useEffect(() => { onProgressChange?.(progress) }, [progress, onProgressChange])

  useEffect(() => {
    if (!nextCard) return
    preload([getCardPath(nextCard.id), getCardPlaceholder(nextCard.id)])
  }, [nextCard, preload])

  useEffect(() => {
    if (isComplete) {
      const masteredIds = cards.map(c => c.id)
      onCompleteRef.current({ masteredIds, score: total, total })
    }
  }, [isComplete, total, cards])

  if (!currentCard) return null

  return (
    <div className="flex flex-col gap-5">
      <FlashCard
        front={currentCard.front}
        back={currentCard.back}
        isFlipped={isFlipped}
        onClick={flip}
        illustrationSrc={getCardPath(currentCard.id) ?? undefined}
        illustrationLqip={getCardPlaceholder(currentCard.id)}
      />
      {isFlipped && <Divider />}
      {isFlipped && (
        <Button onClick={next} fullWidth>Next</Button>
      )}
    </div>
  )
}
