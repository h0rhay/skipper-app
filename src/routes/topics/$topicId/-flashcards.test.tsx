import { render, screen, waitFor } from '@testing-library/react'
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
    // Should show a flashcard front text or progress bar
    await waitFor(() => expect(screen.getAllByRole('progressbar').length).toBeGreaterThan(0))
  })
})
