import { Section } from './types'
import { id } from './utils'

export const withoutId: Omit<Section, 'id'>[] = [
  { x: 0, y: 1, w: 2, h: 1, title: 'Strength' },
  { x: 0, y: 2, w: 2, h: 1, title: 'Dexterity' },
  { x: 0, y: 3, w: 2, h: 1, title: 'Constitution' },
  { x: 0, y: 4, w: 2, h: 1, title: 'Intelligence' },
  { x: 0, y: 5, w: 2, h: 1, title: 'Wisdom' },
  { x: 0, y: 6, w: 2, h: 1, title: 'Charisma' },
  { x: 2, y: 1, w: 2, h: 1, title: 'Inspiration' },
  { x: 2, y: 2, w: 2, h: 1, title: 'Proficiency Bonus' },
  { x: 2, y: 3, w: 2, h: 3, title: 'Saving Throws' },
  { x: 2, y: 6, w: 2, h: 6, title: 'Skills' },
  { x: 4, y: 1, w: 4, h: 1, title: 'Armor Class, Initiative, Speed' },
  { x: 4, y: 2, w: 4, h: 1, title: 'Hit Point Maximum' },
  { x: 4, y: 3, w: 4, h: 1, title: 'Current Hit Points' },
  { x: 4, y: 4, w: 4, h: 1, title: 'Temporary Hit Points' },
  { x: 4, y: 5, w: 2, h: 1, title: 'Hit Dice' },
  { x: 6, y: 5, w: 2, h: 1, title: 'Death Saves' },
  { x: 8, y: 1, w: 4, h: 2, title: 'Personality Traits' },
  { x: 8, y: 3, w: 4, h: 1, title: 'Ideals' },
  { x: 8, y: 4, w: 4, h: 1, title: 'Bonds' },
  { x: 8, y: 5, w: 4, h: 1, title: 'Flaws' },
  { x: 4, y: 6, w: 4, h: 3, title: 'Attacks & Spellcasting' },
  { x: 8, y: 6, w: 4, h: 6, title: 'Features & Traits' },
  { x: 0, y: 7, w: 4, h: 1, title: 'Passive Wisdom (Perception)' },
  { x: 0, y: 8, w: 4, h: 2, title: 'Other Proficiencies & Languages' },
  { x: 4, y: 9, w: 4, h: 3, title: 'Equipment' },
]

export const ai_layout: Section[] = withoutId.map((section) => ({
  ...section,
  id: id(),
}))
