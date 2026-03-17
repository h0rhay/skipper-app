import { Link } from '@tanstack/react-router'
import styles from './TabBar.module.css'

interface TabBarProps { active: 'study' | 'quiz' | 'progress' }

export function TabBar({ active }: TabBarProps) {
  return (
    <nav className={styles.bar}>
      <div className={styles.pill}>
        <Link
          to="/"
          className={`${styles.tab} ${active === 'study' ? styles.active : ''}`}
          activeProps={{}}
          activeOptions={{ exact: true, includeSearch: false }}
        >
          {/* book-open */}
          <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          <span>STUDY</span>
        </Link>
        <Link
          to="/quiz"
          className={`${styles.tab} ${active === 'quiz' ? styles.active : ''}`}
          activeProps={{}}
        >
          {/* brain */}
          <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.96-3 2.5 2.5 0 0 1-1.32-4.24 3 3 0 0 1 .34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.1-2.46z"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.96-3 2.5 2.5 0 0 0 1.32-4.24 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.1-2.46z"/>
          </svg>
          <span>QUIZ</span>
        </Link>
        <Link
          to="/progress"
          className={`${styles.tab} ${active === 'progress' ? styles.active : ''}`}
          activeProps={{}}
        >
          {/* trending-up */}
          <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
          </svg>
          <span>PROGRESS</span>
        </Link>
      </div>
    </nav>
  )
}
