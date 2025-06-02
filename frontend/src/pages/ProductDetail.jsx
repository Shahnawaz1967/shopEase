import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus, Share2, Shield, Truck, RotateCcw } from "lucide-react"
import { useQuery } from "react-query"
import { productsAPI, transformProduct } from "../services/api"
import { useCart } from "../context/CartContext"
import toast from "react-hot-toast"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id], () => productsAPI.getProduct(id), {
    select: (response) => transformProduct(response.data),
  })

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  const formatRating = (rating) => {
    if (typeof rating === "object" && rating.rate) {
      return rating.rate
    }
    return rating || 4.0
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-white/80 text-xl">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-400 text-6xl mb-6">😞</div>
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <p className="text-white/70 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-white/70 mb-8"
        >
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-white">{product.category}</span>
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-white/80 hover:text-white mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="card p-8">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-6">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Additional product images would go here if available */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className={`aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                      selectedImage === index ? "border-primary-500" : "border-transparent hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="card p-8">
              {/* Category */}
              <p className="text-primary-600 font-semibold uppercase tracking-wide mb-4">{product.category}</p>

              {/* Title */}
              <h1 className="text-4xl font-display font-bold text-gray-800 mb-6">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(formatRating(product.rating)) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium text-lg">
                  {formatRating(product.rating).toFixed(1)} ({product.rating?.count || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="text-4xl font-bold text-gray-800 mb-2">${product.price}</div>
                <p className="text-green-600 font-medium">Free shipping on orders over $50</p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition-colors rounded-l-xl"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 transition-colors rounded-r-xl"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-gray-600">In stock</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 py-4 text-lg"
                >
                  <ShoppingCart className="w-6 h-6 mr-3" />
                  Add to Cart
                </motion.button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    isLiked
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-4 rounded-xl border-2 border-gray-300 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 transition-all duration-300"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Secure</div>
                    <div className="text-sm text-gray-600">100% Safe</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Truck className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Fast Delivery</div>
                    <div className="text-sm text-gray-600">2-3 Days</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <RotateCcw className="w-6 h-6 text-purple-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Easy Returns</div>
                    <div className="text-sm text-gray-600">30 Days</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
