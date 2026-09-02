import { FormEvent, useEffect, useRef, useState } from 'react'
import ChatMarkdown from '../components/ChatMarkdown'

// Chat playground for the password-protected reverse proxy that fronts the
// local GPU inference backend (Simulating Open Democracy infra). The password
// is only held in sessionStorage and sent as a Bearer header — the gateway
// verifies it server-side; nothing secret ships in this bundle.

const ENDPOINT_KEY = 'gpuGateway.endpoint'
const PASSWORD_KEY = 'gpuGateway.password'
// Reserved ngrok static domain for the lab workstation's gateway tunnel.
const DEFAULT_ENDPOINT = 'https://leaflike-unexistent-retha.ngrok-free.dev'

interface PaperFigure {
  name: string
  url: string
  description?: string
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  figures?: PaperFigure[]
}

type Status = 'idle' | 'checking' | 'connected' | 'error'
type Mode = 'chat' | 'papers'

// <img> can't send the ngrok-skip-browser-warning header, so the free-tier
// tunnel would serve its interstitial instead of the image. Fetch with the
// header and render a blob URL instead.
function FigureImage({ fig }: { fig: PaperFigure }) {
  const [src, setSrc] = useState<string | null>(null)
  useEffect(() => {
    let objectUrl: string | null = null
    let cancelled = false
    fetch(fig.url, { headers: { 'ngrok-skip-browser-warning': '1' } })
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(`${res.status}`))))
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob)
        if (!cancelled) setSrc(objectUrl)
      })
      .catch(() => setSrc(null))
    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [fig.url])
  return (
    <span className="block mt-3">
      {src ? (
        <img
          src={src}
          alt={fig.description ?? fig.name}
          className="max-w-full border border-line rounded-md"
        />
      ) : (
        <span className="block text-xs text-muted border border-line rounded-md p-3">
          Loading figure {fig.name}…
        </span>
      )}
      {fig.description && <span className="block text-xs text-muted mt-1">{fig.description}</span>}
    </span>
  )
}

function authHeaders(password: string): Record<string, string> {
  return {
    Authorization: `Bearer ${password}`,
    'Content-Type': 'application/json',
    // Bypasses the ngrok free-tier browser interstitial on fetch requests.
    'ngrok-skip-browser-warning': '1',
  }
}

export default function GpuGateway() {
  const [endpoint, setEndpoint] = useState(
    () => localStorage.getItem(ENDPOINT_KEY) ?? DEFAULT_ENDPOINT
  )
  const [password, setPassword] = useState(() => sessionStorage.getItem(PASSWORD_KEY) ?? '')
  const [status, setStatus] = useState<Status>('idle')
  const [statusDetail, setStatusDetail] = useState('')
  const [model, setModel] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [mode, setMode] = useState<Mode>('chat')
  const abortRef = useRef<AbortController | null>(null)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const baseUrl = endpoint.trim().replace(/\/$/, '')

  const connect = async () => {
    localStorage.setItem(ENDPOINT_KEY, endpoint.trim())
    sessionStorage.setItem(PASSWORD_KEY, password)
    setStatus('checking')
    setStatusDetail('')
    try {
      const res = await fetch(`${baseUrl}/v1/models`, { headers: authHeaders(password) })
      if (res.status === 401) throw new Error('Wrong password (gateway returned 401).')
      if (!res.ok) throw new Error(`Gateway returned ${res.status}.`)
      const data = (await res.json()) as { data?: { id: string }[] }
      const id = data.data?.[0]?.id ?? ''
      setModel(id)
      setStatus('connected')
      setStatusDetail(id ? id.split('/').pop() || id : 'connected')
    } catch (err) {
      setStatus('error')
      setStatusDetail(err instanceof Error ? err.message : 'Could not reach the gateway.')
    }
  }

  const sendPapers = async (prompt: string, history: ChatMessage[]) => {
    try {
      const res = await fetch(`${baseUrl}/papers/chat`, {
        method: 'POST',
        headers: authHeaders(password),
        body: JSON.stringify({
          question: prompt,
          history: history.slice(0, -1).map(({ role, content }) => ({ role, content })),
        }),
      })
      if (!res.ok) throw new Error(`Gateway returned ${res.status}.`)
      const data = (await res.json()) as { answer: string; figures?: PaperFigure[] }
      setMessages([
        ...history,
        {
          role: 'assistant',
          content: data.answer,
          figures: (data.figures ?? []).map((f) => ({ ...f, url: `${baseUrl}${f.url}` })),
        },
      ])
    } catch (err) {
      const detail = err instanceof Error ? err.message : 'request failed'
      setMessages([...history, { role: 'assistant', content: `[error: ${detail}]` }])
    } finally {
      setBusy(false)
    }
  }

  const send = async (event: FormEvent) => {
    event.preventDefault()
    const prompt = input.trim()
    if (!prompt || busy || status !== 'connected') return
    const history = [...messages, { role: 'user' as const, content: prompt }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setBusy(true)
    if (mode === 'papers') {
      await sendPapers(prompt, history)
      return
    }
    const controller = new AbortController()
    abortRef.current = controller
    try {
      const res = await fetch(`${baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: authHeaders(password),
        signal: controller.signal,
        body: JSON.stringify({
          model,
          messages: history,
          max_tokens: 1024,
          stream: true,
        }),
      })
      if (!res.ok || !res.body) throw new Error(`Gateway returned ${res.status}.`)
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let answer = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const events = buffer.split('\n\n')
        buffer = events.pop() ?? ''
        for (const eventBlock of events) {
          for (const line of eventBlock.split('\n')) {
            if (!line.startsWith('data: ')) continue
            const payload = line.slice(6).trim()
            if (payload === '[DONE]') continue
            const chunk = JSON.parse(payload) as {
              choices?: { delta?: { content?: string | null } }[]
            }
            answer += chunk.choices?.[0]?.delta?.content ?? ''
          }
        }
        const partial = answer
        setMessages([...history, { role: 'assistant', content: partial }])
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === 'AbortError')) {
        const detail = err instanceof Error ? err.message : 'request failed'
        setMessages([...history, { role: 'assistant', content: `[error: ${detail}]` }])
      }
    } finally {
      setBusy(false)
      abortRef.current = null
    }
  }

  const statusColor =
    status === 'connected' ? 'bg-green' : status === 'error' ? 'bg-red-500' : 'bg-line'

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          Research infrastructure
        </span>
        <h1 className="text-3xl font-extrabold text-ink mb-3">GPU Gateway</h1>
        <p className="text-muted max-w-2xl">
          Chat with the local research inference backend (Simulating Open Democracy). Requests go
          through a password-protected reverse proxy on the lab workstation; the password is
          verified server-side and only kept in this browser session.
        </p>
      </header>

      <div className="bg-panel border border-line rounded-lg p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block">
            <span className="text-sm font-semibold text-ink mb-1 block">Gateway endpoint</span>
            <input
              type="url"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="https://your-tunnel.ngrok-free.app"
              className="w-full bg-paper border border-line rounded-md px-3 py-2 text-sm text-ink"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink mb-1 block">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="never stored on the site"
              className="w-full bg-paper border border-line rounded-md px-3 py-2 text-sm text-ink"
            />
          </label>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => void connect()}
            disabled={!baseUrl || !password || status === 'checking'}
            className="bg-green text-white text-sm font-semibold px-4 py-2 rounded-md disabled:opacity-50"
          >
            {status === 'checking' ? 'Connecting…' : 'Connect'}
          </button>
          <span className={`inline-block w-2.5 h-2.5 rounded-full ${statusColor}`} />
          <span className="text-sm text-muted">
            {status === 'connected'
              ? `Connected — ${statusDetail}`
              : statusDetail || 'Not connected'}
          </span>
        </div>
      </div>

      <div className="bg-panel border border-line rounded-lg p-5">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {(['chat', 'papers'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                mode === m
                  ? 'bg-green text-white border-green'
                  : 'border-line text-muted hover:text-ink'
              }`}
            >
              {m === 'chat' ? 'Free chat' : 'Chat with my papers'}
            </button>
          ))}
          {mode === 'papers' && (
            <span className="text-xs text-muted">
              Grounded answers with page citations —{' '}
              <a
                href={`${baseUrl}/papers/assets/sod/final-manuscript.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green underline"
              >
                SOD paper
              </a>{' '}
              ·{' '}
              <a
                href={`${baseUrl}/papers/assets/jmp/cam-working-paper.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green underline"
              >
                job market paper
              </a>
            </span>
          )}
        </div>
        <div className="space-y-4 mb-4 max-h-[24rem] overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-sm text-muted">Connect, then ask the model something.</p>
          )}
          {messages.map((msg, i) => (
            <div key={i}>
              <p className="text-xs font-bold uppercase tracking-wide text-green mb-1">
                {msg.role === 'user' ? 'You' : 'Model'}
              </p>
              {msg.role === 'assistant' && msg.content ? (
                <ChatMarkdown text={msg.content} />
              ) : (
                <p className="text-sm text-ink whitespace-pre-wrap leading-relaxed">
                  {msg.content ||
                    (busy && i === messages.length - 1
                      ? mode === 'papers'
                        ? 'Searching the papers…'
                        : '…'
                      : '')}
                </p>
              )}
              {msg.figures?.map((fig) => (
                <FigureImage key={fig.name} fig={fig} />
              ))}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={(e) => void send(e)} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              status !== 'connected'
                ? 'Connect first'
                : mode === 'papers'
                  ? 'Ask about the papers…'
                  : 'Ask something…'
            }
            disabled={status !== 'connected' || busy}
            className="flex-1 bg-paper border border-line rounded-md px-3 py-2 text-sm text-ink"
          />
          {busy ? (
            <button
              type="button"
              onClick={() => abortRef.current?.abort()}
              className="border border-line text-sm font-semibold px-4 py-2 rounded-md text-muted"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={status !== 'connected' || !input.trim()}
              className="bg-green text-white text-sm font-semibold px-4 py-2 rounded-md disabled:opacity-50"
            >
              Send
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
