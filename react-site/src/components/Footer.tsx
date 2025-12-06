import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 py-8 text-slate-light text-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2025 Ignacio Urbina</p>
        <a
          href="https://github.com/ignaciourbina"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-accent transition-colors"
        >
          <Github size={18} />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  )
}
