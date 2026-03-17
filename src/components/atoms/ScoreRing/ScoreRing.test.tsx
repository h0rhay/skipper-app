import { render, screen } from '@testing-library/react'
import { ScoreRing } from './ScoreRing'

describe('ScoreRing', () => {
  it('displays percentage text', () => {
    render(<ScoreRing score={8} total={12} />)
    expect(screen.getByText('67%')).toBeInTheDocument()
  })

  it('displays 0% when total is 0', () => {
    render(<ScoreRing score={0} total={0} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('displays 100% for perfect score', () => {
    render(<ScoreRing score={10} total={10} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })
})
