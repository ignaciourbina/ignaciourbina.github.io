# Presentation Style Guide

Documented conventions across the two active decks — *Simulating Open Democracy*
(MPSA 2026, 10 min) and *The Conditional Activation Model* (CAM/JMP, 15 min) —
so that future presentations stay coherent with the established voice.

---

## 1. Register and posture

Both decks operate in a **formal-academic register** pitched at political
scientists who are literate in deliberative theory, causal inference, and
computational methods. Neither deck explains foundational citations (Habermas,
Mansbridge, Cameron & Miller); both assume the audience has them.

The posture diverges by maturity of the contribution:

- **Framework-introduction decks** (Simulating Open Democracy) adopt an
  **exploratory, cautious posture**. Scope qualifiers appear early and often:
  "directional comparative exercise," "not a causal decomposition." The deck
  sells the architecture, not the effect size.

- **Findings decks** (CAM) adopt an **assertive, explanatory posture**. The
  deck names a puzzle, proposes a mechanism, and resolves the puzzle with a
  clean experimental finding. Scope conditions appear at the end, after the
  resolution has landed.

**Rule of thumb:** match posture to what the audience should leave with. If
it's a tool or framework, be cautious and emphasize reusability. If it's a
result, be direct and emphasize the pathway from puzzle to answer.

---

## 2. Prose on slides

### 2.1 Economy

Slide text is lean. Every slide has at most three layers:

1. **Kicker** — section label (e.g., "Model · State," "Results I · Epistemic
   alignment"). Orients the audience within the arc.
2. **Headline** — one sentence, active voice, stating the slide's claim or
   function (e.g., "LLM engine: positive slope gaps on reason-level outcomes").
3. **Subhead** — notation, citations, or a qualifying clause that the headline
   omits for brevity.

No slide carries body paragraphs. Exposition lives in speaker notes.

### 2.2 Notation vs. metaphor

The two decks split on how much formalism appears on-slide:

- **Notation-forward** (Simulating Open Democracy): state-space definitions,
  clip functions, Greek letters (φ̃, w_ic) live on the slide surface. The
  audience reads the spec; the presenter interprets it. This works when the
  contribution *is* the formal object.

- **Metaphor-forward** (CAM): conceptual handles ("two gates," "cool
  cognition," "funnel of causality") appear on-slide; statistical machinery
  (BFMM, principal stratification) is relegated to subheads and notes. This
  works when the contribution is an empirical finding and the method is a
  means to it.

**Guideline:** default to metaphor-forward. Promote notation to the slide
surface only when the notation itself is part of the intellectual contribution.

### 2.3 Callout boxes

Color-coded callouts punctuate the arc:

| Color | Function | Example |
|-------|----------|---------|
| Green | Affirmation, key definition, takeaway | Expressed-opinion equation; scope statement |
| Amber | Caution, research question, specification | "Pooled specification: Δ index..." |
| Red   | Tension, constraint, limitation | — |

Use one callout per slide at most. Two callouts compete for emphasis and
flatten the hierarchy.

---

## 3. Speaker notes

Notes serve different roles in the two decks, but both follow a shared
discipline:

- **Never duplicate the slide text.** Notes contextualize, qualify, or extend —
  they don't read the slide aloud.
- **First sentence orients.** The opening line of a note tells the presenter
  *why this slide exists in the arc*, not what's on it.
- **Citations in notes are additive.** If a citation already appears in the
  subhead, the note explains *why* that citation matters here. If a citation
  appears only in the note, it's supporting context the audience doesn't need
  to see.

Length diverges by deck type:

- **Framework decks** carry longer notes (3–5 sentences) because the presenter
  must translate formalism into intuition live.
- **Findings decks** carry shorter, more tactical notes (1–3 sentences) because
  the slide text already carries the interpretive weight.

---

## 4. Narrative arc

### 4.1 Model-building arc (framework contributions)

Used in *Simulating Open Democracy*:

```
Gap → State space → Protocol → Illustrative trace → Empirical grounding →
Design → Results → Discussion
```

Key properties:
- **Layered assembly.** Each slide adds one component of the architecture. The
  audience builds the model in their head incrementally.
- **Concretization pivot.** After the abstract layers (state, protocol), one
  slide walks through a concrete trace step by step. This is the "show, don't
  tell" moment — it converts notation into action. Place it before the data
  and results, not after.
- **Closing on scope.** The final slide restates the contribution as a
  framework property ("different cognitive regimes, identical forums"), not
  as an effect size. The audience leaves with the architecture, not a number.

### 4.2 Puzzle-resolution arc (empirical contributions)

Used in *CAM*:

```
Puzzle → Theory / mechanism → Predictions → Design → Manipulation check →
Aggregate effect → Decomposition (gate by gate) → Scope & generalization
```

Key properties:
- **Forward momentum.** The puzzle creates a question the audience wants
  answered; every subsequent slide moves toward the answer. No slide is
  purely architectural.
- **Aggregate-then-decompose pivot.** Show the unconditional effect first
  (modest, noisy), then decompose it into subgroup pathways. The audience
  experiences the same "aha" the analysis produced: the aggregate was hiding
  structure.
- **Closing on generalization.** The final slide extends the mechanism beyond
  the issue domain ("any domain where expert information meets dispositional
  heterogeneity"). The audience leaves with a transferable model, not a
  single-study finding.

### 4.3 Choosing an arc

| If the contribution is... | Use | Close on |
|---------------------------|-----|----------|
| A new tool, framework, or architecture | Model-building | Scope limits and reusability |
| An empirical finding that resolves a puzzle | Puzzle-resolution | Mechanism generalization |
| Both (framework + first empirical test) | Model-building with a results coda | Framework, with results as proof of concept |

---

## 5. Slide block types and when to use them

The deck system supports several structured block types. Conventions for each:

| Block type | When to use | Example |
|------------|-------------|---------|
| `callout` | One per slide max; key definition, question, or scope statement | Research question, expressed-opinion formula |
| `bullets` | Motivation slides with 2–4 parallel strands (normative / empirical / methodological) | Motivation slide with three cited perspectives |
| `grid` | Numeric summaries with 2–4 metrics, each with value + detail + tone color | Scenario overview (participants, statements, compositions) |
| `matrix` | Showing how one data source maps to multiple model uses | Data-use slide (pool → graph → initialization) |
| `architecture` | Layered abstractions where nesting matters | Protocol / State / Engine / Outcomes stack |
| `chat-round` | Step-by-step process traces with agent identity and phase labels | Illustrative deliberation round |
| `numbers` | 2–3 large statistics as hero values | Unconditional ATE, sample size |
| `flow` | Causal or temporal sequences | Two-gate pathway diagram |
| `split` | Side-by-side comparison of two conditions or outcomes | Engine A vs. Engine B results |

Avoid mixing more than two block types on a single slide. The hierarchy
flattens and the audience loses the entry point.

---

## 6. Threading across decks

When presenting both papers in sequence (e.g., a job talk or campus visit),
the connective thread is:

> **Aggregated effects mask structured heterogeneity — in deliberation
> (engine choice produces different *kinds* of quality, not more or less)
> and in persuasion (unconditional ATEs average over discrete subpopulations
> with different gatekeeping pathways).**

The Simulating Open Democracy deck shows this in a computational setting;
the CAM deck shows it in an experimental one. The methodological range
(ABM + survey experiment) and the shared diagnostic move (decompose the
aggregate) are the throughline.

When threading explicitly:
- In Simulating Open Democracy, reference the general principle in the
  discussion slide: "composition moderates magnitude" parallels "subgroup
  pathways moderate the ATE."
- In CAM, the two-gate decomposition is the same intellectual move as
  separating epistemic alignment from argument circulation — a single
  summary statistic (opinion convergence / unconditional ATE) was concealing
  orthogonal mechanisms.

---

## 7. Anti-patterns

Things to avoid, drawn from editing both decks:

1. **Body paragraphs on slides.** If you need more than a subhead to set up
   a block, the slide is carrying too much. Split it or move text to notes.

2. **Orphan notation.** A symbol that appears on one slide and never recurs
   is noise. Either it's central enough to reappear in results, or it belongs
   in the notes.

3. **Defensive hedging on results slides.** Scope qualifiers belong in the
   discussion, not interleaved with the findings. Let the result land, then
   bound it.

4. **Citing without purpose.** Every citation on a slide should do one of
   three things: (a) name the concept being used, (b) locate the gap being
   filled, or (c) identify the metric being applied. "See also" citations go
   in the notes or nowhere.

5. **Symmetric slide counts for asymmetric content.** If one engine or one
   gate has a cleaner story, give it more space. Forcing parity wastes the
   audience's attention on the weaker leg.
