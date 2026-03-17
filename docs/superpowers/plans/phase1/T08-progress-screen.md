# T08 — ProgressScreen + TopicProgressScreen

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Build ProgressScreen (overall + all topics) and TopicProgressScreen (per-topic detail).

**Architecture:** ProgressScreen assembles OverallProgressCard + TopicProgressDetail + WeakTopicsList. All data via hooks. No logic in page components.

**Wave:** 4 — requires T03, T04, T05

**Intra-wave dependency:** Tasks 1-2 (WeakTopicsList, TopicProgressDetail) are independent. Tasks 3-4 (ProgressScreen, TopicProgressScreen) import `OverallProgressCard` and `TopicList` from T06. Complete T06 before implementing Tasks 3-4.

---

### Task 1: WeakTopicsList organism

**Files:** `src/components/organisms/WeakTopicsList/`

- [ ] Write failing test:

```typescript
describe('WeakTopicsList', () => {
  it('renders nothing when no weak topics', () => {
    localStorage.clear()
    const { container } = render(<WeakTopicsList onTopicClick={() => {}} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders weak topics when MCQ score < 70%', () => {
    storage.set('progress', {
      userId: 'local', topics: {
        '05-irpcs-colregs': {
          factsRead: false,
          flashcards: { masteredIds: [], totalCards: 0, lastStudied: '' },
          mcq: { bestScore: 3, totalQuestions: 12, wrongIds: [], lastStudied: '2026-03-17T00:00:00Z' },
          navTools: {}
        }
      }
    })
    render(<WeakTopicsList onTopicClick={() => {}} />)
    expect(screen.getByText(/irpcs/i)).toBeInTheDocument()
  })
})
```

- [ ] Implement using `useWeakTopics()`. Returns `null` when empty. Renders a section header + list of `TopicRow` molecules.

```typescript
export function WeakTopicsList({ onTopicClick }: { onTopicClick: (id: string) => void }) {
  const { weakTopics } = useWeakTopics()
  if (weakTopics.length === 0) return null

  return (
    <section className={styles.section}>
      <Label>Needs work</Label>
      {weakTopics.map(t => (
        <TopicRow key={t.id} number={t.number} title={t.title} status="partial"
          isSafetyCritical={t.isSafetyCritical} onClick={() => onTopicClick(t.id)} />
      ))}
    </section>
  )
}
```

- [ ] Run — PASS. Commit: `feat: add WeakTopicsList organism`

---

### Task 2: TopicProgressDetail organism

**Files:** `src/components/organisms/TopicProgressDetail/`

Shows per-topic flashcard mastery %, MCQ score history, last studied date.

- [ ] Write failing test:

```typescript
describe('TopicProgressDetail', () => {
  it('shows "Not started" for a topic with no progress', () => {
    render(<TopicProgressDetail topicId="01-nautical-terms" />)
    expect(screen.getByText(/not started/i)).toBeInTheDocument()
  })

  it('shows mastered card count', () => {
    storage.set('progress', {
      userId: 'local', topics: {
        '01-nautical-terms': {
          factsRead: true, factsReadAt: '2026-03-17T00:00:00Z',
          flashcards: { masteredIds: ['fc-1','fc-2'], totalCards: 10, lastStudied: '2026-03-17T00:00:00Z' },
          mcq: { bestScore: 0, totalQuestions: 0, wrongIds: [], lastStudied: '' },
          navTools: {}
        }
      }
    })
    render(<TopicProgressDetail topicId="01-nautical-terms" />)
    expect(screen.getByText(/2.*10/)).toBeInTheDocument()
  })
})
```

- [ ] Implement using `useTopicProgress(topicId)`. Renders SessionStatRows for each mode.

- [ ] Run — PASS. Commit: `feat: add TopicProgressDetail organism`

---

### Task 3: ProgressScreen page

**Files:** `src/routes/progress/index.tsx`

- [ ] Replace placeholder:

```typescript
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppShell } from '../../../components/templates/AppShell'
import { TabBar } from '../../../components/organisms/TabBar'
import { OverallProgressCard } from '../../../components/organisms/OverallProgressCard'
import { WeakTopicsList } from '../../../components/organisms/WeakTopicsList'
import { TopicList } from '../../../components/organisms/TopicList'
import { Label } from '../../../components/atoms/Label'
import styles from '../../../styles/screens/progress.module.css'

export const Route = createFileRoute('/progress/')({
  component: ProgressScreen,
})

function ProgressScreen() {
  const navigate = useNavigate()
  return (
    <AppShell tabBar={<TabBar active="progress" />}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Your Progress</h2>
        <OverallProgressCard />
        <WeakTopicsList onTopicClick={id => navigate({ to: '/progress/$topicId', params: { topicId: id } })} />
        <Label>All Topics</Label>
        <TopicList onTopicClick={id => navigate({ to: '/progress/$topicId', params: { topicId: id } })} />
      </div>
    </AppShell>
  )
}
```

```css
/* progress.module.css */
.content { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 24px; }
.heading { font-family: var(--font-heading); font-size: var(--font-size-lg); font-weight: 500; color: var(--color-navy); }
```

- [ ] Run — PASS. Commit: `feat: ProgressScreen complete`

---

### Task 4: TopicProgressScreen page

**Files:** `src/routes/progress/$topicId.tsx`

- [ ] Replace placeholder:

```typescript
import { createFileRoute } from '@tanstack/react-router'
import { useTopics } from '../../../hooks/useTopics'
import { AppShell } from '../../../components/templates/AppShell'
import { ScrollPage } from '../../../components/templates/ScrollPage'
import { TabBar } from '../../../components/organisms/TabBar'
import { BackHeader } from '../../../components/molecules/BackHeader'
import { TopicProgressDetail } from '../../../components/organisms/TopicProgressDetail'

export const Route = createFileRoute('/progress/$topicId')({
  component: TopicProgressScreen,
})

function TopicProgressScreen() {
  const { topicId } = Route.useParams()
  const { topics } = useTopics()
  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  return (
    <AppShell tabBar={<TabBar active="progress" />}>
      <ScrollPage header={<BackHeader label="Progress" to="/progress" />}>
        <TopicProgressDetail topicId={topicId} />
      </ScrollPage>
    </AppShell>
  )
}
```

- [ ] Run — PASS. Commit:

```bash
git add -A
git commit -m "feat: ProgressScreen + TopicProgressScreen complete — T08 complete"
```

---

### Task 5: Manual smoke test

- [ ] Navigate to `/progress`
- [ ] Verify: overall progress card, topic list visible
- [ ] Verify: WeakTopicsList hidden when no weak topics
- [ ] Verify: clicking a topic navigates to TopicProgressScreen
