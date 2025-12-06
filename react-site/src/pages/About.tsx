import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'

const socialLinks = [
  { href: 'https://github.com/ignaciourbina', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ignaciourbinah?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:ignacio.urbina@stonybrook.edu', icon: Mail, label: 'Email' },
  { href: '/files/cv.pdf', icon: FileText, label: 'CV' },
]

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header with profile */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-navy to-accent flex items-center justify-center text-white text-6xl font-bold shrink-0">
          IU
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">About</h1>
          <p className="text-xl text-slate-light mb-6">Researcher · Tool Builder · Educator</p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-lg hover:border-accent hover:text-accent transition-colors"
              >
                <link.icon size={18} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* About Me */}
      <SectionHeader>About Me</SectionHeader>
      <p className="text-slate mb-6">
        I am a political economist studying how democracies can govern artificial intelligence.
        My research combines experimental methods with computational modeling to understand how
        citizens form preferences about emerging technologies and what this means for democratic governance.
      </p>
      <p className="text-slate mb-4">My research interests include:</p>
      <ul className="list-disc list-inside text-slate-light space-y-2 mb-8">
        <li><strong className="text-slate">AI and democratic governance</strong> — How citizens form attitudes toward AI and how democracies can govern emerging technologies</li>
        <li><strong className="text-slate">Political behavior</strong> — Automation risk, policy preferences, and public opinion</li>
        <li><strong className="text-slate">Computational social science</strong> — Agent-based modeling, behavioral experiments, and causal inference</li>
        <li><strong className="text-slate">Latin American politics</strong> — State violence, political trust, and democratic attitudes</li>
      </ul>

      {/* What I Build */}
      <SectionHeader>What I Build</SectionHeader>
      <p className="text-slate mb-4">
        I create interactive tools that help researchers and students build intuition for
        quantitative methods. My teaching philosophy centers on helping students who did not
        expect to succeed at quantitative methods discover that they can.
      </p>
      <ul className="list-disc list-inside text-slate-light space-y-2 mb-6">
        <li><strong className="text-slate">20+ interactive learning tools</strong> built with JavaScript to help students visualize statistical concepts</li>
        <li><strong className="text-slate">Behavioral experiment platforms</strong> using oTree for research</li>
        <li><strong className="text-slate">Causal modeling tools</strong> for specifying and exporting SEM models</li>
        <li><strong className="text-slate">Teaching resources</strong> for quantitative methods courses</li>
      </ul>
      <p className="text-slate-light mb-8">All my tools are open-source and freely available.</p>

      {/* Education */}
      <SectionHeader>Education</SectionHeader>
      <ul className="space-y-4 mb-8">
        <li className="py-3 border-b border-border">
          <p className="font-semibold text-slate">Ph.D. Candidate in Political Science</p>
          <p className="text-slate-light">Stony Brook University</p>
        </li>
        <li className="py-3 border-b border-border">
          <p className="font-semibold text-slate">M.S. in Economics</p>
          <p className="text-slate-light">Adolfo Ibáñez University</p>
        </li>
        <li className="py-3 border-b border-border">
          <p className="font-semibold text-slate">M.S. in Public Policy</p>
          <p className="text-slate-light">Adolfo Ibáñez University</p>
        </li>
        <li className="py-3">
          <p className="font-semibold text-slate">B.A. in Management Science</p>
          <p className="text-slate-light">Adolfo Ibáñez University</p>
        </li>
      </ul>

      {/* Selected Publications */}
      <SectionHeader>Selected Publications</SectionHeader>
      <ul className="space-y-4 mb-8">
        <li className="py-3 border-b border-border">
          <p className="text-slate">Smirnov, O., Hsieh, P-H., & <strong>Urbina, I.</strong> (2025). Finite pool of worry and emotions in climate change tweets during COVID-19. <em>Journal of Environmental Psychology</em>, 106, 102728.</p>
        </li>
        <li className="py-3 border-b border-border">
          <p className="text-slate"><strong>Urbina, I.</strong>, Araya, D., Vidigal, R., & Sharygina, A. Mind Under Pressure: Does Cognitive Overload Increase Susceptibility to Misinformation? <em>Politics and the Life Sciences</em> (In-Principle Accepted).</p>
        </li>
        <li className="py-3">
          <p className="text-slate"><strong>Urbina, I.</strong> The Conditional Activation Model: Uncovering Policy Demand Responses to AI-Driven Automation. <em>(Job Market Paper)</em></p>
        </li>
      </ul>

      {/* Skills & Tools */}
      <SectionHeader>Skills & Tools</SectionHeader>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h3 className="text-xs uppercase tracking-wide text-navy font-semibold mb-2">Languages</h3>
          <p className="text-slate-light text-sm">R · Python · JavaScript · SQL</p>
        </div>
        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h3 className="text-xs uppercase tracking-wide text-navy font-semibold mb-2">Frameworks</h3>
          <p className="text-slate-light text-sm">Next.js · React · Quarto · Shiny</p>
        </div>
        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h3 className="text-xs uppercase tracking-wide text-navy font-semibold mb-2">Methods</h3>
          <p className="text-slate-light text-sm">SEM · Causal Inference · Survey Design · Bayesian Analysis</p>
        </div>
        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h3 className="text-xs uppercase tracking-wide text-navy font-semibold mb-2">Tools</h3>
          <p className="text-slate-light text-sm">Git · Docker · LaTeX · Observable</p>
        </div>
      </div>

      {/* CV */}
      <SectionHeader>CV</SectionHeader>
      <p className="text-slate mb-6">Download my full curriculum vitae:</p>
      <Button href="/files/cv.pdf" variant="primary">
        Download CV (PDF)
      </Button>

      <hr className="border-border my-12" />

      {/* Contact */}
      <SectionHeader>Contact</SectionHeader>
      <p className="text-slate mb-6">
        The best way to reach me is by email. I'm also active on GitHub and open to collaboration
        on research tools.
      </p>
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <p className="mb-2">
          📧 <strong className="text-slate">Email:</strong>{' '}
          <a href="mailto:ignacio.urbina@stonybrook.edu" className="text-accent hover:text-accent-light">
            ignacio.urbina@stonybrook.edu
          </a>
        </p>
        <p className="mb-2">
          🐙 <strong className="text-slate">GitHub:</strong>{' '}
          <a
            href="https://github.com/ignaciourbina"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light"
          >
            @ignaciourbina
          </a>
        </p>
        <p>
          💼 <strong className="text-slate">LinkedIn:</strong>{' '}
          <a
            href="https://www.linkedin.com/in/ignaciourbinah?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light"
          >
            Ignacio Urbina
          </a>
        </p>
      </div>
    </div>
  )
}
