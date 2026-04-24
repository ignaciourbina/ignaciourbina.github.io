import { ReactNode } from 'react'

interface ToolCardProps {
  title: string
  description: string
  tags: string[]
  featured?: boolean
  launchUrl?: string
  githubUrl?: string
  children?: ReactNode
}

export default function ToolCard({
  title,
  description,
  tags,
  featured = false,
  launchUrl,
  githubUrl,
  children,
}: ToolCardProps) {
  return (
    <div
      className={`bg-panel border border-line rounded-lg p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover ${
        featured ? 'border-l-[3px] border-l-green' : ''
      }`}
    >
      <h3 className="text-ink font-bold text-lg mb-2">{title}</h3>

      <p className="text-muted text-[0.95rem] leading-relaxed mb-4">{description}</p>

      {children}

      <div className="flex flex-wrap gap-1.5 my-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-paper text-muted text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-5">
        {launchUrl && (
          <a
            href={launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green text-white rounded-lg font-medium text-sm hover:bg-green-hover transition-colors shadow-sm"
          >
            Launch Tool
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-line text-muted rounded-lg font-medium text-sm hover:border-green hover:text-green transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  )
}
