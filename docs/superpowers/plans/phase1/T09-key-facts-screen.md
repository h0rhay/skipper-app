# T09 — KeyFactsScreen

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Build the KeyFactsScreen — a scrollable read-only reference screen with expandable key terms, safety notes, and a "Mark as read" button.

**Architecture:** Uses `ScrollPage` template. Reads topic from route param. Uses `useTopicProgress` to write `factsRead`. No session — no SessionPage template.

**Wave:** 5 — requires T03, T04, T05

---

### Task 1: KeyFactsScreen page

**Files:**
- Modify: `src/routes/topics/$topicId/facts.tsx`
- Create: `src/styles/screens/key-facts.module.css`

- [ ] Write failing test:

```typescript
describe('KeyFactsScreen', () => {
  it('renders the topic summary', () => {
    // mock or seed a topic with known summary text
    render(<KeyFactsScreenComponent topicId="01-nautical-terms" />)
    expect(screen.getByText(/summary/i)).toBeInTheDocument()
  })

  it('renders key terms section', () => {
    render(<KeyFactsScreenComponent topicId="01-nautical-terms" />)
    expect(screen.getByText(/key terms/i)).toBeInTheDocument()
  })

  it('renders safety notes section when topic is safety critical', () => {
    render(<KeyFactsScreenComponent topicId="05-irpcs-colregs" />)
    expect(screen.getByText(/safety/i)).toBeInTheDocument()
  })

  it('renders "Mark as read" button', () => {
    render(<KeyFactsScreenComponent topicId="01-nautical-terms" />)
    expect(screen.getByRole('button', { name: /mark as read/i })).toBeInTheDocument()
  })

  it('calls markFactsRead on button click', async () => {
    const user = userEvent.setup()
    localStorage.clear()
    render(<KeyFactsScreenComponent topicId="01-nautical-terms" />)
    await user.click(screen.getByRole('button', { name: /mark as read/i }))
    const stored = storage.get<import('../../../types').UserProgress>('progress', { userId: 'local', topics: {} })
    expect(stored?.topics['01-nautical-terms']?.factsRead).toBe(true)
  })

  it('"Mark as read" button shows "Read ✓" after clicking', async () => {
    const user = userEvent.setup()
    localStorage.clear()
    render(<KeyFactsScreenComponent topicId="01-nautical-terms" />)
    await user.click(screen.getByRole('button', { name: /mark as read/i }))
    expect(screen.getByRole('button', { name: /read/i })).toBeInTheDocument()
  })
})
```

- [ ] Implement `facts.tsx`:

```typescript
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTopics } from '../../../hooks/useTopics'
import { useTopicProgress } from '../../../hooks/useTopicProgress'
import { ScrollPage } from '../../../components/templates/ScrollPage'
import { BackHeader } from '../../../components/molecules/BackHeader'
import { KeyTermRow } from '../../../components/molecules/KeyTermRow'
import { SafetyNote } from '../../../components/molecules/SafetyNote'
import { Button } from '../../../components/atoms/Button'
import { Label } from '../../../components/atoms/Label'
import { Divider } from '../../../components/atoms/Divider'
import styles from '../../../styles/screens/key-facts.module.css'

export const Route = createFileRoute('/topics/$topicId/facts')({
  component: KeyFactsScreen,
})

function KeyFactsScreen() {
  const { topicId } = Route.useParams()
  const navigate = useNavigate()
  const { topics } = useTopics()
  const { progress, markFactsRead } = useTopicProgress(topicId)

  const topic = topics.find(t => t.id === topicId)
  if (!topic) return <div>Topic not found</div>

  return (
    <ScrollPage header={<BackHeader label={topic.title} to={`/topics/${topicId}`} />}>
      <div className={styles.content}>

        {/* Summary */}
        <section className={styles.section}>
          <Label>Summary</Label>
          <p className={styles.summary}>{topic.summary}</p>
        </section>

        <Divider />

        {/* Key Terms */}
        {topic.keyTerms.length > 0 && (
          <section className={styles.section}>
            <Label>Key Terms</Label>
            <div className={styles.termsList}>
              {topic.keyTerms.map((kt, i) => (
                <KeyTermRow key={i} term={kt.term} definition={kt.definition} />
              ))}
            </div>
          </section>
        )}

        {/* Safety Notes */}
        {topic.safetyNotes.length > 0 && (
          <>
            <Divider />
            <section className={styles.section}>
              <Label>Safety-Critical Notes</Label>
              <div className={styles.safetyList}>
                {topic.safetyNotes.map((note, i) => (
                  <SafetyNote key={i} note={note} />
                ))}
              </div>
            </section>
          </>
        )}

        <Divider />

        {/* Mark as read */}
        <div className={styles.markReadSection}>
          <Button
            onClick={() => { markFactsRead(); navigate({ to: `/topics/${topicId}` }) }}
            fullWidth
          >
            {progress.factsRead ? 'Read ✓' : 'Mark as Read'}
          </Button>
        </div>

      </div>
    </ScrollPage>
  )
}
```

```css
/* key-facts.module.css */
.content { display: flex; flex-direction: column; gap: 24px; }
.section { display: flex; flex-direction: column; gap: 12px; }
.summary { font-size: var(--font-size-base); color: var(--color-text-secondary); line-height: 1.7; }
.termsList { display: flex; flex-direction: column; border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
.safetyList { display: flex; flex-direction: column; gap: 8px; }
.markReadSection { padding-bottom: 16px; }
```

- [ ] Run — PASS. Commit:

```bash
git add -A
git commit -m "feat: KeyFactsScreen complete — T09 complete"
```

---

### Task 2: Manual smoke test

- [ ] Navigate to a topic → tap Key Facts
- [ ] Verify: summary text, expandable key terms, safety notes (if applicable), "Mark as Read" button
- [ ] Tap "Mark as Read" — verify button text changes and you navigate back to topic detail
- [ ] Return to topic detail — verify Key Facts mode row shows "Read" status
