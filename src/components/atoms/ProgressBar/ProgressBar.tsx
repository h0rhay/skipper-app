import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  value: number // 0–1
  height?: number
}

export function ProgressBar({ value, height = 4 }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={styles.track}
      style={{ height }}
    >
      <div className={styles.fill} style={{ width: `${clamped * 100}%` }} />
    </div>
  )
}
