import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppShell } from '../../components/templates/AppShell'
import { TabBar } from '../../components/organisms/TabBar'
import { OverallProgressCard } from '../../components/organisms/OverallProgressCard'
import { WeakTopicsList } from '../../components/organisms/WeakTopicsList'
import { TopicList } from '../../components/organisms/TopicList'
import { Label } from '../../components/atoms/Label'
import styles from '../../styles/screens/progress.module.css'

export const Route = createFileRoute('/progress/')({
  component: ProgressScreen,
})

export function ProgressScreenComponent() {
  const navigate = useNavigate()
  return (
    <AppShell tabBar={<TabBar active="progress" />}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Your Progress</h2>
        <OverallProgressCard />
        <WeakTopicsList onTopicClick={id => navigate({ to: '/progress/$topicId', params: { topicId: id } })} />
        <Label>All Topics</Label>
        <TopicList onTopicClick={id => navigate({ to: '/progress/$topicId', params: { topicId: id } })} />
      </div>
    </AppShell>
  )
}

function ProgressScreen() {
  return <ProgressScreenComponent />
}
