import { useState, useCallback, useRef } from 'react'
import type { MCQQuestion } from '../types'

export interface QuizItem {
  topicId: string
  topicTitle: string
  topicNumber: number
  question: MCQQuestion
}

export function useQuizSession(items: QuizItem[]) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const scoreRef = useRef(0)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const current = items[currentIndex]
  const isLastQuestion = currentIndex === items.length - 1
  const progress = items.length > 0 ? (currentIndex / items.length) : 0

  const selectOption = useCallback((index: number) => {
    if (!revealed) setSelectedIndex(index)
  }, [revealed])

  const submitAnswer = useCallback(() => {
    if (selectedIndex === null || revealed) return
    if (selectedIndex === items[currentIndex].question.correctIndex) {
      scoreRef.current += 1
      setScore(scoreRef.current)
    }
    setRevealed(true)
  }, [selectedIndex, revealed, currentIndex, items])

  const nextQuestion = useCallback(() => {
    if (!revealed) return
    if (isLastQuestion) {
      setIsComplete(true)
      return
    }
    setCurrentIndex(i => i + 1)
    setSelectedIndex(null)
    setRevealed(false)
  }, [revealed, isLastQuestion])

  return {
    current,
    currentIndex,
    total: items.length,
    selectedIndex,
    revealed,
    score,
    isLastQuestion,
    isComplete,
    progress,
    selectOption,
    submitAnswer,
    nextQuestion,
  }
}
