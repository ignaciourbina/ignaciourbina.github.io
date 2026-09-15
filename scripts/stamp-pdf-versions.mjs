#!/usr/bin/env node
// Content-hashes every PDF under public/files and writes the map to
// src/content/pdfVersions.json. Components append `?v=<hash>` to a PDF's
// URL so replacing the file changes the URL, making the update immune to
// browser/CDN caching instead of waiting out a cache-control TTL.
//
// Re-run automatically as part of `npm run build` (see package.json).

import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const filesDir = join(root, 'public', 'files')
const outPath = join(root, 'src', 'content', 'pdfVersions.json')

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else if (entry.toLowerCase().endsWith('.pdf')) out.push(full)
  }
  return out
}

const versions = {}
for (const file of walk(filesDir)) {
  const webPath = '/files/' + relative(filesDir, file).split('/').join('/')
  const hash = createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 10)
  versions[webPath] = hash
}

const sorted = Object.fromEntries(Object.keys(versions).sort().map((k) => [k, versions[k]]))
writeFileSync(outPath, JSON.stringify(sorted, null, 2) + '\n')
console.log(`stamp-pdf-versions: wrote ${Object.keys(sorted).length} entries to ${relative(root, outPath)}`)
