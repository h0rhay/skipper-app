import styles from './SafetyNote.module.css'

interface SafetyNoteProps {
  note: string
}

export function SafetyNote({ note }: SafetyNoteProps) {
  return (
    <div className={styles.note} role="alert">
      <span className={styles.icon}>⚠</span>
      <p>{note}</p>
    </div>
  )
}
