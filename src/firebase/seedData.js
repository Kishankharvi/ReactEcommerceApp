// Sample data to seed your Firestore database
export const sampleProducts = [
  {
    name: "Quantum Processor X1",
    description: "Next-generation quantum computing processor with unprecedented performance capabilities.",
    price: 2999.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    inStock: true,
  },
  {
    name: "Neural Interface Headset",
    description: "Advanced brain-computer interface for seamless digital interaction and enhanced cognitive abilities.",
    price: 4999.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Technology",
    inStock: true,
  },
  {
    name: "Holographic Display Pro",
    description: "Ultra-high resolution holographic display with 360-degree viewing angles and gesture controls.",
    price: 7999.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Displays",
    inStock: true,
  },
  {
    name: "Nano-Material Jacket",
    description: "Self-healing smart fabric jacket with temperature regulation and built-in health monitoring.",
    price: 899.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Clothing",
    inStock: true,
  },
  {
    name: "Anti-Gravity Boots",
    description: "Revolutionary footwear with magnetic levitation technology for enhanced mobility.",
    price: 1299.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Footwear",
    inStock: true,
  },
  {
    name: "Plasma Energy Drink",
    description: "Molecularly enhanced energy drink with sustained release formula for peak performance.",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Beverages",
    inStock: true,
  },
]

// Function to add sample products to Firestore
import { collection, addDoc } from "firebase/firestore"
import { db } from "./config"

export const seedProducts = async () => {
  try {
    const promises = sampleProducts.map((product) => addDoc(collection(db, "products"), product))
    await Promise.all(promises)
    console.log("Sample products added successfully!")
  } catch (error) {
    console.error("Error adding sample products:", error)
  }
}
