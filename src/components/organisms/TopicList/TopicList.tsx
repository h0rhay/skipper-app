import { useTopics } from '../../../hooks/useTopics'
import { useWeightedProgress } from '../../../hooks/useWeightedProgress'
import { TopicRow } from '../../molecules/TopicRow'

export function TopicList({ onTopicClick }: { onTopicClick: (topicId: string) => void }) {
  const { topics } = useTopics()
  const { topicTiers } = useWeightedProgress()

  return (
    <div className="flex flex-col border border-border overflow-hidden">
      {topics.map(topic => (
        <TopicRow
          key={topic.id}
          number={topic.number}
          title={topic.title}
          status="none"
          isSafetyCritical={topic.isSafetyCritical}
          tier={topicTiers[topic.id] ?? 'none'}
          onClick={() => onTopicClick(topic.id)}
        />
      ))}
    </div>
  )
}
