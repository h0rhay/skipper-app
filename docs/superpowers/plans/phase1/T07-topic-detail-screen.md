# T07 — TopicDetailScreen

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Build the TopicDetailScreen with TopicHeader and StudyModeList organisms.

**Architecture:** Route loads topic by `topicId` param. TopicHeader is props-only. StudyModeList reads progress via hook and renders mode rows with live progress indicators.

**Tech Stack:** React, TanStack Router, CSS Modules

**Spec:** `docs/superpowers/specs/2026-03-17-skipper-app-design.md` — Sections 4, 8

**Wave:** 4 — requires T03, T04, T05

---

### Task 1: TopicHeader organism

**Files:** `src/components/organisms/TopicHeader/`

Props-only — receives topic data and renders number, title, description, safety badge, and stats row.

- [ ] Write failing test:

```typescript
describe('TopicHeader', () => {
  const topic: Topic = {
    id: '05-irpcs-colregs', number: 5, title: 'IRPCS / COLREGS',
    description: 'Rules of the road.', isSafetyCritical: true,
    summary: '', keyTerms: [], safetyNotes: [], flashcards: [], mcqQuestions: [], navTools: [],
  }

  it('renders topic number and title', () => {
    render(<TopicHeader topic={topic} progress={null} />)
    expect(screen.getByText('05')).toBeInTheDocument()
    expect(screen.getByText('IRPCS / COLREGS')).toBeInTheDocument()
  })

  it('shows safety-critical badge', () => {
    render(<TopicHeader topic={topic} progress={null} />)
    expect(screen.getByText(/safety/i)).toBeInTheDocument()
  })

  it('shows description', () => {
    render(<TopicHeader topic={topic} progress={null} />)
    expect(screen.getByText('Rules of the road.')).toBeInTheDocument()
  })
})
```

- [ ] Implement:

```typescript
import type { Topic, TopicProgress } from '../../../types'
import { Badge } from '../../atoms/Badge'
import { SessionStatRow } from '../../molecules/SessionStatRow'
import styles from './TopicHeader.module.css'

interface TopicHeaderProps {
  topic: Topic
  progress: TopicProgress | null
}

export function TopicHeader({ topic, progress }: TopicHeaderProps) {
  const masteredCards = progress?.flashcards.masteredIds.length ?? 0
  const totalCards = progress?.flashcards.totalCards ?? topic.flashcards.length
  const mcqBest = progress?.mcq.bestScore ?? 0
  const mcqTotal = progress?.mcq.totalQuestions ?? topic.mcqQuestions.length

  return (
    <div className={styles.header}>
      <span className={styles.number}>{String(topic.number).padStart(2, '0')}</span>
      <h1 className={styles.title}>{topic.title}</h1>
      <p className={styles.description}>{topic.description}</p>
      {topic.isSafetyCritical && <Badge label="Safety Critical" variant="danger" />}
      <div className={styles.stats}>
        <SessionStatRow label="Cards mastered" value={`${masteredCards}/${totalCards}`} />
        <SessionStatRow label="MCQ best" value={mcqTotal > 0 ? `${mcqBest}/${mcqTotal}` : '—'} />
      </div>
    </div>
  )
}
```

```css
.header { padding: 20px 0 0; display: flex; flex-direction: column; gap: 8px; }
.number { font-family: var(--font-heading); font-size: var(--font-size-3xl); font-weight: 500; color: var(--color-primary); }
.title { font-family: var(--font-heading); font-size: var(--font-size-2xl); font-weight: 500; color: var(--color-navy); letter-spacing: -1px; line-height: 1.05; }
.description { font-size: var(--font-size-base); color: var(--color-text-secondary); line-height: 1.5; }
.stats { display: flex; gap: 0; border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; margin-top: 8px; }
```

- [ ] Run — PASS. Commit: `feat: add TopicHeader organism`

---

### Task 2: StudyModeList organism

**Files:** `src/components/organisms/StudyModeList/`

Uses `useTopicProgress(topicId)` to show per-mode progress. Renders rows for Key Facts, Flashcards, MCQ, and each nav tool.

- [ ] Write failing test:

```typescript
describe('StudyModeList', () => {
  beforeEach(() => localStorage.clear())

  it('renders Key Facts, Flashcards, and MCQ rows', () => {
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={() => {}} />)
    expect(screen.getByText('Key Facts')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('MCQ Quiz')).toBeInTheDocument()
  })

  it('shows "Read" status for Key Facts when factsRead is true', () => {
    storage.set('progress', {
      userId: 'local',
      topics: { '05-irpcs-colregs': { factsRead: true, flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' }, mcq: { bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '' }, navTools: {} } }
    })
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={() => {}} />)
    expect(screen.getByText(/read/i)).toBeInTheDocument()
  })

  it('calls onModeSelect with mode when row clicked', async () => {
    const user = userEvent.setup()
    const onModeSelect = vi.fn()
    render(<StudyModeList topicId="05-irpcs-colregs" navTools={[]} onModeSelect={onModeSelect} />)
    await user.click(screen.getByText('Key Facts'))
    expect(onModeSelect).toHaveBeenCalledWith('facts')
  })
})
```

- [ ] Implement using `useTopicProgress(topicId)` + `StudyModeRow` molecules.

- [ ] Run — PASS. Commit: `feat: add StudyModeList organism`

---

### Task 3: TopicDetailScreen page

**Files:** `src/routes/topics/$topicId/index.tsx`

- [ ] Write failing test:

```typescript
describe('TopicDetailScreen', () => {
  it('renders topic title from route param', () => {
    // Use TanStack Router test utilities to render with topicId param
    // Verify the topic title appears
  })
})
```

- [ ] Replace placeholder:

```typescript
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicProgress } from '../../../hooks/useTopicProgress'
import { AppShell } from '../../../components/templates/AppShell'
import { ScrollPage } from '../../../components/templates/ScrollPage'
import { TabBar } from '../../../components/organisms/TabBar'
import { TopicHeader } from '../../../components/organisms/TopicHeader'
import { StudyModeList } from '../../../components/organisms/StudyModeList'
import styles from '../../../styles/screens/topic-detail.module.css'

export const Route = createFileRoute('/topics/$topicId/')({
  component: TopicDetailScreen,
})

function TopicDetailScreen() {
  const { topicId } = Route.useParams()
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { progress } = useTopicProgress(topicId)

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  function handleModeSelect(mode: string) {
    navigate({ to: `/topics/${topicId}/${mode}` })
  }

  return (
    <AppShell tabBar={<TabBar active="home" />}>
      <ScrollPage header={<BackHeader label="All Topics" to="/" />}>
        <TopicHeader topic={topic} progress={progress} />
        <div className={styles.label}>STUDY MODES</div>
        <StudyModeList topicId={topicId} navTools={topic.navTools} onModeSelect={handleModeSelect} />
      </ScrollPage>
    </AppShell>
  )
}
```

Note: `BackHeader` is built in T05 (Task 9) and available at `src/components/molecules/BackHeader`. Add the import at the top of the screen component:

```typescript
import { BackHeader } from '../../../components/molecules/BackHeader'
```

- [ ] Run — PASS. Commit:

```bash
git add -A
git commit -m "feat: TopicDetailScreen complete — T07 complete"
```

---

### Task 4: Manual smoke test

- [ ] Navigate to a topic from HomeScreen
- [ ] Verify: topic number, title, description, safety badge (if applicable), stats, and mode rows visible
- [ ] Verify: clicking a mode row navigates to the correct route placeholder
