import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { MCQQuestion } from './MCQQuestion'
import type { MCQQuestion as MCQQuestionType } from '../../../types'

const Q: MCQQuestionType = {
  id: 'q-1',
  question: 'Which vessel is the give-way vessel?',
  options: ['The faster one', 'The vessel to port', 'The vessel required to keep out of the way', 'The stand-on vessel'],
  correctIndex: 2,
  explanation: 'The give-way vessel must take early action to keep well clear.',
}

describe('MCQQuestion', () => {
  it('renders the question text', () => {
    render(<MCQQuestion question={Q} selectedIndex={null} isRevealed={false} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByText(Q.question)).toBeInTheDocument()
  })

  it('renders all 4 options', () => {
    render(<MCQQuestion question={Q} selectedIndex={null} isRevealed={false} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    Q.options.forEach(opt => expect(screen.getByText(opt)).toBeInTheDocument())
  })

  it('Submit button is disabled before selection', () => {
    render(<MCQQuestion question={Q} selectedIndex={null} isRevealed={false} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()
  })

  it('Submit button enabled when an option is selected', () => {
    render(<MCQQuestion question={Q} selectedIndex={0} isRevealed={false} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled()
  })

  it('shows explanation when isRevealed', () => {
    render(<MCQQuestion question={Q} selectedIndex={2} isRevealed={true} isCorrect={true} explanation={Q.explanation} onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByText(Q.explanation)).toBeInTheDocument()
  })

  it('marks selected wrong option with wrong class', () => {
    render(<MCQQuestion question={Q} selectedIndex={0} isRevealed={true} isCorrect={false} explanation={Q.explanation} onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByText(Q.options[0]).closest('button')).toHaveClass('wrong')
    expect(screen.getByText(Q.options[2]).closest('button')).toHaveClass('correct')
  })

  it('shows Next button after reveal', () => {
    render(<MCQQuestion question={Q} selectedIndex={0} isRevealed={true} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} />)
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('calls onSubmit when Submit clicked', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<MCQQuestion question={Q} selectedIndex={0} isRevealed={false} isCorrect={false} explanation="" onSelect={() => {}} onSubmit={onSubmit} onNext={() => {}} />)
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it('calls onNext when Next clicked', async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()
    render(<MCQQuestion question={Q} selectedIndex={2} isRevealed={true} isCorrect={true} explanation="" onSelect={() => {}} onSubmit={() => {}} onNext={onNext} />)
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(onNext).toHaveBeenCalledOnce()
  })
})
