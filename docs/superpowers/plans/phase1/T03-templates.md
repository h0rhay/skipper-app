# T03 — Templates

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Build all 5 layout templates — pure layout shells with no data, no hooks, no business logic.

**Architecture:** Each template receives children via slots. `AppShell` owns the tab bar. `SessionPage` hides the tab bar and shows a progress bar slot. All layout is CSS — no JS positioning.

**Tech Stack:** React, TypeScript, CSS Modules

**Spec:** `docs/superpowers/specs/2026-03-17-skipper-app-design.md` — Section 8 (Templates)

**Wave:** 2 — requires T01. **Important:** SessionPage (Task 3) imports `ProgressBar` from the atoms layer. Complete T02's ProgressBar atom before implementing SessionPage. T03's other tasks (AppShell, ScrollPage, CentredCard, FullscreenCanvas) have no atom dependency and can start immediately after T01.

---

### Task 1: AppShell template

**Files:**
- Create: `src/components/templates/AppShell/AppShell.tsx`
- Create: `src/components/templates/AppShell/AppShell.test.tsx`
- Create: `src/components/templates/AppShell/AppShell.module.css`
- Create: `src/components/templates/AppShell/index.ts`

`AppShell` provides: status bar area + scrollable content slot + fixed tab bar at bottom.

- [ ] Write failing test:

```typescript
import { render, screen } from '@testing-library/react'
import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('renders children in content area', () => {
    render(<AppShell tabBar={<div>tabs</div>}>Hello</AppShell>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders the tab bar', () => {
    render(<AppShell tabBar={<div>tabs</div>}>content</AppShell>)
    expect(screen.getByText('tabs')).toBeInTheDocument()
  })
})
```

- [ ] Implement `AppShell.tsx`:

```typescript
import styles from './AppShell.module.css'

interface AppShellProps {
  children: React.ReactNode
  tabBar: React.ReactNode
}

export function AppShell({ children, tabBar }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <main className={styles.content}>{children}</main>
      <footer className={styles.tabBar}>{tabBar}</footer>
    </div>
  )
}
```

```css
/* AppShell.module.css */
.shell {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  max-width: 430px;
  margin: 0 auto;
  overflow: hidden;
  background: var(--color-bg);
}
.content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.tabBar {
  flex-shrink: 0;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
}
```

- [ ] Run — PASS. Commit: `feat: add AppShell template`

---

### Task 2: ScrollPage template

`ScrollPage` provides: back header + scrollable body. No tab bar (sits inside AppShell or standalone).

- [ ] Write failing test:

```typescript
describe('ScrollPage', () => {
  it('renders header and children', () => {
    render(<ScrollPage header={<div>Header</div>}>Body content</ScrollPage>)
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })
})
```

- [ ] Implement:

```typescript
interface ScrollPageProps {
  header: React.ReactNode
  children: React.ReactNode
}

export function ScrollPage({ header, children }: ScrollPageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>{header}</header>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
```

```css
.page { display: flex; flex-direction: column; min-height: 100%; }
.header { flex-shrink: 0; padding: 0 24px; border-bottom: 1px solid var(--color-border); background: var(--color-bg); }
.body { flex: 1; overflow-y: auto; padding: 20px 24px 24px; }
```

- [ ] Run — PASS. Commit: `feat: add ScrollPage template`

---

### Task 3: SessionPage template

`SessionPage` provides: progress bar at top + body content. No tab bar, no back button (exit via × icon passed as prop).

- [ ] Write failing test:

```typescript
describe('SessionPage', () => {
  it('renders progress, exit button and children', () => {
    render(
      <SessionPage progress={0.4} onExit={() => {}} counter={<span>Q 3 of 12</span>}>
        Question content
      </SessionPage>
    )
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByText('Q 3 of 12')).toBeInTheDocument()
    expect(screen.getByText('Question content')).toBeInTheDocument()
  })

  it('calls onExit when × is clicked', async () => {
    const user = userEvent.setup()
    const onExit = vi.fn()
    render(<SessionPage progress={0} onExit={onExit} counter={null}>content</SessionPage>)
    await user.click(screen.getByRole('button', { name: /exit/i }))
    expect(onExit).toHaveBeenCalledOnce()
  })
})
```

- [ ] Implement:

```typescript
interface SessionPageProps {
  progress: number // 0–1
  onExit: () => void
  counter: React.ReactNode
  children: React.ReactNode
}

export function SessionPage({ progress, onExit, counter, children }: SessionPageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.exitBtn} onClick={onExit} aria-label="exit session">×</button>
        <div className={styles.progressWrap}>
          <ProgressBar value={progress} height={4} />
        </div>
        <div className={styles.counter}>{counter}</div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
```

Note: import `ProgressBar` from `../../atoms/ProgressBar`.

```css
.page { display: flex; flex-direction: column; height: 100dvh; max-width: 430px; margin: 0 auto; background: var(--color-bg); }
.topBar { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--color-border); flex-shrink: 0; }
.exitBtn { background: none; border: none; font-size: 20px; color: var(--color-text-secondary); padding: 4px; line-height: 1; }
.progressWrap { flex: 1; }
.counter { font-size: var(--font-size-sm); color: var(--color-text-muted); white-space: nowrap; }
.body { flex: 1; overflow-y: auto; padding: 20px 24px 32px; }
```

- [ ] Run — PASS. Commit: `feat: add SessionPage template`

---

### Task 4: CentredCard template

`CentredCard` provides: vertically centred card slot + bottom action area. Used for SessionComplete and error states.

- [ ] Write failing test:

```typescript
describe('CentredCard', () => {
  it('renders card content and actions', () => {
    render(<CentredCard actions={<button>Next</button>}>Score: 8/12</CentredCard>)
    expect(screen.getByText('Score: 8/12')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })
})
```

- [ ] Implement:

```typescript
interface CentredCardProps {
  children: React.ReactNode
  actions?: React.ReactNode
}

export function CentredCard({ children, actions }: CentredCardProps) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>{children}</div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
```

```css
.page { display: flex; flex-direction: column; min-height: 100dvh; max-width: 430px; margin: 0 auto; padding: 24px; background: var(--color-bg); }
.card { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.actions { flex-shrink: 0; display: flex; flex-direction: column; gap: 10px; padding-bottom: 24px; }
```

- [ ] Run — PASS. Commit: `feat: add CentredCard template`

---

### Task 5: FullscreenCanvas template

`FullscreenCanvas` provides: edge-to-edge viewport with minimal header. Used for Phase 2 nav tools (placeholder in Phase 1).

- [ ] Write failing test:

```typescript
describe('FullscreenCanvas', () => {
  it('renders header and canvas area', () => {
    render(<FullscreenCanvas header={<span>Dead Reckoning</span>}><svg /></FullscreenCanvas>)
    expect(screen.getByText('Dead Reckoning')).toBeInTheDocument()
  })
})
```

- [ ] Implement:

```typescript
interface FullscreenCanvasProps {
  header: React.ReactNode
  children: React.ReactNode
}

export function FullscreenCanvas({ header, children }: FullscreenCanvasProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>{header}</header>
      <div className={styles.canvas}>{children}</div>
    </div>
  )
}
```

```css
.page { display: flex; flex-direction: column; height: 100dvh; background: var(--color-bg); overflow: hidden; }
.header { flex-shrink: 0; padding: 12px 16px; border-bottom: 1px solid var(--color-border); font-family: var(--font-body); font-weight: 600; }
.canvas { flex: 1; position: relative; overflow: hidden; }
```

- [ ] Run — PASS.

---

### Task 6: Barrel export + smoke test

- [ ] Create `src/components/templates/index.ts`:

```typescript
export * from './AppShell'
export * from './ScrollPage'
export * from './SessionPage'
export * from './CentredCard'
export * from './FullscreenCanvas'
```

- [ ] Run all template tests:

```bash
npm test templates
```

Expected: all pass.

- [ ] Commit:

```bash
git add -A
git commit -m "feat: add templates barrel export — T03 complete"
```
