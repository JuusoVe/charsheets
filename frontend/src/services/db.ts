import {
  CollectionReference,
  DocumentReference,
  Firestore,
  PartialWithFieldValue,
  WhereFilterOp,
  deleteField,
} from 'firebase/firestore'
import {
  doc,
  collection,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db as dbFromConfig } from './firebase'
import { CharacterSheet, Field, Page, Section } from '../types'

interface WithId {
  id: string
}

export interface Filter<T> {
  field: keyof T
  opStr: WhereFilterOp
  value: unknown
}

/**
 *
 * Creates a controller object for the collection, with typed operations as properties
 *
 * About typings:
 * T represents the full object with id included
 * To keep typescript intelligence, use Omit<T, "id"> to represent the entity without id.
 * All Document and Collection references therefore use Omit<T, "id"> and entity return should be T.
 *
 * @param collectionName
 * @returns
 *
 */
const createCollectionController = <T extends WithId>(
  collectionName: string,
  dbToUse: Firestore,
) => {
  const db = dbToUse ?? dbFromConfig
  const getCollection = () =>
    collection(db, collectionName) as CollectionReference<Omit<T, 'id'>>

  return {
    /**
     * Fetch a document by id
     * @param id
     */
    get: async (id: T['id']) => {
      const docRef = doc(db, `${collectionName}/${id}`) as DocumentReference<
        Omit<T, 'id'>
      >
      const document = await getDoc(docRef)
      if (document.exists()) return { id: document.id, ...document.data() } as T
      return null
    },

    /**
     * Create a new document. Use upsert method if you want to force the id.
     * @param data Omit<T, "id">
     * @returns database created id
     */
    add: async (data: Omit<T, 'id'>): Promise<T['id']> => {
      const collectionRef = getCollection()
      const document = await addDoc(collectionRef, data)
      return document.id
    },

    /**
     * Update an existing document or create a new with the provided id if one doesn't already exist.
     * Only updates fields, doesn't remove other existing fields.
     * @param document Partial<T> with id mandatory.
     */
    upsert: async (document: PartialWithFieldValue<T>): Promise<void> => {
      const { id, ...data } = document
      const docRef = doc(db, `${collectionName}/${id}`) as DocumentReference<
        Omit<T, 'id'>
      >
      await setDoc(docRef, data as PartialWithFieldValue<Omit<T, 'id'>>, {
        merge: true,
      })
    },

    /**
     * Delete a single field from a record
     * @param id string
     * @param field keyof T
     */
    deleteField: async (id: T['id'], field: keyof T): Promise<void> => {
      const docRef = doc(db, `${collectionName}/${id}`) as DocumentReference<
        Omit<T, 'id'>
      >

      const updateData: Record<string, any> = {
        [field as string]: deleteField(),
      }

      await updateDoc(docRef, updateData)
    },

    /**
     * Permanently delete an entire document. Use deleteField to delete a single field only.
     * @param id
     */
    delete: async (id: T['id']): Promise<void> => {
      const docRef = doc(db, `${collectionName}/${id}`) as DocumentReference<
        Omit<T, 'id'>
      >
      await deleteDoc(docRef)
    },
    /**
     * List all documents once without using a subscription.
     * @returns Promise that resolves to the list of documents
     */
    list: async (): Promise<T[]> => {
      const collectionRef = getCollection() // Get the reference to the collection
      const snapshot = await getDocs(collectionRef) // Fetch all documents in the collection
      const mappedDocuments = snapshot.docs.map((document) => {
        const { id } = document // Extract the document ID
        const data = document.data() // Get the document data
        return { id, ...data } as T // Combine the ID and data into a single object and cast it to type T
      })

      return mappedDocuments // Return the list of documents
    },
    /**
     * @param filters any amount of Filter<T> comma separated
     * @returns  T[]
     */
    listFiltered: async (...filters: Filter<T>[]): Promise<T[]> => {
      const collectionRef = getCollection()
      const [firstFilter, ...rest] = filters

      let queryRef = query(
        collectionRef,
        where(
          firstFilter.field as string,
          firstFilter.opStr,
          firstFilter.value,
        ),
      )

      if (rest.length) {
        rest.forEach((filter) => {
          const { field, opStr, value } = filter
          queryRef = query(queryRef, where(field as string, opStr, value))
        })
      }

      const snapshot = await getDocs(queryRef)
      const mappedDocuments = snapshot.docs.map((document) => {
        const { id } = document
        const data = document.data()
        return { id, ...data } as T
      })
      return mappedDocuments
    },
  }
}

export const createClients = (dbToUse?: Firestore) => {
  const db = dbToUse ?? dbFromConfig
  return {
    characterSheets: createCollectionController<CharacterSheet>(
      'characterSheets',
      db,
    ),
    pages: createCollectionController<Page>('pages', db),
    sections: createCollectionController<Section>('sections', db),
    fields: createCollectionController<Field>('fields', db),
  }
}

const {
  characterSheets: characterSheetsClient,
  pages: pagesClient,
  sections: sectionsClient,
  fields: fieldsClient,
} = createClients()

export { characterSheetsClient, pagesClient, sectionsClient, fieldsClient }
