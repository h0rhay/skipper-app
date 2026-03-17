import React from 'react'
import { ProgressBar } from '../../atoms/ProgressBar'
import styles from './SessionPage.module.css'

interface SessionPageProps {
  progress: number // 0–1
  onExit: () => void
  counter: React.ReactNode
  children: React.ReactNode
}

export function SessionPage({ progress, onExit, counter, children }: SessionPageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.exitBtn} onClick={onExit} aria-label="exit session">×</button>
        <div className={styles.progressWrap}>
          <ProgressBar value={progress} height={4} />
        </div>
        <div className={styles.counter}>{counter}</div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
