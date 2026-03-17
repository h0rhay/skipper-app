import { render, screen } from '@testing-library/react'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { TopicProgressScreenComponent } from './$topicId'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/progress/01-nautical-terms'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('TopicProgressScreen', () => {
  beforeEach(() => localStorage.clear())

  it('renders "Topic not found" for an unknown topicId', async () => {
    renderWithRouter(<TopicProgressScreenComponent topicId="unknown-topic" />)
    expect(await screen.findByText(/topic not found/i)).toBeInTheDocument()
  })

  it('renders TopicProgressDetail for a known topicId', async () => {
    renderWithRouter(<TopicProgressScreenComponent topicId="01-nautical-terms" />)
    expect(await screen.findByText(/not started/i)).toBeInTheDocument()
  })
})
