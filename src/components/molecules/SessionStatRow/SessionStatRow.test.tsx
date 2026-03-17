import { render, screen } from '@testing-library/react'
import { SessionStatRow } from './SessionStatRow'

describe('SessionStatRow', () => {
  it('renders label and value', () => {
    render(<SessionStatRow label="Score" value="8/12" />)
    expect(screen.getByText('Score')).toBeInTheDocument()
    expect(screen.getByText('8/12')).toBeInTheDocument()
  })

  it('renders numeric value as string', () => {
    render(<SessionStatRow label="Attempts" value={3} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
