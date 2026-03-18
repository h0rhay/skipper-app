import { useEffect, useRef } from 'react'
import { FlashCard } from '../../molecules/FlashCard'
import { Button } from '../../atoms/Button'
import { Divider } from '../../atoms/Divider'
import { useFlashcardSession } from '../../../hooks/useFlashcardSession'
import { getCardPath } from '../../illustrations/paths'
import type { Flashcard } from '../../../types'

interface FlashcardDeckProps {
  topicId: string
  cards: Flashcard[]
  cardIds?: string[]
  onComplete: (result: { masteredIds: string[]; score: number; total: number }) => void
  onProgressChange?: (progress: number) => void
}

export function FlashcardDeck({ topicId, cards, cardIds, onComplete, onProgressChange }: FlashcardDeckProps) {
  const { currentCard, isFlipped, flip, next, prev, progress, isComplete, index, total } =
    useFlashcardSession(topicId, cards, cardIds)

  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  useEffect(() => { onProgressChange?.(progress) }, [progress, onProgressChange])

  useEffect(() => {
    if (isComplete) {
      onCompleteRef.current({ masteredIds: [], score: 0, total })
    }
  }, [isComplete, total])

  if (!currentCard) return null

  return (
    <div className="flex flex-col gap-5">
      <FlashCard
        front={currentCard.front}
        back={currentCard.back}
        isFlipped={isFlipped}
        onClick={!isFlipped ? flip : undefined}
        illustrationSrc={getCardPath(currentCard.id) ?? undefined}
      />
      {isFlipped && <Divider />}
      {isFlipped && (
        <div className="flex gap-3">
          {index > 0 && (
            <Button onClick={prev} variant="secondary" fullWidth>Back</Button>
          )}
          <Button onClick={next} fullWidth>Next</Button>
        </div>
      )}
    </div>
  )
}
