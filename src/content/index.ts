// Central content exports
// Edit the JSON files to update site copy without touching component code

import siteContent from './site.json'
import homeContent from './home.json'
import toolsContent from './tools.json'
import aboutContent from './about.json'
import researchContent from './research.json'
import teachingContent from './teaching.json'
import conferencesContent from './conferences.json'
import mathcampContent from './mathcamp.json'

export interface Presentation {
  slug: string
  title: string
  event: string
  date: string
  description: string
  pdfUrl?: string
}

export interface MathCampGraph {
  slug: string
  title: string
  expression: string
  description: string
}

export interface MathCampUnit {
  id: string
  number: string
  title: string
  description: string
  graphs: MathCampGraph[]
}

export const site = siteContent
export const home = homeContent
export const tools = toolsContent
export const about = aboutContent
export const research = researchContent
export const teaching = teachingContent
export const conferences = conferencesContent as {
  page: typeof conferencesContent.page
  presentations: Presentation[]
}
export const mathcamp = mathcampContent as {
  page: typeof mathcampContent.page
  note: typeof mathcampContent.note
  units: MathCampUnit[]
}

// Type exports for TypeScript support
export type SiteContent = typeof siteContent
export type HomeContent = typeof homeContent
export type ToolsContent = typeof toolsContent
export type AboutContent = typeof aboutContent
export type ResearchContent = typeof researchContent
export type TeachingContent = typeof teachingContent
export type ConferencesContent = typeof conferencesContent
export type MathCampContent = typeof mathcampContent

// Helper to find a math camp unit by its id
export const getMathCampUnit = (unitId: string) => mathcamp.units.find((unit) => unit.id === unitId)

// Helper to find a graph within a unit, returning the unit alongside it
export const getMathCampGraph = (unitId: string, slug: string) => {
  const unit = getMathCampUnit(unitId)
  const graph = unit?.graphs.find((g) => g.slug === slug)
  return unit && graph ? { unit, graph } : undefined
}

// Helper to get a tool by ID
export const getToolById = (id: string) => {
  const allTools = [...toolsContent.tools.research, ...toolsContent.tools.teaching]
  return allTools.find((tool) => tool.id === id)
}

// Helper to get featured tools
export const getFeaturedTools = () => toolsContent.tools.featured

// Helper to get all research tools
export const getResearchTools = () => toolsContent.tools.research

// Helper to get all teaching tools
export const getTeachingTools = () => toolsContent.tools.teaching
