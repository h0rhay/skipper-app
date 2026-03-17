import { useState, useCallback, useMemo, useRef } from 'react'
import type { MCQQuestion } from '../types'

export function useMCQSession(
  _topicId: string,
  allQuestions: MCQQuestion[],
  questionIds?: string[]
) {
  const questions = useMemo(() => {
    if (questionIds && questionIds.length > 0) {
      return allQuestions.filter(q => questionIds.includes(q.id))
    }
    return allQuestions
  }, [allQuestions, questionIds])

  const [index, setIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [wrongIds, setWrongIds] = useState<string[]>([])

  // Refs to always have current values in callbacks
  const selectedIndexRef = useRef<number | null>(null)
  const isRevealedRef = useRef(false)
  const indexRef = useRef(0)

  const currentQuestion = questions[index] ?? null
  const isComplete = index >= questions.length
  const progress = questions.length === 0 ? 0 : index / questions.length
  const score = index - wrongIds.length
  const isCorrect = isRevealed && selectedIndex === currentQuestion?.correctIndex
  const explanation = isRevealed ? (currentQuestion?.explanation ?? '') : ''

  const select = useCallback((i: number) => {
    if (!isRevealedRef.current) {
      setSelectedIndex(i)
      selectedIndexRef.current = i
    }
  }, [])

  const submit = useCallback(() => {
    if (selectedIndexRef.current === null || isRevealedRef.current) return
    setIsRevealed(true)
    isRevealedRef.current = true
    const currentQ = questions[indexRef.current] ?? null
    if (selectedIndexRef.current !== currentQ?.correctIndex) {
      setWrongIds(prev => [...prev, currentQ!.id])
    }
  }, [questions])

  const next = useCallback(() => {
    setIndex(i => {
      const newIndex = i + 1
      indexRef.current = newIndex
      return newIndex
    })
    setSelectedIndex(null)
    selectedIndexRef.current = null
    setIsRevealed(false)
    isRevealedRef.current = false
  }, [])

  return {
    currentQuestion, selectedIndex, select, submit, next,
    isRevealed, isCorrect, explanation,
    progress, isComplete, score, wrongIds,
  }
}
