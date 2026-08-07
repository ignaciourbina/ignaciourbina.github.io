// Swap between the summary and detail views of a block.
//
// iPoster's OPEN control enlarges the block's iframe rather than navigating, so
// both views are sections of one document and this toggles which is shown. No
// page load, so scroll position and the enlarged frame are both preserved.
//
// The hash is kept in sync (#detail), which makes a view directly linkable and
// lets the poster open straight into the detail if that is ever wanted.

const SUMMARY = "summary";
const DETAIL = "detail";

function show(name, { moveFocus = false } = {}) {
    for (const section of document.querySelectorAll(".view")) {
        section.hidden = section.dataset.view !== name;
    }
    // The enlarged frame keeps its scroll offset; start each view at the top.
    window.scrollTo(0, 0);
    // Focus only when the reader pressed a button. Focusing on first paint can
    // make the embedding page scroll the iframe, which showed up as a block
    // opening mid-content instead of at its heading.
    if (moveFocus) {
        const target = document.querySelector(`.view[data-view="${name}"]`);
        if (target) target.focus({ preventScroll: true });
    }
}

for (const button of document.querySelectorAll("button.swap")) {
    button.addEventListener("click", () => {
        const name = button.dataset.target;
        show(name, { moveFocus: true });
        // replaceState, not a hash assignment: writing location.hash inside an
        // iframe can scroll the embedding page.
        history.replaceState(null, "", name === DETAIL ? "#detail" : "#");
    });
}

show(location.hash === "#detail" ? DETAIL : SUMMARY);
