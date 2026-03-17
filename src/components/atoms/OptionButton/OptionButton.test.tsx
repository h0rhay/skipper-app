import { render, screen } from '@testing-library/react'
import { OptionButton } from './OptionButton'

describe('OptionButton', () => {
  it('renders option text', () => {
    render(<OptionButton label="A" text="Port side" state="idle" onClick={() => {}} />)
    expect(screen.getByText('Port side')).toBeInTheDocument()
  })

  it('shows selected state', () => {
    render(<OptionButton label="A" text="Port side" state="selected" onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'selected')
  })

  it('shows correct state', () => {
    render(<OptionButton label="A" text="Port side" state="correct" onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'correct')
  })

  it('shows wrong state', () => {
    render(<OptionButton label="A" text="Port side" state="wrong" onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'wrong')
  })

  it('is disabled when state is correct or wrong', () => {
    render(<OptionButton label="A" text="Port side" state="correct" onClick={() => {}} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
