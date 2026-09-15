import versions from '../content/pdfVersions.json'

const versionMap = versions as Record<string, string>

// Appends a content hash to a PDF URL (e.g. /files/cv-2026.pdf?v=3bf33c2926)
// so replacing the file at the same path changes the URL and browsers/CDNs
// fetch it fresh instead of serving a stale cached copy. URLs not produced by
// scripts/stamp-pdf-versions.mjs (external links, missing files) pass through
// unchanged.
export function versionedPdf(url: string): string {
  const hash = versionMap[url]
  if (!hash) return url
  return `${url}${url.includes('?') ? '&' : '?'}v=${hash}`
}
