import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { KeyFactsScreenComponent } from './facts'
import { storage } from '../../../services/storage'
import type { UserProgress } from '../../../types'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/topics/01-nautical-terms/facts'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('KeyFactsScreen', () => {
  beforeEach(() => localStorage.clear())

  it('renders the topic summary', async () => {
    renderWithRouter(<KeyFactsScreenComponent topicId="01-nautical-terms" />)
    await waitFor(() => expect(screen.getByText(/summary/i)).toBeInTheDocument())
  })

  it('renders key terms section', async () => {
    renderWithRouter(<KeyFactsScreenComponent topicId="01-nautical-terms" />)
    await waitFor(() => expect(screen.getByText(/key terms/i)).toBeInTheDocument())
  })

  it('renders safety notes section when topic is safety critical', async () => {
    renderWithRouter(<KeyFactsScreenComponent topicId="05-irpcs-colregs" />)
    await waitFor(() => expect(screen.getByText(/safety/i)).toBeInTheDocument())
  })

  it('renders "Mark as Read" button', async () => {
    renderWithRouter(<KeyFactsScreenComponent topicId="01-nautical-terms" />)
    await waitFor(() => expect(screen.getByRole('button', { name: /mark as read/i })).toBeInTheDocument())
  })

  it('calls markFactsRead on button click', async () => {
    const user = userEvent.setup()
    renderWithRouter(<KeyFactsScreenComponent topicId="01-nautical-terms" />)
    await waitFor(() => screen.getByRole('button', { name: /mark as read/i }))
    await user.click(screen.getByRole('button', { name: /mark as read/i }))
    const stored = storage.get<UserProgress>('progress', { userId: 'local', topics: {} })
    expect(stored?.topics['01-nautical-terms']?.factsRead).toBe(true)
  })

  it('"Mark as Read" shows "Read ✓" after clicking', async () => {
    const user = userEvent.setup()
    renderWithRouter(<KeyFactsScreenComponent topicId="01-nautical-terms" />)
    await waitFor(() => screen.getByRole('button', { name: /mark as read/i }))
    await user.click(screen.getByRole('button', { name: /mark as read/i }))
    await waitFor(() => expect(screen.getByRole('button', { name: /read/i })).toBeInTheDocument())
  })
})
