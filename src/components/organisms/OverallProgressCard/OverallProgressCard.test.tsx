import { render, screen } from '@testing-library/react'
import { OverallProgressCard } from './OverallProgressCard'

describe('OverallProgressCard', () => {
  beforeEach(() => localStorage.clear())

  it('shows 0 complete topics when no progress', () => {
    render(<OverallProgressCard />)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('/ 17 topics')).toBeInTheDocument()
  })

  it('shows the streak label', () => {
    render(<OverallProgressCard />)
    expect(screen.getByText(/streak/i)).toBeInTheDocument()
  })
})
