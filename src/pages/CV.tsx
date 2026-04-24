import Button from '../components/Button'
import { about } from '../content'

export default function CV() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          Curriculum Vitae
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-3">CV</h1>
        <p className="text-lg text-muted">Download or view my full curriculum vitae.</p>
      </header>

      <div className="bg-panel border border-line rounded-lg p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-ink font-bold text-lg mb-1">Ignacio Urbina</h2>
          <p className="text-muted text-sm">
            Ph.D. Candidate in Political Science, Stony Brook University
          </p>
        </div>
        <Button href={about.profile.cvUrl} variant="primary" size="lg">
          Download CV (PDF)
        </Button>
      </div>

      <div
        className="mt-10 border border-line rounded-lg overflow-hidden bg-panel"
        style={{ height: 'calc(100vh - 20rem)' }}
      >
        <iframe
          src={about.profile.cvUrl}
          title="Curriculum Vitae"
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  )
}
