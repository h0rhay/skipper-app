import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders its label', () => {
    render(<Badge label="Safety Critical" />)
    expect(screen.getByText('Safety Critical')).toBeInTheDocument()
  })

  it('applies danger variant', () => {
    render(<Badge label="Safety Critical" variant="danger" />)
    expect(screen.getByText('Safety Critical')).toHaveClass('danger')
  })

  it('applies topic variant', () => {
    render(<Badge label="05" variant="topic" />)
    expect(screen.getByText('05')).toHaveClass('topic')
  })
})
