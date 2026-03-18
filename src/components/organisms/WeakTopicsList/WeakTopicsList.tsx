import { useWeakTopics } from '../../../hooks'
import { TopicRow } from '../../molecules/TopicRow'
import { Label } from '../../atoms/Label'

export function WeakTopicsList({ onTopicClick }: { onTopicClick: (id: string) => void }) {
  const { weakTopics } = useWeakTopics()
  if (weakTopics.length === 0) return null

  return (
    <section className="flex flex-col gap-2">
      <Label>Needs work</Label>
      {weakTopics.map(weak => (
        <TopicRow key={weak.id} number={weak.number} title={weak.title} status="partial"
          isSafetyCritical={weak.isSafetyCritical} onClick={() => onTopicClick(weak.id)} />
      ))}
    </section>
  )
}
