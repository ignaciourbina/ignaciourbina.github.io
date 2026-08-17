import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getMathCampUnit } from '../content'

export default function MathCampUnit() {
  const { unitId } = useParams<{ unitId: string }>()
  const unit = unitId ? getMathCampUnit(unitId) : undefined

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink mb-4">Unit not found</h1>
        <Link to="/math-camp" className="text-green hover:text-green-hover transition-colors">
          Back to Math Camp
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link
        to="/math-camp"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        <span>Math Camp</span>
      </Link>

      <header className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          Unit {unit.number}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-3">{unit.title}</h1>
        <p className="text-lg text-muted max-w-2xl">{unit.description}</p>
      </header>

      {unit.graphs.length === 0 ? (
        <div className="border border-line rounded-lg p-12 text-center">
          <p className="text-muted">Interactive material for this unit has not been built yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {unit.graphs.map((graph) => (
            <Link
              key={graph.slug}
              to={`/math-camp/${unit.id}/${graph.slug}`}
              className="group bg-panel border border-line rounded-lg p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-green/30 block"
            >
              <h2 className="text-ink font-bold text-lg mb-2 group-hover:text-green transition-colors">
                {graph.title}
              </h2>
              <p className="font-mono text-sm text-green mb-3">{graph.expression}</p>
              <p className="text-muted text-sm leading-relaxed">{graph.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
