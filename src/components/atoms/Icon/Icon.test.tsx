import { render } from '@testing-library/react'
import { Icon } from './Icon'

describe('Icon', () => {
  it('renders map icon without throwing', () => {
    expect(() => render(<Icon name="map" />)).not.toThrow()
  })

  it('renders study icon without throwing', () => {
    expect(() => render(<Icon name="study" />)).not.toThrow()
  })

  it('renders progress icon without throwing', () => {
    expect(() => render(<Icon name="progress" />)).not.toThrow()
  })

  it('renders warning icon without throwing', () => {
    expect(() => render(<Icon name="warning" />)).not.toThrow()
  })

  it('renders check icon without throwing', () => {
    expect(() => render(<Icon name="check" />)).not.toThrow()
  })
})
