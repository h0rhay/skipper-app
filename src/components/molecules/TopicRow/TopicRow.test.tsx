import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TopicRow } from './TopicRow'

describe('TopicRow', () => {
  it('renders topic number and title', () => {
    render(<TopicRow number={5} title="IRPCS / COLREGS" status="none" onClick={() => {}} />)
    expect(screen.getByText('05')).toBeInTheDocument()
    expect(screen.getByText('IRPCS / COLREGS')).toBeInTheDocument()
  })

  it('shows critical badge when isSafetyCritical', () => {
    render(<TopicRow number={5} title="IRPCS" status="none" isSafetyCritical onClick={() => {}} />)
    expect(screen.getByText(/critical/i)).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TopicRow number={1} title="Nautical Terms" status="none" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('shows SEEN chip when tier=seen', () => {
    render(<TopicRow number={1} title="Nautical Terms" status="none" tier="seen" onClick={() => {}} />)
    expect(screen.getByText('SEEN')).toBeInTheDocument()
  })

  it('shows PRACTISED chip when tier=practised', () => {
    render(<TopicRow number={1} title="Nautical Terms" status="none" tier="practised" onClick={() => {}} />)
    expect(screen.getByText('PRACTISED')).toBeInTheDocument()
  })

  it('shows PASSED chip when tier=passed', () => {
    render(<TopicRow number={1} title="Nautical Terms" status="none" tier="passed" onClick={() => {}} />)
    expect(screen.getByText('PASSED')).toBeInTheDocument()
  })

  it('shows MASTERED chip when tier=mastered', () => {
    render(<TopicRow number={1} title="Nautical Terms" status="none" tier="mastered" onClick={() => {}} />)
    expect(screen.getByText('MASTERED')).toBeInTheDocument()
  })

  it('shows no chip when tier=none', () => {
    render(<TopicRow number={1} title="Nautical Terms" status="none" tier="none" onClick={() => {}} />)
    expect(screen.queryByText('SEEN')).not.toBeInTheDocument()
    expect(screen.queryByText('PRACTISED')).not.toBeInTheDocument()
    expect(screen.queryByText('PASSED')).not.toBeInTheDocument()
    expect(screen.queryByText('MASTERED')).not.toBeInTheDocument()
  })

  it('shows no chip when tier is undefined', () => {
    render(<TopicRow number={1} title="Nautical Terms" status="none" onClick={() => {}} />)
    expect(screen.queryByText('SEEN')).not.toBeInTheDocument()
    expect(screen.queryByText('MASTERED')).not.toBeInTheDocument()
  })

  it('shows CRITICAL badge alongside tier chip for safety-critical topics', () => {
    render(<TopicRow number={5} title="IRPCS" status="none" isSafetyCritical tier="seen" onClick={() => {}} />)
    expect(screen.getByText(/critical/i)).toBeInTheDocument()
    expect(screen.getByText('SEEN')).toBeInTheDocument()
  })
})
