"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProduct } from "../firebase/firestore"
import { CartContext } from "../utils/CartContext"
import LoadingSpinner from "../components/LoadingSpinner"
import "../styles/ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id)
        if (productData) {
          setProduct(productData)
        } else {
          navigate("/products")
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        navigate("/products")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, navigate])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/products")} className="back-btn">
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="product-detail">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          Back
        </button>

        <div className="product-detail-content">
          <div className="product-image-section">
            <img
              src={product.image || "/placeholder.svg?height=500&width=500"}
              alt={product.name}
              className="product-detail-image"
            />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price">${product.price}</div>
            <p className="product-description">{product.description}</p>

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="quantity-btn">
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="quantity-input"
                  />
                  <button onClick={() => setQuantity(quantity + 1)} className="quantity-btn">
                    +
                  </button>
                </div>
              </div>

              <button onClick={handleAddToCart} className={`add-to-cart-btn ${addedToCart ? "added" : ""}`}>
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0h10" />
                </svg>
              </button>
            </div>

            <div className="product-features">
              <h3>Features</h3>
              <ul>
                <li>Premium quality materials</li>
                <li>Advanced technology integration</li>
                <li>Eco-friendly manufacturing</li>
                <li>1-year warranty included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
