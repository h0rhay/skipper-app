import { useWeakTopics } from '../../../hooks'
import { useTopics } from '../../../hooks/useTopics'
import { TopicRow } from '../../molecules/TopicRow'
import { Label } from '../../atoms/Label'
import styles from './WeakTopicsList.module.css'

export function WeakTopicsList({ onTopicClick }: { onTopicClick: (id: string) => void }) {
  const { weakTopics } = useWeakTopics()
  const { topics } = useTopics()
  if (weakTopics.length === 0) return null

  return (
    <section className={styles.section}>
      <Label>Needs work</Label>
      {weakTopics.map(weak => {
        const t = topics.find(t => t.id === weak.id)
        if (!t) return null
        return (
          <TopicRow key={t.id} number={t.number} title={t.title} status="partial"
            isSafetyCritical={t.isSafetyCritical} onClick={() => onTopicClick(t.id)} />
        )
      })}
    </section>
  )
}
