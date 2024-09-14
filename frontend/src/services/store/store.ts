import { create } from 'zustand'
import { createPagesSlice, PagesState } from './pages'
import { pagesClient } from '../db'

export type StoreState = {
  init: () => Promise<void>
} & PagesState

export const useCharacterSheetStore = create<StoreState>((set, get) => ({
  ...createPagesSlice(set, get),

  async init() {
    const { pages } = get()
    const alreadyInitialized = !pages.length

    if (!alreadyInitialized) {
      return
    }

    const [dbPages] = await Promise.all([pagesClient.list()])

    set({
      pages: dbPages,
    })
  },
}))
