import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicProgress } from '../../../hooks/useTopicProgress'
import { AppShell } from '../../../components/templates/AppShell'
import { ScrollPage } from '../../../components/templates/ScrollPage'
import { TabBar } from '../../../components/organisms/TabBar'
import { TopicHeader } from '../../../components/organisms/TopicHeader'
import { StudyModeList } from '../../../components/organisms/StudyModeList'
import { BackHeader } from '../../../components/molecules/BackHeader'
import styles from '../../../styles/screens/topic-detail.module.css'

export const Route = createFileRoute('/topics/$topicId/')({
  component: TopicDetailScreen,
})

interface TopicDetailScreenComponentProps {
  topicId: string
}

export function TopicDetailScreenComponent({ topicId }: TopicDetailScreenComponentProps) {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { progress } = useTopicProgress(topicId)

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  function handleModeSelect(mode: string) {
    navigate({ to: `/topics/${topicId}/${mode}` })
  }

  return (
    <AppShell tabBar={<TabBar active="home" />}>
      <ScrollPage header={<BackHeader label="All Topics" to="/" />}>
        <TopicHeader topic={topic} progress={progress} />
        <div className={styles.label}>STUDY MODES</div>
        <StudyModeList topicId={topicId} navTools={topic.navTools} onModeSelect={handleModeSelect} />
      </ScrollPage>
    </AppShell>
  )
}

function TopicDetailScreen() {
  const { topicId } = Route.useParams()
  return <TopicDetailScreenComponent topicId={topicId} />
}
