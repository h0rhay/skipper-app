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

  it('shows Got it / Again buttons after flipping the card', async () => {
    const user = userEvent.setup()
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={() => {}} />)
    await user.click(screen.getByRole('button', { name: /show back/i }))
    expect(screen.getByRole('button', { name: /got it/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /again/i })).toBeInTheDocument()
  })

  it('calls onComplete when deck is exhausted', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={onComplete} />)
    // Card 1: flip + got it
    await user.click(screen.getByRole('button', { name: /show back/i }))
    await user.click(screen.getByRole('button', { name: /got it/i }))
    // Card 2: flip + got it
    await user.click(screen.getByRole('button', { name: /show back/i }))
    await user.click(screen.getByRole('button', { name: /got it/i }))
    expect(onComplete).toHaveBeenCalledWith({ masteredIds: ['fc-1', 'fc-2'], score: 2, total: 2 })
  })

  it('shows progress bar', () => {
    render(<FlashcardDeck topicId="01" cards={CARDS} onComplete={() => {}} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
