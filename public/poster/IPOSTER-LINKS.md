# iPoster embed links

One URL per block. Paste it into that block's embed field — nothing else goes in
iPoster, and no text needs typing in its editor.

Each page carries **both** views: the short version sized for the block, and a
detail view behind a button inside the page. iPoster's OPEN control enlarges the
same iframe, so a second link is neither needed nor possible.

## Set an explicit height

iPoster's block container has no fixed height of its own, so an iframe set to
`height:100%` has nothing to resolve the percentage against and collapses to a
default box — the same small size in every block, including the two tall
columns. **Give each iframe the pixel height of its slot**, from the table
below. Width can stay `100%`.

## The six blocks, in canvas order

| Slot | Block | Height | Link |
|---|---|---|---|
| Column 1, top | The puzzle | **251** | `https://ignaciourbina.github.io/poster/block-1.html` |
| Column 1, bottom | Theory and hypotheses | **311** | `https://ignaciourbina.github.io/poster/block-2.html` |
| Column 2, full height | Research design | **659** | `https://ignaciourbina.github.io/poster/block-3.html` |
| Column 3, full height | Results | **659** | `https://ignaciourbina.github.io/poster/block-4.html` |
| Column 4, top | Power, robustness, sensitivity | **311** | `https://ignaciourbina.github.io/poster/block-5.html` |
| Column 4, bottom | Takeaways and implications | **251** | `https://ignaciourbina.github.io/poster/block-6.html` |

Column 4 mirrors column 1: its **taller** panel is on top.

## Ready-made tags

```html
<!-- Column 1, top -->
<iframe src="https://ignaciourbina.github.io/poster/block-1.html"
        style="width:100%;height:251px;border:0" title="The puzzle"></iframe>

<!-- Column 1, bottom -->
<iframe src="https://ignaciourbina.github.io/poster/block-2.html"
        style="width:100%;height:311px;border:0" title="Theory and hypotheses"></iframe>

<!-- Column 2 -->
<iframe src="https://ignaciourbina.github.io/poster/block-3.html"
        style="width:100%;height:659px;border:0" title="Research design"></iframe>

<!-- Column 3 -->
<iframe src="https://ignaciourbina.github.io/poster/block-4.html"
        style="width:100%;height:659px;border:0" title="Results"></iframe>

<!-- Column 4, top -->
<iframe src="https://ignaciourbina.github.io/poster/block-5.html"
        style="width:100%;height:311px;border:0" title="Power, robustness, sensitivity"></iframe>

<!-- Column 4, bottom -->
<iframe src="https://ignaciourbina.github.io/poster/block-6.html"
        style="width:100%;height:251px;border:0" title="Takeaways and implications"></iframe>
```

If iPoster's dialog takes only a URL plus width/height fields, use the link and
the height from the table.

## Where the heights come from

Measured from the 6-block template. Each block loses about 66 px to iPoster's
own title bar, so the usable area is smaller than the block box:

| Slot | Block box | Usable content area |
|---|---|---|
| Column 1 top, Column 4 bottom | 387 × 317 | 388 × 251 |
| Column 1 bottom, Column 4 top | 387 × 377 | 388 × 311 |
| Columns 2 and 3 | 387 × 725 | 388 × 659 |

If a block still shows empty space beneath the frame, raise that height until
the frame reaches the bottom of the white card; if a scrollbar appears too
early, lower it. Content longer than the frame scrolls inside it by design, so
being a few pixels short costs nothing.

## Two other pages

| Page | Link | What it is |
|---|---|---|
| Full poster, one screen | `https://ignaciourbina.github.io/poster/` | All six panels laid out as on the canvas. Good as a share link. |
| Embed index | `https://ignaciourbina.github.io/poster/embed-index.html` | Every block previewed at its true slot size next to its detail view. |

Add `#detail` to any block link to open its detail view directly, e.g.
`https://ignaciourbina.github.io/poster/block-4.html#detail`.

## After you change anything

Edits go live automatically on push, and the links above never change, so a
correction never means re-entering anything in iPoster.

GitHub Pages caches hard. If a block still shows old content, that is the
browser, not the deployment: force a reload with **Ctrl+Shift+R**
(**Cmd+Shift+R** on Mac). The same applies to anyone viewing the poster who has
seen it before.
