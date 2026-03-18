import React from 'react'
import { X } from 'lucide-react'
import { ProgressBar } from '../../atoms/ProgressBar'

interface SessionPageProps {
  progress: number // 0–1
  onExit: () => void
  counter: React.ReactNode
  children: React.ReactNode
  tabBar?: React.ReactNode
}

export function SessionPage({ progress, onExit, counter, children, tabBar }: SessionPageProps) {
  return (
    <div className="flex flex-col h-dvh max-w-[768px] mx-auto bg-bg">
      <div className="shrink-0">
        <ProgressBar value={progress} height={4} />
      </div>
      <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <button
          className="bg-transparent border-0 text-text p-1 leading-none cursor-pointer flex items-center focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          onClick={onExit}
          aria-label="exit session"
        >
          <X size={20} aria-hidden="true" />
        </button>
        <div className="font-heading text-md font-medium text-text-secondary">{counter}</div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pt-5 pb-8">{children}</div>
      {tabBar && <footer className="shrink-0 bg-bg-card">{tabBar}</footer>}
    </div>
  )
}
