import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/')({
  component: () => <div>Topic Detail — coming soon</div>,
})
