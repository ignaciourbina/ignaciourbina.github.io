import { createDeckFromSpec } from "./deck-json.js";

async function loadDeckSpec() {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("deck") || "deck.json";
    const response = await fetch(source);
    if (!response.ok) {
        throw new Error(`Could not load deck JSON from ${source}: ${response.status}`);
    }
    return response.json();
}

function renderLoadError(error) {
    const root = document.querySelector("#deck");
    root.className = "deck-shell";
    root.textContent = error.message;
}

const KATEX_DELIMS = [
    { left: "\\[", right: "\\]", display: true },
    { left: "\\(", right: "\\)", display: false }
];

function renderMath() {
    const root = document.querySelector("#deck");
    if (!root || !window.renderMathInElement) return;
    window.renderMathInElement(root, {
        delimiters: KATEX_DELIMS,
        throwOnError: false,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
    });
}

function scheduleMathRender() {
    if (window.renderMathInElement) {
        renderMath();
    } else {
        window.addEventListener("load", renderMath, { once: true });
    }
}

try {
    const spec = await loadDeckSpec();
    createDeckFromSpec(spec).mount("#deck");
    scheduleMathRender();
    const observer = new MutationObserver(() => {
        if (observer.pending) return;
        observer.pending = true;
        requestAnimationFrame(() => {
            observer.pending = false;
            renderMath();
        });
    });
    observer.observe(document.querySelector("#deck"), { childList: true, subtree: true });
} catch (error) {
    renderLoadError(error);
}
