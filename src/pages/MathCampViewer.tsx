import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Maximize2 } from 'lucide-react'
import { getMathCampGraph } from '../content'

export default function MathCampViewer() {
  const { unitId, slug } = useParams<{ unitId: string; slug: string }>()
  const found = unitId && slug ? getMathCampGraph(unitId, slug) : undefined

  if (!found) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink mb-4">Graph not found</h1>
        <Link to="/math-camp" className="text-green hover:text-green-hover transition-colors">
          Back to Math Camp
        </Link>
      </div>
    )
  }

  const { unit, graph } = found
  const graphUrl = `/graphs/math-camp/${unit.id}/${graph.slug}.html`

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="bg-panel border-b border-line px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to={`/math-camp/${unit.id}`}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-green transition-colors shrink-0"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
          <div className="border-l border-line pl-4 min-w-0">
            <h1 className="text-ink font-semibold text-sm leading-tight truncate">{graph.title}</h1>
            <p className="text-muted-light text-xs truncate">
              <Link to="/math-camp" className="hover:text-green transition-colors">
                Math Camp
              </Link>
              {' / '}
              <Link to={`/math-camp/${unit.id}`} className="hover:text-green transition-colors">
                Unit {unit.number}
              </Link>
              {' / '}
              {graph.expression}
            </p>
          </div>
        </div>
        <a
          href={graphUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted hover:text-green transition-colors shrink-0"
          title="Open in new tab"
        >
          <Maximize2 size={14} />
          <span className="hidden sm:inline">Full screen</span>
        </a>
      </div>

      <iframe
        src={graphUrl}
        title={graph.title}
        className="flex-1 w-full bg-white"
        style={{ border: 'none' }}
        allow="fullscreen"
      />

      <div className="bg-panel border-t border-line px-6 py-3 shrink-0">
        <p className="text-muted text-sm leading-relaxed max-w-4xl">{graph.description}</p>
      </div>
    </div>
  )
}
