import ToolCard from '../components/ToolCard'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { tools } from '../content'

export default function Tools() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">{tools.page.title}</h1>
        <p className="text-xl text-slate-light">{tools.page.subtitle}</p>
      </header>

      <p className="text-slate mb-8">{tools.page.description}</p>

      <hr className="border-border mb-8" />

      {/* Research Tools */}
      <SectionHeader>{tools.sections.research.title}</SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.tools.research.map((tool) => (
          <ToolCard
            key={tool.id}
            title={tool.title}
            description={tool.description}
            tags={tool.tags}
            status={tool.status as 'live' | 'coming'}
            featured={tool.featured}
            launchUrl={tool.launchUrl}
            githubUrl={tool.githubUrl}
          >
            {tool.features && (
              <div className="text-sm text-slate-light mb-4">
                <p className="font-medium text-slate mb-2">Features:</p>
                <ul className="list-disc list-inside space-y-1">
                  {tool.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </ToolCard>
        ))}
      </div>

      <hr className="border-border mb-8" />

      {/* Teaching Tools */}
      <SectionHeader>{tools.sections.teaching.title}</SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.tools.teaching.map((tool) => (
          <ToolCard
            key={tool.id}
            title={tool.title}
            description={tool.description}
            tags={tool.tags}
            status={tool.status as 'live' | 'coming'}
            featured={tool.featured}
            launchUrl={tool.launchUrl}
            githubUrl={tool.githubUrl}
          >
            {tool.features && (
              <div className="text-sm text-slate-light mb-4">
                <p className="font-medium text-slate mb-2">Features:</p>
                <ul className="list-disc list-inside space-y-1">
                  {tool.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </ToolCard>
        ))}
      </div>

      <hr className="border-border mb-8" />

      {/* Suggest a Tool */}
      <div className="bg-bg-light border border-dashed border-border rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-navy mb-3">{tools.sections.suggest.title}</h3>
        <p className="text-slate-light mb-6">{tools.sections.suggest.description}</p>
        <Button href={tools.sections.suggest.buttonUrl} variant="outline-secondary">
          {tools.sections.suggest.buttonLabel}
        </Button>
      </div>
    </div>
  )
}
