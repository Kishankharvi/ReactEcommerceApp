import { collection, doc, getDocs, getDoc, addDoc, updateDoc, query, where, orderBy } from "firebase/firestore"
import { db } from "./config"

// Products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"))
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export const getProduct = async (id) => {
  try {
    const docRef = doc(db, "products", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

// Orders
export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: new Date(),
      status: "pending",
    })
    return docRef.id
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export const getUserOrders = async (userId) => {
  try {
    const q = query(collection(db, "orders"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return []
  }
}

// User Profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, profileData)
  } catch (error) {
    console.error("Error updating profile:", error)
    throw error
  }
}
