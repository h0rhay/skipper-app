import { useEffect, useRef } from 'react'
import { FlashCard } from '../../molecules/FlashCard'
import { Button } from '../../atoms/Button'
import { ProgressBar } from '../../atoms/ProgressBar'
import { useFlashcardSession } from '../../../hooks/useFlashcardSession'
import { getCardPath } from '../../illustrations/paths'
import type { Flashcard } from '../../../types'
import styles from './FlashcardDeck.module.css'

interface FlashcardDeckProps {
  topicId: string
  cards: Flashcard[]
  cardIds?: string[]
  onComplete: (result: { masteredIds: string[]; score: number; total: number }) => void
  onProgressChange?: (progress: number) => void
}

export function FlashcardDeck({ topicId, cards, cardIds, onComplete, onProgressChange }: FlashcardDeckProps) {
  const { currentCard, isFlipped, flip, markGotIt, markAgain, progress, isComplete, score, masteredIds } =
    useFlashcardSession(topicId, cards, cardIds)

  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  useEffect(() => { onProgressChange?.(progress) }, [progress, onProgressChange])

  useEffect(() => {
    if (isComplete) {
      onCompleteRef.current({ masteredIds, score, total: cards.length })
    }
  }, [isComplete, masteredIds, score, cards.length])

  if (!currentCard) return null

  return (
    <div className={styles.deck}>
      <ProgressBar value={progress} />
      <FlashCard
        front={currentCard.front}
        back={currentCard.back}
        isFlipped={isFlipped}
        onClick={!isFlipped ? flip : undefined}
        illustrationSrc={getCardPath(currentCard.id)}
      />
      {isFlipped && (
        <div className={styles.actions}>
          <Button onClick={markAgain} variant="secondary" fullWidth>Again</Button>
          <Button onClick={markGotIt} fullWidth>Got it</Button>
        </div>
      )}
    </div>
  )
}
