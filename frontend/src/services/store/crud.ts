import { StoreApi } from 'zustand'
import { id } from '../../utils'

interface Identifiable {
  id: string
}

type StateSlice<T extends Identifiable, N extends string> = {
  [K in N]: T[]
} & {
  updateItem: <K extends keyof T>(
    itemId: T['id'],
    field: K,
    value: T[K],
  ) => void
  createItem: (itemToCreate?: T) => T
  deleteItem: (itemId: T['id']) => void
}

export const createCRUDSlice = <T extends Identifiable, N extends string>(
  collectionName: N,
  dbClient: {
    upsert: (item: T) => void
    delete: (itemId: string) => void
    list: () => Promise<T[]>
  },
  set: StoreApi<any>['setState'],
  get: StoreApi<any>['getState'],
): StateSlice<T, N> => {
  return {
    [collectionName]: [],

    updateItem<K extends keyof T>(itemId: T['id'], field: K, value: T[K]) {
      const items = get()[collectionName] as T[]
      const item = items.find((it) => it.id === itemId)
      if (!item) return
      const updatedItem = { ...item, [field]: value }
      set({
        [collectionName]: items.map((it) =>
          it.id === itemId ? updatedItem : it,
        ),
      })
      dbClient.upsert(updatedItem)
    },

    createItem(itemToCreate?: T): T {
      const items = get()[collectionName] as T[]
      const newItem: T = itemToCreate ?? ({ id: id() } as T)
      const updatedItems = [...items, newItem]
      set({ [collectionName]: updatedItems })
      dbClient.upsert(newItem)
      return newItem
    },

    deleteItem(itemId: T['id']) {
      set((state: { [K in N]: T[] }) => ({
        [collectionName]: state[collectionName].filter(
          (it) => it.id !== itemId,
        ),
      }))
      dbClient.delete(itemId)
    },
  } as StateSlice<T, N>
}
