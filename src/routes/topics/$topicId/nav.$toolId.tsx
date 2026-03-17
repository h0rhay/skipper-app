import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/nav/$toolId')({
  component: () => <div>Nav Tool — coming soon</div>,
})
