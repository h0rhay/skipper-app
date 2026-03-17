import { render, screen, waitFor } from '@testing-library/react'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { ResumeCard } from './ResumeCard'
import { storage } from '../../../services/storage'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('ResumeCard', () => {
  beforeEach(() => localStorage.clear())

  it('renders null when no last session', async () => {
    const { container } = renderWithRouter(<ResumeCard />)
    await waitFor(() => expect(container.querySelector('[class]')).toBeNull())
  })

  it('shows topic name, mode and score when session exists', async () => {
    storage.set('sessions', [{
      id: 's1', topicId: '05-irpcs-colregs', mode: 'mcq', toolId: null,
      startedAt: '', completedAt: '', score: 8, total: 12, wrongIds: []
    }])
    renderWithRouter(<ResumeCard />)
    await waitFor(() => expect(screen.getAllByText(/irpcs/i).length).toBeGreaterThan(0))
    expect(screen.getByText(/continue where you left off/i)).toBeInTheDocument()
    expect(screen.getByText(/questions/i)).toBeInTheDocument()
  })
})
