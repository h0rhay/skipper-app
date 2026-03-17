import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TopicProgressRow } from './TopicProgressRow'

describe('TopicProgressRow', () => {
  it('renders topic title', () => {
    render(<TopicProgressRow title="IRPCS / COLREGS" status="partial" mcqScore={67} onClick={() => {}} />)
    expect(screen.getByText('IRPCS / COLREGS')).toBeInTheDocument()
  })

  it('renders MCQ score when provided', () => {
    render(<TopicProgressRow title="IRPCS" status="partial" mcqScore={67} onClick={() => {}} />)
    expect(screen.getByText('67%')).toBeInTheDocument()
  })

  it('shows "—" when no MCQ score', () => {
    render(<TopicProgressRow title="IRPCS" status="none" onClick={() => {}} />)
    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TopicProgressRow title="IRPCS" status="none" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
