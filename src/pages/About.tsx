import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { about, site } from '../content'

const socialLinks = [
  { href: site.social.github.url, icon: Github, label: site.social.github.label },
  { href: site.social.linkedin.url, icon: Linkedin, label: site.social.linkedin.label },
  { href: `mailto:${site.social.email.address}`, icon: Mail, label: site.social.email.label },
  { href: about.profile.cvUrl || '#', icon: FileText, label: 'CV' },
]

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header with profile */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-navy to-accent flex items-center justify-center text-white text-6xl font-bold shrink-0">
          {about.profile.initials}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">{about.page.title}</h1>
          <p className="text-xl text-slate-light mb-6">{about.page.subtitle}</p>
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
      <p className="text-slate mb-6">{about.bio.intro}</p>
      <p className="text-slate mb-4">{about.bio.researchInterests.title}</p>
      <ul className="list-disc list-inside text-slate-light space-y-2 mb-8">
        {about.bio.researchInterests.items.map((item, index) => (
          <li key={index}>
            <strong className="text-slate">{item.title}</strong> — {item.description}
          </li>
        ))}
      </ul>

      {/* What I Build */}
      <SectionHeader>{about.whatIBuild.title}</SectionHeader>
      <p className="text-slate mb-4">{about.whatIBuild.intro}</p>
      <ul className="list-disc list-inside text-slate-light space-y-2 mb-6">
        {about.whatIBuild.items.map((item, index) => (
          <li
            key={index}
            dangerouslySetInnerHTML={{
              __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate">$1</strong>'),
            }}
          />
        ))}
      </ul>
      <p className="text-slate-light mb-8">{about.whatIBuild.note}</p>

      {/* Education */}
      <SectionHeader>{about.education.title}</SectionHeader>
      <ul className="space-y-4 mb-8">
        {about.education.items.map((edu, index) => (
          <li
            key={index}
            className={`py-3 ${index < about.education.items.length - 1 ? 'border-b border-border' : ''}`}
          >
            <p className="font-semibold text-slate">{edu.degree}</p>
            <p className="text-slate-light">{edu.institution}</p>
          </li>
        ))}
      </ul>

      {/* Selected Publications */}
      <SectionHeader>{about.publications.title}</SectionHeader>
      <ul className="space-y-4 mb-8">
        {about.publications.items.map((pub, index) => (
          <li
            key={index}
            className={`py-3 ${index < about.publications.items.length - 1 ? 'border-b border-border' : ''}`}
          >
            <p
              className="text-slate"
              dangerouslySetInnerHTML={{
                __html: pub.citation
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>'),
              }}
            />
          </li>
        ))}
      </ul>

      {/* Skills & Tools */}
      <SectionHeader>{about.skills.title}</SectionHeader>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {about.skills.categories.map((category) => (
          <div key={category.name} className="bg-bg-card border border-border rounded-lg p-4">
            <h3 className="text-xs uppercase tracking-wide text-navy font-semibold mb-2">
              {category.name}
            </h3>
            <p className="text-slate-light text-sm">{category.items.join(' · ')}</p>
          </div>
        ))}
      </div>

      {/* CV */}
      <SectionHeader>CV</SectionHeader>
      <p className="text-slate mb-6">Download my full curriculum vitae:</p>
      <Button href={about.profile.cvUrl} variant="primary">
        Download CV (PDF)
      </Button>

      <hr className="border-border my-12" />

      {/* Contact */}
      <SectionHeader>{about.contact.title}</SectionHeader>
      <p className="text-slate mb-6">{about.contact.intro}</p>
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <p className="mb-2">
          📧 <strong className="text-slate">Email:</strong>{' '}
          <a href={`mailto:${about.contact.email}`} className="text-accent hover:text-accent-light">
            {about.contact.email}
          </a>
        </p>
        <p className="mb-2">
          🐙 <strong className="text-slate">GitHub:</strong>{' '}
          <a
            href={about.contact.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light"
          >
            @{about.contact.github.username}
          </a>
        </p>
        <p>
          💼 <strong className="text-slate">LinkedIn:</strong>{' '}
          <a
            href={about.contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light"
          >
            {about.contact.linkedin.name}
          </a>
        </p>
      </div>
    </div>
  )
}
