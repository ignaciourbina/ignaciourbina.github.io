import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'

export default function Research() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">Research</h1>
        <p className="text-xl text-slate-light">
          Interactive briefs with findings and insights
        </p>
      </header>

      <p className="text-slate mb-8">
        Interactive summaries of research projects with embedded visualizations, key findings, and
        methodology notes. Each brief is designed to communicate core insights while providing
        access to full details for those who want to dig deeper.
      </p>

      <hr className="border-border mb-8" />

      {/* Featured Briefs */}
      <SectionHeader>Featured Briefs</SectionHeader>

      <div className="grid gap-6 mb-12">
        <div className="bg-bg-card border border-dashed border-border rounded-lg p-6 opacity-75">
          <h3 className="text-xl font-semibold text-navy mb-3">
            📊 Coming Soon: Research Brief Template
          </h3>
          <p className="text-slate-light mb-4">
            This section will feature interactive research briefs with:
          </p>
          <ul className="list-disc list-inside text-slate-light space-y-2 mb-4">
            <li><strong className="text-slate">Key Findings</strong> — The main takeaways, visualized</li>
            <li><strong className="text-slate">Interactive Charts</strong> — Explore the data yourself</li>
            <li><strong className="text-slate">Methodology</strong> — Collapsible technical details</li>
            <li><strong className="text-slate">Replication</strong> — Links to code and data</li>
          </ul>
          <span className="text-sm text-slate-light">Template · Coming Soon</span>
        </div>
      </div>

      <hr className="border-border mb-8" />

      {/* What Are Research Briefs */}
      <SectionHeader>What Are Research Briefs?</SectionHeader>

      <p className="text-slate mb-4">
        Research briefs are short, accessible summaries of academic research designed for broader
        audiences. Unlike full academic papers, briefs:
      </p>

      <ul className="list-disc list-inside text-slate-light space-y-2 mb-8">
        <li><strong className="text-slate">Focus on insights</strong> rather than exhaustive literature review</li>
        <li><strong className="text-slate">Use visualization</strong> to communicate findings</li>
        <li><strong className="text-slate">Include interactivity</strong> so readers can explore data</li>
        <li><strong className="text-slate">Provide context</strong> without requiring specialized knowledge</li>
      </ul>

      <h3 className="text-lg font-semibold text-navy mb-4">Example Structure</h3>
      <p className="text-slate mb-4">Each brief follows a consistent format:</p>
      <ol className="list-decimal list-inside text-slate-light space-y-2 mb-8">
        <li><strong className="text-slate">TL;DR</strong> — One-paragraph summary</li>
        <li><strong className="text-slate">Key Findings</strong> — 3-5 main takeaways with supporting visuals</li>
        <li><strong className="text-slate">Background</strong> — Why this question matters</li>
        <li><strong className="text-slate">Methods</strong> — Collapsible section with technical details</li>
        <li><strong className="text-slate">Implications</strong> — What this means for practice/policy</li>
        <li><strong className="text-slate">Resources</strong> — Links to paper, code, data</li>
      </ol>

      <hr className="border-border mb-8" />

      {/* Topics */}
      <SectionHeader>Topics I Cover</SectionHeader>

      <ul className="space-y-3 mb-12">
        <li className="py-3 border-b border-border">
          <strong className="text-slate">Causal Inference</strong>
          <span className="text-slate-light"> — Methods for identifying causal effects in observational data</span>
        </li>
        <li className="py-3 border-b border-border">
          <strong className="text-slate">Survey Methodology</strong>
          <span className="text-slate-light"> — Measurement, sampling, and response quality</span>
        </li>
        <li className="py-3 border-b border-border">
          <strong className="text-slate">Quantitative Methods</strong>
          <span className="text-slate-light"> — Statistical approaches for social science research</span>
        </li>
        <li className="py-3">
          <strong className="text-slate">Research Technology</strong>
          <span className="text-slate-light"> — Tools and workflows for modern research</span>
        </li>
      </ul>

      <hr className="border-border mb-8" />

      {/* Subscribe */}
      <div className="bg-bg-light border border-dashed border-border rounded-lg p-8 text-center mb-8">
        <h3 className="text-xl font-semibold text-navy mb-3">Subscribe for Updates</h3>
        <p className="text-slate-light mb-4">Get notified when new research briefs are published.</p>
        <p className="text-sm text-slate-light italic">
          Email subscription coming soon. For now, follow me on{' '}
          <a
            href="https://github.com/ignaciourbina"
            className="text-accent hover:text-accent-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{' '}
          or check back periodically.
        </p>
      </div>

      <hr className="border-border mb-8" />

      {/* Suggest a Topic */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-navy mb-3">Suggest a Topic</h3>
        <p className="text-slate-light mb-6">
          Is there a research topic or methodological question you'd like to see covered? Let me know!
        </p>
        <Button href="https://github.com/ignaciourbina/ignaciourbina.github.io/issues" variant="outline-secondary">
          Suggest a Topic →
        </Button>
      </div>
    </div>
  )
}
