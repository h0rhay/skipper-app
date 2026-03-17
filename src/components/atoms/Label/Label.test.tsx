import { render, screen } from '@testing-library/react'
import { Label } from './Label'

describe('Label', () => {
  it('renders its text', () => {
    render(<Label>Topic</Label>)
    expect(screen.getByText('Topic')).toBeInTheDocument()
  })
})
