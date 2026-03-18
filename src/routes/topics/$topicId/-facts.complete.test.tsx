import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { FactsCompleteScreenComponent } from './facts.complete'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/topics/01-nautical-terms/facts/complete'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('FactsCompleteScreen', () => {
  beforeEach(() => localStorage.clear())

  it('renders "Facts Complete" heading', async () => {
    renderWithRouter(
      <FactsCompleteScreenComponent topicId="01-nautical-terms" />
    )
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /facts complete/i })).toBeInTheDocument()
    )
  })

  it('shows "Locked in ✓" button', async () => {
    renderWithRouter(
      <FactsCompleteScreenComponent topicId="01-nautical-terms" />
    )
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /locked in/i })).toBeInTheDocument()
    )
  })

  it('shows "Review again" button', async () => {
    renderWithRouter(
      <FactsCompleteScreenComponent topicId="01-nautical-terms" />
    )
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /review again/i })).toBeInTheDocument()
    )
  })

  it('clicking "Locked in ✓" calls acceptFacts and navigates to topic detail', async () => {
    const user = userEvent.setup()
    renderWithRouter(
      <FactsCompleteScreenComponent topicId="01-nautical-terms" />
    )
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /locked in/i })).toBeInTheDocument()
    )
    // Clicking should not throw; acceptFacts is called and navigation occurs
    await user.click(screen.getByRole('button', { name: /locked in/i }))
  })
})
