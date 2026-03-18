import { useState } from 'react'
import type { MCQQuestion } from '../types'

export function useMCQSession(_topicId: string, questions: MCQQuestion[]) {
  const [index, setIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [wrongIds, setWrongIds] = useState<string[]>([])

  const currentQuestion = questions[index] ?? null
  const isComplete = index >= questions.length
  const progress = questions.length === 0 ? 0 : index / questions.length
  const score = index - wrongIds.length
  const isCorrect = isRevealed && selectedIndex === currentQuestion?.correctIndex
  const explanation = isRevealed ? (currentQuestion?.explanation ?? '') : ''

  function select(i: number) {
    if (!isRevealed) setSelectedIndex(i)
  }

  function submit() {
    if (selectedIndex === null || isRevealed) return
    setIsRevealed(true)
    if (selectedIndex !== currentQuestion?.correctIndex) {
      setWrongIds(prev => [...prev, currentQuestion!.id])
    }
  }

  function next() {
    setIndex(i => i + 1)
    setSelectedIndex(null)
    setIsRevealed(false)
  }

  return { currentQuestion, selectedIndex, select, submit, next, isRevealed, isCorrect, explanation, progress, isComplete, score, wrongIds }
}
