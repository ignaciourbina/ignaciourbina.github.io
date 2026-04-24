import ToolCard from '../components/ToolCard'
import Button from '../components/Button'
import { home, tools } from '../content'
import { Link } from 'react-router-dom'

export default function Home() {
  const featuredTools = tools.tools.featured

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <span className="text-xs font-bold uppercase tracking-widest text-green mb-4 block">
            Political economist
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-ink leading-[0.98] mb-6 max-w-3xl">
            {home.hero.greeting.replace(' 👋', '')}
          </h1>
          <p
            className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: home.hero.introduction.replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="text-ink font-semibold">$1</strong>'
              ),
            }}
          />
          <div className="flex flex-wrap gap-4">
            <Button to={home.hero.buttons.primary.to} variant="primary" size="lg">
              {home.hero.buttons.primary.label}
            </Button>
            <Button to={home.hero.buttons.secondary.to} variant="outline" size="lg">
              About Me
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-5xl mx-auto px-6 pb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          Open-source
        </span>
        <h2 className="text-ink text-2xl font-bold mb-8">Featured Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              tags={tool.tags}
              featured={tool.featured}
              launchUrl={tool.launchUrl}
            />
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="max-w-5xl mx-auto px-6 py-16 mb-8">
        <div className="border-t border-line pt-16">
          <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
            Background
          </span>
          <h2 className="text-ink text-2xl font-bold mb-6">{home.sections.aboutPreview.title}</h2>

          <p className="text-muted mb-6 max-w-3xl leading-relaxed">
            {home.sections.aboutPreview.description}
          </p>

          <p className="text-ink font-medium mb-3">{home.sections.aboutPreview.workSpans.intro}</p>
          <ul className="space-y-2 mb-8">
            {home.sections.aboutPreview.workSpans.items.map((item, index) => (
              <li key={index} className="text-muted flex items-start gap-2">
                <span className="text-green mt-1.5 text-xs">&#9679;</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-ink font-semibold">$1</strong>'
                    ),
                  }}
                />
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            className="text-green font-semibold hover:text-green-hover transition-colors text-sm"
          >
            {home.sections.aboutPreview.linkLabel}
          </Link>
        </div>
      </section>
    </div>
  )
}
