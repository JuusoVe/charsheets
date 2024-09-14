interface FieldBase {
  id: string
}
export interface TextAreaField extends FieldBase {
  type: 'textarea'
  content: string
}

interface ValueAndTitle {
  value: string
  title: string
}

export interface ValuesAndTitlesListField extends FieldBase {
  type: 'values_and_titles_list'
  values: ValueAndTitle[]
}

export type Field = TextAreaField | ValuesAndTitlesListField

export interface Section {
  id: string
  title: string
  x: number
  y: number
  w: number
  h: number
  fields: Field[]
}

export interface Page {
  id: string
  sections: Section['id'][]
}

export interface CharacterSheet {
  id: string
  pages: Page['id'][]
}
