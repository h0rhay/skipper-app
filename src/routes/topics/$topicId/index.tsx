import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicProgress } from '../../../hooks/useTopicProgress'
import { AppShell } from '../../../components/templates/AppShell'
import { ScrollPage } from '../../../components/templates/ScrollPage'
import { TabBar } from '../../../components/organisms/TabBar'
import { TopicHeader } from '../../../components/organisms/TopicHeader'
import { StudyModeList } from '../../../components/organisms/StudyModeList'
import { BackHeader } from '../../../components/molecules/BackHeader'
import { Divider } from '../../../components/atoms/Divider'

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
    <AppShell tabBar={<TabBar active="study" />}>
      <ScrollPage header={<BackHeader label="All Topics" to="/" />}>
        <div className="flex flex-col gap-6">
          <TopicHeader topic={topic} progress={progress} />
          <Divider />
          <div className="flex flex-col gap-3">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-[0.5px]">STUDY MODES</div>
            <StudyModeList topicId={topicId} navTools={topic.navTools} onModeSelect={handleModeSelect} progress={progress} />
          </div>
        </div>
      </ScrollPage>
    </AppShell>
  )
}

function TopicDetailScreen() {
  const { topicId } = Route.useParams()
  return <TopicDetailScreenComponent topicId={topicId} />
}
