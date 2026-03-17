# T05 — Molecules

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Build all 8 molecules — composed from atoms, no business logic, no hooks.

**Architecture:** Each molecule composes atoms and applies layout. Props only — no hooks, no storage calls. Each molecule lives in its own folder.

**Tech Stack:** React, TypeScript, CSS Modules, Vitest, RTL

**Spec:** `docs/superpowers/specs/2026-03-17-skipper-app-design.md` — Section 8 (Molecules)

**Wave:** 3 — requires T02 (atoms)

**Atoms available:** `src/components/atoms/index.ts` — Badge, Button, ProgressBar, Icon, Label, Divider, ScoreRing, OptionButton, Counter

---

### Task 1: TopicRow molecule

Renders: topic number badge + title + completion badge + chevron. Used in the HomeScreen topic list.

**Files:** `src/components/molecules/TopicRow/`

- [ ] Write failing test:

```typescript
describe('TopicRow', () => {
  it('renders topic number and title', () => {
    render(<TopicRow number={5} title="IRPCS / COLREGS" status="none" onClick={() => {}} />)
    expect(screen.getByText('05')).toBeInTheDocument()
    expect(screen.getByText('IRPCS / COLREGS')).toBeInTheDocument()
  })

  it('shows safety-critical badge when isSafetyCritical', () => {
    render(<TopicRow number={5} title="IRPCS" status="none" isSafetyCritical onClick={() => {}} />)
    expect(screen.getByText(/safety/i)).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TopicRow number={1} title="Nautical Terms" status="none" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('shows complete indicator for complete status', () => {
    render(<TopicRow number={1} title="Nautical Terms" status="complete" onClick={() => {}} />)
    expect(screen.getByText(/complete/i)).toBeInTheDocument()
  })
})
```

- [ ] Implement:

```typescript
import { Badge } from '../../atoms/Badge'
import styles from './TopicRow.module.css'
import type { TopicCompletionStatus } from '../../../types'

interface TopicRowProps {
  number: number
  title: string
  status: TopicCompletionStatus
  isSafetyCritical?: boolean
  onClick: () => void
}

export function TopicRow({ number, title, status, isSafetyCritical, onClick }: TopicRowProps) {
  return (
    <button className={styles.row} onClick={onClick}>
      <Badge label={String(number).padStart(2, '0')} variant="topic" />
      <span className={styles.title}>{title}</span>
      {isSafetyCritical && <Badge label="Safety" variant="danger" />}
      {status === 'complete' && <Badge label="Complete" variant="default" />}
      <span className={styles.chevron}>›</span>
    </button>
  )
}
```

```css
.row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 14px 16px; background: var(--color-bg-card); border: none; border-bottom: 1px solid var(--color-border); text-align: left; cursor: pointer; }
.row:hover { background: var(--color-bg-secondary); }
.title { flex: 1; font-size: var(--font-size-base); font-weight: 600; color: var(--color-text); }
.chevron { color: var(--color-text-muted); font-size: 18px; }
```

- [ ] Run — PASS. Commit: `feat: add TopicRow molecule`

---

### Task 2: StudyModeRow molecule

Renders: mode icon + mode name + progress indicator + chevron. Used in TopicDetailScreen.

- [ ] Write failing test:

```typescript
describe('StudyModeRow', () => {
  it('renders mode name', () => {
    render(<StudyModeRow label="Flashcards" progressText="5/18" onClick={() => {}} />)
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
  })

  it('shows progress text', () => {
    render(<StudyModeRow label="MCQ Quiz" progressText="9/12" onClick={() => {}} />)
    expect(screen.getByText('9/12')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<StudyModeRow label="Flashcards" progressText="" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
```

- [ ] Implement with label, progressText, chevron, onClick. Commit: `feat: add StudyModeRow molecule`

---

### Task 3: FlashCard molecule

Renders a card with front/back faces. Flip animation via CSS transform. Receives `isFlipped` as prop (stateless).

- [ ] Write failing test:

```typescript
describe('FlashCard', () => {
  it('shows front text when not flipped', () => {
    render(<FlashCard front="What is a cleat?" back="A fitting for securing lines" isFlipped={false} />)
    expect(screen.getByText('What is a cleat?')).toBeVisible()
  })

  it('shows back text when flipped', () => {
    render(<FlashCard front="What is a cleat?" back="A fitting for securing lines" isFlipped={true} />)
    expect(screen.getByText('A fitting for securing lines')).toBeInTheDocument()
  })
})
```

- [ ] Implement with CSS 3D flip (rotateY):

```typescript
interface FlashCardProps {
  front: string
  back: string
  isFlipped: boolean
  onClick?: () => void
}

export function FlashCard({ front, back, isFlipped, onClick }: FlashCardProps) {
  return (
    <div className={`${styles.scene}`} onClick={onClick}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.face} ${styles.front}`}>
          <p>{front}</p>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <p>{back}</p>
        </div>
      </div>
    </div>
  )
}
```

```css
.scene { perspective: 1000px; width: 100%; }
.card { position: relative; width: 100%; min-height: 280px; transform-style: preserve-3d; transition: transform 0.4s ease; }
.card.flipped { transform: rotateY(180deg); }
.face { position: absolute; inset: 0; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; padding: 32px 24px; border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-bg-card); text-align: center; font-size: var(--font-size-md); line-height: 1.6; }
.back { transform: rotateY(180deg); background: var(--color-bg-secondary); }
```

- [ ] Run — PASS. Commit: `feat: add FlashCard molecule`

---

### Task 4: KeyTermRow molecule

Expandable term + definition. Accordion behaviour — tap to toggle.

- [ ] Write failing test:

```typescript
describe('KeyTermRow', () => {
  it('shows term, hides definition initially', () => {
    render(<KeyTermRow term="Cleat" definition="A fitting used to secure lines." />)
    expect(screen.getByText('Cleat')).toBeInTheDocument()
    expect(screen.queryByText('A fitting used to secure lines.')).not.toBeVisible()
  })

  it('reveals definition on click', async () => {
    const user = userEvent.setup()
    render(<KeyTermRow term="Cleat" definition="A fitting used to secure lines." />)
    await user.click(screen.getByText('Cleat'))
    expect(screen.getByText('A fitting used to secure lines.')).toBeVisible()
  })
})
```

- [ ] Implement with local `isOpen` state. Commit: `feat: add KeyTermRow molecule`

---

### Task 5: SessionStatRow molecule

Simple label + value pair. Used in stats rows.

- [ ] Write failing test:

```typescript
describe('SessionStatRow', () => {
  it('renders label and value', () => {
    render(<SessionStatRow label="Score" value="8/12" />)
    expect(screen.getByText('Score')).toBeInTheDocument()
    expect(screen.getByText('8/12')).toBeInTheDocument()
  })

  it('renders numeric value as string', () => {
    render(<SessionStatRow label="Attempts" value={3} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
```

- [ ] Implement:

```typescript
interface SessionStatRowProps { label: string; value: string | number }
export function SessionStatRow({ label, value }: SessionStatRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}
```

```css
.row { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-bottom: 1px solid var(--color-border); }
.row:last-child { border-bottom: none; }
.label { font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.value { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); }
```

- [ ] Run — PASS. Commit: `feat: add SessionStatRow molecule`

---

### Task 6: TopicProgressRow molecule

Topic name + mini progress bar + percentage text. Used in ProgressScreen.

- [ ] Write failing test:

```typescript
describe('TopicProgressRow', () => {
  it('renders topic title', () => {
    render(<TopicProgressRow title="IRPCS / COLREGS" status="partial" mcqScore={67} onClick={() => {}} />)
    expect(screen.getByText('IRPCS / COLREGS')).toBeInTheDocument()
  })

  it('renders MCQ score when provided', () => {
    render(<TopicProgressRow title="IRPCS" status="partial" mcqScore={67} onClick={() => {}} />)
    expect(screen.getByText('67%')).toBeInTheDocument()
  })

  it('shows "—" when no MCQ score', () => {
    render(<TopicProgressRow title="IRPCS" status="none" onClick={() => {}} />)
    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TopicProgressRow title="IRPCS" status="none" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
```

- [ ] Implement with title, status badge, mcqScore text, and onClick. Commit: `feat: add TopicProgressRow molecule`

---

### Task 7: SafetyNote molecule

Red-tinted block with warning icon + note text.

```typescript
interface SafetyNoteProps { note: string }
export function SafetyNote({ note }: SafetyNoteProps) {
  return (
    <div className={styles.note} role="alert">
      <span className={styles.icon}>⚠</span>
      <p>{note}</p>
    </div>
  )
}
```

```css
.note { display: flex; gap: 10px; background: color-mix(in srgb, var(--color-danger) 8%, transparent); border: 1px solid color-mix(in srgb, var(--color-danger) 30%, transparent); border-radius: var(--radius-md); padding: 12px 14px; }
.icon { color: var(--color-danger); flex-shrink: 0; }
.note p { margin: 0; font-size: var(--font-size-sm); color: var(--color-text); line-height: 1.5; }
```

- [ ] Write failing test:

```typescript
describe('SafetyNote', () => {
  it('renders the note text', () => {
    render(<SafetyNote note="Always wear a lifejacket in rough weather." />)
    expect(screen.getByText('Always wear a lifejacket in rough weather.')).toBeInTheDocument()
  })

  it('has role="alert" for accessibility', () => {
    render(<SafetyNote note="Test note." />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
```

- [ ] Run — PASS. Commit: `feat: add SafetyNote molecule`

---

### Task 8: NavToolRow molecule

Tool icon + name + attempts badge. Phase 2 tool entry in TopicDetailScreen.

- [ ] Write failing test:

```typescript
describe('NavToolRow', () => {
  it('renders tool label', () => {
    render(<NavToolRow toolId="dead-reckoning" label="Dead Reckoning" attempts={0} onClick={() => {}} />)
    expect(screen.getByText('Dead Reckoning')).toBeInTheDocument()
  })

  it('shows attempt count when attempts > 0', () => {
    render(<NavToolRow toolId="dead-reckoning" label="Dead Reckoning" attempts={3} onClick={() => {}} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<NavToolRow toolId="dead-reckoning" label="Dead Reckoning" attempts={0} onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
```

- [ ] Implement with label, attempts badge (hidden when 0), onClick button. Commit: `feat: add NavToolRow molecule`

---

### Task 9: BackHeader molecule

Used by TopicDetailScreen, KeyFactsScreen, TopicProgressScreen, and NavToolScreen as the back navigation header. Must be in T05 (Molecules) so all Wave 4+ tasks can import it.

**Files:** `src/components/molecules/BackHeader/`

- [ ] Write failing test:

```typescript
import { createRootRoute, createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router'

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('BackHeader', () => {
  it('renders the label', () => {
    renderWithRouter(<BackHeader label="All Topics" to="/" />)
    expect(screen.getByText(/all topics/i)).toBeInTheDocument()
  })

  it('renders a back arrow', () => {
    renderWithRouter(<BackHeader label="All Topics" to="/" />)
    expect(screen.getByText('‹')).toBeInTheDocument()
  })
})
```

- [ ] Implement:

```typescript
import { Link } from '@tanstack/react-router'
import styles from './BackHeader.module.css'

interface BackHeaderProps { label: string; to: string }

export function BackHeader({ label, to }: BackHeaderProps) {
  return (
    <div className={styles.header}>
      <Link to={to} className={styles.back}>
        <span>‹</span>
        <span>{label}</span>
      </Link>
    </div>
  )
}
```

```css
.header { height: 56px; display: flex; align-items: center; }
.back { display: flex; align-items: center; gap: 6px; color: var(--color-primary); font-size: var(--font-size-base); font-weight: 600; text-decoration: none; }
```

- [ ] Run — PASS. Commit: `feat: add BackHeader molecule`

---

### Task 10: Barrel export

- [ ] Create `src/components/molecules/index.ts` exporting all 9 molecules (including BackHeader).

- [ ] Run full test suite:

```bash
npm test
```

Expected: all pass.

- [ ] Commit:

```bash
git add -A
git commit -m "feat: molecules barrel export — T05 complete"
```
