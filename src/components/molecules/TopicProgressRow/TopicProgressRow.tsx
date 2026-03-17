import styles from './TopicProgressRow.module.css'

interface TopicProgressRowProps {
  title: string
  percent?: number
  onClick: () => void
}

export function TopicProgressRow({ title, percent = 0, onClick }: TopicProgressRowProps) {
  return (
    <button className={styles.row} onClick={onClick}>
      <span className={styles.title}>{title}</span>
      <div className={styles.barBg}>
        <div className={styles.barFill} style={{ width: `${percent}%` }} />
      </div>
    </button>
  )
}
