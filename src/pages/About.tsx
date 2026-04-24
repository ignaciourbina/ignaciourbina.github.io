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
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header with profile */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-16">
        <div className="w-40 h-40 rounded-full bg-ink flex items-center justify-center text-white text-5xl font-extrabold shrink-0 tracking-tight">
          {about.profile.initials}
        </div>
        <div className="text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
            {about.page.subtitle}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-4">{about.page.title}</h1>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-panel border border-line rounded-lg text-sm text-muted hover:border-green hover:text-green transition-colors"
              >
                <link.icon size={16} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* About Me */}
      <SectionHeader kicker="Bio">About Me</SectionHeader>
      <p className="text-muted mb-6 leading-relaxed">{about.bio.intro}</p>
      <p className="text-ink font-medium mb-3">{about.bio.researchInterests.title}</p>
      <ul className="space-y-2 mb-10">
        {about.bio.researchInterests.items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-muted">
            <span className="text-green mt-1.5 text-xs">&#9679;</span>
            <span>
              <strong className="text-ink font-semibold">{item.title}</strong> — {item.description}
            </span>
          </li>
        ))}
      </ul>

      {/* What I Build */}
      <SectionHeader kicker="Work">{about.whatIBuild.title}</SectionHeader>
      <p className="text-muted mb-4 leading-relaxed">{about.whatIBuild.intro}</p>
      <ul className="space-y-2 mb-4">
        {about.whatIBuild.items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-muted">
            <span className="text-green mt-1.5 text-xs">&#9679;</span>
            <span
              dangerouslySetInnerHTML={{
                __html: item.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-ink font-semibold">$1</strong>'
                ),
              }}
            />
          </li>
        ))}
      </ul>
      <p className="text-muted-light text-sm mb-10">{about.whatIBuild.note}</p>

      {/* Education */}
      <SectionHeader kicker="Degrees">{about.education.title}</SectionHeader>
      <ul className="space-y-0 mb-10">
        {about.education.items.map((edu, index) => (
          <li
            key={index}
            className={`py-3 ${index < about.education.items.length - 1 ? 'border-b border-line' : ''}`}
          >
            <p className="font-semibold text-ink">{edu.degree}</p>
            <p className="text-muted text-sm">{edu.institution}</p>
          </li>
        ))}
      </ul>

      {/* Selected Publications */}
      <SectionHeader kicker="Papers">{about.publications.title}</SectionHeader>
      <ul className="space-y-0 mb-10">
        {about.publications.items.map((pub, index) => (
          <li
            key={index}
            className={`py-4 ${index < about.publications.items.length - 1 ? 'border-b border-line' : ''}`}
          >
            <p
              className="text-muted leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: pub.citation
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>'),
              }}
            />
          </li>
        ))}
      </ul>

      {/* Skills & Tools */}
      <SectionHeader kicker="Stack">{about.skills.title}</SectionHeader>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {about.skills.categories.map((category) => (
          <div key={category.name} className="bg-panel border border-line rounded-lg p-4">
            <h3 className="text-xs uppercase tracking-widest text-green font-bold mb-2">
              {category.name}
            </h3>
            <p className="text-muted text-sm">{category.items.join(' · ')}</p>
          </div>
        ))}
      </div>

      {/* CV */}
      <SectionHeader kicker="Download">CV</SectionHeader>
      <p className="text-muted mb-6">Download my full curriculum vitae:</p>
      <Button href={about.profile.cvUrl} variant="primary">
        Download CV (PDF)
      </Button>

      <div className="border-t border-line my-16" />

      {/* Contact */}
      <SectionHeader kicker="Reach out">{about.contact.title}</SectionHeader>
      <p className="text-muted mb-6 leading-relaxed">{about.contact.intro}</p>
      <div className="bg-panel border border-line rounded-lg p-6 space-y-3">
        <p>
          <strong className="text-ink font-semibold">Email</strong>{' '}
          <a
            href={`mailto:${about.contact.email}`}
            className="text-green hover:text-green-hover transition-colors ml-2"
          >
            {about.contact.email}
          </a>
        </p>
        <p>
          <strong className="text-ink font-semibold">GitHub</strong>{' '}
          <a
            href={about.contact.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green hover:text-green-hover transition-colors ml-2"
          >
            @{about.contact.github.username}
          </a>
        </p>
        <p>
          <strong className="text-ink font-semibold">LinkedIn</strong>{' '}
          <a
            href={about.contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green hover:text-green-hover transition-colors ml-2"
          >
            {about.contact.linkedin.name}
          </a>
        </p>
      </div>
    </div>
  )
}
