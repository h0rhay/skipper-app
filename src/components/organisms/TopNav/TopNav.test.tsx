import { render, screen } from '@testing-library/react'
import { TopNav } from './TopNav'

describe('TopNav', () => {
  it('renders the Skipper brand', () => {
    render(<TopNav />)
    expect(screen.getByText('Skipper')).toBeInTheDocument()
  })

  it('renders the notifications button', () => {
    render(<TopNav />)
    expect(screen.getByRole('button', { name: /notifications/i })).toBeInTheDocument()
  })
})
