import React from 'react'

interface ScrollPageProps {
  header: React.ReactNode
  children: React.ReactNode
}

export function ScrollPage({ header, children }: ScrollPageProps) {
  return (
    <div className="flex flex-col min-h-full">
      <header className="shrink-0 px-6 border-b border-border bg-bg">{header}</header>
      <div className="flex-1 overflow-y-auto py-5 px-6 pb-6">{children}</div>
    </div>
  )
}
