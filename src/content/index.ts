// Central content exports
// Edit the JSON files to update site copy without touching component code

import siteContent from './site.json'
import homeContent from './home.json'
import toolsContent from './tools.json'
import aboutContent from './about.json'
import researchContent from './research.json'
import teachingContent from './teaching.json'

export const site = siteContent
export const home = homeContent
export const tools = toolsContent
export const about = aboutContent
export const research = researchContent
export const teaching = teachingContent

// Type exports for TypeScript support
export type SiteContent = typeof siteContent
export type HomeContent = typeof homeContent
export type ToolsContent = typeof toolsContent
export type AboutContent = typeof aboutContent
export type ResearchContent = typeof researchContent
export type TeachingContent = typeof teachingContent

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
