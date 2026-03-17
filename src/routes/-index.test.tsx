import { render, screen } from '@testing-library/react'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { HomeScreenComponent } from './index'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('HomeScreen', () => {
  beforeEach(() => localStorage.clear())

  it('renders the page heading', async () => {
    renderWithRouter(<HomeScreenComponent />)
    const headings = await screen.findAllByText(/day skipper/i)
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })

  it('renders all 17 topics', async () => {
    renderWithRouter(<HomeScreenComponent />)
    await screen.findAllByRole('button')
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(17)
  })
})
