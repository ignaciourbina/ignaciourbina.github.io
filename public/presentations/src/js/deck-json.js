import {
    AgentLoop,
    ArchitectureMap,
    BulletList,
    Callout,
    ChatRound,
    DesignMatrix,
    DotPlot,
    FlowDiagram,
    Grid,
    MetricCard,
    NetworkGraph,
    NumberedList,
    QuoteBlock,
    Slide,
    SlideDeck,
    Split,
    Stack,
    TextBlock,
    TradeoffPlot,
} from "./deck-core.js";

function isEnabled(spec = {}, features = {}) {
    if (spec.active === false || spec.enabled === false) return false;
    const required = spec.feature || spec.requires;
    if (!required) return true;
    const keys = Array.isArray(required) ? required : [required];
    return keys.every(key => features[key] !== false);
}

function compact(items) {
    return items.flat(Infinity).filter(Boolean);
}

function optionsFrom(spec, keys = []) {
    const options = { ...(spec.options || {}) };
    for (const key of keys) {
        if (spec[key] !== undefined) options[key] = spec[key];
    }
    return options;
}

function componentList(specs, features) {
    return compact((specs || []).map(spec => componentFromSpec(spec, features)));
}

export function componentFromSpec(spec, features = {}) {
    if (spec === null || spec === undefined || spec === false) return null;
    if (typeof spec === "string") return new TextBlock(spec);
    if (!isEnabled(spec, features)) return null;

    const type = (spec.type || spec.component || "text").toLowerCase();
    const opts = optionsFrom(spec, [
        "align",
        "columns",
        "control",
        "density",
        "detail",
        "gap",
        "label",
        "ratio",
        "reveal",
        "tone",
        "center",
        "autoplay",
    ]);

    if (type === "text" || type === "paragraph") {
        return new TextBlock(spec.text || spec.value || "", opts);
    }

    if (type === "quote") {
        return new QuoteBlock(spec.text || "", spec.credit || "", opts);
    }

    if (type === "bullets" || type === "bullet-list") {
        return new BulletList(spec.items || [], opts);
    }

    if (type === "numbers" || type === "numbered-list") {
        return new NumberedList(spec.items || [], opts);
    }

    if (type === "callout") {
        return new Callout(spec.label || "", spec.text || spec.value || "", opts);
    }

    if (type === "metric" || type === "metric-card") {
        return new MetricCard(spec.label || "", spec.value || "", spec.detail || "", opts);
    }

    if (type === "stack") {
        return new Stack(componentList(spec.children || spec.blocks || spec.items, features), opts);
    }

    if (type === "grid") {
        return new Grid(componentList(spec.children || spec.blocks || spec.items, features), opts);
    }

    if (type === "split") {
        return new Split(
            componentList(spec.left || [], features),
            componentList(spec.right || [], features),
            opts
        );
    }

    if (type === "flow" || type === "flow-diagram") {
        return new FlowDiagram(spec.steps || spec.items || [], opts);
    }

    if (type === "agent-loop" || type === "loop") {
        return new AgentLoop(spec.stages || spec.steps || spec.items || [], opts);
    }

    if (type === "architecture" || type === "architecture-map") {
        return new ArchitectureMap(spec.layers || spec.items || [], opts);
    }

    if (type === "matrix" || type === "design-matrix") {
        return new DesignMatrix(spec.rows || [], spec.columns || [], spec.cells || [], opts);
    }

    if (type === "chat-round" || type === "chat") {
        return new ChatRound(spec.messages || spec.items || [], opts);
    }

    if (type === "dot-plot" || type === "dotplot" || type === "coefficient-plot") {
        return new DotPlot(spec.points || spec.items || [], {
            ...opts,
            title: spec.title,
            xLabel: spec.xLabel,
            referenceLine: spec.referenceLine,
            labelWidth: spec.labelWidth,
            showValues: spec.showValues,
            ticks: spec.ticks,
            tone: spec.tone,
        });
    }

    if (type === "plot" || type === "tradeoff-plot") {
        return new TradeoffPlot(spec.points || [], {
            ...opts,
            xLabel: spec.xLabel,
            yLabel: spec.yLabel,
        });
    }

    if (type === "network-graph" || type === "network") {
        return new NetworkGraph(spec.nodes || [], spec.edges || [], {
            ...opts,
            control: spec.control,
        });
    }

    console.warn(`Unknown slide component type: ${type}`);
    return new TextBlock(spec.text || spec.value || "", opts);
}

export function slideFromSpec(spec, features = {}) {
    if (!isEnabled(spec, features)) return null;

    const slideOptions = {};
    if (spec.duration !== undefined) slideOptions.duration = spec.duration;
    if (spec.section !== undefined) slideOptions.section = spec.section;
    const slide = new Slide(spec.title || spec.headline || spec.id || "", slideOptions);

    slide.layout(spec.layout || spec.format || "standard");
    if (spec.kicker) slide.kicker(spec.kicker);
    if (spec.headline) slide.headline(spec.headline);
    if (spec.subhead) slide.subhead(spec.subhead);
    if (spec.notes) slide.notes(spec.notes);

    for (const block of componentList(spec.blocks || spec.children || [], features)) {
        slide.add(block);
    }

    return slide;
}

export function createDeckFromSpec(spec = {}) {
    const deck = new SlideDeck({
        title: spec.title || "Untitled Deck",
        durationMinutes: spec.durationMinutes || spec.duration || 10,
        features: spec.features || {},
    });

    for (const slide of compact((spec.slides || []).map(item => slideFromSpec(item, deck.options.features)))) {
        deck.add(slide);
    }

    return deck;
}
