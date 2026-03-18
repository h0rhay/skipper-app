import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { FlashcardSessionScreenComponent } from './flashcards'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('FlashcardSessionScreen', () => {
  beforeEach(() => localStorage.clear())

  it('renders the flashcard deck for a topic with flashcards', async () => {
    renderWithRouter(<FlashcardSessionScreenComponent topicId="01-nautical-terms" />)
    await waitFor(() => expect(screen.getAllByRole('progressbar').length).toBeGreaterThan(0))
  })

  it('flip a card and click Next — next card shown or deck advances', async () => {
    const user = userEvent.setup()
    renderWithRouter(<FlashcardSessionScreenComponent topicId="01-nautical-terms" />)
    await waitFor(() => expect(screen.getByRole('button', { name: /show back/i })).toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: /show back/i }))
    await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: /next/i }))
    await waitFor(() => expect(screen.getAllByRole('progressbar').length).toBeGreaterThan(0))
  })

  it('exit button fires without error', async () => {
    const user = userEvent.setup()
    renderWithRouter(<FlashcardSessionScreenComponent topicId="01-nautical-terms" />)
    await waitFor(() => expect(screen.getByRole('button', { name: /exit session/i })).toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: /exit session/i }))
  })
})
