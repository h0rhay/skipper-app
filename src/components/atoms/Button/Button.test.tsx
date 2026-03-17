import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders label', () => {
    render(<Button onClick={() => {}}>Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Submit</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is set', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick} disabled>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
