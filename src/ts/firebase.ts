import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
}

// TODO
// export const firebaseApp = typeof window !== 'undefined' ? firebase.initializeApp(firebaseConfig) : {}
// export const firebaseDatabase = typeof window !== 'undefined' ? firebase.database() : {}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDatabase = getDatabase()
