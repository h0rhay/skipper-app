import { useTheme } from '../../../hooks'
import styles from './TopNav.module.css'

export function TopNav() {
  const { theme, toggle } = useTheme()
  return (
    <header className={styles.nav}>
      <div className={styles.brand}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="5" r="3"/>
          <line x1="12" y1="22" x2="12" y2="8"/>
          <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
        </svg>
        <span>Skipper</span>
      </div>
      <button className={styles.themeToggle} onClick={toggle} aria-label="Toggle dark mode">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  )
}
