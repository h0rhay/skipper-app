import { useTopics } from '../../../hooks/useTopics'
import { useOverallProgress } from '../../../hooks/useOverallProgress'
import { TopicRow } from '../../molecules/TopicRow'
import styles from './TopicList.module.css'

interface TopicListProps {
  onTopicClick: (topicId: string) => void
}

export function TopicList({ onTopicClick }: TopicListProps) {
  const { topics } = useTopics()
  const { topicStatuses } = useOverallProgress()

  return (
    <div className={styles.list}>
      {topics.map(topic => (
        <TopicRow
          key={topic.id}
          number={topic.number}
          title={topic.title}
          status={topicStatuses[topic.id] ?? 'none'}
          isSafetyCritical={topic.isSafetyCritical}
          onClick={() => onTopicClick(topic.id)}
        />
      ))}
    </div>
  )
}
