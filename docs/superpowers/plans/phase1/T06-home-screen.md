# T06 — HomeScreen

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Build the HomeScreen page with its three organisms: TopicList, ResumeCard, OverallProgressCard.

**Architecture:** Organisms own their hooks. HomeScreen is a thin page that assembles organisms inside AppShell. No logic in the page component.

**Tech Stack:** React, TanStack Router, CSS Modules

**Spec:** `docs/superpowers/specs/2026-03-17-skipper-app-design.md` — Sections 4, 8

**Wave:** 4 — requires T03 (templates), T04 (hooks), T05 (molecules)

---

### Task 1: TabBar organism

**Files:** `src/components/organisms/TabBar/`

TabBar is used by HomeScreen, TopicDetailScreen, ProgressScreen, and TopicProgressScreen. Build it first in T06 so it is available to T07 and T08 (Wave 4 parallel tasks). T07/T08 agents should not build it themselves.

- [ ] Write failing test:

```typescript
describe('TabBar', () => {
  it('renders Home and Progress tabs', () => {
    render(<TabBar active="home" />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
  })

  it('marks the active tab', () => {
    render(<TabBar active="progress" />)
    expect(screen.getByText('Progress').closest('a')).toHaveClass('active')
    expect(screen.getByText('Home').closest('a')).not.toHaveClass('active')
  })
})
```

- [ ] Implement `TabBar.tsx`:

```typescript
import { Link } from '@tanstack/react-router'
import styles from './TabBar.module.css'

interface TabBarProps { active: 'home' | 'progress' }

export function TabBar({ active }: TabBarProps) {
  return (
    <nav className={styles.bar}>
      <Link to="/" className={`${styles.tab} ${active === 'home' ? styles.active : ''}`}>
        <span className={styles.icon}>🏠</span>
        <span>Home</span>
      </Link>
      <Link to="/progress" className={`${styles.tab} ${active === 'progress' ? styles.active : ''}`}>
        <span className={styles.icon}>📊</span>
        <span>Progress</span>
      </Link>
    </nav>
  )
}
```

```css
.bar { display: flex; padding: 12px 21px 34px; gap: 8px; background: var(--color-bg); }
.tab { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; font-family: var(--font-body); font-size: var(--font-size-xs); font-weight: 600; color: var(--color-text-muted); text-decoration: none; padding: 8px; border-radius: var(--radius-lg); }
.active { color: var(--color-primary); background: color-mix(in srgb, var(--color-primary) 10%, transparent); }
.icon { font-size: 18px; }
```

- [ ] Export from `src/components/organisms/TabBar/index.ts`.

- [ ] Run — PASS. Commit: `feat: add TabBar organism`

---

### Task 2: OverallProgressCard organism

**Files:** `src/components/organisms/OverallProgressCard/`

- [ ] Write failing test:

```typescript
describe('OverallProgressCard', () => {
  beforeEach(() => localStorage.clear())

  it('shows 0% when no progress', () => {
    render(<OverallProgressCard />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})
```

- [ ] Implement — uses `useOverallProgress()`. Renders a ScoreRing + "X of 17 topics complete" text.

```typescript
import { useOverallProgress } from '../../../hooks'
import { ScoreRing } from '../../atoms/ScoreRing'
import styles from './OverallProgressCard.module.css'

export function OverallProgressCard() {
  const { percentComplete, topicStatuses } = useOverallProgress()
  const completeCount = Object.values(topicStatuses).filter(s => s === 'complete').length

  return (
    <div className={styles.card}>
      <ScoreRing score={percentComplete} total={100} size={64} />
      <div className={styles.text}>
        <span className={styles.headline}>{completeCount} of 17 topics complete</span>
        <span className={styles.sub}>Day Skipper Theory</span>
      </div>
    </div>
  )
}
```

- [ ] Run — PASS. Commit: `feat: add OverallProgressCard organism`

---

### Task 3: ResumeCard organism

**Files:** `src/components/organisms/ResumeCard/`

- [ ] Write failing test:

```typescript
describe('ResumeCard', () => {
  it('renders null when no last session', () => {
    const { container } = render(<ResumeCard />)
    expect(container.firstChild).toBeNull()
  })

  it('shows topic name, mode and score when session exists', () => {
    // Seed localStorage with a session
    storage.set('sessions', [{
      id: 's1', topicId: '05-irpcs-colregs', mode: 'mcq', toolId: null,
      startedAt: '', completedAt: '', score: 8, total: 12, wrongIds: []
    }])
    render(<ResumeCard />)
    expect(screen.getByText(/irpcs/i)).toBeInTheDocument()
    expect(screen.getByText(/mcq/i)).toBeInTheDocument()
    expect(screen.getByText(/8.*12/)).toBeInTheDocument()
  })
})
```

- [ ] Implement — uses `useLastSession()` + `useTopics()`. Returns `null` when no session. Shows topic title, mode, score, and "Continue" link.

```typescript
import { useLastSession } from '../../../hooks/useLastSession'
import { useTopics } from '../../../hooks/useTopics'
import { Link } from '@tanstack/react-router'
import styles from './ResumeCard.module.css'

export function ResumeCard() {
  const { session } = useLastSession()
  const { topics } = useTopics()
  if (!session) return null
  const topic = topics.find(t => t.id === session.topicId)
  if (!topic) return null

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <span className={styles.label}>Continue where you left off</span>
        <span className={styles.title}>{topic.title}</span>
        <span className={styles.meta}>{session.mode.toUpperCase()} · {session.score}/{session.total}</span>
      </div>
      <Link
        to={session.mode === 'flashcards' ? '/topics/$topicId/flashcards' : '/topics/$topicId/mcq'}
        params={{ topicId: topic.id }}
        className={styles.btn}
      >
        Resume →
      </Link>
    </div>
  )
}
```

```css
/* ResumeCard.module.css */
.card { display: flex; align-items: center; justify-content: space-between; gap: 12px; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 16px; }
.info { display: flex; flex-direction: column; gap: 2px; }
.label { font-size: var(--font-size-xs); color: var(--color-text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.title { font-size: var(--font-size-base); font-weight: 600; color: var(--color-text); }
.meta { font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.btn { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-primary); text-decoration: none; padding: 8px 12px; border-radius: var(--radius-md); background: color-mix(in srgb, var(--color-primary) 10%, transparent); white-space: nowrap; }
```

- [ ] Run — PASS. Commit: `feat: add ResumeCard organism`

---

### Task 4: TopicList organism

**Files:** `src/components/organisms/TopicList/`

- [ ] Write failing test:

```typescript
describe('TopicList', () => {
  it('renders all 17 topic rows', () => {
    render(<TopicList onTopicClick={() => {}} />)
    // 17 buttons (one per topic)
    expect(screen.getAllByRole('button')).toHaveLength(17)
  })

  it('calls onTopicClick with topicId', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TopicList onTopicClick={onClick} />)
    await user.click(screen.getAllByRole('button')[0])
    expect(onClick).toHaveBeenCalledWith(expect.any(String))
  })
})
```

- [ ] Implement — uses `useTopics()` + `useOverallProgress()`. Renders `TopicRow` for each topic.

- [ ] Run — PASS. Commit: `feat: add TopicList organism`

---

### Task 5: HomeScreen page

**Files:** `src/routes/index.tsx`

- [ ] Write failing test (integration — mounts the whole screen):

```typescript
describe('HomeScreen', () => {
  it('renders the page heading', () => {
    render(<HomeScreenComponent />)
    expect(screen.getByText(/day skipper/i)).toBeInTheDocument()
  })

  it('renders all 17 topics', () => {
    render(<HomeScreenComponent />)
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(17)
  })
})
```

- [ ] Replace placeholder in `src/routes/index.tsx`:

```typescript
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppShell } from '../components/templates/AppShell'
import { TabBar } from '../components/organisms/TabBar'
import { OverallProgressCard } from '../components/organisms/OverallProgressCard'
import { ResumeCard } from '../components/organisms/ResumeCard'
import { TopicList } from '../components/organisms/TopicList'
import { Label } from '../components/atoms/Label'
import styles from '../styles/screens/home.module.css'

export const Route = createFileRoute('/')({
  component: HomeScreen,
})

function HomeScreen() {
  const navigate = useNavigate()

  return (
    <AppShell tabBar={<TabBar active="home" />}>
      <div className={styles.content}>
        <h1 className={styles.hero}>Day Skipper<br />Theory</h1>
        <OverallProgressCard />
        <ResumeCard />
        <Label>All Topics</Label>
        <TopicList onTopicClick={id => navigate({ to: '/topics/$topicId', params: { topicId: id } })} />
      </div>
    </AppShell>
  )
}
```

Note: `TabBar` is built in Task 1 of this PRD. Import from `../../../components/organisms/TabBar`.

- [ ] Create `src/styles/screens/home.module.css`:

```css
.content { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 24px; }
.hero { font-family: var(--font-heading); font-size: var(--font-size-2xl); font-weight: 500; color: var(--color-navy); letter-spacing: -1px; line-height: 1.05; }
```

- [ ] Run — PASS. Commit:

```bash
git add -A
git commit -m "feat: HomeScreen complete with TopicList, ResumeCard, OverallProgressCard — T06 complete"
```

---

### Task 6: Manual smoke test

- [ ] Start dev server: `npm run dev`
- [ ] Navigate to `/` — verify:
  - Page heading "Day Skipper Theory" visible
  - 17 topics listed
  - Clicking a topic navigates to `/topics/:id` (placeholder screen)
  - Tab bar shows Home and Progress tabs
