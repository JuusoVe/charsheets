import { pagesClient } from '../db'
import { StoreApi } from 'zustand'
import { id } from '../../utils'
import { StoreState } from './store'
import { Page } from '../../types'

export interface PagesState {
  pages: Page[]
  updatePage: <K extends keyof Page>(
    pageId: Page['id'],
    field: K,
    value: Page[K],
  ) => void
  createPage: (pageToCreate?: Page) => Page
  deletePage: (pageId: Page['id']) => void
}

export const createPagesSlice = (
  set: StoreApi<StoreState>['setState'],
  get: StoreApi<StoreState>['getState'],
): PagesState => ({
  pages: [],

  updatePage<K extends keyof Page>(
    pageId: Page['id'],
    field: K,
    value: Page[K],
  ) {
    const { pages } = get()
    const page = pages.find((pg) => pg.id === pageId)
    if (!page) return
    set({
      pages: pages.map((pg) =>
        pg.id === pageId ? { ...pg, [field]: value } : pg,
      ),
    })
    pagesClient.upsert({ ...page, [field]: value })
  },

  createPage(pageToCreate?: Page) {
    const prevPages = get().pages
    const newPage: Page = pageToCreate ?? {
      sections: [],
      id: id(),
    }
    const withNewPage = [...prevPages, newPage]
    set({ pages: withNewPage })
    pagesClient.upsert(newPage)
    return newPage
  },

  deletePage(pageId: Page['id']) {
    set((state) => ({
      pages: state.pages.filter((pg) => pg.id !== pageId),
    }))
    pagesClient.delete(pageId)
  },
})
