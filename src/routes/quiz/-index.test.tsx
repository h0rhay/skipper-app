import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { QuizScreenComponent } from './index'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/quiz'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('QuizScreen', () => {
  beforeEach(() => localStorage.clear())

  it('renders MIXED QUIZ label when topics load', async () => {
    renderWithRouter(<QuizScreenComponent />)
    const el = await screen.findByText(/MIXED QUIZ/i)
    expect(el).toBeInTheDocument()
  })

  it('renders a question number counter', async () => {
    renderWithRouter(<QuizScreenComponent />)
    const counter = await screen.findByText(/1\s*\/\s*\d+/i)
    expect(counter).toBeInTheDocument()
  })

  it('renders Submit Answer button', async () => {
    renderWithRouter(<QuizScreenComponent />)
    await waitFor(() => expect(screen.getByRole('button', { name: /submit answer/i })).toBeInTheDocument())
  })

  it('Submit Answer is disabled before selecting an option', async () => {
    renderWithRouter(<QuizScreenComponent />)
    await waitFor(() => expect(screen.getByRole('button', { name: /submit answer/i })).toBeDisabled())
  })

  it('Submit Answer becomes enabled after selecting an option', async () => {
    const user = userEvent.setup()
    renderWithRouter(<QuizScreenComponent />)
    await waitFor(() => expect(screen.getByRole('button', { name: /submit answer/i })).toBeDisabled())
    // Click the badge labelled 'A'
    const optionA = screen.getByText('A').closest('button')!
    await user.click(optionA)
    expect(screen.getByRole('button', { name: /submit answer/i })).not.toBeDisabled()
  })

  it('reveals explanation after submitting', async () => {
    const user = userEvent.setup()
    renderWithRouter(<QuizScreenComponent />)
    await waitFor(() => expect(screen.getByRole('button', { name: /submit answer/i })).toBeDisabled())
    await user.click(screen.getByText('A').closest('button')!)
    await user.click(screen.getByRole('button', { name: /submit answer/i }))
    await waitFor(() => expect(screen.getByRole('button', { name: /next question|see results/i })).toBeInTheDocument())
  })

  it('exit button is rendered', async () => {
    renderWithRouter(<QuizScreenComponent />)
    await waitFor(() => expect(screen.getByRole('button', { name: /exit quiz/i })).toBeInTheDocument())
  })
})
