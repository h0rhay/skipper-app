import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/flashcards')({
  component: () => <div>Flashcards — coming soon</div>,
})
