import { createFileRoute, useNavigate, Outlet, useChildMatches } from '@tanstack/react-router'
import { useState } from 'react'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicProgress } from '../../../hooks/useTopicProgress'
import { ScrollPage } from '../../../components/templates/ScrollPage'
import { BackHeader } from '../../../components/molecules/BackHeader'
import { KeyTermRow } from '../../../components/molecules/KeyTermRow'
import { SafetyNote } from '../../../components/molecules/SafetyNote'
import { Button } from '../../../components/atoms/Button'
import { Label } from '../../../components/atoms/Label'
import { Divider } from '../../../components/atoms/Divider'
import { getHeroPath } from '../../../components/illustrations/paths'

export const Route = createFileRoute('/topics/$topicId/facts')({
  component: KeyFactsScreen,
})

interface KeyFactsScreenComponentProps { topicId: string }

export function KeyFactsScreenComponent({ topicId }: KeyFactsScreenComponentProps) {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { progress, markFactsRead } = useTopicProgress(topicId)

  const [openTerm, setOpenTerm] = useState<string | null>(null)

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  return (
    <ScrollPage header={<BackHeader label={topic.title} to={`/topics/${topicId}`} />}>
      <div className="flex flex-col gap-6">

        {/* Hero illustration */}
        <div className="w-full bg-bg-card border-b border-border">
          <img
            src={getHeroPath(topic.id)}
            alt={topic.title}
            className="w-full h-auto block max-h-[260px] object-contain p-4 box-border"
          />
        </div>

        {/* Summary */}
        <section className="flex flex-col gap-3">
          <Label>Summary</Label>
          <p className="text-base text-text-secondary leading-[1.7] m-0">{topic.summary}</p>
        </section>

        <Divider />

        {/* Key Terms */}
        {topic.keyTerms.length > 0 && (
          <section className="flex flex-col gap-3">
            <Label>Key Terms</Label>
            <div className="flex flex-col border border-border overflow-hidden">
              {topic.keyTerms.map((kt) => (
                <KeyTermRow
                  key={kt.term}
                  term={kt.term}
                  definition={kt.definition}
                  isOpen={openTerm === kt.term}
                  onToggle={() => setOpenTerm(openTerm === kt.term ? null : kt.term)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Safety Notes */}
        {topic.safetyNotes.length > 0 && (
          <>
            <Divider />
            <section className="flex flex-col gap-3">
              <Label>Safety-Critical Notes</Label>
              <div className="flex flex-col gap-2">
                {topic.safetyNotes.map((note) => (
                  <SafetyNote key={note} note={note} />
                ))}
              </div>
            </section>
          </>
        )}

        <Divider />

        {/* Mark as read */}
        <div className="pb-4">
          <Button
            onClick={() => {
              markFactsRead()
              navigate({ to: '/topics/$topicId/facts/complete', params: { topicId } })
            }}
            fullWidth
          >
            {progress?.factsRead ? 'Read ✓' : 'Mark as Read'}
          </Button>
        </div>

      </div>
    </ScrollPage>
  )
}

function KeyFactsScreen() {
  const { topicId } = Route.useParams()
  const childMatches = useChildMatches()
  if (childMatches.length > 0) return <Outlet />
  return <KeyFactsScreenComponent topicId={topicId} />
}
