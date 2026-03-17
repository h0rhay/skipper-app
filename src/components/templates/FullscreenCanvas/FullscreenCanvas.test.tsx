import { render, screen } from '@testing-library/react'
import { FullscreenCanvas } from './FullscreenCanvas'

describe('FullscreenCanvas', () => {
  it('renders header and canvas area', () => {
    render(<FullscreenCanvas header={<span>Dead Reckoning</span>}><svg data-testid="canvas-content" /></FullscreenCanvas>)
    expect(screen.getByText('Dead Reckoning')).toBeInTheDocument()
    expect(screen.getByTestId('canvas-content')).toBeInTheDocument()
  })
})
