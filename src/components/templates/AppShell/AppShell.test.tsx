import { render, screen } from '@testing-library/react'
import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('renders children in content area', () => {
    render(<AppShell tabBar={<div>tabs</div>}>Hello</AppShell>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders the tab bar', () => {
    render(<AppShell tabBar={<div>tabs</div>}>content</AppShell>)
    expect(screen.getByText('tabs')).toBeInTheDocument()
  })
})
