import React from 'react'
import styles from './AppShell.module.css'

interface AppShellProps {
  children: React.ReactNode
  tabBar: React.ReactNode
}

export function AppShell({ children, tabBar }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <main className={styles.content}>{children}</main>
      <footer className={styles.tabBar}>{tabBar}</footer>
    </div>
  )
}
