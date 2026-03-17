import styles from './Counter.module.css'

interface CounterProps { current: number; total: number; prefix?: string }
export function Counter({ current, total, prefix = 'Q' }: CounterProps) {
  return <span className={styles.counter}>{prefix} {current} / {total}</span>
}
