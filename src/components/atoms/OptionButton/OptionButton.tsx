import styles from './OptionButton.module.css'

export type OptionState = 'idle' | 'selected' | 'correct' | 'wrong'

interface OptionButtonProps {
  label: string
  text: string
  state: OptionState
  onClick: () => void
}

export function OptionButton({ label, text, state, onClick }: OptionButtonProps) {
  const isLocked = state === 'correct' || state === 'wrong'
  return (
    <button
      className={`${styles.option} ${styles[state]}`}
      data-state={state}
      onClick={onClick}
      disabled={isLocked}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.text}>{text}</span>
    </button>
  )
}
