interface DividerProps {
  padded?: boolean
}

export function Divider({ padded = false }: DividerProps) {
  return (
    <div className={`flex justify-center items-center w-full ${padded ? 'py-5' : ''}`} role="separator">
      <svg width="100" height="8" viewBox="0 0 100 8" fill="none" aria-hidden="true">
        <path
          d="M0 4c6.25-4 12.5-4 18.75 0 6.25 4 12.5 4 18.75 0 6.25-4 12.5-4 18.75 0 6.25 4 12.5 4 18.75 0 6.25-4 12.5-4 18.75 0"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
