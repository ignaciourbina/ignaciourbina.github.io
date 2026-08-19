import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Eye, RotateCcw } from 'lucide-react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { getMathCampPractice, getMathCampUnit } from '../content'
import type { PracticeExercise } from '../content'

function Math({ tex, className }: { tex: string; className?: string }) {
  const html = katex.renderToString(tex, { throwOnError: false, output: 'html' })
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

function ExerciseCard({ exercise, index }: { exercise: PracticeExercise; index: number }) {
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(0)
  const total = exercise.steps.length
  const done = revealed >= total

  return (
    <div className="border border-line rounded-lg bg-panel overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-green-soft/30 transition-colors"
      >
        <span className="text-xs font-bold text-muted-light w-5 shrink-0">{index + 1}</span>
        <span className="text-ink font-medium flex-1">
          <Math tex={exercise.prompt} />
        </span>
        <span className="text-xs text-muted hidden sm:block">{exercise.rule}</span>
        <ChevronDown
          size={16}
          className={`text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-6 pb-5 border-t border-line pt-4">
          <ol className="space-y-3 mb-4">
            {exercise.steps.slice(0, revealed).map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-xs font-bold text-green w-4 shrink-0 mt-1">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm text-ink">
                    <Math tex={step.math} />
                  </p>
                  {step.note && <p className="text-muted text-xs mt-0.5">{step.note}</p>}
                </div>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-3">
            {!done ? (
              <button
                onClick={() => setRevealed((r) => r + 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-green text-white rounded-lg text-sm font-semibold hover:bg-green-hover transition-colors"
              >
                <Eye size={14} />
                {revealed === 0 ? 'Reveal first step' : 'Next step'}
              </button>
            ) : (
              <span className="text-xs text-muted">All steps shown.</span>
            )}
            {revealed > 0 && (
              <button
                onClick={() => setRevealed(0)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-muted rounded-lg text-xs hover:text-ink transition-colors"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            )}
            <span className="text-xs text-muted-light ml-auto">
              {revealed} / {total}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function MathCampPractice() {
  const { unitId } = useParams<{ unitId: string }>()
  const unit = unitId ? getMathCampUnit(unitId) : undefined
  const practice = unitId ? getMathCampPractice(unitId) : undefined

  if (!unit || !practice) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink mb-4">Practice set not found</h1>
        <Link to="/math-camp" className="text-green hover:text-green-hover transition-colors">
          Back to Math Camp
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        to={`/math-camp/${unit.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        <span>Unit {unit.number}</span>
      </Link>

      <header className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          Unit {unit.number} · Practice
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-ink mb-3">{practice.title}</h1>
        <p className="text-muted mb-1">{practice.description}</p>
        <p className="text-muted-light text-sm">{practice.source}</p>
      </header>

      <div className="space-y-3">
        {practice.exercises.map((exercise, index) => (
          <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
        ))}
      </div>
    </div>
  )
}
