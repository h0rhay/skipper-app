# T13 — Dark Mode

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Wire up dark mode across all screens using the `[data-theme='dark']` token system. Persist user preference in localStorage. Provide a toggle.

**Architecture:** Dark mode tokens are already defined in `src/styles/tokens.css` via `[data-theme='dark']`. This task adds: a `useTheme` hook, a `ThemeProvider`, a toggle button in the app shell, and verifies all components respect the tokens. No per-component changes needed if components use CSS custom properties correctly.

**Wave:** 6 — requires T06–T12 (all screens complete)

---

### Task 1: useTheme hook

**Files:**
- Create: `src/hooks/useTheme.ts`
- Create: `src/hooks/useTheme.test.ts`

- [ ] Write failing test:

```typescript
import { storage } from '../../services/storage'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to light mode', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('restores persisted dark preference', () => {
    storage.set('theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('toggle() switches theme and persists it', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggle())
    expect(result.current.theme).toBe('dark')
    expect(storage.get('theme')).toBe('dark')
  })

  it('sets data-theme on documentElement', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggle())
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
```

- [ ] Implement `useTheme.ts`:

```typescript
import { useState, useEffect, useCallback } from 'react'
import { storage } from '../services/storage'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (storage.get<Theme>('theme')) ?? 'light'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    storage.set('theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }, [])

  return { theme, toggle }
}
```

- [ ] Add `useTheme` to the hooks barrel export in `src/hooks/index.ts`:

```typescript
export * from './useTheme'
```

- [ ] Run — PASS. Commit: `feat: add useTheme hook`

---

### Task 2: ThemeProvider + toggle button

**Files:**
- Create: `src/components/organisms/ThemeToggle/ThemeToggle.tsx`
- Modify: `src/routes/__root.tsx`

- [ ] Create `ThemeToggle`:

```typescript
import { useTheme } from '../../../hooks/useTheme'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```

```css
.toggle { background: none; border: none; font-size: 18px; padding: 8px; cursor: pointer; border-radius: var(--radius-full); }
.toggle:hover { background: var(--color-bg-secondary); }
```

- [ ] Modify `__root.tsx` to apply theme on mount:

```typescript
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { storage } from '../services/storage'
import '../styles/global.css'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  // Restore theme from storage before first paint
  useEffect(() => {
    if (storage.get('theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  return <Outlet />
}
```

- [ ] Add `ThemeToggle` to the header row in HomeScreen and TopicDetailScreen (pass as a header slot or render in the top of the content area).

- [ ] Commit: `feat: add ThemeToggle and root theme restore`

---

### Task 3: Verify dark mode visually

- [ ] Start dev server. Toggle dark mode.
- [ ] Check each screen: Home, Topic Detail, Key Facts, Flashcard, MCQ, Session Complete, Progress
- [ ] Verify no hardcoded colours remain — all surfaces, text, borders use CSS custom properties
- [ ] Check dark mode tokens in `tokens.css` match the Pencil dark designs:
  - Background: `#0D1117`
  - Card/secondary bg: `#161B22`
  - Border: `#30363D`
  - Text: `#E6EDF3`
  - Text secondary: `#8B949E`
  - Primary: `#58A6FF`

- [ ] Fix any components that use hardcoded colours.

- [ ] Commit:

```bash
git add -A
git commit -m "feat: dark mode complete across all screens — T13 complete"
```
