import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TopicRow } from './TopicRow'

describe('TopicRow', () => {
  it('renders topic number and title', () => {
    render(<TopicRow number={5} title="IRPCS / COLREGS" status="none" onClick={() => {}} />)
    expect(screen.getByText('05')).toBeInTheDocument()
    expect(screen.getByText('IRPCS / COLREGS')).toBeInTheDocument()
  })

  it('shows safety-critical badge when isSafetyCritical', () => {
    render(<TopicRow number={5} title="IRPCS" status="none" isSafetyCritical onClick={() => {}} />)
    expect(screen.getByText(/safety/i)).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TopicRow number={1} title="Nautical Terms" status="none" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('shows complete indicator for complete status', () => {
    render(<TopicRow number={1} title="Nautical Terms" status="complete" onClick={() => {}} />)
    expect(screen.getByText(/complete/i)).toBeInTheDocument()
  })
})
