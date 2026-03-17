import { Link } from '@tanstack/react-router'
import styles from './TabBar.module.css'

interface TabBarProps { active: 'home' | 'progress' }

export function TabBar({ active }: TabBarProps) {
  return (
    <nav className={styles.bar}>
      <Link
        to="/"
        className={`${styles.tab} ${active === 'home' ? styles.active : ''}`}
        activeProps={{}}
        activeOptions={{ exact: true, includeSearch: false }}
      >
        <span className={styles.icon}>🏠</span>
        <span>Home</span>
      </Link>
      <Link
        to="/progress"
        className={`${styles.tab} ${active === 'progress' ? styles.active : ''}`}
        activeProps={{}}
      >
        <span className={styles.icon}>📊</span>
        <span>Progress</span>
      </Link>
    </nav>
  )
}
