import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { mathcamp } from '../content'

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

      {mathcamp.lectures.map((lecture) => (
        <section key={lecture.id}>
          <SectionHeader kicker={`Lecture ${lecture.number}`}>{lecture.title}</SectionHeader>

          <p className="text-muted mb-8 leading-relaxed max-w-2xl">{lecture.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lecture.graphs.map((graph) => (
              <Link
                key={graph.slug}
                to={`/math-camp/${graph.slug}`}
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
        </section>
      ))}

      <div className="bg-green-soft/50 border border-green/15 rounded-lg p-6 mt-16 mb-8">
        <h3 className="text-lg font-bold text-ink mb-2">{mathcamp.note.title}</h3>
        <p className="text-muted leading-relaxed">{mathcamp.note.body}</p>
      </div>
    </div>
  )
}
