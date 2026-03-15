# RYA Day Skipper Knowledge Base — Design Spec

## Purpose

Build a verified, structured, app-ready knowledge base from the RYA Day Skipper manual (36 handbook pages) enriched with authoritative web sources. This is Phase 1 of a two-phase project. Phase 2 will use this content to build a mobile web training app (flashcards, MCQs, swipe questions) for self-study and potential commercial release.

## Audience

European sailors studying for the RYA Day Skipper theory qualification. All buoyage and navigation marker content uses **IALA Region A** (red to port). IALA Region B differences (Americas, Japan, South Korea) are explicitly flagged but never presented as primary learning content.

---

## Safety Constraint — Non-Negotiable

This knowledge base may be used to train people who will navigate real vessels in real waters. **A factual error in navigation, buoyage, or collision avoidance content could result in grounding, collision, injury, or death.**

**The rule:** No fact enters a syllabus file `Key Facts` or `Key Terms` section unless it has a named, verifiable, authoritative **primary source** cited inline. If a primary source cannot be found, the content does not go in. No exceptions.

Safety-critical topics requiring primary-source-only citations:
- **Buoyage:** IALA Publication O-1 (Maritime Buoyage System) — local copy required (see Stream 2)
- **Collision regulations:** IMO COLREGS 1972 as IRPCS — local copy required (see Stream 2)
- **Lights & signals:** COLREGS Annexes — local copy required (see Stream 2)
- **Tidal calculations:** UKHO / RYA official methods
- **Chart symbols:** UKHO Chart 5011 (Symbols and Abbreviations) — local copy required (see Stream 2); chart symbol facts may not appear in `Key Facts` unless verified against local Chart 5011 copy

**Note on COLREGS vs IRPCS:** These are the same rules. COLREGS = common international shorthand (IMO). IRPCS = term used by RYA in training materials. We use **IRPCS** throughout to match RYA convention. Primary source: IMO Convention on the International Regulations for Preventing Collisions at Sea, 1972. Stream 2 Agent E must confirm and record the current in-force amendment number — all IRPCS citations must reference it.

**Supplementary sources (Agent F output) may only populate `Flashcard Candidates`, `MCQ Candidates`, and `Summary` sections. They must never be the sole source for any entry in `Key Facts` or `Key Terms`. Any Key Fact derived partly from a supplementary source must still carry a primary source citation.**

---

## Directory Structure

```
skipper/
├── resources/                    # source images (untouched, read-only)
│   └── 1-*.jpg ... 36-*.jpg
│
├── transcripts/                  # faithful transcripts, one per image
│   ├── page-01-*.md
│   └── ... (36 files, named after content derived from image)
│
├── research/                     # web research findings
│   ├── sources.md                # master citation registry (schema defined below)
│   ├── rya-syllabus-topics.md    # canonical topic + reference table from Agent E
│   ├── colregs-irpcs-text.md     # IRPCS rules extracted from primary source
│   ├── iala-buoyage-text.md      # IALA Region A buoyage facts from primary source
│   ├── chart-5011-symbols.md     # UKHO Chart 5011 symbols extracted from primary source
│   └── supplementary-*.md       # Agent F findings (supplementary only)
│
├── syllabus/                     # final compiled, verified, app-ready output
│   ├── 00-overview.md            # master index, topic map, verification status
│   └── [N]-[topic-slug].md       # one file per topic (count TBD after image read)
│
└── docs/superpowers/
    ├── specs/
    └── plans/
```

**Syllabus file names and count are not predetermined.** They are derived from:
1. Reading all 36 source images
2. Cross-referencing against the official RYA Day Skipper theory syllabus (rya.org.uk)
3. Using the canonical reference table produced by Stream 2 Agent E

Nothing is named or structured from assumptions.

---

## Transcript Schema

Each image produces exactly one transcript file. Transcripts are **source-of-truth only** — no interpretation, no embellishment, nothing added that is not visible in the image.

```markdown
---
source_image: "resources/[filename].jpg"
page_number: [N]
topics_visible: ["", ""]   # list of topic headings visible in the image
faithfulness: "transcription-only"   # fixed value — must always be exactly this string
---

# Page [N] — [Short descriptive title derived from image content]

## Visible Headings
- [Exact heading text as it appears in the image]

## Content

### [Heading 1 — exact text from image]
[Transcribe all visible text exactly as it appears. If text is partially obscured, note: [PARTIALLY OBSCURED]. Do not interpret or fill in gaps.]

### [Heading 2 — exact text from image]
[...]

## Diagrams & Illustrations
[Describe each diagram: what it shows, what labels are visible, what arrows or annotations indicate — verbatim from the image only]

## Transcription Notes
[Any image quality issues, illegible text, or ambiguities encountered]
```

Rules:
- Never set any `verified` field in transcripts — they are raw source material
- Never add context, definitions, or explanations not visible in the image
- If an image is substantially illegible, record what is readable and set a `[ILLEGIBLE]` note
- Transcripts are never edited after creation

---

## Syllabus File Schema

Every syllabus file follows this schema exactly:

```markdown
---
rya_topic: ""                         # value from rya-syllabus-topics.md canonical table
rya_syllabus_ref: ""                  # value from rya-syllabus-topics.md canonical table
iala_region: "A" | "N/A"             # "A" for regional topics; "N/A" for non-regional
source_images: []                     # page numbers from transcripts/
verification_status: "pending"        # pending | failed | passed
verification_date: ""                 # YYYY-MM-DD format. Set ONLY by the Devil's Advocate verification agent, never by the synthesis agent. Set only when verification_status = passed.
---

# [Topic Name]

## Summary
Plain-English explanation, 1–2 paragraphs. May draw on supplementary sources.

## Key Facts
- Fact one [Source: Publication Name, Rule/Section ref]
- Fact two [Source: ...]
- ⚠️ IALA Region B note (where applicable): [explicit difference stated — e.g. "In IALA Region B (Americas, Japan, South Korea) colours are reversed: red to starboard"]

## Key Terms
| Term | Definition | Source |
|------|-----------|--------|
| term | definition | Publication, Rule/Section ref |

## Flashcard Candidates
- Q: [question] | A: [answer] | Source: [citation]

## MCQ Candidates
Each MCQ must have exactly 4 options (a, b, c, d). The correct answer position must vary — do not always place the correct answer in the same position. Distractors must be plausible (common misconceptions or easily confused alternatives), not obviously absurd.

Format:
```
Q: [question text]
(a) [option]
(b) [option]
(c) [option]
(d) [option]
Correct: [letter]
Source: [citation]
```

## ⚠️ Safety-Critical Notes
<!-- Include this block only on files where iala_region = "A" or topics involve IRPCS, lights, signals, tides, or chart symbols -->
<!-- Content: specific warnings about common misapplication of rules; known regional differences; anything a student might plausibly get backwards with dangerous consequences -->
> Verified against primary source before verification_status set to "passed"

## Sources
- [Full citation per sources.md schema] — primary / supplementary
- Source images: [list of transcript file names]

## Unverified / Needs Citation
<!-- Content that could not be sourced goes HERE only, never in Key Facts or Key Terms -->
<!-- Format: [UNVERIFIED] statement — reason it could not be sourced -->
```

---

## `research/sources.md` Schema

All agents writing to `sources.md` must use this exact format. **Agents E and F write to separate sections of the file** to avoid parallel write conflicts:

```markdown
# Sources Registry

## Primary Sources (Agent E)

| ID | Title | Publisher | Edition/Amendment | URL | Access Date | Local Copy |
|----|-------|-----------|------------------|-----|-------------|------------|
| SRC-001 | [title] | [publisher] | [ed/amendment] | [url] | [YYYY-MM-DD] | [filename or "none"] |

## Supplementary Sources (Agent F)

| ID | Title | Publisher | Type | URL | Access Date | Notes |
|----|-------|-----------|------|-----|-------------|-------|
| SUP-001 | [title] | [publisher] | [blog/pdf/site] | [url] | [YYYY-MM-DD] | [brief note on relevance] |
```

Citations in syllabus files reference sources by ID (e.g. `[Source: SRC-001, Rule 18(a)]`).

---

## `research/rya-syllabus-topics.md` — Canonical Reference Table

Agent E must produce this file before synthesis begins. It defines the authoritative values for `rya_topic` and `rya_syllabus_ref` fields across all syllabus files. Format:

```markdown
# RYA Day Skipper Theory — Canonical Topic Reference

Source: [RYA official syllabus URL, access date]

| rya_topic | rya_syllabus_ref | Safety-Critical | IALA Regional |
|-----------|-----------------|-----------------|---------------|
| [topic]   | [section ref]   | yes/no          | yes/no        |
```

All synthesis agents must use values from this table only. No agent may invent `rya_topic` or `rya_syllabus_ref` values.

---

## Agent Workflow

### Stream 1 — Image Transcription (4 parallel agents)

| Agent | Images | Output |
|-------|--------|--------|
| A | 1–9 | transcripts/page-01 to page-09 |
| B | 10–18 | transcripts/page-10 to page-18 |
| C | 19–27 | transcripts/page-19 to page-27 |
| D | 28–36 | transcripts/page-28 to page-36 |

Each agent produces one transcript file per image using the Transcript Schema above. If an image is illegible, the agent still produces a file, marks content `[ILLEGIBLE]`, and continues.

### Stream 2 — Web Research (2 parallel agents)

**Agent E — Official Primary Sources:**
- RYA Day Skipper official theory syllabus (rya.org.uk) — produce `rya-syllabus-topics.md`
- IMO COLREGS/IRPCS — confirm current in-force amendment; extract key rules to `colregs-irpcs-text.md`
- IALA Publication O-1, Maritime Buoyage System — extract Region A content to `iala-buoyage-text.md`
- UKHO Chart 5011 — extract chart symbols reference to `research/chart-5011-symbols.md`
- MCA safety equipment requirements
- All logged to `sources.md` Primary Sources section with local copy filename where extracted

**Agent F — Supplementary Materials:**
- RYA free course notes or sample materials
- Practice Day Skipper theory exam papers
- Reputable sailing training resources
- All logged to `sources.md` Supplementary Sources section only
- Agent F output must never be used as primary source for Key Facts or Key Terms

### Stream 3 Gate — Explicit Start Condition

Stream 3 **must not begin** until all of the following are true:
1. All 36 transcript files exist in `transcripts/` (illegible files acceptable, missing files are not)
2. `research/rya-syllabus-topics.md` exists and contains at least one verified topic row
3. `research/sources.md` contains at least one confirmed entry for each of: IRPCS, IALA O-1, Chart 5011, RYA Day Skipper syllabus
4. Local copy files exist in `research/` for: IRPCS (`colregs-irpcs-text.md`), IALA O-1 (`iala-buoyage-text.md`), and Chart 5011 (`chart-5011-symbols.md`)

### Stream 3 — Synthesis (sequential)

1. Derive syllabus topic list from `rya-syllabus-topics.md` (authoritative) + transcripts (supplementary discovery)
2. Create `syllabus/00-overview.md` with full topic map and `verification_status: pending` for all topics
3. For each topic: create syllabus file merging transcript content + primary research findings
4. Flag safety-critical files; set `iala_region` appropriately
5. Run devil's advocate review topic by topic (see below)
6. Update `00-overview.md` with final verification status per topic

---

## Devil's Advocate Verification

A verification agent reviews each syllabus file. Operates against local copies in `research/` — does **not** rely on live web fetches for primary source verification.

**Mandate:**
1. For every entry in `Key Facts` and `Key Terms`: locate the cited source in `research/` local files; confirm the source says what the file claims
2. If source confirms claim: retain
3. If source contradicts or does not confirm claim: move statement to `Unverified / Needs Citation` block; note the discrepancy
4. Check every buoyage statement explicitly states IALA Region A; flag any ambiguous statement
5. Check every IRPCS claim cites a specific Rule number referencing the confirmed in-force amendment
6. Check MCQ format: exactly 4 options, correct answer position varies, distractors are plausible

**Verdict per file:**
- ✅ PASS — set `verification_status: passed`, set `verification_date`
- ❌ FAIL — list specific issues; file returned for correction

**Escalation rule:**
- If a file fails verification twice: the synthesis agent must not attempt a third fix autonomously
- The file is held from the syllabus with `verification_status: failed`
- An `[ESCALATED]` flag and explanation is added to that topic row in `00-overview.md`
- Human review is required before that topic proceeds

**Tie-breaking rule — primary source governs Key Facts:**
When wording in a transcript (RYA manual paraphrase) differs from the primary source text (e.g. IMO IRPCS exact rule wording), the **primary source text governs for `Key Facts` and `Key Terms`**. The RYA paraphrase may appear in the `Summary` section only, clearly attributed. The verification agent must flag any case where the two wordings differ materially, even if both are technically correct, so the synthesis agent can use exact primary source language in Key Facts.

**No file enters the final syllabus with `verification_status` other than `passed`.**

---

## Final Deliverables

| Deliverable | Description |
|-------------|-------------|
| `transcripts/` (36 files) | Faithful transcripts. Source of truth. Never edited post-creation. |
| `research/sources.md` | Master citation registry with full bibliographic details. |
| `research/rya-syllabus-topics.md` | Canonical topic reference table from official RYA syllabus. |
| `research/colregs-irpcs-text.md` | IRPCS rules extracted from primary source for offline verification. |
| `research/iala-buoyage-text.md` | IALA Region A buoyage facts from primary source for offline verification. |
| `research/chart-5011-symbols.md` | UKHO Chart 5011 symbols extracted from primary source for offline verification. |
| `syllabus/00-overview.md` | Master index: full RYA topic map, verification status, escalation flags. |
| `syllabus/[topic].md` (N files) | App-ready topic files. Only `verification_status: passed` files included. |

---

## Out of Scope (Phase 1)

- Building the app (Phase 2)
- Writing full practice exam papers (Phase 2)
- UI/UX design (Phase 2)
- IALA Region B content as primary learning material (flagged only)

---

## Phase 2 Inputs

Phase 2 (mobile web app) receives:
- Structured markdown parseable for flashcard and MCQ content (4-option standardised format)
- `verification_status: passed` as a machine-readable app-inclusion gate
- Safety-critical `⚠️` flags for prominent UI rendering
- `sources.md` citation registry for "further reading" features
- IALA Region B warnings clearly marked for future international-audience expansion
- `[ESCALATED]` topic flags signalling content requiring expert human review before app inclusion
