import { motion } from "framer-motion"
import { Star, ShoppingCart, Heart, Eye, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useState } from "react"

const ProductCard = ({ product, viewMode = "grid" }) => {
  const { addToCart } = useCart()
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const formatRating = (rating) => {
    if (typeof rating === "object" && rating.rate) {
      return rating.rate
    }
    return rating || 4.0
  }

  if (viewMode === "list") {
    return (
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="card group cursor-pointer">
        <Link to={`/product/${product.id}`} className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-64 h-64 bg-gray-100 flex-shrink-0 overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            )}
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm text-primary-600 font-semibold mb-2 uppercase tracking-wide">{product.category}</p>
              <h3 className="font-bold text-2xl text-gray-800 mb-4 group-hover:text-primary-600 transition-colors line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{product.description}</p>
              <div className="flex items-center mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(formatRating(product.rating)) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-3 font-medium">({formatRating(product.rating).toFixed(1)})</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-800">${product.price}</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="btn-primary px-8 py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </motion.button>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Grid view (default)
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="card group cursor-pointer overflow-hidden"
    >
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          )}
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-125 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsLiked(!isLiked)
              }}
              className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
                isLiked ? "bg-red-500 text-white" : "bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="p-3 rounded-full bg-white/90 text-gray-700 hover:bg-primary-500 hover:text-white transition-all duration-300 backdrop-blur-md shadow-lg"
            >
              <Eye className="w-5 h-5" />
            </Link>
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-full bg-white/95 backdrop-blur-md text-gray-800 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-white transition-all duration-300 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Quick Add</span>
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-primary-600 font-semibold mb-2 uppercase tracking-wide">{product.category}</p>
          <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(formatRating(product.rating)) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 ml-2 text-sm font-medium">({formatRating(product.rating).toFixed(1)})</span>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-800">${product.price}</div>
            <Link
              to={`/product/${product.id}`}
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center group/link"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
