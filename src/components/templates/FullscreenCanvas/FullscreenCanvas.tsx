import React from 'react'

interface FullscreenCanvasProps {
  header: React.ReactNode
  children: React.ReactNode
}

export function FullscreenCanvas({ header, children }: FullscreenCanvasProps) {
  return (
    <div className="flex flex-col h-dvh bg-bg overflow-hidden">
      <header className="shrink-0 px-4 py-3 border-b border-border font-body font-semibold">{header}</header>
      <div className="flex-1 relative overflow-hidden">{children}</div>
    </div>
  )
}
