interface ScoreRingProps { score: number; total: number; size?: number }

export function ScoreRing({ score, total, size = 80 }: ScoreRingProps) {
  const pct = total === 0 ? 0 : Math.round((score / total) * 100)
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--color-border)" strokeWidth={6} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--color-primary)" strokeWidth={6}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em"
        fontSize={size * 0.2} fontWeight="700" fill="var(--color-text)">{pct}%</text>
    </svg>
  )
}
