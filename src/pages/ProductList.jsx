"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { getProducts } from "../firebase/firestore"
import ProductCard from "../components/ProductCard"
import LoadingSpinner from "../components/LoadingSpinner"


import "../styles/ProductList.css"

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("name")
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get("search") || ""

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       //
        const productsData = await getProducts()
      // const productsData = SAMPLE_PRODUCTS 
       console.log(productsData);// Use sample data for now
        setProducts(productsData)
        setFilteredProducts(productsData)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, sortBy])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="product-list">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}</h1>
          <div className="filters">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h2>No products found</h2>
            <p>Try adjusting your search or browse all products.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
