import { useTopics } from '../../../hooks/useTopics'
import { useWeightedProgress } from '../../../hooks/useWeightedProgress'
import { TopicRow } from '../../molecules/TopicRow'

interface TopicListProps {
  onTopicClick: (topicId: string) => void
  topicTiers?: Record<string, import('../../../types').MasteryTier>
}

export function TopicList({ onTopicClick, topicTiers: topicTiersProp }: TopicListProps) {
  const { topics } = useTopics()
  const { topicTiers: computedTiers } = useWeightedProgress()
  const topicTiers = topicTiersProp ?? computedTiers

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
