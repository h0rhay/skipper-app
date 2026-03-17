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
      <div className={styles.progressStrip}>
        <ProgressBar value={progress} height={4} />
      </div>
      <div className={styles.topBar}>
        <button className={styles.exitBtn} onClick={onExit} aria-label="exit session">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className={styles.counter}>{counter}</div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
