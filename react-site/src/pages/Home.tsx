import { Link } from 'react-router-dom'
import ToolCard from '../components/ToolCard'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy/90 text-white py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm Ignacio 👋
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            I'm a political economist studying how <strong>democracies can govern AI</strong>. I build{' '}
            <strong>interactive tools</strong> for research and teaching, combining experimental methods
            with computational modeling.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button to="/tools" variant="primary" size="lg">
              View Tools
            </Button>
            <Button to="/research" variant="outline" size="lg">
              Research Briefs
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-6xl mx-auto px-4">
        <SectionHeader>Featured Tools</SectionHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            title="🔀 CausalFlow"
            description="Interactive visual tool for specifying longitudinal causal models and exporting them to lavaan syntax for SEM analysis in R."
            tags={['Causal Inference', 'SEM', 'R/lavaan', 'Interactive']}
            status="live"
            featured
            launchUrl="https://ignaciourbina.github.io/causal-flow/"
          />
          
          <ToolCard
            title="📋 QuizView"
            description="A Next.js web app that lets you preview and visualize Brightspace quiz CSV files before uploading them."
            tags={['Teaching', 'LMS', 'Next.js', 'Data Preview']}
            status="live"
            featured
            launchUrl="https://ignaciourbina.github.io/quizview/"
          />
          
          <ToolCard
            title="📊 More Coming Soon"
            description="Power calculators, Bayesian visualization tools, and interactive research demos are on the way."
            tags={['Statistics', 'Visualization', 'Research']}
            status="coming"
          >
            <Link
              to="/tools"
              className="text-accent font-medium hover:text-accent-light transition-colors"
            >
              View All Tools →
            </Link>
          </ToolCard>
        </div>
      </section>

      {/* Latest Research Briefs */}
      <section className="max-w-6xl mx-auto px-4">
        <SectionHeader>Latest Research Briefs</SectionHeader>
        
        <p className="text-slate-light mb-6">
          Interactive summaries of research findings with embedded visualizations and key insights.
        </p>
        
        <div className="bg-bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-slate-light italic mb-6">
            Research briefs section coming soon — interactive summaries with embedded charts,
            methodology notes, and replication materials.
          </p>
          <Button to="/research" variant="outline-secondary">
            Browse Research →
          </Button>
        </div>
      </section>

      {/* About Me Preview */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <SectionHeader>About Me</SectionHeader>
        
        <p className="text-slate-light mb-6 max-w-3xl">
          I am a Ph.D. Candidate in Political Science at Stony Brook University, studying how
          democracies can govern artificial intelligence. My dissertation, "Three Essays on the
          Political Implications of AI," examines how citizens form preferences about emerging
          technologies.
        </p>
        
        <p className="text-slate mb-4">My work spans:</p>
        <ul className="list-disc list-inside text-slate-light space-y-2 mb-6">
          <li><strong className="text-slate">AI and democratic governance</strong> — public attitudes and policy preferences</li>
          <li><strong className="text-slate">Behavioral experiments</strong> — with ~$11,000 in competitive research grants</li>
          <li><strong className="text-slate">Teaching technology</strong> — 20+ interactive tools for quantitative methods</li>
        </ul>
        
        <Link
          to="/about"
          className="text-accent font-medium hover:text-accent-light transition-colors"
        >
          More About Me →
        </Link>
      </section>
    </div>
  )
}
