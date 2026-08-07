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

`img/` holds PNGs copied from the analysis output: `design-corner.png` (block 3),
`results-cate.png` (block 4), `power-hajek.png` and `power-corner.png`
(expanded block 5). Re-copy them when the figures are regenerated.

## Editing

Edit here, commit, push to `main`. `.github/workflows/sync-poster.yml` copies
`poster/` into the website repo (both `public/poster/` and `docs/poster/`, since
Pages serves `docs/`) and pushes. The iPoster embed URLs never change, so the
poster updates without re-entering the editor. The workflow syncs with
`rsync --delete`, so a file deleted here is deleted from the site.

## Claims and numbers

Prose follows the slide deck's claims and hedging; estimates come from
`replication_package/` and match `output/report_outputs/report.pdf`. Nothing is
read from the CSVs at build time, so a rerun that moves an estimate requires
updating these pages by hand.
