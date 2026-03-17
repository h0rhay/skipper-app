import { render, screen, waitFor } from '@testing-library/react'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { TabBar } from './TabBar'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('TabBar', () => {
  it('renders Home and Progress tabs', async () => {
    renderWithRouter(<TabBar active="home" />)
    await waitFor(() => expect(screen.getByText('Home')).toBeInTheDocument())
    expect(screen.getByText('Progress')).toBeInTheDocument()
  })

  it('marks the active tab', async () => {
    renderWithRouter(<TabBar active="progress" />)
    await waitFor(() => expect(screen.getByText('Progress')).toBeInTheDocument())
    expect(screen.getByText('Progress').closest('a')).toHaveClass('active')
    expect(screen.getByText('Home').closest('a')).not.toHaveClass('active')
  })
})
