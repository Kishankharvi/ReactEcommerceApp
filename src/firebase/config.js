import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
 apiKey: "AIzaSyCMLy8t7oCWAyCR3Bo5CJGGBs7vJmS8Osc",
  authDomain: "ecommerceapp-65be9.firebaseapp.com",
  projectId: "ecommerceapp-65be9",
  storageBucket: "ecommerceapp-65be9.firebasestorage.app",
  messagingSenderId: "4445606619",
  appId: "1:4445606619:web:7c2bf32e068ac3dc11b2fe",
  measurementId: "G-YNJXJPLXTK"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()

export default app
