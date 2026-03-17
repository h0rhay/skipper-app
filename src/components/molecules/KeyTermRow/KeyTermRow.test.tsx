import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { KeyTermRow } from './KeyTermRow'

describe('KeyTermRow', () => {
  it('shows term, hides definition initially', () => {
    render(<KeyTermRow term="Cleat" definition="A fitting used to secure lines." />)
    expect(screen.getByText('Cleat')).toBeInTheDocument()
    expect(screen.queryByText('A fitting used to secure lines.')).not.toBeVisible()
  })

  it('reveals definition on click', async () => {
    const user = userEvent.setup()
    render(<KeyTermRow term="Cleat" definition="A fitting used to secure lines." />)
    await user.click(screen.getByText('Cleat'))
    expect(screen.getByText('A fitting used to secure lines.')).toBeVisible()
  })
})
