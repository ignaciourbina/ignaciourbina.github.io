#!/usr/bin/env bash
# Publish paper PDFs as image-only files. Each text PDF in pdf-sources/ (gitignored, kept in
# Dropbox only) is rendered at 450 DPI to lossless PNG pages and wrapped with img2pdf into
# public/files/<same name>.pdf, so the served file has no text layer: nothing can be selected,
# copied, or indexed. Then the version stamps are refreshed.
#
# Usage: bash scripts/flatten-pdfs.sh [name.pdf ...]   (no names: every file in pdf-sources/)
# To update a paper: copy its new text build into pdf-sources/<name>.pdf, run this, commit.
# Requires pdftoppm (poppler), img2pdf, pdfinfo, pdftotext. GitHub refuses files over 100 MB.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"; src="$root/pdf-sources"; dst="$root/public/files"
names=("$@"); [[ ${#names[@]} -eq 0 ]] && names=($(cd "$src" && ls *.pdf))
for name in "${names[@]}"; do
  tmp="$(mktemp -d)"
  pdftoppm -r 450 -png "$src/$name" "$tmp/p" 2>/dev/null
  img2pdf $(ls "$tmp"/p-*.png | sort -V) -o "$dst/$name"
  rm -rf "$tmp"
  mb=$(( $(stat -c %s "$dst/$name") / 1048576 ))
  echo "  $name: $(pdfinfo "$dst/$name" | awk '/^Pages/{print $2}') pages, ${mb} MB, selectable characters: $(pdftotext "$dst/$name" - | tr -d '[:space:]\f' | wc -c)"
  (( mb < 95 )) || echo "  WARNING: $name is ${mb} MB; GitHub refuses files over 100 MB"
done
node "$root/scripts/stamp-pdf-versions.mjs"
