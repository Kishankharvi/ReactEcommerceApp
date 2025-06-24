"use client"

import { useState, useEffect, useContext } from "react"
import { useLocation } from "react-router-dom"
import { AuthContext } from "../utils/AuthContext"
import { getUserOrders } from "../firebase/firestore"
import LoadingSpinner from "../components/LoadingSpinner"
import "../styles/Profile.css"

const Profile = () => {
  const { user } = useContext(AuthContext)
  const location = useLocation()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(location.state?.message || "")

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const userOrders = await getUserOrders(user.uid)
          setOrders(userOrders)
        } catch (error) {
          console.error("Error fetching orders:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchOrders()
  }, [user])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="profile">
      <div className="container">
        {message && <div className="success-message">{message}</div>}

        <div className="profile-header">
          <h1 className="page-title">My Profile</h1>
          <div className="user-info">
            <div className="user-avatar">
              {user?.photoURL ? (
                <img src={user.photoURL || "/placeholder.svg"} alt="Profile" />
              ) : (
                <div className="avatar-placeholder">{user?.email?.charAt(0).toUpperCase()}</div>
              )}
            </div>
            <div className="user-details">
              <h2>{user?.displayName || "User"}</h2>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <section className="orders-section">
            <h2>Order History</h2>
            {orders.length === 0 ? (
              <div className="no-orders">
                <p>No orders found</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-id">Order #{order.id.slice(-8)}</div>
                      <div className="order-date">{order.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}</div>
                      <div className={`order-status ${order.status}`}>{order.status}</div>
                    </div>
                    <div className="order-items">
                      {order.items?.map((item) => (
                        <div key={item.id} className="order-item">
                          <img
                            src={item.image || "/placeholder.svg?height=50&width=50"}
                            alt={item.name}
                            className="order-item-image"
                          />
                          <div className="order-item-details">
                            <h4>{item.name}</h4>
                            <p>Qty: {item.quantity}</p>
                          </div>
                          <div className="order-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="order-total">Total: ${order.total?.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Profile
