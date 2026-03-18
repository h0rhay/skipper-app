import type { Topic, TopicProgress } from '../../../types'

interface TopicHeaderProps {
  topic: Topic
  progress: TopicProgress | null
}

export function TopicHeader({ topic, progress }: TopicHeaderProps) {
  const factsCount = topic.keyTerms.length + topic.safetyNotes.length
  const termsCount = topic.flashcards.length
  const questionsCount = topic.mcqQuestions.length

  const masteredCards = progress?.flashcards.masteredIds.length ?? 0

  return (
    <div className="pt-5 flex flex-col gap-2">
      <span className="font-heading text-4xl font-medium text-primary tracking-[-0.5px]">
        {String(topic.number).padStart(2, '0')}
      </span>
      <h1 className="font-heading text-3xl font-medium text-navy tracking-[-1px] leading-[1.05]">
        {topic.title}
      </h1>
      <p className="text-md text-text-secondary leading-[1.5]">{topic.description}</p>
      {topic.isSafetyCritical && (
        <div className="inline-flex items-center gap-1.5 bg-danger/7 px-2 py-1 self-start">
          <span className="w-1.5 h-1.5 bg-danger shrink-0" />
          <span className="text-xs font-semibold text-danger tracking-[1px]">SAFETY CRITICAL TOPIC</span>
        </div>
      )}
      <div className="flex border border-border overflow-hidden mt-2">
        <div className="flex-1 flex flex-col gap-1 px-3 py-3.5 border-r border-border">
          <span className="font-heading text-2xl font-medium text-navy">{factsCount}</span>
          <span className="text-xs font-semibold text-text-muted tracking-[1px]">KEY FACTS</span>
        </div>
        <div className="flex-1 flex flex-col gap-1 px-3 py-3.5 border-r border-border">
          <span className="font-heading text-2xl font-medium text-navy">{masteredCards}/{termsCount}</span>
          <span className="text-xs font-semibold text-text-muted tracking-[1px]">TERMS</span>
        </div>
        <div className="flex-1 flex flex-col gap-1 px-3 py-3.5">
          <span className="font-heading text-2xl font-medium text-navy">{questionsCount}</span>
          <span className="text-xs font-semibold text-text-muted tracking-[1px]">QUESTIONS</span>
        </div>
      </div>
    </div>
  )
}
