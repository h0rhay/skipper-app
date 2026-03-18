interface SessionStatRowProps {
  label: string
  value: string | number
}

export function SessionStatRow({ label, value }: SessionStatRowProps) {
  return (
    <div className="flex justify-between items-center px-4 py-2.5 border-b border-border last:border-b-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className="text-sm font-semibold text-text">{value}</span>
    </div>
  )
}
