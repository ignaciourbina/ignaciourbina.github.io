import ToolCard from '../components/ToolCard'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { tools } from '../content'

export default function Tools() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          Open-source
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-3">{tools.page.title}</h1>
        <p className="text-lg text-muted max-w-2xl">{tools.page.description}</p>
      </header>

      {/* Research Tools */}
      <SectionHeader kicker="Research">{tools.sections.research.title}</SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {tools.tools.research.map((tool) => (
          <ToolCard
            key={tool.id}
            title={tool.title}
            description={tool.description}
            tags={tool.tags}
            featured={tool.featured}
            launchUrl={tool.launchUrl}
            githubUrl={tool.githubUrl}
          >
            {tool.features && (
              <div className="text-sm text-muted mb-4">
                <p className="font-semibold text-ink mb-2">Features</p>
                <ul className="space-y-1">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green mt-1 text-xs">&#9679;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ToolCard>
        ))}
      </div>

      {/* Teaching Tools */}
      <SectionHeader kicker="Teaching">{tools.sections.teaching.title}</SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {tools.tools.teaching.map((tool) => (
          <ToolCard
            key={tool.id}
            title={tool.title}
            description={tool.description}
            tags={tool.tags}
            featured={tool.featured}
            launchUrl={tool.launchUrl}
            githubUrl={tool.githubUrl}
          >
            {tool.features && (
              <div className="text-sm text-muted mb-4">
                <p className="font-semibold text-ink mb-2">Features</p>
                <ul className="space-y-1">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green mt-1 text-xs">&#9679;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ToolCard>
        ))}
      </div>

      {/* Suggest a Tool */}
      <div className="border border-line rounded-lg p-10 text-center">
        <h3 className="text-xl font-bold text-ink mb-3">{tools.sections.suggest.title}</h3>
        <p className="text-muted mb-6 max-w-lg mx-auto">{tools.sections.suggest.description}</p>
        <Button href={tools.sections.suggest.buttonUrl} variant="outline">
          {tools.sections.suggest.buttonLabel}
        </Button>
      </div>
    </div>
  )
}
