import { render, screen } from '@testing-library/react'
import { OverallProgressCard } from './OverallProgressCard'

describe('OverallProgressCard', () => {
  beforeEach(() => localStorage.clear())

  it('full variant: shows 0% when no progress', () => {
    render(<OverallProgressCard />)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText(/% complete/i)).toBeInTheDocument()
  })

  it('full variant: shows overall completion label', () => {
    render(<OverallProgressCard />)
    expect(screen.getByText(/overall completion/i)).toBeInTheDocument()
  })

  it('full variant: shows percentComplete prop', () => {
    render(<OverallProgressCard percentComplete={42} />)
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText(/% complete/i)).toBeInTheDocument()
  })

  it('compact variant: shows overall progress label and streak', () => {
    render(<OverallProgressCard variant="compact" />)
    expect(screen.getByText(/overall progress/i)).toBeInTheDocument()
    expect(screen.getByText(/streak/i)).toBeInTheDocument()
  })

  it('compact variant: shows percentComplete prop', () => {
    render(<OverallProgressCard variant="compact" percentComplete={75} currentStreak={3} />)
    expect(screen.getByText('75')).toBeInTheDocument()
    expect(screen.getByText(/% complete/i)).toBeInTheDocument()
  })

  it('compact variant: shows currentStreak DAY STREAK', () => {
    render(<OverallProgressCard variant="compact" percentComplete={0} currentStreak={5} />)
    expect(screen.getByText(/5 DAY/i)).toBeInTheDocument()
    expect(screen.getByText(/streak/i)).toBeInTheDocument()
  })
})
