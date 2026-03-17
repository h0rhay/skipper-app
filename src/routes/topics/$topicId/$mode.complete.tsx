import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/$mode/complete')({
  component: () => <div>Session Complete — coming soon</div>,
})
