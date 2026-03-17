import { render, screen, waitFor } from '@testing-library/react'
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
})
