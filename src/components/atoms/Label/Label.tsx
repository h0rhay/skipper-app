interface LabelProps { children: React.ReactNode }
export function Label({ children }: LabelProps) {
  return (
    <span className="text-xs font-semibold tracking-[1.5px] uppercase text-text-muted">
      {children}
    </span>
  )
}
