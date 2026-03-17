import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { SessionPage } from './SessionPage'

describe('SessionPage', () => {
  it('renders progress, exit button and children', () => {
    render(
      <SessionPage progress={0.4} onExit={() => {}} counter={<span>Q 3 of 12</span>}>
        Question content
      </SessionPage>
    )
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByText('Q 3 of 12')).toBeInTheDocument()
    expect(screen.getByText('Question content')).toBeInTheDocument()
  })

  it('calls onExit when × is clicked', async () => {
    const user = userEvent.setup()
    const onExit = vi.fn()
    render(<SessionPage progress={0} onExit={onExit} counter={null}>content</SessionPage>)
    await user.click(screen.getByRole('button', { name: /exit/i }))
    expect(onExit).toHaveBeenCalledOnce()
  })
})
