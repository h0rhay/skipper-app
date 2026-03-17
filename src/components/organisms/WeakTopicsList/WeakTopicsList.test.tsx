import { render, screen } from '@testing-library/react'
import { storage } from '../../../services/storage'
import { WeakTopicsList } from './WeakTopicsList'

describe('WeakTopicsList', () => {
  beforeEach(() => localStorage.clear())

  it('renders nothing when no weak topics', () => {
    const { container } = render(<WeakTopicsList onTopicClick={() => {}} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders weak topics when MCQ score < 70%', () => {
    storage.set('progress', {
      userId: 'local', topics: {
        '05-irpcs-colregs': {
          factsRead: false,
          flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' },
          mcq: { bestScore: 3, totalQuestions: 12, wrongIds: [], lastStudied: '2026-03-17T00:00:00Z' },
          navTools: {}
        }
      }
    })
    render(<WeakTopicsList onTopicClick={() => {}} />)
    expect(screen.getByText(/irpcs/i)).toBeInTheDocument()
  })
})
