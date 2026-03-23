import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { QuizQuestion } from './QuizQuestion'

const mockQuestion = {
  id: 'q-001',
  question: 'Which vessel must give way in a crossing situation?',
  options: ['Stand-on vessel', 'Give-way vessel', 'Power vessel', 'Sail vessel'] as [string, string, string, string],
  correctIndex: 1 as 0 | 1 | 2 | 3,
  explanation: 'The give-way vessel must keep clear.'
}

describe('QuizQuestion', () => {
  it('renders question text', () => {
    render(<QuizQuestion question={mockQuestion} questionNumber={1} selectedIndex={null} revealed={false} onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} isLast={false}/>)
    expect(screen.getByText(/Which vessel must give way/i)).toBeInTheDocument()
  })

  it('renders all options', () => {
    render(<QuizQuestion question={mockQuestion} questionNumber={1} selectedIndex={null} revealed={false} onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} isLast={false}/>)
    expect(screen.getByText('Stand-on vessel')).toBeInTheDocument()
    expect(screen.getByText('Give-way vessel')).toBeInTheDocument()
  })

  it('submit button disabled when no selection', () => {
    render(<QuizQuestion question={mockQuestion} questionNumber={1} selectedIndex={null} revealed={false} onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} isLast={false}/>)
    expect(screen.getByText('Submit Answer')).toBeDisabled()
  })

  it('calls onSelect when option clicked', async () => {
    const onSelect = vi.fn()
    render(<QuizQuestion question={mockQuestion} questionNumber={1} selectedIndex={null} revealed={false} onSelect={onSelect} onSubmit={() => {}} onNext={() => {}} isLast={false}/>)
    await userEvent.setup().click(screen.getByText('Give-way vessel'))
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('shows explanation after reveal', () => {
    render(<QuizQuestion question={mockQuestion} questionNumber={1} selectedIndex={1} revealed={true} onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} isLast={false}/>)
    expect(screen.getByText('The give-way vessel must keep clear.')).toBeInTheDocument()
  })

  it('shows Next button after reveal', () => {
    render(<QuizQuestion question={mockQuestion} questionNumber={1} selectedIndex={1} revealed={true} onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} isLast={false}/>)
    expect(screen.getByText('Next Question →')).toBeInTheDocument()
  })

  it('shows See Results on last question after reveal', () => {
    render(<QuizQuestion question={mockQuestion} questionNumber={10} selectedIndex={1} revealed={true} onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} isLast={true}/>)
    expect(screen.getByText('See Results')).toBeInTheDocument()
  })

  it('shows QUESTION label with number', () => {
    render(<QuizQuestion question={mockQuestion} questionNumber={5} selectedIndex={null} revealed={false} onSelect={() => {}} onSubmit={() => {}} onNext={() => {}} isLast={false}/>)
    expect(screen.getByText('QUESTION 5')).toBeInTheDocument()
  })
})
