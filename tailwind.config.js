/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1e3a5f',
        slate: {
          DEFAULT: '#475569',
          light: '#64748b',
        },
        accent: {
          DEFAULT: '#0ea5e9',
          light: '#38bdf8',
        },
        bg: {
          light: '#f8fafc',
          card: '#ffffff',
        },
        border: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Barlow', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
      },
    },
  },
  plugins: [],
}
