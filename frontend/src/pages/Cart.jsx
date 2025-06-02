import { motion } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Shield, Truck, CreditCard } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed with checkout")
      navigate("/login")
      return
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    toast.success("Order placed successfully! ")
    clearCart()
    navigate("/")
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <div className="card max-w-md mx-auto p-12">
              <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 text-lg">Looks like you haven't added any items to your cart yet.</p>
              <Link to="/products" className="btn-primary inline-flex items-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4 text-shadow-lg">Shopping Cart</h1>
          <p className="text-white/80 text-lg">Review your items and proceed to checkout</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Cart Items ({cartItems.length})</h2>
                <button onClick={clearCart} className="text-red-600 hover:text-red-700 font-medium transition-colors">
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-6 p-6 bg-gray-50 rounded-2xl"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-xl bg-white shadow-sm"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-800 truncate">{item.title}</h3>
                      <p className="text-gray-600">{item.category}</p>
                      <p className="text-primary-600 font-bold text-xl">${item.price}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors rounded-l-xl"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors rounded-r-xl"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors mt-2 p-2 rounded-full hover:bg-red-50"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-8 sticky top-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-3xl font-bold text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {subtotal < 50 && (
                <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 mb-6">
                  <p className="text-accent-800 text-sm">
                    Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full btn-primary text-lg py-4"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {user ? "Proceed to Checkout" : "Login to Checkout"}
                </motion.button>

                <Link to="/products" className="w-full btn-secondary text-center block py-4">
                  Continue Shopping
                </Link>
              </div>

              {/* Security badges */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Shield className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm text-gray-600 font-medium">Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-sm text-gray-600 font-medium">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
