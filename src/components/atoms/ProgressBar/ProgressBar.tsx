import { Progress, ProgressTrack, ProgressIndicator } from '#/components/ui/progress'

interface ProgressBarProps {
  value: number // 0–1
  height?: number
}

export function ProgressBar({ value, height = 4 }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value))
  const valuePct = Math.round(clamped * 100)
  return (
    <Progress
      value={valuePct}
      role="progressbar"
      aria-valuenow={valuePct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <ProgressTrack style={{ height }} className="bg-border overflow-hidden w-full">
        <ProgressIndicator className="bg-primary transition-[width] duration-300 ease-in-out" style={{ width: `${valuePct}%` }} />
      </ProgressTrack>
    </Progress>
  )
}
