# T01 — Project Scaffold

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Initialise the Skipper app with TanStack Start, configure routing, folder structure, testing, and TypeScript types.

**Architecture:** TanStack Start (React SSR framework built on TanStack Router). Vitest + React Testing Library for tests. CSS custom properties for theming. Atomic folder layout established but empty — later tasks fill it in.

**Tech Stack:** React 19, TanStack Start, TanStack Router, TypeScript, Vitest, React Testing Library, CSS Modules

**Spec:** `docs/superpowers/specs/2026-03-17-skipper-app-design.md`

**Wave:** 1 — no dependencies

---

### Task 1: Initialise TanStack Start project

**Files:**
- Create: `package.json`
- Create: `app.config.ts`
- Create: `tsconfig.json`
- Create: `vite.config.ts`

- [ ] Run TanStack Start scaffolding:

```bash
npm create @tanstack/start@latest . -- --template bare
npm install
```

- [ ] Verify dev server starts:

```bash
npm run dev
```

Expected: server running at `http://localhost:3000`

- [ ] Commit:

```bash
git add -A
git commit -m "chore: initialise TanStack Start project"
```

---

### Task 2: Install additional dependencies

**Files:**
- Modify: `package.json`

- [ ] Install test and UI dependencies:

```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install lucide-react
```

- [ ] Add vitest config to `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

- [ ] Create test setup file `src/test/setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

- [ ] Add test script to `package.json`:

```json
"scripts": {
  "test": "vitest",
  "test:ui": "vitest --ui"
}
```

- [ ] Commit:

```bash
git add -A
git commit -m "chore: add Vitest and RTL test setup"
```

---

### Task 3: Establish folder structure

**Files:**
- Create: `src/components/atoms/.gitkeep`
- Create: `src/components/molecules/.gitkeep`
- Create: `src/components/organisms/.gitkeep`
- Create: `src/components/templates/.gitkeep`
- Create: `src/hooks/.gitkeep`
- Create: `src/services/.gitkeep`
- Create: `src/data/.gitkeep`
- Create: `src/types/index.ts`

- [ ] Create all directories with `.gitkeep` files:

```bash
mkdir -p src/components/{atoms,molecules,organisms,templates}
mkdir -p src/{hooks,services,data,types,test}
touch src/components/atoms/.gitkeep
touch src/components/molecules/.gitkeep
touch src/components/organisms/.gitkeep
touch src/components/templates/.gitkeep
touch src/hooks/.gitkeep
touch src/services/.gitkeep
touch src/data/.gitkeep
```

- [ ] Create `src/types/index.ts` with all shared types:

```typescript
export interface KeyTerm {
  term: string
  definition: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface MCQQuestion {
  id: string
  question: string
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  explanation: string
}

export interface Topic {
  id: string
  number: number
  title: string
  description: string
  isSafetyCritical: boolean
  summary: string
  keyTerms: KeyTerm[]
  safetyNotes: string[]
  flashcards: Flashcard[]
  mcqQuestions: MCQQuestion[]
  navTools: string[]
}

export type TopicCompletionStatus = 'none' | 'partial' | 'complete'
export type SessionMode = 'flashcards' | 'mcq' | 'nav'

export interface FlashcardProgress {
  masteredIds: string[]
  totalCards: number
  lastStudied: string
}

export interface MCQProgress {
  bestScore: number
  totalQuestions: number
  wrongIds: string[]
  lastStudied: string
}

export interface NavToolProgress {
  attempts: number
  bestScore: number
  totalQuestions: number
}

export interface TopicProgress {
  factsRead: boolean
  factsReadAt?: string
  flashcards: FlashcardProgress
  mcq: MCQProgress
  navTools: Record<string, NavToolProgress>
}

export interface UserProgress {
  userId: string
  topics: Record<string, TopicProgress>
}

export interface Session {
  id: string
  topicId: string
  mode: SessionMode
  toolId: string | null
  startedAt: string
  completedAt: string
  score: number
  total: number
  wrongIds: string[]
}
```

- [ ] Commit:

```bash
git add -A
git commit -m "chore: establish folder structure and shared types"
```

---

### Task 4: Configure routing skeleton

**Files:**
- Create: `src/routes/__root.tsx`
- Create: `src/routes/index.tsx`
- Create: `src/routes/topics/$topicId/index.tsx`
- Create: `src/routes/topics/$topicId/facts.tsx`
- Create: `src/routes/topics/$topicId/flashcards.tsx`
- Create: `src/routes/topics/$topicId/mcq.tsx`
- Create: `src/routes/topics/$topicId/$mode.complete.tsx`
- Create: `src/routes/topics/$topicId/nav.$toolId.tsx`
- Create: `src/routes/progress/index.tsx`
- Create: `src/routes/progress/$topicId.tsx`

- [ ] Create root route `src/routes/__root.tsx`:

```typescript
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => <Outlet />,
})
```

- [ ] Create each route file as a placeholder (repeat pattern for all routes):

```typescript
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <div>Home — coming soon</div>,
})
```

```typescript
// src/routes/topics/$topicId/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/')({
  component: () => <div>Topic Detail — coming soon</div>,
})
```

```typescript
// src/routes/topics/$topicId/facts.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/facts')({
  component: () => <div>Key Facts — coming soon</div>,
})
```

```typescript
// src/routes/topics/$topicId/flashcards.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/flashcards')({
  component: () => <div>Flashcards — coming soon</div>,
})
```

```typescript
// src/routes/topics/$topicId/mcq.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/mcq')({
  component: () => <div>MCQ — coming soon</div>,
})
```

```typescript
// src/routes/topics/$topicId/$mode.complete.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/$mode/complete')({
  component: () => <div>Session Complete — coming soon</div>,
})
```

```typescript
// src/routes/topics/$topicId/nav.$toolId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/nav/$toolId')({
  component: () => <div>Nav Tool — coming soon</div>,
})
```

```typescript
// src/routes/progress/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/progress/')({
  component: () => <div>Progress — coming soon</div>,
})
```

```typescript
// src/routes/progress/$topicId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/progress/$topicId')({
  component: () => <div>Topic Progress — coming soon</div>,
})
```

- [ ] Verify all routes resolve without errors:

```bash
npm run dev
```

Navigate to `/`, `/topics/01-nautical-terms`, `/progress`. All should render their placeholder text.

- [ ] Commit:

```bash
git add -A
git commit -m "feat: add routing skeleton — all Phase 1 routes as placeholders"
```

---

### Task 5: Smoke test

- [ ] Confirm test suite runs (empty, but no errors):

```bash
npm test
```

Expected: `No test files found` or 0 tests — no failures.

- [ ] Confirm TypeScript compiles:

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] Commit if any fixes needed, then tag T01 complete.
