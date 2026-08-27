# CAM poster (iPoster iframe payload)

Six HTML pages that carry the entire poster, plus a wide-screen canvas that
shows all six panels at once. iPoster holds nothing but six `<iframe>` tags, so
no content is authored in its editor.

Live at <https://ignaciourbina.github.io/poster/>.

| Page | What it is |
|---|---|
| `index.html` | The whole poster on one wide screen, six iframes in the iPoster arrangement. Audience-facing. |
| `embed-index.html` | Working index: every URL, a live preview, and the snippet to paste. Not part of the poster. |
| `block-N.html` | Block N: both the summary view and the detail view, with a button that swaps them. This is the only URL block N needs. |

## Layout

| # | Block | Canvas slot | Carries |
|---|---|---|---|
| 1 | The puzzle | Column 1, top | Motivation, prior papers |
| 2 | Theory and hypotheses | Column 1, bottom | Literature, two-gate model, H1–H3 |
| 3 | Research design | Column 2, full height | Design, measures, corner figure, identification |
| 4 | Results | Column 3, full height | CATE figure, trust and corner tables |
| 5 | Power, robustness, sensitivity | Column 4, top | MDE, robustness, breakdown frontier |
| 6 | Takeaways and implications | Column 4, bottom | Contributions, implication, scope |

## Why one page per block

iPoster's OPEN control does not navigate anywhere: it enlarges the same iframe
that is already in the block. So a second URL has nowhere to go, and both views
live in one document instead. `js/views.js` swaps them, `#detail` deep-links the
detail view, and everything runs from this site, since nothing inside iPoster can
be styled or scripted.

The pages carry no cross-references to one another: each is self-contained
audience material.

## Embedding

```html
<iframe src="https://ignaciourbina.github.io/poster/block-1.html"
        style="width:100%;height:100%;border:0"
        loading="lazy"
        title="CAM poster"></iframe>
```

Never give the iframe a fixed pixel height. Each page sizes its own type from
`vw` units, which inside an iframe are a percentage of the *iframe's* width, so
the same page reads correctly in the block and once enlarged. Content longer
than the frame scrolls inside it.

## Template geometry

Measured from the 6-block template. Each block loses about 66 px to iPoster's
own title bar, so the usable content area is:

| Slot | Block box | Content area |
|---|---|---|
| Column 1 top (block 1) | 387×317 | **388×251** |
| Column 1 bottom (block 2) | 387×377 | **388×311** |
| Column 2 (block 3) | 387×725 | **388×659** |
| Column 3 (block 4) | 387×725 | **388×659** |
| Column 4 top (block 5) | 387×377 | **388×311** |
| Column 4 bottom (block 6) | 387×317 | **388×251** |

Column 4 mirrors column 1, so blocks 1 and 6 sit in the two smallest slots. Each
summary view is written to fit its slot with its button visible.

## Figures

`img/` holds PNGs copied from the analysis output: `results-cate.png` (block 4),
`power-hajek.png` and `power-corner.png` (block 5, detail view). Re-copy them
when the figures are regenerated.

Block 3 carries no figure: it spends its space on the manipulation itself, which
is described from `instrument/treatment-stimuli-VERBATIM.md` rather than
paraphrased from the methods write-up.

## Editing

Edit here, commit, push to `main`. `.github/workflows/sync-poster.yml` copies
`poster/` into the website repo (both `public/poster/` and `docs/poster/`, since
Pages serves `docs/`) and pushes. The iPoster embed URLs never change, so the
poster updates without re-entering the editor. The workflow syncs with
`rsync --delete`, so a file deleted here is deleted from the site.

## Printed version

`beamer/cam-poster.tex` is the same poster on one 48 x 27 in (16:9) canvas,
built with LuaLaTeX. `cd beamer && make`.

Print cannot do the two things the web version relies on, so both are dropped:
the Details view behind each block, and scrolling inside a block. Every panel
therefore carries its whole summary view at once, and the "Details" buttons are
gone, since they would point nowhere.

Everything else is derived from this site rather than restated. The palette is
`css/poster.css` verbatim, the arrangement is `index.html`'s grid, the typeface
is Inter at the same four weights, and the type scale is the CSS clamp() minima
converted at one rate, 1 CSS pixel = 0.025 in, which is 48 in of poster over
the 1920 px canvas the live poster renders at. Sizes in `beamer/preamble.tex`
are written as their CSS pixel values so each can be checked against the
stylesheet directly.

Columns 2 and 3 hold more summary text than a slot of that width takes at full
size, so those two blocks set a fit scale (`\setfit`) that shrinks the whole
block uniformly. Columns 1 and 4 run at full size, and their blocks end well
short of the panel foot: the 16:9 canvas is taller than the web canvas, and the
short slots gain the difference.

Prose and estimates are copied from the block pages, so a change there has to
be made here by hand as well.

## Claims and numbers

Prose follows the slide deck's claims and hedging; estimates come from
`replication_package/` and match `output/report_outputs/report.pdf`. Nothing is
read from the CSVs at build time, so a rerun that moves an estimate requires
updating these pages by hand.
