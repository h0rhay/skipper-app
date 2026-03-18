import { AlertTriangle } from 'lucide-react'

interface SafetyNoteProps {
  note: string
}

export function SafetyNote({ note }: SafetyNoteProps) {
  return (
    <div
      className="flex gap-2.5 bg-danger/8 border border-danger/30 px-3.5 py-3"
      role="alert"
    >
      <AlertTriangle size={16} className="text-danger flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p className="m-0 text-sm text-text leading-relaxed">{note}</p>
    </div>
  )
}
