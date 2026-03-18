import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { MCQCompleteScreenComponent } from './mcq.complete'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/topics/05-irpcs-colregs/mcq/complete'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('MCQCompleteScreen', () => {
  beforeEach(() => localStorage.clear())

  it('shows "Accept Pass ✓" button when score >= 70% (7/10)', async () => {
    renderWithRouter(
      <MCQCompleteScreenComponent topicId="05-irpcs-colregs" score={7} total={10} />
    )
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /accept pass/i })).toBeInTheDocument()
    )
  })

  it('shows "Go for 100%" secondary button when passing but not perfect', async () => {
    renderWithRouter(
      <MCQCompleteScreenComponent topicId="05-irpcs-colregs" score={7} total={10} />
    )
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /go for 100/i })).toBeInTheDocument()
    )
  })

  it('shows "Try again" and "Accept anyway" when score < 70% (5/10)', async () => {
    renderWithRouter(
      <MCQCompleteScreenComponent topicId="05-irpcs-colregs" score={5} total={10} />
    )
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /accept anyway/i })).toBeInTheDocument()
    })
  })

  it('does not show "Accept Pass ✓" when failing', async () => {
    renderWithRouter(
      <MCQCompleteScreenComponent topicId="05-irpcs-colregs" score={5} total={10} />
    )
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /accept pass/i })).not.toBeInTheDocument()
    )
  })

  it('shows "Perfect score!" text when score === total', async () => {
    renderWithRouter(
      <MCQCompleteScreenComponent topicId="05-irpcs-colregs" score={10} total={10} />
    )
    await waitFor(() =>
      expect(screen.getByText(/perfect score/i)).toBeInTheDocument()
    )
  })

  it('does not show "Go for 100%" when perfect', async () => {
    renderWithRouter(
      <MCQCompleteScreenComponent topicId="05-irpcs-colregs" score={10} total={10} />
    )
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /go for 100/i })).not.toBeInTheDocument()
    )
  })

  it('shows correct score numbers', async () => {
    renderWithRouter(
      <MCQCompleteScreenComponent topicId="05-irpcs-colregs" score={7} total={10} />
    )
    await waitFor(() => {
      expect(screen.getByText('7')).toBeInTheDocument()
      expect(screen.getByText(/\/ 10/)).toBeInTheDocument()
    })
  })

  it('shows percentage', async () => {
    renderWithRouter(
      <MCQCompleteScreenComponent topicId="05-irpcs-colregs" score={7} total={10} />
    )
    await waitFor(() =>
      expect(screen.getByText('70%')).toBeInTheDocument()
    )
  })

  it('clicking "Accept Pass ✓" does not throw', async () => {
    const user = userEvent.setup()
    renderWithRouter(
      <MCQCompleteScreenComponent topicId="05-irpcs-colregs" score={7} total={10} />
    )
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /accept pass/i })).toBeInTheDocument()
    )
    await user.click(screen.getByRole('button', { name: /accept pass/i }))
  })

  it('clicking "Try again" does not throw', async () => {
    const user = userEvent.setup()
    renderWithRouter(
      <MCQCompleteScreenComponent topicId="05-irpcs-colregs" score={5} total={10} />
    )
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    )
    await user.click(screen.getByRole('button', { name: /try again/i }))
  })
})
