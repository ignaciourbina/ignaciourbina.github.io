import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { research, site } from '../content'

export default function Research() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">{research.page.title}</h1>
        <p className="text-xl text-slate-light">{research.page.subtitle}</p>
      </header>

      <p className="text-slate mb-8">{research.page.description}</p>

      <hr className="border-border mb-8" />

      {/* Featured Briefs */}
      <SectionHeader>{research.sections.featured.title}</SectionHeader>

      <div className="grid gap-6 mb-12">
        <div className="bg-bg-card border border-dashed border-border rounded-lg p-6 opacity-75">
          <h3 className="text-xl font-semibold text-navy mb-3">
            {research.sections.featured.placeholder.title}
          </h3>
          <p className="text-slate-light mb-4">
            {research.sections.featured.placeholder.description}
          </p>
          <ul className="list-disc list-inside text-slate-light space-y-2 mb-4">
            {research.sections.featured.placeholder.features.map((feature, index) => (
              <li key={index}>
                <strong className="text-slate">{feature.title}</strong> — {feature.description}
              </li>
            ))}
          </ul>
          <span className="text-sm text-slate-light">
            {research.sections.featured.placeholder.meta}
          </span>
        </div>
      </div>

      <hr className="border-border mb-8" />

      {/* What Are Research Briefs */}
      <SectionHeader>{research.sections.whatAreBriefs.title}</SectionHeader>

      <p className="text-slate mb-4">{research.sections.whatAreBriefs.intro}</p>

      <ul className="list-disc list-inside text-slate-light space-y-2 mb-8">
        {research.sections.whatAreBriefs.features.map((feature, index) => (
          <li key={index}>
            <strong className="text-slate">{feature.title}</strong> {feature.description}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-navy mb-4">
        {research.sections.whatAreBriefs.structure.title}
      </h3>
      <p className="text-slate mb-4">{research.sections.whatAreBriefs.structure.intro}</p>
      <ol className="list-decimal list-inside text-slate-light space-y-2 mb-8">
        {research.sections.whatAreBriefs.structure.steps.map((step, index) => (
          <li key={index}>
            <strong className="text-slate">{step.title}</strong> — {step.description}
          </li>
        ))}
      </ol>

      <hr className="border-border mb-8" />

      {/* Topics */}
      <SectionHeader>{research.sections.topics.title}</SectionHeader>

      <ul className="space-y-3 mb-12">
        {research.sections.topics.items.map((topic, index) => (
          <li
            key={index}
            className={`py-3 ${index < research.sections.topics.items.length - 1 ? 'border-b border-border' : ''}`}
          >
            <strong className="text-slate">{topic.title}</strong>
            <span className="text-slate-light"> — {topic.description}</span>
          </li>
        ))}
      </ul>

      <hr className="border-border mb-8" />

      {/* Subscribe */}
      <div className="bg-bg-light border border-dashed border-border rounded-lg p-8 text-center mb-8">
        <h3 className="text-xl font-semibold text-navy mb-3">
          {research.sections.subscribe.title}
        </h3>
        <p className="text-slate-light mb-4">{research.sections.subscribe.description}</p>
        <p className="text-sm text-slate-light italic">
          {research.sections.subscribe.note.split('GitHub')[0]}
          <a
            href={site.social.github.url}
            className="text-accent hover:text-accent-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {research.sections.subscribe.note.split('GitHub')[1]}
        </p>
      </div>

      <hr className="border-border mb-8" />

      {/* Suggest a Topic */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-navy mb-3">{research.sections.suggest.title}</h3>
        <p className="text-slate-light mb-6">{research.sections.suggest.description}</p>
        <Button href={research.sections.suggest.buttonUrl} variant="outline-secondary">
          {research.sections.suggest.buttonLabel}
        </Button>
      </div>
    </div>
  )
}
