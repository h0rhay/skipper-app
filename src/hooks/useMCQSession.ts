import { useState, useCallback, useMemo } from 'react'
import type { MCQQuestion } from '../types'

export function useMCQSession(_topicId: string, questions: MCQQuestion[]) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [wrongIds, setWrongIds] = useState<string[]>([])

  const currentQuestion = useMemo(
    () => (currentIndex < questions.length ? questions[currentIndex] : null),
    [questions, currentIndex]
  )

  const isComplete = currentIndex >= questions.length

  const isCorrect = useMemo(() => {
    if (!isAnswered || !currentQuestion) return null
    return selectedIndex === currentQuestion.correctIndex
  }, [isAnswered, currentQuestion, selectedIndex])

  const selectAnswer = useCallback((index: number) => {
    if (!isAnswered) {
      setSelectedIndex(index)
    }
  }, [isAnswered])

  const confirmAnswer = useCallback(() => {
    if (selectedIndex === null || !currentQuestion || isAnswered) return
    setIsAnswered(true)
    if (selectedIndex === currentQuestion.correctIndex) {
      setScore(prev => prev + 1)
    } else {
      setWrongIds(prev => [...prev, currentQuestion.id])
    }
  }, [selectedIndex, currentQuestion, isAnswered])

  const nextQuestion = useCallback(() => {
    setCurrentIndex(prev => prev + 1)
    setSelectedIndex(null)
    setIsAnswered(false)
  }, [])

  return {
    currentIndex,
    currentQuestion,
    selectedIndex,
    isAnswered,
    isCorrect,
    isComplete,
    score,
    wrongIds,
    totalQuestions: questions.length,
    selectAnswer,
    confirmAnswer,
    nextQuestion,
  }
}
