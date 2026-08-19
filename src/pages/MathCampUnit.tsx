import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Download, ClipboardCheck, PenLine } from 'lucide-react'
import { getMathCampPractice, getMathCampQuiz, getMathCampUnit } from '../content'

export default function MathCampUnit() {
  const { unitId } = useParams<{ unitId: string }>()
  const unit = unitId ? getMathCampUnit(unitId) : undefined
  const quiz = unitId ? getMathCampQuiz(unitId) : undefined
  const practice = unitId ? getMathCampPractice(unitId) : undefined

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
        <p className="text-lg text-muted max-w-2xl mb-6">{unit.description}</p>
        <a
          href={unit.slides.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green text-white rounded-lg font-semibold text-sm hover:bg-green-hover transition-colors shadow-sm"
        >
          <Download size={16} />
          Lecture slides (PDF, {unit.slides.pages} pp)
        </a>
      </header>

      {unit.note && (
        <div className="border-l-4 border-green/40 bg-green-soft/40 rounded-r-lg px-5 py-4 mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-green mb-1">
            Note on the slides
          </p>
          <p className="text-muted text-sm leading-relaxed">{unit.note}</p>
        </div>
      )}

      {quiz && (
        <Link
          to={`/math-camp/${unit.id}/self-assessment`}
          className="group bg-ink text-white rounded-lg p-6 mb-10 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
        >
          <ClipboardCheck size={22} className="shrink-0 mt-0.5 text-green" />
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-lg mb-1">Self-assessment</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              {quiz.questions.filter((q) => q.core).length < quiz.questions.length
                ? `A core set of ${quiz.questions.filter((q) => q.core).length} questions, or the full bank of ${quiz.questions.length} covering the unit slide by slide.`
                : `${quiz.questions.length} questions drawn from the slides of this unit.`}{' '}
              Multiple choice, true or false, and select all that apply, with answers and
              justifications after you submit.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green">
              Start
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      )}

      {practice && (
        <Link
          to={`/math-camp/${unit.id}/practice`}
          className="group bg-panel border border-line rounded-lg p-6 mb-10 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-green/30"
        >
          <PenLine size={22} className="shrink-0 mt-0.5 text-green" />
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-lg mb-1 text-ink group-hover:text-green transition-colors">
              {practice.title}
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-3">
              {practice.description} {practice.source}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green">
              Open the {practice.exercises.length} problems
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      )}

      {unit.graphs.length === 0 ? (
        quiz ? null : (
          <div className="border border-line rounded-lg p-12 text-center">
            <p className="text-muted">Interactive material for this unit has not been built yet.</p>
          </div>
        )
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
