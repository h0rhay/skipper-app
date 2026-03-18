import { useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppShell } from '../components/templates/AppShell'
import { TabBar } from '../components/organisms/TabBar'
import { TopNav } from '../components/organisms/TopNav'
import { OverallProgressCard } from '../components/organisms/OverallProgressCard'
import { ResumeCard } from '../components/organisms/ResumeCard'
import { TopicList } from '../components/organisms/TopicList'
import { Label } from '../components/atoms/Label'
import { useWeightedProgress } from '../hooks/useWeightedProgress'
import { useStudyStreak } from '../hooks/useStudyStreak'

export const Route = createFileRoute('/')({
  component: HomeScreen,
})

export function HomeScreenComponent() {
  const navigate = useNavigate()
  const { percentComplete, topicTiers } = useWeightedProgress()
  const { currentStreak, recordStudyDay } = useStudyStreak()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { recordStudyDay() }, [])

  return (
    <AppShell topNav={<TopNav />} tabBar={<TabBar active="study" />}>
      <div className="px-6 pt-5 pb-6 flex flex-col gap-6">
        <h1 className="font-heading text-3xl font-medium text-navy tracking-[-1px] leading-[1.05]">Day Skipper<br />Theory</h1>
        <OverallProgressCard variant="compact" percentComplete={percentComplete} currentStreak={currentStreak} />
        <ResumeCard />
        <Label>All Topics</Label>
        <TopicList onTopicClick={id => navigate({ to: '/topics/$topicId', params: { topicId: id } })} topicTiers={topicTiers} />
      </div>
    </AppShell>
  )
}

function HomeScreen() {
  return <HomeScreenComponent />
}
