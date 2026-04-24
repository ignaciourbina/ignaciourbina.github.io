/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#17211f',
        muted: {
          DEFAULT: '#60716d',
          light: '#7d8d88',
        },
        green: {
          DEFAULT: '#1f7a5b',
          soft: '#dff1e9',
          hover: '#176a4d',
        },
        amber: {
          DEFAULT: '#b36a15',
          soft: '#faecd7',
        },
        red: {
          DEFAULT: '#a63d40',
          soft: '#f4ddde',
        },
        blue: {
          DEFAULT: '#315f86',
          soft: '#dfeaf1',
        },
        paper: '#f7f5ee',
        panel: '#ffffff',
        line: '#d9d6ca',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(31, 47, 43, 0.08)',
        card: '0 4px 24px rgba(31, 47, 43, 0.06)',
        'card-hover': '0 14px 40px rgba(31, 122, 91, 0.10)',
      },
    },
  },
  plugins: [],
}
