# Skipper App — Design Spec

**Date:** 2026-03-17
**Status:** Approved

---

## 1. Overview

Skipper is a mobile web learning app for the RYA Day Skipper Theory syllabus. It delivers all 17 verified theory topics across two phases:

- **Phase 1** — Content-heavy study: Key Facts, Flashcards, MCQ quizzes, progress tracking
- **Phase 2** — Interactive navigation practice: 10 touch-enabled SVG tools for chartwork, dead reckoning, COLREGS, tidal calculations, and more

The app targets candidates preparing for the RYA Day Skipper Theory exam.

---

## 2. Tech Stack

| Concern | Decision |
|---|---|
| Framework | React + TanStack Start (with TanStack Router) |
| Storage | Local storage now; JSON shaped for Convex migration |
| Interactive charts | SVG (React-managed) |
| Component design | Atomic design (atoms → molecules → organisms → templates → pages) |
| Organism/layout scope | Single responsibility — one clear purpose per unit |
| Business logic | Hooks/services layer only — never inline in components |

Route params carry IDs. Score/session data is passed via TanStack Router search params to `SessionCompleteScreen` — never component state — so it can be linked to directly. Search param shape for SessionCompleteScreen: `?score=8&total=12&wrongIds=q-004,q-009` (wrongIds comma-separated string, parsed in the screen's loader).

---

## 3. User Flow

```
HOME
└─ Topic Detail
   ├─ Key Facts (read mode)
   ├─ Flashcard Session → Session Complete → [Review Wrong Cards?]
   │                                              └─ Flashcard Session (weak cards only)
   ├─ MCQ Session → Session Complete → [Review Wrong Answers?]
   │                                        └─ MCQ Session (wrong IDs only)
   └─ Nav Tool (Phase 2) → tool-specific interactive screen → Session Complete
```

Tab bar (always visible on Home, Topic Detail, Progress screens).
Sessions (Flashcard, MCQ, Nav Tool) use `SessionPage` template — no tab bar, progress bar instead.

---

## 4. Screen Inventory

### Phase 1

| Screen | Route | Template | Responsibility |
|---|---|---|---|
| HomeScreen | `/` | AppShell | Topic list, overall progress card, resume last session |
| TopicDetailScreen | `/topics/:topicId` | ScrollPage | Topic header, stats, study mode list |
| KeyFactsScreen | `/topics/:topicId/facts` | ScrollPage | Scrollable: summary → key terms → safety notes. "Mark as read" button at bottom. |
| FlashcardSessionScreen | `/topics/:topicId/flashcards` | SessionPage | Active flashcard deck. Optional `?mode=review&cardIds=fc-001,fc-003` for weak card review. |
| MCQSessionScreen | `/topics/:topicId/mcq` | SessionPage | Active MCQ question queue. Optional `?mode=review&questionIds=q-004,q-009` for wrong answer review. |
| SessionCompleteScreen | `/topics/:topicId/:mode/complete` | CentredCard | Score, breakdown, review option, next suggestion. Valid `:mode` values: `flashcards`, `mcq`, `nav`. |
| ProgressScreen | `/progress` | AppShell | Overall %, per-topic breakdown, weak areas |
| TopicProgressScreen | `/progress/:topicId` | ScrollPage | Per-topic flashcard mastery, MCQ score history, last studied |

### Phase 2 — Nav Tools (all at `/topics/:topicId/nav/:toolId`)

Phase 2 screens are scaffolded in Phase 1 as placeholder screens behind a "Coming soon" state. The routing and data shape are established; interaction logic is implemented in Phase 2. Template: `FullscreenCanvas` for all nav tool screens.

| toolId | Description |
|---|---|
| `dead-reckoning` | Drag course line + divider for distance. Speed/time inputs. EP marker. |
| `three-point-fix` | Drag 3 bearing lines from landmarks. Cocked hat. Drop fix marker. |
| `tidal-heights` | Tide table inputs + Rule of Twelfths visualisation + height calculator. |
| `chartwork-plotter` | Drag parallel rulers to transfer bearings. Dividers for distance. |
| `compass-correction` | Interactive dial. Apply variation + deviation. Convert T/M/C. |
| `colregs-scenarios` | Animated vessel encounters. User identifies give-way / stand-on. |
| `pilotage-transits` | Drag transit lines to align landmarks. Harbour entry guidance. |
| `buoyage-id` | Rendered SVG buoy. User identifies type / colour / topmark / light rhythm. |
| `passage-planning` | SVG chart. Tap to add waypoints. Tide/clearance checks per leg. |
| `lights-sectors` | Animated SVG light. User identifies period, colour, arc, phase. |

Each nav tool is contextually linked from the topic that introduced it via `topic.navTools[]`.

---

## 5. Exercise Mechanics

### Key Facts
- Scrollable read: Summary → Key Terms (tap to expand definition) → Safety-Critical notes
- **"Mark as read" button** at bottom of screen — tapping it sets `factsRead: true` and `factsReadAt: ISO timestamp` in progress
- No pass/fail — reference mode only
- **Empty state:** not applicable (all topics have summary content)

### Flashcards
- Cards drawn from `topic.flashcards[]`
- Tap card → flip animation reveals answer
- Two actions: **Got it ✓** (marks card mastered) | **Again ✗** (re-queues at end of deck)
- Each "got it" immediately writes that card's ID to `progress.flashcards.masteredIds`
- Session ends when all cards in current deck are marked "got it"
- If user exits mid-session: partial progress is saved — `masteredIds` already written per card
- On next entry, session resumes with unmastered cards only
- Progress bar fills as deck clears; "Card 4 of 18" counter shown
- → **SessionCompleteScreen** (`/topics/:topicId/flashcards/complete`): score + "Retry weak cards" CTA (re-launches session with unmastered cards only)
- **Empty state:** if `masteredIds.length === totalCards`, show "All mastered" state with option to reset

### MCQ
- Questions drawn from `topic.mcqQuestions[]`
- Tap an option → highlights selection (no immediate reveal)
- Explicit **Submit** button → reveals correct/incorrect + explanation text
- **Next →** advances to next question
- On final question: Submit → brief result reveal → auto-navigate to `SessionCompleteScreen` after 1.5s
- Progress bar + "Q 3 of 12" counter throughout
- `progress.mcq.wrongIds` is overwritten with the current session's wrong IDs on completion (latest session, not union)
- → **SessionCompleteScreen** (`/topics/:topicId/mcq/complete`): score breakdown + "Review wrong answers" CTA
- "Review wrong answers" re-launches `MCQSessionScreen` with only the `wrongIds` from the last session
- **Empty state:** if `totalQuestions === 0` for a topic, show "No questions yet" — not expected in production

### Review Wrong Answers / Weak Cards
Both modes re-use the existing session screens (`FlashcardSessionScreen`, `MCQSessionScreen`) with a filtered question/card set passed via route search param `?mode=review`. No separate screen needed.

---

## 6. Empty & Error States

### Empty States
| Screen | Condition | State |
|---|---|---|
| HomeScreen | No sessions started | Hide ResumeCard; show "Start your first topic" prompt |
| ProgressScreen | 0% complete | Show 0% ring; topic list shows all as "not started" |
| FlashcardSessionScreen | All cards mastered | "All cards mastered" with reset option |
| WeakTopicsList | No topics below 70% | Hide section entirely |

### Error States
| Scenario | Handling |
|---|---|
| `topics.json` fails to load | Full-screen error with retry button |
| `progress.json` malformed/corrupt | Reset to empty progress with a toast warning; do not crash |
| Session data missing on SessionCompleteScreen | Redirect back to TopicDetailScreen |

---

## 7. Data Model

### `topics.json` (static, ships with app)

```json
[
  {
    "id": "05-irpcs-colregs",
    "number": 5,
    "title": "IRPCS / COLREGS",
    "description": "International Regulations for Preventing Collisions at Sea.",
    "isSafetyCritical": true,
    "summary": "...",
    "keyTerms": [
      { "term": "Give-way vessel", "definition": "..." }
    ],
    "safetyNotes": ["..."],
    "flashcards": [
      { "id": "fc-001", "front": "What is the stand-on vessel?", "back": "..." }
    ],
    "mcqQuestions": [
      {
        "id": "q-001",
        "question": "Which vessel must keep out of the way?",
        "options": ["A", "B", "C", "D"],
        "correctIndex": 2,
        "explanation": "..."
      }
    ],
    "navTools": ["colregs-scenarios"]
  }
]
```

### `progress.json` (user data — local storage → Convex)

```json
{
  "userId": "local",
  "topics": {
    "05-irpcs-colregs": {
      "factsRead": true,
      "factsReadAt": "2026-03-17T09:00:00Z",
      "flashcards": {
        "masteredIds": ["fc-001", "fc-003"],
        "totalCards": 18,
        "lastStudied": "2026-03-17T10:30:00Z"
      },
      "mcq": {
        "bestScore": 8,
        "totalQuestions": 12,
        "wrongIds": ["q-004", "q-009"],
        "lastStudied": "2026-03-17T11:00:00Z"
      },
      "navTools": {
        "colregs-scenarios": { "attempts": 3, "bestScore": 7, "totalQuestions": 10 }
      }
    }
  }
}
```

Note: `progress.mcq.wrongIds` is overwritten (not accumulated) on each session completion, always reflecting the most recent session. `navTools.bestScore` and `navTools.totalQuestions` allow percentage computation consistently with MCQ.

### `sessions.json` (append-only history log — local storage → Convex)

```json
[
  {
    "id": "sess-abc123",
    "topicId": "05-irpcs-colregs",
    "mode": "mcq",          // "flashcards" | "mcq" | "nav" — same vocabulary as SessionComplete :mode
    "toolId": null,         // set only when mode === "nav", e.g. "colregs-scenarios"
    "startedAt": "2026-03-17T11:00:00Z",
    "completedAt": "2026-03-17T11:12:00Z",
    "score": 8,
    "total": 12,
    "wrongIds": ["q-004", "q-009"]
  }
]
```

### Derived state (computed in hooks, never stored)

- `overallProgress` — % topics with all three modes completed
- `weakTopics` — topics where MCQ `bestScore / totalQuestions < 0.7`
- `lastSession` — most recent entry from `sessions.json`
- `topicCompletionStatus` — per-topic badge: not started / in progress / complete

---

## 8. Component Hierarchy

### Atoms
`Badge` | `Button` | `ProgressBar` | `Icon` | `Label` | `Divider` | `ScoreRing` | `OptionButton` | `Counter`

### Molecules
`TopicRow` | `StudyModeRow` | `FlashCard` | `KeyTermRow` | `SessionStatRow` | `TopicProgressRow` | `NavToolRow` | `SafetyNote`

### Organisms (single responsibility, own hook)

| Organism | Responsibility | Hook |
|---|---|---|
| TopicList | Display topic index | `useTopics()` |
| ResumeCard | Last session info + "Continue" CTA. Shows topic name, mode, score. | `useLastSession()` |
| OverallProgressCard | % complete ring + breakdown stats | `useOverallProgress()` |
| TopicHeader | Topic number, title, description, safety badge, stats row | props only |
| StudyModeList | Key Facts + Flashcard + MCQ + Nav Tool rows with per-mode progress | `useTopicProgress(id)` |
| FlashcardDeck | Active card, flip, Got it/Again, progress bar, counter | `useFlashcardSession(id)` |
| MCQQuestion | Question card, 4 options, Submit, explanation reveal, counter | `useMCQSession(id)` |
| SessionSummary | Score, breakdown, "Review wrong answers" / "Retry weak cards" CTA | props only |
| WeakTopicsList | Topics below 70% — hidden when none; ProgressScreen shows a "Great work, no weak areas!" message in that section's place | `useWeakTopics()` |
| TopicProgressDetail | Per-topic flashcard mastery %, MCQ score history list, last studied | `useTopicProgress(id)` |
| NavToolCanvas | SVG viewport + touch handlers (Phase 2; placeholder in Phase 1) | `useNavTool(toolId)` |

### Templates (layout only — no data, no logic)

| Template | Provides |
|---|---|
| AppShell | Status bar + scrollable content slot + tab bar at bottom |
| ScrollPage | Back header + scrollable body slot. No tab bar. |
| SessionPage | Progress bar at top + body slot. No tab bar, no back button (exit via × icon). |
| FullscreenCanvas | Edge-to-edge SVG viewport + minimal header. For Phase 2 nav tools. |
| CentredCard | Vertically centred card slot + bottom action area. For SessionComplete, error states. |

### Business Logic Hooks

| Hook | Returns |
|---|---|
| `useTopics()` | `{ topics: Topic[], isLoading, error }` |
| `useTopicProgress(id)` | `{ progress: TopicProgress, markFactsRead(), updateFlashcards(), updateMCQ() }` |
| `useOverallProgress()` | `{ percentComplete: number, topicStatuses: Record<id, 'none'|'partial'|'complete'> }` |
| `useWeakTopics()` | `{ weakTopics: Topic[] }` — topics with MCQ score < 70% |
| `useLastSession()` | `{ session: Session | null }` |
| `useFlashcardSession(id, cardIds?: string[])` | `{ currentCard, isFlipped, flip(), markGotIt(), markAgain(), progress: number, isComplete, score }` — `cardIds` filters deck to a subset (review mode) |
| `useMCQSession(id, questionIds?: string[])` | `{ currentQuestion, selectedIndex, select(i), submit(), isRevealed, isCorrect, explanation, progress: number, isComplete, score, wrongIds }` — `questionIds` filters to a subset (review mode) |
| `useNavTool(toolId)` | `{ svgState, dispatch(), isComplete, score, total }` — shape varies per tool |
| `useSessionHistory()` | `{ sessions: Session[], appendSession(session) }` |

---

## 9. Existing Designs (Pencil)

Light and dark mode screens already exist for the core Phase 1 screens:

| Screen | Light | Dark | Notes |
|---|---|---|---|
| Home | ✓ | ✓ | V2 nautical variant also exists |
| Topic Detail | ✓ | ✓ | |
| Flashcard | ✓ | ✓ | |
| MCQ Question | ✓ | ✓ | |
| Progress | ✓ | ✓ | |
| Session Complete | ✓ | ✓ | V2 nautical variant also exists |
| Key Facts | — | — | To be designed |
| Topic Progress | — | — | To be designed |

Typography: **Lora** (headings) + **Inter** (body). Primary: `#0066CC` light / `#58A6FF` dark. Navy: `#0A2540`. Dark bg: `#0D1117`.

---

## 10. Out of Scope (Phase 1)

- User accounts / authentication (Convex migration handles this)
- Phase 2 nav tool interactions (routes + placeholder screens are scaffolded; interactions built in Phase 2)
- Offline PWA / service workers
- Server-side data fetching

---

## 11. Success Criteria

**Phase 1 complete when:**
- All 17 topics accessible with Key Facts, Flashcards, and MCQ
- Progress persists across sessions via local storage
- Session Complete accurately scores, identifies weak areas, and supports review mode
- Dark mode works across all screens
- Empty and error states handled per Section 6
- Components follow atomic hierarchy; logic lives in hooks only
- Phase 2 nav tool routes exist with placeholder screens

**Phase 2 complete when:**
- All 10 nav tools are interactive and touch-enabled on mobile
- Each tool provides correct/incorrect feedback with explanation
- Tools are accessible from the relevant topic detail screen
- `useNavTool` hook encapsulates all tool-specific interaction logic
