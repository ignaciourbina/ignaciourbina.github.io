import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { research } from '../content'

export default function Research() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          Briefs & insights
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-3">{research.page.title}</h1>
        <p className="text-lg text-muted max-w-2xl">{research.page.description}</p>
      </header>

      {/* What Are Research Briefs */}
      <SectionHeader kicker="Format">{research.sections.whatAreBriefs.title}</SectionHeader>

      <p className="text-muted mb-6 leading-relaxed">{research.sections.whatAreBriefs.intro}</p>

      <ul className="space-y-3 mb-10">
        {research.sections.whatAreBriefs.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-green mt-1 text-xs">&#9679;</span>
            <span className="text-muted">
              <strong className="text-ink font-semibold">{feature.title}</strong>{' '}
              {feature.description}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold text-ink mb-4">
        {research.sections.whatAreBriefs.structure.title}
      </h3>
      <p className="text-muted mb-4">{research.sections.whatAreBriefs.structure.intro}</p>
      <ol className="space-y-2 mb-12">
        {research.sections.whatAreBriefs.structure.steps.map((step, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-green-soft text-green text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span className="text-muted">
              <strong className="text-ink font-semibold">{step.title}</strong> — {step.description}
            </span>
          </li>
        ))}
      </ol>

      {/* Topics */}
      <SectionHeader kicker="Coverage">{research.sections.topics.title}</SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {research.sections.topics.items.map((topic, index) => (
          <div
            key={index}
            className="bg-panel border border-line rounded-lg p-5 hover:border-green/30 transition-colors"
          >
            <h4 className="text-ink font-semibold mb-1">{topic.title}</h4>
            <p className="text-muted text-sm">{topic.description}</p>
          </div>
        ))}
      </div>

      {/* Suggest a Topic */}
      <div className="border border-line rounded-lg p-10 text-center">
        <h3 className="text-xl font-bold text-ink mb-3">{research.sections.suggest.title}</h3>
        <p className="text-muted mb-6 max-w-lg mx-auto">{research.sections.suggest.description}</p>
        <Button href={research.sections.suggest.buttonUrl} variant="outline">
          {research.sections.suggest.buttonLabel}
        </Button>
      </div>
    </div>
  )
}
