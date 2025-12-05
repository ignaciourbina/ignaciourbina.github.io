# TODO - Website Setup Checklist

## 🔴 High Priority (Before Launch)

- [ ] **Add profile photo** — Place `profile.jpg` in the `images/` folder
- [ ] **Add CV** — Place `cv.pdf` in the `files/` folder
- [ ] **Update personal info** in `about.qmd`:
  - [ ] Bio/introduction
  - [ ] Education history
  - [ ] Email address
  - [ ] LinkedIn URL
  - [ ] Skills & tools
- [ ] **Update contact links** in `_quarto.yml`:
  - [ ] Email address (line: `href: mailto:your.email@example.com`)
  - [ ] LinkedIn URL

## 🟡 Content to Add

### Tools Page (`tools/index.qmd`)
- [ ] Add screenshots for CausalFlow and QuizView
- [ ] Add GitHub repo links for each tool
- [ ] Add more tools as they're ready:
  - [ ] Power Calculator
  - [ ] Bayes Viz
  - [ ] Stats Demos

### Research Briefs (`research/`)
- [ ] Create first research brief (use `research/sample-brief/` as template)
- [ ] Add interactive Plotly/Altair visualizations
- [ ] Topics to consider:
  - [ ] Automation attitudes research
  - [ ] AI deliberation findings
  - [ ] Methodology explainers

### Teaching Page (`teaching/index.qmd`)
- [ ] Add course syllabi
- [ ] Create interactive demos:
  - [ ] Sampling distributions
  - [ ] Hypothesis testing
  - [ ] Regression intuition
- [ ] Add lecture slides/materials

## 🟢 Optional Enhancements

- [ ] **Custom logo** — Create and add `images/logo.png`
- [ ] **Favicon** — Add site icon
- [ ] **Custom colors** — Adjust palette in `custom.scss` if desired
- [ ] **Email subscription** — Set up newsletter (e.g., Buttondown, Substack)
- [ ] **Analytics** — Add Google Analytics or Plausible
- [ ] **Comments** — Add Giscus or Utterances for research briefs
- [ ] **Citation style** — Download `apa.csl` and uncomment in `_quarto.yml`

## 🚀 Deployment

- [ ] Push changes to GitHub
- [ ] Configure GitHub Pages:
  - Go to **Settings → Pages**
  - Set **Source** to "Deploy from a branch"
  - Select **Branch:** `master` and **Folder:** `/docs`
- [ ] OR enable GitHub Actions (workflow already created in `.github/workflows/publish.yml`)
- [ ] Verify site is live at https://ignaciourbina.github.io

## 📝 Ongoing Maintenance

- [ ] Add new tools as they're developed
- [ ] Publish research briefs for new papers
- [ ] Update CV periodically
- [ ] Keep teaching materials current

---

## Quick Commands

```bash
# Preview site locally
quarto preview

# Build site for production
quarto render

# Check what will be deployed
ls -la docs/
```

## File Locations

| What | Where |
|------|-------|
| Site config | `_quarto.yml` |
| Landing page | `index.qmd` |
| About/CV | `about.qmd` |
| Tools gallery | `tools/index.qmd` |
| Research hub | `research/index.qmd` |
| Brief template | `research/sample-brief/index.qmd` |
| Teaching | `teaching/index.qmd` |
| Custom styles | `custom.scss` |
| Profile photo | `images/profile.jpg` |
| CV PDF | `files/cv.pdf` |
