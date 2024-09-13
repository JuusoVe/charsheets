type Section = {
  id: string
  content: string
  size: { w: number; h: number } // Width and height in grid cells
  position: { x: number; y: number } // Grid position (optional for this implementation)
}

export interface Page {
  id: string
  sections: Section['id'][]
}

export interface CharacterSheet {
  id: string
  pages: Page['id'][]
}
