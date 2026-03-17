import { useWeakTopics } from '../../../hooks'
import { TopicRow } from '../../molecules/TopicRow'
import { Label } from '../../atoms/Label'
import styles from './WeakTopicsList.module.css'

export function WeakTopicsList({ onTopicClick }: { onTopicClick: (id: string) => void }) {
  const { weakTopics } = useWeakTopics()
  if (weakTopics.length === 0) return null

  return (
    <section className={styles.section}>
      <Label>Needs work</Label>
      {weakTopics.map(weak => (
        <TopicRow key={weak.id} number={weak.number} title={weak.title} status="partial"
          isSafetyCritical={weak.isSafetyCritical} onClick={() => onTopicClick(weak.id)} />
      ))}
    </section>
  )
}
