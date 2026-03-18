import { render, screen } from '@testing-library/react'
import { storage } from '../../../services/storage'
import { TopicProgressDetail } from './TopicProgressDetail'

describe('TopicProgressDetail', () => {
  beforeEach(() => localStorage.clear())

  it('shows "Not started" for a topic with no progress', () => {
    render(<TopicProgressDetail topicId="01-nautical-terms" />)
    expect(screen.getAllByText(/not started/i).length).toBeGreaterThan(0)
  })

  it('shows mastered card count', () => {
    storage.set('progress', {
      userId: 'local', topics: {
        '01-nautical-terms': {
          factsRead: true, factsReadAt: '2026-03-17T00:00:00Z',
          flashcards: { masteredIds: ['fc-1','fc-2'], totalCards: 10, lastStudied: '2026-03-17T00:00:00Z' },
          mcq: { bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '' },
          navTools: {}
        }
      }
    })
    render(<TopicProgressDetail topicId="01-nautical-terms" />)
    expect(screen.getByText(/2.*10/)).toBeInTheDocument()
  })
})
