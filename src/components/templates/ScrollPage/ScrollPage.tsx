import React from 'react'
import styles from './ScrollPage.module.css'

interface ScrollPageProps {
  header: React.ReactNode
  children: React.ReactNode
}

export function ScrollPage({ header, children }: ScrollPageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>{header}</header>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
