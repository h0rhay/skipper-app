import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  fullWidth?: boolean
}

export function Button({ children, onClick, variant = 'primary', disabled = false, fullWidth = false }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
