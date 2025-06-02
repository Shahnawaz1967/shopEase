import express from "express"
import { getCart, addToCart, removeFromCart, updateCartItem, clearCart } from "../controllers/cartController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

// All cart routes require authentication
router.use(auth)

// Get cart
router.get("/", getCart)

// Add item to cart
router.post("/", addToCart)

// Remove item from cart
router.delete("/:productId", removeFromCart)

// Update cart item quantity
router.put("/:productId", updateCartItem)

// Clear cart
router.delete("/", clearCart)

export default router
