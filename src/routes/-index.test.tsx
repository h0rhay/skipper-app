import { render, screen } from '@testing-library/react'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { Route } from './index'

function renderWithRouter() {
  const rootRoute = createRootRoute({ component: () => <RouterProvider router={router} /> })
  const router = createRouter({
    routeTree: Route.addChildren([]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('HomeScreen', () => {
  beforeEach(() => localStorage.clear())

  it('renders the page heading', async () => {
    renderWithRouter()
    const headings = await screen.findAllByText(/day skipper/i)
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })
})
