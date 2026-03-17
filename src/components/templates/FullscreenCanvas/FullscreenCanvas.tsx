import React from 'react'
import styles from './FullscreenCanvas.module.css'

interface FullscreenCanvasProps {
  header: React.ReactNode
  children: React.ReactNode
}

export function FullscreenCanvas({ header, children }: FullscreenCanvasProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>{header}</header>
      <div className={styles.canvas}>{children}</div>
    </div>
  )
}
