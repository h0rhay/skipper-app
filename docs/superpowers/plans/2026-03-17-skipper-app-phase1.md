# Skipper App — Phase 1 Implementation Plan (Master Overview)

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development or superpowers:executing-plans. Each task has its own PRD in `docs/superpowers/plans/phase1/`. Pick up tasks in wave order. 3 agents can work simultaneously within each wave.

**Goal:** Build the Phase 1 Skipper Day Skipper Theory learning app — all 17 topics, Key Facts / Flashcard / MCQ study modes, progress tracking, dark mode.

**Architecture:** React + TanStack Start. Atomic design (atoms → molecules → organisms → templates → pages). Business logic in hooks only. Local storage with Convex-ready JSON shape.

**Spec:** `docs/superpowers/specs/2026-03-17-skipper-app-design.md`

---

## Dependency Waves

Work within a wave in parallel (up to 3 agents). Do not start a wave until all tasks in the previous wave are merged.

```
Wave 1 (solo)
└── T01 — Project Scaffold

Wave 2 (T02 first, then T03+T04 can run in parallel after T02 ProgressBar is done)
├── T02 — Design Tokens + Atoms         ← must complete before T03 SessionPage step
├── T03 — Templates                     ← SessionPage step requires T02 ProgressBar
└── T04 — Data Layer + Hooks

Wave 3 (1 agent — after T02)
└── T05 — Molecules (includes BackHeader)

Wave 4 (3 agents in parallel — after T03 + T04 + T05)
├── T06 — HomeScreen (includes TabBar organism)
├── T07 — TopicDetailScreen
└── T08 — ProgressScreen + TopicProgressScreen

Wave 5 (3 agents in parallel — after T03 + T04 + T05)
├── T09 — KeyFactsScreen
├── T10 — FlashcardSessionScreen
└── T11 — MCQSessionScreen

Wave 6 (after Wave 4 + Wave 5)
├── T12 — SessionCompleteScreen
├── T13 — Dark Mode
└── T14 — Phase 2 Scaffold (after T03 + T04 + T07)
```

---

## File Structure

```
skipper/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Badge/            Badge.tsx, Badge.test.tsx, index.ts
│   │   │   ├── Button/           Button.tsx, Button.test.tsx, index.ts
│   │   │   ├── ProgressBar/      ProgressBar.tsx, ProgressBar.test.tsx, index.ts
│   │   │   ├── Icon/             Icon.tsx, Icon.test.tsx, index.ts
│   │   │   ├── Label/            Label.tsx, Label.test.tsx, index.ts
│   │   │   ├── Divider/          Divider.tsx, Divider.test.tsx, index.ts
│   │   │   ├── ScoreRing/        ScoreRing.tsx, ScoreRing.test.tsx, index.ts
│   │   │   ├── OptionButton/     OptionButton.tsx, OptionButton.test.tsx, index.ts
│   │   │   └── Counter/          Counter.tsx, Counter.test.tsx, index.ts
│   │   ├── molecules/
│   │   │   ├── TopicRow/
│   │   │   ├── StudyModeRow/
│   │   │   ├── FlashCard/
│   │   │   ├── KeyTermRow/
│   │   │   ├── SessionStatRow/
│   │   │   ├── TopicProgressRow/
│   │   │   ├── NavToolRow/
│   │   │   └── SafetyNote/
│   │   ├── organisms/
│   │   │   ├── TopicList/
│   │   │   ├── ResumeCard/
│   │   │   ├── OverallProgressCard/
│   │   │   ├── TopicHeader/
│   │   │   ├── StudyModeList/
│   │   │   ├── FlashcardDeck/
│   │   │   ├── MCQQuestion/
│   │   │   ├── SessionSummary/
│   │   │   ├── WeakTopicsList/
│   │   │   ├── TopicProgressDetail/
│   │   │   └── NavToolCanvas/
│   │   └── templates/
│   │       ├── AppShell/
│   │       ├── ScrollPage/
│   │       ├── SessionPage/
│   │       ├── CentredCard/
│   │       └── FullscreenCanvas/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── screens/
│   │       ├── home.module.css
│   │       ├── topic-detail.module.css
│   │       ├── progress.module.css
│   │       └── key-facts.module.css
│   ├── hooks/
│   │   ├── useTopics.ts
│   │   ├── useTopicProgress.ts
│   │   ├── useOverallProgress.ts
│   │   ├── useWeakTopics.ts
│   │   ├── useLastSession.ts
│   │   ├── useFlashcardSession.ts
│   │   ├── useMCQSession.ts
│   │   └── useSessionHistory.ts
│   ├── services/
│   │   └── storage.ts
│   ├── data/
│   │   └── topics.json
│   ├── types/
│   │   └── index.ts
│   └── routes/
│       ├── __root.tsx
│       ├── index.tsx
│       ├── topics/
│       │   └── $topicId/
│       │       ├── index.tsx
│       │       ├── facts.tsx
│       │       ├── flashcards.tsx
│       │       ├── mcq.tsx
│       │       ├── $mode.complete.tsx
│       │       └── nav.$toolId.tsx
│       └── progress/
│           ├── index.tsx
│           └── $topicId.tsx
├── app.config.ts
├── package.json
└── tsconfig.json
```

---

## PRD Index

| Task | File | Wave | Depends On |
|------|------|------|-----------|
| T01 | `phase1/T01-scaffold.md` | 1 | — |
| T02 | `phase1/T02-design-tokens-atoms.md` | 2 | T01 |
| T03 | `phase1/T03-templates.md` | 2 | T01 |
| T04 | `phase1/T04-data-layer.md` | 2 | T01 |
| T05 | `phase1/T05-molecules.md` | 3 | T02 |
| T06 | `phase1/T06-home-screen.md` | 4 | T03, T04, T05 |
| T07 | `phase1/T07-topic-detail-screen.md` | 4 | T03, T04, T05 |
| T08 | `phase1/T08-progress-screen.md` | 4 | T03, T04, T05 |
| T09 | `phase1/T09-key-facts-screen.md` | 5 | T03, T04, T05 |
| T10 | `phase1/T10-flashcard-session.md` | 5 | T03, T04, T05 |
| T11 | `phase1/T11-mcq-session.md` | 5 | T03, T04, T05 |
| T12 | `phase1/T12-session-complete.md` | 6 | T06–T11 |
| T13 | `phase1/T13-dark-mode.md` | 6 | T06–T11 |
| T14 | `phase1/T14-phase2-scaffold.md` | 6 | T03, T04, T07 |
