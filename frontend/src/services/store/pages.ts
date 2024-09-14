import { pagesClient } from '../db'
import { StoreApi } from 'zustand'
import { StoreState } from './store'
import { Page } from '../../types'
import { createCRUDSlice } from './crud'

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
): PagesState => {
  const { pages, updateItem, createItem, deleteItem } = createCRUDSlice<
    Page,
    'pages'
  >('pages', pagesClient, set, get)

  return {
    pages,
    updatePage: updateItem,
    createPage: createItem,
    deletePage: deleteItem,
  }
}
