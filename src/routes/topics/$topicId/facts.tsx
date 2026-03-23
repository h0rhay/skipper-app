import { createFileRoute, useNavigate, Outlet, useChildMatches } from '@tanstack/react-router'
import { useState } from 'react'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicProgress } from '../../../hooks/useTopicProgress'
import { useImagePreload } from '../../../hooks/useImagePreload'
import { AppShell } from '../../../components/templates/AppShell'
import { ScrollPage } from '../../../components/templates/ScrollPage'
import { TabBar } from '../../../components/organisms/TabBar'
import { BackHeader } from '../../../components/molecules/BackHeader'
import { KeyTermRow } from '../../../components/molecules/KeyTermRow'
import { SafetyNote } from '../../../components/molecules/SafetyNote'
import { Button } from '../../../components/atoms/Button'
import { Label } from '../../../components/atoms/Label'
import { Divider } from '../../../components/atoms/Divider'
import { getHeroPath, getHeroPlaceholder, getTermPath, getTermPlaceholder } from '../../../components/illustrations/paths'
import { ProgressiveImg } from '../../../components/atoms/ProgressiveImg/ProgressiveImg'

export const Route = createFileRoute('/topics/$topicId/facts')({
  component: KeyFactsScreen,
})

interface KeyFactsScreenComponentProps { topicId: string }

export function KeyFactsScreenComponent({ topicId }: KeyFactsScreenComponentProps) {
  const navigate = useNavigate()
  const preload = useImagePreload()
  const { topics } = useTopics()
  const { progress, update } = useTopicProgress(topicId)

  const [openTerm, setOpenTerm] = useState<string | null>(null)

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  function handleTermToggle(term: string) {
    const next = openTerm === term ? null : term
    setOpenTerm(next)
    // When opening a term, preload the next term in the list that has an image
    if (next) {
      const idx = topic!.keyTerms.findIndex(kt => kt.term === next)
      const nextTerm = topic!.keyTerms[idx + 1]?.term
      if (nextTerm) preload([getTermPath(nextTerm), getTermPlaceholder(nextTerm)])
    }
  }

  return (
    <AppShell tabBar={<TabBar active="study" />}>
    <ScrollPage header={<BackHeader label={topic.title} to="/topics/$topicId" params={{ topicId }} />}>
      <div className="flex flex-col gap-6">

        {/* Hero illustration */}
        <div className="w-full bg-bg-card border-b border-border">
          <ProgressiveImg
            src={getHeroPath(topic.id)}
            lqip={getHeroPlaceholder(topic.id)}
            alt={topic.title}
            width={1024}
            height={1024}
            className="max-h-[260px] object-contain p-4 box-border"
          />
        </div>

        {/* Summary */}
        <section className="flex flex-col gap-3">
          <Label>Summary</Label>
          <p className="text-base text-text-secondary leading-[1.7] m-0 whitespace-pre-line">{topic.summary}</p>
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
                  onToggle={() => handleTermToggle(kt.term)}
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
              update({ factsRead: true })
              navigate({ to: '/topics/$topicId/facts/complete', params: { topicId } })
            }}
            fullWidth
          >
            {progress?.factsRead ? 'Read ✓' : 'Mark as Read'}
          </Button>
        </div>

      </div>
    </ScrollPage>
    </AppShell>
  )
}

function KeyFactsScreen() {
  const { topicId } = Route.useParams()
  const childMatches = useChildMatches()
  if (childMatches.length > 0) return <Outlet />
  return <KeyFactsScreenComponent topicId={topicId} />
}
