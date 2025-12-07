# Ignacio Urbina - Personal Website (React)

This is a React + TypeScript + Vite migration of the Quarto website.

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Lucide React** - Icons

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts the development server at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Button.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── SectionHeader.tsx
│   └── ToolCard.tsx
├── pages/            # Page components (routes)
│   ├── About.tsx
│   ├── Home.tsx
│   ├── Research.tsx
│   ├── Teaching.tsx
│   └── Tools.tsx
├── App.tsx           # Main app with routing
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Deploying to GitHub Pages

1. Update `vite.config.ts` if deploying to a subdirectory:
   ```ts
   base: '/your-repo-name/'
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to GitHub Pages (you can use the `gh-pages` package or GitHub Actions)

### Using GitHub Actions (recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: react-site/package-lock.json
      
      - name: Install dependencies
        run: npm ci
        working-directory: react-site
      
      - name: Build
        run: npm run build
        working-directory: react-site
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: react-site/dist
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  navy: '#1e3a5f',      // Primary dark color
  accent: '#0ea5e9',    // Accent/link color
  // ...
}
```

### Adding New Pages

1. Create a new file in `src/pages/`
2. Add a route in `src/App.tsx`
3. Add a navigation link in `src/components/Navbar.tsx`

### Adding Profile Image

Replace the placeholder avatar in `About.tsx` with an actual image:

```tsx
<img 
  src="/images/profile.jpg" 
  alt="Profile" 
  className="w-48 h-48 rounded-full object-cover"
/>
```

## Migration Notes

This React site replicates the structure and content of the original Quarto site:

- **Home** → `index.qmd`
- **Tools** → `tools/index.qmd`
- **Research** → `research/index.qmd`
- **Teaching** → `teaching/index.qmd`
- **About** → `about.qmd`

The styling has been converted from SCSS to Tailwind CSS while maintaining the same visual design.
