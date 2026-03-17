import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/progress/$topicId')({
  component: () => <div>Topic Progress — coming soon</div>,
})
