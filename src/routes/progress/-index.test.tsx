import { render, screen } from '@testing-library/react'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { ProgressScreenComponent } from './index'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/progress'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('ProgressScreen', () => {
  beforeEach(() => localStorage.clear())

  it('renders the page heading', async () => {
    renderWithRouter(<ProgressScreenComponent />)
    const heading = await screen.findByText(/your progress/i)
    expect(heading).toBeInTheDocument()
  })

  it('renders the overall progress card', async () => {
    renderWithRouter(<ProgressScreenComponent />)
    expect(await screen.findByText(/17 topics/i)).toBeInTheDocument()
  })
})
