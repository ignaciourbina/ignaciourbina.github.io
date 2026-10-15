import { FormEvent, useState } from 'react'
import Button from '../components/Button'

// A lightweight browser-side gate for this static GitHub Pages site.
const PASSWORD_HASH = '205c081495863b0870c188c692656e8768c4a58b166c04a189fdb42ef83195ae'

export default function BPEL() {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  const unlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setChecking(true)
    setError('')
    try {
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
      const hash = Array.from(new Uint8Array(digest), (byte) =>
        byte.toString(16).padStart(2, '0')
      ).join('')
      if (hash === PASSWORD_HASH) {
        setUnlocked(true)
        setPassword('')
      } else {
        setError('Incorrect password. Please try again.')
      }
    } catch {
      setError('Unable to check the password. Please reload and try again.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-extrabold text-ink mb-3">BPEL</h1>
      {unlocked ? (
        <div className="bg-panel border border-line rounded-lg p-6">
          <p className="text-muted mb-6">Select your session to continue.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="https://drat-prod.vercel.app/?session=1&order=1">Session 1</Button>
            <Button href="https://drat-prod.vercel.app/?session=2">Session 2</Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(event) => void unlock(event)}
          className="bg-panel border border-line rounded-lg p-6"
        >
          <p className="text-muted mb-6">Enter the password to access the session links.</p>
          <label htmlFor="bpel-password" className="block text-sm font-semibold text-ink mb-2">
            Password
          </label>
          <input
            id="bpel-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setError('')
            }}
            aria-invalid={!!error}
            aria-describedby={error ? 'bpel-error' : undefined}
            className="w-full bg-paper border border-line rounded-md px-3 py-2 text-ink mb-4 focus:outline-none focus:ring-2 focus:ring-green"
          />
          {error && (
            <p id="bpel-error" role="alert" className="text-sm text-red-600 mb-4">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={checking || !password}
            className="bg-green text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-hover disabled:opacity-50"
          >
            {checking ? 'Checking…' : 'Enter'}
          </button>
        </form>
      )}
    </div>
  )
}
