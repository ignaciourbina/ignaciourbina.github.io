import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'

export default function Teaching() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">Teaching</h1>
        <p className="text-xl text-slate-light">
          Resources, demos, and materials for quantitative methods
        </p>
      </header>

      <p className="text-slate mb-8">
        Interactive teaching resources for quantitative methods courses. These materials are
        designed to help students build intuition for statistical concepts through hands-on
        exploration.
      </p>

      <hr className="border-border mb-8" />

      {/* Interactive Demos */}
      <SectionHeader>Interactive Demos</SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-bg-card border border-dashed border-border rounded-lg p-6 opacity-75">
          <h3 className="text-lg font-semibold text-navy mb-2">📊 Sampling Distributions</h3>
          <p className="text-sm text-slate-light italic mb-3">Coming Soon</p>
          <p className="text-slate-light text-sm mb-4">
            Visualize how sampling distributions emerge from repeated sampling. Adjust sample size
            and population parameters to see the central limit theorem in action.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['Statistics 101', 'Interactive', 'Visualization'].map((tag) => (
              <span key={tag} className="bg-bg-light text-slate text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-bg-card border border-dashed border-border rounded-lg p-6 opacity-75">
          <h3 className="text-lg font-semibold text-navy mb-2">🎯 Hypothesis Testing</h3>
          <p className="text-sm text-slate-light italic mb-3">Coming Soon</p>
          <p className="text-slate-light text-sm mb-4">
            Interactive demonstration of hypothesis testing concepts. See how p-values, effect
            sizes, and sample sizes interact.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['Inference', 'Interactive', 'Visualization'].map((tag) => (
              <span key={tag} className="bg-bg-light text-slate text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-bg-card border border-dashed border-border rounded-lg p-6 opacity-75">
          <h3 className="text-lg font-semibold text-navy mb-2">📈 Regression Intuition</h3>
          <p className="text-sm text-slate-light italic mb-3">Coming Soon</p>
          <p className="text-slate-light text-sm mb-4">
            Build intuition for linear regression by manipulating data points and seeing how the
            regression line responds.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['Regression', 'Interactive', 'Visualization'].map((tag) => (
              <span key={tag} className="bg-bg-light text-slate text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-border mb-8" />

      {/* Course Materials */}
      <SectionHeader>Course Materials</SectionHeader>

      <h3 className="text-lg font-semibold text-navy mb-4">Quantitative Methods</h3>
      <ul className="space-y-3 mb-12">
        <li className="py-3 border-b border-border text-slate-light">
          <strong className="text-slate">Syllabus</strong> — Course overview and schedule{' '}
          <span className="italic">(coming soon)</span>
        </li>
        <li className="py-3 border-b border-border text-slate-light">
          <strong className="text-slate">Lecture Slides</strong> — Presentation materials{' '}
          <span className="italic">(coming soon)</span>
        </li>
        <li className="py-3 border-b border-border text-slate-light">
          <strong className="text-slate">Problem Sets</strong> — Practice exercises with solutions{' '}
          <span className="italic">(coming soon)</span>
        </li>
        <li className="py-3 text-slate-light">
          <strong className="text-slate">Code Examples</strong> — R and Python code for common analyses{' '}
          <span className="italic">(coming soon)</span>
        </li>
      </ul>

      <hr className="border-border mb-8" />

      {/* Tools for Teaching */}
      <SectionHeader>Tools for Teaching</SectionHeader>

      <div className="bg-gradient-to-br from-navy to-navy/90 text-white rounded-lg p-8 mb-12">
        <h3 className="text-xl font-semibold mb-3">📋 QuizView</h3>
        <p className="opacity-90 mb-6">
          Preview and validate Brightspace quiz CSV files before uploading them to your LMS. Great
          for catching errors before students see them.
        </p>
        <a
          href="https://ignaciourbina.github.io/quizview/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-white text-navy rounded font-medium hover:bg-bg-light transition-colors"
        >
          Launch QuizView →
        </a>
      </div>

      <hr className="border-border mb-8" />

      {/* Resources */}
      <SectionHeader>Resources</SectionHeader>

      <h3 className="text-lg font-semibold text-navy mb-4">Recommended Books</h3>
      <ul className="space-y-3 mb-8">
        <li className="py-3 border-b border-border text-slate-light">
          <strong className="text-slate">Causal Inference</strong> — <em>The Effect</em> by Nick
          Huntington-Klein (free online)
        </li>
        <li className="py-3 border-b border-border text-slate-light">
          <strong className="text-slate">Statistics</strong> — <em>OpenIntro Statistics</em> (free
          online)
        </li>
        <li className="py-3 border-b border-border text-slate-light">
          <strong className="text-slate">R Programming</strong> — <em>R for Data Science</em> by
          Wickham & Grolemund (free online)
        </li>
        <li className="py-3 text-slate-light">
          <strong className="text-slate">Regression</strong> — <em>Regression and Other Stories</em>{' '}
          by Gelman, Hill & Vehtari
        </li>
      </ul>

      <h3 className="text-lg font-semibold text-navy mb-4">Online Resources</h3>
      <ul className="space-y-3 mb-12">
        <li className="py-3 border-b border-border">
          <a
            href="https://seeing-theory.brown.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light"
          >
            Seeing Theory
          </a>
          <span className="text-slate-light"> — Visual introduction to probability and statistics</span>
        </li>
        <li className="py-3 border-b border-border">
          <a
            href="https://distill.pub/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light"
          >
            Distill.pub
          </a>
          <span className="text-slate-light"> — Clear explanations of machine learning concepts</span>
        </li>
        <li className="py-3 border-b border-border">
          <a
            href="https://egap.org/methods-guides/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light"
          >
            EGAP Methods Guides
          </a>
          <span className="text-slate-light"> — Research design guides</span>
        </li>
        <li className="py-3">
          <a
            href="https://www.andrewheiss.com/teaching/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light"
          >
            Andrew Heiss's Course Materials
          </a>
          <span className="text-slate-light"> — Excellent open course materials</span>
        </li>
      </ul>

      <hr className="border-border mb-8" />

      {/* Request Materials */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-navy mb-3">Request Materials</h3>
        <p className="text-slate-light mb-6">
          Looking for specific teaching resources? Let me know what would be helpful.
        </p>
        <Button href="https://github.com/ignaciourbina/ignaciourbina.github.io/issues" variant="outline-secondary">
          Request Materials →
        </Button>
      </div>
    </div>
  )
}
