#!/usr/bin/env bash
# =====================================================================
#  render-cv.sh -- page images for the CV, so it previews on mobile
# ---------------------------------------------------------------------
#  Mobile browsers have no inline PDF plugin, so <object data="...pdf">
#  falls through to its fallback content. That fallback is these images.
#  Desktop never sees them: it renders the real PDF instead.
#
#  Re-run whenever the CV changes:
#      npm run render:cv
#
#  Requires poppler-utils (pdftoppm) and cwebp, the same toolchain the
#  math camp pipeline already depends on for pdfinfo.
# =====================================================================
set -euo pipefail

root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
pdf="$root/public/files/cv-2026.pdf"
out="$root/public/files/cv-pages"

[[ -f $pdf ]] || { echo "render-cv: no CV at $pdf" >&2; exit 1; }
command -v pdftoppm >/dev/null || { echo "render-cv: pdftoppm not found (install poppler-utils)" >&2; exit 1; }
command -v cwebp    >/dev/null || { echo "render-cv: cwebp not found (install webp)" >&2; exit 1; }

rm -rf "$out"; mkdir -p "$out"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

pdftoppm -png -r 110 "$pdf" "$tmp/page"
for f in "$tmp"/page-*.png; do
  n="$(basename "$f" .png)"; n="${n#page-}"
  cwebp -quiet -q 78 -resize 1000 0 "$f" -o "$out/cv-$((10#$n)).webp"
done

pages="$(ls "$out"/*.webp | wc -l)"
echo "render-cv: wrote $pages page images to public/files/cv-pages ($(du -sh "$out" | cut -f1))"
echo "render-cv: CV_PAGES in src/pages/CV.tsx must equal $pages"
