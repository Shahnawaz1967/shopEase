import axios from "axios"

const API_BASE_URL = "https://fakestoreapi.com"

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Products API
export const productsAPI = {
  getAllProducts: () => api.get("/products"),
  getProduct: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get("/products/categories"),
  getProductsByCategory: (category) => api.get(`/products/category/${category}`),
  getLimitedProducts: (limit) => api.get(`/products?limit=${limit}`),
}

// Transform FakeStore API data to our format
export const transformProduct = (product) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  description: product.description,
  category: product.category,
  image: product.image,
  rating: product.rating,
})

export const transformProducts = (products) => products.map(transformProduct)
