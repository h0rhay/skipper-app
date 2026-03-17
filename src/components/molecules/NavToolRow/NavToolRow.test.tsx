import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavToolRow } from './NavToolRow'

describe('NavToolRow', () => {
  it('renders tool label', () => {
    render(<NavToolRow toolId="dead-reckoning" label="Dead Reckoning" attempts={0} onClick={() => {}} />)
    expect(screen.getByText('Dead Reckoning')).toBeInTheDocument()
  })

  it('shows attempt count when attempts > 0', () => {
    render(<NavToolRow toolId="dead-reckoning" label="Dead Reckoning" attempts={3} onClick={() => {}} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<NavToolRow toolId="dead-reckoning" label="Dead Reckoning" attempts={0} onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
