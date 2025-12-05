# Ignacio Urbina - Personal Website

A Quarto-powered academic website for sharing research tools, interactive briefs, and teaching resources.

🌐 **Live site:** [ignaciourbina.github.io](https://ignaciourbina.github.io)

## 🚀 Quick Start

### Prerequisites

1. **Install Quarto** (version 1.3 or higher):
   ```bash
   # macOS (Homebrew)
   brew install quarto
   
   # Linux (Ubuntu/Debian)
   wget https://github.com/quarto-dev/quarto-cli/releases/download/v1.4.553/quarto-1.4.553-linux-amd64.deb
   sudo dpkg -i quarto-1.4.553-linux-amd64.deb
   
   # Or download from: https://quarto.org/docs/get-started/
   ```

2. **Clone this repository:**
   ```bash
   git clone https://github.com/ignaciourbina/ignaciourbina.github.io.git
   cd ignaciourbina.github.io
   ```

### Local Development

```bash
# Preview the site locally (with hot reload)
quarto preview

# The site will open at http://localhost:4000
```

### Build for Production

```bash
# Build the site (outputs to /docs folder)
quarto render
```

## 📁 Project Structure

```
ignaciourbina.github.io/
├── _quarto.yml           # Site configuration
├── index.qmd             # Landing page
├── about.qmd             # About/CV page
├── custom.scss           # Custom styles (SCSS)
├── styles.css            # Additional CSS
├── references.bib        # Bibliography for citations
│
├── tools/
│   └── index.qmd         # Tools gallery
│
├── research/
│   ├── index.qmd         # Research briefs hub
│   └── sample-brief/     # Template for research briefs
│       └── index.qmd
│
├── teaching/
│   └── index.qmd         # Teaching resources
│
├── images/               # Profile photo, logos, etc.
│   └── profile.jpg       # Add your photo here
│
├── files/                # Downloadable files
│   └── cv.pdf            # Add your CV here
│
└── docs/                 # Generated site (git-ignored locally)
```

## ✏️ Customization

### 1. Update Personal Information

Edit these files with your details:

- **`_quarto.yml`** - Site title, social links, email
- **`index.qmd`** - Landing page introduction
- **`about.qmd`** - Bio, education, skills, contact info

### 2. Add Your Profile Photo

Place your photo in `images/profile.jpg`

### 3. Add Your CV

Place your CV in `files/cv.pdf`

### 4. Customize Colors

Edit `custom.scss` to change the color palette:

```scss
$navy: #1e3a5f;        // Primary dark color
$accent: #0ea5e9;      // Accent/link color
$slate: #475569;       // Text color
```

## 📝 Adding Content

### Add a New Tool

1. Edit `tools/index.qmd`
2. Add a new `.tool-card` div following the existing pattern
3. Update status to `.live` when published

### Add a Research Brief

1. Create a new folder: `research/my-brief/`
2. Copy `research/sample-brief/index.qmd` as a template
3. Write your content with embedded visualizations
4. Remove `draft: true` when ready to publish

### Add Interactive Visualizations

Quarto supports many visualization libraries:

```python
# Python (Plotly)
import plotly.express as px
fig = px.scatter(df, x="x", y="y")
fig.show()
```

```r
# R (ggplot2 + plotly)
library(plotly)
ggplotly(ggplot(df, aes(x, y)) + geom_point())
```

```{ojs}
// Observable JS
Plot.plot({
  marks: [Plot.dot(data, {x: "x", y: "y"})]
})
```

## 🚀 Deployment

### Option 1: GitHub Pages (Recommended)

The site is configured to deploy from the `/docs` folder.

1. Build the site:
   ```bash
   quarto render
   ```

2. Commit and push:
   ```bash
   git add .
   git commit -m "Update site"
   git push
   ```

3. In GitHub repo settings:
   - Go to **Settings → Pages**
   - Set **Source** to "Deploy from a branch"
   - Select **Branch:** `master` and **Folder:** `/docs`

### Option 2: GitHub Actions (Automatic)

Create `.github/workflows/publish.yml`:

```yaml
name: Build and Deploy Quarto Site

on:
  push:
    branches: [master]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      
      - uses: quarto-dev/quarto-actions/setup@v2
      
      - name: Render Quarto Project
        run: quarto render
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

## 🔗 Existing Tools

These tools are already live and linked from the site:

- **[CausalFlow](https://ignaciourbina.github.io/causal-flow/)** - Longitudinal causal model builder
- **[QuizView](https://ignaciourbina.github.io/quizview/)** - Brightspace quiz CSV previewer

## 📚 Resources

- [Quarto Documentation](https://quarto.org/docs/guide/)
- [Quarto Websites](https://quarto.org/docs/websites/)
- [Quarto Themes](https://quarto.org/docs/output-formats/html-themes.html)
- [Observable JS](https://quarto.org/docs/interactive/ojs/)

## 📄 License

Content © Ignacio Urbina. Code is MIT licensed.
