import React from 'react'

interface CentredCardProps {
  children: React.ReactNode
  actions?: React.ReactNode
}

export function CentredCard({ children, actions }: CentredCardProps) {
  return (
    <div className="flex flex-col min-h-dvh max-w-[768px] mx-auto p-6 bg-bg">
      <div className="flex-1 flex flex-col justify-center">{children}</div>
      {actions && <div className="shrink-0 flex flex-col gap-2.5 pb-6">{actions}</div>}
    </div>
  )
}
