# CAM poster (iPoster iframe payload)

Twelve standalone HTML pages that carry the entire poster, plus a wide-screen
canvas that shows all six panels at once. iPoster holds nothing but `<iframe>`
tags, so no content is authored in its editor.

Live at <https://ignaciourbina.github.io/poster/>.

| Page | What it is |
|---|---|
| `index.html` | The whole poster on one wide screen, six iframes in the iPoster arrangement. Audience-facing. |
| `embed-index.html` | Working index: every URL, a live preview, and the snippet to paste. Not part of the poster. |
| `block-N.html` | The panel content for block N. Goes in the iPoster block. |
| `detail-N.html` | The expanded content for block N. Goes in that block's expanded panel. |

## Layout

| # | Block | Canvas slot | Carries |
|---|---|---|---|
| 1 | The puzzle | Column 1, top | Motivation, prior papers |
| 2 | Theory and hypotheses | Column 1, bottom | Literature, two-gate model, H1–H3 |
| 3 | Research design | Column 2, full height | Design, measures, corner figure, identification |
| 4 | Results | Column 3, full height | CATE figure, trust and corner tables |
| 5 | Power, robustness, sensitivity | Column 4, top | MDE, robustness, breakdown frontier |
| 6 | Takeaways and implications | Column 4, bottom | Contributions, implication, scope |

**iPoster owns the navigation** between a block and its expanded view. The pages
carry no back links, no toggles and no cross-references to one another: each is
self-contained audience material, and adding navigation would fight whatever
iPoster's expand control does.

## Embedding

```html
<iframe src="https://ignaciourbina.github.io/poster/block-1.html"
        style="width:100%;height:100%;border:0"
        loading="lazy"
        title="CAM poster"></iframe>
```

Never give the iframe a fixed pixel height. Each page sizes its own type from
`vw` units, which inside an iframe are a percentage of the *iframe's* width, so
the same page reads correctly in a small tile and in a large expanded panel.
Content longer than the frame scrolls inside it.

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
