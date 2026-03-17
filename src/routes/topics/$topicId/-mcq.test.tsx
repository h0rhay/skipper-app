import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { MCQSessionScreenComponent } from './mcq'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('MCQSessionScreen', () => {
  beforeEach(() => localStorage.clear())

  it('renders the first question for a topic with MCQ questions', async () => {
    renderWithRouter(<MCQSessionScreenComponent topicId="05-irpcs-colregs" />)
    await waitFor(() => expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument())
  })

  it('selects an option — Submit button becomes enabled', async () => {
    const user = userEvent.setup()
    renderWithRouter(<MCQSessionScreenComponent topicId="05-irpcs-colregs" />)
    await waitFor(() => expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument())
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()
    // Click the first option (label "A")
    const optionA = screen.getByText('A').closest('button')!
    await user.click(optionA)
    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled()
  })

  it('submits answer — answer is revealed (explanation or Next button appears)', async () => {
    const user = userEvent.setup()
    renderWithRouter(<MCQSessionScreenComponent topicId="05-irpcs-colregs" />)
    await waitFor(() => expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument())
    await user.click(screen.getByText('A').closest('button')!)
    await user.click(screen.getByRole('button', { name: /submit/i }))
    await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument())
  })

  it('exits to topic — exit button triggers navigation (no error thrown)', async () => {
    const user = userEvent.setup()
    renderWithRouter(<MCQSessionScreenComponent topicId="05-irpcs-colregs" />)
    await waitFor(() => expect(screen.getByRole('button', { name: /exit session/i })).toBeInTheDocument())
    // Click exit — navigates away; simply verify no error is thrown
    await user.click(screen.getByRole('button', { name: /exit session/i }))
  })
})
