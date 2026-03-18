import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SessionSummary } from './SessionSummary'

const base = {
  mode: 'mcq' as const,
  topicTitle: 'IRPCS / COLREGS',
  score: 8,
  total: 12,
  wrongIds: ['q-1', 'q-2'],
  onReview: () => {},
  onNext: () => {},
}

describe('SessionSummary', () => {
  it('renders score numbers', () => {
    render(<SessionSummary {...base} />)
    expect(screen.getAllByText('8').length).toBeGreaterThan(0)
    expect(screen.getByText('/ 12')).toBeInTheDocument()
  })

  it('shows percentage', () => {
    render(<SessionSummary {...base} />)
    expect(screen.getAllByText('67%').length).toBeGreaterThan(0)
  })

  it('shows review button when wrongIds present', () => {
    render(<SessionSummary {...base} />)
    expect(screen.getByRole('button', { name: /review wrong answers/i })).toBeInTheDocument()
  })

  it('hides review button when no wrong answers', () => {
    render(<SessionSummary {...base} wrongIds={[]} />)
    expect(screen.queryByRole('button', { name: /review/i })).not.toBeInTheDocument()
  })

  it('calls onReview when review button clicked', async () => {
    const onReview = vi.fn()
    render(<SessionSummary {...base} onReview={onReview} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /review/i }))
    expect(onReview).toHaveBeenCalledOnce()
  })

  it('calls onNext when next topic clicked', async () => {
    const onNext = vi.fn()
    render(<SessionSummary {...base} onNext={onNext} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /next topic/i }))
    expect(onNext).toHaveBeenCalledOnce()
  })

  it('shows flashcard review label for flashcard mode', () => {
    render(<SessionSummary {...base} mode="flashcards" wrongIds={['fc-1']} />)
    expect(screen.getByRole('button', { name: /retry weak cards/i })).toBeInTheDocument()
  })
})
