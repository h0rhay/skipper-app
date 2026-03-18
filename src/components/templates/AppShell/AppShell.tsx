import React from 'react'

interface AppShellProps {
  children: React.ReactNode
  tabBar: React.ReactNode
  topNav?: React.ReactNode
}

export function AppShell({ children, tabBar, topNav }: AppShellProps) {
  return (
    <div className="flex flex-col h-dvh max-w-[768px] mx-auto overflow-hidden bg-bg">
      {topNav && <div className="shrink-0">{topNav}</div>}
      <main className="flex-1 overflow-y-auto [-webkit-overflow-scrolling:touch]">{children}</main>
      <footer className="shrink-0 bg-bg-card">{tabBar}</footer>
    </div>
  )
}
