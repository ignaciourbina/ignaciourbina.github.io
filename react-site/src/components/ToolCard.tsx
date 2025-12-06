import { ReactNode } from 'react'

interface ToolCardProps {
  title: string
  description: string
  tags: string[]
  status?: 'live' | 'coming'
  featured?: boolean
  launchUrl?: string
  githubUrl?: string
  children?: ReactNode
}

export default function ToolCard({
  title,
  description,
  tags,
  status,
  featured = false,
  launchUrl,
  githubUrl,
  children,
}: ToolCardProps) {
  const isPlaceholder = status === 'coming'
  
  return (
    <div
      className={`bg-bg-card border border-border rounded-lg p-6 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg ${
        featured ? 'border-l-4 border-l-accent' : ''
      } ${isPlaceholder ? 'opacity-75 border-dashed' : ''}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-navy font-semibold text-xl">{title}</h3>
        {status && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              status === 'live'
                ? 'bg-green-100 text-green-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {status === 'live' ? 'Live' : 'Coming Soon'}
          </span>
        )}
      </div>
      
      <p className="text-slate-light text-[0.95rem] leading-relaxed mb-4">
        {description}
      </p>
      
      {children}
      
      <div className="flex flex-wrap gap-1.5 my-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-bg-light text-slate text-xs px-2 py-1 rounded"
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
            className="inline-flex items-center px-4 py-2 bg-accent text-white rounded font-medium text-sm hover:bg-accent-light transition-colors"
          >
            Launch Tool
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-border text-slate rounded font-medium text-sm hover:bg-bg-light transition-colors"
          >
            GitHub
          </a>
        )}
        {isPlaceholder && !launchUrl && (
          <span className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-500 rounded font-medium text-sm cursor-not-allowed">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  )
}
