import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { FlashcardDeck } from './FlashcardDeck'
import type { Flashcard } from '../../../types'

const CARDS: Flashcard[] = [
  { id: 'fc-1', front: 'What is a cleat?', back: 'A fitting for securing lines.' },
  { id: 'fc-2', front: 'What is a halyard?', back: 'A line used to hoist a sail.' },
]

describe('FlashcardDeck', () => {
  it('renders the front of the first card', () => {
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={() => {}} />)
    expect(screen.getByText('What is a cleat?')).toBeInTheDocument()
  })

  it('shows "Tap to reveal" hint', () => {
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={() => {}} />)
    expect(screen.getByText(/tap to reveal/i)).toBeInTheDocument()
  })

  it('shows Next button after flipping the card', async () => {
    const user = userEvent.setup()
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={() => {}} />)
    await user.click(screen.getByRole('button', { name: /show back/i }))
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('calls onComplete when all cards advanced through', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={onComplete} />)
    await user.click(screen.getByRole('button', { name: /show back/i }))
    await user.click(screen.getByRole('button', { name: /next/i }))
    await user.click(screen.getByRole('button', { name: /show back/i }))
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(onComplete).toHaveBeenCalled()
  })

  it('reports progress via onProgressChange', async () => {
    const user = userEvent.setup()
    const onProgressChange = vi.fn()
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={() => {}} onProgressChange={onProgressChange} />)
    await user.click(screen.getByRole('button', { name: /show back/i }))
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(onProgressChange).toHaveBeenCalled()
  })
})
