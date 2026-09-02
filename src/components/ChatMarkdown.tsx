import { ReactNode, isValidElement, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Check, Copy } from 'lucide-react'

// Markdown renderer for chat replies (GPU Gateway). Styled with the site's
// tokens and adds a copy button to every fenced code block. react-markdown
// ignores raw HTML by default, so model output can't inject markup.

function nodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (isValidElement(node)) return nodeText((node.props as { children?: ReactNode }).children)
  return ''
}

function CodeBlock({ children }: { children?: ReactNode }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    void navigator.clipboard.writeText(nodeText(children).replace(/\n$/, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="relative group my-3">
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute top-2 right-2 flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-line bg-panel text-muted hover:text-ink opacity-80"
      >
        {copied ? <Check size={13} className="text-green" /> : <Copy size={13} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className="bg-paper border border-line rounded-md p-3 pr-20 overflow-x-auto text-[0.85rem] leading-relaxed">
        {children}
      </pre>
    </div>
  )
}

export default function ChatMarkdown({ text }: { text: string }) {
  return (
    <div className="text-sm text-ink leading-relaxed space-y-2 break-words">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          code: ({ children, className }) =>
            className ? (
              // Block code (inside <pre>): keep as-is, CodeBlock wraps it.
              <code className={className}>{children}</code>
            ) : (
              <code className="bg-paper border border-line rounded px-1 py-0.5 text-[0.85em]">
                {children}
              </code>
            ),
          h1: ({ children }) => <h3 className="text-base font-bold mt-3">{children}</h3>,
          h2: ({ children }) => <h3 className="text-base font-bold mt-3">{children}</h3>,
          h3: ({ children }) => <h4 className="text-sm font-bold mt-2">{children}</h4>,
          ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1">{children}</ol>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green underline"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-line pl-3 text-muted">{children}</blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="text-xs border-collapse [&_th]:border [&_td]:border [&_th]:border-line [&_td]:border-line [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1">
                {children}
              </table>
            </div>
          ),
        }}
      >
        {text}
      </Markdown>
    </div>
  )
}
