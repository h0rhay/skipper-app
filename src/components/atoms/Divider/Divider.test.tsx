import { render, screen } from '@testing-library/react'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders with role separator', () => {
    render(<Divider />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
