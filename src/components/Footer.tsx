import { Github } from 'lucide-react'
import { site } from '../content'

export default function Footer() {
  return (
    <footer className="border-t border-line mt-20 py-8 text-muted-light text-sm">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>{site.footer.copyright}</p>
        <a
          href={site.social.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-green transition-colors"
        >
          <Github size={16} />
          <span>{site.social.github.label}</span>
        </a>
      </div>
    </footer>
  )
}
