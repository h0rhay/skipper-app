import { render, screen } from '@testing-library/react'
import { TopicHeader } from './TopicHeader'
import type { Topic } from '../../../types'

describe('TopicHeader', () => {
  const topic: Topic = {
    id: '05-irpcs-colregs', number: 5, title: 'IRPCS / COLREGS',
    description: 'Rules of the road.', isSafetyCritical: true,
    summary: '', keyTerms: [], safetyNotes: [], flashcards: [], mcqQuestions: [], navTools: [],
  }

  it('renders topic number and title', () => {
    render(<TopicHeader topic={topic} progress={null} />)
    expect(screen.getByText('05')).toBeInTheDocument()
    expect(screen.getByText('IRPCS / COLREGS')).toBeInTheDocument()
  })

  it('shows safety-critical badge', () => {
    render(<TopicHeader topic={topic} progress={null} />)
    expect(screen.getByText(/safety/i)).toBeInTheDocument()
  })

  it('shows description', () => {
    render(<TopicHeader topic={topic} progress={null} />)
    expect(screen.getByText('Rules of the road.')).toBeInTheDocument()
  })
})
