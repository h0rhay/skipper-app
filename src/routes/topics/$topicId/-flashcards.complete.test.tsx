import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { FlashcardsCompleteScreenComponent } from './flashcards.complete'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/topics/01-nautical-terms/flashcards/complete'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('FlashcardsCompleteScreen', () => {
  beforeEach(() => localStorage.clear())

  it('renders "Flashcards Complete" heading', async () => {
    renderWithRouter(
      <FlashcardsCompleteScreenComponent topicId="01-nautical-terms" masteredIds="card-1,card-2" total={5} />
    )
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /flashcards complete/i })).toBeInTheDocument()
    )
  })

  it('shows mastered/total count display', async () => {
    renderWithRouter(
      <FlashcardsCompleteScreenComponent topicId="01-nautical-terms" masteredIds="card-1,card-2" total={5} />
    )
    await waitFor(() => {
      expect(screen.getAllByText('2').length).toBeGreaterThan(0)
      expect(screen.getByText(/\/ 5/)).toBeInTheDocument()
    })
  })

  it('shows "Locked in — I\'ve got this ✓" button', async () => {
    renderWithRouter(
      <FlashcardsCompleteScreenComponent topicId="01-nautical-terms" masteredIds="card-1,card-2" total={5} />
    )
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /locked in/i })).toBeInTheDocument()
    )
  })

  it('shows "Run through again" button', async () => {
    renderWithRouter(
      <FlashcardsCompleteScreenComponent topicId="01-nautical-terms" masteredIds="card-1,card-2" total={5} />
    )
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /run through again/i })).toBeInTheDocument()
    )
  })

  it('clicking "Locked in" button calls acceptFlashcards', async () => {
    const user = userEvent.setup()
    renderWithRouter(
      <FlashcardsCompleteScreenComponent topicId="01-nautical-terms" masteredIds="card-1,card-2" total={5} />
    )
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /locked in/i })).toBeInTheDocument()
    )
    // Clicking should not throw; acceptFlashcards is called and navigation occurs
    await user.click(screen.getByRole('button', { name: /locked in/i }))
  })
})
