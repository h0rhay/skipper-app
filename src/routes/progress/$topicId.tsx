import { createFileRoute } from '@tanstack/react-router'
import { useTopics } from '../../hooks/useTopics'
import { AppShell } from '../../components/templates/AppShell'
import { ScrollPage } from '../../components/templates/ScrollPage'
import { TabBar } from '../../components/organisms/TabBar'
import { BackHeader } from '../../components/molecules/BackHeader'
import { TopicProgressDetail } from '../../components/organisms/TopicProgressDetail'

export const Route = createFileRoute('/progress/$topicId')({
  component: TopicProgressScreen,
})

interface TopicProgressScreenComponentProps {
  topicId: string
}

export function TopicProgressScreenComponent({ topicId }: TopicProgressScreenComponentProps) {
  const { topics } = useTopics()
  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  return (
    <AppShell tabBar={<TabBar active="progress" />}>
      <ScrollPage header={<BackHeader label="Progress" to="/progress" />}>
        <TopicProgressDetail topicId={topicId} />
      </ScrollPage>
    </AppShell>
  )
}

function TopicProgressScreen() {
  const { topicId } = Route.useParams()
  return <TopicProgressScreenComponent topicId={topicId} />
}
