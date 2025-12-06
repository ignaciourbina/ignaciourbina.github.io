import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'

const socialLinks = [
  { href: 'https://github.com/ignaciourbina', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ignaciourbinah?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:your.email@example.com', icon: Mail, label: 'Email' },
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
        I'm a researcher focused on quantitative methods in social science. I develop open-source
        tools to make complex methodological concepts more accessible through interactive
        visualization.
      </p>
      <p className="text-slate mb-4">My research interests include:</p>
      <ul className="list-disc list-inside text-slate-light space-y-2 mb-8">
        <li><strong className="text-slate">Causal inference</strong> — Methods for identifying causal effects in observational data</li>
        <li><strong className="text-slate">Survey methodology</strong> — Measurement, sampling, and response quality</li>
        <li><strong className="text-slate">Computational methods</strong> — Tools and workflows for reproducible research</li>
        <li><strong className="text-slate">Science communication</strong> — Making research findings accessible to broader audiences</li>
      </ul>

      {/* What I Build */}
      <SectionHeader>What I Build</SectionHeader>
      <p className="text-slate mb-4">I create interactive tools that help researchers and students:</p>
      <ul className="list-disc list-inside text-slate-light space-y-2 mb-6">
        <li><strong className="text-slate">Visualize</strong> complex statistical concepts</li>
        <li><strong className="text-slate">Specify</strong> causal models and research designs</li>
        <li><strong className="text-slate">Validate</strong> data before analysis</li>
        <li><strong className="text-slate">Learn</strong> quantitative methods through exploration</li>
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
      <p className="text-slate-light italic mb-8">Publications will be listed here.</p>

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
          <a href="mailto:your.email@example.com" className="text-accent hover:text-accent-light">
            your.email@example.com
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
