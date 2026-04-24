function toArray(value) {
    return Array.isArray(value) ? value : [value];
}

function normalizeChildren(children) {
    return children.flat(Infinity).filter(child => child !== null && child !== undefined && child !== false);
}

function h(tag, options = {}, children = []) {
    const node = document.createElement(tag);
    const {
        class: className,
        className: explicitClassName,
        text,
        html,
        attrs = {},
        dataset = {},
        style = {},
        on = {},
    } = options;

    if (className || explicitClassName) node.className = className || explicitClassName;
    if (text !== undefined) node.textContent = text;
    if (html !== undefined) node.innerHTML = html;

    for (const [key, value] of Object.entries(attrs)) {
        if (value === false || value === null || value === undefined) continue;
        if (value === true) node.setAttribute(key, "");
        else node.setAttribute(key, String(value));
    }

    for (const [key, value] of Object.entries(dataset)) {
        node.dataset[key] = String(value);
    }

    for (const [key, value] of Object.entries(style)) {
        node.style.setProperty(key, String(value));
    }

    for (const [event, handler] of Object.entries(on)) {
        node.addEventListener(event, handler);
    }

    for (const child of normalizeChildren(children)) {
        node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }

    return node;
}

function renderChild(child, ctx) {
    if (child instanceof Component) return child.render(ctx);
    if (child instanceof Node) return child;
    return h("p", { class: "text-block", text: String(child) });
}

function stepAttrs(ctx, reveal) {
    if (!reveal) return {};
    return { reveal: true, step: ctx.nextStep() };
}

export class Component {
    constructor(options = {}) {
        this.options = options;
    }

    render() {
        return h("div");
    }
}

export class TextBlock extends Component {
    constructor(text, options = {}) {
        super(options);
        this.text = text;
    }

    render(ctx) {
        return h("p", {
            class: `text-block ${this.options.emphasis ? "text-block--emphasis" : ""}`,
            text: this.text,
            dataset: stepAttrs(ctx, this.options.reveal),
        });
    }
}

export class QuoteBlock extends Component {
    constructor(text, credit = "", options = {}) {
        super(options);
        this.text = text;
        this.credit = credit;
    }

    render(ctx) {
        return h("figure", {
            class: "quote-block",
            dataset: stepAttrs(ctx, this.options.reveal),
        }, [
            h("blockquote", { text: this.text }),
            this.credit ? h("figcaption", { text: this.credit }) : null,
        ]);
    }
}

export class BulletList extends Component {
    constructor(items = [], options = {}) {
        super({ reveal: "none", ...options });
        this.items = items;
    }

    render(ctx) {
        return h("ul", { class: `list-block list-block--${this.options.density || "normal"}` },
            this.items.map(item => {
                const isStructured = typeof item === "object" && item !== null && !Array.isArray(item);
                const title = isStructured ? item.title : item;
                const detail = isStructured ? item.detail : "";
                const reveal = this.options.reveal === "items" || item.reveal;
                return h("li", { dataset: stepAttrs(ctx, reveal) }, [
                    h("span", { class: "list-title", text: title }),
                    detail ? h("span", { class: "list-detail", text: detail }) : null,
                ]);
            })
        );
    }
}

export class NumberedList extends Component {
    constructor(items = [], options = {}) {
        super(options);
        this.items = items;
    }

    render(ctx) {
        return h("ol", { class: "numbered-list" },
            this.items.map(item => h("li", {
                text: item,
                dataset: stepAttrs(ctx, this.options.reveal === "items"),
            }))
        );
    }
}

export class Callout extends Component {
    constructor(label, text, options = {}) {
        super(options);
        this.label = label;
        this.text = text;
    }

    render(ctx) {
        return h("aside", {
            class: `callout callout--${this.options.tone || "default"}`,
            dataset: stepAttrs(ctx, this.options.reveal),
        }, [
            h("span", { class: "callout-label", text: this.label }),
            h("p", { text: this.text }),
        ]);
    }
}

export class MetricCard extends Component {
    constructor(label, value, detail = "", options = {}) {
        super(options);
        this.label = label;
        this.value = value;
        this.detail = detail;
    }

    render(ctx) {
        return h("article", {
            class: `metric-card metric-card--${this.options.tone || "default"}`,
            dataset: stepAttrs(ctx, this.options.reveal),
        }, [
            h("span", { class: "metric-label", text: this.label }),
            h("strong", { class: "metric-value", text: this.value }),
            this.detail ? h("span", { class: "metric-detail", text: this.detail }) : null,
        ]);
    }
}

export class Stack extends Component {
    constructor(children = [], options = {}) {
        super(options);
        this.children = children;
    }

    render(ctx) {
        return h("div", { class: `stack stack--${this.options.gap || "normal"}` },
            this.children.map(child => renderChild(child, ctx))
        );
    }
}

export class Grid extends Component {
    constructor(children = [], options = {}) {
        super({ columns: 3, ...options });
        this.children = children;
    }

    render(ctx) {
        const revealItems = this.options.reveal === "items";
        return h("div", {
            class: "grid-block",
            style: { "--columns": this.options.columns },
        }, this.children.map(child => {
            const rendered = renderChild(child, ctx);
            if (revealItems && rendered) {
                Object.assign(rendered.dataset, stepAttrs(ctx, true));
            }
            return rendered;
        }));
    }
}

export class Split extends Component {
    constructor(left = [], right = [], options = {}) {
        super({ ratio: "1fr 1fr", ...options });
        this.left = toArray(left);
        this.right = toArray(right);
    }

    render(ctx) {
        const revealPanes = this.options.reveal === "panes";
        const leftPane = h("div", {
            class: "split-pane",
            dataset: stepAttrs(ctx, revealPanes),
        }, this.left.map(child => renderChild(child, ctx)));
        const rightPane = h("div", {
            class: "split-pane",
            dataset: stepAttrs(ctx, revealPanes),
        }, this.right.map(child => renderChild(child, ctx)));
        return h("div", {
            class: `split-block split-block--${this.options.align || "center"}`,
            style: { "--split-ratio": this.options.ratio },
        }, [leftPane, rightPane]);
    }
}

export class FlowDiagram extends Component {
    constructor(steps = [], options = {}) {
        super(options);
        this.steps = steps;
    }

    render(ctx) {
        return h("div", { class: "flow-diagram" },
            this.steps.map((step, index) => h("div", {
                class: "flow-node",
                dataset: stepAttrs(ctx, this.options.reveal === "items"),
            }, [
                h("span", { class: "flow-index", text: String(index + 1).padStart(2, "0") }),
                h("strong", { text: step.title || step }),
                step.detail ? h("small", { text: step.detail }) : null,
            ]))
        );
    }
}

export class AgentLoop extends Component {
    constructor(stages = [], options = {}) {
        super(options);
        this.stages = stages.length ? stages : [
            { title: "Voice", detail: "select a reason" },
            { title: "Evaluate", detail: "score influence" },
            { title: "Reflect", detail: "update weights" },
        ];
    }

    render(ctx) {
        let activeIndex = 0;
        const loop = h("div", {
            class: `agent-loop agent-loop--${this.options.tone || "default"} ${this.options.autoplay ? "agent-loop--autoplay" : ""}`,
            dataset: stepAttrs(ctx, this.options.reveal),
        }, [
            h("div", { class: "agent-loop-center" }, [
                h("span", { class: "agent-loop-kicker", text: this.options.label || "Agent" }),
                h("strong", { text: this.options.center || "Reason state" }),
                h("small", { text: this.options.detail || "weights -> opinion -> action" }),
            ]),
        ]);

        const setActive = index => {
            activeIndex = (index + this.stages.length) % this.stages.length;
            loop.dataset.active = String(activeIndex + 1);
            loop.querySelectorAll(".agent-loop-stage").forEach((stage, stageIndex) => {
                stage.classList.toggle("is-active", stageIndex === activeIndex);
                stage.classList.toggle("is-past", stageIndex < activeIndex);
                stage.setAttribute("aria-pressed", stageIndex === activeIndex ? "true" : "false");
            });
        };

        this.stages.forEach((stage, index) => {
            loop.append(h("button", {
                class: `agent-loop-stage agent-loop-stage--${index + 1}`,
                attrs: {
                    type: "button",
                    "aria-label": `Show ${stage.title || stage}`,
                    "aria-pressed": index === 0 ? "true" : "false",
                },
                style: { "--stage-index": index },
                on: { click: () => setActive(index) },
            }, [
                h("span", { class: "agent-loop-step", text: String(index + 1).padStart(2, "0") }),
                h("strong", { text: stage.title || stage }),
                stage.detail ? h("small", { text: stage.detail }) : null,
            ]));
        });

        loop.append(h("span", { class: "agent-loop-orbit", attrs: { "aria-hidden": true } }));
        loop.append(h("span", { class: "agent-loop-token", attrs: { "aria-hidden": true } }));
        loop.append(h("div", { class: "agent-loop-controls" }, [
            h("button", {
                class: "agent-loop-control",
                text: "<",
                attrs: { type: "button", "aria-label": "Previous loop stage" },
                on: { click: () => setActive(activeIndex - 1) },
            }),
            h("button", {
                class: "agent-loop-control",
                text: ">",
                attrs: { type: "button", "aria-label": "Next loop stage" },
                on: { click: () => setActive(activeIndex + 1) },
            }),
        ]));
        setActive(0);
        return loop;
    }
}

export class ArchitectureMap extends Component {
    constructor(layers = [], options = {}) {
        super(options);
        this.layers = layers;
    }

    render(ctx) {
        return h("div", { class: "architecture-map" },
            this.layers.map(layer => h("section", {
                class: "architecture-layer",
                dataset: stepAttrs(ctx, this.options.reveal === "items"),
            }, [
                h("div", { class: "architecture-label", text: layer.label }),
                h("div", { class: "architecture-items" },
                    layer.items.map(item => h("span", { text: item }))
                ),
            ]))
        );
    }
}

export class DesignMatrix extends Component {
    constructor(rows = [], columns = [], cells = [], options = {}) {
        super(options);
        this.rows = rows;
        this.columns = columns;
        this.cells = cells;
    }

    render(ctx) {
        const grid = h("div", {
            class: "design-matrix",
            style: { "--matrix-columns": this.columns.length + 1 },
        });
        grid.append(h("span", { class: "matrix-corner" }));
        for (const column of this.columns) grid.append(h("span", { class: "matrix-head", text: column }));
        this.rows.forEach((row, rowIndex) => {
            grid.append(h("span", { class: "matrix-row-head", text: row }));
            this.columns.forEach((_, columnIndex) => {
                const cell = this.cells[rowIndex]?.[columnIndex] || "";
                grid.append(h("span", {
                    class: cell ? "matrix-cell matrix-cell--active" : "matrix-cell",
                    text: cell,
                    dataset: stepAttrs(ctx, this.options.reveal === "cells" && cell),
                }));
            });
        });
        return grid;
    }
}

export class TradeoffPlot extends Component {
    constructor(points = [], options = {}) {
        super(options);
        this.points = points;
    }

    render(ctx) {
        const plot = h("div", { class: "tradeoff-plot" }, [
            h("span", { class: "axis axis-x", text: this.options.xLabel || "Opinion convergence" }),
            h("span", { class: "axis axis-y", text: this.options.yLabel || "Reason alignment" }),
        ]);

        this.points.forEach(point => {
            plot.append(h("span", {
                class: `plot-point plot-point--${point.tone || "default"}`,
                text: point.label,
                style: {
                    left: `${point.x}%`,
                    bottom: `${point.y}%`,
                },
                dataset: stepAttrs(ctx, this.options.reveal === "points"),
            }));
        });

        return plot;
    }
}

export class ChatRound extends Component {
    constructor(messages = [], options = {}) {
        super(options);
        this.messages = messages;
    }

    render(ctx) {
        const list = h("div", { class: "chat-round" });
        this.messages.forEach(m => {
            const phase = (m.phase || "").toString().toLowerCase();
            const bubble = h("div", {
                class: `chat-message chat-message--${phase || "default"}`,
                dataset: stepAttrs(ctx, this.options.reveal === "messages"),
            });
            const header = h("div", { class: "chat-head" }, [
                m.phase ? h("span", { class: "chat-phase", text: m.phase }) : null,
                m.agent ? h("span", { class: "chat-agent", text: m.agent }) : null,
                m.tag ? h("span", { class: "chat-tag", text: m.tag }) : null,
            ]);
            bubble.append(header);
            if (m.text) bubble.append(h("p", { class: "chat-text", text: m.text }));
            if (m.annotation) bubble.append(h("p", { class: "chat-annotation", text: m.annotation }));
            list.append(bubble);
        });
        return list;
    }
}

export class Slide {
    constructor(title = "", options = {}) {
        this.title = title;
        this.options = {
            layout: "standard",
            duration: 75,
            section: "",
            ...options,
        };
        this.kickerText = "";
        this.headlineText = "";
        this.subheadText = "";
        this.blocks = [];
        this.noteText = "";
    }

    layout(value) {
        this.options.layout = value;
        return this;
    }

    section(value) {
        this.options.section = value;
        return this;
    }

    duration(seconds) {
        this.options.duration = seconds;
        return this;
    }

    kicker(text) {
        this.kickerText = text;
        return this;
    }

    headline(text) {
        this.headlineText = text;
        return this;
    }

    subhead(text) {
        this.subheadText = text;
        return this;
    }

    add(...blocks) {
        this.blocks.push(...blocks);
        return this;
    }

    text(value, options = {}) {
        return this.add(new TextBlock(value, options));
    }

    bullets(items, options = {}) {
        return this.add(new BulletList(items, options));
    }

    numbers(items, options = {}) {
        return this.add(new NumberedList(items, options));
    }

    callout(label, text, options = {}) {
        return this.add(new Callout(label, text, options));
    }

    notes(text) {
        this.noteText = text;
        return this;
    }

    render(ctx) {
        const slideCtx = ctx.forSlide(this);
        const header = h("header", { class: "slide-header" }, [
            this.kickerText ? h("p", { class: "slide-kicker", text: this.kickerText }) : null,
            h("h1", { class: "slide-title", text: this.headlineText || this.title }),
            this.subheadText ? h("p", { class: "slide-subhead", text: this.subheadText }) : null,
        ]);

        const body = h("div", { class: "slide-body" },
            this.blocks.map(block => renderChild(block, slideCtx))
        );

        const node = h("section", {
            class: `slide slide--${this.options.layout}`,
            attrs: { "aria-label": this.title || this.headlineText },
        }, [header, body]);

        node.dataset.steps = slideCtx.stepCount;
        return { node, steps: slideCtx.stepCount };
    }
}

class SlideRenderContext {
    constructor(deck, slideIndex) {
        this.deck = deck;
        this.slideIndex = slideIndex;
        this.stepCount = 0;
    }

    nextStep() {
        this.stepCount += 1;
        return this.stepCount;
    }
}

class DeckRenderContext {
    constructor(deck, slideIndex) {
        this.deck = deck;
        this.slideIndex = slideIndex;
    }

    forSlide() {
        return new SlideRenderContext(this.deck, this.slideIndex);
    }
}

export class SlideDeck {
    constructor(options = {}) {
        const defaultFeatures = {
            controls: true,
            fullscreen: true,
            hashNavigation: true,
            notes: true,
            outline: true,
            printMode: true,
            progress: true,
        };
        this.options = {
            title: "Untitled Deck",
            durationMinutes: 10,
            ...options,
            features: {
                ...defaultFeatures,
                ...(options.features || {}),
            },
        };
        this.slides = [];
        this.renderer = null;
    }

    add(...slides) {
        this.slides.push(...slides);
        return this;
    }

    mount(selector) {
        const root = typeof selector === "string" ? document.querySelector(selector) : selector;
        this.renderer = new DeckRenderer(this, root);
        this.renderer.mount();
        return this.renderer;
    }
}

export class DeckRenderer {
    constructor(deck, root) {
        this.deck = deck;
        this.root = root;
        this.index = 0;
        this.step = 0;
        this.mode = "slides";
        this.stepCount = 0;
        this.features = deck.options.features;
        this.printMode = this.features.printMode !== false && new URLSearchParams(window.location.search).has("print");
        this.boundKeydown = this.onKeydown.bind(this);
        this.boundHashChange = this.onHashChange.bind(this);
    }

    mount() {
        this.root.innerHTML = "";
        this.root.className = this.printMode ? "deck-shell is-print-mode" : "deck-shell";
        this.viewport = h("section", { class: "deck-viewport" });
        this.notes = h("aside", { class: "speaker-notes", attrs: { hidden: true } });
        this.progress = h("div", { class: "progress-bar" }, [h("span")]);
        this.counter = h("span", { class: "deck-counter" });

        this.root.append(this.viewport);
        if (this.features.notes) this.root.append(this.notes);
        if (this.features.progress) this.root.append(this.progress);
        if (this.features.controls) this.root.append(this.renderControls());

        if (!this.printMode) {
            this.sidebar = this.renderSidebar();
            this.sidebarToggle = this.renderSidebarToggle();
            this.root.append(this.sidebar);
            this.root.append(this.sidebarToggle);
        }

        if (!this.printMode) {
            if (this.features.hashNavigation) this.readHash();
            window.addEventListener("keydown", this.boundKeydown);
            if (this.features.hashNavigation) window.addEventListener("hashchange", this.boundHashChange);
            this.viewport.addEventListener("click", (e) => {
                if (e.target.closest("button, a, .deck-controls, .deck-sidebar, .agent-loop-stage")) return;
                this.next();
            });
        }
        this.render();
    }

    renderControls() {
        const button = (label, title, handler) => h("button", {
            class: "control-button",
            text: label,
            attrs: { type: "button", title, "aria-label": title },
            on: { click: handler },
        });

        return h("nav", { class: "deck-controls", attrs: { "aria-label": "Deck controls" } }, [
            button("<", "Previous slide or reveal", () => this.prev()),
            this.counter,
            button(">", "Next slide or reveal", () => this.next()),
            this.features.notes ? button("P", "Toggle speaker notes", () => this.toggleNotes()) : null,
            this.features.outline ? button("O", "Toggle outline mode", () => this.toggleOutline()) : null,
            this.features.fullscreen ? button("F", "Toggle fullscreen", () => this.toggleFullscreen()) : null,
        ]);
    }

    renderSidebar() {
        this.sidebarList = h("ol", { class: "deck-sidebar-list" },
            this.deck.slides.map((slide, index) =>
                h("li", {
                    on: { click: () => { this.goTo(index); this.toggleSidebar(); } },
                }, [
                    h("span", { class: "sidebar-slide-number", text: String(index + 1).padStart(2, "0") }),
                    h("span", { class: "sidebar-slide-title", text: slide.kickerText || slide.title }),
                ])
            )
        );

        return h("aside", { class: "deck-sidebar" }, [
            h("div", { class: "deck-sidebar-header" }, [
                h("strong", { text: this.deck.options.title }),
                h("button", {
                    class: "sidebar-close",
                    text: "×",
                    attrs: { type: "button", "aria-label": "Close sidebar" },
                    on: { click: () => this.toggleSidebar() },
                }),
            ]),
            this.sidebarList,
        ]);
    }

    renderSidebarToggle() {
        return h("button", {
            class: "sidebar-toggle",
            text: "☰",
            attrs: { type: "button", title: "Toggle slide list", "aria-label": "Toggle slide list" },
            on: { click: () => this.toggleSidebar() },
        });
    }

    toggleSidebar() {
        if (this.sidebar) this.sidebar.classList.toggle("is-open");
    }

    updateSidebar() {
        if (!this.sidebarList) return;
        const items = this.sidebarList.querySelectorAll("li");
        items.forEach((li, i) => li.classList.toggle("is-current", i === this.index));
        const current = items[this.index];
        if (current) current.scrollIntoView({ block: "nearest" });
    }

    render() {
        if (this.printMode) {
            this.renderPrintDeck();
            return;
        }

        if (this.mode === "outline") {
            this.renderOutline();
            return;
        }

        const slide = this.deck.slides[this.index];
        const ctx = new DeckRenderContext(this.deck, this.index);
        const rendered = slide.render(ctx);
        this.stepCount = rendered.steps;
        this.step = Math.min(this.step, this.stepCount);
        this.viewport.innerHTML = "";
        this.viewport.append(rendered.node);
        this.applyRevealState();
        this.renderNotes();
        this.updateProgress();
        this.updateSidebar();
        this.writeHash();
    }

    renderPrintDeck() {
        this.viewport.innerHTML = "";
        this.deck.slides.forEach((slide, index) => {
            const ctx = new DeckRenderContext(this.deck, index);
            const rendered = slide.render(ctx);
            rendered.node.querySelectorAll("[data-reveal]").forEach(item => {
                item.classList.add("is-visible-step");
                item.classList.remove("is-hidden-step");
            });
            this.viewport.append(rendered.node);
        });
        this.notes.hidden = true;
        this.progress.hidden = true;
        this.counter.textContent = "Print";
    }

    renderOutline() {
        this.viewport.innerHTML = "";
        this.viewport.append(h("section", { class: "outline-view" }, [
            h("header", { class: "outline-header" }, [
                h("p", { class: "slide-kicker", text: `${this.deck.options.durationMinutes} minute deck` }),
                h("h1", { text: this.deck.options.title }),
            ]),
            h("ol", { class: "outline-list" }, this.deck.slides.map((slide, index) =>
                h("li", {
                    class: index === this.index ? "is-current" : "",
                    on: { click: () => { this.index = index; this.step = 0; this.mode = "slides"; this.render(); } },
                }, [
                    h("span", { class: "outline-number", text: String(index + 1).padStart(2, "0") }),
                    h("strong", { text: slide.headlineText || slide.title }),
                    slide.subheadText ? h("small", { text: slide.subheadText }) : null,
                ])
            )),
        ]));
        if (this.notes) this.notes.hidden = true;
        this.counter.textContent = "Outline";
        if (this.progress) this.progress.firstElementChild.style.width = "100%";
    }

    renderNotes() {
        if (!this.features.notes || !this.notes) return;
        const slide = this.deck.slides[this.index];
        this.notes.innerHTML = "";
        this.notes.append(
            h("strong", { text: "Speaker notes" }),
            h("p", { text: slide.noteText || "No notes for this slide." })
        );
    }

    applyRevealState() {
        this.viewport.querySelectorAll("[data-reveal]").forEach(item => {
            const itemStep = Number(item.dataset.step || 0);
            item.classList.toggle("is-hidden-step", itemStep > this.step);
            item.classList.toggle("is-visible-step", itemStep <= this.step);
        });
    }

    updateProgress() {
        const total = this.deck.slides.length;
        const slideProgress = total <= 1 ? 1 : this.index / (total - 1);
        const stepProgress = this.stepCount ? (this.step / this.stepCount) / Math.max(total - 1, 1) : 0;
        const progress = Math.min(1, slideProgress + stepProgress);
        if (this.progress) this.progress.firstElementChild.style.width = `${progress * 100}%`;
        this.counter.textContent = `${this.index + 1} / ${total}${this.stepCount ? `.${this.step}` : ""}`;
    }

    next() {
        if (this.mode === "outline") {
            this.mode = "slides";
            this.render();
            return;
        }
        if (this.step < this.stepCount) {
            this.step += 1;
            this.applyRevealState();
            this.updateProgress();
            this.writeHash();
            return;
        }
        if (this.index < this.deck.slides.length - 1) {
            this.index += 1;
            this.step = 0;
            this.render();
        }
    }

    prev() {
        if (this.mode === "outline") {
            this.mode = "slides";
            this.render();
            return;
        }
        if (this.step > 0) {
            this.step -= 1;
            this.applyRevealState();
            this.updateProgress();
            this.writeHash();
            return;
        }
        if (this.index > 0) {
            this.index -= 1;
            this.step = 0;
            this.render();
        }
    }

    goTo(index, step = 0) {
        const boundedIndex = Math.max(0, Math.min(index, this.deck.slides.length - 1));
        this.index = boundedIndex;
        this.step = Math.max(0, step);
        this.mode = "slides";
        this.render();
    }

    toggleNotes() {
        if (!this.features.notes || this.mode === "outline" || !this.notes) return;
        this.notes.hidden = !this.notes.hidden;
    }

    toggleOutline() {
        if (!this.features.outline) return;
        this.mode = this.mode === "outline" ? "slides" : "outline";
        this.render();
    }

    toggleFullscreen() {
        if (!this.features.fullscreen) return;
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    }

    onKeydown(event) {
        const keys = ["ArrowRight", "ArrowDown", " ", "PageDown"];
        const prevKeys = ["ArrowLeft", "ArrowUp", "PageUp", "Backspace"];
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.next();
        } else if (prevKeys.includes(event.key)) {
            event.preventDefault();
            this.prev();
        } else if (this.features.notes && event.key.toLowerCase() === "p") {
            this.toggleNotes();
        } else if (this.features.outline && event.key.toLowerCase() === "o") {
            this.toggleOutline();
        } else if (this.features.fullscreen && event.key.toLowerCase() === "f") {
            this.toggleFullscreen();
        } else if (event.key.toLowerCase() === "s") {
            this.toggleSidebar();
        } else if (event.key === "Home") {
            event.preventDefault();
            this.goTo(0);
        } else if (event.key === "End") {
            event.preventDefault();
            this.goTo(this.deck.slides.length - 1);
        } else if (/^\d$/.test(event.key)) {
            const target = Number(event.key) - 1;
            if (target >= 0 && target < this.deck.slides.length) {
                this.goTo(target);
            }
        }
    }

    readHash() {
        const match = window.location.hash.match(/^#\/(\d+)(?:\/(\d+))?$/);
        if (!match) return;
        const targetIndex = Number(match[1]) - 1;
        const targetStep = Number(match[2] || 0);
        if (targetIndex >= 0 && targetIndex < this.deck.slides.length) {
            this.index = targetIndex;
            this.step = Math.max(0, targetStep);
        }
    }

    writeHash() {
        if (!this.features.hashNavigation) return;
        const hash = `#/${this.index + 1}/${this.step}`;
        if (window.location.hash !== hash) {
            window.history.replaceState(null, "", hash);
        }
    }

    onHashChange() {
        this.readHash();
        this.render();
    }
}
