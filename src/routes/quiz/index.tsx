import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '../../components/templates/AppShell'
import { TabBar } from '../../components/organisms/TabBar'

export const Route = createFileRoute('/quiz/')({
  component: QuizScreen,
})

function QuizScreen() {
  return (
    <AppShell tabBar={<TabBar active="quiz" />}>
      <div style={{ padding: '20px 24px', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
        Quiz mode coming soon
      </div>
    </AppShell>
  )
}
