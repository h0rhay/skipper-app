import styles from './FlashCard.module.css'

interface FlashCardProps {
  front: string
  back: string
  tag?: string
  isFlipped: boolean
  onClick?: () => void
}

export function FlashCard({ front, back, tag = 'FLASHCARD', isFlipped, onClick }: FlashCardProps) {
  return (
    <button type="button" className={styles.scene} onClick={onClick} aria-label={isFlipped ? 'Show front' : 'Show back'}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.face} ${styles.front}`}>
          <div className={styles.tag}>{tag}</div>
          <p className={styles.question}>{front}</p>
          <div className={styles.hint}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 2H3v16h5l3 3 3-3h7z"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
            <span>Tap to reveal answer</span>
          </div>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <p className={styles.answer}>{back}</p>
        </div>
      </div>
    </button>
  )
}
