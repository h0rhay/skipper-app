import { Link } from '@tanstack/react-router'
import styles from './TabBar.module.css'

interface TabBarProps { active: 'study' | 'quiz' | 'progress' }

export function TabBar({ active }: TabBarProps) {
  return (
    <nav className={styles.bar}>
      <Link
        to="/"
        className={`${styles.tab} ${active === 'study' ? styles.active : ''}`}
        activeProps={{}}
        activeOptions={{ exact: true, includeSearch: false }}
      >
        <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        <span>Study</span>
      </Link>
      <Link
        to="/quiz"
        className={`${styles.tab} ${active === 'quiz' ? styles.active : ''}`}
        activeProps={{}}
      >
        <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
        </svg>
        <span>Quiz</span>
      </Link>
      <Link
        to="/progress"
        className={`${styles.tab} ${active === 'progress' ? styles.active : ''}`}
        activeProps={{}}
      >
        <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
        <span>Progress</span>
      </Link>
    </nav>
  )
}
