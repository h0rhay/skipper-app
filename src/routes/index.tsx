import { useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppShell } from '../components/templates/AppShell'
import { TabBar } from '../components/organisms/TabBar'
import { TopNav } from '../components/organisms/TopNav'
import { OverallProgressCard } from '../components/organisms/OverallProgressCard'
import { ResumeCard } from '../components/organisms/ResumeCard'
import { TopicList } from '../components/organisms/TopicList'
import { Label } from '../components/atoms/Label'
import { Divider } from '../components/atoms/Divider'
import { useStudyStreak } from '../hooks/useStudyStreak'

export const Route = createFileRoute('/')({
  component: HomeScreen,
})

function HomeScreen() {
  const navigate = useNavigate()
  const { recordStudyDay } = useStudyStreak()

  useEffect(() => { recordStudyDay() }, [recordStudyDay])

  return (
    <AppShell topNav={<TopNav />} tabBar={<TabBar active="study" />}>
      <div className="pb-6 flex flex-col gap-6">
        <div className="relative overflow-hidden h-48 flex items-end px-6 pb-5">
          <img
            src="/illustrations/card-13-meteorology-fc-1.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,37,64,0.72)] via-[rgba(10,37,64,0.35)] to-transparent" />
          <h1 className="relative font-heading text-3xl font-medium text-white tracking-[-1px] leading-[1.05]">Day Skipper<br />Theory</h1>
        </div>
        <div className="px-6 flex flex-col gap-6">
        <OverallProgressCard variant="compact" />
        <Divider />
        <ResumeCard />
        <Label>All Topics</Label>
        <TopicList onTopicClick={id => navigate({ to: '/topics/$topicId', params: { topicId: id } })} />
        </div>
      </div>
    </AppShell>
  )
}
