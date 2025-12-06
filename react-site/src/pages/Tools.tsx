import ToolCard from '../components/ToolCard'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'

export default function Tools() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">Tools</h1>
        <p className="text-xl text-slate-light">
          Interactive applications for research and teaching
        </p>
      </header>

      <p className="text-slate mb-8">
        A collection of open-source tools I've built to support research methodology and teaching.
        All tools are free to use and hosted on GitHub.
      </p>

      <hr className="border-border mb-8" />

      {/* Research Tools */}
      <SectionHeader>Research Tools</SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ToolCard
          title="🔀 CausalFlow"
          description="An interactive visual tool for specifying longitudinal causal models and exporting them to lavaan syntax for Structural Equation Modeling (SEM) analysis in R."
          tags={['Causal Inference', 'SEM', 'R/lavaan', 'Panel Data', 'Interactive']}
          status="live"
          featured
          launchUrl="https://ignaciourbina.github.io/causal-flow/"
          githubUrl="https://github.com/ignaciourbina/causal-flow"
        >
          <div className="text-sm text-slate-light mb-4">
            <p className="font-medium text-slate mb-2">Features:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Drag-and-drop interface for building path diagrams</li>
              <li>Support for cross-lagged panel models</li>
              <li>Automatic lavaan syntax generation</li>
              <li>Export to R script</li>
            </ul>
          </div>
        </ToolCard>

        <ToolCard
          title="📈 Power Calculator"
          description="Interactive power analysis for common research designs. Calculate sample sizes, visualize power curves, and understand the relationship between effect size, sample size, and statistical power."
          tags={['Statistics', 'Power Analysis', 'Sample Size', 'Interactive']}
          status="coming"
        />

        <ToolCard
          title="🎲 Bayes Viz"
          description="Visualize Bayesian inference concepts interactively. See how priors, likelihoods, and posteriors interact in real-time."
          tags={['Bayesian', 'Visualization', 'Teaching', 'Interactive']}
          status="coming"
        />
      </div>

      <hr className="border-border mb-8" />

      {/* Teaching Tools */}
      <SectionHeader>Teaching Tools</SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ToolCard
          title="📋 QuizView"
          description="A Next.js web app that lets you preview and visualize Brightspace quiz CSV files before uploading them to your LMS."
          tags={['Teaching', 'LMS', 'Brightspace', 'Next.js', 'CSV']}
          status="live"
          featured
          launchUrl="https://ignaciourbina.github.io/quizview/"
          githubUrl="https://github.com/ignaciourbina/quizview"
        >
          <div className="text-sm text-slate-light mb-4">
            <p className="font-medium text-slate mb-2">Features:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Drag-and-drop CSV upload</li>
              <li>Visual preview of questions and answers</li>
              <li>Validation before upload</li>
              <li>Support for multiple question types</li>
            </ul>
          </div>
        </ToolCard>

        <ToolCard
          title="📊 Stats Demos"
          description="Interactive demonstrations for teaching statistical concepts. Includes sampling distributions, hypothesis testing, and regression visualization."
          tags={['Teaching', 'Statistics', 'Interactive', 'Visualization']}
          status="coming"
        />
      </div>

      <hr className="border-border mb-8" />

      {/* Suggest a Tool */}
      <div className="bg-bg-light border border-dashed border-border rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-navy mb-3">Suggest a Tool</h3>
        <p className="text-slate-light mb-6">
          Have an idea for a research or teaching tool? I'm always looking for new projects that
          can help researchers and students.
        </p>
        <Button href="https://github.com/ignaciourbina/ignaciourbina.github.io/issues" variant="outline-secondary">
          Open an Issue on GitHub
        </Button>
      </div>
    </div>
  )
}
