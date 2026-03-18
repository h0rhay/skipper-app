import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { StudyModeList } from './StudyModeList'
import type { TopicProgress } from '../../../types'

const makeProgress = (overrides: Partial<TopicProgress> = {}): TopicProgress => ({
  factsRead: false,
  factsAccepted: false,
  flashcards: { masteredIds: [], totalCards: 0, lastStudied: '', accepted: false },
  mcq: { bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '', accepted: false },
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
    expect(screen.getByText('Read')).toBeInTheDocument()
  })

  it('calls onModeSelect with mode when row clicked', async () => {
    const user = userEvent.setup()
    const onModeSelect = vi.fn()
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={onModeSelect} progress={null} />)
    await user.click(screen.getByText('Key Facts'))
    expect(onModeSelect).toHaveBeenCalledWith('facts')
  })

  it('shows "Accepted ✓" for Key Facts row when factsAccepted is true', () => {
    const progress = makeProgress({ factsAccepted: true })
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={() => {}} progress={progress} />)
    expect(screen.getByText('Accepted ✓')).toBeInTheDocument()
  })

  it('shows MCQ prerequisite warning when neither factsAccepted nor flashcards.accepted is true', () => {
    const progress = makeProgress({ factsAccepted: false, flashcards: { masteredIds: [], totalCards: 0, lastStudied: '', accepted: false } })
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={() => {}} progress={progress} />)
    expect(screen.getByText(/complete facts and flashcards first/i)).toBeInTheDocument()
  })

  it('does NOT show MCQ prerequisite warning when both factsAccepted and flashcards.accepted are true', () => {
    const progress = makeProgress({ factsAccepted: true, flashcards: { masteredIds: [], totalCards: 0, lastStudied: '', accepted: true } })
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={() => {}} progress={progress} />)
    expect(screen.queryByText(/complete facts and flashcards first/i)).not.toBeInTheDocument()
  })
})
