import { render, screen } from '@testing-library/react'
import { CentredCard } from './CentredCard'

describe('CentredCard', () => {
  it('renders card content and actions', () => {
    render(<CentredCard actions={<button>Next</button>}>Score: 8/12</CentredCard>)
    expect(screen.getByText('Score: 8/12')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })

  it('renders without actions when actions prop is omitted', () => {
    const { container } = render(<CentredCard>Score: 8/12</CentredCard>)
    expect(screen.getByText('Score: 8/12')).toBeInTheDocument()
    // actions container should not be present
    expect(container.querySelector('.actions')).not.toBeInTheDocument()
  })
})
