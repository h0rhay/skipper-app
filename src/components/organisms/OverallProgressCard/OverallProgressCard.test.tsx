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

  it('compact variant: shows topic count and streak', () => {
    render(<OverallProgressCard variant="compact" />)
    expect(screen.getByText(/overall progress/i)).toBeInTheDocument()
    expect(screen.getByText(/topics/i)).toBeInTheDocument()
    expect(screen.getByText(/streak/i)).toBeInTheDocument()
  })
})
