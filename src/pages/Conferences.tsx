import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { conferences } from '../content'

export default function Conferences() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          Talks & slides
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-3">
          {conferences.page.title}
        </h1>
        <p className="text-lg text-muted max-w-2xl">{conferences.page.subtitle}</p>
      </header>

      {/* Slide decks */}
      <SectionHeader kicker={conferences.sections.presentations.kicker} className="mt-0">
        {conferences.sections.presentations.title}
      </SectionHeader>

      {conferences.presentations.length === 0 ? (
        <div className="border border-line rounded-lg p-12 text-center">
          <p className="text-muted">Presentations will appear here as they are added.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conferences.presentations.map((pres) => (
            <Link
              key={pres.slug}
              to={`/conferences/${pres.slug}`}
              className="group bg-panel border border-line rounded-lg p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-green/30 block"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
                {pres.event}
              </span>
              <h2 className="text-ink font-bold text-lg mb-2 group-hover:text-green transition-colors">
                {pres.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-3">{pres.description}</p>
              <span className="text-muted-light text-xs">{pres.date}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Posters. These are standalone pages, so each card opens its own URL. */}
      {conferences.posters.length > 0 && (
        <>
          <SectionHeader kicker={conferences.sections.posters.kicker}>
            {conferences.sections.posters.title}
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conferences.posters.map((poster) => (
              <a
                key={poster.slug}
                href={poster.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-panel border border-line rounded-lg p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-green/30 block"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
                  {poster.event}
                </span>
                <h2 className="text-ink font-bold text-lg mb-2 group-hover:text-green transition-colors">
                  {poster.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-3">{poster.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-muted-light text-xs">{poster.date}</span>
                  <span className="flex items-center gap-1.5 text-xs text-muted group-hover:text-green transition-colors">
                    <ExternalLink size={13} />
                    Open poster
                  </span>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
