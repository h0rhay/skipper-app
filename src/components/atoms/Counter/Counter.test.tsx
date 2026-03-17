import { render, screen } from '@testing-library/react'
import { Counter } from './Counter'

describe('Counter', () => {
  it('renders correct string', () => {
    render(<Counter current={3} total={12} />)
    expect(screen.getByText('Q 3 / 12')).toBeInTheDocument()
  })

  it('renders with custom prefix', () => {
    render(<Counter current={1} total={5} prefix="Step" />)
    expect(screen.getByText('Step 1 / 5')).toBeInTheDocument()
  })
})
