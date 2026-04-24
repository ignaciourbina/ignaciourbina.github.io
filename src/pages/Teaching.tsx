import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { teaching } from '../content'

export default function Teaching() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          Resources
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-3">{teaching.page.title}</h1>
        <p className="text-lg text-muted max-w-2xl">{teaching.page.description}</p>
      </header>

      {/* Curated Course Materials for Statistics */}
      <SectionHeader kicker="Repository">Curated Course Materials for Statistics</SectionHeader>

      <p className="text-muted mb-8 leading-relaxed">
        {teaching.sections.curatedMaterials.description}
      </p>

      <div className="bg-green-soft/50 border border-green/15 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-bold text-ink mb-2">Interactive Visualizations</h4>
        <p className="text-muted mb-4">
          A suite of interactive tools and visualizations is available online to bring statistical
          concepts to life.
        </p>
        <a
          href={teaching.sections.curatedMaterials.liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2.5 bg-green text-white rounded-lg font-semibold text-sm hover:bg-green-hover transition-colors shadow-sm"
        >
          {teaching.sections.curatedMaterials.liveDemoLabel}
        </a>
      </div>

      <h3 className="text-lg font-bold text-ink mb-4">Repository Contents</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {teaching.sections.curatedMaterials.contents.map((item) => (
          <div key={item.label} className="group relative">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-panel border border-line rounded-lg cursor-help hover:border-green/30 transition-colors">
              <span>{item.icon}</span>
              <span className="text-sm text-ink font-medium">{item.label}</span>
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-ink text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
              {item.description}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink"></div>
            </div>
          </div>
        ))}
      </div>

      <Button href={teaching.sections.curatedMaterials.repositoryUrl} variant="outline">
        {teaching.sections.curatedMaterials.repositoryLabel}
      </Button>

      {/* Tools for Teaching */}
      <SectionHeader kicker="Tools">Tools for Teaching</SectionHeader>

      <div className="bg-ink text-white rounded-lg p-8 mb-16">
        <h3 className="text-xl font-bold mb-3">
          {teaching.sections.toolsForTeaching.featured.title}
        </h3>
        <p className="text-white/80 mb-6 leading-relaxed">
          {teaching.sections.toolsForTeaching.featured.description}
        </p>
        <a
          href={teaching.sections.toolsForTeaching.featured.launchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-green text-white rounded-lg font-semibold hover:bg-green-hover transition-colors"
        >
          {teaching.sections.toolsForTeaching.featured.launchLabel}
        </a>
      </div>

      {/* Resources */}
      <SectionHeader kicker="References">{teaching.sections.resources.title}</SectionHeader>

      <h3 className="text-lg font-bold text-ink mb-4">{teaching.sections.resources.books.title}</h3>
      <ul className="space-y-0 mb-10">
        {teaching.sections.resources.books.items.map((book, index) => (
          <li
            key={index}
            className={`py-3 ${index < teaching.sections.resources.books.items.length - 1 ? 'border-b border-line' : ''} text-muted`}
          >
            <strong className="text-ink font-semibold">{book.topic}</strong> — <em>{book.title}</em>
            {book.author && ` by ${book.author}`}
            {book.note && <span className="text-green text-sm ml-1">({book.note})</span>}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold text-ink mb-4">
        {teaching.sections.resources.online.title}
      </h3>
      <ul className="space-y-0 mb-16">
        {teaching.sections.resources.online.items.map((resource, index) => (
          <li
            key={index}
            className={`py-3 ${index < teaching.sections.resources.online.items.length - 1 ? 'border-b border-line' : ''}`}
          >
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green font-medium hover:text-green-hover transition-colors"
            >
              {resource.title}
            </a>
            <span className="text-muted"> — {resource.description}</span>
          </li>
        ))}
      </ul>

      {/* Request Materials */}
      <div className="border border-line rounded-lg p-10 text-center">
        <h3 className="text-xl font-bold text-ink mb-3">{teaching.sections.request.title}</h3>
        <p className="text-muted mb-6 max-w-lg mx-auto">{teaching.sections.request.description}</p>
        <Button href={teaching.sections.request.buttonUrl} variant="outline">
          {teaching.sections.request.buttonLabel}
        </Button>
      </div>
    </div>
  )
}
