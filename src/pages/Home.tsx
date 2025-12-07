import { Link } from 'react-router-dom'
import ToolCard from '../components/ToolCard'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { home, tools } from '../content'

export default function Home() {
  const featuredTools = tools.tools.featured

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy/90 text-white py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{home.hero.greeting}</h1>
          <p
            className="text-xl opacity-90 max-w-2xl mx-auto mb-8"
            dangerouslySetInnerHTML={{
              __html: home.hero.introduction.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
          <div className="flex flex-wrap gap-4 justify-center">
            <Button to={home.hero.buttons.primary.to} variant="primary" size="lg">
              {home.hero.buttons.primary.label}
            </Button>
            <Button to={home.hero.buttons.secondary.to} variant="outline" size="lg">
              {home.hero.buttons.secondary.label}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-6xl mx-auto px-4">
        <SectionHeader>{home.sections.featuredTools.title}</SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              tags={tool.tags}
              status={tool.status as 'live' | 'coming'}
              featured={tool.featured}
              launchUrl={tool.launchUrl}
            >
              {tool.linkTo && (
                <Link
                  to={tool.linkTo}
                  className="text-accent font-medium hover:text-accent-light transition-colors"
                >
                  {tool.linkLabel}
                </Link>
              )}
            </ToolCard>
          ))}
        </div>
      </section>

      {/* Latest Research Briefs */}
      <section className="max-w-6xl mx-auto px-4">
        <SectionHeader>{home.sections.researchBriefs.title}</SectionHeader>

        <p className="text-slate-light mb-6">{home.sections.researchBriefs.description}</p>

        <div className="bg-bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-slate-light italic mb-6">{home.sections.researchBriefs.placeholder}</p>
          <Button to="/research" variant="outline-secondary">
            {home.sections.researchBriefs.buttonLabel}
          </Button>
        </div>
      </section>

      {/* About Me Preview */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <SectionHeader>{home.sections.aboutPreview.title}</SectionHeader>

        <p className="text-slate-light mb-6 max-w-3xl">{home.sections.aboutPreview.description}</p>

        <p className="text-slate mb-4">{home.sections.aboutPreview.workSpans.intro}</p>
        <ul className="list-disc list-inside text-slate-light space-y-2 mb-6">
          {home.sections.aboutPreview.workSpans.items.map((item, index) => (
            <li
              key={index}
              dangerouslySetInnerHTML={{
                __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate">$1</strong>'),
              }}
            />
          ))}
        </ul>

        <Link
          to="/about"
          className="text-accent font-medium hover:text-accent-light transition-colors"
        >
          {home.sections.aboutPreview.linkLabel}
        </Link>
      </section>
    </div>
  )
}
