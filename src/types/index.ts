export interface KeyTerm {
  term: string
  definition: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface MCQQuestion {
  id: string
  question: string
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  explanation: string
}

export interface Topic {
  id: string
  number: number
  title: string
  description: string
  isSafetyCritical: boolean
  summary: string
  keyTerms: KeyTerm[]
  safetyNotes: string[]
  flashcards: Flashcard[]
  mcqQuestions: MCQQuestion[]
  navTools: string[]
  svgDiagramId?: string
}

export type TopicCompletionStatus = 'none' | 'partial' | 'complete'
export type SessionMode = 'flashcards' | 'mcq' | 'nav'

export interface FlashcardProgress {
  masteredIds: string[]
  totalCards: number
  lastStudied: string
}

export interface MCQProgress {
  bestScore: number
  totalQuestions: number
  wrongIds: string[]
  lastStudied: string
}

export interface NavToolProgress {
  attempts: number
  bestScore: number
  totalQuestions: number
}

export interface TopicProgress {
  factsRead: boolean
  factsReadAt?: string
  flashcards: FlashcardProgress
  mcq: MCQProgress
  navTools: Record<string, NavToolProgress>
}

export interface UserProgress {
  userId: string
  topics: Record<string, TopicProgress>
}

export interface Session {
  id: string
  topicId: string
  mode: SessionMode
  toolId: string | null
  startedAt: string
  completedAt: string
  score: number
  total: number
  wrongIds: string[]
}
