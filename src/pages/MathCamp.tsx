import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import { mathcamp, type MathCampUnit } from '../content'

function UnitCard({ unit }: { unit: MathCampUnit }) {
  const count = unit.graphs.length

  // Units without interactive material get no page of their own; the slides
  // are offered straight from the card instead.
  if (count === 0) {
    return (
      <div className="bg-panel border border-line rounded-lg p-6 flex flex-col">
        <div className="opacity-60">
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-light">
              Unit {unit.number}
            </span>
            <span className="text-xs text-muted-light shrink-0">Slides only</span>
          </div>
          <h2 className="text-ink font-bold text-lg mb-2">{unit.title}</h2>
          <p className="text-muted text-sm leading-relaxed mb-3">{unit.description}</p>
        </div>
        <a
          href={unit.slides.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-green hover:text-green-hover transition-colors mt-auto"
        >
          <Download size={14} />
          Slides (PDF, {unit.slides.pages} pp)
        </a>
      </div>
    )
  }

  return (
    <Link
      to={`/math-camp/${unit.id}`}
      className="group bg-panel border border-line rounded-lg p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-green/30 flex flex-col"
    >
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-green">
          Unit {unit.number}
        </span>
        <span className="text-xs text-muted-light shrink-0">
          Slides &middot; {count} {count === 1 ? 'graph' : 'graphs'}
        </span>
      </div>
      <h2 className="text-ink font-bold text-lg mb-2 group-hover:text-green transition-colors">
        {unit.title}
      </h2>
      <p className="text-muted text-sm leading-relaxed mb-3">{unit.description}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green mt-auto">
        Open unit
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

export default function MathCamp() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          Teaching materials
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-3">{mathcamp.page.title}</h1>
        <p className="text-lg text-muted max-w-2xl mb-4">{mathcamp.page.subtitle}</p>
        <p className="text-muted max-w-2xl leading-relaxed">{mathcamp.page.description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mathcamp.units.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>

      <div className="bg-green-soft/50 border border-green/15 rounded-lg p-6 mt-16 mb-8">
        <h3 className="text-lg font-bold text-ink mb-2">{mathcamp.note.title}</h3>
        <p className="text-muted leading-relaxed">{mathcamp.note.body}</p>
      </div>
    </div>
  )
}
