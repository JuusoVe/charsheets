import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDvthZZnIboGj4j1I5cetFr9uUDTiauc6M',
  authDomain: 'charsheets-21de5.firebaseapp.com',
  projectId: 'charsheets-21de5',
  storageBucket: 'charsheets-21de5.appspot.com',
  messagingSenderId: '1043985671827',
  appId: '1:1043985671827:web:ba747a930e105ec74c4f66',
}

const app = initializeApp(FIREBASE_CONFIG)

export const authWithoutPersistence = getAuth(app)

setPersistence(authWithoutPersistence, browserLocalPersistence).catch(
  (error) => {
    const errorCode = error.code
    const errorMessage = error.message
    console.error('Failed to set auth persistence:', errorCode, errorMessage)
  },
)

export const auth = authWithoutPersistence
export const db = getFirestore(app)
export const storage = getStorage(app)
