import styles from './QuizQuestion.module.css'
import type { MCQQuestion } from '../../../types'

interface QuizQuestionProps {
  question: MCQQuestion
  questionNumber: number
  total: number
  selectedIndex: number | null
  revealed: boolean
  onSelect: (index: number) => void
  onSubmit: () => void
  onNext: () => void
  isLast: boolean
  topicLabel: string
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export function QuizQuestion({
  question, questionNumber, total, selectedIndex, revealed,
  onSelect, onSubmit, onNext, isLast, topicLabel
}: QuizQuestionProps) {
  const isCorrect = revealed && selectedIndex === question.correctIndex

  return (
    <div className={styles.container}>
      {/* Question block */}
      <div className={styles.questionBlock}>
        <span className={styles.questionLabel}>QUESTION {questionNumber}</span>
        <p className={styles.questionText}>{question.question}</p>
      </div>

      {/* Options */}
      <div className={styles.optionsList}>
        {question.options.map((option, i) => {
          const isSelected = selectedIndex === i
          const isCorrectOption = revealed && i === question.correctIndex
          const isWrongSelected = revealed && isSelected && !isCorrectOption

          return (
            <button
              key={i}
              className={`${styles.option} ${isSelected && !revealed ? styles.selected : ''} ${isCorrectOption ? styles.correct : ''} ${isWrongSelected ? styles.wrong : ''}`}
              onClick={() => onSelect(i)}
              disabled={revealed}
              data-state={isSelected ? 'selected' : 'default'}
            >
              <span className={`${styles.badge} ${isSelected && !revealed ? styles.badgeSelected : ''} ${isCorrectOption ? styles.badgeCorrect : ''} ${isWrongSelected ? styles.badgeWrong : ''}`}>
                {OPTION_LABELS[i]}
              </span>
              <span className={styles.optionText}>{option}</span>
            </button>
          )
        })}
      </div>

      {/* Explanation (shown after reveal) */}
      {revealed && (
        <div className={`${styles.explanation} ${isCorrect ? styles.explanationCorrect : styles.explanationWrong}`}>
          <span className={styles.explanationLabel}>{isCorrect ? 'CORRECT' : 'INCORRECT'}</span>
          <p className={styles.explanationText}>{question.explanation}</p>
        </div>
      )}

      {/* Action button */}
      <div className={styles.actions}>
        {!revealed ? (
          <button
            className={styles.submitBtn}
            onClick={onSubmit}
            disabled={selectedIndex === null}
          >
            Submit Answer
          </button>
        ) : (
          <button className={styles.nextBtn} onClick={onNext}>
            {isLast ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}
