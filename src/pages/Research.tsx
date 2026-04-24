import SectionHeader from '../components/SectionHeader'
import { research } from '../content'

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}

export default function Research() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          Projects & papers
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-3">{research.page.title}</h1>
        <p className="text-lg text-muted max-w-2xl">{research.page.subtitle}</p>
      </header>

      {/* Dissertation */}
      <SectionHeader kicker="Dissertation">{research.dissertation.title}</SectionHeader>
      <p className="text-muted text-sm mb-8">{research.dissertation.committee}</p>

      <div className="space-y-6 mb-16">
        {research.dissertation.papers.map((paper, index) => (
          <div
            key={index}
            className="bg-panel border border-line rounded-lg p-6 hover:border-green/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-ink font-semibold leading-snug">
                <span
                  className="text-muted font-normal"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(paper.authors) + '. ' }}
                />
                <em>{paper.title}</em>
              </h3>
              {paper.note && (
                <span className="text-xs font-bold text-green bg-green-soft px-2.5 py-1 rounded-full shrink-0">
                  {paper.note}
                </span>
              )}
            </div>
            <p className="text-muted text-sm leading-relaxed">{paper.description}</p>
            {'pdfUrl' in paper && paper.pdfUrl && (
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-green hover:text-green-hover transition-colors"
              >
                Download Paper (PDF)
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Published */}
      <SectionHeader kicker="Peer-reviewed">{research.published.title}</SectionHeader>

      <ul className="space-y-4 mb-16">
        {research.published.papers.map((paper, index) => (
          <li key={index} className="py-3">
            <p
              className="text-muted leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(paper.citation) }}
            />
          </li>
        ))}
      </ul>

      {/* Working Papers */}
      <SectionHeader kicker="Under review">{research.working.title}</SectionHeader>
      <p className="text-muted-light text-sm mb-8 italic">{research.working.note}</p>

      <div className="space-y-6 mb-16">
        {research.working.papers.map((paper, index) => (
          <div
            key={index}
            className="border-l-[3px] border-line pl-5 hover:border-green transition-colors"
          >
            <h3 className="text-ink font-semibold leading-snug mb-1">
              <span
                className="text-muted font-normal"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(paper.authors) + '. ' }}
              />
              <em>{paper.title}</em>
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-1">{paper.description}</p>
            {paper.presentations && (
              <p className="text-muted-light text-xs">{paper.presentations}</p>
            )}
          </div>
        ))}
      </div>

      {/* Work in Progress */}
      <SectionHeader kicker="Ongoing">{research.inProgress.title}</SectionHeader>

      <div className="space-y-5">
        {research.inProgress.papers.map((paper, index) => (
          <div
            key={index}
            className="border-l-[3px] border-line pl-5 hover:border-green transition-colors"
          >
            <h3 className="text-ink font-semibold leading-snug mb-1">
              <span
                className="text-muted font-normal"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(paper.authors) + '. ' }}
              />
              <em>{paper.title}</em>
            </h3>
            <p className="text-muted text-sm leading-relaxed">{paper.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
