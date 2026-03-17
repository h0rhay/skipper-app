import styles from './FlashCard.module.css'

interface FlashCardProps {
  front: string
  back: string
  isFlipped: boolean
  onClick?: () => void
}

export function FlashCard({ front, back, isFlipped, onClick }: FlashCardProps) {
  return (
    <div className={`${styles.scene}`} onClick={onClick}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.face} ${styles.front}`}>
          <p>{front}</p>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <p>{back}</p>
        </div>
      </div>
    </div>
  )
}
