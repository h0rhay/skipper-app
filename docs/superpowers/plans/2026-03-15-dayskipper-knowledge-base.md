# RYA Day Skipper Knowledge Base — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a fully verified, structured, app-ready knowledge base of the RYA Day Skipper theory syllabus from 36 handbook images and authoritative web sources, with zero unverified facts in any safety-critical section.

**Architecture:** Four parallel transcription agents and two parallel research agents run simultaneously in Streams 1 and 2. A gate check confirms all prerequisites before Stream 3 synthesis begins. Each synthesised topic file then passes through a devil's advocate verification agent before entering the final syllabus.

**Tech Stack:** Claude agents (Read, Write, WebSearch, WebFetch tools), Markdown, YAML frontmatter. No build system. No code. Content project only.

**Spec:** `docs/superpowers/specs/2026-03-15-dayskipper-knowledge-base-design.md`

---

## Files To Be Created

### Setup
- `transcripts/` directory (36 files, one per image)
- `research/sources.md` — master citation registry
- `research/rya-syllabus-topics.md` — canonical topic reference table (Agent E)
- `research/colregs-irpcs-text.md` — IRPCS rules local copy (Agent E)
- `research/iala-buoyage-text.md` — IALA Region A buoyage local copy (Agent E)
- `research/chart-5011-symbols.md` — UKHO Chart 5011 symbols local copy (Agent E)
- `research/supplementary-*.md` — Agent F supplementary findings
- `syllabus/00-overview.md` — master index and verification status tracker
- `syllabus/[N]-[topic-slug].md` — one per topic (count determined during synthesis)

---

## Chunk 1: Project Setup

### Task 1: Initialise Directory Structure and Source Registry

**Files:**
- Create: `transcripts/` (directory)
- Create: `research/sources.md`
- Create: `research/` (directory)
- Create: `syllabus/` (directory)

- [ ] **Step 1.1: Create directory structure**

```bash
cd /Users/george.clark/Sites/@dev/skipper
mkdir -p transcripts research syllabus
git init
git add .
git commit -m "chore: initialise project directory structure"
```

Expected: git repo created, three empty directories committed.

- [ ] **Step 1.2: Create sources.md skeleton**

Create `research/sources.md` with the following content exactly:

```markdown
# Sources Registry

<!-- DO NOT edit the table headers or section labels. Agents append rows only. -->
<!-- Agent E writes to Primary Sources section only. Agent F writes to Supplementary Sources section only. -->

## Primary Sources (Agent E)

| ID | Title | Publisher | Edition/Amendment | URL | Access Date | Local Copy |
|----|-------|-----------|------------------|-----|-------------|------------|

## Supplementary Sources (Agent F)

| ID | Title | Publisher | Type | URL | Access Date | Notes |
|----|-------|-----------|------|-----|-------------|-------|
```

- [ ] **Step 1.3: Commit setup**

```bash
git add research/sources.md
git commit -m "chore: add sources registry skeleton"
```

Expected: `research/sources.md` committed with empty table rows.

---

## Chunk 2: Stream 1 — Image Transcription (4 Parallel Agents)

> These four tasks run in parallel. Dispatch all four agents simultaneously before waiting for results.
> Each agent uses the Transcript Schema from the spec exactly.
> Source images are at: `/Users/george.clark/Sites/@dev/skipper/resources/`

### Task 2A: Transcribe Images 1–9

**Files:**
- Read: `resources/1-432dc6f15b.jpg` through `resources/9-436d17359b.jpg`
- Create: `transcripts/page-01-*.md` through `transcripts/page-09-*.md`

Each transcript file must follow this schema exactly:

```markdown
---
source_image: "resources/[exact-filename].jpg"
page_number: [N]
topics_visible: ["", ""]
faithfulness: "transcription-only"   # fixed value — must always be exactly this string
---

# Page [N] — [Short descriptive title derived from image content]

## Visible Headings
- [Exact heading text as it appears in the image]

## Content

### [Heading — exact text from image]
[Transcribe all visible text exactly. Mark partially obscured text: [PARTIALLY OBSCURED]]

## Diagrams & Illustrations
[Describe each diagram: what it shows, labels visible, arrows/annotations — verbatim from image only]

## Transcription Notes
[Image quality issues, illegible text, ambiguities]
```

Rules:
- File names: derive a short slug from the main topic visible in the image, e.g. `page-01-cover.md`, `page-02-boat-anatomy-above-deck.md`
- Never add context, definitions, or explanations not visible in the image
- If image is substantially illegible, mark content `[ILLEGIBLE]` and still create the file
- Never set a `verified` field

- [ ] **Step 2A.1: Read image 1 and create transcript**

Read `/Users/george.clark/Sites/@dev/skipper/resources/1-432dc6f15b.jpg`, apply schema, write `transcripts/page-01-cover.md`.

- [ ] **Step 2A.2: Read image 2 and create transcript**

Read `resources/2-ed9750bea3.jpg`, write `transcripts/page-02-[slug].md`.

- [ ] **Step 2A.3: Read image 3 and create transcript**

Read `resources/3-b4cef309ef.jpg`, write `transcripts/page-03-[slug].md`.

- [ ] **Step 2A.4: Read image 4 and create transcript**

Read `resources/4-84b3c954a0.jpg`, write `transcripts/page-04-[slug].md`.

- [ ] **Step 2A.5: Read image 5 and create transcript**

Read `resources/5-b4ced4e04a.jpg`, write `transcripts/page-05-[slug].md`.

- [ ] **Step 2A.6: Read image 6 and create transcript**

Read `resources/6-a22151fa93.jpg`, write `transcripts/page-06-[slug].md`.

- [ ] **Step 2A.7: Read image 7 and create transcript**

Read `resources/7-22db851368.jpg`, write `transcripts/page-07-[slug].md`.

- [ ] **Step 2A.8: Read image 8 and create transcript**

Read `resources/8-2cba5473fb.jpg`, write `transcripts/page-08-[slug].md`.

- [ ] **Step 2A.9: Read image 9 and create transcript**

Read `resources/9-436d17359b.jpg`, write `transcripts/page-09-[slug].md`.

- [ ] **Step 2A.10: Verify and commit**

Verify: 9 files exist in `transcripts/`, each has `faithfulness: "transcription-only"` in frontmatter.

```bash
ls transcripts/page-0*.md | wc -l   # expect 9
git add transcripts/page-0[1-9]-*.md
git commit -m "docs: transcribe handbook pages 1-9"
```

---

### Task 2B: Transcribe Images 10–18

**Files:**
- Read: `resources/10-883684ca1b.jpg` through `resources/18-935027cf3b.jpg`
- Create: `transcripts/page-10-*.md` through `transcripts/page-18-*.md`

Follow the same schema and rules as Task 2A.

- [ ] **Step 2B.1:** Read `resources/10-883684ca1b.jpg`, write `transcripts/page-10-[slug].md`
- [ ] **Step 2B.2:** Read `resources/11-0d3c2a6777.jpg`, write `transcripts/page-11-[slug].md`
- [ ] **Step 2B.3:** Read `resources/12-edc33fa486.jpg`, write `transcripts/page-12-[slug].md`
- [ ] **Step 2B.4:** Read `resources/13-270af22d23.jpg`, write `transcripts/page-13-[slug].md`
- [ ] **Step 2B.5:** Read `resources/14-0c0e0c45b9.jpg`, write `transcripts/page-14-[slug].md`
- [ ] **Step 2B.6:** Read `resources/15-8c8b14024c.jpg`, write `transcripts/page-15-[slug].md`
- [ ] **Step 2B.7:** Read `resources/16-05aad4576d.jpg`, write `transcripts/page-16-[slug].md`
- [ ] **Step 2B.8:** Read `resources/17-9939859603.jpg`, write `transcripts/page-17-[slug].md`
- [ ] **Step 2B.9:** Read `resources/18-935027cf3b.jpg`, write `transcripts/page-18-[slug].md`

- [ ] **Step 2B.10: Verify and commit**

```bash
ls transcripts/page-1[0-8]-*.md | wc -l   # expect 9
git add transcripts/page-1[0-8]-*.md
git commit -m "docs: transcribe handbook pages 10-18"
```

---

### Task 2C: Transcribe Images 19–27

**Files:**
- Read: `resources/19-6fcd8876ba.jpg` through `resources/27-06613db7f1.jpg`
- Create: `transcripts/page-19-*.md` through `transcripts/page-27-*.md`

Follow the same schema and rules as Task 2A.

- [ ] **Step 2C.1:** Read `resources/19-6fcd8876ba.jpg`, write `transcripts/page-19-[slug].md`
- [ ] **Step 2C.2:** Read `resources/20-41b68d6b21.jpg`, write `transcripts/page-20-[slug].md`
- [ ] **Step 2C.3:** Read `resources/21-3f074ee5b4.jpg`, write `transcripts/page-21-[slug].md`
- [ ] **Step 2C.4:** Read `resources/22-f44439680d.jpg`, write `transcripts/page-22-[slug].md`
- [ ] **Step 2C.5:** Read `resources/23-8cec2b00e7.jpg`, write `transcripts/page-23-[slug].md`
- [ ] **Step 2C.6:** Read `resources/24-d8ce108f02.jpg`, write `transcripts/page-24-[slug].md`
- [ ] **Step 2C.7:** Read `resources/25-4ff6c2428f.jpg`, write `transcripts/page-25-[slug].md`
- [ ] **Step 2C.8:** Read `resources/26-7a2457522a.jpg`, write `transcripts/page-26-[slug].md`
- [ ] **Step 2C.9:** Read `resources/27-06613db7f1.jpg`, write `transcripts/page-27-[slug].md`

- [ ] **Step 2C.10: Verify and commit**

```bash
ls transcripts/page-19-*.md transcripts/page-2[0-7]-*.md | wc -l   # expect 9
git add transcripts/page-19-*.md transcripts/page-2[0-7]-*.md
git commit -m "docs: transcribe handbook pages 19-27"
```

---

### Task 2D: Transcribe Images 28–36

**Files:**
- Read: `resources/28-de1c685387.jpg` through `resources/36-c9f4b52782.jpg`
- Create: `transcripts/page-28-*.md` through `transcripts/page-36-*.md`

Follow the same schema and rules as Task 2A.

- [ ] **Step 2D.1:** Read `resources/28-de1c685387.jpg`, write `transcripts/page-28-[slug].md`
- [ ] **Step 2D.2:** Read `resources/29-e7c34a4124.jpg`, write `transcripts/page-29-[slug].md`
- [ ] **Step 2D.3:** Read `resources/30-a7031514ba.jpg`, write `transcripts/page-30-[slug].md`
- [ ] **Step 2D.4:** Read `resources/31-1d96acb080.jpg`, write `transcripts/page-31-[slug].md`
- [ ] **Step 2D.5:** Read `resources/32-40678855bf.jpg`, write `transcripts/page-32-[slug].md`
- [ ] **Step 2D.6:** Read `resources/33-a089b93d9f.jpg`, write `transcripts/page-33-[slug].md`
- [ ] **Step 2D.7:** Read `resources/34-8368317236.jpg`, write `transcripts/page-34-[slug].md`
- [ ] **Step 2D.8:** Read `resources/35-84d56be6bf.jpg`, write `transcripts/page-35-[slug].md`
- [ ] **Step 2D.9:** Read `resources/36-c9f4b52782.jpg`, write `transcripts/page-36-[slug].md`

- [ ] **Step 2D.10: Verify and commit**

```bash
ls transcripts/page-2[8-9]-*.md transcripts/page-3[0-6]-*.md | wc -l   # expect 9
git add transcripts/page-2[8-9]-*.md transcripts/page-3[0-6]-*.md
git commit -m "docs: transcribe handbook pages 28-36"
```

---

## Chunk 3: Stream 2 — Web Research (2 Parallel Agents)

> Tasks 3A and 3B run in parallel with each other, AND in parallel with Chunk 2.
> They write to separate sections of sources.md — no write conflicts possible.

### Task 3A: Agent E — Official Primary Sources

**Files:**
- Write: `research/sources.md` (Primary Sources section only)
- Create: `research/rya-syllabus-topics.md`
- Create: `research/colregs-irpcs-text.md`
- Create: `research/iala-buoyage-text.md`
- Create: `research/chart-5011-symbols.md`

**Safety note:** The local copy files created here are the ONLY sources the devil's advocate verification agent will use to verify safety-critical facts. If a primary source cannot be extracted, that fact category cannot appear in Key Facts. Do not skip or approximate.

**sources.md write rule:** Append rows to the `## Primary Sources (Agent E)` section ONLY. Do not rewrite or overwrite the entire file. Read the current file, add your rows to the designated section, and write the result. Agent F writes to the Supplementary Sources section — do not touch that section. If a git merge conflict occurs on sources.md, resolve it by preserving ALL rows from both sections.

- [ ] **Step 3A.1: Fetch RYA Day Skipper theory syllabus**

Search for and fetch the official RYA Day Skipper theory syllabus from rya.org.uk. The goal is to find the complete list of topics covered in the theory course. If the syllabus is behind a login, search for cached/public versions or RYA training syllabi PDFs.

What to capture: every topic name, its section reference code (if any), and whether it involves navigation, buoyage, lights, or collision regulations.

Write findings to `research/rya-syllabus-topics.md` using this exact format:

```markdown
---
source: "[URL fetched]"
access_date: "YYYY-MM-DD"
notes: "[any access limitations encountered]"
---

# RYA Day Skipper Theory — Canonical Topic Reference

Source: [full URL], accessed [date]

| rya_topic | rya_syllabus_ref | Safety-Critical | IALA Regional |
|-----------|-----------------|-----------------|---------------|
| [topic]   | [section ref]   | yes/no          | yes/no        |
```

Add a row to `research/sources.md` Primary Sources section:
`| SRC-001 | RYA Day Skipper Theory Syllabus | Royal Yachting Association | [version/date] | [URL] | [date] | rya-syllabus-topics.md |`

- [ ] **Step 3A.2: Fetch and extract IRPCS/COLREGS text**

Search for the IMO Convention on the International Regulations for Preventing Collisions at Sea, 1972 (COLREGS). Locate the current in-force version including all amendments. The IMO website (imo.org) is the authoritative source.

Confirm and record the current amendment number/resolution reference.

Extract the full Rules text (Rules 1–38 and all Annexes) to `research/colregs-irpcs-text.md`. Format:

```markdown
---
source: "IMO Convention on the International Regulations for Preventing Collisions at Sea, 1972"
current_amendment: "[Amendment number/Resolution reference]"
access_date: "YYYY-MM-DD"
---

# IRPCS — International Regulations for Preventing Collisions at Sea

## Part A — General

### Rule 1 — Application
[Exact rule text]

### Rule 2 — Responsibility
[Exact rule text]

[... all rules ...]

## Annexes
### Annex I — [Title]
[Exact text]
[... all annexes ...]
```

Add to `research/sources.md` Primary Sources section:
`| SRC-002 | Convention on the International Regulations for Preventing Collisions at Sea, 1972 | IMO | [amendment ref] | [URL] | [date] | colregs-irpcs-text.md |`

- [ ] **Step 3A.3: Fetch and extract IALA Region A buoyage**

Search for IALA Publication O-1, Maritime Buoyage System (iala-aism.org or equivalent authoritative source). Extract the Region A content. If the primary URL is behind a login or paywall, search for "IALA O-1 maritime buoyage system pdf" or "IALA maritime buoyage Region A specification". **If no usable copy can be obtained after multiple attempts, stop and escalate to the human immediately with a description of what was attempted and the access limitation — do not create an empty or placeholder file and continue.**

Write to `research/iala-buoyage-text.md`:

```markdown
---
source: "IALA Publication O-1, Maritime Buoyage System"
edition: "[edition number]"
access_date: "YYYY-MM-DD"
---

# IALA Maritime Buoyage System — Region A

## Region A Definition
[Exact text defining Region A coverage]

## Lateral Marks
[Exact specifications: colours, shapes, topmarks, lights for port-hand and starboard-hand marks]

## Cardinal Marks
[Exact specifications]

## Isolated Danger Marks
[Exact specifications]

## Safe Water Marks
[Exact specifications]

## Special Marks
[Exact specifications]

## New Danger Marks
[Exact specifications]

## Region B Differences
[Explicit statement of how Region B differs — for reference/flagging only]
```

Add to `research/sources.md` Primary Sources section:
`| SRC-003 | IALA Publication O-1, Maritime Buoyage System | IALA | [edition] | [URL] | [date] | iala-buoyage-text.md |`

- [ ] **Step 3A.4: Fetch and extract UKHO Chart 5011 symbols**

Search for UKHO Chart 5011, Symbols and Abbreviations used on Admiralty Charts (also available as NP 5011). This is the authoritative reference for all chart symbols used in UK/European waters. If not freely accessible, search for "NP 5011 admiralty chart symbols pdf" or "UKHO chart symbols abbreviations free". **If no usable copy can be obtained after multiple attempts, stop and escalate to the human immediately — do not create an empty or placeholder file and continue.**

Extract the key symbols relevant to Day Skipper level: depth contours, wrecks, rocks, buoys, lights, anchorages, hazards, tidal symbols.

Write to `research/chart-5011-symbols.md`:

```markdown
---
source: "UKHO NP 5011 — Symbols and Abbreviations used on Admiralty Charts"
edition: "[edition number]"
access_date: "YYYY-MM-DD"
---

# Chart Symbols — UKHO NP 5011

## Section [N]: [Category]
| Symbol | Meaning | Notes |
|--------|---------|-------|
| [symbol description] | [exact meaning from source] | [any caveats] |
```

Add to `research/sources.md` Primary Sources section:
`| SRC-004 | NP 5011 — Symbols and Abbreviations used on Admiralty Charts | UKHO | [edition] | [URL] | [date] | chart-5011-symbols.md |`

- [ ] **Step 3A.5: Fetch MCA safety equipment requirements**

Search for MCA (Maritime and Coastguard Agency) guidance on safety equipment for leisure craft in Category 4–6 waters (coastal/day sailing — appropriate for Day Skipper level).

This does not require a local copy file — it informs the Safety Equipment topic in the syllabus and must be cited by source ID in that topic file.

Add to `research/sources.md` Primary Sources section:
`| SRC-005 | [MCA publication title] | Maritime and Coastguard Agency | [date/version] | [URL] | [date] | none |`

- [ ] **Step 3A.6: Commit all primary research files**

```bash
git add research/sources.md research/rya-syllabus-topics.md research/colregs-irpcs-text.md research/iala-buoyage-text.md research/chart-5011-symbols.md
git commit -m "docs: add primary source research files and canonical topic reference"
```

---

### Task 3B: Agent F — Supplementary Materials

**Files:**
- Write: `research/sources.md` (Supplementary Sources section only)
- Create: `research/supplementary-rya-materials.md`
- Create: `research/supplementary-practice-papers.md`
- Create: `research/supplementary-teaching-resources.md`

**Critical constraint:** Agent F output may ONLY be used in `Summary`, `Flashcard Candidates`, and `MCQ Candidates` sections of syllabus files. It must never be the sole source for any `Key Facts` or `Key Terms` entry.

**sources.md write rule:** Append rows to the `## Supplementary Sources (Agent F)` section ONLY. Do not rewrite or overwrite the entire file. Read the current file, add your rows to the designated section, and write the result. Agent E writes to the Primary Sources section — do not touch that section. If a git merge conflict occurs on sources.md, resolve it by preserving ALL rows from both sections.

- [ ] **Step 3B.1: Search for RYA free materials**

Search for: RYA Day Skipper theory free course notes, RYA day skipper free PDF, RYA day skipper sample materials.

Collect any freely accessible RYA-published supplementary learning materials. Note the exact URL, access date, and content summary.

Write findings to `research/supplementary-rya-materials.md`. Mark each source with its SUP-ID.

Add rows to `research/sources.md` Supplementary Sources section.

- [ ] **Step 3B.2: Search for practice exam papers**

Search for: RYA day skipper theory test questions, day skipper practice exam, RYA day skipper mock paper.

Collect practice questions and answers where available. These are valuable for MCQ Candidates sections.

Write findings to `research/supplementary-practice-papers.md`. For each question found, record:
- The question text
- The answer options (if MCQ)
- The correct answer
- The source URL and access date

- [ ] **Step 3B.3: Search for reputable teaching resources**

Search for established UK sailing school or RYA training centre course notes for Day Skipper theory. Sources must be from identifiable organisations (named sailing schools, RYA-recognised training centres), not anonymous blogs.

Search terms: "day skipper theory notes", "day skipper revision", "RYA day skipper course notes pdf"

Write findings to `research/supplementary-teaching-resources.md`. Note publisher, organisation, URL.

- [ ] **Step 3B.4: Commit supplementary research**

```bash
git add research/sources.md research/supplementary-*.md
git commit -m "docs: add supplementary research sources"
```

---

## Chunk 4: Stream 3 Gate Check

> This task runs AFTER Chunks 2 and 3 are both fully complete. Do not proceed until all conditions below pass.

### Task 4: Verify Stream 3 Prerequisites

**This is a blocking gate. Stream 3 synthesis must not begin until all checks pass.**

- [ ] **Step 4.1: Check all 36 transcript files exist**

```bash
ls transcripts/page-*.md | wc -l
```

Expected output: `36`

If not 36: identify which page numbers are missing. Do not proceed. Fix missing transcripts first.

- [ ] **Step 4.2: Check rya-syllabus-topics.md exists and has at least one data row**

```bash
# Count data rows only — excludes header row (starts with | rya_topic) and separator row (starts with |---)
grep "^|" research/rya-syllabus-topics.md | grep -v "^| rya_topic" | grep -v "^|[-|]" | wc -l
```

Expected: at least 1. A result of 0 means the table exists but has no topic entries — this is a gate failure. If file is missing or has zero data rows, do not proceed — Task 3A must be re-run.

- [ ] **Step 4.3: Check sources.md has required primary source entries**

```bash
grep -E "SRC-00[1-4]" research/sources.md | wc -l
```

Expected: 4 (SRC-001 through SRC-004 for RYA syllabus, IRPCS, IALA O-1, Chart 5011). If any are missing, do not proceed.

- [ ] **Step 4.4: Check all three local copy files exist and are non-empty**

```bash
wc -l research/colregs-irpcs-text.md research/iala-buoyage-text.md research/chart-5011-symbols.md
```

Expected: each file has more than 5 lines. If any are missing or near-empty: do not proceed. **Escalate to the human immediately** with the name of the missing/empty file and the access limitation encountered. Do not attempt to re-run Task 3A autonomously with a different approach without human guidance — the source content is safety-critical and a partial substitution could be worse than no content.

- [ ] **Step 4.5: Record gate pass**

If all four checks pass, append to `research/sources.md`:

```
<!-- Stream 3 gate passed: YYYY-MM-DD -->
```

```bash
git add research/sources.md
git commit -m "chore: stream 3 gate check passed"
```

---

## Chunk 5: Stream 3 — Synthesis

### Task 5: Build Syllabus Overview and Topic Files

> Synthesis is sequential. Complete steps in order.
> Spec for syllabus file schema: `docs/superpowers/specs/2026-03-15-dayskipper-knowledge-base-design.md`

**Files:**
- Read: all files in `research/` and `transcripts/`
- Create: `syllabus/00-overview.md`
- Create: `syllabus/[N]-[topic-slug].md` for each topic

- [ ] **Step 5.1: Derive topic list**

Read `research/rya-syllabus-topics.md` (authoritative) and all 36 transcript files. Cross-reference: does the manual cover any topics not in the RYA syllabus table? Does the RYA syllabus list any topics not visible in the manual?

Produce a merged, deduplicated topic list. For each topic note:
- `rya_topic` value (from canonical table)
- `rya_syllabus_ref` value (from canonical table)
- Which transcript pages cover it (`source_images` list)
- Whether it is safety-critical (from canonical table)
- Whether it is IALA regional (from canonical table)

- [ ] **Step 5.2: Create syllabus/00-overview.md**

```markdown
---
generated: "YYYY-MM-DD"
total_topics: [N]
verified_topics: 0
escalated_topics: 0
---

# RYA Day Skipper Knowledge Base — Overview

## Syllabus Map

| # | File | Topic | RYA Ref | Safety-Critical | IALA Regional | verification_status |
|---|------|-------|---------|-----------------|---------------|---------------------|
| 1 | [filename] | [topic] | [ref] | yes/no | yes/no | pending |
...

## Escalated Topics
<!-- Populated during verification pass -->

## Sources
- Spec: docs/superpowers/specs/2026-03-15-dayskipper-knowledge-base-design.md
- Canonical topics: research/rya-syllabus-topics.md
```

```bash
git add syllabus/00-overview.md
git commit -m "docs: create syllabus overview with topic map"
```

- [ ] **Step 5.3: Create each topic syllabus file**

For each topic in the overview map, create one file using the Syllabus File Schema from the spec. Work through topics in this priority order:
1. Safety-critical IALA regional topics first (buoyage, lights, IRPCS rules)
2. Safety-critical non-regional topics (tides, chart symbols, passage planning)
3. All other topics

For each file:
- Set `rya_topic` and `rya_syllabus_ref` from `research/rya-syllabus-topics.md` — no invented values
- Set `iala_region: "A"` for regional topics; `"N/A"` for non-regional
- Set `verification_status: "pending"` — never "passed" at this stage
- Leave `verification_date: ""` — set ONLY by the verification agent
- Populate `Key Facts` from primary sources (`research/colregs-irpcs-text.md`, `research/iala-buoyage-text.md`, `research/chart-5011-symbols.md`) — every fact gets `[Source: SRC-XXX, Rule/Section ref]`
- Populate `Summary` from transcript content and supplementary sources where helpful
- Populate `Flashcard Candidates` and `MCQ Candidates` (4 options each, correct answer position varies, plausible distractors)
- Place any fact without a locatable primary source in `Unverified / Needs Citation` — never in `Key Facts`
- Apply the tie-breaking rule: when transcript wording differs from primary source text, use primary source exact wording in Key Facts; transcript paraphrase may appear in Summary only
- For any file where `iala_region = "A"` or the topic involves IRPCS, lights, signals, tides, or chart symbols: include the `## ⚠️ Safety-Critical Notes` section. Content must include: specific warnings about common misapplication of the rule, known regional differences (IALA A vs B where relevant), and anything a student might plausibly get backwards with dangerous consequences. This section is mandatory for safety-critical topics — do not leave it empty or omit it.

MCQ format (exactly):
```
Q: [question text]
(a) [option]
(b) [option]
(c) [option]
(d) [option]
Correct: [letter]
Source: [SRC-XXX, section ref]
```

```bash
git add syllabus/[filename].md
git commit -m "docs: add syllabus topic — [topic name]"
```
(Commit after each topic file is created, not all at once.)

---

## Chunk 6: Devil's Advocate Verification

### Task 6: Verify Each Syllabus Topic File

> Run a verification agent for each syllabus file in turn. This agent operates against local files in `research/` only — no live web fetches for primary source verification.
> Files are processed in the same priority order as Task 5.3: safety-critical first.

**For each syllabus file, the verification agent must:**

- [ ] **Step 6.X.1: Check every Key Facts entry — source confirmation**

For each bullet in `Key Facts`:
- Find the cited source ID in `research/sources.md`
- Open the corresponding local file (e.g. `research/colregs-irpcs-text.md` for SRC-002)
- Locate the exact rule/section referenced
- Confirm the source text supports the claim as written

If the source text contradicts or does not confirm the claim: move the entry to `Unverified / Needs Citation` with a note explaining the discrepancy. Do not silently remove it.

- [ ] **Step 6.X.1a: Check IRPCS and IALA Key Facts for paraphrase (safety-critical)**

For every Key Facts entry citing SRC-002 (IRPCS) or SRC-003 (IALA O-1):
- Compare the wording in the file **word-for-word** against the exact source text in the local copy
- If the file uses a paraphrase rather than the exact rule/specification text, this is a failure even if the paraphrase is technically accurate
- Move paraphrased entries to `## Summary` (clearly attributed as a paraphrase), and replace the Key Facts entry with the exact primary source wording
- Note the change in the verification review block

Rationale: exact IRPCS rule wording contains qualifying conditions that paraphrases may omit. A student learning a paraphrase instead of the exact rule could misapply it in a real navigation situation.

- [ ] **Step 6.X.2: Check every Key Terms entry**

Same process as Step 6.X.1 — every term definition must be confirmed against its cited source.

- [ ] **Step 6.X.3: Check buoyage statements for Region A explicitness**

Every buoyage statement must explicitly name "IALA Region A". A statement like "red buoys are left to port" is insufficient — it must read "In IALA Region A, red lateral marks are left to port when entering from seaward." Flag any ambiguous statement even if technically correct.

- [ ] **Step 6.X.4: Check IRPCS citations cite specific Rule numbers**

Every IRPCS claim must cite a Rule number (e.g. `[Source: SRC-002, Rule 18(a)]`) referencing the confirmed in-force amendment recorded in `research/colregs-irpcs-text.md`. A general citation like `[Source: SRC-002]` is insufficient.

- [ ] **Step 6.X.5: Check MCQ format compliance**

Every MCQ must have:
- Exactly 4 options labelled (a), (b), (c), (d)
- A `Correct: [letter]` line
- A `Source: [SRC-XXX, ref]` line
- Plausible distractors (not obviously absurd)
- Correct answer in varied positions across the file (not always (a) or always (b))

- [ ] **Step 6.X.6: Check Sources section is present and complete**

Verify the `## Sources` section at the bottom of the file:
- Is present (not missing or empty)
- Lists every primary source ID (SRC-XXX) used in Key Facts or Key Terms
- Lists the relevant transcript file names (e.g. `page-04-sailing-theory.md`)

If the Sources section is missing or incomplete, add it as a FAIL issue.

- [ ] **Step 6.X.7: Check Safety-Critical Notes section on applicable files**

If the file has `iala_region = "A"` OR the topic involves IRPCS, lights, signals, tides, or chart symbols:
- The `## ⚠️ Safety-Critical Notes` section must be present and non-empty
- It must contain at least one specific warning about common misapplication or regional difference
- An empty or missing section on a safety-critical file is a FAIL

- [ ] **Step 6.X.9: Set verdict and update files**

**PASS:** All checks (6.X.1, 6.X.1a, 6.X.2 through 6.X.7) clear.
- Set `verification_status: "passed"` in the file frontmatter
- Set `verification_date: "YYYY-MM-DD"` (today's date, YYYY-MM-DD format)
- Update the topic row in `syllabus/00-overview.md` to show `passed`

```bash
git add syllabus/[filename].md syllabus/00-overview.md
git commit -m "verify: [topic name] — passed devil's advocate review"
```

**FAIL (first attempt):** Issues found.
- List all issues clearly in a review note appended to the file under `## Verification Attempt 1 — FAILED`
- Return file to synthesis agent for correction
- Synthesis agent addresses each issue and re-submits

**FAIL (second attempt):**
- Do NOT attempt a third autonomous fix
- Set `verification_status: "failed"` in the file frontmatter
- Add `[ESCALATED]` flag and full explanation to the topic row in `syllabus/00-overview.md`
- Update `00-overview.md` frontmatter: increment `escalated_topics` count
- Stop. Human review required before this topic proceeds.

```bash
git add syllabus/[filename].md syllabus/00-overview.md
git commit -m "verify: [topic name] — ESCALATED, requires human review"
```

---

## Chunk 7: Final Assembly

### Task 7: Finalise Overview and Confirm Deliverables

- [ ] **Step 7.1: Update 00-overview.md with final counts**

```markdown
---
generated: "YYYY-MM-DD"
total_topics: [N]
verified_topics: [N]      # count of verification_status: passed
escalated_topics: [N]     # count of [ESCALATED] topics
---
```

- [ ] **Step 7.2: Confirm all deliverables present**

Run the following checks:

```bash
# 36 transcripts
ls transcripts/page-*.md | wc -l   # expect 36

# Primary research files
ls research/sources.md research/rya-syllabus-topics.md research/colregs-irpcs-text.md research/iala-buoyage-text.md research/chart-5011-symbols.md

# Syllabus overview
ls syllabus/00-overview.md

# All syllabus topic files are verified or escalated (none left as pending)
grep -r "verification_status: \"pending\"" syllabus/   # expect no output
```

- [ ] **Step 7.3: List any escalated topics for human review**

```bash
grep "\[ESCALATED\]" syllabus/00-overview.md
```

Present this list to the human for review before Phase 2 begins.

- [ ] **Step 7.4: Final commit**

```bash
git add syllabus/00-overview.md
git commit -m "docs: knowledge base complete — Phase 1 done"
```

---

## Execution Notes

**Parallel execution:**
- Chunks 2 and 3 (Streams 1 + 2) run fully in parallel
- Within Chunk 2, Tasks 2A, 2B, 2C, 2D run in parallel
- Within Chunk 3, Tasks 3A and 3B run in parallel
- Chunk 4 gate check runs after both Chunk 2 AND Chunk 3 are complete
- Chunks 5, 6, 7 are sequential

**sources.md parallel writes:**
Agents E and F write to separate sections of `research/sources.md`. Each agent must read the current file, append to their designated section only, and write the result — never overwrite the whole file. If a git merge conflict occurs on `sources.md`, resolve by preserving ALL rows from both the Primary Sources and Supplementary Sources sections. Never discard rows.

**Escalation:**
- Any topic that fails verification twice is escalated to human — never auto-resolved
- Escalated topics are explicitly listed in 00-overview.md
- Phase 2 must not include escalated topics until human has reviewed and cleared them

**Safety-critical topics (process these first in synthesis and verification):**
- Buoyage and lateral marks (IALA Region A)
- Cardinal marks
- Isolated danger marks / wreck marks
- Lights, shapes, and sound signals (IRPCS)
- Rules of the Road / collision avoidance (IRPCS Rules 1–38)
- Passage planning (tidal calculations, chart reading)
