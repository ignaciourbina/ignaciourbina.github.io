# The printed poster. `make` builds it; `make preview` renders a screen-sized
# PNG; `make fit` re-checks that no block has outgrown its panel.

cam-poster.pdf: cam-poster.tex preamble.tex layout.tex blocks.tex \
                ../img/ate-items.png ../img/results-cate.png
	latexmk -lualatex -interaction=nonstopmode cam-poster.tex

preview: cam-poster.pdf
	pdftoppm -png -r 40 -singlefile cam-poster.pdf cam-poster-preview

clean:
	latexmk -C cam-poster.tex
	rm -f cam-poster-preview.png

.PHONY: preview clean
