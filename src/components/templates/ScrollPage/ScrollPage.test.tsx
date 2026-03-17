import { render, screen } from '@testing-library/react'
import { ScrollPage } from './ScrollPage'

describe('ScrollPage', () => {
  it('renders header and children', () => {
    render(<ScrollPage header={<div>Header</div>}>Body content</ScrollPage>)
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })
})
