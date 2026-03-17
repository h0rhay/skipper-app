import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { StudyModeList } from './StudyModeList'
import type { TopicProgress } from '../../../types'

const makeProgress = (overrides: Partial<TopicProgress> = {}): TopicProgress => ({
  factsRead: false,
  flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' },
  mcq: { bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '' },
  navTools: {},
  ...overrides,
})

describe('StudyModeList', () => {
  it('renders Key Facts, Flashcards, and MCQ rows', () => {
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={() => {}} progress={null} />)
    expect(screen.getByText('Key Facts')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('MCQ Quiz')).toBeInTheDocument()
  })

  it('shows "Read" status for Key Facts when factsRead is true', () => {
    const progress = makeProgress({ factsRead: true })
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={() => {}} progress={progress} />)
    expect(screen.getByText(/read/i)).toBeInTheDocument()
  })

  it('calls onModeSelect with mode when row clicked', async () => {
    const user = userEvent.setup()
    const onModeSelect = vi.fn()
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={onModeSelect} progress={null} />)
    await user.click(screen.getByText('Key Facts'))
    expect(onModeSelect).toHaveBeenCalledWith('facts')
  })
})
