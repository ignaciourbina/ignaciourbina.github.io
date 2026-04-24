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

try {
    const spec = await loadDeckSpec();
    createDeckFromSpec(spec).mount("#deck");
} catch (error) {
    renderLoadError(error);
}
