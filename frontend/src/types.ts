import { Layout } from 'react-grid-layout'

type Section = {
  id: string
  content: string
}

type Page = {
  id: string
  type: 'uploaded' | 'custom'
  sections: Section['id'][]
  layout: Layout[]
}

export interface CharacterSheet {
  id: string
  pages: Page['id'][]
}
