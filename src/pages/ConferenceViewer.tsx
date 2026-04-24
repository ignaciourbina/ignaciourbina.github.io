import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Maximize2 } from 'lucide-react'
import { conferences } from '../content'

export default function ConferenceViewer() {
  const { slug } = useParams<{ slug: string }>()
  const pres = conferences.presentations.find((p) => p.slug === slug)

  if (!pres) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink mb-4">Presentation not found</h1>
        <Link to="/conferences" className="text-green hover:text-green-hover transition-colors">
          Back to Conferences
        </Link>
      </div>
    )
  }

  const presentationUrl = `/presentations/${pres.slug}/index.html`

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="bg-panel border-b border-line px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            to="/conferences"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-green transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
          <div className="border-l border-line pl-4">
            <h1 className="text-ink font-semibold text-sm leading-tight">{pres.title}</h1>
            <p className="text-muted-light text-xs">
              {pres.event} &middot; {pres.date}
            </p>
          </div>
        </div>
        <a
          href={presentationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted hover:text-green transition-colors"
          title="Open in new tab"
        >
          <Maximize2 size={14} />
          <span className="hidden sm:inline">Full screen</span>
        </a>
      </div>

      <iframe
        src={presentationUrl}
        title={pres.title}
        className="flex-1 w-full bg-white"
        style={{ border: 'none' }}
        allow="fullscreen"
      />
    </div>
  )
}
