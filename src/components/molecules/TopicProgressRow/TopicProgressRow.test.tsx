import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TopicProgressRow } from './TopicProgressRow'

describe('TopicProgressRow', () => {
  it('renders topic title', () => {
    render(<TopicProgressRow title="IRPCS / COLREGS" onClick={() => {}} />)
    expect(screen.getByText('IRPCS / COLREGS')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TopicProgressRow title="IRPCS" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
