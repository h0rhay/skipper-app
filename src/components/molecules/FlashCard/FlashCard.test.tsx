import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FlashCard } from './FlashCard'

describe('FlashCard', () => {
  it('shows front text when not flipped', () => {
    render(<FlashCard front="What is a cleat?" back="A fitting for securing lines" isFlipped={false} />)
    expect(screen.getByText('What is a cleat?')).toBeVisible()
  })

  it('shows back text when flipped', () => {
    render(<FlashCard front="What is a cleat?" back="A fitting for securing lines" isFlipped={true} />)
    expect(screen.getByText('A fitting for securing lines')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<FlashCard front="Q" back="A" isFlipped={false} onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
