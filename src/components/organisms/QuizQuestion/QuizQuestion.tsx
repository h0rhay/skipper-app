import { cn } from '#/lib/utils'
import { Divider } from '../../atoms/Divider'
import type { MCQQuestion } from '../../../types'

interface QuizQuestionProps {
  question: MCQQuestion
  questionNumber: number
  selectedIndex: number | null
  revealed: boolean
  onSelect: (index: number) => void
  onSubmit: () => void
  onNext: () => void
  isLast: boolean
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export function QuizQuestion({
  question, questionNumber, selectedIndex, revealed,
  onSelect, onSubmit, onNext, isLast
}: QuizQuestionProps) {
  const isCorrect = revealed && selectedIndex === question.correctIndex

  return (
    <div className="flex flex-col gap-5 px-6 pb-8 pt-5">
      {/* Question block */}
      <div className="bg-bg border border-border p-5 flex flex-col gap-3">
        <span className="font-body text-xs font-bold text-text-muted tracking-[1.5px] uppercase">QUESTION {questionNumber}</span>
        <p className="font-heading text-lg font-medium text-text leading-[1.35] m-0">{question.question}</p>
      </div>

      <Divider />

      {/* Options */}
      <div className="flex flex-col border border-border">
        {question.options.map((option, i) => {
          const isSelected = selectedIndex === i
          const isCorrectOption = revealed && i === question.correctIndex
          const isWrongSelected = revealed && isSelected && !isCorrectOption

          return (
            <button
              key={i}
              className={cn(
                'flex items-center gap-3 px-4 py-[14px] bg-bg-card border-none border-b border-border text-left cursor-pointer w-full transition-[background] duration-100 last:border-b-0',
                isSelected && !revealed && 'bg-primary-bg',
                isCorrectOption && 'bg-success-bg',
                isWrongSelected && 'bg-[var(--color-error-bg)]',
                !isSelected && !isCorrectOption && !isWrongSelected && 'hover:not-disabled:bg-bg-muted',
                revealed && 'cursor-default'
              )}
              onClick={() => onSelect(i)}
              disabled={revealed}
              data-state={isSelected ? 'selected' : 'default'}
            >
              <span className={cn(
                'w-7 h-7 min-w-[28px] flex items-center justify-center border border-text-secondary font-heading text-md font-medium text-text-secondary',
                isSelected && !revealed && 'bg-primary border-primary text-white',
                isCorrectOption && 'bg-success border-success text-white',
                isWrongSelected && 'bg-error border-error text-white'
              )}>
                {OPTION_LABELS[i]}
              </span>
              <span className="font-body text-md text-text leading-[1.4]">{option}</span>
            </button>
          )
        })}
      </div>

      {/* Explanation (shown after reveal) */}
      {revealed && (
        <div className={cn(
          'p-4 flex flex-col gap-1',
          isCorrect
            ? 'bg-success-bg border-2 border-success'
            : 'bg-[var(--color-error-bg)] border-2 border-danger'
        )}>
          <span className={cn(
            'font-body text-[11px] font-bold tracking-[1.5px] uppercase',
            isCorrect ? 'text-success' : 'text-danger'
          )}>{isCorrect ? 'CORRECT' : 'INCORRECT'}</span>
          <p className="font-body text-md text-text-body leading-[1.5] m-0">{question.explanation}</p>
        </div>
      )}

      {/* Action button */}
      <div>
        {!revealed ? (
          <button
            className="w-full h-[52px] bg-bg-card border border-border font-body text-base font-bold text-text cursor-pointer transition-[background] duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:bg-bg-muted"
            onClick={onSubmit}
            disabled={selectedIndex === null}
          >
            Submit Answer
          </button>
        ) : (
          <button
            className="w-full h-[52px] bg-primary border-none font-body text-base font-bold text-white cursor-pointer transition-[background] duration-150 hover:bg-[var(--color-primary-hover)]"
            onClick={onNext}
          >
            {isLast ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}
