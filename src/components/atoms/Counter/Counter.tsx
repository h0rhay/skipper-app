interface CounterProps { current: number; total: number; prefix?: string }
export function Counter({ current, total, prefix = 'Q' }: CounterProps) {
  return <span className="text-sm text-text-muted">{prefix} {current} / {total}</span>
}
