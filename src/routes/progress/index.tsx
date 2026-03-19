import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppShell } from '../../components/templates/AppShell'
import { ScrollPage } from '../../components/templates/ScrollPage'
import { TabBar } from '../../components/organisms/TabBar'
import { OverallProgressCard } from '../../components/organisms/OverallProgressCard'
import { WeakTopicsList } from '../../components/organisms/WeakTopicsList'
import { TopicProgressRow } from '../../components/molecules/TopicProgressRow'
import { Divider } from '../../components/atoms/Divider'
import { useOverallProgress } from '../../hooks'
import { useTopics } from '../../hooks/useTopics'

export const Route = createFileRoute('/progress/')({
  component: ProgressScreen,
})

export function ProgressScreenComponent() {
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { topicStatuses, topicStepPercents } = useOverallProgress()

  return (
    <AppShell tabBar={<TabBar active="progress" />}>
      <ScrollPage header={<div className="py-4"><h1 className="font-heading text-xl font-medium text-text text-center m-0">Your Progress</h1></div>}>
        <div className="flex flex-col gap-6">
          <OverallProgressCard />
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-text-muted uppercase tracking-[1px]">By Topic</span>
            <div className="flex flex-col gap-3">
              {topics.map(topic => (
                <TopicProgressRow
                  key={topic.id}
                  title={topic.title}
                  percent={topicStepPercents[topic.id] ?? 0}
                  isComplete={topicStatuses[topic.id] === 'complete'}
                  onClick={() => navigate({ to: '/progress/$topicId', params: { topicId: topic.id } })}
                />
              ))}
            </div>
          </div>
          <Divider padded />
          <WeakTopicsList onTopicClick={id => navigate({ to: '/progress/$topicId', params: { topicId: id } })} />
        </div>
      </ScrollPage>
    </AppShell>
  )
}

function ProgressScreen() {
  return <ProgressScreenComponent />
}
