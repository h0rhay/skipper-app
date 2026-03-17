import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { StudyModeList } from './StudyModeList'
import { storage } from '../../../services/storage'

describe('StudyModeList', () => {
  beforeEach(() => localStorage.clear())

  it('renders Key Facts, Flashcards, and MCQ rows', () => {
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={() => {}} />)
    expect(screen.getByText('Key Facts')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('MCQ Quiz')).toBeInTheDocument()
  })

  it('shows "Read" status for Key Facts when factsRead is true', () => {
    storage.set('progress', {
      userId: 'local',
      topics: { '05-irpcs-colregs': { factsRead: true, flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' }, mcq: { bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '' }, navTools: {} } }
    })
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={() => {}} />)
    expect(screen.getByText(/read/i)).toBeInTheDocument()
  })

  it('calls onModeSelect with mode when row clicked', async () => {
    const user = userEvent.setup()
    const onModeSelect = vi.fn()
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={onModeSelect} />)
    await user.click(screen.getByText('Key Facts'))
    expect(onModeSelect).toHaveBeenCalledWith('facts')
  })
})
