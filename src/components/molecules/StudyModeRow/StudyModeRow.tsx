import type { ReactNode } from 'react'
import styles from './StudyModeRow.module.css'

interface StudyModeRowProps {
  label: string
  description?: string
  progressText?: string
  icon?: ReactNode
  variant?: 'default' | 'featured'
  onClick: () => void
}

export function StudyModeRow({ label, description, progressText, icon, variant = 'default', onClick }: StudyModeRowProps) {
  const featured = variant === 'featured'

  return (
    <button className={`${styles.row} ${featured ? styles.featured : ''}`} onClick={onClick}>
      {icon && (
        <span className={`${styles.iconWrap} ${featured ? styles.iconWrapFeatured : ''}`}>
          {icon}
        </span>
      )}
      <span className={styles.center}>
        <span className={`${styles.label} ${featured ? styles.labelFeatured : ''}`}>{label}</span>
        {description && (
          <span className={`${styles.description} ${featured ? styles.descriptionFeatured : ''}`}>{description}</span>
        )}
      </span>
      <span className={styles.right}>
        {progressText && (
          <span className={`${styles.progressText} ${featured ? styles.progressTextFeatured : ''}`}>{progressText}</span>
        )}
        <svg className={`${styles.chevron} ${featured ? styles.chevronFeatured : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </span>
    </button>
  )
}
