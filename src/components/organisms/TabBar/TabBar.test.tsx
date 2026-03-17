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
  it('renders Study, Quiz and Progress tabs', async () => {
    renderWithRouter(<TabBar active="study" />)
    await waitFor(() => expect(screen.getByText('STUDY')).toBeInTheDocument())
    expect(screen.getByText('QUIZ')).toBeInTheDocument()
    expect(screen.getByText('PROGRESS')).toBeInTheDocument()
  })

  it('marks the active tab', async () => {
    renderWithRouter(<TabBar active="progress" />)
    await waitFor(() => expect(screen.getByText('PROGRESS')).toBeInTheDocument())
    expect(screen.getByText('PROGRESS').closest('a')).toHaveClass('active')
    expect(screen.getByText('STUDY').closest('a')).not.toHaveClass('active')
  })
})
