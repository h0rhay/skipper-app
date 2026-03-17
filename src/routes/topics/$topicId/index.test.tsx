import { render, screen } from '@testing-library/react'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { TopicDetailScreenComponent } from './index'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/topics/05-irpcs-colregs'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('TopicDetailScreen', () => {
  beforeEach(() => localStorage.clear())

  it('renders topic title for a known topicId', async () => {
    renderWithRouter(<TopicDetailScreenComponent topicId="05-irpcs-colregs" />)
    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/IRPCS/i)
  })

  it('renders study mode list', async () => {
    renderWithRouter(<TopicDetailScreenComponent topicId="05-irpcs-colregs" />)
    expect(await screen.findByText('Key Facts')).toBeInTheDocument()
    expect(await screen.findByText('Flashcards')).toBeInTheDocument()
    expect(await screen.findByText('MCQ Quiz')).toBeInTheDocument()
  })
})
