import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppShell } from '../components/templates/AppShell'
import { TabBar } from '../components/organisms/TabBar'
import { TopNav } from '../components/organisms/TopNav'
import { OverallProgressCard } from '../components/organisms/OverallProgressCard'
import { ResumeCard } from '../components/organisms/ResumeCard'
import { TopicList } from '../components/organisms/TopicList'
import { Label } from '../components/atoms/Label'
import styles from '../styles/screens/home.module.css'

export const Route = createFileRoute('/')({
  component: HomeScreen,
})

export function HomeScreenComponent() {
  const navigate = useNavigate()

  return (
    <AppShell topNav={<TopNav />} tabBar={<TabBar active="study" />}>
      <div className={styles.content}>
        <h1 className={styles.hero}>Day Skipper<br />Theory</h1>
        <OverallProgressCard />
        <ResumeCard />
        <Label>All Topics</Label>
        <TopicList onTopicClick={id => navigate({ to: '/topics/$topicId', params: { topicId: id } })} />
      </div>
    </AppShell>
  )
}

function HomeScreen() {
  return <HomeScreenComponent />
}
