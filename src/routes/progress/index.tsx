import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppShell } from '../../components/templates/AppShell'
import { TabBar } from '../../components/organisms/TabBar'
import { OverallProgressCard } from '../../components/organisms/OverallProgressCard'
import { WeakTopicsList } from '../../components/organisms/WeakTopicsList'
import { TopicProgressRow } from '../../components/molecules/TopicProgressRow'
import { useOverallProgress } from '../../hooks'
import { useTopics } from '../../hooks/useTopics'
import styles from '../../styles/screens/progress.module.css'

export const Route = createFileRoute('/progress/')({
  component: ProgressScreen,
})

export function ProgressScreenComponent() {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { topicStatuses } = useOverallProgress()

  function statusToPercent(id: string): number {
    const s = topicStatuses[id]
    if (s === 'complete') return 100
    if (s === 'partial') return 40
    return 0
  }

  return (
    <AppShell tabBar={<TabBar active="progress" />}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Your Progress</h2>
        <OverallProgressCard />
        <WeakTopicsList onTopicClick={id => navigate({ to: '/progress/$topicId', params: { topicId: id } })} />
        <div className={styles.section}>
          <span className={styles.sectionLabel}>BY TOPIC</span>
          <div className={styles.topicList}>
            {topics.map(topic => (
              <TopicProgressRow
                key={topic.id}
                title={topic.title}
                percent={statusToPercent(topic.id)}
                onClick={() => navigate({ to: '/progress/$topicId', params: { topicId: topic.id } })}
              />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

function ProgressScreen() {
  return <ProgressScreenComponent />
}
