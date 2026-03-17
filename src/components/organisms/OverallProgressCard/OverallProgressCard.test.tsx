import { render, screen } from '@testing-library/react'
import { OverallProgressCard } from './OverallProgressCard'

describe('OverallProgressCard', () => {
  beforeEach(() => localStorage.clear())

  it('shows 0% when no progress', () => {
    render(<OverallProgressCard />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})
