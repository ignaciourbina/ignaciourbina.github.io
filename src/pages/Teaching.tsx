import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { teaching } from '../content'

export default function Teaching() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">{teaching.page.title}</h1>
        <p className="text-xl text-slate-light">{teaching.page.subtitle}</p>
      </header>

      <p className="text-slate mb-8">{teaching.page.description}</p>

      <hr className="border-border mb-8" />

      {/* Interactive Demos */}
      <SectionHeader>{teaching.sections.demos.title}</SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {teaching.sections.demos.items.map((demo) => (
          <div
            key={demo.id}
            className="bg-bg-card border border-dashed border-border rounded-lg p-6 opacity-75"
          >
            <h3 className="text-lg font-semibold text-navy mb-2">{demo.title}</h3>
            <p className="text-sm text-slate-light italic mb-3">Coming Soon</p>
            <p className="text-slate-light text-sm mb-4">{demo.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {demo.tags.map((tag) => (
                <span key={tag} className="bg-bg-light text-slate text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr className="border-border mb-8" />

      {/* Course Materials */}
      <SectionHeader>{teaching.sections.courseMaterials.title}</SectionHeader>

      <h3 className="text-lg font-semibold text-navy mb-4">
        {teaching.sections.courseMaterials.subtitle}
      </h3>
      <ul className="space-y-3 mb-12">
        {teaching.sections.courseMaterials.items.map((item, index) => (
          <li
            key={index}
            className={`py-3 ${index < teaching.sections.courseMaterials.items.length - 1 ? 'border-b border-border' : ''} text-slate-light`}
          >
            <strong className="text-slate">{item.title}</strong> — {item.description}{' '}
            {item.status === 'coming' && <span className="italic">(coming soon)</span>}
          </li>
        ))}
      </ul>

      <hr className="border-border mb-8" />

      {/* Curated Course Materials for Statistics */}
      <SectionHeader>{teaching.sections.curatedMaterials.title}</SectionHeader>

      <p className="text-slate mb-6">{teaching.sections.curatedMaterials.description}</p>

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-navy mb-2">🌐 Interactive Visualizations</h4>
        <p className="text-slate-light mb-4">
          A suite of interactive tools and visualizations is available online to bring statistical
          concepts to life.
        </p>
        <a
          href={teaching.sections.curatedMaterials.liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-accent text-white rounded font-medium hover:bg-accent-light transition-colors"
        >
          {teaching.sections.curatedMaterials.liveDemoLabel}
        </a>
      </div>

      <h3 className="text-lg font-semibold text-navy mb-4">Repository Contents</h3>
      <div className="flex flex-wrap gap-3 mb-6">
        {teaching.sections.curatedMaterials.contents.map((item) => (
          <div key={item.label} className="group relative">
            <div className="flex items-center gap-2 px-3 py-2 bg-bg-card border border-border rounded-lg cursor-help hover:border-accent transition-colors">
              <span>{item.icon}</span>
              <span className="text-sm text-slate">{item.label}</span>
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-navy text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
              {item.description}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy"></div>
            </div>
          </div>
        ))}
      </div>

      <Button href={teaching.sections.curatedMaterials.repositoryUrl} variant="outline-secondary">
        {teaching.sections.curatedMaterials.repositoryLabel}
      </Button>

      <hr className="border-border my-8" />

      {/* Tools for Teaching */}
      <SectionHeader>{teaching.sections.toolsForTeaching.title}</SectionHeader>

      <div className="bg-gradient-to-br from-navy to-navy/90 text-white rounded-lg p-8 mb-12">
        <h3 className="text-xl font-semibold mb-3">
          {teaching.sections.toolsForTeaching.featured.title}
        </h3>
        <p className="opacity-90 mb-6">{teaching.sections.toolsForTeaching.featured.description}</p>
        <a
          href={teaching.sections.toolsForTeaching.featured.launchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-white text-navy rounded font-medium hover:bg-bg-light transition-colors"
        >
          {teaching.sections.toolsForTeaching.featured.launchLabel}
        </a>
      </div>

      <hr className="border-border mb-8" />

      {/* Resources */}
      <SectionHeader>{teaching.sections.resources.title}</SectionHeader>

      <h3 className="text-lg font-semibold text-navy mb-4">
        {teaching.sections.resources.books.title}
      </h3>
      <ul className="space-y-3 mb-8">
        {teaching.sections.resources.books.items.map((book, index) => (
          <li
            key={index}
            className={`py-3 ${index < teaching.sections.resources.books.items.length - 1 ? 'border-b border-border' : ''} text-slate-light`}
          >
            <strong className="text-slate">{book.topic}</strong> — <em>{book.title}</em>
            {book.author && ` by ${book.author}`}
            {book.note && ` (${book.note})`}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-navy mb-4">
        {teaching.sections.resources.online.title}
      </h3>
      <ul className="space-y-3 mb-12">
        {teaching.sections.resources.online.items.map((resource, index) => (
          <li
            key={index}
            className={`py-3 ${index < teaching.sections.resources.online.items.length - 1 ? 'border-b border-border' : ''}`}
          >
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light"
            >
              {resource.title}
            </a>
            <span className="text-slate-light"> — {resource.description}</span>
          </li>
        ))}
      </ul>

      <hr className="border-border mb-8" />

      {/* Request Materials */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-navy mb-3">{teaching.sections.request.title}</h3>
        <p className="text-slate-light mb-6">{teaching.sections.request.description}</p>
        <Button href={teaching.sections.request.buttonUrl} variant="outline-secondary">
          {teaching.sections.request.buttonLabel}
        </Button>
      </div>
    </div>
  )
}
