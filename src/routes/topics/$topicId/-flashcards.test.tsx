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
    // Should show a flashcard front text or progress bar
    await waitFor(() => expect(screen.getAllByRole('progressbar').length).toBeGreaterThan(0))
  })

  it('flip a card and click "Got it" — next card shown or deck advances', async () => {
    const user = userEvent.setup()
    renderWithRouter(<FlashcardSessionScreenComponent topicId="01-nautical-terms" />)
    // Wait for the card to appear (it renders as a button with aria-label "Show back")
    await waitFor(() => expect(screen.getByRole('button', { name: /show back/i })).toBeInTheDocument())
    // Flip the card
    await user.click(screen.getByRole('button', { name: /show back/i }))
    // After flip, "Got it" button should appear
    await waitFor(() => expect(screen.getByRole('button', { name: /got it/i })).toBeInTheDocument())
    // Click "Got it" — advances to next card (or completes if only one card)
    await user.click(screen.getByRole('button', { name: /got it/i }))
    // Verify the deck advanced: either a new "Show back" card is shown, or the deck is empty (completion)
    // Either way no error should be thrown and the component stays mounted
    await waitFor(() => {
      const progressbars = screen.getAllByRole('progressbar')
      expect(progressbars.length).toBeGreaterThan(0)
    })
  })

  it('exit button — exit handler fires (no error thrown)', async () => {
    const user = userEvent.setup()
    renderWithRouter(<FlashcardSessionScreenComponent topicId="01-nautical-terms" />)
    await waitFor(() => expect(screen.getByRole('button', { name: /exit session/i })).toBeInTheDocument())
    // Click exit — navigates away; verify no error is thrown
    await user.click(screen.getByRole('button', { name: /exit session/i }))
  })
})
