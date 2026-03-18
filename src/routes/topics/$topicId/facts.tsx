import { createFileRoute, useNavigate } from '@tanstack/react-router'
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
import styles from '../../../styles/screens/key-facts.module.css'

export const Route = createFileRoute('/topics/$topicId/facts')({
  component: KeyFactsScreen,
})

interface KeyFactsScreenComponentProps { topicId: string }

export function KeyFactsScreenComponent({ topicId }: KeyFactsScreenComponentProps) {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { progress, markFactsRead } = useTopicProgress(topicId)

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  return (
    <ScrollPage header={<BackHeader label={topic.title} to={`/topics/${topicId}`} />}>
      <div className={styles.content}>

        {/* Hero illustration */}
        <div className={styles.heroWrapper}>
          <img
            src={getHeroPath(topic.id)}
            alt={topic.title}
            className={styles.heroImage}
          />
        </div>

        {/* Summary */}
        <section className={styles.section}>
          <Label>Summary</Label>
          <p className={styles.summary}>{topic.summary}</p>
        </section>

        <Divider />

        {/* Key Terms */}
        {topic.keyTerms.length > 0 && (
          <section className={styles.section}>
            <Label>Key Terms</Label>
            <div className={styles.termsList}>
              {topic.keyTerms.map((kt) => (
                <KeyTermRow key={kt.term} term={kt.term} definition={kt.definition} />
              ))}
            </div>
          </section>
        )}

        {/* Safety Notes */}
        {topic.safetyNotes.length > 0 && (
          <>
            <Divider />
            <section className={styles.section}>
              <Label>Safety-Critical Notes</Label>
              <div className={styles.safetyList}>
                {topic.safetyNotes.map((note) => (
                  <SafetyNote key={note} note={note} />
                ))}
              </div>
            </section>
          </>
        )}

        <Divider />

        {/* Mark as read */}
        <div className={styles.markReadSection}>
          <Button
            onClick={() => {
              markFactsRead()
              navigate({ to: `/topics/${topicId}` })
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
  return <KeyFactsScreenComponent topicId={topicId} />
}
