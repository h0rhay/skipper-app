import React from 'react'
import styles from './AppShell.module.css'

interface AppShellProps {
  children: React.ReactNode
  tabBar: React.ReactNode
  topNav?: React.ReactNode
}

export function AppShell({ children, tabBar, topNav }: AppShellProps) {
  return (
    <div className={styles.shell}>
      {topNav && <div className={styles.topNav}>{topNav}</div>}
      <main className={styles.content}>{children}</main>
      <footer className={styles.tabBar}>{tabBar}</footer>
    </div>
  )
}
