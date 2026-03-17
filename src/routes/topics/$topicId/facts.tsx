import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/facts')({
  component: () => <div>Key Facts — coming soon</div>,
})
