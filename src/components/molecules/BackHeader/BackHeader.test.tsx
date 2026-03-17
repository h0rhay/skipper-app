import { render, screen, waitFor } from '@testing-library/react'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { BackHeader } from './BackHeader'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('BackHeader', () => {
  it('renders the label', async () => {
    renderWithRouter(<BackHeader label="All Topics" to="/" />)
    await waitFor(() => expect(screen.getByText(/all topics/i)).toBeInTheDocument())
  })

  it('renders a back arrow', async () => {
    renderWithRouter(<BackHeader label="All Topics" to="/" />)
    await waitFor(() => expect(screen.getByText('‹')).toBeInTheDocument())
  })
})
