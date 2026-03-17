import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StudyModeRow } from './StudyModeRow'

describe('StudyModeRow', () => {
  it('renders mode name', () => {
    render(<StudyModeRow label="Flashcards" progressText="5/18" onClick={() => {}} />)
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
  })

  it('shows progress text', () => {
    render(<StudyModeRow label="MCQ Quiz" progressText="9/12" onClick={() => {}} />)
    expect(screen.getByText('9/12')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<StudyModeRow label="Flashcards" progressText="" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
