# T14 — Phase 2 Scaffold

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Scaffold all 10 Phase 2 nav tool routes as "Coming soon" placeholder screens. Wire them into TopicDetailScreen. Establish the NavToolCanvas shell so Phase 2 can fill in interactions later.

**Architecture:** All nav tool screens share the `FullscreenCanvas` template. `NavToolCanvas` organism is a placeholder for now — it renders the tool name and "Coming soon". `useNavTool` hook stub exists but is empty. Routes are fully wired so clicking a nav tool from TopicDetail works.

**Wave:** 6 — requires T03 (templates), T04 (hooks)

---

### Task 1: NavToolCanvas placeholder organism

**Files:** `src/components/organisms/NavToolCanvas/`

- [ ] Write failing test:

```typescript
describe('NavToolCanvas', () => {
  it('renders tool name and coming soon message', () => {
    render(<NavToolCanvas toolId="dead-reckoning" topicId="10-chartwork" />)
    expect(screen.getByText(/dead reckoning/i)).toBeInTheDocument()
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
  })
})
```

- [ ] Implement placeholder:

```typescript
import styles from './NavToolCanvas.module.css'

const TOOL_LABELS: Record<string, string> = {
  'dead-reckoning': 'Dead Reckoning',
  'three-point-fix': '3-Point Fix',
  'tidal-heights': 'Tidal Heights',
  'chartwork-plotter': 'Chartwork Plotter',
  'compass-correction': 'Compass Correction',
  'colregs-scenarios': 'COLREGS Scenarios',
  'pilotage-transits': 'Pilotage Transits',
  'buoyage-id': 'Buoyage ID',
  'passage-planning': 'Passage Planning',
  'lights-sectors': 'Lights & Sectors',
}

interface NavToolCanvasProps {
  toolId: string
  topicId: string
}

export function NavToolCanvas({ toolId, topicId }: NavToolCanvasProps) {
  const label = TOOL_LABELS[toolId] ?? toolId
  return (
    <div className={styles.placeholder}>
      <span className={styles.icon}>🧭</span>
      <h2 className={styles.title}>{label}</h2>
      <p className={styles.sub}>Interactive tool — Coming in Phase 2</p>
    </div>
  )
}
```

```css
.placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px; text-align: center; padding: 40px; }
.icon { font-size: 48px; }
.title { font-family: var(--font-heading); font-size: var(--font-size-xl); color: var(--color-navy); }
.sub { font-size: var(--font-size-base); color: var(--color-text-muted); }
```

- [ ] Run — PASS. Commit: `feat: add NavToolCanvas placeholder organism`

---

### Task 2: useNavTool stub hook

**Files:** `src/hooks/useNavTool.ts`

- [ ] Write stub:

```typescript
// Stub — Phase 2 will implement tool-specific logic here
export function useNavTool(toolId: string) {
  return {
    svgState: null,
    dispatch: () => {},
    isComplete: false,
    score: 0,
    total: 0,
  }
}
```

- [ ] No tests needed for a stub — just ensure TypeScript compiles:

```bash
npx tsc --noEmit
```

- [ ] Commit: `feat: add useNavTool stub hook`

---

### Task 3: Nav tool route

**Files:** `src/routes/topics/$topicId/nav.$toolId.tsx`

- [ ] Write failing test:

```typescript
describe('NavToolScreen', () => {
  it('renders the tool name', () => {
    // render with topicId + toolId params
    // verify tool label visible
  })
})
```

- [ ] Implement:

```typescript
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTopics } from '../../../hooks/useTopics'
import { FullscreenCanvas } from '../../../components/templates/FullscreenCanvas'
import { NavToolCanvas } from '../../../components/organisms/NavToolCanvas'
import { BackHeader } from '../../../components/molecules/BackHeader'

export const Route = createFileRoute('/topics/$topicId/nav/$toolId')({
  component: NavToolScreen,
})

function NavToolScreen() {
  const { topicId, toolId } = Route.useParams()
  const { topics } = useTopics()
  const topic = topics.find(t => t.id === topicId)

  return (
    <FullscreenCanvas
      header={<BackHeader label={topic?.title ?? 'Back'} to={`/topics/${topicId}`} />}
    >
      <NavToolCanvas toolId={toolId} topicId={topicId} />
    </FullscreenCanvas>
  )
}
```

- [ ] Run — PASS. Commit: `feat: add NavToolScreen route`

---

### Task 4: Wire nav tools into TopicDetailScreen

**Files:** Modify `src/routes/topics/$topicId/index.tsx`

The `StudyModeList` organism already renders `NavToolRow` molecules for each `topic.navTools[]` entry. Update `topics.json` to assign each nav tool to its relevant topic:

| toolId | topicId |
|---|---|
| `dead-reckoning` | `10-chartwork` |
| `three-point-fix` | `10-chartwork` |
| `tidal-heights` | `11-tides` |
| `chartwork-plotter` | `10-chartwork` |
| `compass-correction` | `09-compass` |
| `colregs-scenarios` | `05-irpcs-colregs` |
| `pilotage-transits` | `16-pilotage` |
| `buoyage-id` | `12-visual-aids-buoyage` |
| `passage-planning` | `14-passage-planning` |
| `lights-sectors` | `12-visual-aids-buoyage` |

- [ ] Update `src/data/topics.json` — add the appropriate `navTools` array entry for each topic listed above.

- [ ] Verify `StudyModeList` handles `onModeSelect('nav/dead-reckoning')` style routes — update navigation in `TopicDetailScreen`:

```typescript
function handleModeSelect(mode: string) {
  if (mode.startsWith('nav/')) {
    const toolId = mode.replace('nav/', '')
    navigate({ to: '/topics/$topicId/nav/$toolId', params: { topicId, toolId } })
  } else {
    navigate({ to: `/topics/${topicId}/${mode}` })
  }
}
```

- [ ] Run full test suite:

```bash
npm test
```

Expected: all pass.

- [ ] Commit:

```bash
git add -A
git commit -m "feat: Phase 2 scaffold complete — all 10 nav tools wired — T14 complete"
```

---

### Task 5: Manual smoke test

- [ ] Navigate to topic "IRPCS / COLREGS" → verify "COLREGS Scenarios" nav tool row appears
- [ ] Tap it — verify navigates to NavToolScreen showing "COLREGS Scenarios — Coming in Phase 2"
- [ ] Navigate to Chartwork, Tides, Compass, Pilotage, Buoyage, Passage Planning — verify their tools appear
