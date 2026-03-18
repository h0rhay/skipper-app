import { OptionButton } from '../../atoms/OptionButton'
import { Button } from '../../atoms/Button'
import { Divider } from '../../atoms/Divider'
import type { MCQQuestion as MCQQuestionType } from '../../../types'

interface MCQQuestionProps {
  question: MCQQuestionType
  selectedIndex: number | null
  isRevealed: boolean
  isCorrect: boolean
  explanation: string
  onSelect: (index: number) => void
  onSubmit: () => void
  onNext: () => void
}

export function MCQQuestion({ question, selectedIndex, isRevealed, onSelect, onSubmit, onNext }: MCQQuestionProps) {
  function getOptionState(i: number): 'idle' | 'selected' | 'correct' | 'wrong' {
    if (!isRevealed) return selectedIndex === i ? 'selected' : 'idle'
    if (i === question.correctIndex) return 'correct'
    if (i === selectedIndex) return 'wrong'
    return 'idle'
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-bg-muted border border-border p-5">
        <p className="font-heading text-lg font-medium leading-[1.35] text-navy m-0">{question.question}</p>
      </div>
      <Divider />
      <div className="flex flex-col border border-border overflow-hidden">
        {question.options.map((opt, i) => (
          <OptionButton
            key={i}
            label={String.fromCharCode(65 + i)}
            text={opt}
            state={getOptionState(i)}
            onClick={() => !isRevealed && onSelect(i)}
          />
        ))}
      </div>
      <div>
        {!isRevealed ? (
          <Button onClick={onSubmit} disabled={selectedIndex === null} fullWidth>Submit</Button>
        ) : (
          <Button onClick={onNext} fullWidth>Next →</Button>
        )}
      </div>
    </div>
  )
}
