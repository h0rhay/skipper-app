import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/mcq')({
  component: () => <div>MCQ — coming soon</div>,
})
