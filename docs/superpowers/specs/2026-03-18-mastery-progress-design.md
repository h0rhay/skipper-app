# Mastery & Progress System — Design Spec

**Date:** 2026-03-18
**Status:** Approved for implementation

---

## Problem

The current progress system has two issues:

1. **Broken display.** The home screen shows "X / 17 topics complete" but a topic only counts as complete when all three study modes are done and the threshold is crossed. A user who has read facts and done flashcards on 10 topics still sees 0 complete. The number feels wrong.

2. **Viewing ≠ understanding.** Completing a session doesn't mean the material is retained. The app needs a way to capture the user's own judgment: "I've actually got this."

---

## Solution Overview

A user-triggered mastery tier system. Progress reflects both what a user has engaged with and what they've chosen to confirm as understood. Each topic earns a tier (None → Seen → Practised → Passed → Mastered) derived from activity plus explicit user confirmation.

---

## Mastery Tier Model

Tiers are **derived at read time** — not stored directly.

| Tier | Weight | Condition |
|---|---|---|
| `none` | 0 | Nothing accepted |
| `seen` | 0.25 | Facts accepted |
| `practised` | 0.5 | Facts + flashcards accepted |
| `passed` | 0.75 | Practised + MCQ accepted + score ≥ 70% |
| `mastered` | 1.0 | Passed + MCQ score = 100% |

Tiers are sequential. A user can attempt any mode in any order, but the tier only advances once all prior steps are accepted. No hard blocks — the topic detail screen makes the sequence visible so users understand why a tier hasn't advanced.

**Weighted overall progress:**
```
topicWeight = none:0 | seen:0.25 | practised:0.5 | passed:0.75 | mastered:1.0
overallPercent = (sum of all topic weights / total topics) × 100
```

---

## Data Model Changes

### `TopicProgress` (additions)

```typescript
factsAccepted: boolean           // replaces factsRead semantically; stored alongside it
flashcards: {
  // existing fields...
  accepted: boolean              // new
}
mcq: {
  // existing fields...
  accepted: boolean              // new
}
```

`factsAccepted` replaces the role of `factsRead`. `factsRead` is kept for backwards compatibility but `factsAccepted` is the source of truth for tier derivation.

### `UserProgress` (additions)

```typescript
currentStreak: number            // consecutive study days
lastStudiedDate: string          // YYYY-MM-DD, updated on any mode entry
longestStreak: number            // all-time best
```

**Streak rules:**
- Any mode entered (facts, flashcards, MCQ) counts as a study day
- If `today === lastStudiedDate + 1 day`: `currentStreak++`
- If `today === lastStudiedDate`: no change (already counted)
- If gap > 1 day: `currentStreak = 1`, reset
- `longestStreak` updated whenever `currentStreak` exceeds it

---

## New Hooks

### `useTopicMastery(topicId)`
Derives the tier for a topic from existing progress fields.

```typescript
{
  tier: 'none' | 'seen' | 'practised' | 'passed' | 'mastered'
  weight: number  // 0 | 0.25 | 0.5 | 0.75 | 1.0
  acceptFacts: () => void
  acceptFlashcards: () => void
  acceptMCQ: () => void
}
```

The accept callbacks call into `useTopicProgress`'s existing `update()` mechanism. Because `flashcards` and `mcq` are nested objects in `TopicProgress`, the patch must use a **deep merge** (spread the existing nested object, then overwrite `accepted`). The current `update()` uses a shallow merge — it must be extended to deep-merge one level for these nested fields to avoid clobbering `masteredIds`, `totalCards`, `bestScore`, etc.:

```typescript
// Example patch strategy
update({ flashcards: { ...progress.flashcards, accepted: true } })
```

### `useWeightedProgress()`
Replaces `useOverallProgress` for the home/progress screens.

```typescript
{
  percentComplete: number         // 0–100, weighted
  topicTiers: Record<string, Tier>
}
```

### `useStudyStreak()`

```typescript
{
  currentStreak: number
  longestStreak: number
  recordStudyDay: () => void      // call on any mode entry
}
```

---

## Completion Screens

Each study mode navigates to a dedicated results screen on completion. All three follow the same visual rhythm: summary at top, primary CTA, secondary CTA.

**Route strategy:** Three separate route files under `src/routes/topics/$topicId/` — `facts.complete.tsx`, `flashcards.complete.tsx`, and `mcq.complete.tsx`. The existing shared `$mode.complete.tsx` pattern is replaced. Each screen is a standalone component; they do not share a single branching organism. This matches the distinct content and CTA logic of each mode.

### Facts Complete (`/topics/:topicId/facts/complete`)

- Headline: **"Facts Complete"** (topic tag above)
- Large green check icon
- "X key facts reviewed"
- Green badge: "X — All covered"
- Primary CTA: **"Locked in ✓"** → sets `factsAccepted = true`, navigate back to topic
- Secondary CTA: **"Review again"** → navigate back to facts page

### Flashcards Complete (`/topics/:topicId/flashcards/complete`)

- Headline: **"Flashcards Complete"**
- Large score: "X / Y"
- "cards mastered"
- Green badge: "X/Y — Great work!"
- Breakdown: **X Mastered** | **Y Revisit** (two-column, no Skipped)
- Primary CTA: **"Locked in — I've got this ✓"** → sets `flashcards.accepted = true`, navigate back to topic
- Secondary CTA: **"Run through again"** → restarts deck

### MCQ Complete (`/topics/:topicId/mcq/complete`)

Extends the existing Session Complete screen.

**If score ≥ 70%:**
- Percentage badge: green background, "X% — You've passed this topic"
- Primary CTA: **"Accept Pass ✓"** (green) → sets `mcq.accepted = true`, navigate back to topic
- Secondary CTA: **"Go for 100% →"** → reruns MCQ

**If score < 70%:**
- Percentage badge: sand/amber background, "X% — Keep going"
- Primary CTA: **"Try again"** (primary blue) → reruns MCQ
- Secondary CTA: **"Accept anyway"** (dimmed outline) → sets `mcq.accepted = true`, navigate back to topic

---

## Home Screen Changes

**Progress card:**
- Replace "X / 17 topics" with weighted percentage: **"42% complete"**
- Replace hardcoded "Day 1 STREAK" with real streak: **"5 DAY STREAK"** from `useStudyStreak`

**Topic list rows:**
- Replace status dot/text (NOT STARTED / IN PROGRESS) with **tier chip**: `SEEN` / `PRACTISED` / `PASSED` / `MASTERED`
- Colour coding: grey (none), blue (seen), navy (practised), green (passed/mastered)
- Safety-critical topics retain their `CRITICAL` badge alongside the tier chip

---

## Topic Detail Screen Changes

**Study modes list** shows all three modes as a sequential step list:

- **Key Facts** — green check icon + "Accepted ✓" label if `factsAccepted`; otherwise shows subtitle in grey
- **Flashcards** — same pattern, shows "Accepted ✓" or "Flip to reveal — in progress"
- **MCQ Quiz** — same pattern; if facts/flashcards not yet accepted, shows soft inline note: *"Complete facts and flashcards first to reach Passed"* — no hard block, user can still enter

---

## Gamification

Four reinforcement mechanisms, all designed:

1. **Mastery tier chip** on every topic row — visible progress at a glance
2. **MCQ completion screen** — explicit choice between accepting pass or going for 100%; caters to both perfectionists and pragmatists
3. **Study streak counter** on home screen — daily habit signal
4. **Weighted progress bar** — grows meaningfully even when not everything is aced; each tier contributes proportionally

---

## Testing

- **Unit:** Tier derivation for all boundary conditions (none, each tier threshold, 100% MCQ)
- **Unit:** Streak calculation (consecutive days, gap reset, same-day idempotence)
- **Unit:** Weighted progress formula (all none = 0%, all mastered = 100%, mixed)
- **Component:** Facts Complete — both CTAs fire correct callbacks; "Locked in ✓" sets `factsAccepted`
- **Component:** Flashcards Complete — both CTAs; mastered/revisit counts display correctly
- **Component:** MCQ Complete — ≥70% shows green pass state; <70% shows retry state; "Accept anyway" dimmed
- **Component:** Topic detail modes list — accepted steps show check; unmet prerequisite shows soft warning
- **Integration:** Full accept flow — facts → flashcards → MCQ ≥70% → tier = `passed`

---

## Out of Scope

- Spaced repetition / automatic review scheduling
- Server-side sync (remains localStorage)
- User accounts / multi-device progress
