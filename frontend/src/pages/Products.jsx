import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Grid, List, X, RefreshCw, SlidersHorizontal } from "lucide-react"
import { useQuery } from "react-query"
import { productsAPI, transformProducts } from "../services/api"
import ProductCard from "../components/ProductCard"

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("default")
  const [viewMode, setViewMode] = useState("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredProducts, setFilteredProducts] = useState([])
  const productsPerPage = 12

  // Fetch all products
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery("products", () => productsAPI.getAllProducts(), {
    select: (response) => transformProducts(response.data),
  })

  // Fetch categories
  const { data: categories } = useQuery("categories", () => productsAPI.getCategories(), {
    select: (response) => response.data,
  })

  // Filter and sort products
  useEffect(() => {
    if (!products) return

    let filtered = [...products]

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate)
        break
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [products, searchTerm, selectedCategory, sortBy])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSortBy("default")
  }

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-white/80 text-xl">Loading amazing products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-400 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-white/70 mb-6">Failed to load products. Please try again.</p>
          <button onClick={() => refetch()} className="btn-primary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6 text-shadow-lg">
            Premium Products
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover our curated collection of {products?.length || 0} premium products
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">All Categories</option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field">
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => refetch()}
                className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300"
                title="Refresh products"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory !== "all" || sortBy !== "default") && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-600 flex items-center font-medium">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Active filters:
              </span>
              {searchTerm && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="ml-2 hover:text-primary-900">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")} className="ml-2 hover:text-secondary-900">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
              {sortBy !== "default" && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-accent-100 text-accent-800">
                  Sort: {sortBy}
                  <button onClick={() => setSortBy("default")} className="ml-2 hover:text-accent-900">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
              <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Clear all
              </button>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-white/80 text-lg">
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
          {totalPages > 1 && (
            <p className="text-white/80">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`grid gap-8 mb-12 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-3">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-6 py-3 border border-white/20 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all duration-300 text-white font-medium"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`px-4 py-3 border rounded-xl transition-all duration-300 font-medium ${
                          currentPage === pageNumber
                            ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-500 shadow-lg"
                            : "border-white/20 text-white hover:bg-white/10"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  } else if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                    return (
                      <span key={pageNumber} className="px-2 text-white/60">
                        ...
                      </span>
                    )
                  }
                  return null
                })}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 border border-white/20 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all duration-300 text-white font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-white mb-4">No products found</h3>
            <p className="text-white/70 mb-8 text-lg">
              We couldn't find any products matching your criteria. Try adjusting your filters.
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={clearFilters} className="btn-primary">
                Clear Filters
              </button>
              <button onClick={() => refetch()} className="btn-secondary">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Products
