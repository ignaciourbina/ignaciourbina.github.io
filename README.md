# ignaciourbina.github.io

Personal academic website with research tools, interactive briefs, and teaching resources.

**🌐 [ignaciourbina.github.io](https://ignaciourbina.github.io)**

---

Built with React + TypeScript + Vite + Tailwind CSS

## Paper PDFs

The working papers and appendices in `public/files/` are image-only PDFs (450 DPI, no text layer), at Ignacio's request on 2026-11-19, so their text cannot be selected, copied, or indexed. Their text originals live in `pdf-sources/`, which git ignores. To update a paper, copy its new build to `pdf-sources/<name>.pdf`, run `bash scripts/flatten-pdfs.sh <name>.pdf`, and commit the new file in `public/files/` with `src/content/pdfVersions.json`. Never copy a text build into `public/files/` directly.
