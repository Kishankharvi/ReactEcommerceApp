# 🚀 Futuristic eCommerce Web Application (React + Firebase + Vite)

A fully responsive and modern eCommerce web application built using **React**, **Firebase**, and **Vite**, featuring a futuristic UI with neon accents, glassmorphism, and dark mode. Hosted as a PWA with offline capabilities.

[🔗 Live Demo](https://silly-puffpuff-b82cd3.netlify.app/)

---

## ✨ Features

### 💻 Frontend

* ⚛️ React + Vite (JavaScript)
* 🌐 Pages: Home, Products, Product Detail, Cart, Checkout, Login, Register, Profile
* 📱 Fully responsive for mobile, tablet, and desktop
* 🎨 Futuristic UI: neon colors, glowing borders, glassmorphism, dark theme
* 💡 Futuristic fonts: Orbitron, Exo
* 🎞️ Smooth animations for buttons, transitions, and modals
* 📦 Modular folder structure: `components/`, `pages/`, `styles/`
* ❌ No UI frameworks (no Bootstrap/Tailwind)

### 🔧 Backend with Firebase

* 🔐 Firebase Authentication (Email/Password + Google Login)
* 🔥 Firebase Firestore for storing products, carts, and orders
* 🖼️ Firebase Storage for uploading and retrieving product images
* 🚀 Firebase Hosting
* ☁️ (Optional) Firebase Cloud Functions for payment webhooks

### 🛒 eCommerce Functionality

* 🛍️ Dynamic product listing from Firestore
* 🔍 Search, filter, and sort products
* 🛒 Add to Cart, update quantity, remove items
* 💳 Checkout with Stripe or Razorpay
* 🧾 Store orders in Firestore after payment
* 👤 User profile with order history

### 📱 PWA Support

* `manifest.json` with icons and theme color
* Service worker for offline access
* Installable on Android and desktop

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
npm create vite@latest futuristic-ecommerce --template react

# Install dependencies
cd futuristic-ecommerce
npm install

# Start local development server
npm run dev
```

---

## 🧱 Project Structure

```
├── public/
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── firebase/
│   ├── utils/
│   └── main.jsx
├── sw.js
├── index.html
├── vite.config.js
└── package.json
```

---

## 📘 License

MIT © 2025

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Two official plugins are available:

* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)

If you're building a production-grade app, consider using the [React + TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for stricter type-checking and better linting rules.
