import { useEffect } from 'react'
import { FlashCard } from '../../molecules/FlashCard'
import { Button } from '../../atoms/Button'
import { ProgressBar } from '../../atoms/ProgressBar'
import { Counter } from '../../atoms/Counter'
import { useFlashcardSession } from '../../../hooks/useFlashcardSession'
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

  useEffect(() => { onProgressChange?.(progress) }, [progress, onProgressChange])

  useEffect(() => {
    if (isComplete) {
      onComplete({ masteredIds, score, total: cards.length })
    }
  }, [isComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentCard) return null

  return (
    <div className={styles.deck}>
      <ProgressBar value={progress} />
      <Counter current={Math.round(progress * cards.length)} total={cards.length} prefix="Card" />
      <FlashCard
        front={currentCard.front}
        back={currentCard.back}
        isFlipped={isFlipped}
        onClick={!isFlipped ? flip : undefined}
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
