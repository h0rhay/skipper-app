import React from 'react'
import styles from './CentredCard.module.css'

interface CentredCardProps {
  children: React.ReactNode
  actions?: React.ReactNode
}

export function CentredCard({ children, actions }: CentredCardProps) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>{children}</div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
