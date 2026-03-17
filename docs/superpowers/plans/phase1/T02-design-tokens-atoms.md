# T02 — Design Tokens + Atoms

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Define the design token system (CSS custom properties) and build all 9 atomic components with tests.

**Architecture:** CSS custom properties for tokens (light + dark). Each atom is a folder: `ComponentName.tsx`, `ComponentName.test.tsx`, `ComponentName.module.css`, `index.ts`. Pure presentational — zero business logic, zero hooks.

**Tech Stack:** React, TypeScript, CSS Modules, Vitest, React Testing Library

**Spec:** `docs/superpowers/specs/2026-03-17-skipper-app-design.md` — Section 8 (Atoms)

**Wave:** 2 — requires T01

---

### Task 1: Design tokens

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`

- [ ] Create `src/styles/tokens.css`:

```css
:root {
  /* Colour — primary */
  --color-primary: #0066CC;
  --color-primary-hover: #0052A3;

  /* Colour — semantic */
  --color-navy: #0A2540;
  --color-danger: #C41E3A;
  --color-success: #2D8A4E;
  --color-warning: #B45309;

  /* Colour — surface */
  --color-bg: #FFFFFF;
  --color-bg-secondary: #F8F9FA;
  --color-bg-card: #FFFFFF;
  --color-border: #E5E5E5;

  /* Colour — text */
  --color-text: #0A2540;
  --color-text-secondary: #555555;
  --color-text-muted: #999999;

  /* Typography */
  --font-heading: 'Lora', serif;
  --font-body: 'Inter', sans-serif;
  --font-size-xs: 10px;
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-md: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-2xl: 34px;
  --font-size-3xl: 40px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadow */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.10);
}

[data-theme='dark'] {
  --color-primary: #58A6FF;
  --color-primary-hover: #79BBFF;
  --color-navy: #E6EDF3;
  --color-danger: #F85149;
  --color-success: #3FB950;

  --color-bg: #0D1117;
  --color-bg-secondary: #161B22;
  --color-bg-card: #161B22;
  --color-border: #30363D;

  --color-text: #E6EDF3;
  --color-text-secondary: #8B949E;
  --color-text-muted: #6E7681;
}
```

- [ ] Create `src/styles/global.css`:

```css
@import './tokens.css';
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Inter:wght@400;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  margin: 0;
}

p { margin: 0; }
button { cursor: pointer; font-family: inherit; }
```

- [ ] Import `global.css` in root route `src/routes/__root.tsx`:

```typescript
import '../styles/global.css'
```

- [ ] Commit:

```bash
git add -A
git commit -m "feat: add design tokens and global styles"
```

---

### Task 2: Badge atom

**Files:**
- Create: `src/components/atoms/Badge/Badge.tsx`
- Create: `src/components/atoms/Badge/Badge.test.tsx`
- Create: `src/components/atoms/Badge/Badge.module.css`
- Create: `src/components/atoms/Badge/index.ts`

- [ ] Write failing test `Badge.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders its label', () => {
    render(<Badge label="Safety Critical" />)
    expect(screen.getByText('Safety Critical')).toBeInTheDocument()
  })

  it('applies danger variant', () => {
    render(<Badge label="Safety Critical" variant="danger" />)
    expect(screen.getByText('Safety Critical')).toHaveClass('danger')
  })

  it('applies topic variant', () => {
    render(<Badge label="05" variant="topic" />)
    expect(screen.getByText('05')).toHaveClass('topic')
  })
})
```

- [ ] Run test — expect FAIL:

```bash
npm test Badge
```

- [ ] Implement `Badge.tsx`:

```typescript
import styles from './Badge.module.css'

interface BadgeProps {
  label: string
  variant?: 'danger' | 'topic' | 'default'
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {label}
    </span>
  )
}
```

- [ ] Implement `Badge.module.css`:

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.default { background: var(--color-bg-secondary); color: var(--color-text-secondary); }
.danger { background: color-mix(in srgb, var(--color-danger) 12%, transparent); color: var(--color-danger); }
.topic { background: var(--color-primary); color: #fff; }
```

- [ ] Create `index.ts`:

```typescript
export { Badge } from './Badge'
export type { } from './Badge'
```

- [ ] Run test — expect PASS:

```bash
npm test Badge
```

- [ ] Commit:

```bash
git add src/components/atoms/Badge
git commit -m "feat: add Badge atom"
```

---

### Task 3: Button atom

**Files:**
- Create: `src/components/atoms/Button/Button.tsx`
- Create: `src/components/atoms/Button/Button.test.tsx`
- Create: `src/components/atoms/Button/Button.module.css`
- Create: `src/components/atoms/Button/index.ts`

- [ ] Write failing test:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders label', () => {
    render(<Button onClick={() => {}}>Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Submit</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is set', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick} disabled>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

- [ ] Run — expect FAIL, then implement:

```typescript
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  fullWidth?: boolean
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

```css
/* Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  padding: 0 24px;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  font-weight: 700;
  transition: background 0.15s, opacity 0.15s;
}
.button:disabled { opacity: 0.4; cursor: not-allowed; }
.fullWidth { width: 100%; }
.primary { background: var(--color-primary); color: #fff; }
.primary:hover:not(:disabled) { background: var(--color-primary-hover); }
.secondary { background: transparent; color: var(--color-text); border: 1px solid var(--color-border); }
.ghost { background: transparent; color: var(--color-primary); }
```

- [ ] Run — expect PASS. Commit:

```bash
git add src/components/atoms/Button
git commit -m "feat: add Button atom"
```

---

### Task 4: ProgressBar atom

- [ ] Write failing test:

```typescript
describe('ProgressBar', () => {
  it('renders with correct aria attributes', () => {
    render(<ProgressBar value={0.5} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '50')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('clamps value between 0 and 1', () => {
    render(<ProgressBar value={1.5} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })
})
```

- [ ] Implement:

```typescript
interface ProgressBarProps {
  value: number // 0–1
  height?: number
}

export function ProgressBar({ value, height = 4 }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={styles.track}
      style={{ height }}
    >
      <div className={styles.fill} style={{ width: `${clamped * 100}%` }} />
    </div>
  )
}
```

```css
.track { background: var(--color-border); border-radius: var(--radius-full); overflow: hidden; width: 100%; }
.fill { height: 100%; background: var(--color-primary); border-radius: var(--radius-full); transition: width 0.3s ease; }
```

- [ ] Run — PASS. Commit: `feat: add ProgressBar atom`

---

### Task 5: Label atom

```typescript
// Simple — test it renders uppercase text
interface LabelProps { children: React.ReactNode }
export function Label({ children }: LabelProps) {
  return <span className={styles.label}>{children}</span>
}
```

```css
.label { font-size: var(--font-size-xs); font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-text-muted); }
```

- [ ] Test, implement, commit: `feat: add Label atom`

---

### Task 6: Divider atom

```typescript
// Test it renders a horizontal rule
export function Divider() {
  return <hr className={styles.divider} role="separator" />
}
```

```css
.divider { border: none; border-top: 1px solid var(--color-border); margin: 0; }
```

- [ ] Test, implement, commit: `feat: add Divider atom`

---

### Task 7: Counter atom

```typescript
// Counter displays "Q 3 of 12" or "Card 4 of 18"
interface CounterProps { current: number; total: number; prefix?: string }
export function Counter({ current, total, prefix = 'Q' }: CounterProps) {
  return <span className={styles.counter}>{prefix} {current} of {total}</span>
}
```

- [ ] Test it renders the correct string. Commit: `feat: add Counter atom`

---

### Task 8: OptionButton atom

**Files:**
- Create: `src/components/atoms/OptionButton/`

- [ ] Write failing tests:

```typescript
describe('OptionButton', () => {
  it('renders option text', () => {
    render(<OptionButton label="A" text="Port side" state="idle" onClick={() => {}} />)
    expect(screen.getByText('Port side')).toBeInTheDocument()
  })

  it('shows selected state', () => {
    render(<OptionButton label="A" text="Port side" state="selected" onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveClass('selected')
  })

  it('shows correct state', () => {
    render(<OptionButton label="A" text="Port side" state="correct" onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveClass('correct')
  })

  it('shows wrong state', () => {
    render(<OptionButton label="A" text="Port side" state="wrong" onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveClass('wrong')
  })

  it('is disabled when state is correct or wrong', () => {
    render(<OptionButton label="A" text="Port side" state="correct" onClick={() => {}} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

- [ ] Implement:

```typescript
type OptionState = 'idle' | 'selected' | 'correct' | 'wrong'

interface OptionButtonProps {
  label: string
  text: string
  state: OptionState
  onClick: () => void
}

export function OptionButton({ label, text, state, onClick }: OptionButtonProps) {
  const isLocked = state === 'correct' || state === 'wrong'
  return (
    <button
      className={`${styles.option} ${styles[state]}`}
      onClick={onClick}
      disabled={isLocked}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.text}>{text}</span>
    </button>
  )
}
```

```css
.option { display: flex; align-items: center; gap: 12px; width: 100%; padding: 14px 16px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-bg-card); text-align: left; font-size: var(--font-size-base); }
.label { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: var(--font-size-sm); background: var(--color-bg-secondary); flex-shrink: 0; }
.text { flex: 1; }
.idle:hover { border-color: var(--color-primary); }
.selected { border-color: var(--color-primary); background: color-mix(in srgb, var(--color-primary) 8%, transparent); }
.selected .label { background: var(--color-primary); color: #fff; }
.correct { border-color: var(--color-success); background: color-mix(in srgb, var(--color-success) 8%, transparent); }
.correct .label { background: var(--color-success); color: #fff; }
.wrong { border-color: var(--color-danger); background: color-mix(in srgb, var(--color-danger) 8%, transparent); }
.wrong .label { background: var(--color-danger); color: #fff; }
```

- [ ] Run — PASS. Commit: `feat: add OptionButton atom`

---

### Task 9: ScoreRing atom

- [ ] Write test — renders SVG with correct percentage text:

```typescript
it('displays percentage text', () => {
  render(<ScoreRing score={8} total={12} />)
  expect(screen.getByText('67%')).toBeInTheDocument()
})
```

- [ ] Implement as SVG circle with stroke-dashoffset:

```typescript
export function ScoreRing({ score, total, size = 80 }: ScoreRingProps) {
  const pct = total === 0 ? 0 : Math.round((score / total) * 100)
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--color-border)" strokeWidth={6} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--color-primary)" strokeWidth={6}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em"
        fontSize={size * 0.2} fontWeight="700" fill="var(--color-text)">{pct}%</text>
    </svg>
  )
}
```

- [ ] Run — PASS. Commit: `feat: add ScoreRing atom`

---

### Task 10: Icon atom

- [ ] Thin wrapper around lucide-react that maps string names to components:

```typescript
import { Map, BookOpen, BarChart2, ChevronRight, ChevronLeft, AlertTriangle, Check, X } from 'lucide-react'

const ICONS = { map: Map, study: BookOpen, progress: BarChart2, chevronRight: ChevronRight, chevronLeft: ChevronLeft, warning: AlertTriangle, check: Check, close: X } as const

type IconName = keyof typeof ICONS

interface IconProps { name: IconName; size?: number; color?: string }

export function Icon({ name, size = 20, color = 'currentColor' }: IconProps) {
  const Component = ICONS[name]
  return <Component size={size} color={color} />
}
```

- [ ] Test it renders without throwing for each named icon. Commit: `feat: add Icon atom`

---

### Task 11: Barrel export

**Files:**
- Create: `src/components/atoms/index.ts`

- [ ] Create barrel:

```typescript
export * from './Badge'
export * from './Button'
export * from './ProgressBar'
export * from './Label'
export * from './Divider'
export * from './Counter'
export * from './OptionButton'
export * from './ScoreRing'
export * from './Icon'
```

- [ ] Run full test suite — all atoms pass:

```bash
npm test
```

- [ ] Commit:

```bash
git add -A
git commit -m "feat: add atoms barrel export — T02 complete"
```
