import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, X, RotateCcw } from 'lucide-react'
import { getMathCampQuiz, getMathCampUnit, type QuizOption, type QuizQuestion } from '../content'

type Answers = Record<number, string[]>
type Mode = 'core' | 'full'
type OptionOrder = Record<number, string[]>

// The key carries both the shape version and a hash of the question bank.
// Question ids are positional, so editing or removing a question shifts them:
// without the hash a saved attempt would silently restore old answers against
// different questions.
const STORAGE_VERSION = 2
const keyPrefix = (unitId: string) => `mathcamp-quiz:${unitId}:v${STORAGE_VERSION}:`
const storageKey = (unitId: string, quizVersion: string) => keyPrefix(unitId) + quizVersion

// Drop attempts saved against an earlier bank, plus anything left by v1.
function pruneStale(unitId: string, quizVersion: string) {
  try {
    const keep = storageKey(unitId, quizVersion)
    const doomed: string[] = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i)
      if (!k || !k.startsWith(`mathcamp-quiz:${unitId}:`) || k === keep) continue
      doomed.push(k)
    }
    doomed.forEach((k) => window.localStorage.removeItem(k))
  } catch {
    // storage unavailable; nothing to prune
  }
}

interface Saved {
  mode: Mode
  answers: Answers
  index: number
  submitted: boolean
  order: OptionOrder
}

// localStorage throws in private mode and when storage is disabled, and any
// stored blob may predate the current question bank, so every read is guarded
// and every field is validated before it reaches state.
function readSaved(unitId: string | undefined, quizVersion: string | undefined): Partial<Saved> {
  if (!unitId || !quizVersion || typeof window === 'undefined') return {}
  try {
    pruneStale(unitId, quizVersion)
    const raw = window.localStorage.getItem(storageKey(unitId, quizVersion))
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Partial<Saved>
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed
  } catch {
    return {}
  }
}

function writeSaved(unitId: string, quizVersion: string, value: Saved) {
  try {
    window.localStorage.setItem(storageKey(unitId, quizVersion), JSON.stringify(value))
  } catch {
    // storage full or unavailable; progress simply is not kept
  }
}

function clearSaved(unitId: string, quizVersion: string) {
  try {
    window.localStorage.removeItem(storageKey(unitId, quizVersion))
  } catch {
    // nothing to do
  }
}

function shuffle<T>(items: T[]): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function sameAnswer(given: string[] | undefined, correct: string[]) {
  if (!given || given.length !== correct.length) return false
  return [...given].sort().join() === [...correct].sort().join()
}

const TYPE_LABEL: Record<QuizQuestion['type'], string> = {
  single: 'Multiple choice',
  truefalse: 'True or false',
  multi: 'Select all that apply',
}

export default function MathCampQuiz() {
  const { unitId } = useParams<{ unitId: string }>()
  const unit = unitId ? getMathCampUnit(unitId) : undefined
  const quiz = unitId ? getMathCampQuiz(unitId) : undefined

  const all = useMemo(() => quiz?.questions ?? [], [quiz])

  // Option order is fixed for the life of an attempt and reshuffled on reset,
  // so it is stored alongside the answers: a reload that reordered the options
  // under you would read as a glitch. True/false keeps its natural order.
  const freshOrder = useCallback(
    (): OptionOrder =>
      Object.fromEntries(
        all.map((q) => [
          q.id,
          (q.type === 'truefalse' ? q.options : shuffle(q.options)).map((o) => o.id),
        ])
      ),
    [all]
  )

  const [saved] = useState(() => readSaved(unitId, quiz?.version))
  const [mode, setMode] = useState<Mode>(() =>
    saved.mode === 'core' || saved.mode === 'full' ? saved.mode : 'core'
  )
  const [answers, setAnswers] = useState<Answers>(() => {
    const known = new Set(all.map((q) => q.id))
    const restored = saved.answers ?? {}
    return Object.fromEntries(
      Object.entries(restored).filter(
        ([id, value]) => known.has(Number(id)) && Array.isArray(value)
      )
    )
  })
  const [submitted, setSubmitted] = useState(() => saved.submitted === true)
  const [confirmingReset, setConfirmingReset] = useState(false)
  const [orderIds, setOrderIds] = useState<OptionOrder>(() => {
    const stored = saved.order ?? {}
    const complete = all.every(
      (q) => Array.isArray(stored[q.id]) && stored[q.id].length === q.options.length
    )
    return complete ? stored : freshOrder()
  })

  const questions = useMemo(() => (mode === 'core' ? all.filter((q) => q.core) : all), [all, mode])

  const [index, setIndex] = useState(() => {
    const n = typeof saved.index === 'number' ? saved.index : 0
    return Number.isInteger(n) && n >= 0 ? n : 0
  })

  // Clamp rather than reset: switching sets or a shrinking bank can leave the
  // cursor past the end, and dropping the user back to question 1 would lose
  // their place for no reason.
  const safeIndex = Math.min(index, Math.max(0, questions.length - 1))

  const order = useMemo(() => {
    const map: Record<number, QuizOption[]> = {}
    all.forEach((q) => {
      const ids = orderIds[q.id]
      const byId = new Map(q.options.map((o) => [o.id, o]))
      const resolved = (ids ?? []).map((id) => byId.get(id)).filter((o): o is QuizOption => !!o)
      map[q.id] = resolved.length === q.options.length ? resolved : q.options
    })
    return map
  }, [all, orderIds])

  useEffect(() => {
    if (!unitId || !quiz) return
    writeSaved(unitId, quiz.version, {
      mode,
      answers,
      index: safeIndex,
      submitted,
      order: orderIds,
    })
  }, [unitId, quiz, mode, answers, safeIndex, submitted, orderIds])

  if (!unit || !quiz) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink mb-4">Self-assessment not found</h1>
        <Link to="/math-camp" className="text-green hover:text-green-hover transition-colors">
          Back to Math Camp
        </Link>
      </div>
    )
  }

  const total = questions.length
  const answeredCount = Object.values(answers).filter((a) => a.length > 0).length
  const score = questions.filter((q) => sameAnswer(answers[q.id], q.answer)).length

  const choose = (q: QuizQuestion, optionId: string) => {
    setAnswers((prev) => {
      if (q.type === 'multi') {
        const current = prev[q.id] ?? []
        const next = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId]
        return { ...prev, [q.id]: next }
      }
      return { ...prev, [q.id]: [optionId] }
    })
  }

  const restart = () => {
    setAnswers({})
    setIndex(0)
    setSubmitted(false)
    setOrderIds(freshOrder())
    setConfirmingReset(false)
  }

  const reset = () => {
    if (unitId && quiz) clearSaved(unitId, quiz.version)
    restart()
  }

  const switchMode = (next: Mode) => {
    if (next === mode) return
    setMode(next)
    restart()
  }

  const coreCount = (all ?? []).filter((q) => q.core).length
  const fullCount = (all ?? []).length
  // Units whose whole bank is the core have nothing to toggle between.
  const hasSubset = coreCount > 0 && coreCount < fullCount

  // ------------------------------------------------------------- results view
  if (submitted) {
    const bySection = [...new Set(questions.map((q) => q.section))].map((section) => {
      const inSection = questions.filter((q) => q.section === section)
      return {
        section,
        correct: inSection.filter((q) => sameAnswer(answers[q.id], q.answer)).length,
        total: inSection.length,
      }
    })

    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          to={`/math-camp/${unit.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Unit {unit.number}</span>
        </Link>

        <header className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
            Results
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-2">
            {score} out of {total}
          </h1>
          <p className="text-muted text-sm mb-4">
            {mode === 'core' ? 'Core set' : 'Full set'} &middot; Unit {unit.number}
          </p>
          <div className="h-2 w-full bg-line rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-green rounded-full transition-all duration-500"
              style={{ width: `${(score / total) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {bySection.map((s) => (
              <div key={s.section} className="bg-panel border border-line rounded-lg px-4 py-3">
                <p className="text-ink text-sm font-semibold">{s.section}</p>
                <p className="text-muted text-sm">
                  {s.correct} / {s.total}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green text-white rounded-lg font-semibold text-sm hover:bg-green-hover transition-colors shadow-sm"
          >
            <RotateCcw size={16} />
            Take it again
          </button>
        </header>

        <h2 className="text-lg font-bold text-ink mb-4">Review</h2>
        <ol className="space-y-4">
          {questions.map((q, i) => {
            const given = answers[q.id] ?? []
            const right = sameAnswer(given, q.answer)
            return (
              <li
                key={q.id}
                className={`border rounded-lg p-5 ${
                  right ? 'border-green/30 bg-green-soft/30' : 'border-line bg-panel'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full ${
                      right ? 'bg-green text-white' : 'bg-ink text-white'
                    }`}
                  >
                    {right ? <Check size={13} /> : <X size={13} />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-light mb-1">
                      Question {i + 1} &middot; {q.section} &middot; {TYPE_LABEL[q.type]}
                    </p>
                    <p className="text-ink font-medium leading-relaxed">{q.prompt}</p>
                  </div>
                </div>

                <ul className="space-y-1.5 mb-3 ml-8">
                  {order[q.id].map((option) => {
                    const isCorrect = q.answer.includes(option.id)
                    const wasChosen = given.includes(option.id)
                    return (
                      <li
                        key={option.id}
                        className={`text-sm leading-relaxed flex items-start gap-2 ${
                          isCorrect
                            ? 'text-ink font-medium'
                            : wasChosen
                              ? 'text-ink line-through decoration-muted-light'
                              : 'text-muted'
                        }`}
                      >
                        <span className="shrink-0 w-4 text-center">
                          {isCorrect ? '✓' : wasChosen ? '✗' : '·'}
                        </span>
                        <span>{option.text}</span>
                      </li>
                    )
                  })}
                </ul>

                <div className="ml-8 border-l-2 border-green/30 pl-4">
                  <p className="text-muted text-sm leading-relaxed">{q.explanation}</p>
                  <p className="text-muted-light text-xs mt-1.5">Slide: {q.slide}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }

  // -------------------------------------------------------------- taking view
  const q = questions[safeIndex]
  const given = answers[q.id] ?? []
  const isLast = safeIndex === total - 1

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
          Self-assessment
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-ink mb-2">{quiz.title}</h1>
        <p className="text-muted leading-relaxed">{quiz.intro}</p>
      </header>

      {hasSubset && (
        <div className="inline-flex p-1 bg-panel border border-line rounded-lg mb-6">
          {(
            [
              ['core', `Core ${coreCount}`],
              ['full', `Full ${fullCount}`],
            ] as [Mode, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              onClick={() => switchMode(value)}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                mode === value ? 'bg-green text-white' : 'text-muted hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-6 -mt-4">
        <p className="text-muted-light text-sm">
          {!hasSubset
            ? `${fullCount} questions covering the unit, drawn from its slides.`
            : mode === 'core'
              ? 'A short path through the unit: twenty questions, at least one from every section.'
              : 'Every question in the bank, covering the unit slide by slide.'}
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-muted-light text-xs">Progress is saved in this browser</span>
          {confirmingReset ? (
            <span className="inline-flex items-center gap-2 text-xs">
              <button
                onClick={reset}
                className="px-2.5 py-1 rounded bg-ink text-white font-medium hover:opacity-90 transition-opacity"
              >
                Erase answers
              </button>
              <button
                onClick={() => setConfirmingReset(false)}
                className="text-muted hover:text-ink transition-colors"
              >
                Cancel
              </button>
            </span>
          ) : (
            <button
              onClick={() => setConfirmingReset(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-green transition-colors"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-muted">
          Question {safeIndex + 1} of {total}
        </span>
        <span className="text-muted-light">{answeredCount} answered</span>
      </div>
      <div className="h-1.5 w-full bg-line rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-green rounded-full transition-all duration-300"
          style={{ width: `${((safeIndex + 1) / total) * 100}%` }}
        />
      </div>

      <div className="bg-panel border border-line rounded-lg p-6 mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-green mb-3">
          {q.section} &middot; {TYPE_LABEL[q.type]}
        </p>
        <p className="text-ink text-lg font-medium leading-relaxed mb-6">{q.prompt}</p>

        <ul className="space-y-2">
          {order[q.id].map((option) => {
            const selected = given.includes(option.id)
            return (
              <li key={option.id}>
                <button
                  onClick={() => choose(q, option.id)}
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-lg border transition-colors ${
                    selected
                      ? 'border-green bg-green-soft/60 text-ink'
                      : 'border-line bg-paper hover:border-green/40 text-muted hover:text-ink'
                  }`}
                >
                  <span
                    className={`shrink-0 mt-0.5 w-4 h-4 border-2 flex items-center justify-center ${
                      q.type === 'multi' ? 'rounded' : 'rounded-full'
                    } ${selected ? 'border-green bg-green' : 'border-muted-light'}`}
                  >
                    {selected && <Check size={11} className="text-white" strokeWidth={3} />}
                  </span>
                  <span className="text-sm leading-relaxed">{option.text}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setIndex(Math.max(0, safeIndex - 1))}
          disabled={safeIndex === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted hover:text-green transition-colors disabled:opacity-30 disabled:hover:text-muted"
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        {isLast ? (
          <button
            onClick={() => {
              setSubmitted(true)
              window.scrollTo(0, 0)
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-green text-white rounded-lg font-semibold text-sm hover:bg-green-hover transition-colors shadow-sm"
          >
            Submit ({answeredCount}/{total} answered)
          </button>
        ) : (
          <button
            onClick={() => setIndex(Math.min(total - 1, safeIndex + 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-green hover:text-green-hover transition-colors"
          >
            Next
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-light mb-3">Jump to</p>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((item, i) => {
            const done = (answers[item.id] ?? []).length > 0
            const here = i === safeIndex
            return (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`Question ${i + 1}${done ? ', answered' : ''}`}
                className={`w-8 h-8 rounded text-xs font-medium border transition-colors ${
                  here
                    ? 'border-green bg-green text-white'
                    : done
                      ? 'border-green/40 bg-green-soft text-green'
                      : 'border-line bg-paper text-muted-light hover:border-green/40'
                }`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
