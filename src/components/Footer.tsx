import { Github } from 'lucide-react'
import { site } from '../content'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 py-8 text-slate-light text-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>{site.footer.copyright}</p>
        <a
          href={site.social.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-accent transition-colors"
        >
          <Github size={18} />
          <span>{site.social.github.label}</span>
        </a>
      </div>
    </footer>
  )
}
