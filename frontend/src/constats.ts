import { Section } from './types'
import { id } from './utils'

export const withoutId: Omit<Section, 'id'>[] = [
  { title: 'Header', x: 0, y: 0, w: 16, h: 2 },
  { title: 'Abilities', x: 0, y: 2, w: 3, h: 6 },
  { title: 'Saving Throws and Skills', x: 3, y: 2, w: 3, h: 6 },
  { title: 'Proficiency Bonus and Passive Wisdom', x: 0, y: 8, w: 6, h: 1 },
  { title: 'Other Proficiencies & Languages', x: 0, y: 9, w: 6, h: 3 },
  { title: 'Combat Stats', x: 6, y: 2, w: 4, h: 4 },
  { title: 'Hit Points and Dice', x: 6, y: 6, w: 4, h: 2 },
  { title: 'Attacks & Spellcasting', x: 6, y: 8, w: 4, h: 4 },
  { title: 'Personality Traits and Ideals', x: 10, y: 2, w: 6, h: 4 },
  { title: 'Bonds and Flaws', x: 10, y: 6, w: 6, h: 2 },
  { title: 'Equipment', x: 10, y: 8, w: 6, h: 3 },
  { title: 'Features & Traits', x: 10, y: 11, w: 6, h: 1 },
]

export const ai_layout: Section[] = withoutId.map((section) => ({
  ...section,
  id: id(),
}))
