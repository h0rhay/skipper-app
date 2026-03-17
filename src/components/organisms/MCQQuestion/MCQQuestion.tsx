import { OptionButton } from '../../atoms/OptionButton'
import { Button } from '../../atoms/Button'
import type { MCQQuestion as MCQQuestionType } from '../../../types'
import styles from './MCQQuestion.module.css'

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

export function MCQQuestion({ question, selectedIndex, isRevealed, isCorrect, explanation, onSelect, onSubmit, onNext }: MCQQuestionProps) {
  function getOptionState(i: number): 'idle' | 'selected' | 'correct' | 'wrong' {
    if (!isRevealed) return selectedIndex === i ? 'selected' : 'idle'
    if (i === question.correctIndex) return 'correct'
    if (i === selectedIndex) return 'wrong'
    return 'idle'
  }

  return (
    <div className={styles.container}>
      <div className={styles.questionCard}>
        <p className={styles.question}>{question.question}</p>
      </div>
      <div className={styles.options}>
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
      {isRevealed && explanation && (
        <div
          className={`${styles.explanation} ${isCorrect ? styles.correct : styles.wrong}`}
          data-state={isCorrect ? 'correct' : 'wrong'}
        >
          <p>{explanation}</p>
        </div>
      )}
      <div className={styles.actions}>
        {!isRevealed ? (
          <Button onClick={onSubmit} disabled={selectedIndex === null} fullWidth>Submit</Button>
        ) : (
          <Button onClick={onNext} fullWidth>Next →</Button>
        )}
      </div>
    </div>
  )
}
