import { render, screen } from '@testing-library/react'
import { SafetyNote } from './SafetyNote'

describe('SafetyNote', () => {
  it('renders the note text', () => {
    render(<SafetyNote note="Always wear a lifejacket in rough weather." />)
    expect(screen.getByText('Always wear a lifejacket in rough weather.')).toBeInTheDocument()
  })

  it('has role="alert" for accessibility', () => {
    render(<SafetyNote note="Test note." />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
