import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import axios from "axios"
import toast from "react-hot-toast"

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const { user } = useAuth()
  const API_URL = import.meta.env.VITE_API_URL || "https://shopease-4i1y.onrender.com/api"

  useEffect(() => {
    if (user) {
      fetchCartFromServer()
    } else {
      loadCartFromLocalStorage()
    }
  }, [user])

  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
      setCartItems([])
    }
  }

  const saveCartToLocalStorage = (items) => {
    try {
      localStorage.setItem("cart", JSON.stringify(items))
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }

  const fetchCartFromServer = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`)
      setCartItems(response.data.items || [])
    } catch (error) {
      console.error("Error fetching cart:", error)
      loadCartFromLocalStorage()
    }
  }

  const addToCart = async (product, quantity = 1) => {
    const existingItem = cartItems.find((item) => item.id === product.id)

    let updatedCart
    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
      )
    } else {
      updatedCart = [...cartItems, { ...product, quantity }]
    }

    setCartItems(updatedCart)

    if (user) {
      try {
        await axios.post(`${API_URL}/cart`, {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        })
      } catch (error) {
        console.error("Error adding to cart:", error)
        setCartItems(cartItems)
      }
    } else {
      saveCartToLocalStorage(updatedCart)
    }

    toast.success(`${product.title} added to cart!`)
  }

  const removeFromCart = async (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId)
    setCartItems(updatedCart)

    if (user) {
      try {
        await axios.delete(`${API_URL}/cart/${productId}`)
      } catch (error) {
        console.error("Error removing from cart:", error)
        setCartItems(cartItems)
      }
    } else {
      saveCartToLocalStorage(updatedCart)
    }

    toast.success("Item removed from cart!")
  }

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const updatedCart = cartItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    setCartItems(updatedCart)

    if (user) {
      try {
        await axios.post(`${API_URL}/cart`, {
          productId,
          quantity,
        })
      } catch (error) {
        console.error("Error updating quantity:", error)
        setCartItems(cartItems)
      }
    } else {
      saveCartToLocalStorage(updatedCart)
    }
  }

  const clearCart = () => {
    setCartItems([])
    if (!user) {
      localStorage.removeItem("cart")
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
