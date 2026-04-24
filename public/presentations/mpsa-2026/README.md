# Slide Deck Prototype

This directory contains a no-build, client-side slide deck runtime written in plain JavaScript.

Open it through a local web server because the deck uses ES modules:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173/slides/`.

## Authoring Model

The deck is authored as nested JSON in `deck.json`. `js/main.js` loads that
file and passes it to `createDeckFromSpec()` in `js/deck-json.js`, which maps
slide and block records onto the rendering primitives in `js/deck-core.js`.

Minimal shape:

```json
{
  "title": "Deck title",
  "durationMinutes": 10,
  "features": {
    "controls": true,
    "fullscreen": true,
    "hashNavigation": true,
    "notes": true,
    "outline": true,
    "printMode": true,
    "progress": true
  },
  "slides": [
    {
      "id": "opening",
      "active": true,
      "format": "title",
      "kicker": "Section",
      "headline": "Slide headline",
      "subhead": "Optional subhead",
      "notes": "Speaker notes",
      "blocks": [
        { "type": "text", "text": "Body copy", "reveal": true }
      ]
    }
  ]
}
```

To load a different deck file, use `?deck=path/to/other-deck.json`.

Supported slide formats are `standard`, `title`, and `closing`. `layout` is an
alias for `format`, so new CSS-backed formats can be added without changing the
JSON adapter.

Any slide or block can set `active: false` or `enabled: false` to remove it from
the rendered deck. A slide or block can also set `feature: "featureName"` or
`requires: ["featureName"]`; it will render only when the named deck-level
feature is not disabled.

Supported block `type` values:

- `text`, `quote`, `bullets`, `numbers`, `callout`, `metric`
- `stack`, `grid`, `split`
- `flow`, `agent-loop`, `architecture`, `matrix`, `plot`

`agent-loop` is click-controlled in presentation mode. Stage cards jump to that
stage, and the `<` / `>` buttons move through the loop:

```json
{
  "type": "agent-loop",
  "label": "Agent loop",
  "center": "Reason state",
  "detail": "weights -> opinion -> next action",
  "stages": [
    { "title": "Voice", "detail": "select a consideration" },
    { "title": "Evaluate", "detail": "score influence" },
    { "title": "Reflect", "detail": "update weights" }
  ]
}
```

These map to the core primitives:

- `SlideDeck` owns the deck, navigation state, notes, outline mode, and mounting.
- `Slide` owns slide metadata, timing, title text, notes, and content blocks.
- `Component` is the base rendering abstraction.
- `BulletList`, `NumberedList`, `MetricCard`, `Callout`, `Split`, `Grid`, `FlowDiagram`, `ArchitectureMap`, `DesignMatrix`, and `TradeoffPlot` are reusable slide components.

Keyboard controls:

- Right, down, space, page down: next reveal or slide
- Left, up, backspace, page up: previous reveal or slide
- Home / End: first or last slide
- `P`: speaker notes
- `O`: outline mode
- `F`: fullscreen

Navigation state is written to the URL as `#/slide/step`, so a refreshed tab
reopens to the current slide and reveal.

## Exporting

Open `http://localhost:4173/slides/?print` to render every slide fully
revealed for browser printing or PDF export. Use landscape orientation if the
browser print dialog does not infer it automatically.
