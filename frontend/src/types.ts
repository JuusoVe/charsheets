export interface Section {
  id: string
  title: string
  x: number
  y: number
  w: number
  h: number
}

export interface Page {
  id: string
  type: 'uploaded' | 'custom'
  sections: Section['id'][]
  layout: Section[]
}

export interface CharacterSheet {
  id: string
  pages: Page['id'][]
}
