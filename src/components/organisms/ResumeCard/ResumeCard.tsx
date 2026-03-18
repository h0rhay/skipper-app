import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useSessionHistory } from '../../../hooks/useSessionHistory'
import { useTopics } from '../../../hooks/useTopics'
import { storage } from '../../../services/storage'
import type { UserProgress, TopicProgress } from '../../../types'

function getNextStep(tp: TopicProgress | undefined): 'facts' | 'flashcards' | 'mcq' | null {
  if (!tp?.factsAccepted) return 'facts'
  if (!tp.flashcards.accepted) return 'flashcards'
  if (!tp.mcq.accepted) return 'mcq'
  return null // topic complete
}

export function ResumeCard() {
  const { sessions } = useSessionHistory()
  const { topics } = useTopics()

  const lastSession = sessions.at(-1)
  if (!lastSession) return null

  const topic = topics.find(t => t.id === lastSession.topicId)
  if (!topic) return null

  const userProgress = storage.get<UserProgress>('progress', { userId: 'local', topics: {}, currentStreak: 0, lastStudiedDate: '', longestStreak: 0 })
  const tp = userProgress?.topics[topic.id]
  const nextStep = getNextStep(tp)

  // If topic is fully complete, find the first incomplete topic
  let resumeTopic = topic
  let resumeStep = nextStep
  if (!nextStep) {
    for (const t of topics) {
      const step = getNextStep(userProgress?.topics[t.id])
      if (step) { resumeTopic = t; resumeStep = step; break }
    }
  }

  if (!resumeStep) return null

  const toMap = { facts: '/topics/$topicId/facts', flashcards: '/topics/$topicId/flashcards', mcq: '/topics/$topicId/mcq' } as const
  const labelMap = { facts: 'Key Facts', flashcards: 'Flashcards', mcq: 'MCQ Quiz' }
  const countMap = {
    facts: `${resumeTopic.keyTerms?.length ?? 0} key terms`,
    flashcards: `${resumeTopic.flashcards.length} cards`,
    mcq: `${resumeTopic.mcqQuestions.length} questions`,
  }

  return (
    <Link
      to={toMap[resumeStep]}
      params={{ topicId: resumeTopic.id }}
      className="flex items-center gap-3 bg-sand-gradient px-6 py-4 no-underline"
    >
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-[1px]">Continue where you left off</span>
        <span className="text-base font-bold text-navy whitespace-nowrap overflow-hidden text-ellipsis">
          {String(resumeTopic.number).padStart(2, '0')} — {resumeTopic.title}
        </span>
        <span className="text-sm text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
          {labelMap[resumeStep]} · {countMap[resumeStep]}
        </span>
      </div>
      <ArrowRight size={20} className="text-primary shrink-0" aria-hidden="true" />
    </Link>
  )
}
